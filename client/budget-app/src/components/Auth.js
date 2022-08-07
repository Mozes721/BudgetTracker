

import React, { useRef, useState, useEffect } from "react"
import axios from 'axios';


// eslint-disable-next-line
export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('')
  }, [user, email, pwd])

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/',
      JSON.stringify({user, email, pwd}),
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      }
      );
      setUser('');
      setEmail('');
      setPwd('');
    } catch {
      setErrMsg('No Server Response');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("hello")
    const response = await axios.get('http://localhost:3001/api/v1/users')
    console.log(response)
    // try {
    //   const response = await axios.post('http://localhost:3001/api/v1/users/login/',
      
    //   JSON.stringify({user, pwd}),
    //   {
    //     headers: {'Content-Type': 'application/json'},
    //     withCredentials: true
    //   }
    //   );
    //   console.log("You have logged in");
    //   setUser('');
    //   setPwd('');
    // } catch {
    //   setErrMsg('No Server Response');
    // }
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  
  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onClick={handleLogin}>
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

  return (
    <div className="Auth-form-container">
      <form className="Auth-form"  onClick={handleRegister}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
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

