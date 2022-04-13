function setForms() {
	document.getElementById("studentlist_submit").onclick = (event) => {
		event.preventDefault();
		$.get('/allstu', {}, (data) => {
			document.getElementById("studentlist_show").innerHTML = data;
		});
	};
	document.getElementById("studentsearch_submit").onclick = (event) => {
		event.preventDefault();
		naiveRequest();
	};
	document.getElementById("studentadd_submit").onclick = (event) => {
		event.preventDefault();
		$.get('/addstu', {
			id: document.querySelector("#studentadd [name=student_id]").value,
			name: document.querySelector("#studentadd [name=student_name]").value
		}, (data) => {
			document.getElementById("studentadd_show").innerHTML = data;
		});
	};
	document.getElementById("studentdelete_submit").onclick = (event) => {
		event.preventDefault();
		$.get('/delstu', {
			id: document.querySelector("#studentdelete [name=student_id]").value,
		}, (data) => {
			document.getElementById("studentdelete_show").innerHTML = data;
		});
	};
}

function naiveRequest() {
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", "/searchstu", true);
	xhttp.send({
		id: document.querySelector("#studentsearch [name=student_id]").value
	});
	xhttp.onload = () => {
		document.getElementById("studentadd_show").innerHTML = "hello, " + xhttp.responseText;
	};
}

document.addEventListener('DOMContentLoaded', (event) => {
	setForms();
});
