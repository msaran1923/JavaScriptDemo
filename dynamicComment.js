document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('nameInput').value;
    const commentText = document.getElementById('commentInput').value;
    
    if (name.trim() === '' || commentText.trim() === '') {
      alert('Please enter both name and comment');
      return;
    }
    
    // Create comment container
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    
    // Create comment header with name and delete button
    const commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    
    const nameElement = document.createElement('h4');
    nameElement.textContent = name;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener('click', function() {
      commentDiv.parentNode.removeChild(commentDiv);
    });
    
    commentHeader.appendChild(nameElement);
    commentHeader.appendChild(deleteButton);
    
    // Create comment body
    const commentBody = document.createElement('p');
    commentBody.textContent = commentText;
    
    // Assemble the comment
    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(commentBody);
    
    // Add timestamp
    const timestamp = document.createElement('small');
    const now = new Date();
    timestamp.textContent = `Posted on ${now.toLocaleDateString()}`;
    commentDiv.appendChild(timestamp);
    
    // Add to comment section (at the beginning)
    const commentsContainer = document.getElementById('comments');
    commentsContainer.insertBefore(commentDiv, commentsContainer.firstChild);
    
    // Reset form
    document.getElementById('nameInput').value = '';
    document.getElementById('commentInput').value = '';
  });