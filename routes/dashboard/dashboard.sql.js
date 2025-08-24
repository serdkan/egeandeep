const dailyOrderReport = `SELECT 
SIPARISTIPI AS orderType,
SUM(MIKTAR) AS quantity,
SUM(M2) AS m2,
SUM(TUTAR) AS amount
FROM SR_SIPARISRAPOR_TARIH
WHERE @startDate<=TARIH AND @endDate>=TARIH
GROUP BY SIPARISTIPI
`;

module.exports = { dailyOrderReport };
