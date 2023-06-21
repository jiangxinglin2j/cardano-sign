import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/index.jsx';
import Footer from '@/components/Footer/index.jsx';
import DefaultComponent from './components/DefaultComponent.jsx';
import DefaultComponentChild from './components/DefaultComponentChild.jsx';
import { styled } from 'styled-components';
import { Buffer } from 'buffer';
import Layout from './components/Layout/index.jsx';
import Wallet, { WalletContext } from './utils/wallet.js';
// page
import GroupNFTHolderUpdate from '@/pages/GroupNFTHolder/Update.jsx';


const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

function App() {
  window.Buffer = window.Buffer || Buffer;
  // const { pathname } = useLocation();

  const [wallet, setWallet] = useState({});
  return (
    <Body>
      <Wallet wallet={wallet} setWallet={setWallet} />
      <WalletContext.Provider value={wallet}>
        <Router>
          <Header />
          <Layout>
            <Routes>
              <Route element={<DefaultComponent />} path="/TXSignatures">
                <Route element={<DefaultComponentChild />} path="TXSerialize&un-serialize" />
                <Route element={<DefaultComponentChild />} path="AddSignature4TXSerializedData" />
                <Route element={<DefaultComponentChild />} path="SubmitTXWithSignedTXSerializedData" />
              </Route>
              <Route element={<DefaultComponent />} path="/GroupNFTHolder">
                <Route element={<GroupNFTHolderUpdate />} path="Update" />
                <Route element={<DefaultComponentChild />} path="Upgrade" />
              </Route>
              <Route element={<DefaultComponent />} path="/AdminNFTHolder">
                <Route element={<DefaultComponentChild />} path="Update" />
                <Route element={<DefaultComponentChild />} path="Upgrade" />
              </Route>
              <Route element={<DefaultComponent />} path="/TreasuryCheck">
                <Route element={<DefaultComponentChild />} path="Mint" />
                <Route element={<DefaultComponentChild />} path="Burn" />
                <Route element={<DefaultComponentChild />} path="Migrate" />
              </Route>
              <Route element={<DefaultComponent />} path="/MintCheck">
                <Route element={<DefaultComponentChild />} path="Mint" />
                <Route element={<DefaultComponentChild />} path="Burn" />
                <Route element={<DefaultComponentChild />} path="Migrate" />
              </Route>
              <Route element={<DefaultComponent />} path="/StakeCheck">
                <Route element={<DefaultComponentChild />} path="RegisterStake" />
                <Route element={<DefaultComponentChild />} path="DeregisterStake" />
                <Route element={<DefaultComponentChild />} path="DelegateStake" />
                <Route element={<DefaultComponentChild />} path="Withdrawal" />
              </Route>
            </Routes>
          </Layout>
          <Footer />
        </Router>
      </WalletContext.Provider>
    </Body>
  );
}

export default App;
