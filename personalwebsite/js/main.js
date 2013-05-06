$('#project-move').on('click', function() {
	$(this).toggleClass('project-move-slide');
	// $(this).css({'height': '25em'});
});
$('#project-description').on('click', function() {
	$('#project-move').toggleClass('project-move-slide');
});

