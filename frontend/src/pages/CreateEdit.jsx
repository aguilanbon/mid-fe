import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";

export default function CreateEdit() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchTask = async () => {
      if (!isEditMode) return;

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
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
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    try {
      const url = isEditMode
        ? `http://localhost:3000/api/tasks/${id}`
        : "http://localhost:3000/api/tasks";

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

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-start py-8">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-start py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Task" : "Create New Task"}
      </h1>
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        mode={isEditMode ? "edit" : "create"}
      />
    </div>
  );
}
