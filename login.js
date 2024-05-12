document.getElementById( 'login-form' ).addEventListener( 'submit', function ( event ) {
    event.preventDefault();

    var username = document.getElementById( 'username' ).value;
    var password = document.getElementById( 'password' ).value;

    // Simulating backend validation and authentication
    authenticateUser( username, password );
} );

function authenticateUser( username, password ) {
    // Simulating backend authentication
    if ( username === 'admin' && password === 'password' ) {
        // Redirect to dashboard or do any further action
        window.location.href = "http://127.0.0.1:5500/index.html"
    } else {
        document.getElementById( 'error-message' ).textContent = 'Invalid username or password';
    }
}