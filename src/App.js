import React, { Component } from 'react';
import Web3 from 'web3';
import './index.css';
import Mango from './abis/Mango.json';
import MangoTokenSale from './abis/MangoTokenSale.json';

class App extends Component{
 
async componentWillMount(){
  await this.loaddata()
}

  async loaddata(){
     
    const web3=new Web3(Web3.givenProvider|| 'http://localhost:8545')
    const networkD1=await web3.eth.net.getId()
    const networkD2=await web3.eth.net.getId()
    // console.log(network) 
    const networkDataD1=Mango.networks[networkD1].address;
    const networkDataD2=MangoTokenSale.networks[networkD2].address;
    // console.log(networkData)
    const accounts= await web3.eth.getAccounts()
   this.setState({account:accounts[0]})
    // console.log(accounts[0])
    // console.log(DappToken.abi)
    const mangotoken=new  web3.eth.Contract(Mango.abi,networkDataD1);
    const mangotokensale=new web3.eth.Contract(MangoTokenSale.abi,networkDataD2);
    // console.log(dapptoken);
    // const contract1Address= dapptoken.options.address;
    // const contract2Address=dapptokensale.options.address;
    // console.log(dapptoken.options.address);
    //Contract 1
    this.setState({mangotoken});
    const name=await mangotoken.methods.name().call();
    this.setState({name:name});
    const totalsupply=await mangotoken.methods.totalSupply().call();
    this.setState({totalSupply:totalsupply});
    const symbol=await mangotoken.methods.symbol().call();
    this.setState({symbol:symbol});
    const standard=await mangotoken.methods.standard().call();
    this.setState({standard:standard});
    const balanceOf=await mangotoken.methods.balanceOf(accounts[0]).call();
    this.setState({balanceOf:balanceOf});
      console.log(this.state.account)
    console.log(balanceOf);
//contract 2
this.setState({mangotokensale});
const tokenPrice=await mangotokensale.methods.tokenPrice().call();
this.setState({tokenPrice:tokenPrice});
const tokensSold=await mangotokensale.methods.tokensSold().call();
this.setState({tokensSold:tokensSold});
//functions
//others
console.log(this.state.value) 
}
BuyTokens(event){
  this.state.mangotokensale.methods.buyTokens(this.state.value)
  .send({from:this.state.account});
  event.preventDefualt();
  console.log('hogya buy')
}
  constructor(props){
    super(props);
    this.state={
    account:'',
    totalSupply:'',
    name:'',
    symbol:'',
    standard:'',
    tokenPrice:'',
    tokensSold:'',
    balanceOf:'',
    value:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.BuyTokens = this.BuyTokens.bind(this);

   }
   
handleChange(event){
 this.setState({value:event.target.value})
 console.log(event.target.value)
}
  

render(){
  return(<div>
    <div className='container' >
      <div className='row' className='text-center' >
        <div className='col-lg-12'>   <h1 className='text-center' >MANGO TOKEN SALE</h1>
  <p>Accont No.{this.state.account}</p>
  <hr/>  <br/>
</div>
<div id='loader'>
  <p className='text-center'>Loading</p>
</div>
 <div id='content' className='text-center'>
<p>Introducing DappToken (DAPP)!
  TOKEN price is <span>{this.state.tokenPrice}</span> Ether.You currently have 
  <span>{this.state.balanceOf}</span>&nbsp;TOKENS
 </p>
 <br/>
 <form onSubmit={this.BuyTokens} role='form'>
   <div className='form-group'>
<div className='input-group'>
<input className='form-control input-lg' type='number' name='number' value={this.state.value} 
onChange={this.handleChange} min='1' pattern='[0,9]'></input>
<span className='input-group-btn'>
  <button type='submit' className='btn btn-primary btn-lg'>Buy Token</button>
</span>
</div>
   </div>
 </form>
 <br/>
 <div className='progress'>
   <div id='progress' className='progress-bar progress-bar-striped active' 
   aria-valuemin='0' aria-valuemax='100'></div>
 </div>
 </div>
 </div>
 <p className='text-center'>
<span ></span><span>{this.state.tokensSold}/{this.state.totalSupply}</span>
   Token sold</p>
  <hr/>
  <p id='accountAddress'></p>
  
  </div>
  </div>);
}
}
export default App;