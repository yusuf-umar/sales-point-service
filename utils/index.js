const RandExp = require("randexp");
const dotenv = require('dotenv').config();
const mailjet = require('node-mailjet').connect('9c50938391264148b6be5f5295e858aa', '4d2360bc6de8bd7e37a98a025cdaae41')


GenerateCode = (num) => {
  const token = new RandExp(`[a-z]{${num}}`).gen();

  return token;
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

const mailSender = async (to, subject, text, html) => {
  const request = mailjet.post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "fafowora.oluwatobiloba@academicianhelp.com",
            "Name": "fafowora"
          },
          "To": [
            to
          ],
          "Subject": subject,
          "TextPart": text,
          "HTMLPart": html,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    
    await request.then((result) => {
      console.log(result.body)
    }).catch((err) => {
      console.log({err})
    })
}

module.exports = {
  paginate,
  GenerateCode,
  mailSender
};