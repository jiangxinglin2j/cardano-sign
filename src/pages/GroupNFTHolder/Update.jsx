import React, { useState, useContext } from 'react';
import { Button, Radio, Space } from 'antd';
import styled from 'styled-components';
import { WalletContext } from '../../utils/wallet';

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UpdateBtn = styled(Button)`
  display: flex;
  width: 200px;
  justify-content: center;
  margin-top: 10px;
`;

function Update() {
  const [value, setValue] = useState(1);
  const wallet = useContext(WalletContext);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleUpdate = () => {
    switch (value) {
      case 1:
        wallet.signedTx();
      break;
      default: console.log('df');
    }
  }

  return (
    <Body>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>newOracleWorker</Radio>
          <Radio value={2}>mustSignBy</Radio>
          <Radio value={3}>utxoForFee</Radio>
          <Radio value={4}>utxoForCollaterals</Radio>
          <Radio value={5}>changeAddr</Radio>
        </Space>
      </Radio.Group>
      <UpdateBtn type="primary" onClick={() => handleUpdate()}>Update</UpdateBtn>
    </Body>
  )
};

export default Update;