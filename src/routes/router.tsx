import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import DeviceDetail from "../pages/CharacterDetail";
import { deviceLoader } from "../loaders/deviceLoader";
import Test from "../pages/Test";
import DeviceGallery from "../pages/DeviceGallery";
import { devicesLoader } from "../loaders/charactersLoader";

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
        loader: devicesLoader,
      },
      {
        path: paths.deviceId,
        element: <DeviceDetail />,
        loader: deviceLoader,
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