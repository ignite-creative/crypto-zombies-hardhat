import { readFileSync } from "fs";
import Web3 from "web3";
import path from "path";

require("dotenv").config();

const url = process.env.MOONBASE || "";
const addrToken = process.env.TOKEN_ADDR || "";
const web3 = new Web3(url);
const abi = JSON.parse(
  readFileSync(path.resolve(__dirname, "./abi/Token.json"), "utf-8")
).abi;

const token = new web3.eth.Contract(abi, addrToken);

async function getBalance(_addr: string) {
  const wei = await token.methods.balanceOf(_addr).call();
  return wei;
}

const main = async () => {
  const balance = await getBalance("0x1F2BB7f7932c222393ce8177cE564ba79883bC14");
  console.log(balance);
};

main();
