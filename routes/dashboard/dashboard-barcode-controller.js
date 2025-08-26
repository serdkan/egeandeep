const ArgoxPrinter = require('../printer/ArgoxPrinter');

async function dashboardBarcodeController() {
  console.log('=== ARGOX YAZICI TEST ===\n');

  // Mevcut yazıcıları listele
  console.log('1. Yazıcılar listeleniyor...');
  const printers = ArgoxPrinter.getAvailablePrinters();
  console.log('Bulunan yazıcılar:', printers);
  console.log('');

  // Yazıcı oluştur
  const printer = new ArgoxPrinter('Argox OS-214 plus series PPLA');

  // Bağlantı testi
  console.log('2. Bağlantı test ediliyor...');
  const testResult = await printer.testConnection();
  console.log('Test sonucu:', testResult);

  // Temizlik
  printer.cleanup();
}

// Örnek kullanım

module.exports = dashboardBarcodeController;
