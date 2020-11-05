import React, { useState } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
const mm = require('music-metadata-browser');
const Web3 = require('web3');



let web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
var ContractAddr = "0xf8467c99207d1A62CcB0AA47EC3bB82DD64a2Af0";
var ContractAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "key",
                "type": "address"
            },
            {
                "name": "path",
                "type": "string"
            }
        ],
        "name": "buyerSet",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "key",
                "type": "address"
            },
            {
                "name": "path",
                "type": "string"
            }
        ],
        "name": "sellerSet",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "path",
                "type": "string"
            }
        ],
        "name": "songTrade",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "path",
                "type": "string"
            }
        ],
        "name": "returnSeller",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "showAllBuyerList",
        "outputs": [
            {
                "components": [
                    {
                        "name": "buyerAddress",
                        "type": "address[]"
                    },
                    {
                        "name": "path",
                        "type": "string[]"
                    }
                ],
                "name": "",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "showAllSellerList",
        "outputs": [
            {
                "components": [
                    {
                        "name": "sellerAddress",
                        "type": "address[]"
                    },
                    {
                        "name": "path",
                        "type": "string[]"
                    }
                ],
                "name": "",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "key",
                "type": "address"
            }
        ],
        "name": "showBuyerList",
        "outputs": [
            {
                "name": "",
                "type": "string[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "key",
                "type": "address"
            }
        ],
        "name": "showSellerList",
        "outputs": [
            {
                "name": "",
                "type": "string[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);


var imgArray=[];
var singerArray=[];
var titleArray=[];
var sellerAddressArray=[];

const metaDataParse = async (path) => {
    const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + path;
    const metadata = await mm.fetchFromUrl(audioTrackUrl);
    // console.log(metadata);
    // console.log(metadata.common.picture['0'].data); // imageLocation에 대응
    // console.log(metadata.common.artist);            // singer에 대응
    // console.log(metadata.common.title);             // song에 대응
    imgArray.push(metadata.common.picture['0'].data);
    singerArray.push(metadata.common.artist.toString());
    titleArray.push(metadata.common.title.toString());
};


Contract.methods.showAllSellerList().call({ from: "0xBF1B911f0708d5B79681f35db0C46A0fd6cD65A9" })
    .then(function (result) {
        if (result) {
            console.log(result);
            let pathArrSize = result.path[0].length;
            for (let i = 0; i < pathArrSize; i++) {
                if (result.path[i]) {
                    metaDataParse(result.path[i]);
                    sellerAddressArray.push(result.sellerAddress[i].toString());
                }
            }
        } else console.log("error");
    });

    const sampleData = [
        {
            id: 1,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[0],
            song: titleArray[0],
            accountId: sellerAddressArray[0]
        },
        {
            id: 2,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[1],
            song: titleArray[1],
            accountId: sellerAddressArray[1]
        },
        {
            id: 3,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[2],
            song: titleArray[2],
            accountId: sellerAddressArray[2]
        },
        {
            id: 4,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[3],
            song: titleArray[3],
            accountId: sellerAddressArray[3]
        },
        {
            id: 5,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[4],
            song: titleArray[4],
            accountId: sellerAddressArray[4]
        },
        {
            id: 6,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[5],
            song: titleArray[5],
            accountId: sellerAddressArray[5]
        },
        {
            id: 7,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[6],
            song: titleArray[6],
            accountId: sellerAddressArray[6]
        },
        {
            id: 8,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[7],
            song: titleArray[7],
            accountId: sellerAddressArray[7]
        },
        {
            id: 9,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[8],
            song: titleArray[8],
            accountId: sellerAddressArray[8]
        },
        {
            id: 10,
            imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
            singer: singerArray[9],
            song: titleArray[9],
            accountId: sellerAddressArray[9]
        },
    ];


// const sampleData = [
//     {
//         id: 1,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
//         singer: "LFTD MUSIC GROUP",
//         song: "Your Evil Boyfriend",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 2,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test2.jpeg",
//         singer: "tandrum",
//         song: "the beatles eleanor rigby",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 3,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test3.jpeg",
//         singer: "LFTD MUSIC GROUP",
//         song: "Low Depth - Ghost",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 4,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
//         singer: "Boss-Up CRYPTO",
//         song: "Allahu Akbar",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 5,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test4.jpeg",
//         singer: "Kisii Spaceport",
//         song: "JJSNWLPRD",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 6,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
//         singer: "김태중2",
//         song: "졸프6",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 7,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test5.jpeg",
//         singer: "이우성3",
//         song: "졸프7",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 8,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test4.jpeg",
//         singer: "문정혁3",
//         song: "졸프8",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 9,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg",
//         singer: "김태중3",
//         song: "졸프9",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
//     {
//         id: 10,
//         imageLocation: "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test3.jpeg",
//         singer: "이우성4",
//         song: "졸프10",
//         accountId: "0x8c5644974804008263Aa79aaad4b4EbCc6170418"
//     },
// ];

const ShowSomeMusics = () => {
    let history = useHistory();

    const LinkHandle = (idx, data) => {
        history.push({
            pathname: "/buyer/" + idx,
            data: data
        });
    }

    return (
        <Wrapper>
            <TitleOfComponent>
                Start Listening
            </TitleOfComponent>
            <MusicInformations>
                {
                    sampleData.map((data, idx) => {
                        return (
                            <MusicInformation key={idx}>
                                <AlbumCover src={data.imageLocation} onClick={() => LinkHandle(idx, data)}></AlbumCover>
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
const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top:2rem;
    
`;

const TitleOfComponent = styled.div`
    font-size: 2rem;
    
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
    alt:"AlbumCover"

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

