const orderListSql = (orderType, dateType) => `SELECT SIPARISNO AS orderNo,
CAST(TARIH AS date) AS orderDate,
CARI_ISIM AS accountName,
DBO.TRK(ACIKLAMA) AS description,
SIPARISTIPI AS orderType,
CAST(TESLIMTARIHI AS date) AS deliveryDate,
ISKONTOTUTARI AS discountAmount,
GENELTOPLAM AS totalAmount,
KAYDEDENKUL AS createdBy,
TESLIM_SEKLI AS deliveryMethod,
(SELECT SUM(MIKTAR) FROM SIPARISDET SPD WHERE SPD.SIPARISNO=SP.SIPARISNO) AS quantity,
(SELECT SUM(TOPLAMM2) FROM SIPARISDET SPD WHERE SPD.SIPARISNO=SP.SIPARISNO) AS m2,
TUTAR AS amount
FROM SR_SIPARIS_UST_BILGI SP
WHERE @startDate<=${dateType} AND @endDate>=${dateType}
AND SP.SIPTIP IN (${orderType})`;

const orderListDetailForOrderNoSql = (orderNo) => `select 
SIPARISNO       AS orderNo,
ST.STOK_ADI     AS stockName,
STOKKODU        AS stockCode,
DET.MIKTAR          AS quantity,
DET.EN              AS width,
DET.BOY             AS height,
TOPLAMM2        AS totalM2,
BRUTFIYAT       AS grossPrice,
NETFIYAT        AS netPrice,
TUTAR           AS amount,
KAPAKTIPI       AS coverType,
CAM             AS glass,
MENTESE         AS hinge,
MENTESEADET     AS hingeCount,
(CASE WHEN AMORTISOR='AKS44' THEN 'BOYDAN KULP' ELSE '' END ) AS handle,
ISNULL(AMORTISORADET,0)        AS handleCount
 from SIPARISDET DET
 LEFT JOIN TBLSTSABIT ST ON DET.STOKKODU=ST.STOK_KODU 
 WHERE SIPARISNO IN (${orderNo})
`;

const orderDetailRowSql = `SELECT * FROM EGEAN.dbo.ERPV_OrderDetail WHERE orderId=@Id`;

const orderOfferSql = (dateType) =>
  `SELECT * FROM EGEAN.dbo.ERPV_Order WHERE ${dateType}>=@startDate and ${dateType}<=@endDate`;

const orderOfferDetailSql = (orderId) =>
  `SELECT * FROM EGEAN.dbo.ERPV_OrderDetail WHERE orderId in (${orderId})`;

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
  orderListDetailForOrderNoSql,
  orderDetailRowSql,
  orderOfferSql,
  orderOfferDetailSql,
};
