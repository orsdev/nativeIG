export interface IPost {
  id: string
  createdAt: string,
  video?: string;
  images?: Array<string>;
  description: string
  user: User
  nofComments: number
  nofLikes: number
  comments: Comment[]
}

export interface User {
  id: string
  image: string
  username: string
}

export interface Comment {
  id: string
  comment: string;
  createdAt: string;
  user: User2
}

export interface User2 {
  id: string
  username: string
}
