
import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Task } from '@/types/task.types';
import { taskToFirestoreFormat, taskUpdatesToFirestoreFormat } from './firestore-utils';

// Task CRUD operations
export const completeTask = async (id: string, userId: string | undefined) => {
  if (!userId) return;

  const taskRef = doc(db, "tasks", id);
  try {
    await updateDoc(taskRef, {
      status: "Done",
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

export const deleteTask = async (id: string, userId: string | undefined) => {
  if (!userId) return;
  
  const taskRef = doc(db, "tasks", id);
  try {
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};

export const addTask = async (task: Omit<Task, 'id'>, userId: string | undefined) => {
  if (!userId) return;
  
  const taskWithUser = taskToFirestoreFormat(task, userId);
  
  try {
    await addDoc(collection(db, "tasks"), taskWithUser);
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

export const updateTask = async (id: string, updatedTask: Partial<Task>, userId: string | undefined) => {
  if (!userId) return;
  
  const firestoreUpdates = taskUpdatesToFirestoreFormat(updatedTask);
  
  const taskRef = doc(db, "tasks", id);
  try {
    await updateDoc(taskRef, firestoreUpdates);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};
