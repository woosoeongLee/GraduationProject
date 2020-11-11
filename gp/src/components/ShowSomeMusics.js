import React, { useState } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { element } from 'prop-types';
// const mm = require('music-metadata-browser');
const Web3 = require('web3');




// let web3 = new Web3(Web3.givenProvider || "https://localhost:8545");
// var ContractAddr = "0x39B59535e9F9653D13BB0Afa385e08Cf91455F1a";
// var ContractAbi = [
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "key",
// 				"type": "address"
// 			}
// 		],
// 		"name": "showSellerList",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "string[]"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "showAllBuyerList",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"name": "buyerAddress",
// 						"type": "address[]"
// 					},
// 					{
// 						"name": "path",
// 						"type": "string[]"
// 					}
// 				],
// 				"name": "",
// 				"type": "tuple"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "key",
// 				"type": "address"
// 			},
// 			{
// 				"name": "path",
// 				"type": "string"
// 			}
// 		],
// 		"name": "buyerSet",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "key",
// 				"type": "address"
// 			},
// 			{
// 				"name": "path",
// 				"type": "string"
// 			}
// 		],
// 		"name": "sellerSet",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "showAllSellerList",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"name": "sellerAddress",
// 						"type": "address[]"
// 					},
// 					{
// 						"name": "path",
// 						"type": "string[]"
// 					}
// 				],
// 				"name": "",
// 				"type": "tuple"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "path",
// 				"type": "string"
// 			}
// 		],
// 		"name": "returnSeller",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "key",
// 				"type": "address"
// 			}
// 		],
// 		"name": "showBuyerList",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "string[]"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "recipient",
// 				"type": "address"
// 			},
// 			{
// 				"name": "path",
// 				"type": "string"
// 			}
// 		],
// 		"name": "songTrade",
// 		"outputs": [],
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "function"
// 	}
// ];
// var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);

// const [sampleData,SetSampleData]=useState([]);

// let testArr=[1,2,3,4,5,6,7,8,9,10];
const ShowSomeMusics = () => {
    let history = useHistory();

    const LinkHandle = (idx, data) => {
        history.push({
            pathname: "/buyer/" + idx,
            data: data
        });
    }

    // const [sampleData,SetSampleData]=useState([]);
    // const [sampleData,SetSampleData]=useState(null);
    // let tempArr=[];
    // Contract.methods.showAllSellerList().call({ from: "0x2f2EBFD8e598d559E7b23d4EddDb01Ff438ebc12" })
    // .then(function (result) {
    //     if (result) {
    //         let pathArrSize = result.path[0].length;
    //         for (let i = 0; i < pathArrSize; i++) {
    //             if (result.path[i]) {
    //                 const metaDataParse = async (path) => {
    //                     const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + path;
    //                     const metadata = await mm.fetchFromUrl(audioTrackUrl);
                        
    //                     return metadata;
    //                 };
    //                 metaDataParse(result.path[i]).then((metadata) => {                        
    //                     // img를 src말고 metadata에서 버퍼형식으로(?) 사용할 방법 강구해야할듯. 그렇지 않으면 ipfs에 앨범을 따로 저장해야함

    //                     var element = new Object();

    //                     element["id"]=i+1;
    //                     element["imageLocation"]="https://placeimg.com/640/480/any";
    //                     element["singer"] = metadata.common.artist;
    //                     element["song"] = metadata.common.title;
    //                     element["accountID"] = result.sellerAddress[i];
                        
    //                     tempArr.push(element);
    //                     // let newArr=[...sampleData];
    //                     // newArr.push(element);
    //                     // SetSampleData(newArr);
    //                     // sampleData.push(element);
    //                     // console.log(element);
    //                 });
    //             }
    //         }
    //     } else console.log("error");
    // }).finally(function(){
    //     // SetSampleData(tempArr);
    //     // console.log(sampleData);
    //     // console.log(tempArr);
    // });

    // function ipfsRender(){
    //     const elements=[];
    //     for(let i=0; i<tempArr.length; i++){
    //         elements.push(
    //             <MusicInformation key={tempArr[i].id}>
    //                 <AlbumCover src={tempArr[i].imageLocation} onClick={() => LinkHandle(i, tempArr[i])}></AlbumCover>
    //                 <Singer>{tempArr[i].singer}</Singer>
    //                 <Song>{tempArr[i].song}</Song>
    //             </MusicInformation>
    //         );
    //     }
    //     return elements;
    // }
    return (
        <Wrapper>
            <TitleOfComponent>
                Start Listening
            </TitleOfComponent>
            <MusicInformations>
                
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

// {
    // tempArr[0].song
    // console.log(tempArr)
    // tempArr.map((data, idx) => {
    //     return (
    //         <MusicInformation key={idx}>
    //             <AlbumCover src={data.imageLocation} onClick={() => LinkHandle(idx, data)}></AlbumCover>
    //             {/* <Link to={"/buyer/"+idx}><AlbumCover src={data.imageLocation}></AlbumCover></Link> */}

    //             {/* <AlbumCover src={data.imageLocation} onClick={LinkHandle}></AlbumCover> */}
    //             {/* <Link to={
    //                 {
    //                     pathname:'/buyer/'+idx,
    //                     state:2
    //                 }}><AlbumCover src={data.imageLocation}></AlbumCover></Link> */}
    //             <Singer>{data.singer}</Singer>
    //             <Song>{data.song}</Song>
    //         </MusicInformation>
    //     );
    // })
// }