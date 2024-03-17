import React, { useState } from 'react';
import forgotPassword1 from '../../assets/Images/signUp_img_1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../Feature/userSignUpSlice';
import LodingForLogin from '../login/LodingForLogin';
import Alert from '../Alert/Alert';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [signUpPayLoad, setSignUpPayLoad] = useState({
    email: '',
    name: '',
    password: '',
    password2: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const { users, loading, error, successMsg } = useSelector(
    (state) => state.signUp,
  );
  const navigateTo = useNavigate();

  const onChangeEmail = (e) => {
    setSignUpPayLoad({
      ...signUpPayLoad,
      email: e.target.value,
    });
  };
  const onChangeName = (e) => {
    setSignUpPayLoad({
      ...signUpPayLoad,
      name: e.target.value,
    });
  };
  const onChangePassword = (e) => {
    setSignUpPayLoad({
      ...signUpPayLoad,
      password: e.target.value,
    });
  };
  const onChangeConfirmPassword = (e) => {
    setSignUpPayLoad({
      ...signUpPayLoad,
      password2: e.target.value,
    });
  };
  const handleSubmit = () => {
    dispatch(signUpUser(signUpPayLoad)).then((isSusses) => {
      if (isSusses) {
        if (Array.isArray(isSusses?.payload?.data?.email)) {
          setSuccessMessage(isSusses?.payload?.data?.email[0]);
        } else {
          navigateTo('/');
        }
      }
    });
  };
  return (
    <div>
      {loading ? (
        <div>
          <LodingForLogin />
        </div>
      ) : (
        <section className="sc-theme-color">
          <div className="bg-opacity-80 bg-white flex flex-col min-h-screen relative sc-login z-10">
            {successMessage && (
              <div className="mx-auto w-full md:w-[34rem]">
                <Alert type="danger" message={successMessage} show={true} />
              </div>
            )}
            <main className="w-full flex-1 flex items-center justify-center mx-auto">
              <div className="relative sc-forgot-password-main">
                <div className="card-wrapper-md sc-forgotpassword">
                  <div className="space-y-2">
                    <div className="font-bold text-2xl">Sing Up</div>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={forgotPassword1}
                      alt="image not found"
                      style={{
                        height: '230px',
                      }}
                    />
                  </div>
                  <form class="space-y-6">
                    <div className="text-start">
                      <div className="flex flex-col gap-3">
                        <div>
                          <label
                            htmlFor="emailId"
                            className="block text-sm font-bold leading-5 text-gray-700"
                          >
                            Username
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              id="emailId"
                              name="email"
                              placeholder="Enter Your Username"
                              value={signUpPayLoad.email}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              onChange={(e) => onChangeEmail(e)}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="nameId"
                            className="block text-sm font-bold leading-5 text-gray-700"
                          >
                            Name
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              id="nameId"
                              type="text"
                              name="name"
                              value={signUpPayLoad.name}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              onChange={(e) => onChangeName(e)}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="passwordId"
                            className="block text-sm font-bold leading-5 text-gray-700"
                          >
                            Password
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              id="passwordId"
                              type="password"
                              name="password"
                              value={signUpPayLoad.password}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              onChange={(e) => onChangePassword(e)}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-bold leading-5 text-gray-700"
                          >
                            Confirm Password
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              id="confirmPassword"
                              type="text"
                              name="password2"
                              value={signUpPayLoad.password2}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              onChange={(e) => onChangeConfirmPassword(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <button
                        // type="submit"
                        type="button"
                        className="w-full h-12 items-center flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 focus:outline-none hover:opacity-75 transition duration-150 ease-in-out"
                        onClick={() => handleSubmit()}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </section>
      )}
    </div>
  );
};

export default SignupPage;
