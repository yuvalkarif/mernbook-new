import { ProfileWrapper, SkeletonContainer } from "./Search.styles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
export const SearchProfileSkeleton = () => {
  return (
    <SkeletonTheme color="#3a3b3c" highlightColor="#b0b3b8">
      <ProfileWrapper>
        <Skeleton width={60} height={60} circle={true} />
        <div>
          <SkeletonContainer>
            <Skeleton height={10} />
          </SkeletonContainer>
          <SkeletonContainer>
            <Skeleton height={10} />
          </SkeletonContainer>
        </div>
      </ProfileWrapper>
    </SkeletonTheme>
  );
};
