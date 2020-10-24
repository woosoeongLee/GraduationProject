import React, { useState } from 'react';
import styled from "styled-components"
import Seller from './Seller';
import Buyer from './Buyer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ShowSomeMusics from '../components/ShowSomeMusics';
import HomeBelow from '../components/HomeBelow';
import backgroundImage from '../images/retro_microphone-Music_Desktop_Picture_1366x768.jpg';
const Web3 = require('web3');

const Home = () => {
    // const [account, SetAccount] = useState(null);
    // const onClickLogin = () => {getAccount();};
    // async function getAccount() {const accounts = await window.ethereum.enable();SetAccount(accounts[0]);};

    return (
        <Wrapper>
            <HomeUpper>
                <ExplainWrapper>
                    <HomeExplain>
                        아티스트를 위한 음원플랫폼
                    </HomeExplain>
                    <HomeSubExplain>
                        스마트 계약을 이용한 음원플랫폼
                    </HomeSubExplain>
                </ExplainWrapper>
            </HomeUpper>
            {/* <h2>Home Page</h2> */}
            {/* <LoginButton onClick={onClickLogin}>Login</LoginButton> */}
            <ShowSomeMusics />
            {/* <TestDiv>Your Ethereum address: {account}</TestDiv> */}
                {/* <div>
                    <nav>
                <ul>
                
                <li>
                    <Link to="/buyer">Buyer</Link>
                </li>
                <li>
                    <Link to="/seller">Seller</Link>
                </li>
                </ul>
                    </nav> */}

            
            {/* <Route path='/buyer' component={Buyer} />
            <Route path='/seller' component={Seller} /> */}
            {/* </div> */}
            {/* <HomeBelow/> */}
        </Wrapper>
    )
}

export default Home;

const Wrapper=styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
`
// const LoginButton = styled.button`

// `
// const TestDiv = styled.div`

// `
const ExplainWrapper=styled.div`
    position:relative;
    right:23rem;
    
`;
const HomeUpper=styled.div`
    margin-top:5rem;
    margin-bottom:10rem;
    width:100%;
    height:100%;
    /* background-image:url(${backgroundImage});
    ::after{
        opacity:0.3;
    } */
    /* position:absolute; */
    top:0;
    left:0; 
        
    
    
    
`

const HomeExplain=styled.h1`
    /* position:relative;
    right:23rem; */
    color:#6E829D;
    margin-bottom:1rem;
`;

const HomeSubExplain=styled.h3`
    position:relative;
    /* right:rem; */
    left:-3.5rem;
    color:#6E829D;   

`