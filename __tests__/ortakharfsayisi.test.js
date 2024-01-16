const ortakHarfSayisiBul = require('../files/functions/ortakHarfSayisiBul')

test('Is it working', async () => {
  expect(await ortakHarfSayisiBul('anne', 'baba')).toBe(1)
})
