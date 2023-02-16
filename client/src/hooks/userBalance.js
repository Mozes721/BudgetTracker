import { useState, useEffect } from 'react';
import { idStore } from "../store/store"
import axios from 'axios';

export default function UserBalance({ email }) {
  const [userTransactions, setUserTransactions] = useState([]);
  const [userId, setUserId] = useState(idStore.getState());

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        try {
          const config = {
            method: 'get',
            url: 'http://localhost:5000/api/v1/email',
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({email})
          };
          const response = await axios.get(config);
          const userId = response.data;
          setUserId(userId);
          console.log("Hello")
          console.log(userId)
          idStore.setState({ id: userId});
          const transactionResponse = await axios.get(`http://localhost:5000/api/v1/expense/${userId}`);
          setUserTransactions(transactionResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [userId, email]);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        try {
          idStore.setState({ id: userId });
          const response = await axios.get(`http://localhost:5000/api/v1/expense/${userId}`);
          setUserTransactions(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [userId]);

  return userTransactions;
}
