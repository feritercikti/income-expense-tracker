import express from 'express';
import Transaction from '../models/Transaction.js';
import moment from 'moment';

const router = express.Router();

router.post('/add-transaction', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send('Transaction added succesfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/edit-transaction', async (req, res) => {
  try {
    await Transaction.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.send('Transaction updated succesfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/delete-transaction', async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.send('Transaction deleted succesfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/get-all-transactions', async (req, res) => {
  const { frequency, selectedRange, type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), 'd').toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== 'all' && { type }),
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
