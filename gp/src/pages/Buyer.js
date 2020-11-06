import React, { useState } from 'react';
import styled from "styled-components"
const Web3 = require('web3');
const mm = require('music-metadata-browser');

const Buyer = (params) => {
    const [url, SetUrl] = useState(null);
    console.log(params);
    // const {data}=this.props.location;
    // console.log(data);
    const clickBuyMusic = (e) => {

        var account;
        const onClickLogin = (tmp) => { account = tmp; };
        async function getAccount() {
            const accounts = await window.ethereum.enable();
            onClickLogin(accounts[0]);
        };
        getAccount();
        e.preventDefault();

        let web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io");
        var ContractAbi = [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "key",
                        "type": "address"
                    }
                ],
                "name": "buyerIterate",
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
                        "name": "key",
                        "type": "address"
                    },
                    {
                        "name": "value",
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
                        "name": "value",
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
                        "name": "Path",
                        "type": "string"
                    }
                ],
                "name": "buySong",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "sellerIterate",
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
        var ContractAddr = "0x5A6acA09c040D4DCbC8C8C6aEA81591425686bBe";
        var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);
        console.log(Contract);

        // Contract.methods.sellerIterate().call({ from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418" })
        //     .then(function (err, res) {
        //         if (!err) {
        //             ;
        //             const metaDataParse = async (hash) => {
        //                 const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + hash;
        //                 const metadata = await mm.fetchFromUrl(audioTrackUrl);
        //                 console.log(metadata);
        //             };
        //             for (let i = 0; i < res.length; i++) {
        //                 metaDataParse(res[i]);
        //             }
        //         }
        //         else console.log(err);
        //     });



        // const metaDataParse = async () => {
        //     const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + "QmSc9Eudi5qJeYdJpNQHgPtzoaRzs7iz5wAjhG2Mjwa4D4";
        //     const metadata = await mm.fetchFromUrl(audioTrackUrl);
        //     console.log(metadata);
        // };

        // metaDataParse();

        // const hash = "QmTL7AM2t49tLryx7ve3JsqBC4eAUvgN2hYBUPdkURu3iT";
        // Contract.methods.buySong(hash).send({ from: account })
        //     .then(function (err, res) {
        //         if (!err) {
        //             console.log(res);
        // Contract.methods.sellerIterate().call({ from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418" })
        //     .then(function (err, res) {
        //         if (!err) {
        //             console.log(res);
        //         }
        //         else console.log(err);
        //     });
        //     }
        //     else console.log(err);

        // });

        // Contract.events.example((error, event) => {
        //     if (!error) {
        //         let ipfsLink = "https://ipfs.infura.io/ipfs/" +  event.returnValues['path'];
        //         console.log(ipfsLink);
        //     }
        // });

        // using the callback
        // let web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io");
        web3.eth.sendTransaction({
            from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418",
            to: "0xc78cE2aF36f08FC817C5121547654f05e66f4163",
            value: "500000000000000000"     //0.5eth
        }, function (error, hash) {
            if (!error) {
                console.log(hash);
                const sellerAccountPath = "QmSc9Eudi5qJeYdJpNQHgPtzoaRzs7iz5wAjhG2Mjwa4D4";
                Contract.methods.buySong(sellerAccountPath).send({ from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418" })
                    .then(function (receipt) {
                        if (receipt) {
                            Contract.methods.buyerIterate("0x8c5644974804008263Aa79aaad4b4EbCc6170418").call({ from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418" })
                                .then(function (result) {
                                    if (result) {
                                        console.log("success")
                                        console.log("https://ipfs.infura.io/ipfs/"+result[0])
                                    } else console.log("fail")
                                })
                        } else {
                            console.log("error");
                        }
                    })
            }
            else console.log(error);
        });

        // const get = async () => {
        //     for await (const file of ipfs.get(retAdd.cid)) {

        //         const content = new BufferList();
        //         for await (const chunk of file.content) {
        //             content.append(chunk)
        //         }
        //         console.log(content);
        //     }
        // }
        // get();
        // }
        // add();
    };

    return (
        <Wrapper>
            <BuyerBox>
                <SingerPicture alt="" src={params.location.data.imageLocation} />
                <SingerText>
                    <SingerName>
                        {/* The Very Famous Singer */}
                        {params.location.data.singer}
                    </SingerName>
                    <SongName>
                        {params.location.data.song}
                    </SongName>
                </SingerText>
                <ImagesOfService>
                    <ButtonOfBuying type="button" onClick={clickBuyMusic}>Buy</ButtonOfBuying>
                </ImagesOfService>


            </BuyerBox>
        </Wrapper>
    )
}

export default Buyer;

const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top:10rem;
    /*  */
`

const BuyerBox = styled.div`
    max-width: 90%;
    height:400px;
    margin: 0 auto;
    text-align: center;
    margin-top:2rem;
    border-radius:2rem;
    background-color:#eee;
`

const SingerPicture = styled.img`
    position:relative;
    bottom: 3rem;
    max-height:100px;
    border-radius:50%;
`
const SingerName = styled.h2``;

const SongName = styled.h3``;

const SingerText = styled.div`
    position:relative;
    
`

const ImagesOfService = styled.div`
    display:flex;
    position:relative;
    top:3rem;
    
`;

const ButtonOfListening = styled.button`
    position:relative;
    left:30rem;
    min-height:2rem;
    min-width:6rem;
    cursor:pointer;
    border: 2px solid skyblue;
    background-color: white;
    border-radius:10px;
`;

const ButtonOfBuying = styled.button`
    position:relative;
    left:45rem;
    min-height:2rem;
    min-width:6rem;
    cursor:pointer;
    border: 2px solid skyblue;
    background-color:white;
    border-radius:10px;

`