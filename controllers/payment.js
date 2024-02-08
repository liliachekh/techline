const RedSys = require('../commonHelpers/redsys/index.js');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;
const axios = require('axios');
const ThreeDS = require("../models/3DS");

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
      successURL: 'http://localhost:8080/success',
      errorURL: 'http://localhost:8080/error',
      merchantIdOper: DS_MERCHANT_IDOPER,
      emv3ds: {
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
      console.log(responseFromBank);
      //make obj for threeDSMethodData
      const threeDSServerTransID = responseFromBank.Ds_EMV3DS.threeDSServerTransID
      const threeDSMethodURL = responseFromBank.Ds_EMV3DS.threeDSMethodURL
      const protocolVersion = responseFromBank.Ds_EMV3DS.protocolVersion
      const objToEncode = {
        threeDSServerTransID: threeDSServerTransID,
        threeDSMethodNotificationURL: 'https://storage.techlines.es/api/payment/3DS'
      };
      console.log(objToEncode);
      // save transID to db
      ThreeDS.findOne({ threeDSServerTransID: threeDSServerTransID }).then(transID => {
        if (transID) {
          console.error({ message: `TransID with threeDSServerTransID "${transID.threeDSServerTransID}" already exists` });
        } else {
          const newThreeDS = new ThreeDS({
            threeDSServerTransID: threeDSServerTransID
          });

          newThreeDS
            .save()
            .then(transID => console.log(transID))
            .catch(err =>
              console.error({
                message: `Error happened on server: "${err}" `
              })
            );
        }
      });

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
    const threeDSMethodDataResult = decodeBase64url(req.body.threeDSMethodData);
    const threeDSServerTransID = threeDSMethodDataResult.threeDSServerTransID;
console.log(threeDSMethodDataResult);
    // Find transID in db
    ThreeDS.findOne({ threeDSServerTransID: threeDSServerTransID }).then(transID => {
      if (transID) {
        // Update the record with the new field
        transID.threeDSCompInd = "Y";

        // Save the updated record
        transID.save().then(updatedTransID => {
          res.json({ message: '3DS request sent successfully.' });
        }).catch(err => {
          console.error({
            message: `Error updating record: "${err}" `
          });
          res.status(500).json({ message: '3DS method request failed.' });
        });
      } else {
        console.error({ message: `TransID with threeDSServerTransID "${threeDSServerTransID}" not found in the database.` });
        res.status(404).json({ message: 'TransID not found in the database.' });
      }
    }).catch(err => {
      console.error({
        message: `Error finding record: "${err}" `
      });
      res.status(500).json({ message: '3DS method request failed.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '3DS method request failed.' });
  }
};

exports.get3DSTransId = async (req, res) => {
  ThreeDS.findOne({
    threeDSServerTransID: req.params.threeDSServerTransID
  })
    .then(transID => {
      if (!transID) {
        res.status(400).json({
          message: `ThreeDSServerTransID ${req.params.threeDSServerTransID} is not found`
        });
      } else {
        res.json(transID);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
}

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

    // {
    //   "threeDSInfo": "AuthenticationData",
    //   "protocolVersion": "2.1.0",
    //   "browserAcceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json",
    //   "browserUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    //   "browserJavaEnabled": "false",
    //   "browserLanguage": "ES-es",
    //   "browserColorDepth": "24",
    //   "browserScreenHeight": "1250",
    //   "browserScreenWidth": "1320",
    //   "browserTZ": "52",
    //   "threeDSServerTransID": threeDSServerTransID,
    //   "notificationURL": "https://storage.techlines.es/api/payment/3DS",
    //   "threeDSCompInd": "N"
    //   }