const idSpan = document.getElementById('idSpan');
const connectButton = document.getElementById('connectButton');
const connectInput = document.getElementById('connectInput');
const sendButton = document.getElementById('sendButton');
const sendInput = document.getElementById('sendInput');

let conn = null;
let peer = new Peer();

peer.on('open', (id) => {
    idSpan.innerText = id;
});

peer.on('connection', (c) => {
    conn = c;
    conn.on('open', function() {
        conn.on('data', function(data) {
          console.log('Received', data);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    connectButton.addEventListener('click', connectToSession);
    sendButton.addEventListener('click', sendMessage);

    function connectToSession() {
        conn = peer.connect(connectInput.value);
        conn.on('open', function() {
            conn.on('data', function(data) {
              console.log('Received', data);
            });
        });
    }

    function sendMessage() {
        if(conn) {
            conn.send(sendInput.value)
        }
    }

});

function setupConnection(c) {

}