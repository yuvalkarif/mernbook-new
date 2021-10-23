import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SkeletonPostContainer } from "./Post.styles";

export const PostSkeleton = () => {
  return (
    <SkeletonPostContainer>
      <SkeletonTheme color="#3a3b3c" highlightColor="#b0b3b8">
        <div className="s-title">
          <Skeleton duration={1.5} circle={true} height={40} width={40} />
          <div>
            {" "}
            <Skeleton height={10} />
            <Skeleton height={10} />
          </div>
        </div>
        <div className="s-body">
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
        </div>
      </SkeletonTheme>
    </SkeletonPostContainer>
  );
};
