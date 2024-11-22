import { useEffect, useState } from "react";
import { useApi } from "../utils/useApi";

export default function useHomeTasksHooks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");
  const { baseURL, path } = useApi();

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseURL}${path}`);
        if (response.ok) {
          const data = await response.json();
          const sortedTasks = sortTasks(data);
          setTasks(sortedTasks);
        }
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [baseURL, path]);

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
  };
}
