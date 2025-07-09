import React from 'react';

const Track = () => {
  return (
    <div className='mt-15 flex flex-col ml-60 '>
        <h1 className='font-bold text-3xl'>Enter Your Tracking ID</h1>
        <input className='h-15 border-gray-400 border-2 p-4 rounded-full mt-4 w-150' placeholder='Enter your 13-digit tracking ID' type="text" />
        <button className='h-12 w-30 border-gray-400 border-2 ml-60 mt-4 rounded-full  bg-blue-600 text-white font-bold cursor-pointer text-xl'>Track</button>
    </div>
  );
}

export default Track;
