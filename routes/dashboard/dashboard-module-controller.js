async function dashboardModuleController(req, res) {
  try {
    const params = req.body;
    console.log(params);
    return res.send(200);
  } catch (err) {
    return res.serverError(err);
  }
}

module.exports = dashboardModuleController;
