async function dashboardModuleController(req, res) {
  try {
    return res.send(200);
  } catch (err) {
    return res.serverError(err);
  }
}

module.exports = dashboardModuleController;
