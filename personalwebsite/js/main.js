
//goggle analytics
function googleAnalyticsBuild(category, action, opt_label, opt_value, opt_noninteraction) {
	return _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
}

function trackOutboundLink(link, category, action) { 
try { 
_gaq.push(['_trackEvent', category , action]); 
} catch(err){}


}

//_gaq.push(['_trackEvent', 'Videos', 'Play', 'Baby\'s First Birthday']);

//toggle form function
 function toggle_form(contact_drop) {
	contact_drop.find('form').slideToggle('slow').toggleClass('contact-form-visible');
	if (contact_drop.find('form').hasClass('contact-form-visible')) {
		googleAnalyticsBuild('Contact','contact_reveal','Opened the contact form');
	}

}

//track blog click
$('#blog').click(function(e){

	trackOutboundLink(this,'Outbound Link', 'blog.albinosquirrel.com');

	if ( $(this).attr('target') === undefined || $(this).attr('target').toLowerCase() != '_blank') {
			setTimeout(function() {
			document.location.href = link.href;
			}, 100);
			return false;
		}
});

//reveals project description
$('#project-move').on('click', function() {
	$(this).toggleClass('project-move-slide');
	// $(this).css({'height': '25em'});
	if ($(this).hasClass('project-move-slide')) {
		googleAnalyticsBuild('Project','description_reveal','Viewed a description of a project');
	}
});

//toggles project move on click anywhere
$('html').click(function(){
	if ($('#project-move').hasClass('project-move-slide')) {
		$('#project-move').removeClass('project-move-slide');
	}
});

$('html').click(function(){

	if ($('#contact-drop').find('form').hasClass('contact-form-visible')){
		$('#contact-drop').find('form').slideToggle('slow').toggleClass('contact-form-visible');
	}
});

$('#project-move').click(function(e){
	e.stopPropagation();
});

$('#contact-drop').find('form').click(function(e){
	e.stopPropagation();
});

$('#contact-drop').click(function(e){
	e.stopPropagation();
});

$('#nav-contact-link').click(function(e){
	e.stopPropagation();
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
	googleAnalyticsBuild('Contact','contact_submit','Submitted a contact form');


	});
//also opens contact form
$('#nav-contact-link').on('click', function(){
	var contact_drop = $('#contact-drop');
	toggle_form(contact_drop);
	});

//animate scroll
var port_pos = Math.floor($('#portfolio').offset().top);

$('#portfolio-scroll').on('click', function(){

	var current_pos_html = document.getElementsByTagName("html")[0].scrollTop;
	var current_pos_body = document.getElementsByTagName("body")[0].scrollTop;
	if ((current_pos_body !== port_pos && current_pos_html === 0 ) || (current_pos_html !== port_pos && current_pos_body === 0)) {
			$('html,body').animate({scrollTop: $('#portfolio').offset().top}, 1000);
		}
});

var  abt_pos = Math.floor($('#about').offset().top);

$('#about-scroll').on('click', function(){
	
	var current_pos_html = document.getElementsByTagName("html")[0].scrollTop;
	var current_pos_body = document.getElementsByTagName("body")[0].scrollTop;
	if ((current_pos_body !== abt_pos &&current_pos_html === 0 ) || (current_pos_html !== abt_pos && current_pos_body === 0)) {

		// alert("html pos " +current_pos_html);
		// alert("body pos " +current_pos_body);
		$('html,body').animate({scrollTop: $('#about').offset().top}, 1000);
	}
	
});

/*Highlight scroll position in Nav*/

var regions = [];


var scr_top_init = $(window).scrollTop();
regions.push(port_pos);
regions.push(abt_pos-400);
console.log(regions[0]);
if (scr_top_init <= abt_pos) {
	$('#portfolio-scroll').addClass('highlight');
} else if (scr_top >= abt_pos) {
	$('#about-scroll').addClass('highlight');
}

$(window).scroll(function() {
	console.log('scrolled');

  var scr_top = $(this).scrollTop();
                 
  
  if (scr_top >= regions[0] && scr_top < regions[1]  && !$('#portfolio-scroll').hasClass('highlight') ) {
    console.log(scr_top + ' portfolio');
    $('#about-scroll').removeClass('highlight');
    $('#portfolio-scroll').addClass('highlight');
    
  } else if (scr_top >= regions[1] && !$('#about-scroll').hasClass('highlight') ) {
 	    console.log(scr_top+' about');

    $('#portfolio-scroll').removeClass('highlight');
    $('#about-scroll').addClass('highlight');
  }
});
