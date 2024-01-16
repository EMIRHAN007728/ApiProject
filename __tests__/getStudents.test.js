const getStudents = require('../files/functions/getStudents')

test('Is it working', async () => {
  expect((await getStudents()).length).toBeGreaterThan(0)
})
