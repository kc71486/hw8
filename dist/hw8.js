document.addEventListener('DOMContentLoaded', (event) => {
	document.querySelector('#ajax-form button[type="submit"]').onclick = (event) => {
		event.preventDefault();
		// Step 9 and step 10 code goes here
		$.get('./helloname', {
			fname: $('#ajax-form [name=first_name]').val(),
			lname: $('#ajax-form [name=last_name]').val()
		}, (data) => {
			document.getElementById("ajax-output").innerHTML = data;
		});
	};
});
