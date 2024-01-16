async function getUniversity() {
  const response = await fetch(
    'http://universities.hipolabs.com/search?country=turkey',
  )
  const universityData = await response.json()

  const universities = universityData.map((university) => ({
    Name: university.name,
  }))
  return universities
}

module.exports = getUniversity
