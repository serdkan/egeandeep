const sql = require('mssql');
const Dashboard = require('./model/dashboard.model');

async function dashboardModuleController(req, res) {
  try {
    const { startDate, endDate, url } = req.query;
    if (url === 'daily-order-report') {
      const result = await Dashboard.getDashboardData(
        {
          startDate: {
            type: sql.date,
            value: startDate,
          },
          endDate: {
            type: sql.date,
            value: endDate,
          },
        },
        url,
      );

      return res.send(result.data);
    }
    return res.send(400);
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || 'Internal Server Error' });
  }
}

module.exports = dashboardModuleController;
