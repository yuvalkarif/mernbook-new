/* eslint-disable react-hooks/exhaustive-deps */
import { Comment } from "../../constants/interfaces";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useEffect } from "react";
import { CommentPic, CommentWrapper, DeleteIcon } from "./Post.styles";
import { removeComment } from "../../helpers/api";
import { formatDate } from "../../helpers/date";
import { useUserContext } from "../../hooks/useUserContext";
import { useLinkProfile } from "../../hooks/useLinkProfile";
export const PostComment = ({
  comment,
  setComments,
  postId,
}: {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>;
  postId: string;
}) => {
  const [postUser, setFetchUser] = useFetchUser();
  const { user } = useUserContext();
  const [handleLinkToUser] = useLinkProfile();
  useEffect(() => {
    if (comment.creator && !postUser) {
      setFetchUser(comment.creator);
    }
  }, [comment, setComments]);

  const handleRemove = async () => {
    if (user?._id === comment.creator && comment._id) {
      try {
        const newComments: any = await removeComment(comment._id, postId);
        setComments(newComments);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {postUser ? (
        <CommentWrapper>
          <div>
            {postUser?.picture && (
              <CommentPic
                src={postUser?.picture}
                onClick={() => handleLinkToUser(postUser?.username)}
              />
            )}
            <div>
              {postUser?.displayname && (
                <h5 onClick={() => handleLinkToUser(postUser?.username)}>
                  {postUser?.displayname}
                </h5>
              )}
              {comment.body && <p>{comment.body}</p>}
            </div>
            {user?._id === comment.creator && (
              <DeleteIcon onClick={handleRemove} />
            )}
          </div>
          {comment?.date && <time>{formatDate(comment?.date)}</time>}
        </CommentWrapper>
      ) : null}
    </>
  );
};
