interface Props {
  balance: number;
  income: number;
  expenses: number;
}

export default function BalanceCard({ balance, income, expenses }: Props) {
  const isPositive = balance >= 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        className={`p-6 rounded-xl border ${
          isPositive ? "bg-green-900/20 border-green-800" : "bg-red-900/20 border-red-800"
        }`}
      >
        <p className="text-sm text-gray-400 mb-1">Balance</p>
        <p className={`text-3xl font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? "" : "-"}${Math.abs(balance).toFixed(2)}
        </p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <p className="text-sm text-gray-400 mb-1">Total Income</p>
        <p className="text-2xl font-bold text-green-400">${income.toFixed(2)}</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <p className="text-sm text-gray-400 mb-1">Total Expenses</p>
        <p className="text-2xl font-bold text-red-400">${expenses.toFixed(2)}</p>
      </div>
    </div>
  );
}
