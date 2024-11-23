import { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TaskApiContext from "../context/TaskApiContext";

export default function useCreateEditHooks(id, isEditMode) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getTaskById, createTask, updateTask } = useContext(TaskApiContext);

  const fetchTask = useCallback(async () => {
    if (!isEditMode) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getTaskById(id);
      setTask(data.data);
    } catch (error) {
      console.error("Error fetching task:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [getTaskById, id, isEditMode]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleSubmit = async (formData) => {
    try {
      const taskData = isEditMode
        ? { ...formData, completed: task.completed }
        : { ...formData, completed: false };

      if (isEditMode) {
        await updateTask(id, taskData);
        navigate("/");
      } else {
        await createTask(taskData);
      }
    } catch (error) {
      console.error("Error saving task:", error);
      setError(error);
    }
  };

  return { task, loading, handleSubmit, error, refetchTask: fetchTask };
}
