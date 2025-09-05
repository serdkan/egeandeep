const mssql = require('mssql');
const {
  orderListSql,
  orderListDetailForOrderNoSql,
  orderDetailRowSql,
  orderOfferSql,
  orderOfferDetailSql,
} = require('../order.sql.js');
const { executeQuery } = require('../../../libs/helper');
const addOrderServices = require('./services/addOrderServices.js');
const addOrderDetailServices = require('./services/addOrderDetailServices.js');

class Order {
  static async getOrder({
    params,
    type,
    orderType,
    orderNo,
    dateType,
    customQuery,
    ordersId,
  }) {
    let sql = '';
    switch (type) {
      case 'orders':
        sql = orderListSql(orderType, dateType);
        break;
      case 'order-detail':
        sql = orderListDetailForOrderNoSql(orderNo);
        break;
      case 'order-detail-row':
        sql = orderDetailRowSql;
        break;
      case 'order-offer-list':
        sql = orderOfferSql(dateType);
        break;
      case 'order-offer-detail-list':
        sql = orderOfferDetailSql(ordersId);
        break;

      default:
        break;
    }
    let paginationQuery = '';
    let paginationParams = {};
    if (customQuery) {
      paginationQuery =
        ' ORDER BY id OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY';

      paginationParams = {
        skip: {
          type: mssql.Int,
          value: customQuery.skip,
        },
        take: {
          type: mssql.Int,
          value: customQuery.take,
        },
      };
    }

    const mergedParams = { ...params, ...paginationParams };
    const result = await executeQuery(`${sql}${paginationQuery}`, [
      mergedParams,
    ])
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return result;
  }

  static async addOrder(req, res, type) {
    switch (type) {
      case 'add-order':
        addOrderServices(req, res);
        break;
      case 'add-order-detail':
        addOrderDetailServices(req, res);
        break;
      default:
        break;
    }
  }

  static async addOrderDetailRow(req, res, type) {
    switch (type) {
      case 'order-detail-row':
        addOrderDetailServices(req, res);
        break;
      default:
        break;
    }
  }
}

module.exports = Order;
