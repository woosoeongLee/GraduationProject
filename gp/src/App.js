import React,{useState} from 'react';
import styled from "styled-components"
import axios from "axios";
function App() {
  const [userName,SetUserName]=useState(null);
  const onClickTest=(e)=>{
    axios
      .get('api')
      .then(response=>{
        let jsonData=response.data;
        SetUserName(jsonData.userName);
      })
      .catch(err=>{
        console.log(err);
      })
  }
  return (
    <div>
      <LoginButton>
        Login
      </LoginButton>
      <TestButton onClick={onClickTest}>
        Click!
      </TestButton>
      <TestDiv>
        {userName ? `Hello ${userName}` : `Hello World`};
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