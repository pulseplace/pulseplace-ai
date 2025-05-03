
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { Task } from "@/contexts/TaskContext";

// Collection reference
const tasksCollection = collection(db, "tasks");

// Get all tasks for the current user
export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    const q = query(tasksCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Task, 'id'>
    }));
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

// Add a new task
export const addTask = async (userId: string, task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const taskWithUser = {
      ...task,
      userId,
      createdAt: new Date().toISOString(),
    };
    
    const docRef = await addDoc(tasksCollection, taskWithUser);
    
    return {
      id: docRef.id,
      ...task
    };
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// Toggle task completion
export const toggleTaskCompletion = async (taskId: string, currentStatus: boolean): Promise<void> => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      completed: !currentStatus,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};
