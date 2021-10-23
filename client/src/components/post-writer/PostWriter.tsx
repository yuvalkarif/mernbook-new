import { useContext, useState } from "react";
import {
  WriterContainer,
  WriterProfile,
  ActionButton,
  PhotoIcon,
  PostButton,
  LinkInput,
  UploadIcon,
  TopContainer,
  LinkContainer,
} from "./PostWriter.styles";
import UserContext from "../../constants/context";
import TextareaAutosize from "react-textarea-autosize";
import { createPost } from "../../helpers/api";
import { useDetectClickOutside } from "react-detect-click-outside";

interface PostWriterType {
  body: string;
  picture?: string;
}
interface Image {
  src: string;
  isValid: boolean;
  isChecking: boolean;
}
export const PostWriter = ({
  dispatchPosts,
}: {
  dispatchPosts: React.Dispatch<any>;
}) => {
  const { user } = useContext(UserContext);
  const [showLink, setShowLink] = useState<Boolean>(false);
  const containerRef = useDetectClickOutside({
    onTriggered: () => setExpanded(false),
  });
  const [post, setPost] = useState<PostWriterType>({
    body: "",
    picture: "",
  });

  const [image, setImage] = useState<Image>({
    src: "",
    isValid: false,
    isChecking: false,
  });
  const [expanded, setExpanded] = useState<Boolean>(false);
  const imageCheck = (e: React.SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setImage({ ...image, isChecking: true });
  };

  const submitPost = async () => {
    const { body } = post;
    if (body && user?._id) {
      let post: any;
      try {
        post = await createPost(user?._id, body, image.src);
        console.log("post", post);
        dispatchPosts({ type: "add_post", post: post });
        setExpanded(false);
        setShowLink(false);
        setPost({
          body: "",
          picture: "",
        });
        setImage({
          src: "",
          isValid: false,
          isChecking: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <WriterContainer
      onClick={() => setExpanded(true)}
      expanded={expanded}
      ref={containerRef}
    >
      <TopContainer>
        <div>
          <WriterProfile src={user?.picture} />
          <TextareaAutosize
            placeholder={`Whats on your mind, ${
              user?.displayname.split(" ")[0]
            }?`}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            value={post.body}
          />
        </div>
        {image.isChecking && (
          <img
            style={{ display: !image.isValid ? "none" : "block" }}
            src={image.src}
            alt=""
            onError={() =>
              setImage({ isChecking: false, src: "", isValid: false })
            }
            onLoad={() =>
              setImage({ ...image, isChecking: true, isValid: true })
            }
          />
        )}
      </TopContainer>

      <div>
        <div>
          <ActionButton onClick={() => setShowLink(!showLink)}>
            <PhotoIcon />
            <span>Add a photo</span>
          </ActionButton>
          {expanded && showLink && (
            <LinkContainer>
              <LinkInput
                placeholder=".png, .jpg or .webp links"
                onChange={(e) => setImage({ ...image, src: e.target.value })}
                value={image.src}
              />
              <UploadIcon onClick={imageCheck} />
            </LinkContainer>
          )}
        </div>

        {expanded && (
          <PostButton onClick={submitPost} body={post.body ? true : false}>
            Post
          </PostButton>
        )}
      </div>
    </WriterContainer>
  );
};
