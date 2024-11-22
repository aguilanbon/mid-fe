import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateEdit from "./pages/CreateEdit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/create",
          element: <CreateEdit />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
