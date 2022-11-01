import React, { useState } from 'react';
import { Form, Input, message, Modal, Select } from 'antd';
import axios from 'axios';
import Spinner from './Spinner';

const AddEditTransaction = ({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  getTransactions,
  selectedItemEdit,
  setSelectedItemEdit,
}) => {
  const [loading, setLoading] = useState(false);

  const { Option } = Select;

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('money-tracker-user'));
      setLoading(true);
      if (selectedItemEdit) {
        await axios.put('/api/transactions/edit-transaction', {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: selectedItemEdit._id,
        });
        getTransactions();
        message.success('Transaction updated successfully');
      } else {
        await axios.post('/api/transactions/add-transaction', {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success('Transaction added successfully');
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemEdit(null);
      setLoading(false);
    } catch (error) {
      message.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Modal
      title={selectedItemEdit ? 'Edit Transaction' : 'Add Transaction'}
      visible={showAddEditTransactionModal}
      onCancel={() => {
        setShowAddEditTransactionModal(false);
        setSelectedItemEdit(null);
      }}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={selectedItemEdit}
      >
        <Form.Item label='Amount' name='amount'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Type' name='type'>
          <Select>
            <Option value='income'>Income</Option>
            <Option value='expense'>Expense</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Category' name='category'>
          <Select>
            <Option value='salary'>Salary</Option>
            <Option value='freelance'>Freelance</Option>
            <Option value='food'>Food</Option>
            <Option value='entertainment'>Entertainment</Option>
            <Option value='education'>Education</Option>
            <Option value='tax'>Tax</Option>
            <Option value='medical'>Medical</Option>
            <Option value='travel'>Travel</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Date' name='date'>
          <Input type='date' />
        </Form.Item>
        <Form.Item label='Reference' name='reference'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input type='text' />
        </Form.Item>
        <div className='flex justify-end'>
          <button className='bg-cyan-700 px-4 py-1 text-white' type='submit'>
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;
