import { useState, useEffect } from "react";

import {
  LinkContainer,
  UploadIcon,
  ProfilePicBig,
  LinkInput,
  Wrapper,
} from "./ImageInput.styles";

export const ImageInput = ({
  picture,
  setPicture,
}: {
  picture: string | undefined;
  setPicture: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [image, setImage] = useState({
    src: picture,
    isValid: false,
    isShowing: false,
  });
  useEffect(() => {
    if (image.isValid && image.src !== picture) {
      setPicture(image.src);
    }
  }, [image.isValid, image.src, picture, setPicture]);
  return (
    <Wrapper>
      {image.isShowing ? (
        <ProfilePicBig
          style={{ display: !image.isShowing ? "none" : "block" }}
          src={image.src}
          alt=""
          onError={() =>
            setImage({ isShowing: false, src: "", isValid: false })
          }
          onLoad={() => setImage({ ...image, isShowing: true, isValid: true })}
        />
      ) : (
        <ProfilePicBig src={picture} />
      )}
      {
        <LinkContainer>
          <LinkInput
            placeholder=".png, .jpg or .webp links"
            onChange={(e) => setImage({ ...image, src: e.target.value })}
            value={image.src}
          />
          <UploadIcon onClick={() => setImage({ ...image, isShowing: true })} />
        </LinkContainer>
      }
    </Wrapper>
  );
};
