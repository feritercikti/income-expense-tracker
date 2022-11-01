import { Form, message } from 'antd';
import Input from 'antd/lib/input/Input';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', values);
      localStorage.setItem(
        'money-tracker-user',
        JSON.stringify({ ...res.data, password: '' })
      );
      setLoading(false);
      message.success('Login successful');
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error('Login failed');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('money-tracker-user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-r from-[#cfd9df] to-[#e2ebf0] overflow-hidden w-full '>
      {loading && <Spinner />}
      <div className='flex items-center justify-center gap-10 columns-2 max-[680px]:flex-col mx-3'>
        <div className='w-3/6'>
          <div className='max-[680px]:hidden'>
            <lottie-player
              src='https://assets1.lottiefiles.com/packages/lf20_vo0zbstd.json'
              background='transparent'
              speed='1'
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className='w-[500px] max-[680px]:w-4/6  max-[680px]:h-[450px]'>
          <Form layout='vertical' onFinish={onFinish}>
            <h1 className='text-3xl text-center'>LOGIN</h1>

            <Form.Item label='Email' name='email' className='font-semibold'>
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              className='font-semibold'
            >
              <Input type='password' />
            </Form.Item>
            <div className='flex gap-2 justify-between items-center'>
              <Link to='/register'>
                Don't have an account? Click here to Register
              </Link>
              <button
                className='text-white font-bold py-1 px-5 border-none bg-cyan-700 rounded-md'
                type='submit'
              >
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
