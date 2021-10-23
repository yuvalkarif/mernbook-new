import { useEffect, useState } from "react";
import { useFetchPost } from "../../hooks/useFetchPost";
import { useFetchUser } from "../../hooks/useFetchUser";
import { MediumImage } from "../styled/styledTheme";
import {
  PostContainer,
  Image,
  Actions,
  SmallCommentIcon,
  SmallLikeIcon,
  ActionButton,
  BigLikeIcon,
  BigCommentIcon,
  BigLikeIconClicked,
  BigDeleteIcon,
} from "./Post.styles";
import { PostComments } from "./PostComments";
import { PostCommentWriter } from "./PostCommentWriter";
import { Comment } from "../../constants/interfaces";
import { deletePost } from "../../helpers/api";
import { PostSkeleton } from "./PostSkeleton";
//------------------Hooks------------------//
import useFocus from "../../hooks/useFocus";
import { useUserContext } from "../../hooks/useUserContext";
import { useLike } from "../../hooks/useLike";
import { formatDate } from "../../helpers/date";
import { useLinkProfile } from "../../hooks/useLinkProfile";

export const Post = ({
  postId,
  dispatchPosts,
}: {
  postId: string;
  dispatchPosts: React.Dispatch<any>;
}) => {
  const [post, setFetchPost] = useFetchPost();
  const [user, setFetchUser] = useFetchUser();
  const [likes, isLiked, checkLike, toggleLike] = useLike();
  const [comments, setComments] = useState<Comment[] | []>([]);
  const loggedUser = useUserContext();
  const [elRef, setFocus] = useFocus();
  const [handleLinkToUser] = useLinkProfile();

  useEffect(() => {
    if (postId && !post) {
      setFetchPost(postId);
    } else if (post && !user) {
      setFetchUser(post.creator);
      checkLike(post?.likes);
      setComments(post?.comments);
    }
  }, [postId, post, user]);

  const handleLike = () => {
    toggleLike(postId);
  };

  const handleDelete = async () => {
    if (loggedUser?.user?._id) {
      let post: any;
      try {
        post = await deletePost(loggedUser.user._id, postId);
        dispatchPosts({ type: "remove_post", post: post });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {user && post ? (
        <PostContainer>
          {post?.creator === loggedUser.user?._id && (
            <BigDeleteIcon onClick={handleDelete}>DELETE</BigDeleteIcon>
          )}
          <span>
            <MediumImage
              src={user?.picture}
              onClick={() => handleLinkToUser(user?.username)}
            />
            <div>
              <h4 onClick={() => handleLinkToUser(user?.username)}>
                {user?.displayname}
              </h4>
              <time>{formatDate(post?.date)}</time>
            </div>
          </span>
          <p>{post?.body}</p>
          {post?.picture && <Image src={post?.picture} />}
          <div>
            <Actions>
              <div>
                <span>
                  <SmallLikeIcon />
                  {likes && likes.length}
                </span>
                <span>
                  {comments.length}
                  <SmallCommentIcon />
                </span>
              </div>
              <div>
                <ActionButton onClick={handleLike} isLiked={isLiked}>
                  {isLiked ? <BigLikeIconClicked /> : <BigLikeIcon />}
                  Like
                </ActionButton>
                <ActionButton onClick={setFocus}>
                  <BigCommentIcon />
                  Comment
                </ActionButton>
              </div>
            </Actions>
            {comments && (
              <PostComments
                comments={comments}
                setComments={setComments}
                postId={postId}
              />
            )}
            {comments && (
              <PostCommentWriter
                postId={postId}
                setComments={setComments}
                elRef={elRef}
              />
            )}
          </div>
        </PostContainer>
      ) : (
        <PostSkeleton />
      )}
    </>
  );
};
