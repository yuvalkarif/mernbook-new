import { User } from "../../constants/interfaces";
import {
  EditorContainer,
  InputEdit,
  SubmitButton,
  ExitButton,
  EditorWrapper,
} from "./Profile.styles";
import { ImageInput } from "../ImageInput/ImageInput";
import TextareaAutosize from "react-textarea-autosize";
import { BirthdayIcon, WorkIcon, EduIcon } from "./Profile.styles";
import React, { useEffect, useState } from "react";
import { updateUser } from "../../helpers/api";
import { useDetectClickOutside } from "react-detect-click-outside";
import { formatDateInput } from "../../helpers/date";
import { useUserContext } from "../../hooks/useUserContext";
export const ProfileEditor = ({
  user,
  setEdit,
  setFetchUser,
}: {
  user: User;
  setEdit: React.Dispatch<React.SetStateAction<any>>;
  setFetchUser: (id: string, alt?: boolean) => Promise<void>;
}) => {
  const [editUser, setEditUser] = useState({
    summary: user.about?.summary,
    work: user.about?.work,
    education: user.about?.education,
    birthday: user.about?.birthday,
  });
  const [picture, setPicture] = useState(user.picture);
  const [startDate, setStartDate] = useState("");
  const { checkForUser } = useUserContext();
  const containerRef = useDetectClickOutside({
    onTriggered: () => setEdit(false),
  });
  useEffect(() => {
    if (editUser.birthday && startDate === "") {
      setStartDate(formatDateInput(editUser.birthday));
    }
  });

  const handleSubmit = async () => {
    try {
      await updateUser({ id: user._id, picture: picture, ...editUser });
      if (user._id) setFetchUser(user._id);
      setEdit(false);
      if (checkForUser) checkForUser();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsDate) {
      setStartDate(e.target.value);
      setEditUser({ ...editUser, birthday: e.target?.valueAsDate });
    }
  };
  return (
    <EditorWrapper>
      <EditorContainer ref={containerRef}>
        <h2>Edit Profile</h2>
        <h3>Profile Picture</h3>
        <ImageInput picture={picture} setPicture={setPicture} />
        <h3>Summary</h3>
        <TextareaAutosize
          value={editUser.summary}
          onChange={(e) =>
            setEditUser({ ...editUser, summary: e.target.value })
          }
        />
        <h3>About</h3>
        <div className="edit-about">
          <span>
            <WorkIcon />
            <p>Works at</p>
            <InputEdit
              type="text"
              value={editUser.work}
              onChange={(e) =>
                setEditUser({ ...editUser, work: e.target.value })
              }
            />
          </span>
          <span>
            <EduIcon />
            <p>Went to</p>
            <InputEdit
              type="text"
              value={editUser.education}
              onChange={(e) =>
                setEditUser({ ...editUser, education: e.target.value })
              }
            />
          </span>
          <span>
            <BirthdayIcon />
            <p>Born in</p>
            <InputEdit type="date" value={startDate} onChange={handleDate} />
          </span>
        </div>
        <div className="edit-btns">
          <ExitButton onClick={() => setEdit(false)}>Cancel</ExitButton>
          <SubmitButton onClick={handleSubmit}>Save and Update</SubmitButton>
        </div>
      </EditorContainer>
    </EditorWrapper>
  );
};
