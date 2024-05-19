import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function BlockDetails({ alchemy }) {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockDetails = async () => {
      try {
        setLoading(true);
        const blockDetails = await alchemy.core.getBlock(blockNumber);
        setBlock(blockDetails);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch block details');
        setLoading(false);
        console.error(err);
      }
    };

    if (blockNumber) {
      fetchBlockDetails();
    }
  }, [blockNumber, alchemy]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Block Details</h1>
      <h2>Block Number: {block.number}</h2>
      <h3>Hash: {block.hash}</h3>
      <h3>Timestamp: {new Date(block.timestamp * 1000).toLocaleString()}</h3>
      <h3>Transactions:</h3>
      {block.transactions && block.transactions.length > 0 ? (
        <ul>
          {block.transactions.map(tx => (
            <li key={tx}>
              <Link to={`/transaction/${tx}`}>Transaction: {tx}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions in this block.</p>
      )}
    </div>
  );
}

export default BlockDetails;
