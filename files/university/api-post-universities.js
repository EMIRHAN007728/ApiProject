const getUniversity = require('../functions/getUniversity')

const postuniversity = async (req, res, universitydb) => {
  try {
    await universitydb.deleteMany({})

    await universitydb.insertMany(await getUniversity())

    return res.status(200).json({ message: 'Data inserted successfully' })
  } catch (err) {
    console.error(`Error fetching students: ${err}`)
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = postuniversity
