// printer/ArgoxPrinter.js - Yazıcı sınıfı dosyası
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

class ArgoxPrinter {
  constructor(printerName = 'Argox OS-214 plus series PPLA') {
    this.printerName = printerName;
    this.tempDir = path.join(__dirname, '..', 'temp');

    // Temp klasörü oluştur
    this.createTempDir();
  }

  // Temp klasör oluştur
  createTempDir() {
    try {
      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir, { recursive: true });
        console.log(`📁 Temp klasörü oluşturuldu: ${this.tempDir}`);
      }
    } catch (error) {
      console.error('Temp klasör oluşturma hatası:', error.message);
    }
  }

  // Mevcut yazıcıları listele

  static getAvailablePrinters() {
    try {
      console.log('🔍 Mevcut yazıcılar aranıyor...');

      if (process.platform === 'win32') {
        // PowerShell komutu
        const result = execSync(
          'powershell -Command "Get-Printer | Select-Object -ExpandProperty Name"',
          { encoding: 'utf8', timeout: 5000 },
        );

        const printers = result
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line)
          .filter(
            (line) => !line.includes('Microsoft') && !line.includes('OneNote'),
          );

        return {
          success: true,
          printers,
          count: printers.length,
        };
      }
    } catch (error) {
      console.error('❌ Yazıcı listesi alınamadı:', error.message);
      return {
        success: false,
        error: error.message,
        printers: [],
        count: 0,
      };
    }
  }

  // Yazıcı var mı kontrol et
  checkPrinterExists() {
    const result = ArgoxPrinter.getAvailablePrinters();

    if (!result.success) {
      return { exists: false, error: result.error };
    }

    const exists = result.printers.some(
      (printer) =>
        printer.toLowerCase().includes('argox') ||
        printer.toLowerCase().includes('os-214'),
    );

    return {
      exists,
      availablePrinters: result.printers,
      suggestedPrinter: result.printers.find(
        (p) =>
          p.toLowerCase().includes('argox') ||
          p.toLowerCase().includes('os-214'),
      ),
    };
  }

  // Test yazdırma
  async testConnection() {
    try {
      console.log('🔧 Yazıcı bağlantısı test ediliyor...');

      const printerCheck = this.checkPrinterExists();

      if (!printerCheck.exists) {
        return {
          success: false,
          message: 'Argox yazıcı bulunamadı',
          availablePrinters: printerCheck.availablePrinters,
        };
      }
      // Basit test PPLA komutu
      const ppla = `nop_front
n
KI70
V0
xAG*
qB
nop_middle
L
H13
D11
141100001700035ADANIR KAPAK
141100001400020K340438
131100001150020OZGUR AKGUNES IC TASARI
141100000900020BEYAZ
44110000030026096
441100000700260 x 2
1411000000501552550
141100000050190 x 2
141100000650020TEK RENK
111100000470020 
111100000470100 
121100000350020 
141100000100020 
1E00020013501002536015
>01
151100001550215 
151100001550228 
^01
Q0001
E
`;

      await this.sendToPrinter(ppla);

      return {
        success: true,
        message: 'Test yazdırma başarılı',
        printer: printerCheck.suggestedPrinter || this.printerName,
      };
    } catch (error) {
      console.error('❌ Test yazdırma hatası:', error.message);
      return {
        success: false,
        message: 'Test yazdırma başarısız',
        error: error.message,
      };
    }
  }

  // PPLA komutunu yazıcıya gönder
  async sendToPrinter(ppla) {
    const tempFile = path.join(this.tempDir, `label_${Date.now()}.prn`);

    try {
      // PPLA komutunu geçici dosyaya yaz
      fs.writeFileSync(tempFile, ppla, 'latin1');
      console.log(`📄 PPLA komutu dosyaya yazıldı: ${tempFile}`);

      if (process.platform === 'win32') {
        // Windows için RAW yazdırma
        const cmd = `copy /B "${tempFile}" "\\\\localhost\\Argox OS-214 plus series PPLA`;
        console.log(`💻 Windows komutu çalıştırılıyor: ${cmd}`);
        execSync(cmd, { stdio: 'pipe', timeout: 10000 });
      }

      console.log('✅ PPLA komutu yazıcıya gönderildi');
      return true;
    } catch (error) {
      console.error('❌ Yazıcıya gönderme hatası:', error.message);
      throw new Error(`Yazıcıya gönderme hatası: ${error.message}`);
    } finally {
      // Geçici dosyayı sil
    }
  }

  // Temizlik işlemi
  cleanup() {}
}

module.exports = ArgoxPrinter;
