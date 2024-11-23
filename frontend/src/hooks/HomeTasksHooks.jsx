import { useEffect, useState, useCallback, useContext } from "react";
import TaskApiContext from "../context/TaskApiContext";

export default function useHomeTasksHooks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { getAllTasks, updateTask, deleteTask } = useContext(TaskApiContext);

  const sortTasks = (taskList) => {
    return [...taskList].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return b.id - a.id;
    });
  };

  const getFilteredTasks = useCallback(() => {
    let filteredTasks = tasks;

    // First apply status filter
    switch (filter) {
      case "completed":
        filteredTasks = filteredTasks.filter((task) => task.completed);
        break;
      case "active":
        filteredTasks = filteredTasks.filter((task) => !task.completed);
        break;
      default:
        break;
    }

    // Then apply search filter
    if (searchQuery.trim()) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    return filteredTasks;
  }, [tasks, filter, searchQuery]);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllTasks();
      const sortedTasks = sortTasks(data.data);
      setTasks(sortedTasks);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [getAllTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      await updateTask(taskId, { ...task, completed: !task.completed });
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        return sortTasks(updatedTasks);
      });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDeleteComplete = async (taskId) => {
    try {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        return sortTasks(updatedTasks);
      });

      await deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      fetchTasks();
    }
  };

  return {
    tasks: getFilteredTasks(),
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    handleToggleComplete,
    handleDeleteComplete,
    refetchTasks: fetchTasks,
  };
}
