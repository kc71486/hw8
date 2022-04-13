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
}

function naiveRequest() {
	var req = XMLHttpRequest();
}

document.addEventListener('DOMContentLoaded', (event) => {
	setForms();
});
