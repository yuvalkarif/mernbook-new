import { useHistory } from "react-router";
import ROUTES from "../constants/routes";
export const useLinkProfile = () => {
  const history = useHistory();
  const handleLinkToUser = (target: string) => {
    history.push(ROUTES.PROFILE + target);
  };
  return [handleLinkToUser] as const;
};
