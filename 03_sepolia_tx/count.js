let web3;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
  } else {
    alert("MetaMask가 설치되어있지 않습니다.");
  }
});

const loadABI = async () => {
  const { data } = await axios.get(
    "../01_contracts/contracts_Counter_sol_Counter.abi"
  );
  return data;
};

// 컨트랙트 준비
const prepareContract = async () => {
  const contractAddress = document.querySelector("#address").value;
  const resultDiv = document.querySelector("#result");

  if (!contractAddress) {
    resultDiv.innerHTML = "컨트랙트 주소를 입력해주세요.";
    throw new Error("컨트랙트 주소 없음");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const account = window.ethereum.selectedAddress;
  const abi = await loadABI();
  const contract = new web3.eth.Contract(abi, contractAddress);

  return { account, contract, contractAddress, resultDiv };
};

// Wallet Connect => CA 보여줌
const connect = async () => {
  const resultDiv = document.getElementById("result");

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const address = accounts[0];
    resultDiv.innerHTML = `Contract Address : ${address}`;
  } catch (error) {
    console.log(`Wallet Connect 중 에러 발생 : ${error.message}`);
  }
};

// 현재 카운트
const getCount = async () => {
  try {
    const { account, contract, contractAddress, resultDiv } =
      await prepareContract();
    const count = await contract.methods.getCount().call();

    const lastBlock = await web3.eth.getBlockNumber();

    resultDiv.innerHTML = `COUNT : ${count}, 최신 블록 순번 : ${lastBlock}`;
  } catch (error) {
    console.log(`getcount() 에러 발생 : ${error.message}`);
  }
};

// +1
const increment = async () => {
  try {
    const { account, contract, contractAddress, resultDiv } =
      await prepareContract();

    const gas = await contract.methods.increment().estimateGas();
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account);
    const data = await contract.methods.increment().encodeABI();

    const tx = await contract.methods.increment().send({
      from: account,
      to: contractAddress,
      gas: gas,
      gasPrice: gasPrice,
      nonce: nonce,
      data: data,
    });

    resultDiv.innerHTML = `INCREMENT COMPLIMENT, Hash : ${tx.transactionHash}`;
  } catch (error) {
    console.log(`increment() 에러 발생 : ${error.message}`);
    resultDiv.innerHTML = `increment() 에러 발생 : ${error.message}`;
  }
};

// -1
const decrement = async () => {
  try {
    const { account, contract, contractAddress, resultDiv } =
      await prepareContract();

    const gas = await contract.methods.decrement().estimateGas();
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account);
    const data = await contract.methods.decrement().encodeABI();

    const tx = await contract.methods.decrement().send({
      from: account,
      to: contractAddress,
      gas: gas,
      gasPrice: gasPrice,
      nonce: nonce,
      data: data,
    });

    resultDiv.innerHTML = `DECREMENT COMPLIMENT, Hash : ${tx.transactionHash}`;
  } catch (error) {
    console.log(`decrement() 에러 발생 : ${error.message}`);
    resultDiv.innerHTML = `decrement() 에러 발생 : ${error.message}`;
  }
};

// = 0
const reset = async () => {
  try {
    const { account, contract, contractAddress, resultDiv } =
      await prepareContract();

    const gas = await contract.methods.reset().estimateGas();
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account);
    const data = await contract.methods.reset().encodeABI();

    const tx = await contract.methods.reset().send({
      from: account,
      to: contractAddress,
      gas: gas,
      gasPrice: gasPrice,
      nonce: nonce,
      data: data,
    });

    resultDiv.innerHTML = `RESET COMPLIMENT, Hash : ${tx.transactionHash}`;
  } catch (error) {
    console.log(`reset() 에러 발생 : ${error.message}`);
    resultDiv.innerHTML = `reset() 에러 발생 : ${error.message}`;
  }
};
