import { PostWriter } from "../post-writer/PostWriter";
import { Post } from "../post/Post";
import { useEffect, useReducer, useState } from "react";
import { FeedWrapper } from "./Feed.styles";
import { useInView } from "react-intersection-observer";

//-----------------Reducer Setup/Types-----------------//
interface ReducerState {
  postsIds: string[] | [];
  postsToRender: string[] | [];
}
type Action =
  | { type: "load_posts" }
  | { type: "load_last" }
  | { type: "add_post"; post: string }
  | { type: "remove_post"; post: string }
  | { type: "reset_posts"; posts: string[] };
const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case "load_posts":
      return {
        postsToRender: [
          ...state.postsToRender,
          ...state.postsIds.slice(0).splice(-5).reverse(),
        ],
        postsIds: [...state.postsIds.slice(0, -5)],
      };
    case "load_last":
      return {
        postsToRender: [
          ...state.postsToRender,
          ...state.postsIds.slice(0).reverse(),
        ],
        postsIds: [],
      };
    case "add_post":
      return { ...state, postsToRender: [action.post, ...state.postsToRender] };
    case "remove_post":
      return {
        ...state,
        postsToRender: [...state.postsToRender].filter(
          (postToRender) => postToRender !== action.post
        ),
      };
    case "reset_posts":
      return {
        postsToRender: [],
        postsIds: action.posts,
      };
  }
};
//-----------------------------------Component Feed -------------------------------------//
export const Feed = ({
  posts,
  isUser,
}: {
  posts: string[];
  isUser?: boolean;
}) => {
  const [ref, inView] = useInView({ threshold: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [state, dispatchPosts] = useReducer(reducer, {
    postsToRender: [],
    postsIds: posts.slice(0),
  });

  const loadSelector = () => {
    if (state.postsIds.length > 5) {
      dispatchPosts({ type: "load_posts" });
    } else if (state.postsIds.length > 0) {
      dispatchPosts({ type: "load_last" });
    }
  };

  useEffect(() => {
    if (state.postsToRender.length <= 0 && state.postsIds.length > 0) {
      loadSelector();
    }
  }, [state.postsIds, state.postsToRender]);

  useEffect(() => {
    if (state.postsToRender.length !== 0 || state.postsIds.length === 0) {
      setIsLoaded(false);
      dispatchPosts({ type: "reset_posts", posts: posts.slice(0) });
    }
  }, [posts]);

  useEffect(() => {
    if (inView && isLoaded && state.postsIds.length !== 0) {
      loadSelector();
    }
  }, [inView, isLoaded]);

  const handleLoaded = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  return (
    <div>
      {isUser && <PostWriter dispatchPosts={dispatchPosts} />}
      <FeedWrapper>
        {state.postsToRender.length > 0 &&
          state.postsToRender.map((post, i) => {
            if (state.postsToRender.length - 1 === i) {
              handleLoaded();
            }
            return (
              <Post key={post} postId={post} dispatchPosts={dispatchPosts} />
            );
          })}
      </FeedWrapper>
      {isLoaded && state.postsIds.length !== 0 && (
        <div ref={ref} style={{ marginTop: "1rem", height: "1rem" }}></div>
      )}
    </div>
  );
};
