import Navbar from '../Navbar';
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Navigate } from "react-router-dom"
import React, { useRef } from "react"
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const [email, setEmail] = useState('');

  const saveEmail = () => {
    let email = localStorage.getItem("email")
    let emailSplit = email.replace(/[|&;$%@"<>()+,]/g, "");
    setEmail(emailSplit);
  }
  useEffect(() => {
    saveEmail()
  }, []);

  if (email !== null ) {
  return (
    <div >
      <Navbar 
      className="d-grid gap-5" email={email} />
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
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