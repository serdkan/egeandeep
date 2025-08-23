const sql = require('mssql');
const Dashboard = require('./model/dashboard.model');

async function dashboardModuleController(req, res) {
  try {
    const { date, url } = req.query;
    if (url === 'daily-order-report') {
      const result = await Dashboard.getDashboardData(
        {
          firmId: {
            type: sql.Int,
            value: 1,
          },
          Date: {
            type: sql.date,
            value: date,
          },
        },
        url,
      );
      return res.send(result.data);
    }
    return res.send(400);
  } catch (err) {
    return res.serverError(err);
  }
}

module.exports = dashboardModuleController;
