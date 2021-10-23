import { useState, useContext } from "react";
import UserContext from "../constants/context";
import { Auth } from "../constants/interfaces";
import { likePost } from "../helpers/api";

export const useLike = () => {
  const [isLiked, setIsLiked] = useState<Boolean>(false);
  const [likes, setLikes] = useState<string[] | []>([]);
  const {
    user: { _id: id },
  }: any = useContext<Auth>(UserContext);

  const checkLike = (likes: string[] | []) => {
    setLikes(likes);
    likes?.some((like) => like === id) ? setIsLiked(true) : setIsLiked(false);
  };

  const toggleLike = async (postId: string) => {
    let likes: any;
    try {
      likes = await likePost(id, postId);
      console.log("likes", likes);

      setIsLiked(!isLiked);
      setLikes(likes);
    } catch (error) {
      console.log(error);
    }
  };
  return [likes, isLiked, checkLike, toggleLike] as const;
};
