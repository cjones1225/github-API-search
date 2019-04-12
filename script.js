'use strict';
//debugger;
const key = "db10d358add2f453a99dbc430c5c61a4cb74c0f4";

const searchURL = `https://api.github.com`

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {

    $('#results-list').empty();

    console.log(responseJson);
    var i;
    for (i=0; i < responseJson.length; i++){

        $('#results-list').append(
          `<li><h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3>
          </li>`
        )};
  
        $('#results').removeClass('hidden');
    
}

function getUser(query) {

    const url = `${searchURL}/users/${query}/repos`;

    console.log(url);

    const options = {
        headers: new Headers ({
            Authorization: `token ${key}`
        })
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        $('#js-error-message').text('');
        getUser(searchTerm);
    });
}

$(watchForm);