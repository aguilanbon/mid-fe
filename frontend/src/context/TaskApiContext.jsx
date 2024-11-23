import { createContext, useCallback } from "react";
import { toast } from "sonner";

const TaskApiContext = createContext();

export function TaskApiProvider({ children }) {
  const baseURL = "http://localhost:3000/api";
  const path = "/tasks";

  const getAllTasks = useCallback(async () => {
    const response = await fetch(`${baseURL}${path}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }, []);

  const getTaskById = useCallback(async (id) => {
    const response = await fetch(`${baseURL}${path}/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }, []);

  const createTask = useCallback(async (taskData) => {
    const response = await fetch(`${baseURL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    toast.success(data.message);
    return data;
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    const response = await fetch(`${baseURL}${path}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    toast.success(data.message);
    return data;
  }, []);

  const deleteTask = useCallback(async (id) => {
    const response = await fetch(`${baseURL}${path}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    toast.success(data.message);
    return data;
  }, []);

  return (
    <TaskApiContext.Provider
      value={{
        baseURL,
        path,
        getAllTasks,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskApiContext.Provider>
  );
}

export default TaskApiContext;
