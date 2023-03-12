import Navbar from '../Navbar';
import { Navigate } from "react-router-dom"
import React from "react"
import { useState, useEffect } from "react";
import { emailStore, idStore } from "../../store/store";
import OverviewTable from '../tables/OverviewTable';
import Balance from '../../components/Balance'
import  UserBalance  from '../../hooks/userBalance'


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(idStore.getState());
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const email = emailStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      console.log("in  fetchData")
      const data = await UserBalance(email);
      setTransactions(data);
      console.log(transactions);
  
      if (data.length > 0) {
        console.log("in  fetchData set")
        console.log(data);
        const newBalance = data[0].balance.toFixed(2);
        setBalance(newBalance);
      }
    };
  
    console.log("in  useEffect")
    fetchData();
  }, [email, loading]);

  if (email === null) {
    return <Navigate replace to="/" />;
  }
  
  return (
    <div className="row d-flex justify-content-center">
      <Navbar className="d-grid gap-5 me-5" />
      {!loading ? (
        <div className="d-flex justify-content-between">
          <Balance balance={balance} />
          <OverviewTable transactions={transactions}/>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

