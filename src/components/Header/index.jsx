import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import Wallet from "@/components/Wallet/index.jsx";

const HeaderCon = styled.div`
  padding: 20px 0;
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

const items = [
  getItem('TXSignatures', 'TXSignatures', null, [
    getItem('TX serialize/un-serialize', 'TXSignatures/TXSerialize&un-serialize'),
    getItem('Add signature for TX serialized data', 'TXSignatures/AddSignature4TXSerializedData'),
    getItem('Submit TX with signed TX serialized data', 'TXSignatures/SubmitTXWithSignedTXSerializedData'),
  ]),
  getItem('GroupNFTHolder', 'GroupNFTHolder', null, [
    getItem('Update', 'GroupNFTHolder/Update'),
    getItem('Upgrade', 'GroupNFTHolder/Upgrade')
  ]),
  getItem('AdminNFTHolder', 'AdminNFTHolder', null, [
    getItem('Update', 'AdminNFTHolder/Update'),
    getItem('Upgrade', 'AdminNFTHolder/Upgrade')
  ]),
  getItem('TreasuryCheck', 'TreasuryCheck', null, [
    getItem('Mint', 'TreasuryCheck/Mint'),
    getItem('Burn', 'TreasuryCheck/Burn'),
    getItem('Migrate', 'TreasuryCheck/Migrate'),
  ]),
  getItem('MintCheck', 'MintCheck', null, [
    getItem('Mint', 'MintCheck/Mint'),
    getItem('Burn', 'MintCheck/Burn'),
    getItem('Migrate', 'MintCheck/Migrate'),
  ]),
  getItem('StakeCheck', 'StakeCheck', null, [
    getItem('RegisterStake', 'StakeCheck/RegisterStake'),
    getItem('DeregisterStake', 'StakeCheck/DeregisterStake'),
    getItem('DelegateStake', 'StakeCheck/DelegateStake'),
    getItem('Withdrawal', 'StakeCheck/Withdrawal'),
  ]),
]

const rootSubmenuKeys = ['TXSignatures', 'GroupNFTHolder', 'AdminNFTHolder', 'TreasuryCheck', 'MintCheck', 'StakeCheck'];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState(['TXSignatures/TXSerialize&un-serialize', 'TXSignatures']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  const goToPath = (e) => {
    navigate(e.key)
  }

  useEffect(() => {
    const href = location.pathname;
    const key = [href, href.split('/')[1]];
    setOpenKeys(key);
  }, [location])

  return (
    <HeaderCon>
      <Wallet />
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={goToPath}
        items={items}
        style={{ flex: 1 }}
      />
    </HeaderCon>
  )
}

export default Header;