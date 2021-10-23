import { User } from "../../constants/interfaces";
import {
  EduIcon,
  BirthdayIcon,
  WorkIcon,
  AboutContainer,
} from "./Profile.styles";
import { formatDateFromDB } from "../../helpers/date";

export const ProfileAbout = ({
  about,
}: {
  about: User["about"] | undefined;
}) => {
  return (
    <>
      <AboutContainer>
        <h2>About</h2>
        {about?.education && (
          <span>
            <EduIcon />
            Went to <strong>{about.education}</strong>
          </span>
        )}
        {about
          ? about?.work && (
              <span>
                <WorkIcon />
                Works at <strong> {about.work}</strong>
              </span>
            )
          : null}
        {about?.birthday && (
          <span>
            <BirthdayIcon />
            Born <strong>{formatDateFromDB(about.birthday)}</strong>
          </span>
        )}
        {/* {about?.birthday && (
          <span>
            <TimeIcon />
            Born {about.work}
          </span>
        )} */}
      </AboutContainer>
    </>
  );
};
