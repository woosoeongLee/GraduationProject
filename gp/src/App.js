import React, { useState } from 'react';
import styled from "styled-components"
import axios from "axios";
import web3 from 'web3';
import ipfsClient from 'ipfs-http-client';
const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient
const ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const BufferList = require('bl/BufferList')

// const addFile={
//   content:{Over_the_Horizon.mp3
// }


function App() {
  //로그인코드
  const [account, SetAccount] = useState(null);
  const onClickLogin = () => {
    if (typeof web3 !== 'undefined') {
      getAccount();
    }
    else {
      window.location.href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko';
    }
  };

  //업로드정보
  const [musicInformation, SetMusicInformation] = useState({
    singer: '가수이름',
    songName: '노래제목',
    upLoaderAddress: '판매자주소',
    albumCover: '',
    song: null

  });
  const UpdateSingerInformation = (e) => {
    let newObj = { ...musicInformation };
    newObj.singer = e.target.value;
    SetMusicInformation(newObj);
  };
  const UpdateSongInformation = (e) => {
    let newObj = { ...musicInformation };
    newObj.songName = e.target.value;
    SetMusicInformation(newObj);
  };

  const [previewURL, SetPreviewURL] = useState(null);

  const UpdateImageInformation = (e) => {
    let file = e.target.files[0];
    let newObj = { ...musicInformation };
    newObj.albumCover = file
    SetMusicInformation(newObj);
    let reader = new FileReader();
    reader.onloadend = () => {
      SetPreviewURL(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const UpdateMusicInformation = (e) => {
    let file = e.target.files[0];
    let newObj = { ...musicInformation };
    newObj.song = file;
    SetMusicInformation(newObj);
  }
  //미리보기 이미지 보여주는 코드
  let previewImage = null;
  if (musicInformation.albumCover !== '') {
    previewImage = <img src={previewURL}></img>
  }

  //IPFS 업로드 코드
  const SubmitMusicInformation = (e) => {
    console.log(musicInformation.song);
    e.preventDefault();

    const add = async () => {
      const retAdd = await ipfs.add(musicInformation.song);
      // const retAdd = await ipfs.add(globSource('./Over_the_Horizon.mp3'));
      console.log(retAdd)
      const get = async () => {
        for await (const file of ipfs.get(retAdd.cid)) {

          const content = new BufferList();
          for await (const chunk of file.content) {
            content.append(chunk)
          }
          console.log(content);
        }
      }
      get();
    }
    add();

    //post 보내야함 (db로)
  };


  async function getAccount() {
    const accounts = await window.ethereum.enable();
    SetAccount(accounts[0]); //acount=accounts[0];

    //판매자 주소 업로드 정보에 삽입, 나중에 리팩토링 필요할듯
    let newObj = { ...musicInformation };
    newObj.upLoaderAddress = accounts[0];
    SetMusicInformation(newObj);

  }


  //rest 서버와 통신을 위한 코드
  const [userName, SetUserName] = useState(null);
  const onClickTest = () => {
    axios
      .get('api')
      .then(response => {
        let jsonData = response.data;
        SetUserName(jsonData.userName);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <Wrapper>
      <LoginButton onClick={onClickLogin}>
        Login
      </LoginButton>
      <TestButton onClick={onClickTest}>
        Click!
      </TestButton>
      <TestDiv>
        {userName ? `Hello ${userName}` : `Hello World`};
      </TestDiv>
      <TestDiv>
        Your Ethereum address: {account};
      </TestDiv>

      <TestForm>
        <span>가수이름: </span><SingerInput type="text" onChange={UpdateSingerInformation}></SingerInput>
        <span>노래제목: </span><SingInput type="text" onChange={UpdateSongInformation}></SingInput>
        <span>앨범커버: </span><ImageInput type="file" accept="image/png, image/jpeg, image/jpg" onChange={UpdateImageInformation}></ImageInput>
        <span>음원: </span><Mp3Input type="file" accept="audio/*" onChange={UpdateMusicInformation}></Mp3Input>
        <SubmitButton type="submit" value="업로드" onClick={SubmitMusicInformation}></SubmitButton>
      </TestForm>
      {previewImage}
    </Wrapper>
  );
}
// 구매자로직 
export default App;
const Wrapper = styled.div`

`
const TestButton = styled.button`
  color: black;
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

`;
const SubmitButton = styled.input`

`



const TestDiv = styled.div`

`

const LoginButton = styled.button`

`

{/* // 그리고 ipfs올리는거 요청 ipfs 올릴때 암호화 mp3받아서 암호화시켜서 올려버리라이소리? ㅇㅇ  */ }
{/* <input>가수이름</input>
        <input>제목</input> */}
{/* //확장자
        //form 으로 음악파일선택, 이미지
        //판매자주소 받아서 넘겨야하지않나? 판매자주소는 db에넣음
        //ipfs 암호화를 메타마스크 해쉬값으로 암호화할텐데 그 복호화 값도 서버로 넘겨줘야함 (암호화는 일시중단)
        //노드? 노드에서받아서 아마존 aws 꽂으란거야? 아니이게 아까내가말한거야 ㅋㅋ  */}