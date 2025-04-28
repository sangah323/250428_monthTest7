const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:8545");

const abiPath = path.join(
  __dirname,
  "../01_contracts/contracts_Counter_sol_Counter.abi"
);
const bytecodePath = path.join(
  __dirname,
  "../01_contracts/contracts_Counter_sol_Counter.bin"
);

const increment = async () => {
  try {
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    const bytecode = "0x" + fs.readFileSync(bytecodePath, "utf8");

    if (!bytecode.startsWith("0x")) {
      throw new Error("올바른 주소값이 아닙니다.");
    }

    const contractAddress = "0xa1c016d7c6389F14C1b58153e638Bc625E619884";
    const contract = new web3.eth.Contract(abi, contractAddress);

    const gas = await contract.methods.increment().estimateGas();
    const gasPrice = await web3.eth.getGasPrice();
    const data = await contract.methods.increment().encodeABI();

    const tx = {
      from: "0xFdd1B7E42ad145c45F311724bD6d77D686AD4C0a",
      to: contractAddress,
      data: data,
      gas: gas,
      gasPrice: gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      "0x6e94c6ad4d20930bf469bff3674bc496d07ea1dbfe4b735c7fdf49a591535618"
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    const result = await contract.methods.getCount().call();
    console.log("imcrement가 완료되었습니다. Count : ", Number(result));
  } catch (error) {
    console.log(`increment() 에러 발생 : ${error.message}`);
  }
};

increment();
