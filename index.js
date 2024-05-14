// const dataForm = document.getElementById( 'dataForm' )
// dataForm.addEventListener( 'submit', function ( event ) {
//     event.preventDefault();
//     var formData = new FormData( event.target );
//     fetch( 'http://127.0.0.1:8000/', {
//         method: 'POST',
//         headers: {
//             'accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         // body: '{\n  "user_input": "happy"\n}',
//         body: JSON.stringify( {
//             'user_input': Object.fromEntries( formData ).user_input
//         } )
//     } ).then( response => response.text() )
//         .then( data => {
//             data = JSON.parse( data ).message
//             document.getElementById( 'response' ).innerHTML = `<h1>${data}</h1>`;
//         } )
//         .catch( error => {
//             console.error( 'Error:', error );
//         } );
// } );
document.addEventListener( "DOMContentLoaded", () => {
    const inputField = document.getElementById( "input" );
    inputField.addEventListener( "keydown", ( e ) => {
        if ( e.code === "Enter" ) {
            let input = inputField.value;
            inputField.value = "";
            output( input );
        }
    } );
} );

async function output( input ) {
    console.log( input )
    const response = await fetch( 'http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // body: '{\n  "user_input": "happy"\n}',
        body: JSON.stringify( {
            'user_input': input
        } )
    } )
    const product = await response.json()
    addChat( input, product.message );
}

function compare( promptsArray, repliesArray, string ) {
    let reply;
    let replyFound = false;
    for ( let x = 0; x < promptsArray.length; x++ ) {
        for ( let y = 0; y < promptsArray[ x ].length; y++ ) {
            if ( promptsArray[ x ][ y ] === string ) {
                let replies = repliesArray[ x ];
                reply = replies[ Math.floor( Math.random() * replies.length ) ];
                replyFound = true;
                // Stop inner loop when input value matches prompts
                break;
            }
        }
        if ( replyFound ) {
            // Stop outer loop when reply is found instead of interating through the entire array
            break;
        }
    }
    return reply;
}

function addChat( input, product ) {
    const messagesContainer = document.getElementById( "messages" );

    let userDiv = document.createElement( "div" );
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild( userDiv );

    let botDiv = document.createElement( "div" );
    let botImg = document.createElement( "img" );
    let botText = document.createElement( "span" );
    botDiv.id = "bot";
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild( botText );
    botDiv.appendChild( botImg );
    messagesContainer.appendChild( botDiv );
    // Keep messages at most recent
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout( () => {
        botText.innerText = `${product}`;
        textToSpeech( product )
    }, 2000
    )

}