async function pageNotFound(req, res) {
  return res.render('page-not-found.ejs', {
    title: 'sayfa bulunamadı',
    layout: false,
  });
}
module.exports = pageNotFound;
