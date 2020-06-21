class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>

                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `
        });

        this.post.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();

        const div = document.createElement('div');

        div.className = className;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.postsContainer');

        const posts = document.querySelector('#posts');

        container.insertBefore(div, posts);

        // Timeout function
        setTimeout(() => {
            this.clearAlert();
        }, 3000)
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;  
        const button = document.querySelector(".post-cancel");

        if (!button) {
      console.log("No cancel button yet!");
      this.changeState("edit");
    }
    }

    changeState(type) {
        if(type === 'edit') {
            this.postSubmit.textContent = 'Update post';
            this.postSubmit.className = 'btn-warning post-submit btn btn-block';

            const cancelButton = document.createElement('button');
            cancelButton.className = 'post-cancel btn btn-block btn-light';
            cancelButton.appendChild(document.createTextNode('Cancel'));
            
            // geting parent
            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');

            cardForm.insertBefore(cancelButton, formEnd);
        } else {
            this.postSubmit.textContent = 'Post it';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // clear id from hidden field!
            this.clearHiddenId();

            this.clearFields();
        }
    }
    clearHiddenId() {
        this.idInput.value = '';
    }
}

export const ui = new UI();