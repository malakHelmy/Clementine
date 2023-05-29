let search = $("#livesearch");

function showResults(str){
  if(str.length === 0) {
    search.addClass("hide");
  }
  else {
    search.removeClass("hide");
  }
  $.ajax({
    url: "/search",
    contentType: 'application/json',
    method: 'POST',
    data: JSON.stringify({query: str}),
    success: function(result){
      search.html(result.response);
    }
  })
}


/*const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const searchRes = document.getElementById('searchRes');
*/




/*
function sendData(data) {
  $.ajax({
    type: 'POST',
    url: '/search',
    data: JSON.stringify({ payload: data }),
    contentType: 'application/json',
    success: function (data) {
      console.log(data); 
      displayResults(data.payload);
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    },
  });
}

function displayResults(results) {
  // Clear the search results
  searchRes.innerHTML = '';

  // Loop through the results and add them to the searchRes element
  for (let i = 0; i < results.length; i++) {
    const item = document.createElement('li');
    item.textContent = results[i].name;
    searchRes.appendChild(item);
  }
}



searchBtn.addEventListener('click', () => {
  let searchValue = searchBar.value.trim();
  if (searchValue !== '') {
    sendData(searchValue);
  }
});

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    let searchValue = searchBar.value.trim();
    if (searchValue !== '') {
      sendData(searchValue);
    }
  }
});

*/