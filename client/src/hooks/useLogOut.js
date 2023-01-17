import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const LogoutButton = () => {

    const [loggedOut, setLoggedOut] = useState(false)
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("email")
      setLoggedOut(true)
    };
  
    if (loggedOut) {
      return  navigate("/");
    }
  
    return <Button onClick={logout} variant="outline-warning">Logout</Button> 
  };