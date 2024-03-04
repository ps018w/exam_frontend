// import Questions from "./questions/Questions";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Questions from './components/questions/Questions';
import Category from './components/category/Category';
import Template from './components/Layout/Template';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Category />,
  },
  {
    path: '/question',
    element: <Questions />,
  },
]);
const App = () => {
  return (
    <>
      <Template />
      {/* <RouterProvider router={router} /> */}
    </>
  );
};

export default App;
