const Web3 = require("web3");

//testnet(ropsten)에서 동작하는 node에 연결하기 위해서 HttpProvider로 web3객체 생성
var web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io')
);

//아래 code 변수에 들어가있는 값은 binary(compiled) solidity source code라함
// https://remix.ethereum.org <- 여기 컴파일 후 코드 얻기
var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

//fromAddress에 대한 공식 문서 설명 web.eth.accounts.wallet 값 쓰면된다는듯
//The from property can also be an address or index from the web3.eth.accounts.wallet.
toAddress = '여기에 상대 주소(receiver)';
fromAddress = '여기에 내 주소(sender)';
value = '보낼 ether의 양(string or integer)';

web3.eth.sendTransaction({
    from: fromAddress,
    data: code
}, function(error, hash) {

});


var transactionObject = {
    to: toAddress,
    from: ownerAddress,
    value: value
};




