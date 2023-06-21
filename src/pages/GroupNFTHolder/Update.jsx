import React, { useState, useContext } from 'react';
import { Button, Radio, Space, Input } from 'antd';
import styled from 'styled-components';
import { WalletContext } from '../../utils/wallet';
import { getLocalData } from '../../utils/local';

const { TextArea } = Input;

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

const TextAreaCon = styled(TextArea)`
  margin: 20px 0;
`;

function Update() {
  const [value, setValue] = useState(1);
  const [textValue, setTextValue] = useState('addr_test1qz6twkzgss75sk379u0e27phvwhmtqqfuhl5gnx7rh7nux2xg4uwrhx9t58far8hp3a06hfdfzlsxgfrzqv5ryc78e4s4dwh26');
  const wallet = useContext(WalletContext);


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    setTextValue('');
  };

  const handleUpdate = () => {
    switch (value) {
      case 1:
        if (!textValue) throw new Error('inp text');
        // const newOracleWorker = { 
        //   newOracleWorker: "addr_test1qz6twkzgss75sk379u0e27phvwhmtqqfuhl5gnx7rh7nux2xg4uwrhx9t58far8hp3a06hfdfzlsxgfrzqv5ryc78e4s4dwh26" 
        // }
        // const signArr = [ 
        //   "addr_test1qzqchffrha5hjcztwx0p48wtv0y36hw098rdw366fqlzuymun97wgelqtwe9aladfx2pukf4jdfqtjh7cnja50y247dsnalv6f" 
        // ]
        const newOracleWorker = { 
          newOracleWorker: textValue
        }
        let signArr = getLocalData('sign');
        if (!signArr) throw new Error('inp sign array');
        signArr = Object.values(signArr).map(v => v.value);
        console.log('signedTx option:', newOracleWorker, signArr)
        wallet.signedTx(newOracleWorker, signArr);
      break;
      case 2:
        console.log('cur radio checked', value, textValue);
      break;
      case 3:
        console.log('cur radio checked', value, textValue);
      break;
      case 4:
        console.log('cur radio checked', value, textValue);
      break;
      case 5:
        console.log('cur radio checked', value, textValue);
      break;
      default: console.log('df');
    }
  }

  const onTextAreaChange = (e) => {
    setTextValue(e.target.value);
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
      <TextAreaCon placeholder='inp content' allowClear onChange={onTextAreaChange} value={textValue}></TextAreaCon>
      <UpdateBtn type="primary" onClick={() => handleUpdate()}>Update</UpdateBtn>
    </Body>
  )
};

export default Update;