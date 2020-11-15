import React, { useState, useEffect } from 'react';
import styled from "styled-components"
// import Seller from './Seller';
// import Buyer from './Buyer';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ShowSomeMusics from '../components/ShowSomeMusics';
// import HomeBelow from '../components/HomeBelow';
const mm = require('music-metadata-browser');
const Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
let ContractAddr = "0x14E558c491BbdfEF78a743B68ffA8B2722637889";
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
let tempArr = [];
const metaDataParse = async (path) => {
	const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + path;
	const metadata = await mm.fetchFromUrl(audioTrackUrl);

	return metadata;
};
const Home = () => {
	// const [account, SetAccount] = useState(null);
	// const onClickLogin = () => {getAccount();};
	// async function getAccount() {const accounts = await window.ethereum.enable();SetAccount(accounts[0]);};
	const [sampleData, setSampleData] = useState(null);
	const [ipfsPull, SetIpfsPull] = useState([]);

	const rendering = async () => {
		// var ret = await Contract.methods.showAllSellerList().call({ from: "0xb1c504a0BEAa50596153da5688607358E1Bb7BB5" })
		// 	.then(function (result) {
		// 		if (result) {
		// 			Promise.all(result.path).then((values) => {
		// 				values.map((data, idx) => {
		// 					metaDataParse(data).then((metadata) => {
		// 						const data = {
		// 							id: idx,
		// 							imageLocation: "https://placeimg.com/640/480/any",
		// 							singer: metadata.common.artist,
		// 							song: metadata.common.title,
		// 							accountId: result.sellerAddress[idx]
		// 						}
		// 						tempArr.push(data);
		// 					});
		// 				});
		// 			})
		// 		} else console.log("error");
			// }).then(() => {
			// 	// console.log(tempArr)
			// 	return tempArr;
			// });
		
		var ret = await Contract.methods.showAllSellerList().call({ from: "0xb1c504a0BEAa50596153da5688607358E1Bb7BB5" })
			.then(function (result) {
				if (result) {
					let pathArrSize = result.path.length;
					for (let i = 0; i < pathArrSize; i++) {
						if (result.path[i]) {
							metaDataParse(result.path[i]).then((metadata) => {
								// img를 src말고 metadata에서 버퍼형식으로(?) 사용할 방법 강구해야할듯. 그렇지 않으면 ipfs에 앨범을 따로 저장해야함

								var element = new Object();

								element["id"] = i + 1;
								element["imageLocation"] = "https://placeimg.com/640/480/any";
								element["singer"] = metadata.common.artist;
								element["song"] = metadata.common.title;
								element["accountID"] = result.sellerAddress[i];

								tempArr.push(element);
							});
						}
					}
				} else console.log("error");
			}).then(() => {
				console.log(tempArr)
				return tempArr;
			});
		return ret;
	}

	// function test() {
	// 	console.log(tempArr);
	// const elements=[];
	// tempArr.map((data,idx)=>{
	//     elements.push(
	//         <div>{data.song}</div>
	//     );
	// })
	// return elements;
	// }
	
	useEffect(() => {
		console.log('===useEffect');
		const func = async() =>{
			var ret = await rendering();
			let newIpfsPull=[...ipfsPull, ret];
			console.log(newIpfsPull)
			console.log(ret)
			// if(newIpfsPull.length==ret.length){
			// 	SetIpfsPull(newIpfsPull);
			// 	console.log(newIpfsPull)
			// } 
			// let newIpfsPull=[...ipfsPull];
			// newIpfsPull=ret;
			SetIpfsPull(ret);
			console.log('finish')
		}
		func();
	}, [ipfsPull]);

	return (
		<Wrapper>
			<HomeUpper>
				{
                    // ipfsPull ? 
                    //     ipfsPull["0"].map((data,idx)=>{
                    //     return(
                    //         // <MusicInformation key={idx}>
                    //         //          <AlbumCover src={data.imageLocation} onClick={() => LinkHandle(idx, data)}></AlbumCover>
                    //         //          <Singer>{data.singer}</Singer>
                    //         //          <Song>{data.song}</Song>
                    //         // </MusicInformation>   
                    //     )
					// })
					// ipfsPull?(ipfsPull[0]?(ipfsPull[0][0]?(<div>loading4</div>):<div>loading3</div>):<div>loading2</div>):<div>loading1</div>
					// ipfsPull?(ipfsPull[0]?ipfsPull[0].forEach(function(el) { console.log(el); }):<div>loading2</div>):<div>loading1</div>
					ipfsPull?ipfsPull[0]?ipfsPull[0][0]?<HomeExplain>{ipfsPull[0][0]["accountID"]}</HomeExplain>
					:<HomeExplain>{ipfsPull[0]}</HomeExplain>:
					console.log(ipfsPull):console.log("loading1")
                }
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

const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
`
// const LoginButton = styled.button`

// `
// const TestDiv = styled.div`

// `
const ExplainWrapper = styled.div`
    position:relative;
    right:23rem;
    
`;
const HomeUpper = styled.div`
    margin-top:5rem;
    margin-bottom:10rem;
    width:100%;
    height:100%;
    top:0;
    left:0; 
`

const HomeExplain = styled.h1`
    /* position:relative;
    right:23rem; */
    color:#6E829D;
    margin-bottom:1rem;
`;

const HomeSubExplain = styled.h3`
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