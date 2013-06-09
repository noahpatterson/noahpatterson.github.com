var shopList = {};

shopList.webdb = {};
shopList.webdb.db = null;

shopList.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  shopList.webdb.db = openDatabase("shopList", "1.0", "shopList manager", dbSize);
};

shopList.webdb.createTable = function() {
  var db = shopList.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS shopList(ID INTEGER PRIMARY KEY ASC, title TEXT, notes TEXT, added_on DATETIME, checked INTEGER)", []);
  });
}

shopList.webdb.addshopList = function(title,notes,addedOn) {
  var db = shopList.webdb.db;
  var checked = 0;
  db.transaction(function(tx){
    tx.executeSql("INSERT INTO shopList(title, notes, added_on,checked) VALUES (?,?,?,?)",
        [title, notes, addedOn, checked]);
   });
}

shopList.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

shopList.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  shopList.webdb.getAllshopListItems(loadshopListItems);
}


shopList.webdb.getAllshopListItems = function(renderFunc) {
  var db = shopList.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM shopList", [], renderFunc,
        shopList.webdb.onError);
  });
}

shopList.webdb.deleteshopList = function(title,notes,date) {
  var db = shopList.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM shopList WHERE title=? AND notes=? AND added_on=?", [title,notes,date]);
    });
}

shopList.webdb.updateChecked = function(title,notes,date,checked,new_date) {
  var db= shopList.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("UPDATE shopList SET added_on=?,checked=? WHERE title=? AND notes=? AND added_on=?", [new_date,checked,title,notes,date]);
  });
}

shopList.webdb.updateInputOnType = function(title,notes,date,field_to_update,new_update,new_date) {
  var db=shopList.webdb.db;
  db.transaction(function(tx){
    console.log('title='+ title+' notes='+notes+' date='+date+' fieldtoupdate='+field_to_update+' newupdate='+new_update);
    tx.executeSql("UPDATE shopList SET added_on=?, "+field_to_update+"=? WHERE title=? AND notes=? AND added_on=?", [new_date,new_update,title,notes,date]);
  });
}

//output query to var
function outputQueryResults(tx,rs){
  var rowOutput = [];
  console.log('in outputFunc');
  console.log(rs.rows.item(0).count);
  for (var i =0; i < rs.rows.length;i++){
    rowOutput.push(rs.rows.item(i).count);
  }
  // =  rowOutput;
}

//edit this
function loadshopListItems(tx, rs) {
  var rowOutput = "";
  var shopListItems = document.getElementById("list-section1");
  for (var i=0; i < rs.rows.length; i++) {
    rowOutput += rendershopList(rs.rows.item(i));
  }

  shopListItems.innerHTML = rowOutput;
}

//edit this
function rendershopList(row) {
  var is_checked;
  if (row.checked === 1){
    is_checked = 'item-completed';
  } else  is_checked = '';
  // return "<li>" + row.shopList  + " [<a href='javascript:void(0);'  onclick='shopList.webdb.deleteshopList(" + row.ID +");'>Delete</a>]</li>";

  return "<div class='panel item large-12 large-centered columns'>" +"<textarea placeholder='Title' class='title-input "+ is_checked +"'>"+ row.title+ "</textarea><br /><textarea placeholder='Notes' class=' notes-input "+ is_checked +"'>"+row.notes+"</textarea><p class=' enter-date'>"+ row.added_on+"</p><?xml version='1.0' encoding='utf-8'?> <!-- Generator: IcoMoon.io --> <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>"+"<div class='check-icon'><img src='img/checkmark.png'></div>"+"<div data-tip='Drag Me!' class='close-icon'><img src='img/close.png'></div>"+"<div data-tip='Drag Me!' class='move-icon-container'><svg class='move-icon' data-tip='Drag Me!' width='20' height='20' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='#000000'><path d='M 32.00,96.00L 480.00,96.00L 480.00,192.00L 32.00,192.00zM 32.00,224.00L 480.00,224.00L 480.00,320.00L 32.00,320.00zM 32.00,352.00L 480.00,352.00L 480.00,448.00L 32.00,448.00z' ></path></svg>"+"</div></div>";
}

function init() {
  shopList.webdb.open();
  shopList.webdb.createTable();
  shopList.webdb.getAllshopListItems(loadshopListItems);
}

//edit this
// function addshopList() {
//   var shopList = document.getElementById("shopList");
//   shopList.webdb.addshopList(shopList.value);
//   shopList.value = "";
// }​

$(document).ready(function() {
	init();
});

//prevent html/javascript injection
function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}




