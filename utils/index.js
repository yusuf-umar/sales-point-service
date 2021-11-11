const RandExp = require("randexp");
const dotenv = require('dotenv').config();


GenerateToken = (num) => {
  var text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < num; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

GenerateOTP = (num) => {
  const OTPCode = new RandExp(`[0-9]{${num}}`).gen();

  return OTPCode;
};


const paginate = (req) => {
  const page =
    typeof req.query.page !== "undefined" ? Math.abs(req.query.page) : 1;
  const pageSize =
    typeof req.query.pageSize !== "undefined"
      ? Math.abs(req.query.pageSize)
      : 50;
  const skip = (page - 1) * pageSize;

  return { page, pageSize, skip };
};

const AsyncForEach = async (array, callback) => {
  try {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  } catch (error) {
    console.log('Async for each error', error.message);

  }
};



module.exports = {
  paginate,
  GenerateOTP,
  GenerateToken,
  AsyncForEach,
};