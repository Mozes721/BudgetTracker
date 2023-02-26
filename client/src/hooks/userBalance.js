import { useState, useEffect } from 'react';
import { idStore } from "../store/store"
import axios from 'axios';

export default function UserBalance({ email }) {
  const [userTransactions, setUserTransactions] = useState([]);
  const [userId, setUserId] = useState(idStore.getState());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailUser = JSON.stringify({
          "email": email
        });
        const config = {
          method: 'post',
          url: 'http://localhost:5000/api/v1/email',
          headers: {
            'Content-Type': 'application/json'
          },
          data: emailUser
        };
        const response = await axios(config);
        setUserId(response.data);
        idStore.setState({id: response.data});
        const transactionsResponse = await axios(`http://localhost:5000/api/v1/expense/${userId}`);
        setUserTransactions(transactionsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email, userId]);


  return userTransactions;
}