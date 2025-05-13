import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Signin";
import MyPage from "../pages/MyPage";

const routes = [
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/mypage", element: <MyPage /> },
];

const browserRouter = createBrowserRouter(routes);

const Router = () => <RouterProvider router={browserRouter} />;

export default Router;
