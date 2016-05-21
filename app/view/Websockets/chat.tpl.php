<h1>Chat client</h1>
<p>Chat client with possibility to also run towards echo- or broadcast-server.</p>
<p>
    Use server ws://localhost:8012, ws://nodejs1.student.bth.se:8012 or ws://nodejs2.student.bth.se:8012.
</p>
<p>
    <label>Connect:</label><br>
    <input id='url' value='ws://localhost:8012'/>
    <button id='chat-connect'>Connect</button>
    <button id='chat-close'>Close connection</button>
</p>
<p>
    <label>User:</label><br>
    <input id='user' value='bob'/>
</p>
<p>
    <label>Send message:</label><br>
    <input id='message' value=''/>
    <button id='chat-send'>Send message</button>
</p>
<p id='status' class='disconnected'>status: <span id='constatus'></span></p>
<div class="console">
    <div class="container">
        <label>Log: </label><br>
        <div id="output"></div>
    </div>
    <div class="container">
        <label>Users: </label><br>
        <div id="users"></div>
    </div>
</div>
