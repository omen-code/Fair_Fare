import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const WalletPage = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');

  const handleAddMoney = () => {
    const value = parseFloat(amount);
    if (value > 0) {
      toast.success(`Added ₹${value} to wallet`);
      setAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-dark p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-dark-light rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Wallet</h2>
            <Wallet className="w-6 h-6 text-primary" />
          </div>

          <div className="bg-dark-lighter rounded-lg p-6 mb-6">
            <p className="text-gray-400 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-primary">₹500.00</p>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="flex-1 bg-dark-lighter text-gray-200 px-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <button
              onClick={handleAddMoney}
              className="bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Money
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              <Transaction
                type="credit"
                amount={200}
                description="Added money to wallet"
                date="Mar 10, 2024"
              />
              <Transaction
                type="debit"
                amount={150}
                description="Paid for ride"
                date="Mar 8, 2024"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TransactionProps {
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

const Transaction: React.FC<TransactionProps> = ({ type, amount, description, date }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          {type === 'credit' ? (
            <ArrowDownRight className={`w-5 h-5 ${type === 'credit' ? 'text-green-500' : 'text-red-500'}`} />
          ) : (
            <ArrowUpRight className={`w-5 h-5 ${type === 'credit' ? 'text-green-500' : 'text-red-500'}`} />
          )}
        </div>
        <div>
          <p className="text-gray-200">{description}</p>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
      <p className={`font-semibold ${type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
        {type === 'credit' ? '+' : '-'}₹{amount}
      </p>
    </div>
  );
};

export default WalletPage;