const accountListSql = `SELECT
 ROW_NUMBER() OVER (ORDER BY CARI_KOD) AS id,
 CARI_KOD AS accountCode,
dbo.TRK(CARI_ISIM) AS accountName,
dbo.TRK(CARI_ADRES) AS accountAdress,
dbo.TRK(CARI_IL) AS city,
dbo.TRK(CARI_ILCE) AS town,RAPOR_KODU1 AS customerRep,VADE_GUNU as dueDate,
(ISNULL(CM_BORCT,0) - ISNULL(CM_ALACT,0)) AS balance,
(select NET_VADE_GECMIS_BAKIYE from  dbo.SR_FN_GetCariVadeGecmisBakiyeler(GETDATE()) vg  WHERE vg.CARI_KOD=CS.CARI_KOD) AS overBalance
FROM TBLCASABIT CS WHERE M_KOD LIKE '120%'`;

module.exports = { accountListSql };
