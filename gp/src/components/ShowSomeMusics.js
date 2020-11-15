import React, { useState,useEffect } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import Display from "./Display"
import { element } from 'prop-types';
import cat from 'ipfs-http-client/src/cat';
const Web3 = require('web3');
const mm = require('music-metadata-browser');
let web3 = new Web3(Web3.givenProvider || "https://localhost:8545");
let ContractAddr = "0x1543843f093715a69a826B3B75b37A12c755b51b";
let ContractAbi = [
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
// let tempArr=[];
const metaDataParse = async (path) => {
    const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + path;
    const metadata = await mm.fetchFromUrl(audioTrackUrl);
    
    return metadata;
};

const ShowSomeMusics = () => {
	let history = useHistory();

	const LinkHandle = (idx, data) => {
		history.push({
			pathname: "/buyer/" + idx,
			data: data
		});
	}

	const [ipfsPull,setipfsPull]=useState(null);
    
    
        
    //     Contract.methods.showAllSellerList().call({ from: "0xB901e378b66144a8a6583F16f279D0D8f42c509B" })
    //     .then((result)=> {
    //         if (result) {
                    
    //                 Promise.all(result.path).then((values)=>{
                    
    //                 values.map((data,idx)=>{
    //                     metaDataParse(data).then((metadata)=>{
    //                         const data={
    //                             id:idx,
    //                             imageLocation:"https://placeimg.com/640/480/any",
    //                             singer:metadata.common.artist,
    //                             song:metadata.common.title,
    //                             accountId:result.sellerAddress[idx]
    //                         }
    //                         tempArr.push(data);
    //                     });
    //                 })
                    
    //             });
    //         } else console.log("error");

    // }).then(()=>{
    //     console.log(tempArr);
    //     return tempArr;
    // })};
    //     return path;
    // }
    
    // const test=async()=>{
    //     const data=await getIpfsInformations();
        
    // }

//    const rendering = async () => {
// 	  var ret = await Contract.methods.showAllSellerList().call({ from: "0x4A5F0e92270ee28Bcce3678BE119A087051694Fe" })
//          .then(function (result) {
//             if (result) {
//                Promise.all(result.path).then((values) => {
//                   values.map((data, idx) => {
//                      metaDataParse(data).then((metadata) => {
//                         const data = {
//                            id: idx,
//                            imageLocation: "https://placeimg.com/640/480/any",
//                            singer: metadata.common.artist,
//                            song: metadata.common.title,
//                            accountId: result.sellerAddress[idx]
//                         }
//                         tempArr.push(data);
//                      });
//                   });
//                })
//             } else console.log("error");
//          }).then(() => {
//             // console.log(tempArr)
//             return tempArr;
//          });
//       return ret;
//    }

//    useEffect(() => {
//       rendering().then((res)=>{
//         //  let newIpfsPull=[...ipfsPull,res];
//          SetipfsPull(res);
//       });
//    }, []);
	
	useEffect(() => {
		Contract.methods.showAllSellerList().call({ from: "0xB901e378b66144a8a6583F16f279D0D8f42c509B" })
		.then((result)=>{
			let tempArr=[];
			Promise.all(result.path).then(ipfsHashArray=>{
				ipfsHashArray.map((ipfsHash,idx)=>{
					metaDataParse(ipfsHash).then(metaData=>{
						const data = {
							id: idx,
							imageLocation: "https://placeimg.com/640/480/any",
							singer: metaData.common.artist,
							song: metaData.common.title,
							accountId: result.sellerAddress[idx]
						}
						// let newArr=[...tempArr,data];
						// setipfsPull(newArr);
						// tempArr=newArr;
						tempArr.push(data);
					})
				})
				return tempArr;
			}).then(metaData=>{
				console.log(metaData);
				setipfsPull(metaData)
				return ipfsPull
			}).then(()=>console.log(ipfsPull))
		})
	}, []);

	return (
					
    
        <Wrapper>
            <TitleOfComponent>
                Start Listening
            </TitleOfComponent>
            <MusicInformations>
                {/* <Display ipfsPull={ipfsPull}/> */}
                {/* {

                    
                    ipfsPull.map((data,idx)=>{
                        return(
                            <div>{data}</div>
                            <MusicInformation key={idx}>
                                     <AlbumCover src={data.imageLocation} onClick={() => LinkHandle(idx, data)}></AlbumCover>
                                     <Singer>{data.singer}</Singer>
                                     <Song>{data.song}</Song>
                            </MusicInformation>   
                        )
                    })
                    
                    
                } */}
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


// console.log(ipfsPull["0"])
                    // ipfsPull["0"].map((data, idx) => {
                    //     console.log(data);
                        // return (
                        //     <MusicInformation key={idx}>
                        //         <AlbumCover src={data.imageLocation} onClick={() => LinkHandle(idx, data)}></AlbumCover>
                        //         <Singer>{data.singer}</Singer>
                        //         <Song>{data.song}</Song>
                        //     </MusicInformation>
                        // );
                    // })
                    // ipfsPull[0].map((data,idx)=>)