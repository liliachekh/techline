const { join } = require("path");

function getStaticFilesPath() {
  return join(__dirname, "static");
}

function getUploadedImagesPath() {
  return join(getStaticFilesPath(), "images");
}

function getTierPrice(customer, currentPrice) {
  switch (customer?.tier) {
    case 'vip':
      return Math.ceil((Number(currentPrice) + Number(currentPrice) * 0.005) * 100) / 100
    case 'premium':
      return Math.ceil((Number(currentPrice) + Number(currentPrice) * 0.01) * 100) / 100
    case 'beginner':
      return Math.ceil((Number(currentPrice) + Number(currentPrice) * 0.02) * 100) / 100

    default:
      return currentPrice
  }
}

module.exports = {
  getStaticFilesPath,
  getUploadedImagesPath,
  getTierPrice,
};
