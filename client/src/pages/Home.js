import { message, Select, Table, DatePicker } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddEditTransaction from '../components/AddEditTransaction';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import moment from 'moment';
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Analytics from '../components/Analytics';

const { RangePicker } = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);

  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all');
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState('table');
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('money-tracker-user'));
      setLoading(true);
      const res = await axios.post('/api/transactions/get-all-transactions', {
        userid: user._id,
        frequency,
        ...(frequency === 'custom' && { selectedRange }),
        type,
      });
      setTransactionsData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post('/api/transactions/delete-transaction', {
        transactionId: record._id,
      });
      message.success('Transaction deleted successfully');
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div className=''>
            <EditOutlined
              className='text-lg cursor-pointer'
              onClick={() => {
                setSelectedItemEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined
              className='text-lg mx-2 cursor-pointer'
              onClick={() => deleteTransaction(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className='flex justify-between items-center shadow-[0px_0px_3px_gray] px-5 py-3 rounded-xl '>
        <div className='flex gap-6'>
          <div className='flex flex-col'>
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(value) => setFrequency(value)}
              style={{ width: 150 }}
            >
              <Select.Option value='7'>Last 1 week</Select.Option>
              <Select.Option value='30'>Last 1 month</Select.Option>
              <Select.Option value='365'>Last 1 year</Select.Option>
              <Select.Option value='custom'>Custom Date</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <div className='mt-2'>
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <h6>Select Type</h6>
            <Select
              value={type}
              onChange={(value) => setType(value)}
              style={{ width: 100 }}
            >
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </div>
        </div>

        <div className='flex '>
          <div>
            <div className='mx-5 border-2 border-solid border-gray-400 rounded-md p-1 '>
              <UnorderedListOutlined
                className={`mx-3 ${
                  viewType === 'table'
                    ? 'text-xl text-black'
                    : ' text-xl text-gray-300'
                }`}
                onClick={() => setViewType('table')}
              />
              <AreaChartOutlined
                className={` ${
                  viewType === 'analytics'
                    ? ' text-xl text-black'
                    : 'text-xl text-gray-300'
                }`}
                onClick={() => setViewType('analytics')}
              />
            </div>
          </div>
          <button
            className='bg-cyan-700 p-2 rounded-xl text-white'
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className='py-3 '>
        {viewType === 'table' ? (
          <Table columns={columns} dataSource={transactionsData} />
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          getTransactions={getTransactions}
          selectedItemEdit={selectedItemEdit}
          setSelectedItemEdit={setSelectedItemEdit}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
