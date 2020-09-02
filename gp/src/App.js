import React,{useState} from 'react';
import styled from "styled-components"
import axios from "axios";
import Web3 from 'web3';

function App() {
  
  //로그인코드
  const [account,SetAccount]=useState(null);
  const onClickLogin=()=>{
    if(typeof web3 !=='undefined'){
      getAccount();
    }
    else{
          window.location.href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko';
    }
  };

  async function getAccount(){
      const accounts= await window.ethereum.enable();
      SetAccount(accounts[0]);
  }
  

  //rest 서버와 통신을 위한 코드
  const [userName,SetUserName]=useState(null);
  const onClickTest=()=>{
    axios
      .get('api')
      .then(response=>{
        let jsonData=response.data;
        SetUserName(jsonData.userName);
      })
      .catch(err=>{
        console.log(err);
      })
  };

  //db 연동 테스트 코드
  
  return (
    <div>
      <LoginButton onClick={onClickLogin}>
        Login
      </LoginButton>
      <TestButton onClick={onClickTest}>
        Click!
      </TestButton>
      <TestDiv>
        {userName ? `Hello ${userName}` : `Hello World`};
      </TestDiv>
      <TestDiv>
        Your Ethereum address: {account};
      </TestDiv>
    </div>
  );
}

export default App;

const TestButton=styled.button`
  color: black;
`

const TestDiv=styled.div`

`

const LoginButton=styled.button`

`