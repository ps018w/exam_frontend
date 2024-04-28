// import Questions from "./questions/Questions";
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Template from './components/Layout/Template';
import TemplateView from './components/Layout/TemplateView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './components/login/LoginView';
import SignupPage from './components/SignupPage/SignupPage';
import Category from './components/CategoryTemplate/Category';

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
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={LoginView} />
          <Route path="/Category" component={Category} />
          <Route path="/SingUp" component={SignupPage} />
          <Route path="/home/:id" component={TemplateView} />
          {/* <TemplateView /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
