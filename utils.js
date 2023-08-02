const { join } = require("path");

function getStaticFilesPath() {
  return join(__dirname, "static");
}

function getUploadedImagesPath() {
  return join(getStaticFilesPath(), "images");
}

module.exports = {
  getStaticFilesPath,
  getUploadedImagesPath,
};
