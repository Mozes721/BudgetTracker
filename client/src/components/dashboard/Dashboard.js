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
  const { email } = emailStore.getState();
  // const { email, setEmail } = useStore(emailStore);
  const userTransactions = UserBalance(email);
  console.log(userTransactions);
  if (email !== null ) {
  return (
    <div className="row d-flex justify-content-center">
      <Navbar 
      className="d-grid gap-5 me-5" />

            <Balance email={email} />

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
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
                </tr>


            </tbody>
            </Table>
    </div>
    );
  }
  else {
    return <Navigate replace to="/" />;
  }
}

export default Dashboard;