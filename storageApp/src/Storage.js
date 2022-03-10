import React, { useState } from "react";
import { ethers, utils } from "ethers";
import SimpleStore_abi from "./Storage_abi.json";
const Storage = () => {
  const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("connect Wallet");
  const [currentContractValue, setCurrentContractValue] = useState(" ");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
          console.log(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrorMessage("need to install metamask");
    }
  };

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateEthers = () => {
    let providers = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(providers);

    let signers = providers.getSigner();
    setSigner(signers);

    let contracts = new ethers.Contract(
      contractAddress,
      SimpleStore_abi,
      signers
    );
    setContract(contracts);
  };

  const getCurrentValue = async () => {
    let val = await contract.get();
    setCurrentContractValue(val);
  }

  const setFormHandler = (event) => {
    event.preventDefault();
    contract.set(event.target.setVal.value);

    console.log("set done");
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <h3>{"Get/set interaction with contract"}</h3>
        <button className="btn btn-primary" onClick={connectWalletHandler}>
          {connButtonText}
        </button>
        <h3>Address : {defaultAccount}</h3>
        <form onSubmit={setFormHandler}>
          <input id="setVal" type="text" />
          <button className="btn btn-primary" type={"submit"}>
            Update Contract
          </button>
        </form>
        <button onClick={getCurrentValue}>Get Current Value</button>
        <h1>{currentContractValue}</h1>
      </div>
    </div>
  );
};

export default Storage;
