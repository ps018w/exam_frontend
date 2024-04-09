import React, { useEffect, useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '../../Feature/userPaymentSlice.js';
const Obslider = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.payment);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (!mobileOpen) return;
    }
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [mobileOpen]);

  const onClickShowSlider = () => {
    setMobileOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const onClickCloseSlider = () => {
    setMobileOpen(false);
    document.body.classList.remove('overflow-hidden');
  };
  const removeItem = (key) => {
    let filterItem = selectedCategory.filter((k) => key !== k.category_name);
    setSelectedCategory([...filterItem]);
  };

  const totalPrice = selectedCategory.reduce(
    (total, test) => Number(total) + Number(test.price),
    0,
  );
  const checkoutAction = () => {
    let priceTags = [];
    selectedCategory.forEach((element) => {
      priceTags.push(element.price_tag);
    });
    let payLoad = {
      price_tags: priceTags,
    };
    localStorage.setItem(
      'selectedCategoryId',
      JSON.stringify(selectedCategory),
    );
    dispatch(createPayment(payLoad)).then((isSusses) => {
      if (isSusses) {
        if (isSusses?.payload?.response?.data?.url) {
          window.location.href = isSusses?.payload?.response?.data?.url;
        }
      }
    });
  };
  return (
    <>
      <button onClick={onClickShowSlider} className="mr-5">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-shopping-cart"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {selectedCategory.length > 0 && (
            <span class="flex absolute top-0 end-0 -mt-2 -me-2">
              <span class="animate-ping absolute inline-flex size-full rounded-full bg-gray-400 opacity-75 dark:bg-gray-600"></span>
              <span class="border-2 relative px-2 inline-flex text-xs bg-gray-900 text-white rounded-full  -top-[1px] left-[8px]">
                {selectedCategory.length}
              </span>
            </span>
          )}
          {/* {selectedCategory.length > 0 && (
            <span className="absolute bg-gray-900 border-2 px-2 rounded-full text-sm text-white -top-[12px] left-[15px]">
              {selectedCategory.length}
            </span>
          )} */}
        </div>
      </button>
      <Transition show={mobileOpen}>
        <div className="fixed inset-0 z-10 bg-black opacity-50" />
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-500 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="border  fixed h-screen opacity-100 right-0 shadow-2xl top-0 z-20 dark:bg-gray-50"
          style={{
            width: '650px',
          }}
        >
          <div className="h-screen overflow-auto sliderContener">
            <div className="border-b flex justify-between px-6 py-4 border-gray-300">
              <span className="font-bold text-base uppercase">
                Shopping Cart
              </span>
              <Transition.Child
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                aria-label="Close sidebar"
                as="button"
                className="focus:outline-none"
                onClick={onClickCloseSlider}
              >
                <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 border-none flex h-[30px] items-center  justify-center p-2 rounded-full text-sm text-white w-[30px]">
                  X
                </button>
              </Transition.Child>
            </div>
            {loading ? (
              <div
                role="status"
                className="flex font-light items-center justify-center text-2xl h-screen"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-indigo-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
                {selectedCategory.length > 0 ? (
                  <>
                    <h2 className="text-xl font-semibold">Your cart</h2>
                    <ul className="flex flex-col divide-y dark:divide-gray-300">
                      {selectedCategory?.map((data, index) => (
                        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                          <div className="flex w-full space-x-2 sm:space-x-4">
                            <img
                              className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                              src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
                              alt="Polaroid camera"
                            />
                            <div className="flex flex-col justify-between w-full pb-4">
                              <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                  <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                    {data.category_name}
                                  </h3>
                                  <p className="text-sm dark:text-gray-600 w-[95%]">
                                    {data.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-semibold">
                                    ${data.price}
                                  </p>
                                  {/* <p className="text-sm line-through dark:text-gray-400">
                                  75.50€
                                </p> */}
                                </div>
                              </div>
                              <div className="flex text-sm divide-x">
                                <button
                                  type="button"
                                  className="flex items-center px-2 py-1 pl-0 space-x-1"
                                  onClick={() => removeItem(data.category_name)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4 h-4 fill-current"
                                  >
                                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                    <rect
                                      width="32"
                                      height="200"
                                      x="168"
                                      y="216"
                                    ></rect>
                                    <rect
                                      width="32"
                                      height="200"
                                      x="240"
                                      y="216"
                                    ></rect>
                                    <rect
                                      width="32"
                                      height="200"
                                      x="312"
                                      y="216"
                                    ></rect>
                                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                  </svg>
                                  <span>Remove</span>
                                </button>
                                {/* <button
                                type="button"
                                className="flex items-center px-2 py-1 space-x-1"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="w-4 h-4 fill-current"
                                >
                                  <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                </svg>
                                <span>Add to favorites</span>
                              </button> */}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      {/* <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <img
                          className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                          src="https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=675&amp;q=80"
                          alt="Replica headphones"
                        />
                        <div className="flex flex-col justify-between w-full pb-4">
                          <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                Replica headphones
                              </h3>
                              <p className="text-sm dark:text-gray-600">
                                White
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">99.95€</p>
                              <p className="text-sm line-through dark:text-gray-400">
                                150€
                              </p>
                            </div>
                          </div>
                          <div className="flex text-sm divide-x">
                            <button
                              type="button"
                              className="flex items-center px-2 py-1 pl-0 space-x-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4 h-4 fill-current"
                              >
                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                <rect
                                  width="32"
                                  height="200"
                                  x="168"
                                  y="216"
                                ></rect>
                                <rect
                                  width="32"
                                  height="200"
                                  x="240"
                                  y="216"
                                ></rect>
                                <rect
                                  width="32"
                                  height="200"
                                  x="312"
                                  y="216"
                                ></rect>
                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                              </svg>
                              <span>Remove</span>
                            </button>
                            <button
                              type="button"
                              className="flex items-center px-2 py-1 space-x-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4 h-4 fill-current"
                              >
                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                              </svg>
                              <span>Add to favorites</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li> */}
                    </ul>
                    <div className="space-y-1 text-right">
                      <p>
                        Total amount:
                        <span className="font-semibold">${totalPrice}</span>
                      </p>
                      <p className="text-sm dark:text-gray-600">
                        Not including taxes
                      </p>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="w-1/2 h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none"
                        onClick={() => checkoutAction()}
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex font-light items-center justify-center text-2xl h-[500px] text-gray-400">
                    Your basket is empty
                  </div>
                )}
              </div>
            )}
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
};

export default Obslider;
