const deletestudents = async (req, res, studentdb) => {
  try {
    await studentdb.deleteMany({})

    return res.status(200).json({ message: 'Data Deleted Succesfully' })
  } catch (err) {
    console.error(`Error fetching students: ${err}`)
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = deletestudents
