import React, { useState } from 'react';
import styled from "styled-components"
import ShowSomeMusics from '../components/ShowSomeMusics';

const Home = () => {

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
            <ShowSomeMusics />
        </Wrapper>
    )
}

export default Home;

const Wrapper=styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
`
const ExplainWrapper=styled.div`
    position:relative;
    right:23rem;
    
`;
const HomeUpper=styled.div`
    margin-top:5rem;
    margin-bottom:10rem;
    width:100%;
    height:100%;
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