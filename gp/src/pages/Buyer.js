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

        // let web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io");
        // var ContractAbi;
        // var ContractAddr = "0x5A6acA09c040D4DCbC8C8C6aEA81591425686bBe";
        // var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);
        // console.log(Contract);

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
        //     console.log(metadata.common.picture['0'].data);
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
        // web3.eth.sendTransaction({
        //     from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418",
        //     to: "0x32FCb1727713a60363ca49faD58e6b1bA01e46a4",
        //     value: "500000000000000000"     //0.5eth
        // }, function (error, hash) {
        //     if (!error) {
        //         console.log(hash);
        //         const sellerAccountPath = "QmSc9Eudi5qJeYdJpNQHgPtzoaRzs7iz5wAjhG2Mjwa4D4";
        //         Contract.methods.buySong(sellerAccountPath).send({ from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418" })
        //             .then(function (receipt) {
        //                 if (receipt) {
        //                     Contract.methods.buyerIterate("0x8c5644974804008263Aa79aaad4b4EbCc6170418").call({ from: "0x8c5644974804008263Aa79aaad4b4EbCc6170418" })
        //                         .then(function (result) {
        //                             if (result) {
        //                                 console.log("success")
        //                                 SetUrl("https://ipfs.infura.io/ipfs/" + result[0]);
        //                                 console.log(url)
        //                             } else console.log("fail")
        //                         })
        //                 } else {
        //                     console.log("error");
        //                 }
        //             })
        //     }
        //     else console.log(error);
        // });
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

    // path = "QmRE3hRG2nZ6wrV19nhMeCNRy35yF9sFvTVYxDkkvhSdAA";
    // Contract.methods.returnSeller(path).call({ from: account })
    //     .then(function (result) {
    //         if (result) {
    //             console.log(result);
    //         } else console.log("error");
    //     })

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
                    <ReturnUrl>{url ? window.location.replace(url) : ""}</ReturnUrl>
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

const ReturnUrl = styled.a``;

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