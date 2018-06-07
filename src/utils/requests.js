/**
 * Created by morenyang on 2018/6/7.
 */

import nebulas from 'nebulas'
import Nebpay from 'nebpay.js'
import {DAPP_ADDRESS} from '../config'

const Account = nebulas.Account;
const neb = new nebulas.Neb();
const nebPay = new Nebpay();


neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));

function get(key) {
  let from = Account.NewAccount().getAddressString();

  let value = "0";
  let nonce = "0";
  let gas_price = "1000000";
  let gas_limit = "2000000";
  let callFunction = "get";
  let callArgs = JSON.stringify([key]);

  let contract = {
    "function": callFunction,
    "args": callArgs
  };
  return neb.api.call(from, DAPP_ADDRESS, value, nonce, gas_price, gas_limit, contract)
    .then(resp => {
      let result = resp.result;
      console.debug(`return of rpc call : ${JSON.stringify(result)}`)
      return result;
    })
}

function push(key, val, cb) {
  let value = "0";
  let callFunction = "save";
  let callArgs = JSON.stringify([key, val]);

  serialNumber = nebPay.call(DAPP_ADDRESS, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
    listener: cb,       //设置listener, 处理交易返回信息
    callback: Nebpay.config.mainnetUrl
  });
}

export {get, push}
