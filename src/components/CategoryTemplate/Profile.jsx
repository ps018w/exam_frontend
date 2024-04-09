import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigateTo = useNavigate();

  const onClickLogOut = () => {
    navigateTo('/');
  };
  return (
    <div className=" top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="focus:outline-none">
              <span className="flex items-center justify-center w-12 h-12 font-semibold  rounded-full border-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                BM
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute  z-10 max-w-sm  transform px-4 sm:px-0 right-0 w-[500px] mt-[20px]">
                <div className="border border-gray-300 overflow-hidden rounded shadow-lg">
                  <div className="p-4 relative">
                    <div className="flex space-x-4">
                      <span className="flex items-center justify-center w-12 h-12 font-semibold  rounded-full border-2 bg-indigo-700 text-white">
                        BM
                      </span>
                      <div className="flex flex-col space-y-1">
                        <div className="text-sm font-semibold">
                          Balram Kumar Mandal
                        </div>
                        <span className="text-xs dark:text-gray-600">
                          {JSON.parse(sessionStorage.getItem('key')).email}
                        </span>
                      </div>
                    </div>
                    {/* hjhjjhhj */}
                    {/* {solutions.map((item) => (
                        right: 0px;
    width: 500px;
    margin-top: 20px;
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))} */}
                  </div>
                  <div className="bg-gray-50 p-4 text-right">
                    <button
                      className="dark:bg-red-700 dark:text-gray-50 px-6 py-2 rounded shadow-sm text-sm hover:bg-red-600"
                      onClick={() => onClickLogOut()}
                    >
                      Logout
                    </button>

                    {/* <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a> */}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Profile;
