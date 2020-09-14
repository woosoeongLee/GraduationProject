import React, { useState } from 'react';
import styled from "styled-components"
import axios from "axios";
import web3 from 'web3';

const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient
const ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const BufferList = require('bl/BufferList')

function App() {
  //로그인코드
  const [account,SetAccount]=useState(null);
  
  const onClickLogin=()=>{
    if(typeof web3 !=='undefined'){
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
  };


  async function getAccount() {
    const accounts = await window.ethereum.enable();
    SetAccount(accounts[0]);

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