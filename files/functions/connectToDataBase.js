const connectToDataBase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database`)
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`)
    return
  }
}
module.exports = connectToDataBase
