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

const contract = new web3.eth.Contract(
  JSON.parse(fs.readFileSync(abiPath, "utf8"))
);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const deployTx = contract.deploy({
      data: "0x" + fs.readFileSync(bytecodePath, "utf8"),
      arguments: [],
    });

    const gas = await deployTx.estimateGas();
    const gasPrice = await web3.eth.getGasPrice();

    const deploy = await deployTx.send({
      from: account,
      gas: gas,
      gasPrice: gasPrice,
    });

    console.log(`배포 완료 ${deploy.options.address}`);
  } catch (error) {
    console.log(`Ganache 배포 중 에러 방생 : ${error.message}`);
  }
};

deploy();
