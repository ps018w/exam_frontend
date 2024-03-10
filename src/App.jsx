// import Questions from "./questions/Questions";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Questions from './components/questions/Questions';
import Category from './components/category/Category';
import Template from './components/Layout/Template';
import TemplateView from './components/Layout/TemplateView';

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
      <TemplateView />
      {/* <RouterProvider router={router} /> */}
    </>
  );
};

export default App;
