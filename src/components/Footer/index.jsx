import React, { useMemo, useState } from "react";
import { styled } from 'styled-components';
import { Button } from "antd/es";
import { addLocalObjItem, getLocalData, removeLocalObjItem } from "../../utils/local";
import { subStrFn } from "../../utils/tools";
import { Tooltip } from 'antd';

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

const AddresssItem = styled.div`
  padding: 0 5px;
  border: 1px solid #1677ff;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
`;

const CloseBtn = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
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
  const localSign = useMemo(() => {
    const signObj = getLocalData('sign') || {};
    return Object.values(signObj);
  }, []);

  const [addressArr, setAddressArr] = useState(localSign);
  const [inp, setInp] = useState('');
  const [showFooter, setShowFooter] = useState(true);

  const addAddressFn = () => {
    const arr = JSON.parse(JSON.stringify(addressArr));
    const time = new Date().getTime().toString();
    const obj = {
      key: time,
      value: inp
    };
    arr.push(obj); 
    setAddressArr(arr);
    setInp('');
    addLocalObjItem('sign', time, obj);
  };

  const removeItemFn = (key) => {
    const arr = JSON.parse(JSON.stringify(addressArr));
    const index = arr.findIndex(v => v.key === key);
    if (index > -1) {
      arr.splice(index, 1);
      setAddressArr(arr);
      removeLocalObjItem('sign', key);
    }
  }

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
            <li key={item.key}>
              <Tooltip title={item.value} overlayStyle={{maxWidth: '500px', width: '500px'}}>
                <AddresssItem>
                  { subStrFn(item.value, 16, 10) }
                  <CloseBtn onClick={() => removeItemFn(item.key)}>❌</CloseBtn>
                </AddresssItem>
              </Tooltip>
            </li>
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