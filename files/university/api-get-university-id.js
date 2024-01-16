const getuniversitiesid = async (req, res, studentdb) => {
  try {
    const universityId = req.params.id

    // Assuming there's a field 'universityId' in the students collection
    const students = await studentdb
      .find({ universityId: new ObjectId(universityId) })
      .toArray()

    if (students.length === 0) {
      return res
        .status(404)
        .json({
          error: 'Not Found',
          details: 'No students found for the given university ID',
        })
    }

    res.status(200)
    return res.json(students)
  } catch (err) {
    console.error(`Error fetching students for the university: ${err}`)
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = getuniversitiesid
