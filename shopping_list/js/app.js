//prevent html/javascript injection
function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

//set maxlength of title input based on input width
var title_width = $('input[type=text]').width();
console.log(title_width);



//expand list item
$('#list-section1').on('click','div', function(e) {
	var $target = $(e.target);
	//console.log(e.target.nodeName);
	if ($target.is('img'))
		{return;}
	console.log('clicked');
	//$('.expand-list').removeClass('expand-list');
	//$(this).addClass('expand-list');
	$(this).toggleClass('expand-list');
	//$('.expand-list').toggleClass('expand-list')
	//if ()
	//	$(this).toggleClass('expand-list');
});

//date-added
function add_new_item() {
	var date_added = new Date();

//new item
var new_item_start = "<div class='panel item large-12 large-centered columns '>" +"<input type='text' placeholder='Title' ";
var new_item_notes ="><br /><textarea placeholder='Notes'>";
var new_item_last = "</textarea><p id='enter-date'>"+ date_added+"</p><?xml version='1.0' encoding='utf-8'?> <!-- Generator: IcoMoon.io --> <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>"+"<div class='check-icon'><img src='img/checkmark.png'></div>"+"<div class='close-icon'><img src='img/close.png'></div>"+"<svg class='move-icon' width='20' height='20' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='#000000'><path d='M 32.00,96.00L 480.00,96.00L 480.00,192.00L 32.00,192.00zM 32.00,224.00L 480.00,224.00L 480.00,320.00L 32.00,320.00zM 32.00,352.00L 480.00,352.00L 480.00,448.00L 32.00,448.00z' ></path></svg>"+"</div>";
	var title_val = escapeHtml($(':nth-child(1)',$('#new-item-form')).val());
	var notes_val = escapeHtml($(':nth-child(2)',$('#new-item-form')).val());
	console.log('title: '+title_val+ ' notes: '+notes_val);
	$('#list-section1').append(new_item_start + "value='" +title_val + "'" + new_item_notes +  notes_val + new_item_last);
	$(':nth-child(1)',$('#new-item-form')).val('');
	$(':nth-child(2)',$('#new-item-form')).val('');


}
//add new item on click and return
$('#add-new-button').on('click', function() {
	add_new_item();
});

$('#add-new-item').submit(function(){
	add_new_item();
	return false;
});

//uses jquery ui to move added list items
$('#list-section1').sortable({ axis: 'y', handle: ".move-icon" });

//Mark item as complete
$('#list-section1').on('click', '.check-icon', function() {
	console.log('close-iconclicked');
	$(this).closest('.item').children('input, textarea').toggleClass('item-completed'); 
	// console.log(par);
});

//delete item
$('#list-section1').on('click', '.close-icon', function() {
	$(this).closest('.item').remove();
});

//old svg stuff

// "<svg id='close-icon' width='16' height='16' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='#000000'><path d='M 507.331,411.33c-0.002-0.002-0.004-0.004-0.006-0.005L 352.003,256.00l 155.322-155.325c 0.002-0.002, 0.004-0.003, 0.006-0.005 c 1.672-1.673, 2.881-3.627, 3.656-5.708c 2.123-5.688, 0.912-12.341-3.662-16.915L 433.952,4.674c-4.574-4.573-11.225-5.783-16.914-3.66 c-2.08,0.775-4.035,1.984-5.709,3.655c0.00,0.002-0.002,0.003-0.004,0.005L 256.001,160.00L 100.677,4.675 c-0.002-0.002-0.003-0.003-0.005-0.005c-1.673-1.671-3.627-2.88-5.707-3.655c-5.69-2.124-12.341-0.913-16.915,3.66L 4.676,78.049 c-4.574,4.574-5.784,11.226-3.661,16.914c 0.776,2.08, 1.985,4.036, 3.656,5.708c 0.002,0.001, 0.003,0.003, 0.005,0.005L 160.001,256.00 L 4.676,411.326c-0.001,0.002-0.003,0.003-0.004,0.005c-1.671,1.673-2.88,3.627-3.657,5.707c-2.124,5.688-0.913,12.341, 3.661,16.915 l 73.374,73.373c 4.575,4.574, 11.226,5.784, 16.915,3.661c 2.08-0.776, 4.035-1.985, 5.708-3.656c 0.001-0.002, 0.003-0.003, 0.005-0.005 l 155.324-155.325l 155.324,155.325c 0.002,0.001, 0.004,0.003, 0.006,0.004c 1.674,1.672, 3.627,2.881, 5.707,3.657 c 5.689,2.123, 12.342,0.913, 16.914-3.661l 73.373-73.374c 4.574-4.574, 5.785-11.227, 3.662-16.915 C 510.212,414.957, 509.003,413.003, 507.331,411.33z' ></path></svg>""<svg id='check-icon' width='20' height='20' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='#000000'><path d='M 432.00,64.00L 192.00,304.00L 80.00,192.00L0.00,272.00L 192.00,464.00L 512.00,144.00 z' ></path></svg>"


