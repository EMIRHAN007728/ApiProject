const getuniversity = async (req, res, universitydb) => {
  try {
    const university = await universitydb.find({}).toArray()

    return res.status(200).json(university)
  } catch (err) {
    console.error(`Error fetching students: ${err}`)
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = getuniversity
