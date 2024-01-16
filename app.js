const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()
const express = require('express')
const api = express()
const PORT = process.env.PORT
const URI = process.env.URI
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectToDataBase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database`)
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`)
    throw new Error(`Database Bağlanmakta Sorun Yaşıyor: ${err}`)
  }
}
//Öğrenci apisi için gerekli olan functionlar
const apistudents = require('./files/student/api-students')
const apistudentsid = require('./files/student/api-students-id')
const apipoststudents = require('./files/student/api-post-students')
const apideletestudents = require('./files/student/api-delete-students')
//üniversite apisi için gerekli olan functionlar
const apiuniversity = require('./files/university/api-get-universites')
const apipostuniversity = require('./files/university/api-post-universities')
const apideleteuniversity = require('./files/university/api-delete-university')
const apigetuniversityid = require('./files/university/api-get-university-id')
//Sınav functionu
const startexam = require('./files/start-exam')

const myDB = client.db('ödev')
const studentdb = myDB.collection('students')
const universitydb = myDB.collection('universities')
const articledb = myDB.collection('articles')

const main = async () => {
  try {
    await connectToDataBase()

    api.get(
      '/students',
      async (req, res) =>
        await apistudents(req, res, studentdb, universitydb, ObjectId),
    )

    api.get(
      '/students/:id',
      async (req, res) =>
        await apistudentsid(req, res, studentdb, universitydb, ObjectId),
    )

    api.post(
      '/students',
      async (req, res) => await apipoststudents(req, res, studentdb),
    )

    api.delete(
      '/students',
      async (req, res) => await apideletestudents(req, res, studentdb),
    )

    api.get(
      '/universities',
      async (req, res) => await apiuniversity(req, res, universitydb),
    )

    api.post(
      '/universities',
      async (req, res) => await apipostuniversity(req, res, universitydb),
    )

    api.delete(
      '/universities',
      async (req, res) => await apideleteuniversity(req, res, universitydb),
    )

    api.get(
      '/start-exam',
      async (req, res) =>
        await startexam(req, res, articledb, studentdb, universitydb),
    )

    api.get(
      '/universities/:id/students',
      async (req, res) => await apigetuniversityid(req, res, studentdb),
    )

    api.listen(PORT, () => {
      console.log(`Api listening at localhost:${PORT}`)
    })
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`)
  }
}

main()
