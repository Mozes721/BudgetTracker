import Navbar from './Navbar';
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Navigate } from "react-router-dom"
import React, { Component} from "react"
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const authenticated = useSelector(state => state.user.value.loggedIn)
  console.log(authenticated)
  if (!authenticated) {
    return <Navigate replace to="/" />;
    } else {
  return (
    <div >
      <Navbar className="d-grid gap-5"/>
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
}

export default Dashboard;