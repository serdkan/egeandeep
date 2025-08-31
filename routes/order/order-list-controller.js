const sql = require('mssql');
const Order = require('./model/orders.model');

async function orderListController(req, res) {
  try {
    const { startDate, endDate, type, orderType, dateType } = req.query;

    const dateTypeStr = dateType === '1' ? 'TARIH' : 'TESLIMTARIHI';

    const result = await Order.getOrder(
      {
        startDate: {
          type: sql.Date,
          value: startDate,
        },
        endDate: {
          type: sql.Date,
          value: endDate,
        },
      },
      type,
      orderType.join(','),
      '',
      dateTypeStr,
    );

    if (result.data.length === 0) {
      return res.json({
        data: [],
        totalCount: 0,
      });
    }

    const ordersNo = result.data.map((item) => `'${item.orderNo}'`).join(',');

    const resultDeteail = await Order.getOrder(
      {},
      'order-detail',
      [],
      ordersNo,
    );

    const enrichedOrders = result.data.map((order) => {
      const matchingDetails = resultDeteail.data.filter(
        (detail) => detail.orderNo === order.orderNo,
      );

      return {
        ...order,
        orderDetail: matchingDetails,
      };
    });

    return res.json({
      data: enrichedOrders,
      totalCount: result.totalCount,
    });
  } catch (err) {
    return res.status(500).send('Server error occurred');
  }
}

module.exports = orderListController;
