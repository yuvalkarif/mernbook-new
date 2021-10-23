import { User } from "../../constants/interfaces";

import { BigAvatar, ProfileWrapper } from "./Search.styles";
import { useHistory } from "react-router";

export const SearchProfile = ({ user }: { user: User }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/p/${user.username}`);
  };
  return (
    <ProfileWrapper onClick={handleClick}>
      <BigAvatar src={user.picture} />
      <div>
        <span>{user.displayname}</span>
        <span>{user?.about?.work || user?.about?.education}</span>
      </div>
      {/* <ShortcutIcon /> */}
    </ProfileWrapper>
  );
};
