const getArticles = require('../files/functions/getArticles')

test('Is it working', async () => {
  expect((await getArticles()).length).toBeGreaterThan(0)
})
