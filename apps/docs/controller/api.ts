import { Request } from "express";
import {
  fetchUserData,
  updateUserData,
  fetchAllUsers,
  fetchRankedUsers,
  getUserCollection,
} from "../repository/userCollection";
import { User } from "../entities/user";
import { UserResponse } from "../entities/userResponse.dto";
import { DocumentSnapshot, DocumentData } from "firebase-admin/firestore";

interface RankedUserResponse extends UserResponse {
  score: number;
}

const toUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
    age: user.age,
    gender: user.gender,
    interests: user.interests,
    friends: user.friends,
    totalAverageWeightRatings: user.totalAverageWeightRatings,
    numberOfRents: user.numberOfRents,
    recentlyActive: user.recentlyActive,
    potentialScore: user.potentialScore,
  };
};

export const fetchUser = async (req: Request): Promise<UserResponse | null> => {
  const userId = req.params.userId;
  try {
    const user = await fetchUserData(userId);
    if (!user) {
      return null;
    }
    console.log("success");
    return toUserResponse(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const updateUser = async (
  req: Request
): Promise<{ success: boolean; message?: string; data?: Partial<User> }> => {
  const userId = req.params.userId;
  const userData: Partial<User> = req.body;

  if (!userId || !userData) {
    return {
      success: false,
      message: "Invalid request: userId or userData missing",
    };
  }

  const result = await updateUserData(userId, userData);
  if (result.success) {
    console.log("success");
    return { success: true, message: result.message, data: userData };
  } else {
    console.log("success");
    return { success: false, message: result.message };
  }
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const users = await fetchAllUsers();
    return users.map(toUserResponse);
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
};

const toRankedUserResponse = (
  user: User & { score: number }
): RankedUserResponse => {
  return {
    ...toUserResponse(user),
    score: user.score,
  };
};

export const getRankedUsers = async (
  req: Request
): Promise<{
  success: boolean;
  data?: {
    users: RankedUserResponse[];
    lastDoc: string | null;
  };
  message?: string;
}> => {
  try {
    const limit = Number(req.query.limit) || 10;
    const lastDocId = req.query.lastDocId as string | undefined;
    const userCollection = getUserCollection();

    let lastDocRef: DocumentSnapshot<DocumentData> | undefined;
    if (lastDocId) {
      const docSnapshot = await userCollection.doc(lastDocId).get();
      if (!docSnapshot.exists) {
        return {
          success: false,
          message: "Invalid lastDocId provided",
        };
      }
      lastDocRef = docSnapshot;
    }

    const { users, lastDoc } = await fetchRankedUsers(lastDocRef, limit);

    return {
      success: true,
      data: {
        users: users.map(toRankedUserResponse),
        lastDoc: lastDoc?.id || null,
      },
    };
  } catch (error) {
    console.error("Error fetching ranked users:", error);
    return {
      success: false,
      message: "Failed to fetch ranked users",
    };
  }
};
