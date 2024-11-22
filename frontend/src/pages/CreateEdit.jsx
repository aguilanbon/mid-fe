import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import LoadingIndicator from "../components/LoadingIndicator";
import useCreateEditHooks from "../hooks/CreateEditHooks";

export default function CreateEdit() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { task, loading, handleSubmit } = useCreateEditHooks(id, isEditMode);

  if (loading) return <LoadingIndicator />;

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
