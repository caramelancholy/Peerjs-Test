document.addEventListener('DOMContentLoaded', () => {
    const idSpan = document.getElementById('idSpan');
    const connectButton = document.getElementById('connectButton');
    const connectInput = document.getElementById('connectInput');
    const sendButton = document.getElementById('sendButton');
    const sendInput = document.getElementById('sendInput');
    const messages = document.getElementById('messages');
    
    let conn = null;
    let peer = new Peer();
    
    peer.on('open', (id) => {
        idSpan.innerText = id;
    });
    
    peer.on('connection', (c) => {
        setupConnection(c);
    });

    peer.on('disconnected', () => {
        sendButton.disabled = true;
        sendInput.disabled = true;
        log("[sys]: Disconnected from peer");
    })

    connectButton.addEventListener('click', connectToSession);
    sendButton.addEventListener('click', sendMessage);

    function connectToSession() {
        if(peer.id) {
            setupConnection(peer.connect(connectInput.value));
        }
    }

    function log(s) {
        element = document.createElement('span');
        element.innerText = s + '\n';
        messages.appendChild(element);
    }

    function sendMessage() {
        if(conn.open) {
            msg = sendInput.value;
            conn.send(msg);
            log(`[You]: ${msg}`);

        }
    }

    function setupConnection(c) {
        conn = c;
        conn.on('open', function() {
            sendButton.disabled = false;
            sendInput.disabled = false;
            log(`[sys] Connected to peer with ID: ${conn.peer}`);
            conn.on('data', function(data) {
                log(`[Peer]: ${data}`);
            });
        });
    }

});

