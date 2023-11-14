function labelFilOpen() {
    document.getElementById('label-fil').style.display = 'block';
  }
  
  function labelFilClose() {
    document.getElementById('label-fil').style.display = 'none';
  }
  function authorOpen() {
    document.getElementById('author').style.display = 'block';
  }
  
  function authorClose() {
    document.getElementById('author').style.display = 'none';
  }
  function searchOpen() {
    document.getElementById('search').style.display = 'block';
  }
  
  function searchClose() {
    document.getElementById('search').style.display = 'none';
  }
  // Close the popup if the user clicks outside of it
  window.onclick = function(event) {
    const labelFilter = document.getElementById('label-fil');
    // if (event.target === labelFilter) {
    //   labelFilter.style.display = 'none';
    // }
    const author = document.getElementById('author');
    // if (event.target === author) {
    //   author.style.display = 'none';
    // }
    const search = document.getElementById('search');
    // if (event.target === search) {
    //   author.style.display = 'none';
    // }
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
  