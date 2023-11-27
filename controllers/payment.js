const RedSys = require('../commonHelpers/redsys/index.js');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;
const axios = require('axios');

const MERCHANT_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // TESTING KEY
const redsys = new RedSys(MERCHANT_KEY);
const {encodeBase64url, decodeBase64url} = require("../commonHelpers/redsys/utils.js")

exports.createPayment = async (req, res) => {
  try {
    //receive data from front
    const {
      DS_MERCHANT_AMOUNT,
      DS_MERCHANT_CURRENCY,
      DS_MERCHANT_IDOPER,
      DS_MERCHANT_MERCHANTCODE,
      DS_MERCHANT_ORDER,
      DS_MERCHANT_TERMINAL,
      DS_MERCHANT_TRANSACTIONTYPE
    } = req.body;

    // create object with data for RedSys
    const paymentData = {
      amount: DS_MERCHANT_AMOUNT, 
      orderReference: DS_MERCHANT_ORDER,
      merchantCode: DS_MERCHANT_MERCHANTCODE,
      currency: DS_MERCHANT_CURRENCY,
      transactionType: DS_MERCHANT_TRANSACTIONTYPE,
      terminal: DS_MERCHANT_TERMINAL,
      merchantURL: 'https://b2b.techlines.es/',
      successURL: 'http://localhost:8080/success',
      errorURL: 'http://localhost:8080/error',
      merchantIdOper: DS_MERCHANT_IDOPER,
      emv3ds:{
        "threeDSInfo": "CardData"
       }
    };
   console.log(paymentData)
    //Encrypt data with RedSys
    const result = redsys.makePaymentParameters(paymentData);
   
    //send data
    const response = await axios.post('https://sis-t.redsys.es:25443/sis/rest/iniciaPeticionREST', result);
    if (response.data.errorCode) {
     console.log(response.data.errorCode)
    //  getResponseCodeMessage(response.data.errorCode)
    }
    else {
    const merchantParams = response.data.Ds_MerchantParameters
    const signature = response.data.Ds_Signature
    const responseFromBank = redsys.checkResponseParameters(merchantParams, signature);
    console.log(responseFromBank );
    const threeDSServerTransID = responseFromBank.Ds_EMV3DS.threeDSServerTransID
    const threeDSMethodURL = responseFromBank.Ds_EMV3DS.threeDSMethodURL
    const objToEncode = {
      threeDSServerTransID: threeDSServerTransID,
      threeDSMethodNotificationURL: 'https://dev.techlines.es/api/payment/3DS'
    };
    console.log(objToEncode );
 const newObj = 
    {
      amount: DS_MERCHANT_AMOUNT,
      currency: "978",
      merchantIdOper: DS_MERCHANT_IDOPER,
      emv3ds:{
      "threeDSInfo": "AuthenticationData",
      "protocolVersion": "2.1.0",
      "browserAcceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json",
      "browserUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
      "browserJavaEnabled": "false",
      "browserLanguage": "ES-es",
      "browserColorDepth": "24",
      "browserScreenHeight": "1250",
      "browserScreenWidth": "1320",
      "browserTZ": "52",
      "threeDSServerTransID": threeDSServerTransID,
      "notificationURL": "https://dev.techlines.es/api/payment/3DS",
      "threeDSCompInd": "N"
      },
      merchantCode: "361686405",
      orderReference: DS_MERCHANT_ORDER,
      terminal: "1",
      transactionType: "0",
      merchantURL: 'https://b2b.techlines.es/',
      successURL: 'https://dev.techlines.es/api/payment/3DS',
      errorURL: 'https://dev.techlines.es/api/payment/3DS'
    }
    const authorization = redsys.makePaymentParameters(newObj);
    console.log(authorization)

    const threeDSMethodData = encodeBase64url(objToEncode)
    res.json({ threeDSMethodData, threeDSMethodURL });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment request failed.' });
  }
}

exports.receive3DSMethod = async (req, res) => {
  try {
    const threeDSMethodDataResult = decodeBase64url(req.body)
    console.log(threeDSMethodDataResult);
    res.json({ message: '3DS request sent successfully.' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '3DS method request failed.' });
  }
}
 exports.authorizationPayment = async (req, res) => {

 }
    // const response = {"Ds_SignatureVersion":"HMAC_SHA256_V1","Ds_MerchantParameters":"eyJEc19BbW91bnQiOiIyMDUyNjQiLCJEc19DdXJyZW5jeSI6Ijk3OCIsIkRzX09yZGVyIjoiMzY1NzIxOCIsIkRzX01lcmNoYW50Q29kZSI6IjM2MTY4NjQwNSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX0F1dGhvcmlzYXRpb25Db2RlIjoiNDkyNjY4IiwiRHNfVHJhbnNhY3Rpb25UeXBlIjoiMCIsIkRzX1NlY3VyZVBheW1lbnQiOiIyIiwiRHNfTGFuZ3VhZ2UiOiIxIiwiRHNfTWVyY2hhbnREYXRhIjoiIiwiRHNfQ2FyZF9Db3VudHJ5IjoiNzI0IiwiRHNfQ2FyZF9CcmFuZCI6IjEiLCJEc19Qcm9jZXNzZWRQYXlNZXRob2QiOiI4MCIsIkRzX0NvbnRyb2xfMTcwMDgyMDE2NjA3NCI6IjE3MDA4MjAxNjYwNzQifQ==","Ds_Signature":"fslxWfDHV7ofUYvRawidklZAiWFNJWDs-DSt4Xd_ipo="}
    // const merchantParams = response.Ds_MerchantParameters
    // const signature = response.Ds_Signature
    // const responseFromBank = redsys.checkResponseParameters(merchantParams, signature);
    // console.log(responseFromBank )
    
    // const authorization = redsys.makePaymentParameters(newObj);
    // console.log(authorization)
    // const res = await axios.post('https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST', authorization);
    // if (res.data.errorCode) {
    //  console.log(res.data.errorCode)
    //  getResponseCodeMessage(res.data.errorCode)
    // }
    // else {
    // const merchantParams = res.data.Ds_MerchantParameters
    // const signature = res.data.Ds_Signature
    // const resFromBank = redsys.checkResponseParameters(merchantParams, signature);
    // console.log(resFromBank );
    // }