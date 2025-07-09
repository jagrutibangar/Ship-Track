import React from 'react';
import Track from './Track';
import CreateShipment from './CreateShipment';

const Body = () => {
  return (
    <div className='bg-[#C0D0DF] h-screen'>
    <h1 className='font-bold text-4xl ml-50 p-10 text-slate-800'>Welcome Aboard!</h1>
    <div className='flex flex-row'>
      <Track/>
      <CreateShipment/>
    </div>
    </div>
  );
}

export default Body;
