module.exports = function coupongenerator() {
  let coupon = "";
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++) {
  coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return coupon;
  }
 