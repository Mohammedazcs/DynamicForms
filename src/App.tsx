
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import DynamicForm from "./pages/dymanicForm/Dymanicform";
import ImageUploader  from "./pages/imageUploader/ImageUploader";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <DynamicForm />,
        },
        {
          path: "/dynamicForm",
          element: <DynamicForm />,
        },

        {
          path: "/imageUploader",
          element: <ImageUploader />,
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
