import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import LoadingIndicator from "../components/LoadingIndicator";
import useHomeTasksHooks from "../hooks/HomeTasksHooks";

export default function Home() {
  const { tasks, loading, error, handleToggleComplete, handleDeleteComplete } =
    useHomeTasksHooks();

  if (loading) return <LoadingIndicator />;

  if (error) {
    // You may want to add error handling UI here
    console.error(error);
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
        <div className="grid grid-cols-1 place-items-center items-center md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDeleteComplete={handleDeleteComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
