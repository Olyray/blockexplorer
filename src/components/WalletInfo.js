import React, { useState } from 'react';
import { Utils } from "alchemy-sdk";

function WalletInfo({ alchemy }) {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddressSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const addrBalance = await alchemy.core.getBalance(address);
      const txs = await alchemy.core.getAssetTransfers({
        fromBlock: '0x0',
        toAddress: address,
        order: 'desc',
        maxCount: 25,
        category: ["internal", "external"]
      });

      setBalance(Utils.formatEther(addrBalance));
      setTransactions(txs.transfers);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data for the address');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Wallet Information</h1>
      <form onSubmit={handleAddressSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
          required
        />
        <button type="submit">Get Info</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <h2>Balance: {balance} ETH</h2>
      <h3>Transactions:</h3>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((tx, index) => (
            <li key={index}>
              From: {tx.from} To: {tx.to} Value: {tx.value} ETH
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found for this wallet.</p>
      )}
    </div>
  );
}

export default WalletInfo;
