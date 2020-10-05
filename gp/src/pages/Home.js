import React, { useState } from 'react';
import styled from "styled-components"
const Web3 = require('web3');

const Home = () => {
    const [account, SetAccount] = useState(null);
    const onClickLogin = () => {getAccount();};
    async function getAccount() {const accounts = await window.ethereum.enable();SetAccount(accounts[0]);};

    return (
        <div>
            <h2>Home Page</h2>
            <LoginButton onClick={onClickLogin}>Login</LoginButton>
            <TestDiv>Your Ethereum address: {account}</TestDiv>
        </div>
    )
}

export default Home;

const LoginButton = styled.button`

`
const TestDiv = styled.div`

`