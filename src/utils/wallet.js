import React from "react";
import { CardanoExtension } from 'wanchain-cross-sdk';

export const network = 'testnet';

const INITIAL_STATE = {
  address: '',
  provider: null,
  connected: false,
  // networkId: network === 'testnet' ? 999 : 888, // TODO: CHANGE TO 888 AFTER JUPITER FORK
};

const differ = (a, b) => {
  if (a.address !== b.address) {
    return 1;
  }

  // if (a.networkId !== b.networkId) {
  //   return 1;
  // }

  if (a.connected !== b.connected) {
    return 1;
  }

  return 0;
};

export const WalletContext = React.createContext({}, differ);

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    const intiState = {
      ...INITIAL_STATE,
      resetApp: this.resetApp,
      connect: this.onConnect,
      initSigner: this.initSigner,
      signedTx: this.signedTx
    };

    this.setWallet = props.setWallet;
    this.setWallet(intiState);
  }

  componentDidMount() {
    // has cache
    if (true) {
      // lear cache & return
      
    }
    this.onConnect();
  }

  getCardanoWallet = async () => {
    await CardanoExtension.init();
    // await Signer.init("ogmios.wanchain.org", 1337);
    if (window.cardano.nami) {
      return new CardanoExtension.NamiWallet(network);
    } else {
      return new CardanoExtension.YoroiWallet(network);
    }
  }

  initSigner = async () => {
    // await Signer.init("ogmios.wanchain.org", 1337);
    const sdkWallet = await this.getCardanoWallet();
    let cardanoSigner = new CardanoExtension.Signer("testnet", sdkWallet.provider); 
    await cardanoSigner.init("ogmios.wanchain.org", 1337); 
    return cardanoSigner;
  }

  signedTx = async (update = { 
    newOracleWorker: "addr_test1qz6twkzgss75sk379u0e27phvwhmtqqfuhl5gnx7rh7nux2xg4uwrhx9t58far8hp3a06hfdfzlsxgfrzqv5ryc78e4s4dwh26" 
  }, signData = [ 
    "addr_test1qzqchffrha5hjcztwx0p48wtv0y36hw098rdw366fqlzuymun97wgelqtwe9aladfx2pukf4jdfqtjh7cnja50y247dsnalv6f" 
  ]) => {
    const signer = await this.initSigner();
    const signedTxData = await signer.updateGroupNFT( update, signData ); 
    console.log({signedTxData}); 
  }

  onConnect = async () => {
    try {
      let provider = await this.getCardanoWallet();

      const accounts = await provider.getAccounts(network);

      const address = accounts[0];

      // const networkId = await web3.eth.net.getId();

      await this.setWallet({
        provider,
        connected: true,
        accounts,
        address,
        // networkId,
        connect: this.onConnect,
        initSigner: this.initSigner,
        signedTx: this.signedTx
      });
    } catch (error) {
      console.error('err', error);
    }
  };

  render() {
    return <></>;
  }

}

export default Wallet;