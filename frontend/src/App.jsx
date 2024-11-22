import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateEdit from "./pages/CreateEdit";
import Layout from "./components/Layout";

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

  return <RouterProvider router={router} />;
}

export default App;
