import { logout } from "../../helpers/api";
import { MediumImage } from "../styled/styledTheme";
import {
  HeaderWrapper,
  HeaderProfile,
  HeaderSearch,
  SearchIcon,
  ProfileButton,
  LogoutIcon,
} from "./Header.styles";
import { useHistory } from "react-router";
import { useUserContext } from "../../hooks/useUserContext";
import Logo from "../../images/logo.png";

export const Header = () => {
  const history = useHistory();
  const { checkForUser, user } = useUserContext();
  const handleLogout = async () => {
    try {
      await logout();
      if (checkForUser) checkForUser();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    history.push("/search");
  };
  const handleDashboard = () => {
    history.push("/");
  };
  return (
    <HeaderWrapper>
      <div>
        <MediumImage onClick={handleDashboard} src={Logo} />
        <HeaderSearch>
          <div onClick={handleSearch}>
            <SearchIcon />
            <span>Search</span>
          </div>
        </HeaderSearch>
      </div>

      <HeaderProfile>
        <ProfileButton to={`/p/${user?.username}`}>
          <MediumImage src={user?.picture} />
          <span>{user?.displayname}</span>
        </ProfileButton>
        <LogoutIcon onClick={handleLogout} />
      </HeaderProfile>
    </HeaderWrapper>
  );
};
