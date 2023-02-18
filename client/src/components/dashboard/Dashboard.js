import Navbar from '../Navbar';
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Navigate } from "react-router-dom"
import React from "react"
import { useEffect, useState } from "react";
import { useStore, create } from 'zustand';
import { persist } from 'zustand/middleware';
import { emailStore } from "../../store/store";
import UserBalance from '../../hooks/userBalance';
import Balance from '../Balance'


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const email = emailStore.getState();

  const values = UserBalance(email)
  console.log(values)

  useEffect(() => {
    const fetchData = async () => {
      const data = await UserBalance(email);
      setTransactions(data);
      const newBalance = data.length > 0 ? data[0].balance.toFixed(2) : 0;
      setBalance(newBalance);
    };

    fetchData();
  }, []);

  if (email === null) {
    return <Navigate replace to="/" />;
  }

  if (transactions.length > 0) {
    return (
      <div className="row d-flex justify-content-center">
        <Navbar className="d-grid gap-5 me-5" />

        <Balance balance={balance} />

        <Table striped bordered hover className="mt-5 table-dark w-75 col-md-6">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Expense</th>
              <th>Value</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.title}</td>
                <td>{transaction.expense ? "Expense" : "Income"}</td>
                <td>{transaction.value.toFixed(2)}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return (
      <div className="row d-flex justify-content-center">
        <Navbar className="d-grid gap-5 me-5" />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
