import React, { useEffect, useState } from "react"

const Expense = () => {
  const [transactions, setTransactions] = useState([])
  const [text, setText] = useState("")
  const [amount, setAmount] = useState("")

  useEffect(() => {
    const localStorageTransactions = JSON.parse(
      localStorage.getItem("expense-tracker")
    )
    if (localStorageTransactions) {
      setTransactions(localStorageTransactions)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("expense-tracker", JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (type) => {
    if (text.trim() === "" || amount.trim() === "") {
      alert("Please add a text and amount")
      return
    }

    const newTransaction = {
      id: generateID(),
      text,
      amount: type === "income" ? +amount : -amount,
    }

    setTransactions([...transactions, newTransaction])
    setText("")
    setAmount("")
  }

  const generateID = () => {
    return Math.floor(Math.random() * 100000000)
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
  }

  const total = transactions
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
  const expense = (
    transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0) * -1
  ).toFixed(2)

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
          <p className="money plus">${total}</p>
        </div>
      </div>
      <h3>Add Transaction</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
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
            Add Income
          </button>
          <button className="btn" onClick={() => addTransaction("expense")}>
            Add Expense
          </button>
        </div>
      </form>

      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
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
  )
}

export default Expense
