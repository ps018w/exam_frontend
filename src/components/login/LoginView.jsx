import React, { useState } from 'react';
import loginImg from '../../assets/Images/loginImage.png';
import forgotPassword1 from '../../assets/Images/forgotPassword_img_1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../Feature/userDetailedSlice';
import LodingForLogin from './LodingForLogin';
import { Link, useNavigate } from 'react-router-dom';
import ToasterMessages from '../Toaster/ToasterMessages';
const LoginView = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  const [loginPayLoad, setLoginPayLoad] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { users, loading, error, successMsg } = useSelector(
    (state) => state.app,
  );
  const navigateTo = useNavigate();
  const changePasswordType = () => {
    setPasswordType(!passwordType);
  };
  const onChnageEmail = (e) => {
    setLoginPayLoad({
      ...loginPayLoad,
      email: e.target.value,
    });
  };
  const onChnagePassword = (e) => {
    setLoginPayLoad({
      ...loginPayLoad,
      password: e.target.value,
    });
  };
  const handleSubmit = () => {
    dispatch(createUser(loginPayLoad)).then((isSusses) => {
      if (isSusses) {
        if (isSusses?.error === undefined) {
          setSuccessMessage('Login successful');
          navigateTo('/home');
        } else {
          setSuccessMessage('Invalid Credentials');
        }
      }
    });
  };
  return (
    <div>
      {successMessage && (
        <ToasterMessages
          message={successMessage}
          variant={`${error !== null ? 'error' : ''}`}
        />
      )}
      {loading ? (
        <div>
          <LodingForLogin />
        </div>
      ) : (
        <section className="sc-theme-color">
          <div className="bg-opacity-80 bg-white flex flex-col min-h-screen relative sc-login z-10">
            <main className="w-full flex-1 flex items-center justify-center mx-auto">
              <div className="login-list">
                <div className="login-page">
                  <div className="mx-auto">
                    <h2 className="mt-6 text-center text-2xl lg:text-3xl leading-10 font-extrabold text-gray-800">
                      Sign In to getting started.
                    </h2>
                    <p className="mt-2 text-center text-lg leading-5 text-gray-400 max-w">
                      Enter your details to procced further.
                    </p>
                  </div>
                  <div className="sc-login-main mt-8 sm:mx-auto overflow-hidden rounded-lg shadow-lg">
                    <div className="sc-login-right-container bg-white flex">
                      <div className="flex flex-1 items-center sm:w-full">
                        <form className="w-full">
                          <div className="p-8 w-full loginForm">
                            <div>
                              <label
                                htmlFor="username"
                                className="block text-sm font-bold leading-5 text-gray-700"
                              >
                                Username
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  name="email"
                                  id="emailId"
                                  placeholder="Enter Your Username"
                                  value={loginPayLoad.email}
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                  onChange={(e) => onChnageEmail(e)}
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="mt-1">
                                <div>
                                  <div className="flex justify-between">
                                    <label
                                      className="block text-sm font-bold text-gray-700"
                                      htmlFor="password"
                                    >
                                      Password{' '}
                                    </label>
                                  </div>
                                  <div className="mt-1 relative rounded-md shadow-sm ">
                                    <input
                                      className="p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-16 sm:text-sm border-gray-300 rounded-md placeholder-gray-400 "
                                      id="passwordId"
                                      name="password"
                                      type={`${
                                        passwordType === true
                                          ? 'password'
                                          : 'text'
                                      }`}
                                      value={loginPayLoad.password}
                                      placeholder="Enter your password"
                                      onChange={(e) => onChnagePassword(e)}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                                      <div
                                        className="text-gray-400 w-6 cursor-pointer"
                                        onClick={() => changePasswordType()}
                                      >
                                        {passwordType === true ? (
                                          <span className="openEyeIcon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                              ></path>
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                              ></path>
                                            </svg>
                                          </span>
                                        ) : (
                                          <span className="closeEyeIcon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                              ></path>
                                            </svg>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <span className="block w-full rounded-md shadow-sm">
                                <button
                                  type="button"
                                  className="w-full h-12 items-center flex justify-center py-2 px-4 border border-transparent text-lg  rounded-md text-white sc-theme-color focus:outline-none hover:opacity-75 transition duration-150 ease-in-out"
                                  onClick={() => handleSubmit()}
                                >
                                  Login
                                </button>
                              </span>
                            </div>
                            <div className="flex justify-center mt-3">
                              <div className="text-base leading-5">
                                <a
                                  className="text-sm text-theme-color hover:underline focus:outline-none focus:underline transition ease-in-out duration-150"
                                  href="#"
                                >
                                  Forgot Password?
                                </a>
                              </div>
                            </div>
                            <div class="sc-login-form-bottom">
                              <div class="mt-3">
                                <div class="relative">
                                  <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-300"></div>
                                  </div>
                                  <div class="relative flex justify-center text-base leading-5">
                                    <span class="px-2 bg-white text-gray-500">
                                      OR
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="sc-login-single-sigin text-center mt-6">
                                <span className="text-gray-400 text-base inline-block mr-2">
                                  Don't have an account yet?
                                </span>
                                <Link
                                  to="/SingUp"
                                  className="text-theme-color hover:underline"
                                >
                                  Create an account
                                </Link>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="hidden relative lg:flex items-center text-center justify-center loginImgBlock sc-theme-color text-white">
                        <div
                          className="loginImg sc-theme-color absolute"
                          style={{
                            backgroundImage: 'url(' + `${loginImg}` + ')',
                            backgroundSize: 'cover',
                          }}
                        >
                          <div class="bg-opacity-20 bg-white loginImg z-0"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </section>
      )}
    </div>
  );
};

export default LoginView;
