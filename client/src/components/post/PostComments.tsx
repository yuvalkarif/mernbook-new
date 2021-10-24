import { Comment } from "../../constants/interfaces";
import { Comments, ShowButton } from "./Post.styles";
import { PostComment } from "./PostComment";
import { useState, useEffect } from "react";
export const PostComments = ({
  comments,
  setComments,
  postId,
}: {
  comments: Comment[] | [];
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>;
  postId: string;
}) => {
  const [showAll, setShowAll] = useState<Boolean>(false);
  useEffect(() => {}, [comments, setComments]);
  return (
    <Comments>
      {comments && showAll && (
        <ShowButton onClick={() => setShowAll(false)}>View less</ShowButton>
      )}
      {comments &&
        showAll &&
        comments.map((comment, i) => (
          <PostComment
            key={i}
            comment={comment}
            setComments={setComments}
            postId={postId}
          ></PostComment>
        ))}
      {!showAll && comments && comments?.length > 0 ? (
        <>
          {comments?.length > 1 && (
            <ShowButton onClick={() => setShowAll(true)}>
              View {comments?.length - 1} previous comments{" "}
            </ShowButton>
          )}
          {comments[0] && (
            <PostComment
              comment={comments[comments.length - 1]}
              setComments={setComments}
              postId={postId}
            />
          )}
        </>
      ) : null}
    </Comments>
  );
};
