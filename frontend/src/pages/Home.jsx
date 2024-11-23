import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import useHomeTasksHooks from "../hooks/HomeTasksHooks";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    handleToggleComplete,
    handleDeleteComplete,
    refetchTasks,
  } = useHomeTasksHooks();

  if (loading) return <LoadingIndicator />;

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <ErrorMessage
          message={error.message || "Failed to load tasks"}
          retry={refetchTasks}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-5xl space-y-4 py-8 px-10">
        <div className="w-full flex justify-between items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>
          <Link
            to="/create"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Task
          </Link>
        </div>
        <div className="grid grid-cols-1 place-items-center items-center md:grid-cols-2 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDeleteComplete={handleDeleteComplete}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No tasks available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
