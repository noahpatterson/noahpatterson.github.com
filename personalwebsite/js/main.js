
//toggle form function
 function toggle_form(contact_drop) {
	contact_drop.find('form').slideToggle('slow');
}

//reveals project description
$('#project-move').on('click', function() {
	$(this).toggleClass('project-move-slide');
	// $(this).css({'height': '25em'});
});
$('.project-description').on('click', function() {
	$('#project-move').toggleClass('project-move-slide');
});

//toggles contact form
$('#contact-drop').on('click', '#contact-link', function(){
	var contact_drop = $(this).closest('#contact-drop');
	toggle_form(contact_drop);
	// contact_drop.find('form').slideToggle('slow');
});

//opens email in email app, closes contact form
$('#submit-button').on('click', function(){
	var test = "mailto:noah@noah-patterson.com?subject=Contact Form Questions&body=" + $('input').filter('[type=textarea]').val();
	$(this).closest('form').attr('action',test);
	document.getElementById('contact-form').reset();



	var contact_drop = $(this).closest('#contact-drop');
	toggle_form(contact_drop);

	});
//also opens contact form
$('#nav-contact-link').on('click', function(){
	var contact_drop = $('#contact-drop');
	toggle_form(contact_drop);
	});

//animate scroll
$('#portfolio-scroll').on('click', function(){
	var port_pos = Math.floor($('#portfolio').offset().top);
	var current_pos_html = document.getElementsByTagName("html")[0].scrollTop;
	var current_pos_body = document.getElementsByTagName("body")[0].scrollTop;
	if ((current_pos_body !== port_pos && current_pos_html === 0 ) || (current_pos_html !== port_pos && current_pos_body === 0)) {
			$('html,body').animate({scrollTop: $('#portfolio').offset().top}, 1000);
		}
});

$('#about-scroll').on('click', function(){
	var  abt_pos = Math.floor($('#about').offset().top);
	var current_pos_html = document.getElementsByTagName("html")[0].scrollTop;
	var current_pos_body = document.getElementsByTagName("body")[0].scrollTop;
	if ((current_pos_body !== abt_pos &&current_pos_html === 0 ) || (current_pos_html !== abt_pos && current_pos_body === 0)) {

		// alert("html pos " +current_pos_html);
		// alert("body pos " +current_pos_body);
		$('html,body').animate({scrollTop: $('#about').offset().top}, 1000);
	}
	
});
