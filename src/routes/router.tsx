import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import CharacterDetail from "../pages/CharacterDetail";
import Characters from "../pages/Characters";
import { charactersLoader } from "../loaders/charactersLoader";
import { characterDetailLoader } from "../loaders/characterLoader";
import Test from "../pages/Test";

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
        path: paths.characters,
        element: <Characters />,
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