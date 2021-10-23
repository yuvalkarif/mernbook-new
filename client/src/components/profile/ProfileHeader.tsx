import React, { useEffect } from "react";
import { User } from "../../constants/interfaces";
import {
  BarContainer,
  EditButton,
  EditIcon,
  HeaderContainer,
  PersonAddIcon,
  ProfilePicBig,
} from "./Profile.styles";
import { Wrapper } from "../styled/styledTheme";
import { useFollow } from "../../hooks/useFollow";

export const ProfileHeader = ({
  user,
  setEdit,
  isUser,
}: {
  user: User | undefined;
  setEdit: React.Dispatch<React.SetStateAction<any>>;
  isUser: boolean;
}) => {
  const [followers, isFollowed, checkFollowing, toggleFollow] = useFollow();
  useEffect(() => {
    if (user?.followers && !followers) {
      checkFollowing(user.followers);
    }
  });
  const handleFollow = () => {
    if (user?._id) {
      toggleFollow(user?._id);
    }
  };
  return (
    <>
      <HeaderContainer>
        <Wrapper>
          {user?.picture && <ProfilePicBig src={user.picture} />}
          <h1>{user?.displayname}</h1>
          <p>{user?.about?.summary ? user?.about.summary : null}</p>
        </Wrapper>
      </HeaderContainer>

      <BarContainer>
        <Wrapper>
          <div>
            <span>Posts</span>
            <span>Friends {followers?.length}</span>
          </div>
          {isUser ? (
            <EditButton onClick={() => setEdit(true)}>
              <EditIcon />
              Edit Profile
            </EditButton>
          ) : (
            <EditButton onClick={handleFollow}>
              {isFollowed ? "Unfollow" : "Follow"}
              <PersonAddIcon />
            </EditButton>
          )}
        </Wrapper>
      </BarContainer>
    </>
  );
};
