async function yerlestirme(studentCollection, universityCollection) {
  try {
    // Öğrencileri puanlarına göre sırala
    const siraliOgrenciler = await studentCollection
      .find({})
      .sort({ toplamPuan: -1, name: 1 })
      .toArray()

    // Üniversiteleri ve kontenjanları tanımla, alfabetik sıraya göre
    const universiteler = await universityCollection
      .find({})
      .sort({ name: 1 })
      .toArray()

    // Öğrencileri sıralı bir şekilde yerleştirmek için
    let placedStudents = 0

    for (let i = 0; i < universiteler.length; i++) {
      const kontenjan = 5 // Her üniversitenin 5 kontenjanı olsun
      const uniId = universiteler[i]._id
      const uniName = universiteler[i].Name

      // Top 5 students for this university
      const studentsForUniversity = siraliOgrenciler.slice(
        placedStudents,
        placedStudents + kontenjan,
      )

      for (const student of studentsForUniversity) {
        const ogrenciId = student._id

        // Kontenjan varsa öğrenciyi yerleştir
        await studentCollection.updateOne(
          { _id: ogrenciId },
          { $set: { universityId: uniId } },
          { $set: { university: uniName } },
        )

        placedStudents++
      }
    }

    console.log('Yerleştirme işlemi tamamlandı')
  } catch (err) {
    console.error(`Yerleştirme işlemi sırasında hata oluştu: ${err}`)
    throw new Error(`Öğrenci yerleştirme sırasında hata: ${err}`)
  }
}

module.exports = yerlestirme
