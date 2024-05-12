// script.js
const dataForm = document.getElementById( 'dataForm' )
dataForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    var formData = new FormData( event.target );
    fetch( 'http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // body: '{\n  "user_input": "happy"\n}',
        body: JSON.stringify( {
            'user_input': Object.fromEntries( formData ).user_input
        } )
    } ).then( response => response.text() )
        .then( data => {
            data = JSON.parse( data ).message
            document.getElementById( 'response' ).innerHTML = `<h1>${data}</h1>`;
        } )
        .catch( error => {
            console.error( 'Error:', error );
        } );
} );
