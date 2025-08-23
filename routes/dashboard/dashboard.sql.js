const dailyOrderReport = `SELECT 
SIPARISTIPI AS orderType,
SUM(MIKTAR) AS quantity,
SUM(M2) AS m2,
SUM(TUTAR) AS amount,
FORMAT(TARIH, 'yyyy-MM-dd') AS date
FROM SR_SIPARISRAPOR_GUNLUK
WHERE TARIH=@Date
GROUP BY SIPARISTIPI,TARIH
`;

module.exports = { dailyOrderReport };
