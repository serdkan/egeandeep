const sql = require('mssql');
const Order = require('./model/orders.model');

async function orderOfferListController(req, res) {
  try {
    const { startDate, endDate, dateType } = req.query;
    const newDateType = dateType === '1' ? 'offerDate' : 'deliveryDate';
    const result = await Order.getOrder({
      params: {
        startDate: {
          type: sql.Date,
          value: startDate,
        },
        endDate: {
          type: sql.Date,
          value: endDate,
        },
      },
      type: 'order-offer-list',
      dateType: newDateType,
    });

    const ordersId = result.data.map((item) => `'${item.id}'`).join(',');

    const resultDeteail = await Order.getOrder({
      type: 'order-offer-detail-list',
      ordersId,
    });

    const enrichedOrders = result.data.map((order) => {
      const matchingDetails = resultDeteail.data.filter(
        (detail) => detail.orderId === order.id,
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

module.exports = orderOfferListController;
