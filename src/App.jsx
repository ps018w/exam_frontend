// import Questions from "./questions/Questions";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Template from './components/Layout/Template';
import TemplateView from './components/Layout/TemplateView';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Category />,
//   },
//   {
//     path: '/question',
//     element: <Questions />,
//   },
// ]);

const App = () => {
  return (
    <>
      <TemplateView />
      {/* <RouterProvider router={router} /> */}
    </>
  );
};

export default App;
