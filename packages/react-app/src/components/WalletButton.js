import React, {useEffect, useState} from 'react';
import styles from "../styles";
import {useLookupAddress, shortenAddress, useEthers} from "@usedapp/core";

const WalletButton = () => {
   const [accountAddress, setAccountAddress] = useState("");
   const {ens} = useLookupAddress()
   const {account, activateBrowserWallet, deactivate} = useEthers()
   useEffect(() => {
      if (ens) {
         setAccountAddress(ens)
      } else if (account) {
         setAccountAddress(shortenAddress(account))
      } else {
         setAccountAddress("")
      }

   }, [account, ens, setAccountAddress])
   return (
      <button className={styles.walletButton}
              onClick={() => {
                 if (!account) {
                    activateBrowserWallet()
                 } else {
                    deactivate()
                 }
              }}>
         {accountAddress || "Connect Wallet"}
      </button>
   );
};

export default WalletButton;
