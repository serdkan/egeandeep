import general from '../../../routes/helper/mysql-helper.js';
import {
  orderListSql,
  orderListIdSql,
  orderDeleteSql,
  orderInsertSql,
  orderUpdateSql,
  orderDetailListSql,
  orderDetailListIdSql,
  orderLineListSql,
  orderLineListIdSql,
} from '../order.sql.js';

class Order {
  static async OrderList(data, type) {
    /**
     * erp_order tablosundan kayıt listeler
     * @param {number} firmId - firmId.
     * @param {string} siparisNo - siparisNo.
     * @where firmId and evrak no
     */
    if (type === 'list') {
      const result = await general(orderListSql, data);
      return result;
    }
    if (type === 'listid') {
      const result = await general(orderListIdSql, data);
      return result;
    }
    return undefined;
  }

  /**
   * erp_order tablosuna kayıt atar
   *
   * @param {number} firmId - firmId.
   * @param {number} subeId - subeId.
   */
  static async OrderInsert(data) {
    const result = await general(orderInsertSql, data);
    return result;
  }

  /**
   * erp_order tablosunu günceller atar
   * güncellenecek alanlar
   * @param {number} cariId - firmId.
   * @param {string} siparisNo - subeId.
   * @where firmId and evrak no
   */
  static async OrderUpdate(data) {
    const result = await general(orderUpdateSql, data);
    return result;
  }

  /**
   * erp_order tablosundan satır siler
   * @where firmId and orderId
   */
  static async OrderDelete(data) {
    const result = await general(orderDeleteSql, data);
    return result;
  }

  static async OrderDetailList(data, type) {
    if (type === 'list') {
      const result = await general(orderDetailListSql, data);
      return result;
    }
    if (type === 'listid') {
      const result = await general(orderDetailListIdSql, data);
      return result;
    }

    return undefined;
  }

  static async OrderDetailDelete(data) {
    const result = await general(orderDeleteSql, data);
    return result;
  }

  static async OrderLineList(data, type) {
    if (type === 'list') {
      const result = await general(orderLineListSql, data);
      return result;
    }
    if (type === 'listid') {
      const result = await general(orderLineListIdSql, data);
      return result;
    }
    return undefined;
  }

  static async OrderLineDelete(data) {
    const result = await general(orderDeleteSql, data);
    return result;
  }
}

export default Order;
