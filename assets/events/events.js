//Label Filter Open Event
function labelFilOpen() {
  document.getElementById('label-fil').style.display = 'block';
}
//Label Filter Close Event
function labelFilClose() {
  document.getElementById('label-fil').style.display = 'none';
}
//Author Filter Open Event
function authorOpen() {
  document.getElementById('author').style.display = 'block';
}
//Author Filter Close Event
function authorClose() {
  document.getElementById('author').style.display = 'none';
}
//Search Open Event
function searchOpen() {
  document.getElementById('search').style.display = 'block';
}
//Search Colse Event
function searchClose() {
  document.getElementById('search').style.display = 'none';
}
window.onclick = function (event) {
  const labelFilter = document.getElementById('label-fil');
  const author = document.getElementById('author');
  const search = document.getElementById('search');
  switch (event.target) {
    case labelFilter:
      labelFilter.style.display = 'none';
      break;
    case author:
      author.style.display = 'none';
      break;
    case search:
      search.style.display = 'none';
      break;
    default:
      break;
  }
};
