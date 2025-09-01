const getItemListSql = `SELECT  ROW_NUMBER() OVER (ORDER BY STOK_KODU) AS id,STOK_KODU AS itemCode,dbo.TRK(STOK_ADI) AS itemName,OLCU_BR1 AS unitName FROM TBLSTSABIT WHERE GRUP_KODU=@group`;

module.exports = { getItemListSql };
