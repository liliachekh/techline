const RedSys = require('redsys-pos');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;
 
const MERCHANT_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // TESTING KEY
const redsys = new RedSys(MERCHANT_KEY);
 
var obj = {
    amount: '66810', // cents (in euro)
    orderReference: '8381642',
    merchantCode: '999008881',
    currency: "978",
    transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
    terminal: '1',
    merchantURL: 'https://b2b.techlines.es/',
    successURL: 'http://localhost:8080/success',
    errorURL: 'http://localhost:8080/error',
    merchantIdOper : "c53e6e2446b3cb381c30b645ab1a4f32166fdb2c"
    
}
 
const result = redsys.makePaymentParameters(obj);
console.log(result);
//4548 8120 4940 0004
//<input type="hidden" id="token" value="c53e6e2446b3cb381c30b645ab1a4f32166fdb2c">
//361686405
// merchantName: "TECHLINES",

const base64Data = result.Ds_MerchantParameters;
const decodedData = Buffer.from(base64Data, 'base64').toString('utf-8');
const merchantParameters = JSON.parse(decodedData);
console.log("1",merchantParameters);
