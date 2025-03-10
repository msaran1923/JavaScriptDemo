document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todoForm');
    const input = document.getElementById('todoInput');
    const tbody = document.getElementById('todoList');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value.trim()) return;
  
      // Create new table row
      const row = document.createElement('tr');
      
      // Task cell
      const taskCell = document.createElement('td');
      taskCell.className = 'task-text';
      taskCell.textContent = input.value;
      
      // Status cell
      const statusCell = document.createElement('td');
      const statusBadge = document.createElement('span');
      statusBadge.className = 'badge bg-secondary';
      statusBadge.textContent = 'Pending';
      statusCell.appendChild(statusBadge);
      
      // Actions cell
      const actionsCell = document.createElement('td');
      actionsCell.className = 'd-flex gap-2';
      
      // Complete button
      const completeBtn = document.createElement('button');
      completeBtn.className = 'btn btn-sm btn-outline-success';
      completeBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
      completeBtn.onclick = () => {
        taskCell.classList.toggle('text-decoration-line-through');
        statusBadge.className = taskCell.classList.contains('text-decoration-line-through') ? 
          'badge bg-success' : 'badge bg-secondary';
        statusBadge.textContent = taskCell.classList.contains('text-decoration-line-through') ? 
          'Completed' : 'Pending';
      };
      
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-sm btn-outline-primary';
      editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
      editBtn.onclick = () => {
        const newText = prompt('Edit task:', taskCell.textContent);
        if (newText) taskCell.textContent = newText;
      };
      
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-sm btn-outline-danger';
      deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
      deleteBtn.onclick = () => row.remove();
      
      // Assemble actions
      actionsCell.append(completeBtn, editBtn, deleteBtn);
      
      // Assemble row
      row.append(taskCell, statusCell, actionsCell);
      tbody.appendChild(row);
      
      input.value = '';
    });
  });