<h1>Test HTML5 websockets</h1>
<p>Test the echo- and broadcast-server.</p>
<p>Connect towards ws://localhost:1337 or ws://dbwebb.se:1337. Set protocol to either "echo-protocol" or "broadcast-protocol". <strong>Connect</strong> to socket server. <stong>Send message</strong> to server. <strong>Close connection</strong> to server. (when changing sub-protocol do a page refresh ctrl-r to catch new value). </p>
<p>
    <label>Connect:</label><br>
    <input id='url' value='ws://localhost:1337'/>
    <select name="sub-protocol" id="sub-protocol">
        <option value="echo-protocol">echo-protocol</option>
        <option value="broadcast-protocol">broadcast-protocol</option>
    </select>
    <button id='connect'>Connect</button>
    <button id='close'>Close connection</button>
</p>
<p>
    <label>Send message:</label><br>
    <input id='message' value=''/>
    <button id='send'>Send message</button>
</p>
<p>
</p>
    <label>Log: </label><br>
<div id="output">

</div>
