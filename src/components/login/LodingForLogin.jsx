import React from 'react';

const LodingForLogin = () => {
  return (
    <div className="h-screen flex justify-center items-center text-lg font-bold">
      <span className="flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-screen w-screen -mt-80 -ml-50 rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 animate-pulse bg-red-500"></span>
      </span>
      <div>Loading...</div>
    </div>
  );
};

export default LodingForLogin;
