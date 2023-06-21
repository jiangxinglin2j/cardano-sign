import React, { useState } from "react";
import { styled } from 'styled-components';
import { Button } from "antd/es";

const FooterCon = styled.div`
  width: 500px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s all ease;
  border-left: 1px solid #eee;
  display: flex;
  flex-direction: column;
  transform: translate(${props => props.showfooter === 'true' ? 0 : '100%'});
  background: #fff;
`;

const Arrow = styled.div`
  width: 20px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  color: #000;
  border: 1px solid #eee;
  border-right: none;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  margin: 20px 0;
  text-align: center;
  font-size: 14px;
  color: #000;
`;

const AddressCon = styled.ul`
  height: auto;
  max-height: 70%
  overflow-y: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const AddresssItem = styled.li`
  display: flex;
  padding: 0 5px;
  border: 1px solid #1677ff;
  font-size: 14px;
  height: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const AddressInp = styled.input`
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 20px;
`;

const AddBtn = styled(Button)`
  // background: aqua;
  width: 50%;
  margin: 0 auto;
`;

function Footer() {
  const [addressArr, setAddressArr] = useState([]);
  const [inp, setInp] = useState('');
  const [showFooter, setShowFooter] = useState(true);

  const addAddressFn = () => {
    const arr = JSON.parse(JSON.stringify(addressArr));
    arr.push(inp);
    setAddressArr(arr);
    setInp('');
  };

  const handleInp = e => {
    setInp(e.target.value);
  }

  const showFooterFn = () => {
    setShowFooter(!showFooter);
  }

  return (
    <FooterCon showfooter={showFooter.toString()}>
      <Title>Add Address</Title>
      <Title>↓</Title>
      <AddressCon>
        {
          addressArr.map((item) => (
            <AddresssItem key={item}>
              { item }
            </AddresssItem>
          ))
        }
      </AddressCon>
      <AddressInp value={inp} onChange={
        e => handleInp(e)
      } placeholder="input address" />
      <AddBtn type="primary" size="large" shape="round" onClick={addAddressFn}>Add</AddBtn>
      <Arrow onClick={showFooterFn}>{ showFooter ? '→' : '←'}</Arrow>
    </FooterCon>
  )
};

export default Footer;