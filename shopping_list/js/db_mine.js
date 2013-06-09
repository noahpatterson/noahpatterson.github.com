//testing web storage
var shopList = {};
shopList.webdb = {};

shopList.webdb.db = null;

shopList.webdb.open = function() {
	console.log('ran open function');
  var dbSize = 1 * 1024 * 1024; // 1MB
  shopList.webdb.db = openDatabase("Shoplist", "1.0", "Shopping List", dbSize);
}

shopList.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

shopList.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  // loadTodoItems is defined in Step 4a
  shopList.webdb.getAllTodoItems(loadTodoItems);
}

shopList.webdb.createTable = function() {
  var db = shopList.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS shopList(ID INTEGER PRIMARY KEY ASC, title TEXT,  notes TEXT, added_on DATETIME)", []);
  });
}

shopList.webdb.addTodo = function(title,notes) {
  var db = shopList.webdb.db;
  db.transaction(function(tx){
    var addedOn = new Date();
    tx.executeSql("INSERT INTO shopList(title, notes, added_on) VALUES (?,?)",
        [title, ,notes, addedOn],
        shopList.webdb.onSuccess,
        shopList.webdb.onError);
   });
}

shopList.webdb.getAllTodoItems = function(renderFunc) {
  var db = shopList.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM shopList", [], renderFunc,
        shopList.webdb.onError);
  });
}


//edit this
function loadTodoItems(tx, rs) {
  var rowOutput = "";
  var todoItems = document.getElementById("todoItems");
  for (var i=0; i < rs.rows.length; i++) {
    rowOutput += renderTodo(rs.rows.item(i));
  }

  todoItems.innerHTML = rowOutput;
}

//edit this
function renderTodo(row) {
  return "<li>" + row.todo + 
         " [<a href='javascript:void(0);' onclick='shopList.webdb.deleteTodo(" + 
         row.ID +");'>Delete</a>]</li>";
}

shopList.webdb.deleteTodo = function(id) {
  var db = shopList.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM shopList WHERE ID=?", [id],
        shopList.webdb.onSuccess,
        shopList.webdb.onError);
    });
}

function init() {
  shopList.webdb.open();
  shopList.webdb.createTable();
  //shopList.webdb.getAllTodoItems(loadTodoItems);
}

//edit this
// function addTodo() {
//   var todo = document.getElementById("todo");
//   shopList.webdb.addTodo(todo.value);
//   todo.value = "";
// }​