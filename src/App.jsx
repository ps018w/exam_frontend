// import Questions from "./questions/Questions";
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Template from './components/Layout/Template';
import TemplateView from './components/Layout/TemplateView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginView />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/SingUp" element={<SignupPage />} />
          <Route path="/home/:id" element={<TemplateView />} />
          {/* <TemplateView /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
