import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateEdit from "./pages/CreateEdit";
import Layout from "./components/Layout";
import { TaskApiProvider } from "./context/TaskApiContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "sonner";

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
    <ErrorBoundary>
      <TaskApiProvider>
        <Toaster />
        <RouterProvider router={router} />
      </TaskApiProvider>
    </ErrorBoundary>
  );
}

export default App;
