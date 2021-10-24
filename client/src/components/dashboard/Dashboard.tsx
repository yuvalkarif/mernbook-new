import { Feed } from "../feed/Feed";
import { useUserContext } from "../../hooks/useUserContext";
import { useState, useEffect } from "react";
import { getPostsByFollowed } from "../../helpers/api";
import { Header } from "../header/Header";
import { DashboardWrapper } from "./Dashboard.styles";
import { useTitle } from "../../hooks/useTitle";

export const Dashboard = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState<string[]>([]);
  useTitle("Mernbook");
  useEffect(() => {
    const fetchPosts = async () => {
      if (user?._id) {
        try {
          const fetchedPosts = await getPostsByFollowed(user?._id);
          setPosts(fetchedPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPosts();
  }, [user]);
  return (
    <>
      <Header />
      <DashboardWrapper>
        {posts && <Feed posts={posts} isUser={true} />}
        {!posts.length && (
          <>
            <p>Seems quite empty in here...</p>
            <h2>Follow other users to see more posts !</h2>
          </>
        )}
      </DashboardWrapper>
    </>
  );
};
