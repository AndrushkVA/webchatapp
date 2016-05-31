var isConnected = 0;

var Application = {
    mainUrl : 'http://localhost:8080/chat',
    msgList:[],
    token : 'TN11EN'
};

var url = Application.mainUrl + '?token=' + Application.token;

function Connect() {
    if(isConnected){
        return;
    }

    function whileConnected() {
        isConnected = setTimeout(function () {
            ajax('GET', url, null, function(responseText){                    
                document.getElementById('online/ofline').innerHTML = 'FPMI Chat<img src="http://seo.af/wp-content/uploads/pep-vn/5eca4ece/krug-css-circle-7f.png" width="22px" heigth="22px" /><button class = "btn-re-fresh"></button>';
                if(JSON.stringify(Application.msgList) != JSON.stringify(JSON.parse(responseText).messages)){
                    var response = JSON.parse(responseText);

                    Application.msgList = response.messages;
                    Application.token = response.token;
                    //document.getElementById('chat').innerHTML = '';
                    renderLocalFilesWithoutName(Application.msgList);
                }
                whileConnected();
            });
        }, seconds(1));
    }

    whileConnected();
}

function seconds(value) {
    return Math.round(value * 1000);
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function run(){
	var appContainer = document.getElementsByClassName('todos')[0];
    appContainer.addEventListener('click', delegateEvent);
    document.getElementById('nameUser').innerHTML = getCookie("username");
    //onNameEditButtonFirst();
    Connect();
    document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight - document.getElementById('chat').clientHeight;
}

function delegateEvent(evtObj) {
    /*if (evtObj.type == 'click' && evtObj.target.id == 'reName') {
        isConnected = 0;
        onNameEditButton(evtObj);
        if(isConnected == 0)
            Connect();
    }*/
    if ((evtObj.type == 'click') && evtObj.target.classList.contains('flat_button')) {
        isConnected = 0;
        onInputButton(evtObj);
        if(isConnected == 0)
            Connect();
        document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight - document.getElementById('chat').clientHeight;
    }
    if (evtObj.type == 'click' && evtObj.target.id.substring(0, 6) == 'btn-re') {
        isConnected = 0;
        onEditMessage(evtObj.target.id.substring(6), evtObj);
        if(isConnected == 0)
            Connect();
    }
    if (evtObj.type == 'click' && evtObj.target.id.substring(0, 7) == 'btn-del') {
        isConnected = 0;
        onDeleteMessage(evtObj.target.id.substring(7), evtObj);
        if(isConnected == 0)
            Connect();
    }
    if (evtObj.type == 'click' && evtObj.target.classList.contains('btn-re-fresh')) {
        loadTasks(function(){
            renderLocalFilesWithoutName(Application.msgList);
        });
    }
}

function loadTasks(done) {
    ajax('GET', url, null, function(responseText){
        var response = JSON.parse(responseText);

        Application.msgList = response.messages;
        Application.token = response.token;
        done();
    });
}

function renderLocalFiles(list) {
    document.getElementById('nameUser').innerHTML = list[list.length - 1].author;
    for (var i = 0; i < list.length; i++) {
        renderMsg(list[i]);
    }
}

function renderLocalFilesWithoutName(list) {
    document.getElementById('chat').innerHTML = '';
    for (var i = 0; i < list.length; i++) {
        renderMsg(list[i]);
    }
}

function renderMsg(element) {
    if(element.author == document.getElementById('nameUser').innerHTML){
        if(element.deleted) {
            var divItem = msgDeleted(element);
        } else {
            var divItem = myMsgNotDeleted(element);
        }
    } else{
        if(element.deleted) {
            var divItem = msgDeleted(element);
        } else {
            var divItem = msgNotDeleted(element);
        }
    }
    document.getElementById('chat').appendChild(divItem);
}

function myMsgNotDeleted(element){
    var msgId = element.id;
    var b = document.createElement('b');

    if (element.edited) {
        var ed = document.createElement('ed');
        ed.classList.add('edit');
        ed.innerHTML = "*edited* ";
        b.appendChild(ed);

    }
    b.appendChild(document.createTextNode(element.author + ": "));

    var divItem = document.createElement('div');
    divItem.classList.add('myMessage');
    divItem.id = 'd' + msgId;

    var buttonRe = document.createElement('button');
    buttonRe.classList.add('todo-button-re');
    buttonRe.classList.add('todo-button-re-msg');
    buttonRe.id = 'btn-re' + msgId;

    var buttonDel = document.createElement('button');
    buttonDel.classList.add('todo-button-del');
    buttonDel.classList.add('todo-button-del-msg');
    buttonDel.id = 'btn-del' + msgId;

    var textItem = document.createElement('div');
    textItem.classList.add('text');

    var p = document.createElement('p');
    p.id = msgId;
    var aside = document.createElement('aside');
    aside.appendChild(buttonRe);
    aside.appendChild(buttonDel);
    textItem.appendChild(b);
    p.appendChild(document.createTextNode(element.text))

    textItem.appendChild(p)
    divItem.appendChild(aside)
    divItem.appendChild(textItem);

    return divItem;
}

function msgDeleted(element){
    var msgId = element.ide;
    var b = document.createElement('b');

    var de = document.createElement('de');
    de.classList.add('delete');
    de.innerHTML = "*deleted*";      
    b.appendChild(document.createTextNode(element.author + ": "));
    var divItem = document.createElement('div');
    divItem.classList.add('myMessage');
    divItem.id = 'd' + msgId;

    var textItem = document.createElement('div');
    textItem.classList.add('text');

    var p = document.createElement('p');
    p.id = msgId;
    p.appendChild(de);
    textItem.appendChild(b);
    textItem.appendChild(p);
    divItem.appendChild(textItem);

    return divItem;
}

function msgNotDeleted(element){
    var msgId = element.id;
    var b = document.createElement('b');

    if (element.edited) {
        var ed = document.createElement('ed');
        ed.classList.add('edit');
        ed.innerHTML = "*edited* ";
        b.appendChild(ed);

    }
    b.appendChild(document.createTextNode(element.author + ": "));

    var divItem = document.createElement('div');
    divItem.classList.add('myMessage');
    divItem.id = 'd' + msgId;

    var textItem = document.createElement('div');
    textItem.classList.add('text');

    var p = document.createElement('p');
    p.id = msgId;
    
    textItem.appendChild(b);
    p.appendChild(document.createTextNode(element.text))

    textItem.appendChild(p)
    //divItem.appendChild(aside)
    divItem.appendChild(textItem);

    return divItem;
}

function onNameEditButton() {
    var check = confirm('Do you really want to edit your name?');
    if (check) {
        var newName = prompt("Enter your name", document.getElementById("nameUser").innerHTML);
        document.getElementById('nameUser').innerHTML = newName;
    }
    document.getElementById('chat').innerHTML = '';
    renderLocalFilesWithoutName(Application.msgList);
}

function onNameEditButtonFirst() {
    var newName = prompt("Enter your name", "Incognita");
    document.getElementById('nameUser').innerHTML = newName;
    document.getElementById('chat').innerHTML = '';
    renderLocalFilesWithoutName(Application.msgList);
}

function onInputButton() {

    var text = document.getElementById('todoText').value;
    var author = document.getElementById('nameUser').innerHTML;
    var id = uniqueId();

    if (text.length > 0) {
        var message = msgLocalToPost(text, author, id);
        var json_message = JSON.stringify(message);
        ajax('POST', url, json_message, function(){
            loadTasks(function(){
                document.getElementById('chat').innerHTML = '';
                renderLocalFilesWithoutName(Application.msgList);
            });
        });
    } else {
        alert("You can't send nothing!");
    }
    document.getElementById('todoText').value = '';
}

function onEditMessage(messageID) {

    var check = confirm('Do you really want to edit this message?');
    if (check) {
        var newMsg = prompt("Enter new message", document.getElementById(messageID).innerText);
        var json_message = JSON.stringify(msgLocalToEdited(newMsg, messageID));
        ajax('PUT', url, json_message, function(){
            document.getElementById('chat').innerHTML = '';
            loadTasks(function(){
                renderLocalFilesWithoutName(Application.msgList);
            });
        });
    }
}

function onDeleteMessage(messageID) {
    var check = confirm("You really want to delete this message?");
    if (check) {
        var json_message = JSON.stringify(msgLocalToDelete(messageID));
        ajax('DELETE', url, json_message, function(){
            document.getElementById('chat').innerHTML = '';
            loadTasks(function(){
                renderLocalFilesWithoutName(Application.msgList);
            });
        });
    }
}

function msgLocal(text, auth, ID, edited, deleted) {
    return {
        text: text,
        author: auth,
        id: ID,
        timestamp: new Date().getTime(),
        edited: !!edited,
        deleted: !!deleted
    }
}

function msgLocalToPost(text, auth, ID) {
    return {
        text: text,
        author: auth,
        id: ID,
        timestamp: new Date().getTime(),
    }
}

function msgLocalToEdited(text, ID) {
    return {
        text: text,
        id: ID
    }
}

function msgLocalToDelete(ID) {
    return {
        id: ID
    }
}

function uniqueId() {
    var date = Date.now();
    var random = Math.random() * Math.random();
    return Math.floor(date * random).toString();
}

function defaultErrorHandler(message) {
    //alert("Нет подключения к серверу!");
    isConnected = 1;
    document.getElementById('online/ofline').innerHTML = 'FPMI Chat<img src="http://www.redcube.ru/files/sources/2.8f7614ebb399a685bca5b7e7e98e3bab.png" width="22px" heigth="22px" /><button class = "btn-re-fresh"></button>';
    //console.error(message);
    //output(message);
}

function isError(text) {
    if(text == "")
        return false;
    
    try {
        var obj = JSON.parse(text);
    } catch(ex) {
        return true;
    }

    return !!obj.error;
}

function ajax(method, url, data, continueWith, continueWithError) {
    var xhr = new XMLHttpRequest();

    continueWithError = continueWithError || defaultErrorHandler;
    xhr.open(method || 'GET', url, true);

    xhr.onload = function () {
        if (xhr.readyState !== 4)
            return;

        if(xhr.status != 200) {
            continueWithError('Error on the server side, response ' + xhr.status);
            return;
        }

        if(isError(xhr.responseText)) {
            continueWithError('Error on the server side, response ' + xhr.responseText);
            return;
        }

        continueWith(xhr.responseText);
    };    

    xhr.ontimeout = function () {
        ontinueWithError('Server timed out !');
    };

    xhr.onerror = function (e) {
        var errMsg = 'Server connection error !\n'+
        '\n' +
        'Check if \n'+
        '- server is active\n'+
        '- server sends header "Access-Control-Allow-Origin:*"\n'+
        '- server sends header "Access-Control-Allow-Methods: PUT, DELETE, POST, GET, OPTIONS"\n';
        //alert("Нет подключения к серверу!");
        continueWithError(errMsg);
    };

    xhr.send(data);
}

/*function loadMsgs() {
    if (typeof(Storage) == "undefined") {
        alert("cant access localStorage");
        return;
    }
    var item = localStorage.getItem("MessageList");
    return item && JSON.parse(item);
}*/

/*function saveMsgs(listSave) {
    if (typeof(Storage) == "undefined") {
        alert("cant access localStorage");
        return;
    }
    localStorage.setItem("MessageList", JSON.stringify(listSave));

    //saveMsgs(msgList);
    //document.getElementById('chat').innerHTML = '';
    //renderLocalFiles(msgList);
}*/

/*function updateCounter(){
    var items = document.getElementsByClassName('chat')[0];
    var counter = document.getElementsByClassName('counter-holder')[0];

    counter.innerText = chat.children.length.toString();
}*/