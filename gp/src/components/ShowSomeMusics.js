import React, { useState } from 'react';
import styled from "styled-components"

const sampleData=[
    {
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
        singer:"LFTD MUSIC GROUP",
        song:"Your Evil Boyfriend",
    },
    {
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test2.jpeg",
        singer:"tandrum",
        song:"the beatles eleanor rigby",
    },
    {
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test3.jpeg",
        singer:"LFTD MUSIC GROUP",
        song:"Low Depth - Ghost",
    },
    {
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
        singer:"Boss-Up CRYPTO",
        song:"Allahu Akbar",
    },
    {
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test4.jpeg",
        singer:"Kisii Spaceport",
        song:"JJSNWLPRD",
    },
    {
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
        singer:"김태중2",
        song:"졸프6",
    },
    {
        imageLocation:"../images/cat-3059075_1920.jpg",
        singer:"이우성3",
        song:"졸프7",
    },
    {
        imageLocation:"../images/flower-4940636_1920.jpg",
        singer:"문정혁3",
        song:"졸프8",
    },
    {
        imageLocation:"/images/orbs-4967554_1920.jpg",
        singer:"김태중3",
        song:"졸프9",
    },
    {
        imageLocation:"https://www.example.com/images/dinosaur.jpg",
        singer:"이우성4",
        song:"졸프10",
    },
];

const ShowSomeMusics=()=>{
    return(
        <Wrapper>
            <TitleOfComponent>
                Start Listening   
            </TitleOfComponent>       
            <MusicInformations>
                {
                    sampleData.map((data)=>{
                        return(
                            <MusicInformation>
                                <AlbumCover src={data.imageLocation}></AlbumCover>
                                {/* <div>{data.imageLocation}</div> */}
                                <Singer>{data.singer}</Singer>
                                <Song>{data.song}</Song>
                            </MusicInformation> 
                        );
                    })
                }
            </MusicInformations>
        </Wrapper>
    )
}
export default ShowSomeMusics;
const Wrapper=styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top:2rem;
    
`;

const TitleOfComponent=styled.div`
    font-size: 2rem;
    
`;

const MusicInformations=styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap; // flex 하면서 줄바꿈까지
    margin-left:9rem;
    margin-right:9rem;
    margin-bottom:5rem;
    margin-top:3rem;
    position:relative;
    left:5rem;
`;

const AlbumCover=styled.img`
    max-height:11rem;
    max-width:11rem;
    border-radius:3rem;
    alt:"AlbumCover"

`;

const Singer=styled.div`
    color:#25375A;
`;

const Song=styled.div`
    color: #B4C3D2;
`;

const MusicInformation=styled.div`
    margin:2rem;
    min-width:10rem;
    max-width:10rem;
    
`;

