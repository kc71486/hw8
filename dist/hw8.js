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
	xhttp.open("POST", "/searchstu", true);
	xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhttp.send("id=" + document.querySelector("#studentsearch [name=student_id]").values);
	xhttp.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			document.getElementById("studentsearch_show").innerHTML = xhttp.responseText;
		}
	};
}

document.addEventListener('DOMContentLoaded', (event) => {
	setForms();
});
