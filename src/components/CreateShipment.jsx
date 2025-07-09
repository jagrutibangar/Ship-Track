import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateShipment = () => {

  const navigate = useNavigate();

  return (
    <>
    <div className='border-gray-500 border-2 rounded-4xl ml-25 mt-20 w-80 p-10'>
    <h2 className='font-bold text-2xl'>Ship a Parcel here!</h2>
    <input type="text" />
      <button className='h-12 w-30 border-gray-400 border-2 ml-15 mt-4 rounded-full  bg-blue-600 text-white font-bold cursor-pointer text-xl' onClick={() => navigate("/create-shipment")}>Ship</button>
    </div>
    </>
  );
}

export default CreateShipment;
