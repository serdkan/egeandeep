const { insert } = require('../../../../libs/helper');

async function addOrderDetailServices(req, res) {
  console.log(req.body.offerNo);
  req.record = {
    Model: req.body.model,
    OrderId: Number(req.body.offerNo),
    Price: Number(req.body.price),
    Length: Number(req.body.length),
    Width: Number(req.body.width),
    Quantity: Number(req.body.quantity),
    RunningMeter: Number(req.body.runningMeter),
    M2: Number(req.body.m2),
    Glass: req.body.glass,
    GlassQuantity: Number(req.body.glassQuantity),
    GlassExtra: Number(req.body.glassExtra),
    GlassPrice: Number(req.body.glassPrice),

    Hinge: req.body.hinge,
    HingeQuantity: Number(req.body.hingeQuantity),

    Piston: req.body.piston,
    PistonQuantity: Number(req.body.pistonQuantity),
    PistonPrice: Number(req.body.pistonPrice),
    PistonExtra: Number(req.body.pistonExtra),

    GrossAmount: Number(req.body.grossAmount),
    NetAmount: Number(req.body.netAmount),
    GrossTotal: Number(req.body.grossTotal),

    DiscountRate: Number(req.body.discountRate),
    AccessoryExtra: Number(req.body.accessoryExtra),
    CreatedBy: req.user.username,
  };

  const result = await insert('ERP_OrderDetail', req.record, 'EGEAN');
  res.json(result);
}

module.exports = addOrderDetailServices;
