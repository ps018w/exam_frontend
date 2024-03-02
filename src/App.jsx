// import Questions from "./questions/Questions";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Questions from "./components/questions/Questions";
import Category from "./components/category/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Category />,
  },
  {
    path: "/question",
    element: <Questions />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
