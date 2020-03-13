get_todos()

function get_todos() {
  var request = new XMLHttpRequest();
  var requestURL = '/getTodos';
  request.open('GET', requestURL);
  request.responseType = 'json'
  request.send();
  console.log(request);
  request.onload = function() {
    var todos = request.response;
    printTodos(todos);
  }
}

function printTodos(todos) {
  var table = document.getElementById("todo_table");

  for(var i in todos) {
    const todo_id = todos[i]._id;
    const todo = todos[i].todoItem;
    var todo_status = todos[i].todoStatus;
    var row = document.createElement('tr');
    var todo_cell = document.createElement('td');
    var todo_s = document.createElement('input');
    var todo_button = document.createElement('button');
    todo_button.setAttribute('onclick', 'removeTodo("' + todo_id + '")');
    todo_button.innerHTML = "Remove";
    todo_cell.innerHTML = todo;
    todo_s.setAttribute('type','checkbox');
    if(todo_status) {
      todo_s.setAttribute('checked', '');
      todo_s.setAttribute('disabled', '');
    }
    todo_s.setAttribute('onchange', 'doneTodo("' + todo_id + '")');
    row.append(todo_s);
    row.append(todo_cell);
    row.append(todo_button);
    table.append(row);
  }
}
function doneTodo(todo_id) {
  var form = document.getElementById('todo_done_form');
  form.action = form.action + todo_id;
  form.submit();
}
function removeTodo(todo_id) {
  var form = document.getElementById('remove_todo_form');
  form.action = form.action + todo_id;
  form.submit();
}