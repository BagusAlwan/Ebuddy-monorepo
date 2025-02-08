export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  interests: string[];
  friends: User[]; //for list of friends
}
