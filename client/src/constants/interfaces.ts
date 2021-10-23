export interface Account {
  username: string;
  displayname?: string;
  password: string;
}

export interface User {
  _id?: string;
  username: string;
  displayname: string;
  password: string;
  following?: string[];
  followers?: string[];
  posts: string[] | [];
  picture?: string;
  isAdmin: Boolean;
  about?: {
    summary?: string;
    work?: string;
    education?: string;
    birthday?: Date;
  };
}
export interface Post {
  creator: string;
  body: string;
  likes: string[] | [];
  comments: Comment[] | [];
  date: Date;
  picture?: string;
  _id?: string;
}

export interface Comment {
  body: string;
  creator: string;
  date: Date;
  _id?: string;
}
export interface Auth {
  isAuth?: boolean;
  user?: User;
  checkForUser?: () => Promise<void>;
}
