import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import  ErrorDanger  from "../../hooks/errorBoundary";
import { emailStore } from "../../store/store";
import axios from "axios";



export default function Register ({
  user, setUser, userRef, email, 
  setEmail, emailRef, pwd, setPwd, 
  authMode, setAuthMode}) { 
  const navigate = useNavigate();
    useEffect(() => {
    }, [user, email, pwd])
    
   
    const [error, setError] = useState("");

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
  const handleRegister = async (e) => {
    e.preventDefault();
    const registerUser = JSON.stringify({
      "fullname": user,
      "email": email,
      "password": pwd
    });
  
    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/v1',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : registerUser
    };
    axios(config)
    .then(function () {
     emailStore.setState({ email: email})
     navigate("/dashboard");
    })
    .catch(function (error) {
      setError(error)
    });
    setUser('');
    setEmail('');
    setPwd('');
  }
  if (error !== "") {
    return (
      <main>
        <ErrorDanger />
        <div className="Auth-form-container">
        <form className="Auth-form"  onSubmit={handleRegister}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full name</label>
              <input
                type="fullname"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value ={user}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
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
                placeholder="Password"
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
      <form className="Auth-form"  onSubmit={handleRegister}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full name</label>
            <input
              type="fullname"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value ={user}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
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
              placeholder="Password"
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

