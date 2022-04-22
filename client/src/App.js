import React, { useState, useEffect } from "react";
import CryptoCoder from "./contracts/CryptoCoder.json";
import getWeb3 from "./getWeb3";
import nft from "./assests/nft.png";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [mintText, setMintText] = useState("");
  const [coders, setCoders] = useState([]);

  const mint = () => {
    contract.methods.mint(mintText).send({ from: account }, (error)=>{
      console.log("it worked")
      if(!error){
        setCoders([...coders, mintText])
        setMintText("");
      }
    });
  }

  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);
    console.log("trying again");
    let results = [];
    for(let i = 0; i < totalSupply; i++){
      let coder = await contract.methods.coders(i).call();
      results.push(coder)
    }
    setCoders(results);
  }

  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    
    
    
      const abi = CryptoCoder.abi;
      const address ="0x8a01e1BF8B28b11f9F58f5F2D6242952bb0cB4CB";
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    
  }

  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    await loadNFTS(contract);
  }, [])

  return (
  <div className="container-fluid crypto">
    <nav className="navbar navbar-light  px-4 pt-5">
      <a className="navbar-brand text-light" href="#">EtherX</a>
      <div className="address d-flex flex-column align-items-center"><p className="text-light">{account}</p></div>
    </nav>
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col d-flex flex-column align-items-center">
          <img className="mb-4" src={nft} alt="" width="141"/>
          <h1 className=" fw-bold text-light">EtherX</h1>
          <div className="col-6 text-center mb-3" >
            <p className="lead text-center text-light">These are some of the most highly motivated coders in the world! We are here to learn coding and apply it to the betterment of humanity. We are inventors, innovators, and creators</p>
            <div>
              <input 
                type="text"
                value={mintText}
                onChange={(e)=>setMintText(e.target.value)}
                className="form-control mb-2"
                placeholder=" Enter Your Name" />
              <button onClick={mint} className="btn btn-primary text-light px-5 mt-3 mb-1">Mint</button>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center flex-wrap mb-1">
              {coders.map((coder, key)=>
                <div className="cryptocard d-flex flex-column align-items-center" key={key}>
                  <img className="mt-3" width="150" src={`https://avatars.dicebear.com/api/pixel-art/${coder.replace("#", "")}.svg`} />
                  <h4 className="mt-4">{coder}</h4>
            </div>
              )}
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default App;
