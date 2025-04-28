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
  const contractAddress = document.querySelector("#address").value;
  const resultDiv = document.querySelector("#result");

  if (!contractAddress) {
    resultDiv.innerHTML = "컨트랙트 주소를 입력해주세요.";
    return;
  }

  try {
    const abi = await loadABI();
    const contract = new web3.eth.Contract(abi, contractAddress);
    const count = await contract.methods.getCount().call();
    resultDiv.innerHTML = `COUNT : ${count}`;
  } catch (error) {
    console.log(`getcount() 에러 발생 : ${error.message}`);
  }
};

const increment = async () => {
  const contractAddress = document.querySelector("#address").value;
  const resultDiv = document.querySelector("#result");

  if (!contractAddress) {
    resultDiv.innerHTML = "컨트랙트 주소를 입력해주세요.";
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = window.ethereum.selectedAddress;
    const abi = await loadABI();
    const contract = new web3.eth.Contract(abi, contractAddress);

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
  }
};
