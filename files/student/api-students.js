const apistudents = async (req, res, studentdb, universitydb, ObjectId) => {
  try {
    // Fetch all students
    const students = await studentdb.find({}).toArray()

    // Create an array of promises to fetch university data for each student concurrently
    const universityPromises = students.map(async (student) => {
      if (student.universityId) {
        // Fetch the associated university data using the universityId
        const university = await universitydb.findOne({
          _id: new ObjectId(student.universityId),
        })
        return university ? university.Name : null
      }
      return null
    })

    // Wait for all promises to resolve
    const universityNames = await Promise.all(universityPromises)

    // Create a modified response with university information
    const studentsWithUniversity = students.map((student, index) => {
      const modifiedStudent = {
        _id: student._id,
        name: student.name,
      }

      // Add toplamPuan if it exists
      if (student.toplamPuan) {
        modifiedStudent.toplamPuan = student.toplamPuan
      }

      // Add universityId if it exists
      if (student.universityId) {
        modifiedStudent.universityId = student.universityId
      }

      // Add universityName if it exists
      if (universityNames[index] !== null) {
        modifiedStudent.universityName = universityNames[index]
      }

      return modifiedStudent
    })

    // Send the modified response data
    res.status(200).json(studentsWithUniversity)
  } catch (err) {
    console.error(`Error fetching students: ${err}`)
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = apistudents
