import React from 'react';
import { Button, Dropdown, Menu, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem('money-tracker-user'));
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          label: (
            <li
              onClick={() => {
                localStorage.removeItem('money-tracker-user');
                navigate('/login');
              }}
            >
              Logout
            </li>
          ),
        },
      ]}
    />
  );
  return (
    <div className='my-0 mx-24 sm max-[700px]:my-0 max-[700px]:mx-[15px]'>
      <div className='bg-cyan-700 p-[20px] rounded-b-3xl flex justify-between items-center'>
        <div>
          <h1 className='text-3xl text-white opacity-70 m-0 cursor-pointer'>
            Money Tracker
          </h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement='bottomLeft'>
            <button className='bg-inherit px-4 py-1 rounded-lg text-white font-bold text-lg '>
              {user.name}
            </button>
          </Dropdown>
        </div>
      </div>
      <div className='h-[85vh] shadow-[0px_0px_3px_gray] mt-5 rounded-t-3xl p-[15px] overflow-y-scroll'>
        {props.children}
      </div>
    </div>
  );
};

export default DefaultLayout;
