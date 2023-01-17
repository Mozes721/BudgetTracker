
 import React, { useEffect, useState, createContext } from "react";
 import { useNavigate } from 'react-router-dom';
 import axios from "axios";
import  ErrorDanger  from "../../hooks/errorBoundary"; 


 export default function Login ({
  email, setEmail, emailRef,
  pwd, setPwd, authMode, setAuthMode
}) {
  
  const [error, setError] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const navigate = useNavigate();
  useEffect(() => {
  }, [email, pwd])
  

const handleLogin = async (e) => {
    e.preventDefault();
    const loginUser = JSON.stringify({
      "email": email,
      "password": pwd
    });
      const config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/users/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: loginUser
      };
      axios(config)
      .then(function () {
        localStorage.setItem("email", JSON.stringify(email));
        navigate("/dashboard");
      })
      .catch(function (error) {
        setError(error)
      });
      setEmail('');
      setPwd('');
    }
    if (error !== "") {
return (
  <main>
    <ErrorDanger />
      <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value ={email}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
      </main>
    )
}
    return (
      <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value ={email}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
      )
  }
