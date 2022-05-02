/* eslint-disable no-useless-escape */
import React from 'react';
import '../styles/style.css';

// const FlashCard = () => {
//   return <div className="">Flash Card</div>;
// };

const CreateSet = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[#2ecc70] text-3xl font-bold mt-2">
        Tạo mới một khóa học
      </h1>

      <Input placeholder="Tên" />

      <Area placeholder="Mô tả" />

      <h2 className="text-blue-300 text-3xl border-b-2 mb-3 p-1 w-full max-w-md text-center">
        Danh sách card
      </h2>

      <Button>Thêm mới một Flash Card</Button>
    </div>
  );
};

export default CreateSet;

const Input = (props: any) => {
  return (
    <input
      {...props}
      className={`text-black text-2xl w-full max-w-md p-2 rounded-md mb-2 ${props.className}`}
    />
  );
};

const Area = (props: any) => {
  return (
    <textarea
      {...props}
      className={`text-black text-2xl w-full max-w-md p-2 rounded-md mb-2 ${props.className}`}
    />
  );
};

const Button = (props: any) => {
  return (
    <button
      {...props}
      className="px-4 py-2 border-transparent rounded 
        bg-[#3498db] min-w-[80px] cursor-pointer
        hover:bg-[#8e44ad] hover:shadow hover:shadow-[#ecf0f171] hover:scale-105"
    >
      {props.children}
    </button>
  );
};
