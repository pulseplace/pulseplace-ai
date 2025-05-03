
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { UserData } from "@/types/auth.types";

// Get user profile
export const getUserProfile = async (userId: string): Promise<any> => {
  try {
    const docRef = doc(db, "profiles", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Create user profile
export const createUserProfile = async (userId: string, profileData: UserData): Promise<void> => {
  try {
    const profileWithTimestamps = {
      ...profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await setDoc(doc(db, "profiles", userId), profileWithTimestamps);
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<UserData>): Promise<void> => {
  try {
    const profileRef = doc(db, "profiles", userId);
    await updateDoc(profileRef, {
      ...updates,
      updated_at: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
