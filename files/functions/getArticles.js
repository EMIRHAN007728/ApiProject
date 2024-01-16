async function getArticles() {
  const date = new Date()
  const today = `${String(date.getFullYear())}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate() - 1 /**Bu Sadece Kod Çalışsın Diye Yoksa bu -1i silip güncel bir şekilde sonuç alabilirsiniz */).padStart(2, '0')}`

  const response = await fetch(
    `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access/${today}`,
  )
  const articleData = await response.json()
  const articles = articleData.items[0].articles.map((articles) => ({
    Name: articles.article,
  }))
  return articles
}

module.exports = getArticles
