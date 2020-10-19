import React, { useState } from 'react';
import styled from "styled-components"
import Seller from './Seller';
import Buyer from './Buyer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ShowSomeMusics from '../components/ShowSomeMusics';
const Web3 = require('web3');

const Home = () => {
    const [account, SetAccount] = useState(null);
    const onClickLogin = () => {getAccount();};
    async function getAccount() {const accounts = await window.ethereum.enable();SetAccount(accounts[0]);};

    return (
        <div>
            <h2>Home Page</h2>
            <LoginButton onClick={onClickLogin}>Login</LoginButton>
            <ShowSomeMusics/>
            <TestDiv>Your Ethereum address: {account}</TestDiv>
                <div>
                    <nav>
                <ul>
                
                <li>
                    <Link to="/buyer">Buyer</Link>
                </li>
                <li>
                    <Link to="/seller">Seller</Link>
                </li>
                </ul>
                    </nav>

            
            <Route path='/buyer' component={Buyer} />
            <Route path='/seller' component={Seller} />
            </div>
            
        </div>
    )
}

export default Home;

const LoginButton = styled.button`

`
const TestDiv = styled.div`

`