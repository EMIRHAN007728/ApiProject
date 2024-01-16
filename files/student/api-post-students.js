const getStudents = require('../functions/getStudents')

const poststudents = async (req, res, studentdb) => {
  try {
    // Delete existing data
    await studentdb.deleteMany({})

    // Insert new data
    const studentsData = await getStudents()
    await studentdb.insertMany(studentsData)

    // Send a JSON response
    return res.status(200).json({ message: 'Data inserted successfully' })
  } catch (err) {
    console.error(`Error posting students: ${err}`)
    // Send a JSON error response
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = poststudents
