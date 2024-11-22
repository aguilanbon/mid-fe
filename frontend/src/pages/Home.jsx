import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";

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
          setTasks(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-full flex items-center justify-center">
        <div className="animate-spin w-24 h-24 rounded-full border-2 border-t-transparent border-blue-500"></div>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 place-items-center items-center md:grid-cols-2  gap-6">
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
