import React, { useState } from 'react';
import styled from "styled-components"

const Buyer=()=>{
    return(
        <Wrapper>
            <BuyerBox>
            <SingerPicture alt=""src="https://demos.creative-tim.com/material-kit/assets/img/faces/christian.jpg" />
                <SingerText>
                    <SingerName>
                        The Very Famous Singer
                    </SingerName>
                    <SongName>
                        Hongik Song
                    </SongName>
                </SingerText>                
                
                <ImagesOfService>
                    <ButtonOfListening>
                        LISTENING
                    </ButtonOfListening>
                    <ButtonOfBuying>
                        BUY
                    </ButtonOfBuying>
                </ImagesOfService>
                
                
            </BuyerBox>
        </Wrapper>
    )
}

export default Buyer;

const Wrapper=styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top:10rem;
    /*  */
`

const BuyerBox=styled.div`
    max-width: 90%;
    height:400px;
    margin: 0 auto;
    text-align: center;
    margin-top:2rem;
    border-radius:2rem;
    background-color:#eee;
`

const SingerPicture=styled.img`
    position:relative;
    bottom: 3rem;
    max-height:100px;
    border-radius:50%;
`
const SingerName=styled.h2``;

const SongName=styled.h3``;

const SingerText=styled.div`
    position:relative;
    
`

const ImagesOfService=styled.div`
    display:flex;
    position:relative;
    top:3rem;
    
`;

const ButtonOfListening=styled.button`
    position:relative;
    left:30rem;
    min-height:2rem;
    min-width:6rem;
    cursor:pointer;
    border: 2px solid skyblue;
    background-color: white;
    border-radius:10px;
`;

const ButtonOfBuying=styled.button`
    position:relative;
    left:45rem;
    min-height:2rem;
    min-width:6rem;
    cursor:pointer;
    border: 2px solid skyblue;
    background-color:white;
    border-radius:10px;

`