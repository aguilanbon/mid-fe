import { useContext } from "react";
import TaskApiContext from "../context/TaskApiContext";

export function useApi() {
  const context = useContext(TaskApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}
