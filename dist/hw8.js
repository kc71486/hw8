document.addEventListener('DOMContentLoaded', (event) => {
	document.querySelector('#ajax-form button[type="submit"]').onclick = (event) => {
		event.preventDefault();
		$.get('/helloname', {
			fname: document.querySelector("#ajax-form [name=first_name]").value,
			lname: document.querySelector("#ajax-form [name=last_name]").value
		}, (data) => {
			document.getElementById("ajax-output").innerHTML = data;
		});
	};
	setTimeout(() => {
		document.getElementById("ajax-output").innerHTML = "loaded";
	}, 3000)
});
