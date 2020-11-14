import React, { useState } from 'react';
import styled from "styled-components";
import Link from 'react-router-dom';
import Chart from '../pages/Chart'
const NavBar=()=>{
    const [account, SetAccount] = useState(null);
    const onClickLogin = () => {getAccount();};
    async function getAccount() {const accounts = await window.ethereum.enable();SetAccount(accounts[0]);};
    return(
        <Wrapper>
            <NavFirstText href="/Chart">
                Chart
            </NavFirstText>
            <NavSecondText href="/">
                홍익뮤직
            </NavSecondText>
            <LoginButton onClick={onClickLogin}>Login</LoginButton>
        </Wrapper>
    )
}

export default NavBar;

const Wrapper=styled.div`
    border-bottom:1px solid #E5E9EF;
    text-transform:uppercase;
    align-items:center;
    box-shadow: 0px 0px  rgba(128, 128, 128, 0.4);
    padding: 15px 20px;
    display:flex;
    margin: 0 auto;
`;

const NavFirstText=styled.a`
    text-decoration : none;
    color: black;
`;

const NavSecondText=styled.a`
    position:relative;
    left:40rem;
    text-decoration : none;
    color: black;
`;

const LoginButton = styled.button`
    text-transform:uppercase;
    background-color: #ffffff;
    background-color: rgba( 255, 255, 255, 0.5 );
    position:relative;
    left:80rem;
    border:none;
`