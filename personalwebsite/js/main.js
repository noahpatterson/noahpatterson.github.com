
 function toggle_form(contact_drop) {
	contact_drop.find('form').slideToggle('slow');
}

$('#project-move').on('click', function() {
	$(this).toggleClass('project-move-slide');
	// $(this).css({'height': '25em'});
});
$('#project-description').on('click', function() {
	$('#project-move').toggleClass('project-move-slide');
});

$('#contact-drop').on('click', '#contact-link', function(){
	var contact_drop = $(this).closest('#contact-drop');
	toggle_form(contact_drop);
	// contact_drop.find('form').slideToggle('slow');
});

$('#submit-button').on('click', function(){
	var test = "mailto:noah@noah-patterson.com?subject=Contact Form Questions&body=" + $('input').filter('[type=textarea]').val();
	$(this).closest('form').attr('action',test);
	document.getElementById('contact-form').reset();



	var contact_drop = $(this).closest('#contact-drop');
	toggle_form(contact_drop);

	});

$('#nav-contact-link').on('click', function(){
	var contact_drop = $('#contact-drop');
	toggle_form(contact_drop);
	});