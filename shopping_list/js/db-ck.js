function loadTodoItems(e,t){var n="",r=document.getElementById("todoItems");for(var i=0;i<t.rows.length;i++)n+=renderTodo(t.rows.item(i));r.innerHTML=n}function renderTodo(e){return"<li>"+e.todo+" [<a href='javascript:void(0);'  onclick='html5rocks.webdb.deleteTodo("+e.ID+");'>Delete</a>]</li>"}function init(){html5rocks.webdb.open();html5rocks.webdb.createTable()}var html5rocks={};html5rocks.webdb={};html5rocks.webdb.db=null;html5rocks.webdb.open=function(){var e=5242880;html5rocks.webdb.db=openDatabase("Todo","1.0","Todo manager",e)};html5rocks.webdb.createTable=function(){var e=html5rocks.webdb.db;e.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)",[])})};html5rocks.webdb.addTodo=function(e){var t=html5rocks.webdb.db;t.transaction(function(t){var n=new Date;t.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)",[e,n],html5rocks.webdb.onSuccess,html5rocks.webdb.onError)})};html5rocks.webdb.onError=function(e,t){alert("There has been an error: "+t.message)};html5rocks.webdb.onSuccess=function(e,t){html5rocks.webdb.getAllTodoItems(loadTodoItems)};html5rocks.webdb.getAllTodoItems=function(e){var t=html5rocks.webdb.db;t.transaction(function(t){t.executeSql("SELECT * FROM todo",[],e,html5rocks.webdb.onError)})};html5rocks.webdb.deleteTodo=function(e){var t=html5rocks.webdb.db;t.transaction(function(t){t.executeSql("DELETE FROM todo WHERE ID=?",[e],html5rocks.webdb.onSuccess,html5rocks.webdb.onError)})};init();