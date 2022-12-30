import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import axios from "axios";
import { useDispatch } from 'react-redux'


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
  const navigate = useNavigate();
  const dispatch = useDispatch()
 

  useEffect(() => {
    setErrMsg('')
  }, [user, email, pwd])



  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("handle register");
    const registerUser = JSON.stringify({
      "fullname": user,
      "email": email,
      "password": pwd
    });
    console.log(user)
    console.log(registerUser);
    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/v1/users/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : registerUser
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));

      dispatch(login({
        email:email,
        loggedIn:true,
      }));


      navigate("/dashboard");
    })
    .catch(function (error) {
      console.log(error);
    });
    setUser('');
    setEmail('');
    setPwd('');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handle login");
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
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        dispatch(login({
          email:email,
          loggedIn:true,
        }));

        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
      setEmail('');
      setPwd('');
    }
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  
  if (authMode === "signin") {
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


