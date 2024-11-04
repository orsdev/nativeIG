export enum ProfileTabEnum {
  EditProfile,
  ShareProfile
}

export interface IProfilePost {
  id: string;
  createdAt: string;
  image?: string;
  images?: Array<string>;
  description: string
}

export interface IProfile {
  id: string;
  image: string;
  name: string;
  bio: string;
  username: string;
  posts: IProfilePost[]
}