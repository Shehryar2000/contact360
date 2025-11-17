const toggleSidebar = () => {
	$(".sidebar").css("display", "none");  // Hide sidebar
	$(".content").css("margin-left", "0%");  // Reset content margin
	$(".hamburger").css("visibility", "visible");  // Show hamburger using visibility
	$(".hamburger").css("opacity", "1");  // Fade hamburger in
};

const toggleHamburger = () => {
	$(".sidebar").css("display", "block");  // Show sidebar
	$(".content").css("margin-left", "20%");  // Adjust content margin
	$(".hamburger").css("visibility", "hidden");  // Hide hamburger
	$(".hamburger").css("opacity", "0");  // Fade hamburger out
};


function deleteContact(id) {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this contact!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
		confirmButtonColor: "#d33",   // red delete button
		cancelButtonColor: "#ffc107", // yellow cancel button
		buttonsStyling: true

	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: "Deleted!",
				text: "Your contact has been deleted.",
				icon: "success",
				customClass: {
					confirmButton: "btn-bg-primary"
				},
				buttonsStyling: true
			});
			window.location = "/user/delete/" + id;
		} else {
			Swal.fire({
				text: "Your contact is safe.",
				icon: "info",
				customClass: {
					confirmButton: "btn-bg-primary"
				},
				buttonsStyling: true
			});
		}
	});
}

//Search Functionality

const search = () => {

	let query = $("#search-input").val();

	if (query.trim() == "") {
		$("#search-result").hide();

	} else {

		let url = `http://localhost:8080/search/${query}`;

		fetch(url).then((response) => {
			return response.json();
		}).then((data) => {
			// console.log(data);

			let text = `<div class='list-group'>`;

			data.forEach(contact => {
				text += `<a href='/user/${contact.id}/contact' class='list-group-item list-group-action'>${contact.fName} ${contact.lName}</a>`
			});
			text += `</div>`

			$(".search-result").html(text);
			$(".search-result").show();
		});


	}
}