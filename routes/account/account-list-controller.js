const Account = require('./model/account.model');

async function accountListController(req, res) {
  const result = await Account.getAccount({}, 'account');
  res.json(result);
}

module.exports = accountListController;
