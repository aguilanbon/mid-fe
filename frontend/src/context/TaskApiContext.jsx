import { createContext } from "react";

const TaskApiContext = createContext();

export function TaskApiProvider({ children }) {
  const baseURL = "http://localhost:3000/api";
  const path = "/tasks";

  return (
    <TaskApiContext.Provider value={{ baseURL, path }}>
      {children}
    </TaskApiContext.Provider>
  );
}

export default TaskApiContext;
