import React, { useState } from 'react';
import styled from "styled-components";
import Home from './Home'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const IpfsHttpClient = require('ipfs-http-client');
const ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const Web3 = require('web3');
const BufferList = require('bl/BufferList');

//판매자 주소 업로드 정보에 삽입, 나중에 리팩토링 필요할듯
// let newObj = { ...musicInformation };
// newObj.upLoaderAddress = accounts[0];
// SetMusicInformation(newObj);

const Seller = () => {
    // state
    let previewImage = null;
    const [account, SetAccount] = useState(null);
    const [previewURL, SetPreviewURL] = useState(null);
    const [musicInformation, SetMusicInformation] = useState({
        singer: '가수이름',
        songName: '노래제목',
        albumCover: '',
        song: null,
        upLoaderAddress: '판매자주소'
    });

    // 미리보기 이미지 보여주는 코드
    if (musicInformation.albumCover !== '') { previewImage = <img src={previewURL}></img> }


    async function getAccount() { const accounts = await window.ethereum.enable(); SetAccount(accounts[0]); }
    getAccount();


    const UpdateSingerInformation = (e) => { let newObj = { ...musicInformation }; newObj.singer = e.target.value; SetMusicInformation(newObj); };
    const UpdateSongInformation = (e) => { let newObj = { ...musicInformation }; newObj.songName = e.target.value; SetMusicInformation(newObj); };
    const UpdateImageInformation = (e) => { let file = e.target.files[0]; let newObj = { ...musicInformation }; newObj.albumCover = file; SetMusicInformation(newObj); let reader = new FileReader(); reader.onloadend = () => { SetPreviewURL(reader.result); }; reader.readAsDataURL(file); };
    const UpdateMusicInformation = (e) => { let file = e.target.files[0]; let newObj = { ...musicInformation }; newObj.song = file; SetMusicInformation(newObj); };

    const SubmitMusicInformation = (e) => {
        console.log(musicInformation.song);
        e.preventDefault();

        const add = async () => {
            const retAdd = await ipfs.add(musicInformation.song);
            let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
            var ContractAbi=[
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "path",
                            "type": "string"
                        }
                    ],
                    "name": "setPath",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "seller",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "path",
                            "type": "string"
                        }
                    ],
                    "name": "Sent",
                    "type": "event"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "filePath",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "seller",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            var ContractAddr="0xa8F8E6508742F676D1271e3a306dd1cc18a9A9E6";
            var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);
            console.log(Contract);

            Contract.methods.setPath(retAdd['path']).send({ from: account })
                .then(function (receipt) {
                    console.log(receipt);
                });
            Contract.events.Sent((error, event) => {
                if (!error) {
                    let ipfsLink = "https://ipfs.infura.io/ipfs/" +  event.returnValues['path'];
                    console.log(ipfsLink);
                }
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
        }
        add();
    };
    // const onClickWeb3 = (e) => {
    // let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
    // var ContractAbi;
    // var ContractAddr = "0x16fE26036f9D7780A52DB64678C269a4fe858a22";
    // var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);
    // console.log(Contract);

    // Contract.methods.setInstructor("Test", 26).send({ from: account })
    //     .then(function (receipt) {
    //         console.log(receipt);
    //     });

    // };

    return (
        <div>
            <h2>Seller Page</h2>
            <TestForm>
                <span>가수이름: </span><SingerInput type="text" onChange={UpdateSingerInformation}></SingerInput><br></br>
                <span>노래제목: </span><SingInput type="text" onChange={UpdateSongInformation}></SingInput><br></br>
                <span>앨범커버: </span><ImageInput type="file" accept="image/png, image/jpeg, image/jpg" onChange={UpdateImageInformation}></ImageInput><br></br>
                {/* <span>미리보기: </span>{previewImage}<br></br> */}
                <span>음원: </span><Mp3Input type="file" accept="audio/*" onChange={UpdateMusicInformation}></Mp3Input><br></br>
                <SubmitButton type="submit" value="업로드" onClick={SubmitMusicInformation}></SubmitButton><br></br>
                {/*<Web3Button onClick={onClickWeb3}>Web3테스트</Web3Button>
                <LoginButton onClick={onClickLogin}>Login</LoginButton> */}
                <TestDiv>Your Ethereum address: {account}</TestDiv>
            </TestForm>
        </div>
    )
}

export default Seller;

const LinkButton = styled.input`
`
const LoginButton = styled.button`
`
const TestDiv = styled.div`
`
const TestForm = styled.form`
`
const SingerInput = styled.input`
`
const SingInput = styled.input`
`
const ImageInput = styled.input`
`
const Mp3Input = styled.input`
`
const SubmitButton = styled.input`
`
const Web3Button = styled.button`
`