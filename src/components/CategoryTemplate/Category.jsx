import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryTemplate } from '../../Feature/useCategoryTemplateSlice.js';
import LodingForLogin from '../login/LodingForLogin.jsx';
import logo from '../../assets/Images/logo.jpeg';
import Profile from './Profile.jsx';
import Obslider from './Obslider.jsx';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.categoryTemplate,
  );
  const history = useNavigate();
  useEffect(() => {
    dispatch(getCategoryTemplate('getCategoryTemplate'));
  }, [dispatch]);
  const getIndividualCategory = (key) => {
    setSelectedCategory([...selectedCategory, key]);
  };
  const handleRedirect = (id) => {
    history(`/home/${id}`);
  };

  return (
    <>
      {loading ? (
        <LodingForLogin />
      ) : (
        <div>
          <div className="p-4 shadow-lg flex justify-between">
            <div className="leftContainer">
              {' '}
              <a href="#" className="flex items-center">
                <img
                  src={logo}
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
              </a>
            </div>
            <div className="flex items-center rightContainer user_loginBox">
              <Obslider
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <Profile />
            </div>
          </div>
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400 animate-bounce focus:animate-none hover:animate-none">
                  Get Started
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                Choose a category to get started
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque rem aperiam, eaque ipsa quae.
              </p>
            </div>
            <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data?.map((subData, index) => (
                <div
                  className="group hover:bg-indigo-50 hover:border-indigo-600 flex flex-col justify-between p-5 border rounded shadow-sm transform transition duration-500 hover:scale-105"
                  key={subData?.id}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full duration-500 bg-indigo-50 group-hover:bg-gray-50">
                        <svg
                          className="w-12 h-12 text-indigo-600"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </div>
                    </div>
                    <h6 className="mb-2 font-semibold leading-5">
                      {subData?.category_name}
                    </h6>
                    <p className="mb-3 text-sm text-gray-900">
                      {subData?.description}
                    </p>
                    <div className="mt-1 mb-4 mr-1 text-4xl font-bold sm:text-5xl">
                      ${subData?.price}
                    </div>
                    {JSON.parse(
                      localStorage.getItem('selectedCategoryId'),
                    )?.some(
                      (k) => k.category_name === subData?.category_name,
                    ) ? (
                      <button
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                        onClick={() => handleRedirect(subData.id)}
                      >
                        Start Test
                      </button>
                    ) : (
                      <>
                        {selectedCategory.some(
                          (k) => k.category_name === subData?.category_name,
                        ) === true ? (
                          <button
                            disabled
                            className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50 w-full"
                          >
                            Added to cart
                          </button>
                        ) : (
                          <button
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                            onClick={() => getIndividualCategory(subData)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
