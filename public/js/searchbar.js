//const { search } = require("../../routers/searchbar");

function sendData(e) {
    const searchRes = document.getElementById('search-results');
    //fetch is an api to get http requests, a lot of browsers support it
    let match = e.value.match(/\s*/);
    let match2= e.value.match(/^[a-zA-Z]*/);
    if( match[0] === e.value) {
        searchRes.innerHTML = '';
        return;
    }
    if(match2[0]===e.value) 
        
    
    fetch('search', {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: e.value}) //holds the vlaue of the input
    }).then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(res=> res.json()).then(data => {
        let payload= data.payload;
        searchRes.innerHTML='';
        if(payload.length< 1) {
            searchRes.innerHTML = '<p>Sorry, nothing was found.</p>';
            return;
        }
        payload.forEach((item, index)=> {
            if( index>0) {
                searchRes.innerHTML += '<hr>';
                searchRes.innerHTML += `<p>${item.name}</p>`
            }
        });
        return;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
