import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if (response.ok) {
          const data = await response.json();
          const sortedTasks = sortTasks(data);
          setTasks(sortedTasks);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

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

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-5xl space-y-4 py-8 px-10">
        <div className="w-full flex justify-end">
          <Link
            to="/create"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Task
          </Link>
        </div>
        <div className="grid grid-cols-1 place-items-center items-center md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
