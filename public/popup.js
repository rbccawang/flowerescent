var aubtn = document.getElementsByClassName('textToAud')
for(var i = 0; i < aubtn.length; i++)
aubtn[i].addEventListener('click', textToAudio)
var mes = document.getElementById('messagebtn')
document.getElementById("warning").style.display = "none";
mes.addEventListener('click', checkInput)
function checkInput(event){
    var text = document.getElementById('message').value
    var aut = document.getElementById('author').value
    if((aut.split(" ").join("").length == 0) || text.split(" ").join("").length == 0 ){
        console.log("none");
        document.getElementById("warning").style.display = "block";
    }
    else{
        console.log(document.getElementById("warning"));
        document.getElementById("warning").style.display = "none";
        insertMessage(aut,text);
    }
} 

function insertMessage(aut, tex){
    var newMessage = {
        text: tex,
        author: aut
     };
    console.log(aubtn.length)
    var mesHtml = Handlebars.templates.message(newMessage);
    document.getElementById("mes-container").insertAdjacentHTML('afterbegin', mesHtml);
    console.log(aubtn);
    aubtn[0].addEventListener('click', textToAudio);
    saveMessage(newMessage);
}
function saveMessage(newMessage){
    var request = new XMLHttpRequest();
	var requestUrl = '/forum/save';
	request.open('POST', requestUrl);
	var requestBody = JSON.stringify({
        text: newMessage.text,
        author: newMessage.author
    });
    request.setRequestHeader(
		'Content-Type',
		'application/json'
    );
    request.send(requestBody);
    clearFields();
}

function clearFields(){
    document.getElementById('message').value = ""
    document.getElementById('author').value = ""
}
var count = 1;
function textToAudio(event){
    var icon = this.children[0];
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-spinner');
    icon.classList.add('fa-pulse');
    var request = new XMLHttpRequest();
    var par = this.parentElement;
    var mtext = this.parentElement.textContent
    mtext = mtext.trim()
	var requestUrl = '/forum/audio';
    request.open('POST', requestUrl);
	var requestBody = JSON.stringify({
        text: mtext
    });
    request.setRequestHeader(
		'Content-Type',
		"application/json"
    );
    request.send(requestBody);
    window.setTimeout(function (){
        var audio = new Audio("message" + count.toString() +".wav");
        audio.play();
        count++;
        icon.classList.add('fa-volume-up');
        icon.classList.remove('fa-spinner');
        icon.classList.remove('fa-pulse');
    }, 3000);
}


