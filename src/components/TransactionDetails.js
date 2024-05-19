import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TransactionDetails({ alchemy }) {
  const { transactionHash } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true);
        const txDetails = await alchemy.core.getTransaction(transactionHash);
        setTransaction(txDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transaction details');
        setLoading(false);
        console.error(err);
      }
    };

    if (transactionHash) {
      fetchTransactionDetails();
    }
  }, [transactionHash, alchemy]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Transaction Details</h1>
      {transaction ? (
        <ul>
          <li>Transaction Hash: {transaction.hash}</li>
          <li>Block Number: {transaction.blockNumber}</li>
          <li>From: {transaction.from}</li>
          <li>To: {transaction.to}</li>
          <li>Value: {transaction.value} wei</li>
          <li>Nonce: {transaction.nonce}</li>
          <li>Gas Price: {transaction.gasPrice} wei</li>
          <li>Gas Used: {transaction.gas}</li>
        </ul>
      ) : (
        <p>No transaction data available.</p>
      )}
    </div>
  );
}

export default TransactionDetails;
