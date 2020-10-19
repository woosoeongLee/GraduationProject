import React, { useState } from 'react';
import styled from "styled-components"

const sampleData=[
    {
        imageLocation:"../images/cat-3059075_1920.jpg",
        singer:"이우성1",
        song:"졸프1",
    },
    {
        imageLocation:"../images/flower-4940636_1920.jpg",
        singer:"문정혁1",
        song:"졸프2",
    },
    {
        imageLocation:"../images/orbs-4967554_1920.jpg",
        singer:"김태중1",
        song:"졸프3",
    },
    {
        imageLocation:"../images/cat-3059075_1920.jpg",
        singer:"이우성2",
        song:"졸프4",
    },
    {
        imageLocation:"../images/flower-4940636_1920.jpg",
        singer:"문정혁2",
        song:"졸프5",
    },
    {
        imageLocation:"../images/orbs-4967554_1920.jpg",
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
                    sampleData.map((data,i)=>{
                        return(
                            <MusicInformation>
                                <AlbumCover src="https://placeimg.com/640/480/any"></AlbumCover>
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
    
`;

const TitleOfComponent=styled.div`
    font-size: 2rem;
    margin-bottom:1rem;
`;

const MusicInformations=styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap; // flex 하면서 줄바꿈까지
    margin-left:8rem;
    margin-right:8rem;
    margin-bottom:5rem;
    margin-top:5rem;
`;

const AlbumCover=styled.img`
    max-height:11rem;
    max-width:11rem;
    
    alt:"AlbumCover"
`;

const Singer=styled.div`
    color:#25375A;
    font-size:1.3rem;
`;

const Song=styled.div`
    color: #B4C3D2;
    font-size:1.2rem;
`;

const MusicInformation=styled.div`
    margin:2rem;
    min-width:10rem;
`;

