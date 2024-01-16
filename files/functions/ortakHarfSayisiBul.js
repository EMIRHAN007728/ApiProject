function ortakHarfSayisiBul(kelime1, kelime2) {
  kelime1 = kelime1.toLowerCase()
  kelime2 = kelime2.toLowerCase()

  let ortakHarfSayisi = 0
  let kullanilanHarfler = new Set()

  for (let i = 0; i < kelime1.length; i++) {
    for (let j = 0; j < kelime2.length; j++) {
      if (kelime1[i] === kelime2[j] && !kullanilanHarfler.has(kelime1[i])) {
        ortakHarfSayisi++
        kullanilanHarfler.add(kelime1[i])
        break
      }
    }
  }

  kullanilanHarfler.clear()

  return ortakHarfSayisi
}

module.exports = ortakHarfSayisiBul
