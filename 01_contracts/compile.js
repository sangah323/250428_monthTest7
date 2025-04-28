const fs = require("fs");
const path = require("path");
const solc = require("solc");

const counterPath = path.join(__dirname, "Counter.sol");
const source = fs.readFileSync(counterPath, "utf8");

const input = {
  language: "Solidity",
  sources: { "Counter.sol": { content: source } },
  settings: {
    outputSelection: { "*": { "*": ["*"] } },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(JSON.stringify(output, null, 2));

if (output.errors) {
  console.log("compile 중 에러 발생 : ", output.errors);
  process.exit(1);
}

const contract = output.contracts["Counter.sol"]["Counter"];
const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

console.log("ABI 저장 중");
fs.writeFileSync(
  path.join(__dirname, "contracts_Counter_sol_Counter.abi"),
  JSON.stringify(abi, null, 2)
);

console.log("Bytecode 저장 중");
fs.writeFileSync(
  path.join(__dirname, "contracts_Counter_sol_Counter.bin"),
  bytecode
);

console.log("Compile 완료");
