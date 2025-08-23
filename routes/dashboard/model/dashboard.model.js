const { executeQuery } = require('../../../libs/helper');
const { dailyOrderReport } = require('../dashboard.sql');

class Dashboard {
  static async getDashboardData(params, type) {
    let sql = '';
    switch (type) {
      case 'daily-order-report':
        sql = dailyOrderReport;
        break;
      default:
        break;
    }
    const result = await executeQuery(sql, [params])
      .then((data) => {
        return { data: data.data, totalCount: data.totalCount };
      })
      .catch((err) => console.log(err));
    return result;
  }
}

module.exports = Dashboard;
