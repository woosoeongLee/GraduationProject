import React, { useState } from 'react';
import styled from "styled-components"
// import Seller from './Seller';
// import Buyer from './Buyer';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ShowSomeMusics from '../components/ShowSomeMusics';
// import HomeBelow from '../components/HomeBelow';
const mm = require('music-metadata-browser');
const Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider || "https://localhost:8545");
let ContractAddr = "0x39B59535e9F9653D13BB0Afa385e08Cf91455F1a";
let ContractAbi = [
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
	}
];
var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);
let tempArr=[];
const metaDataParse = async (path) => {
    const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + path;
    const metadata = await mm.fetchFromUrl(audioTrackUrl);
    
    return metadata;
};
const Home = () => {
    // const [account, SetAccount] = useState(null);
    // const onClickLogin = () => {getAccount();};
    // async function getAccount() {const accounts = await window.ethereum.enable();SetAccount(accounts[0]);};
    const [sampleData,setSampleData]=useState(null);
    
    Contract.methods.showAllSellerList().call({ from: "0x2f2EBFD8e598d559E7b23d4EddDb01Ff438ebc12" })
    .then(function (result) {
        if (result) {
            Promise.all(result.path).then((values)=>{
                
                values.map((data,idx)=>{
                    metaDataParse(data).then((metadata)=>{
                        const data={
                            id:idx,
                            imageLocation:"https://placeimg.com/640/480/any",
                            singer:metadata.common.artist,
                            song:metadata.common.title,
                            accountId:result.sellerAddress[idx]
                        }
                        tempArr.push(data);
                    });
                });
            });
            
        } else console.log("error");
    })

    function test (){
        console.log(tempArr);
        // const elements=[];
        // tempArr.map((data,idx)=>{
        //     elements.push(
        //         <div>{data.song}</div>
        //     );
        // })
        // return elements;
    }

    return (
        <Wrapper>
            <HomeUpper>
                {test()}
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
// const LoginButton = styled.button`

// `
// const TestDiv = styled.div`

// `
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

// let pathArrSize = result.path[0].length;
            // for (let i = 0; i < pathArrSize; i++) {
            //     if (result.path[i]) {
            //         metaDataParse(result.path[i]).then((metadata) => {                        
                        
            //         });
            //     }
            // }

// img를 src말고 metadata에서 버퍼형식으로(?) 사용할 방법 강구해야할듯. 그렇지 않으면 ipfs에 앨범을 따로 저장해야함

                        // var element = new Object();

                        // element["id"]=i+1;
                        // element["imageLocation"]="https://placeimg.com/640/480/any";
                        // element["singer"] = metadata.common.artist;
                        // element["song"] = metadata.common.title;
                        // element["accountID"] = result.sellerAddress[i];
                        
                        // tempArr.push(element);