const RedSys = require('./index');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;
const axios = require('axios');

const MERCHANT_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // TESTING KEY
const redsys = new RedSys(MERCHANT_KEY);

const paymentData = {
  amount: "100000", 
  orderReference: "1234567",
  merchantCode: "361686405",
  currency: "978",
  transactionType: "0",
  terminal: "1",
  merchantURL: 'https://b2b.techlines.es/',
  successURL: 'http://localhost:8080/success',
  errorURL: 'http://localhost:8080/error',
  // emv3ds:{
  //   "threeDSInfo": "CardData"
  // }
};
//Encrypt data with RedSys
const result = redsys.makePaymentParameters(paymentData);
console.log(result)

const base64Data = result.Ds_MerchantParameters;
    const decodedData = Buffer.from(base64Data, 'base64').toString('utf-8');
    const merchantParameters = JSON.parse(decodedData);
    console.log(merchantParameters);