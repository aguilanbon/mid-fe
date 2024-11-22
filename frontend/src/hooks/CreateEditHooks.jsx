import { useEffect, useState } from "react";
import { useApi } from "../utils/useApi";

export default function useCreateEditHooks(id, isEditMode) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const { baseURL, path } = useApi();

  useEffect(() => {
    const fetchTask = async () => {
      if (!isEditMode) return;

      setLoading(true);
      try {
        const response = await fetch(`${baseURL}${path}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTask(data.data);
        } else {
          console.error("Task not found");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, isEditMode, baseURL, path]);

  const handleSubmit = async (formData) => {
    try {
      const url = isEditMode ? `${baseURL}${path}/${id}` : `${baseURL}${path}`;

      const taskData = isEditMode
        ? { ...formData, completed: task.completed }
        : { ...formData, completed: false };

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log(response);
      } else {
        throw new Error("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return { task, loading, handleSubmit };
}