//expand list item
$('#list-section1').on('click','div', function(e) {
	var $target = $(e.target);
	//console.log(e.target.nodeName);
	if ($target.is('img')||($target.is('textarea') && $target.attr('placeholder') == 'Notes')||$target.is('textarea') && $target.attr('placeholder') == 'Title' && $(this).hasClass('expand-list'))
		{return;}
	//console.log('clicked');
	//$('.expand-list').removeClass('expand-list');
	//$(this).addClass('expand-list');
	$(this).toggleClass('expand-list');
  // $(this).children('.enter-date, .notes-input').toggleClass('visible');
	//$('.expand-list').toggleClass('expand-list')
	//if ()
	//	$(this).toggleClass('expand-list');
});

//date-added
function add_new_item() {
  var date_added = new Date();


//new item
var new_item_start = "<div class='panel item large-12 large-centered columns ' data-id=''>" +"<textarea placeholder='Title' class='title-input'>"

// "<input type='text' placeholder='Title' "
;
var new_item_notes ="</textarea><br /><textarea placeholder='Notes' class=' notes-input'>";
var new_item_last = "</textarea><p class=' enter-date'>"+ date_added+"</p><?xml version='1.0' encoding='utf-8'?> <!-- Generator: IcoMoon.io --> <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>"+"<div class='check-icon'><img src='img/checkmark.png'></div>"+"<div data-tip='Drag Me!' class='close-icon'><img src='img/close.png'></div>"+"<div class='move-icon-container' data-tip='Drag Me!'><svg class='move-icon' data-tip='Drag Me!' width='20' height='20' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='#000000'><path d='M 32.00,96.00L 480.00,96.00L 480.00,192.00L 32.00,192.00zM 32.00,224.00L 480.00,224.00L 480.00,320.00L 32.00,320.00zM 32.00,352.00L 480.00,352.00L 480.00,448.00L 32.00,448.00z' ></path></svg></div>"+"</div>";
	var title_val = escapeHtml($(':nth-child(1)',$('#new-item-form')).val());
	var notes_val = escapeHtml($(':nth-child(2)',$('#new-item-form')).val());
	console.log('title: '+title_val+ ' notes: '+notes_val);
	$('#list-section1').append(new_item_start +
		 // + "value='" +title_val + "'" 
		title_val+ new_item_notes +  notes_val + new_item_last);
	$(':nth-child(1)',$('#new-item-form')).val('');
	$(':nth-child(2)',$('#new-item-form')).val('');
	shopList.webdb.addshopList(title_val,notes_val,date_added);


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


//delete item
$('#list-section1').on('click', '.close-icon', function() {
  var title= $(':nth-child(1)', $(this).closest('.item')).val();
  var notes= $(':nth-child(3)', $(this).closest('.item')).val(); 
  var date=  $(':nth-child(4)', $(this).closest('.item')).text();
 shopList.webdb.deleteshopList(title,notes,date);
 $(this).closest('.item').remove();
});


//global vals set on focus in
var toUpdateTitle;
var toUpdateNotes;
var toUpdateDate;
$('#list-section1').on('focusin', 'textarea', function (){
  //console.log($(this));
  toUpdateTitle= $(':nth-child(1)', $(this).closest('.item')).val();
  toUpdateNotes= $(':nth-child(3)', $(this).closest('.item')).val();
  toUpdateDate=  $(':nth-child(4)', $(this).closest('.item')).text();
});

//Mark item as complete
$('#list-section1').on('click', '.check-icon', function() {
  var new_date = new Date();
  var title= $(':nth-child(1)', $(this).closest('.item')).val();
  var notes= $(':nth-child(3)', $(this).closest('.item')).val(); 
  var date=  $(':nth-child(4)', $(this).closest('.item')).text();
  $(this).closest('.item').children('input, textarea').toggleClass('item-completed'); 
  // console.log(par);
  if ($(this).closest('.item').children('input, textarea').hasClass('item-completed')) {
      shopList.webdb.updateChecked(title,notes,date,1,new_date);
      $(':nth-child(4)', $(this).closest('.item')).text(new_date);
  } else {
    shopList.webdb.updateChecked(title,notes,date,0,new_date);
    $(':nth-child(4)', $(this).closest('.item')).text(new_date);
  }
});


//update input to openDatabase
$('#list-section1').on('focusout','textarea', function (){
  var new_date = new Date();
  $(':nth-child(4)', $(this).closest('.item')).text(new_date);
  var toUpdate = $(this).val();
  var areaName = $(this).attr('placeholder').toLowerCase();
  shopList.webdb.updateInputOnType(toUpdateTitle,toUpdateNotes,toUpdateDate,areaName,toUpdate,new_date);
});