const ortakHarfSayisiBul = require('./ortakHarfSayisiBul')

async function exam(studentCollection, articleCollection) {
  try {
    const ogrenciler = await studentCollection.find({}).toArray()
    const makaleler = await articleCollection.find({}).toArray()

    const puanlar = []

    for (let i = 0; i < ogrenciler.length; i++) {
      const ogrenci = ogrenciler[i]
      const ogrenciAdi = ogrenci.name

      let toplamPuan = 0

      for (let j = 0; j < makaleler.length; j++) {
        const makaleAdi = makaleler[j].Name

        const ortakHarfSayisi = ortakHarfSayisiBul(ogrenciAdi, makaleAdi)

        toplamPuan += ortakHarfSayisi
      }

      puanlar.push({
        ogrenciId: ogrenci._id, // Öğrenci ID'si
        toplamPuan: toplamPuan,
      })

      // Öğrencinin puanını MongoDB'de güncelle
      await studentCollection.updateOne(
        { _id: ogrenci._id },
        { $set: { toplamPuan: toplamPuan } },
      )
    }
  } catch (err) {
    console.error(`Sınav başlatılırken hata oluştu: ${err}`)
    throw new Error(`iç Sunucu Hatası:${err}`)
  }
}
module.exports = exam
