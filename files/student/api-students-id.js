const apistudentsid = async (req, res, studentdb, universitydb, ObjectId) => {
  try {
    const studentId = req.params.id

    // Fetch the student data including the universityId
    const student = await studentdb.findOne({ _id: new ObjectId(studentId) })

    if (!student) {
      return res
        .status(404)
        .json({ error: 'Not Found', details: 'Student not found' })
    }

    // Fetch the associated university data using the universityId
    const university = await universitydb.findOne({
      _id: new ObjectId(student.universityId),
    })

    // Merge the student and university data
    const responseData = {
      _id: student._id,
      name: student.name,
      toplamPuan: student.toplamPuan,
      universityId: student.universityId,
      universityName: university ? university.Name : null, // Include the university name if found
    }

    res.status(200)
    return res.json(responseData)
  } catch (err) {
    console.error(`Error fetching student: ${err}`)
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = apistudentsid
