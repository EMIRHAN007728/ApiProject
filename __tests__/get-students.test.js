async function apitest() {
  const response = await fetch('http://localhost:3000/students')
  const result = await response.json()
  console.log(JSON.stringify(result))
  return result
}

test('Is it working', async () => {
  expect((await apitest()).length).toBeGreaterThan(0)
})
