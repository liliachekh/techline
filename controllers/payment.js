const RedSys = require('../commonHelpers/redsys/index.js');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;
const axios = require('axios');

const MERCHANT_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // TESTING KEY
const redsys = new RedSys(MERCHANT_KEY);

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
    // const paymentData = {
    //   amount: "100000", 
    //   orderReference: "12345678",
    //   merchantCode: "361686405",
    //   currency: "978",
    //   transactionType: "0",
    //   terminal: "1",
    //   merchantURL: 'https://b2b.techlines.es/',
    //   successURL: 'http://localhost:8080/success',
    //   errorURL: 'http://localhost:8080/error',
    //   // emv3ds:{
    //   //   "threeDSInfo": "CardData"
    //   // }
    // };
    //Encrypt data with RedSys
    const result = redsys.makePaymentParameters(paymentData);
    console.log(result)

    const base64Data = result.Ds_MerchantParameters;
    const decodedData = Buffer.from(base64Data, 'base64').toString('utf-8');
    const merchantParameters = JSON.parse(decodedData);
    console.log(merchantParameters);
    // res.json(result);
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
    }
    res.json({ message: 'Payment request sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment request failed.' });
  }
}