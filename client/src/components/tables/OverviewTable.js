import Table from 'react-bootstrap/Table';
import React, { useRef} from "react";
export default function OverviewTable ({ transactions }) {
  return (
    <Table striped bordered hover className="mt-5 table-dark w-75 col-md-6">
      <thead>
        <tr>
          <th>Title</th>
          <th>Expense</th>
          <th>Value</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.title}</td>
            <td>{transaction.expense ? "Expense" : "Income"}</td>
            <td>{transaction.value.toFixed(2)}</td>
            <td>{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}