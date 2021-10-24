import { useState, useEffect } from "react";
import { followUser } from "../helpers/api";
import { useUserContext } from "./useUserContext";

export const useFollow = () => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [followers, setFollowers] = useState<string[] | undefined>();
  const { user } = useUserContext();
  const checkFollowing = (userFollowers: string[]) => {
    setFollowers(userFollowers);

    userFollowers.some((follower) => follower === user?._id)
      ? setIsFollowed(true)
      : setIsFollowed(false);
  };
  const toggleFollow = async (userId: string) => {
    if (user?._id && userId) {
      let follow: any;
      try {
        follow = await followUser(user._id, userId, isFollowed);
        setIsFollowed(!isFollowed);
        setFollowers(follow);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return [followers, isFollowed, checkFollowing, toggleFollow] as const;
};
