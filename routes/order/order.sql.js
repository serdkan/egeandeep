const orderListSql = `SELECT * FROM SRV_Order`;

const orderListIdSql = `select * from erp_siparis detay where firmId=@firmId and id=@id`;
const orderDeleteSql = `delete from erp_siparis where firmId=@firmId and id=@id`;
const orderInsertSql = `INSERT INTO ERP_Siparis
                                  (
                                  firmId,
                                  subeId,
                                  userId,
                                  tarih,
                                  turId,
                                  evrakNo,
                                  aciklama,
                                  cariId,
                                  teslimTarihi,
                                  teslimAdresi,
                                  sepet,
                                  aktif,
                                  kaydeden,
                                  kayitTarihi,
                                  teslimLokasyon
                                  )
                                  VALUES (
                                  @firmId,
                                  @subeId,
                                  @userId,
                                  NOW(),
                                  @turId,
                                  @evrakNo,
                                  @aciklama,
                                  @cariId,
                                  @teslimTarihi,
                                  @teslimAdresi,
                                  1,
                                  1,
                                  @kaydeden,
                                  NOW(),
                                  @teslimLokasyon
                                  )`;
const orderUpdateSql = `update ERP_Siparis set Sepet=0,cariId=@cariId,siparisNo=@siparisNo,teslimTarihi=@teslimtarihi,telegramMesajId=@telegramMesajId,telegramMesajId2=@telegramMesajId2 where firmId=@firmId and evrakNo=@evrakNo`;
const orderDetailListSql = `select * from erp_siparisdetay detay where firmId=@firmId`;
const orderDetailListIdSql = `select * from erp_siparis detay where firmId=@firmId and id=@id`;
const orderLineListSql = `select * from erp_siparishreket detay where firmId=@firmId`;
const orderLineListIdSql = `select * from erp_siparishareket detay where firmId=@firmId and id=@id`;

export {
  orderListSql,
  orderListIdSql,
  orderDetailListSql,
  orderDetailListIdSql,
  orderLineListSql,
  orderLineListIdSql,
  orderDeleteSql,
  orderInsertSql,
  orderUpdateSql,
};
