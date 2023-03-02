import Navbar from '../Navbar';
import { Navigate } from "react-router-dom"
import React from "react"
import { useState, useEffect } from "react";
import { emailStore } from "../../store/store";
import { idStore } from "../../store/store";
import axios from 'axios';
import Balance from '../Balance'
import OverviewTable from '../tables/OverviewTable';


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const email = emailStore.getState();


  const fetchData = async () => {
    try {
      const emailUser = JSON.stringify({
        "email": email
      });
      const config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/email',
        headers: {
          'Content-Type': 'application/json'
        },
        data: emailUser
      };
      const response = await axios(config);
      const userId = response.data;
      idStore.setState({id: userId});
      const transactionsResponse = await axios(`http://localhost:5000/api/v1/expense/${userId}`);
      setTransactions(transactionsResponse.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (email === null) {
    return <Navigate replace to="/" />;
  }
  
  return (
    <div className="row d-flex justify-content-center">
      <Navbar className="d-grid gap-5 me-5" />
      {loading ? (
        <div>
          <Balance balance={balance} />
          <OverviewTable transaction={transactions}/>
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
