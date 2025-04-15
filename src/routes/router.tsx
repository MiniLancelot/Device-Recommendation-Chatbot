import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import CharacterDetail from "../pages/CharacterDetail";
import { charactersLoader } from "../loaders/charactersLoader";
import { characterDetailLoader } from "../loaders/characterLoader";
import Test from "../pages/Test";
import DeviceGallery from "../pages/DeviceGallery";

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: paths.devices,
        element: <DeviceGallery />,
        loader: charactersLoader,
      },
      {
        path: paths.characterName,
        element: <CharacterDetail />,
        loader: characterDetailLoader,
      },
      {
        path: paths.test,
        element: <Test />,
      }
    ]
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};