import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateEdit from "./pages/CreateEdit";
import Layout from "./components/Layout";
import { TaskApiProvider } from "./context/TaskApiContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/create",
      element: (
        <Layout>
          <CreateEdit />
        </Layout>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <Layout>
          <CreateEdit />
        </Layout>
      ),
    },
  ]);

  return (
    <TaskApiProvider>
      <RouterProvider router={router} />
    </TaskApiProvider>
  );
}

export default App;
