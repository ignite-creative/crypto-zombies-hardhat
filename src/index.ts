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

async function addAccountToWallet() {
  const account = await web3.eth.accounts.privateKeyToAccount(
    process.env.OWNER_PRIV_KEY || ""
  );
  await web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  return account;
}

async function getBalance(_addr: string) {
  const wei = await token.methods.balanceOf(_addr).call();
  return wei;
}

async function sendToken(_addr: string) {
  const account = await addAccountToWallet();
  try {
    token.methods
      .transfer(_addr, 100)
      .estimateGas({ from: account.address })
      .then((gas: any) => {
        token.methods.transfer(_addr, 100).send({
          from: account.address,
          to: _addr,
          gas: gas,
        }).then((result: any) => {
          console.log(result);
        }).catch((error: any) => {
          console.log(error);
        })
      });
  } catch (error) {
    console.error(error);
  }
}

const main = async () => {
  const balance = await getBalance(
    "0x1F2BB7f7932c222393ce8177cE564ba79883bC14"
  );
  await sendToken("0x3AC3037F85abC79942c7228bFB67BE601f418d71");
  console.log(balance);
};

main();
