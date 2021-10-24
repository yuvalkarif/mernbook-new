import { useContext } from "react";

import UserContext from "../constants/context";
import { postComment } from "../helpers/api";
const useComment = () => {
  const user = useContext(UserContext);
  const writeComment = async (
    postId: string,
    body: string,
    setComments: any
  ) => {
    try {
      if (user.user?._id) {
        const newComments: any = await postComment(
          user.user?._id,
          postId,
          body
        );

        setComments(newComments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [user, writeComment] as const;
};

export default useComment;
