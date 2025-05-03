
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Task, TaskPriority } from '@/types/task.types';

// Helper function to transform priority from lowercase to proper case
export const transformPriority = (priority: string | undefined): TaskPriority => {
  if (!priority) return 'Medium';
  
  switch (priority.toLowerCase()) {
    case 'high':
      return 'High';
    case 'low':
      return 'Low';
    default:
      return 'Medium';
  }
};

// Create a query for daily tasks
export const createDailyTasksQuery = (userId: string) => {
  return query(
    collection(db, "tasks"), 
    where("userId", "==", userId), 
    where("type", "==", "daily")
  );
};

// Map Firestore document to Task
export const mapFirestoreDocToTask = (doc: any): Task => ({
  id: doc.id,
  name: doc.data().title || "Untitled Task", // Map title to name for compatibility
  module: doc.data().module || "Other",
  priority: transformPriority(doc.data().priority),
  status: doc.data().status || "Not Started",
  owner: doc.data().owner || "Lovable",
  deadline: doc.data().dueDate ? new Date(doc.data().dueDate) : null,
  notes: doc.data().description || "",
  sprint: doc.data().sprint || "",
  createdAt: doc.data().createdAt ? new Date(doc.data().createdAt) : new Date(),
  updatedAt: doc.data().updatedAt ? new Date(doc.data().updatedAt) : new Date()
});

// Convert Task to Firestore format
export const taskToFirestoreFormat = (task: Omit<Task, 'id'>, userId: string) => {
  return {
    title: task.name,
    description: task.notes,
    module: task.module,
    priority: task.priority,
    status: task.status,
    owner: task.owner,
    dueDate: task.deadline ? task.deadline.toISOString() : null,
    sprint: task.sprint,
    userId: userId,
    type: 'daily',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Convert Task updates to Firestore format
export const taskUpdatesToFirestoreFormat = (updatedTask: Partial<Task>): Record<string, any> => {
  const firestoreUpdates: Record<string, any> = {};
  
  if (updatedTask.name) firestoreUpdates.title = updatedTask.name;
  if (updatedTask.notes) firestoreUpdates.description = updatedTask.notes;
  if (updatedTask.module) firestoreUpdates.module = updatedTask.module;
  if (updatedTask.priority) firestoreUpdates.priority = updatedTask.priority;
  if (updatedTask.status) firestoreUpdates.status = updatedTask.status;
  if (updatedTask.owner) firestoreUpdates.owner = updatedTask.owner;
  if (updatedTask.deadline) firestoreUpdates.dueDate = updatedTask.deadline.toISOString();
  if (updatedTask.sprint) firestoreUpdates.sprint = updatedTask.sprint;
  
  firestoreUpdates.updatedAt = new Date().toISOString();
  
  return firestoreUpdates;
};
