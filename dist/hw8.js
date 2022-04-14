function setForms() {
	document.getElementById("studentlist_submit").onclick = (event) => {
		event.preventDefault();
		listRequest();
	};
	document.getElementById("studentsearch_submit").onclick = (event) => {
		event.preventDefault();
		searchRequest();
	};
	document.getElementById("studentadd_submit").onclick = (event) => {
		event.preventDefault();
		addRequest();
	};
	document.getElementById("studentdelete_submit").onclick = (event) => {
		event.preventDefault();
		deleterequest();
	};
}

function listRequest() {//get + jquery
	$.get('/allstu', {}, (data) => {
		document.getElementById("studentlist_show").innerHTML = data;
	});
}

function searchRequest() {//get + XMLHttpRequest
	let xhttp = new XMLHttpRequest(), url="/searchstu"
	let data = document.querySelector("#studentsearch [name=student_id]").value;
	url += "?id=" + data;
	xhttp.open("GET", url, true);
	xhttp.setRequestHeader('content-type',"text/html")
	xhttp.send(null);
	xhttp.onreadystatechange = function() {
		let showArea = document.getElementById("studentsearch_show");
		if(xhttp.readyState == 4 && Math.floor(xhttp.status/100) == 2) {
			let message = JSON.parse(xhttp.responseText);
			if(message.mode === 0) {
				showArea.innerHTML = "hello, " + message.name;
			} else if(message.mode === 1) {
				showArea.innerHTML = "no such student";
			} else {
				alert("unknown error in searchRequest()");
			}
		} else {
			showArea.innerHTML = "error: " + xhttp.status;
		}
	};
}

function addRequest() {//post + jquery
	$.post('/addstu', {
		id: document.querySelector("#studentadd [name=student_id]").value,
		name: document.querySelector("#studentadd [name=student_name]").value
	}, (data) => {
		let showArea = document.getElementById("studentadd_show");
		let message = JSON.parse(data);
		if(message.mode === 0) {
			showArea.innerHTML = `added ${message.id} : ${message.newName}`;
		} else if(message.mode === 1) {
			showArea.innerHTML = "changed from"+message.id+" : "+message.oldName+
								"\ninto "+message.id+" : "+message.newName;
		} else {
			alert("unknown error in searchRequest()");
		}
	});
}

function deleterequest() {//post + XMLHttpRequest
	let xhttp = new XMLHttpRequest(), url="/delstu";
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhttp.send("id=" + document.querySelector("#studentdelete [name=student_id]").value);
	xhttp.onreadystatechange = function() {
		let showArea = document.getElementById("studentdelete_show");
		if(xhttp.readyState == 4 && Math.floor(xhttp.status/100) == 2) {
			let message = JSON.parse(xhttp.responseText);
			if(message.mode === 0) {
				showArea.innerHTML = "deleted " + message.name;
			} else if(message.mode === 1) {
				showArea.innerHTML = "aborted, id not found";
			} else {
				alert("unknown error in searchRequest()");
			}
		} else {
			showArea.innerHTML = "error: " + xhttp.status;
		}
	};
}

document.addEventListener('DOMContentLoaded', (event) => {
	setForms();
});
