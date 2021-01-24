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
    var mesHtml = Handlebars.templates.message(newMessage);
    document.getElementById("mes-container").insertAdjacentHTML('afterbegin', mesHtml);
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




