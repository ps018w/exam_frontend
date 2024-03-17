import React, { useState, useEffect } from 'react';

const Alert = ({ type, message, show }) => {
  const [showAlert, setShowAlert] = useState(show ?? false);
  useEffect(() => {
    setShowAlert(show);
  }, [show]);
  let alertClasses = '';

  switch (type) {
    case 'info':
      alertClasses =
        'text-blue-800 border-blue-300 bg-blue-50  dark:text-blue-400';
      break;
    case 'danger':
      alertClasses = 'text-red-800 border-red-300 bg-red-50  dark:text-red-400';
      break;
    case 'success':
      alertClasses =
        'text-green-800 border-green-300 bg-green-50  dark:text-green-400 dark:border-green-800';
      break;
    case 'warning':
      alertClasses =
        'text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800';
      break;
    default:
      alertClasses =
        'text-gray-800 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
  }

  return (
    showAlert && (
      <div
        className={`flex items-center p-4 my-3 text-sm border rounded-lg ${alertClasses}`}
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="flex flex-1 justify-between">
          <div className="font-medium">{message}</div>{' '}
          <div
            className="close cursor-pointer"
            onClick={(e) => {
              setShowAlert(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              height={20}
              width={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {/* Display the message */}
        </div>
      </div>
    )
  );
};

export default Alert;
