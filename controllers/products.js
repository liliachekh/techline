const Product = require("../models/Product");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

exports.addImages = (req, res, next) => {
  if (req.files.length > 0) {
    res.json({
      message: "Photos are received"
    });
  } else {
    res.json({
      message:
        "Something wrong with receiving photos at server. Please, check the path folder"
    });
  }
};

exports.addProduct = (req, res, next) => {
  const productFields = _.cloneDeep(req.body);

  productFields.itemNo = rand();

  try {
    productFields.name = productFields.name
      // .toLowerCase()
      .trim()
      .replace(/\s\s+/g, " ");

    // const imageUrls = req.body.previewImages.map(img => {
    //   return `/img/products/${productFields.itemNo}/${img.name}`;
    // });

    // productFields.imageUrls = _.cloneDeep(imageUrls);
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }

  const updatedProduct = queryCreator(productFields);

  const newProduct = new Product(updatedProduct);

  newProduct
    .save()
    .then(product => res.json(product))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      if (!product) {
        return res.status(400).json({
          message: `Product with id "${req.params.id}" is not found.`
        });
      } else {
        const productFields = _.cloneDeep(req.body);

        try {
          productFields.name = productFields.name
            // .toLowerCase()
            .trim()
            .replace(/\s\s+/g, " ");
        } catch (err) {
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          });
        }

        const updatedProduct = queryCreator(productFields);

        Product.findOneAndUpdate(
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

exports.getProducts = (req, res, next) => {
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  Product.find()
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

exports.getProductById = (req, res, next) => {
  Product.findOne({
    productUrl: req.params.productUrl
  })
    .then(product => {
      if (!product) {
        res.status(400).json({
          message: `Product ${req.params.productUrl} is not found`
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

exports.getProductsFilterParams = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;
  const search = req.query.search;
  const regex = new RegExp(search, 'i');
  try {
    const products = await Product
      .find({ name: { $regex: regex } })
      .find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .collation({ locale: 'en', strength: 2 })
      .sort(sort);

    const productsQuantity = await Product.find({ name: { $regex: regex } }).find(mongooseQuery);

    res.json({ products, productsQuantity: productsQuantity.length });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.searchProducts = async (req, res, next) => {
  if (!req.body.query) {
    res.status(400).json({ message: "Query string is empty" });
  }

  //Taking the entered value from client in lower-case and trimed
  let query = req.body.query
    // .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");

  // Creating the array of key-words from taken string
  let queryArr = query.split(" ");

  // Finding ALL products, that have at least one match
  let matchedProducts = await Product.find({
    $text: { $search: query }
  });

  res.send(matchedProducts);
};

exports.deleteProduct = (req, res, next) => {
  Product.findOne({ itemNo: req.params.itemNo }).then(async product => {
    if (!product) {
      return res
        .status(400)
        .json({ message: `Product with itemNo ${req.params.itemNo} is not found.` });
    } else {
      const productToDelete = await Product.findOne({ itemNo: req.params.itemNo });

      Product.deleteOne({ itemNo: req.params.itemNo })
        .then(deletedCount =>
          res.status(200).json({
            message: `Product witn itemNo "${productToDelete.itemNo}" is successfully deletes from DB. Product Details: ${productToDelete}`
          })
        )
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });
};

exports.updateProductPrice = (req, res, next) => {
  // Проверяем, существует ли товар с указанным ID
  Product.findOne({ _id: req.params.id })
    .then(product => {
      if (!product) {
        // Если товар не найден, отправляем сообщение об ошибке
        return res.status(404).json({
          message: `Product with id "${req.params.id}" is not found.`
        });
      } else {
        // Проверяем, существует ли новая цена в запросе
        if (!req.body.currentPrice) {
          return res.status(400).json({
            message: `Price is required for updating product.`
          });
        }

        // Обновляем только цену товара
        product.currentPrice = req.body.currentPrice;

        // Сохраняем обновленный товар
        product.save()
          .then(updatedProduct => res.json(updatedProduct))
          .catch(err =>
            res.status(400).json({
              message: `Error happened while updating product price: "${err}" `
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