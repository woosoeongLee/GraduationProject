import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import Display from "./Display"
import { element } from 'prop-types';
import cat from 'ipfs-http-client/src/cat';
import { withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'
const Web3 = require('web3');
const mm = require('music-metadata-browser');
let web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
let ContractAddr = "0x0Aea2CcEa4394A2E4216545d74B8C2DA60c0B850";
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

const styles = theme => ({
	progress: {
	  margin: theme.spacing(3)
	}
  })

class ShowSomeMusics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ipfsPull: '',
			completed: 0
		}
		// this.props.history=useHistory();
	}
	
	// LinkHandle = (idx, data) => {
	// 	this.props.history.push({
	// 		pathname: "/buyer/" + idx,
	// 		data: data
	// 	});
	// }

	stateRefresh = () => {
		this.setState({
			ipfsPull: '',
			completed: 0
		});
		this.callApi()
			.then(res => this.setState({ ipfsPull: res }))
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.timer = setInterval(this.progress, 20);
		this.callApi()
			.then(res => this.setState({ ipfsPull: res }))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		let web3 = new Web3(Web3.givenProvider || "https://localhost:7545");
		var ContractAddr = "0x0Aea2CcEa4394A2E4216545d74B8C2DA60c0B850";
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

		console.log(Contract)

		let ret = await Contract.methods.showAllSellerList().call({ from: "0x6c329924357A118Cb25F69512fBB4a347A3DA91B" })
			.then(async (result) => {
				let tempArr = [];
				let ret = await Promise.all(result.path).then(ipfsHashArray => {
					ipfsHashArray.map((ipfsHash, idx) => {
						metaDataParse(ipfsHash).then(metaData => {
							var imgsrc = "data:image/png;base64," + btoa([].reduce.call(new Uint8Array(metaData.common.picture[0].data),function(p,c){return p+String.fromCharCode(c)},''))
							const data = {
								id: idx,
								imageLocation: imgsrc,
								// imageLocation: "https://placeimg.com/640/480/any",
								singer: metaData.common.artist,
								song: metaData.common.title,
								accountId: result.sellerAddress[idx]
							}
							// console.log(metaData.common.picture[0].data);
							tempArr.push(data);
						})
					})
					return tempArr;
				})
				return ret;
			})

		console.log(ret)
		return ret;
	}


	progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
	}

	render() {
		const { classes } = this.props;
		return (
			<Wrapper>
				<TitleOfComponent>
					Start Listening
				</TitleOfComponent>
				<MusicInformations>
					{this.state.ipfsPull ?
						this.state.ipfsPull.map((data, idx) => {
							return (
								<MusicInformation key={idx}>
									{/* <AlbumCover src={data.imageLocation}></AlbumCover> */}
									<AlbumCover src={data.imageLocation} alt="Red dot"/>
									{/* <AlbumCover src={data.imageLocation} onClick={() => this.LinkHandle(idx, data)}></AlbumCover> */}
									<Singer>{data.singer}</Singer>
									<Song>{data.song}</Song>
								</MusicInformation>
							)
						})
						:
						<TableRow>
							<TableCell colSpan="6" align="center">
								<CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
							</TableCell>
						</TableRow>
					}
				</MusicInformations>
			</Wrapper>
		)
	}
}

export default  withStyles(styles)(ShowSomeMusics);


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