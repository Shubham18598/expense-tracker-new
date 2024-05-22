import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Expense = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  const addTransaction = (type) => {
    if (text.trim() === "" || amount.trim() === "") {
      alert("Please add a text and amount");
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      text,
      amount: type === "income" ? +amount : -amount,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const filteredTransactions = () => {
    switch (filterOption) {
      case "all":
        return transactions;
      case "income":
        return transactions.filter((transaction) => transaction.amount > 0);
      case "expense":
        return transactions.filter((transaction) => transaction.amount < 0);
      default:
        return transactions;
    }
  };

  // Calculate total, income, and expenses
  let total = 0;
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    total += transaction.amount;
    if (transaction.amount > 0) {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  });

  total = total.toFixed(2);
  income = income.toFixed(2);
  expense = Math.abs(expense).toFixed(2);

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+${income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-${expense}</p>
        </div>
      </div>
      <div className="inc-exp-container">
        <div>
          <h4>Balance</h4>
          <p className="money total">${total}</p>
        </div>
      </div>
      <div className="add-tran">
        <div className="add-transaction">
          <h3>Add Transaction</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-control">
              <label htmlFor="text">Text</label>
              <input
                type="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
              />
            </div>
            <div className="form-control">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount..."
              />
            </div>
            <div className="buttons">
              <button className="btn" onClick={() => addTransaction("income")}>
                Income
              </button>
              <button className="btn" onClick={() => addTransaction("expense")}>
                Expense
              </button>
            </div>
          </form>
        </div>
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <div className="select-container">
            <select
              className="select"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <ul className="list">
            {filteredTransactions().map((transaction) => (
              <li
                key={transaction.id}
                className={transaction.amount < 0 ? "minus" : "plus"}
              >
                {transaction.text} <span>${Math.abs(transaction.amount)}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expense;
