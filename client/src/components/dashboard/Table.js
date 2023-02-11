import React, { useRef } from "react"
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

export default function UserTable ({email})  {
    const [transactions, setTransations] = useEffect([])

    const getUserTransactions = () => {

    }
    
    useEffect(() => {
        getUserTransactions()
    }, [email])

}