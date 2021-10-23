import { CommentWriter, CommentPic, SendIcon } from "./Post.styles";
import TextareaAutosize from "react-textarea-autosize";
import useComment from "../../hooks/useComment";
import { useState } from "react";
import { Comment } from "../../constants/interfaces";
export const PostCommentWriter = ({
  setComments,
  postId,
  elRef,
}: {
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>;
  postId: string;
  elRef: any;
}) => {
  const [user, writeComment] = useComment();
  const [body, setBody] = useState<string>("");
  const handleClick = () => {
    if (postId && body) {
      writeComment(postId, body, setComments);
      setBody("");
    }
  };
  return (
    <>
      <CommentWriter>
        <CommentPic src={user.user?.picture} />
        <TextareaAutosize
          placeholder="Write a comment..."
          onChange={(e) => setBody(e.target.value)}
          value={body}
          ref={(tag) => {
            if (tag) elRef.current = tag;
          }}
        />
        <SendIcon onClick={handleClick} />
      </CommentWriter>
    </>
  );
};
