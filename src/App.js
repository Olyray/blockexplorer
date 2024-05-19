import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Alchemy, Network } from 'alchemy-sdk';
import './App.css';
import BlockList from './components/BlockList';
import BlockDetails from './components/BlockDetails';
import TransactionDetails from './components/TransactionDetails';
import WalletInfo from './components/WalletInfo';

// Setup Alchemy
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <WalletInfo alchemy={alchemy} />
            <BlockList alchemy={alchemy} />
          </Route>
          <Route path="/block/:blockNumber" exact>
            <BlockDetails alchemy={alchemy} />
          </Route>
          <Route path="/transaction/:transactionHash" exact>
            <TransactionDetails alchemy={alchemy} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
