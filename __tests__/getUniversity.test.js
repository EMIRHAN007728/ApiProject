const getUniversity = require('../files/functions/getUniversity')

test('Is it working', async () => {
  expect((await getUniversity()).length).toBeGreaterThan(0)
})
