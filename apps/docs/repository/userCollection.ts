import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

const userCollection = db.collection("USERS");

export const fetchUserData = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data() as User;
  } catch (error) {
    console.error("error fetching user data:", error);
    return null;
  }
};

export const updateUserData = async (
  userId: string,
  userData: Partial<User>
): Promise<{ success: boolean; message?: string }> => {
  try {
    await userCollection.doc(userId).update(userData);
    return { success: true, message: "success" };
  } catch (error) {
    console.error("error:", error);
    return { success: false, message: "failed" };
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await userCollection.get();
    const users: User[] = [];
    snapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });
    return users;
  } catch (error) {
    console.error("error fetching all users:", error);
    return [];
  }
};
