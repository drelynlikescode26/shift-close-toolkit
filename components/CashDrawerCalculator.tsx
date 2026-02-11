'use client';

import { useState, useEffect } from 'react';

interface Denomination {
  name: string;
  value: number;
  quantity: number;
}

const getInitialData = () => {
  if (typeof window === 'undefined') return null;
  const savedData = localStorage.getItem('cashDrawerData');
  return savedData ? JSON.parse(savedData) : null;
};

export default function CashDrawerCalculator() {
  const initialData = getInitialData();

  // Coin denominations
  const [coins, setCoins] = useState<Denomination[]>(
    initialData?.coins || [
      { name: 'Penny', value: 0.01, quantity: 0 },
      { name: 'Nickel', value: 0.05, quantity: 0 },
      { name: 'Dime', value: 0.10, quantity: 0 },
      { name: 'Quarter', value: 0.25, quantity: 0 },
    ]
  );

  // Bill denominations
  const [bills, setBills] = useState<Denomination[]>(
    initialData?.bills || [
      { name: '$1', value: 1, quantity: 0 },
      { name: '$5', value: 5, quantity: 0 },
      { name: '$10', value: 10, quantity: 0 },
      { name: '$20', value: 20, quantity: 0 },
      { name: '$50', value: 50, quantity: 0 },
      { name: '$100', value: 100, quantity: 0 },
    ]
  );

  // Coin rolls
  const [rolls, setRolls] = useState<Denomination[]>(
    initialData?.rolls || [
      { name: 'Penny Roll', value: 0.50, quantity: 0 },
      { name: 'Nickel Roll', value: 2.00, quantity: 0 },
      { name: 'Dime Roll', value: 5.00, quantity: 0 },
      { name: 'Quarter Roll', value: 10.00, quantity: 0 },
    ]
  );

  const [showRolls, setShowRolls] = useState(initialData?.showRolls || false);
  const [targetDrawer, setTargetDrawer] = useState(initialData?.targetDrawer || 200);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = {
      coins,
      bills,
      rolls,
      targetDrawer,
      showRolls,
    };
    localStorage.setItem('cashDrawerData', JSON.stringify(dataToSave));
  }, [coins, bills, rolls, targetDrawer, showRolls]);

  const updateQuantity = (
    type: 'coins' | 'bills' | 'rolls',
    index: number,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    if (numValue < 0) return; // Prevent negative values

    const setter = type === 'coins' ? setCoins : type === 'bills' ? setBills : setRolls;
    const current = type === 'coins' ? coins : type === 'bills' ? bills : rolls;

    const updated = [...current];
    updated[index] = { ...updated[index], quantity: numValue };
    setter(updated);
  };

  // Calculate totals
  const calculateTotal = (items: Denomination[]) =>
    items.reduce((sum, item) => sum + item.value * item.quantity, 0);

  const coinTotal = calculateTotal(coins);
  const billTotal = calculateTotal(bills);
  const rollTotal = showRolls ? calculateTotal(rolls) : 0;
  const grandTotal = coinTotal + billTotal + rollTotal;
  const difference = grandTotal - targetDrawer;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const resetAll = () => {
    setCoins(coins.map(c => ({ ...c, quantity: 0 })));
    setBills(bills.map(b => ({ ...b, quantity: 0 })));
    setRolls(rolls.map(r => ({ ...r, quantity: 0 })));
    setTargetDrawer(200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-zinc-900 dark:text-zinc-100">
          Shift Close Toolkit
        </h1>

        {/* Target Drawer */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <label className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
            Target Drawer Amount
          </label>
          <input
            type="number"
            value={targetDrawer}
            onChange={(e) => setTargetDrawer(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
            step="0.01"
            min="0"
          />
        </div>

        {/* Bills Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
            Bills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {bills.map((bill, index) => (
              <div key={bill.name} className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                  {bill.name}
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={bill.quantity || ''}
                  onChange={(e) => updateQuantity('bills', index, e.target.value)}
                  className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                  min="0"
                  placeholder="0"
                />
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {formatCurrency(bill.value * bill.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-right">
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Bills Total: {formatCurrency(billTotal)}
            </span>
          </div>
        </div>

        {/* Coins Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
            Coins
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {coins.map((coin, index) => (
              <div key={coin.name} className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                  {coin.name}
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={coin.quantity || ''}
                  onChange={(e) => updateQuantity('coins', index, e.target.value)}
                  className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                  min="0"
                  placeholder="0"
                />
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {formatCurrency(coin.value * coin.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-right">
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Coins Total: {formatCurrency(coinTotal)}
            </span>
          </div>
        </div>

        {/* Coin Rolls Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowRolls(!showRolls)}
            className="w-full py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg font-medium transition-colors text-zinc-900 dark:text-zinc-100"
          >
            {showRolls ? '− Hide' : '+ Show'} Coin Rolls
          </button>

          {showRolls && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
                Coin Rolls (Unopened)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {rolls.map((roll, index) => (
                  <div key={roll.name} className="flex flex-col">
                    <label className="text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                      {roll.name}
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={roll.quantity || ''}
                      onChange={(e) => updateQuantity('rolls', index, e.target.value)}
                      className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                      min="0"
                      placeholder="0"
                    />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {formatCurrency(roll.value * roll.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-right">
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Rolls Total: {formatCurrency(rollTotal)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Totals Summary */}
        <div className="border-t-2 border-zinc-300 dark:border-zinc-700 pt-4 space-y-3">
          <div className="flex justify-between items-center text-2xl font-bold">
            <span className="text-zinc-900 dark:text-zinc-100">Grand Total:</span>
            <span className="text-green-600 dark:text-green-400">
              {formatCurrency(grandTotal)}
            </span>
          </div>
          <div className="flex justify-between items-center text-xl">
            <span className="text-zinc-900 dark:text-zinc-100">Target:</span>
            <span className="text-zinc-700 dark:text-zinc-300">
              {formatCurrency(targetDrawer)}
            </span>
          </div>
          <div className="flex justify-between items-center text-xl font-semibold">
            <span className="text-zinc-900 dark:text-zinc-100">Difference:</span>
            <span
              className={
                difference > 0
                  ? 'text-green-600 dark:text-green-400'
                  : difference < 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-zinc-700 dark:text-zinc-300'
              }
            >
              {difference > 0 ? '+' : ''}
              {formatCurrency(difference)}
            </span>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-6">
          <button
            onClick={resetAll}
            className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
