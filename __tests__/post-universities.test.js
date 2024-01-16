async function api() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Additional headers if needed
    },
    // Add the request body if required
    // body: JSON.stringify({ key: 'value' })
  }

  const response = await fetch(
    'http://localhost:3000/universities',
    requestOptions,
  )
  return await response.status
}
test('Is it working', async () => {
  expect(await api()).toBe(200)
})
