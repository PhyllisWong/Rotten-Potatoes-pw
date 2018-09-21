// scripts.js

// Query the new comment form
let newComment = document.querySelector('#newComment');

// Listen for a form submit event
newComment.addEventListener('submit', function(e) {
  // prevent the default form behavior, reload/request the same URL
  e.preventDefault();

  // Serialize the form data into an object
  let commentForm = new FormData(newComment);

  // Create a json object
  let jsonData = {};
  for(let i = 0 of commentForm) {
    console.log(jsonData[i]);
  }
  // use axios to initialize a post request and send in the form data
  axios.post('/reviews/comments', comment)
    .then(function (res) { // wait for the success response from the server
      console.log(response);
      // remove the information from the form
      // display the data as a new comment on the page
    })
    .catch(function (err) {
      alert('There was a problem saving your comment. Please try again')
    });
});

axios.post('user', comment)
  .then(function (res) {
    console.log(res);
    this.reset();
    document.getElementById('comments').prepend(
      `
      <div class="card" id="${this._id}">
             <div class="card-block">
               <h4 class="card-title">${response.title}</h4>
               <p class="card-text">${response.content}</p>
               <button class="btn btn-link" id="deleteComment" data-comment-id=${response._id}>Delete</button>
             </div>
           </div>
      `
    )
  })
  .catch(function(err) {
    console.log(err.message);
  });

document.querySelector('#deleteComment').addEventListener('click', (e) => {
  console.log("click!")
  let commentId = this.getAttribute('data-comment-id')
  axios.delete(`/reviews/comments/${commentId}`)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
});

document.getElementById('delete-comment').addEventListener('click', function(e) {
  console.log("click!");
  let commentId = this.getAttribute('data-comment-id');
  axios.delete(`/reviews/comments/${commentId}`)
    .then(response => {
      console.log(response);
      comment = document.getElementById(commentId);
      comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
      alert('There was an error deleting this comment')
    });
});
