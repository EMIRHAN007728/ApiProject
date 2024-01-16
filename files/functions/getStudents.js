async function getStudents() {
  const response = await fetch('https://randomuser.me/api/?results=1000')
  const studentsData = await response.json()

  const students = studentsData.results.map((student) => {
    const { first, last } = student.name
    return { name: `${first} ${last}` }
  })

  return students
}

module.exports = getStudents
