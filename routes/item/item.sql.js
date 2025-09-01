const getItemListSql = `SELECT  ROW_NUMBER() OVER (ORDER BY STOK_KODU) AS id,STOK_KODU AS itemCode,dbo.TRK(STOK_ADI) AS itemName,OLCU_BR1 AS unitName,SATIS_FIAT1 as price1 FROM TBLSTSABIT WHERE GRUP_KODU=@group`;

module.exports = { getItemListSql };
