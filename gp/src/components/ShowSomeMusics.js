import React, { useState } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
const mm = require('music-metadata-browser');
const Web3 = require('web3');




let web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
var ContractAddr = "0x14E558c491BbdfEF78a743B68ffA8B2722637889";
var ContractAbi =[
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

const ShowSomeMusics = () => {
	let history = useHistory();

	const LinkHandle = (idx, data) => {
		history.push({
			pathname: "/buyer/" + idx,
			data: data
		});
	}

	var sampleData = [];

	const metaDataParse = async (path) => {
		const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + path;
		const metadata = await mm.fetchFromUrl(audioTrackUrl);

		return metadata;
	};

	Contract.methods.showAllSellerList().call({ from: "0xb1c504a0BEAa50596153da5688607358E1Bb7BB5" })
		.then(function (result) {
			if (result) {
				console.log(result)
				var pathArrSize = result.path.length;
				for (let i = 0; i < pathArrSize; i++) {
					if (result.path[i]) {
						metaDataParse(result.path[i]).then((metadata) => {
							// img를 src말고 metadata에서 버퍼형식으로(?) 사용할 방법 강구해야할듯. 그렇지 않으면 ipfs에 앨범을 따로 저장해야함

							var element = new Object();
							element["id"] = i + 1;
							element["imageLocation"] = "https://graduationproject.s3.ap-northeast-2.amazonaws.com/test1.jpeg";
							element["singer"] = metadata.common.artist;
							element["song"] = metadata.common.title;
							element["accountID"] = result.sellerAddress[i];
							sampleData.push(element);
							
						}).then(() => {
							if (sampleData.length == pathArrSize) console.log(sampleData)
						});
					}
				}
			} else console.log("error");
		});

	return (
		<Wrapper>
			<TitleOfComponent>
				Start Listening
            </TitleOfComponent>
			<MusicInformations>
				{
					sampleData.map((data, idx) => {
						if (data) {
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
						} else {
							return (<TitleOfComponent>loading</TitleOfComponent>);
						}
					})
					// sampleData.map((data, idx) => {
					// 	return (
					// 		<MusicInformation key={idx}>
					// 			<AlbumCover src={data.imageLocation} onClick={() => LinkHandle(idx, data)}></AlbumCover>
					// 			{/* <Link to={"/buyer/"+idx}><AlbumCover src={data.imageLocation}></AlbumCover></Link> */}

					// 			{/* <AlbumCover src={data.imageLocation} onClick={LinkHandle}></AlbumCover> */}
					// 			{/* <Link to={
					//                 {
					//                     pathname:'/buyer/'+idx,
					//                     state:2
					//                 }}><AlbumCover src={data.imageLocation}></AlbumCover></Link> */}
					// 			<Singer>{data.singer}</Singer>
					// 			<Song>{data.song}</Song>
					// 		</MusicInformation>
					// 	);
					// })
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

