const MintProduct = require("../models/MintProduct");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

exports.addMintProduct = (req, res, next) => {
    const productFields = _.cloneDeep(req.body);
  
    productFields.itemNo = rand();
  
    try {
      productFields.name = productFields.name
        .toLowerCase()
        .trim()
        .replace(/\s\s+/g, " ");
  
    } catch (err) {
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      });
    }
  
    const updatedProduct = queryCreator(productFields);
  
    const newMintProduct = new MintProduct(updatedProduct);
  
    newMintProduct
      .save()
      .then(product => res.json(product))
      .catch(err =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `
        })
      );
  };
  exports.getMintProducts = (req, res, next) => {
    const perPage = Number(req.query.perPage);
    const startPage = Number(req.query.startPage);
    const sort = req.query.sort;
  
    MintProduct.find()
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort)
      .then(products => res.send(products))
      .catch(err =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `
        })
      );
  };
  exports.getMintProductById = (req, res, next) => {
    MintProduct.findOne({
      itemNo: req.params.itemNo
    })
      .then(product => {
        if (!product) {
          res.status(400).json({
            message: `Product with itemNo ${req.params.itemNo} is not found`
          });
        } else {
          res.json(product);
        }
      })
      .catch(err =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `
        })
      );
  };

  exports.updateMintProduct = (req, res, next) => {
    MintProduct.findOne({ _id: req.params.id })
      .then(product => {
        if (!product) {
          return res.status(400).json({
            message: `Product with id "${req.params.id}" is not found.`
          });
        } else {
          const productFields = _.cloneDeep(req.body);
  
          try {
            productFields.name = productFields.name
              .toLowerCase()
              .trim()
              .replace(/\s\s+/g, " ");
          } catch (err) {
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            });
          }
  
          const updatedProduct = queryCreator(productFields);
  
          MintProduct.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedProduct },
            { new: true }
          )
            .then(product => res.json(product))
            .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
            );
        }
      })
      .catch(err =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `
        })
      );
  };