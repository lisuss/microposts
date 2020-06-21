import { http } from './http';
import { ui } from './ui';

// Get post
document.addEventListener('DOMContentLoaded', getPosts);

// listen for added post
document.querySelector('.post-submit').addEventListener('click', addEditPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for update
document.querySelector('#posts').addEventListener('click', editState);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

const data = {
    title,
    body
};

function addEditPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    if(title === '' || body === '') {
        ui.showAlert('Please fill fields', 'alert alert-danger');
    } else {
        const data = {
            title,
            body
        };
        // check for hidden id
        if(id === '') {
            // Create post
        http.post('http://localhost:3000/posts', data)
        .then(data => {
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err))
        } else {
            // Update post
            http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
            ui.showAlert('Post updated', 'alert alert-success');
            ui.changeState('add');
            getPosts();
        })
        .catch(err => console.log(err))
        }
       
    
        
    }

  
}

function deletePost(e) {
    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post removed', 'alert alert-success');
                getPosts();
            })
            .catch(err => console.log(err))
        }
    }
}

function editState(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        
        const data = {
          id,
          title,
          body
        }

        console.log(title);
    
        // Fill form with current post
        ui.fillForm(data);
      }
    e.preventDefault();
}

function cancelEdit(e) {
    if(e.target.classList.contains('post-cancel')) {
        ui.changeState('add');
    }

    e.preventDefault()
}