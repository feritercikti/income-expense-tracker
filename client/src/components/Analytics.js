import { Progress } from 'antd';
import React from 'react';

const Analytics = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;

  const categories = [
    'salary',
    'freelance',
    'food',
    'entertainment',
    'education',
    'tax',
    'medical',
    'travel',
  ];

  return (
    <div>
      <div className='grid grid-cols-3 gap-10'>
        <div>
          <div className='shadow-[0_0_2px_gray] p-4 rounded-xl'>
            <h4 className='text-3xl'>
              Total Transactions : {totalTransactions}
            </h4>
            <hr className='py-2' />
            <h5 className='text-xl'>
              Income : {totalIncomeTransactions.length}
            </h5>
            <h5 className='text-xl'>
              Expense : {totalExpenseTransactions.length}
            </h5>

            <div className='flex items-center justify-center gap-12'>
              <Progress
                strokeColor='green'
                type='circle'
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor='red'
                type='circle'
                percent={totalExpenseTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className=''>
          <div className='shadow-[0_0_2px_gray] p-4 rounded-xl '>
            <h4 className='text-3xl'>Total Turnover : {totalTurnover}</h4>
            <hr className='py-2' />
            <h5 className='text-xl'>Income : {totalIncomeTurnover}</h5>
            <h5 className='text-xl'>Expense : {totalExpenseTurnover}</h5>

            <div className='flex items-center justify-center gap-12'>
              <Progress
                strokeColor='green'
                type='circle'
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor='red'
                type='circle'
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-5 py-6'>
        <div className=''>
          <div className='income-category'>
            <h3 className='text-3xl text-center'>Income by Categories</h3>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === 'income' && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className='p-2 shadow-[0_0_2px_gray] mt-4 rounded-xl'>
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className=''>
          <div className='expense-category'>
            <h3 className='text-3xl text-center'>Expense by Categories</h3>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === 'expense' && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className='p-2 shadow-[0_0_2px_gray] mt-4 rounded-xl'>
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
