const RedSys = require('../commonHelpers/redsys/index.js');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;
const axios = require('axios');

const MERCHANT_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // TESTING KEY
const redsys = new RedSys(MERCHANT_KEY);
const { encodeBase64url, decodeBase64url } = require("../commonHelpers/redsys/utils.js")

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
      successURL: 'https://storage.techlines.es/api/payment/ok',
      errorURL: 'https://storage.techlines.es/api/payment/ko',
      merchantIdOper: DS_MERCHANT_IDOPER,
      emv3ds: {
        "threeDSInfo": "CardData"
      }
    };
    console.log("paymentData: ",paymentData)
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
      console.log("responseFromBank: ",responseFromBank);
      //make obj for threeDSMethodData
      const threeDSServerTransID = responseFromBank.Ds_EMV3DS.threeDSServerTransID
      const threeDSMethodURL = responseFromBank.Ds_EMV3DS.threeDSMethodURL
      const protocolVersion = responseFromBank.Ds_EMV3DS.protocolVersion
      const objToEncode = {
        threeDSServerTransID: threeDSServerTransID,
        threeDSMethodNotificationURL: 'https://storage.techlines.es/api/payment/3DS'
      };
      console.log("threeDSMethodData: ",objToEncode);

      const threeDSMethodData = encodeBase64url(objToEncode)
      res.json({ threeDSMethodData, threeDSMethodURL, threeDSServerTransID, protocolVersion });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment request failed.' });
  }
}

exports.receive3DSMethod = async (req, res) => {
  try {
// setTimeout(() => {
//   res.json({ message: '10 сек 3DS request sent successfully.' });
// }, 10000)
if (req.body.cres) {
  res.redirect('https://b2b.techlines.es')
  console.log("Answer from bank", req.body);
  // res.json( req.body)
}
else {
  res.json({ message: '3DS request sent successfully.' });
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '3DS method request failed.' });
  }
};

exports.authorizationPayment = async (req, res) => {
  try {
    const {
      DS_MERCHANT_AMOUNT,
      DS_MERCHANT_CURRENCY,
      DS_MERCHANT_IDOPER,
      DS_MERCHANT_MERCHANTCODE,
      DS_MERCHANT_ORDER,
      DS_MERCHANT_TERMINAL,
      DS_MERCHANT_TRANSACTIONTYPE,
      DS_MERCHANT_EMV3DS
    } = req.body;

    const authorizationData =
    {
      amount: DS_MERCHANT_AMOUNT,
      currency: DS_MERCHANT_CURRENCY,
      merchantIdOper: DS_MERCHANT_IDOPER,
      emv3ds: DS_MERCHANT_EMV3DS,
      merchantCode: DS_MERCHANT_MERCHANTCODE,
      orderReference: DS_MERCHANT_ORDER,
      terminal: DS_MERCHANT_TERMINAL,
      transactionType: DS_MERCHANT_TRANSACTIONTYPE,
      merchantURL: 'https://b2b.techlines.es/',
      successURL: 'https://storage.techlines.es/api/payment/ok',
      errorURL: 'https://storage.techlines.es/api/payment/ko'
    }
    const authorization = redsys.makePaymentParameters(authorizationData);
    console.log("Auth", authorization)
    //send data
    const response = await axios.post('https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST', authorization);
    if (response.data.errorCode) {
      console.log(response.data.errorCode)
      //  getResponseCodeMessage(response.data.errorCode)
    }
    else {
      const merchantParams = response.data.Ds_MerchantParameters
      const signature = response.data.Ds_Signature
      const responseFromBank = redsys.checkResponseParameters(merchantParams, signature);
      if (responseFromBank.Ds_Response) {
        res.json({ message: `Response ${responseFromBank.Ds_Response}` });
      } else {
        res.json(responseFromBank.Ds_EMV3DS)
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Authorization request failed.' });
  }
}
