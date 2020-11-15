import React, { useState,useEffect } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
const Display=(props)=>{
    const {ipfsPull}=props;
    let history = useHistory();
    const LinkHandle = (idx, data) => {
		history.push({
			pathname: "/buyer/" + idx,
			data: data
		});
    }
    console.log(ipfsPull);
    return(
        <Wrapper>
        {
            ipfsPull.map((data,idx)=>{
            return(
                
                <MusicInformation key={idx}>
                    <AlbumCover src={data.imageLocation} onClick={() => LinkHandle(idx, data)}></AlbumCover>
                    <Singer>{data.singer}</Singer>
                    <Song>{data.song}</Song>
                </MusicInformation>   
            );
            })
        }
        
        </Wrapper>
    )
}

export default Display;

const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    
`;

const MusicInformations = styled.div`
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

const AlbumCover = styled.img`
    max-height:11rem;
    max-width:11rem;
    border-radius:3rem;
    alt:"AlbumCover";
    cursor:pointer;
`;

const Singer = styled.div`
    color:#25375A;
`;

const Song = styled.div`
    color: #B4C3D2;
`;

const MusicInformation = styled.div`
    margin:2rem;
    min-width:10rem;
    max-width:10rem;
    
`;