import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";
import { DocumentSnapshot, DocumentData } from "firebase-admin/firestore";

const userCollection = db.collection("USERS");

export const getUserCollection = () => userCollection;

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

//Part 4 (Bonus)
/* We use the calculateUserScore function to calculate the score of each user.
Score=(totalAverageWeightRatings×100)+(numberOfRents×10)+(recentlyActive/1e7)
reason for using 1e7 is because it is epoch time in seconds so we divide by 10^7 to normalize it
then we sort the users by their score in descending order (dont forget to index in the firebase console)
*/
interface RankedUser extends User {
  score: number;
}

interface PaginatedRankedUsers {
  users: RankedUser[];
  lastDoc: DocumentSnapshot<DocumentData> | null;
}

export const fetchRankedUsers = async (
  lastDoc?: DocumentSnapshot<DocumentData>,
  limit: number = 10
): Promise<PaginatedRankedUsers> => {
  try {
    let query = userCollection
      .orderBy("totalAverageWeightRatings", "desc")
      .orderBy("numberOfRents", "desc")
      .orderBy("recentlyActive", "desc");

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.limit(limit).get();
    const users: RankedUser[] = [];

    snapshot.forEach((doc) => {
      const userData = doc.data() as User;
      users.push({
        ...userData,
        id: doc.id,
        score: calculateUserScore(userData),
      });
    });
    users.sort((a, b) => b.score - a.score);

    return {
      users,
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  } catch (error) {
    console.error("Error fetching ranked users:", error);
    return {
      users: [],
      lastDoc: null,
    };
  }
};

const calculateUserScore = (user: User): number => {
  return (
    user.totalAverageWeightRatings * 100 +
    user.numberOfRents * 10 +
    user.recentlyActive / 1e7
  );
};
