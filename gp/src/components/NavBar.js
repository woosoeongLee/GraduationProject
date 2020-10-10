import React, { useState } from 'react';
import styled from "styled-components";
import Link from 'react-router-dom';
const NavBar=()=>{
    return(
        <Wrapper>
            <NavFirstText>
                Discover
            </NavFirstText>
            <NavSecondText>
                홍익뮤직
            </NavSecondText>
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

const NavFirstText=styled.div`

`;

const NavSecondText=styled.div`
`;