const yerleştirme = require('./functions/yerleştirme')
const examstarter = require('./functions/exam')
const getArticles = require('./functions/getArticles')

const exam = async (req, res, articledb, studentdb, universitydb) => {
  try {
    const articlesData = await getArticles()
    await articledb.deleteMany({})
    await articledb.insertMany(articlesData)
    await examstarter(studentdb, articledb).then(
      yerleştirme(studentdb, universitydb),
    )

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(`Error starting exam: ${err}`)
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message })
  }
}

module.exports = exam
