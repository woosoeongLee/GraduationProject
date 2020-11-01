import React, { useState } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch,Link,useHistory } from "react-router-dom";
const sampleData=[
    {
        id:1,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
        singer:"LFTD MUSIC GROUP",
        song:"Your Evil Boyfriend",
    },
    {
        id:2,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test2.jpeg",
        singer:"tandrum",
        song:"the beatles eleanor rigby",
    },
    {
        id:3,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test3.jpeg",
        singer:"LFTD MUSIC GROUP",
        song:"Low Depth - Ghost",
    },
    {
        id:4,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
        singer:"Boss-Up CRYPTO",
        song:"Allahu Akbar",
    },
    {
        id:5,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test4.jpeg",
        singer:"Kisii Spaceport",
        song:"JJSNWLPRD",
    },
    {
        id:6,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
        singer:"김태중2",
        song:"졸프6",
    },
    {
        id:7,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
        singer:"이우성3",
        song:"졸프7",
    },
    {
        id:8,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test4.jpeg",
        singer:"문정혁3",
        song:"졸프8",
    },
    {
        id:9,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
        singer:"김태중3",
        song:"졸프9",
    },
    {
        id:10,
        imageLocation:"https://graduationproject.s3.ap-northeast-2.amazonaws.com/test3.jpeg",
        singer:"이우성4",
        song:"졸프10",
    },
];

const ShowSomeMusics=()=>{
    let history=useHistory();

    const LinkHandle=(idx,data)=>{
        history.push({
            pathname:"/buyer/"+idx,
            data:data
        });
    }
    return(
        <Wrapper>
            <TitleOfComponent>
                Start Listening   
            </TitleOfComponent>       
            <MusicInformations>
                {
                    sampleData.map((data,idx)=>{
                        return(
                            <MusicInformation key={idx}>
                                <AlbumCover src={data.imageLocation} onClick={()=>LinkHandle(idx,data)}></AlbumCover>
                                {/* <Link to={"/buyer/"+idx}><AlbumCover src={data.imageLocation}></AlbumCover></Link> */}
                                
                                {/* <AlbumCover src={data.imageLocation} onClick={LinkHandle}></AlbumCover> */}
                                {/* <Link to={
                                    {
                                        pathname:'/buyer/'+idx,
                                        state:2
                                    }}><AlbumCover src={data.imageLocation}></AlbumCover></Link> */}
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

