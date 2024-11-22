import { useEffect, useState, useCallback } from "react";
import { useApi } from "../utils/useApi";

export default function useHomeTasksHooks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { baseURL, path } = useApi();

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}${path}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const sortedTasks = sortTasks(data);
      setTasks(sortedTasks);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [baseURL, path]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const sortTasks = (taskList) => {
    return [...taskList].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return b.id - a.id;
    });
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return sortTasks(updatedTasks);
    });
  };

  const handleDeleteComplete = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return sortTasks(updatedTasks);
    });
  };

  return {
    tasks,
    loading,
    error,
    handleToggleComplete,
    handleDeleteComplete,
    refetchTasks: fetchTasks,
  };
}
