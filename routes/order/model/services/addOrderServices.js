const { insert } = require('../../../../libs/helper');

async function addOrderServices(req, res) {
  try {
    const { offer } = req.body;
    req.record = {
      AccountCode: offer.accountCode,
      Desctiption: offer.desctiption,
      BarcodeDescription: offer.barcodeDescription,
      OfferDate: offer.offerDate ? new Date(offer.offerDate) : null,
      DeliveryDate: offer.deliveryDate ? new Date(offer.deliveryDate) : null,
      OrderType: offer.orderType !== undefined ? Number(offer.orderType) : null,
      Type: 0, // her zaman ilk önce TEklif olacak 0- teklif / 1 - sipariş
      DeliveryType:
        offer.deliveryType !== undefined ? Number(offer.deliveryType) : null,

      CreatedBy: req.user.username,
    };
    const result = await insert('ERP_Order', req.record, 'EGEAN');
    res.json(result);
  } catch (err) {
    console.log(err);
  }
}
module.exports = addOrderServices;
