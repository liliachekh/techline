const RedSys = require('redsys-pos');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;
 
const MERCHANT_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // TESTING KEY
const redsys = new RedSys(MERCHANT_KEY);
 
var obj = {
    amount: '1000', // cents (in euro)
    orderReference: '06080232580',
    merchantName: "TECHLINES",
    merchantCode: '361686405',
    currency: "978",
    transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
    terminal: '1',
    merchantURL: 'https://b2b.techlines.es/',
    successURL: 'http://localhost:8080/success',
    errorURL: 'http://localhost:8080/error',
    DS_MERCHANT_PAN: "454881********04",
    DS_MERCHANT_CVV2: "123",
    DS_MERCHANT_EXPIRYDATE: "1512"
}
 
const result = redsys.makePaymentParameters(obj);
console.log(result);
