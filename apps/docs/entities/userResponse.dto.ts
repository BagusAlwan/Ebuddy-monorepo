import { User } from "./user";

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  interests: string[];
  friends: User[]; //for list of friends
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
  potentialScore?: number;
}
