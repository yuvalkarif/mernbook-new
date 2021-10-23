import { useState } from "react";
import { Post } from "../constants/interfaces";
import { getPost } from "../helpers/api";

export const useFetchPost = () => {
  const [post, setPost] = useState<Post | undefined>();
  const [error, setError] = useState<Boolean | undefined>(false);
  const setFetchPost = async (id: string) => {
    try {
      let fetchedPost: any = await getPost(id);

      if (fetchedPost) {
        setPost(fetchedPost);
      }
    } catch (error) {
      setError(true);
    }
  };

  return [post, setFetchPost, error] as const;
};
