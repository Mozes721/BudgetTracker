import React, { useRef, useState} from "react";
import  Register  from "./Register"
import  Login  from "./Login"
import Alert from 'react-bootstrap/Alert';


// eslint-disable-next-line
export default function () {
  let [authMode, setAuthMode] = useState("signin")
  const userRef = useRef();
  const emailRef = useRef();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  
  

  if (authMode === "signin") {
    
    return (
      <Register 
      user={user}
      setUser={setUser}
      userRef={userRef}
      email={email}
      setEmail={setEmail}
      emailRef={emailRef}
      pwd={pwd}
      setPwd={setPwd}
      authMode={authMode}
      setAuthMode={setAuthMode}
      />
    )
  }
      return (
      <Login 
      email={email}
      setEmail={setEmail}
      emailRef={emailRef}
      pwd={pwd}
      setPwd={setPwd}
      authMode={authMode}
      setAuthMode={setAuthMode}
      />
      )
  }
      



