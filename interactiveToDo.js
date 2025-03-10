document.getElementById('todoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const todoText = document.getElementById('todoInput').value.trim();
    
    if (todoText === '') return;
    
    addTodoItem(todoText);
    document.getElementById('todoInput').value = '';
  });
  
  function addTodoItem(text) {
    const todoList = document.getElementById('todoList');
    
    // Create list item
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    
    // Create text container
    const todoTextSpan = document.createElement('span');
    todoTextSpan.textContent = text + " ";
    todoTextSpan.className = 'todo-text';
    
    // Create complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✓';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', function() {
      todoTextSpan.style.textDecoration = 
        todoTextSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    });
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
      todoList.removeChild(listItem);
    });
    
    // Assemble todo item
    listItem.appendChild(todoTextSpan);
    listItem.appendChild(completeBtn);
    listItem.appendChild(deleteBtn);
    
    // Add to list
    todoList.appendChild(listItem);
  }