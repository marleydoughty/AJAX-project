var $allImages = document.querySelector('.images');
// var $formInputs = document.querySelector('#form-inputs');

function renderData(images) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=100&page=0');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < 9; i++) {
      var imageContainer = document.createElement('div');
      imageContainer.className = 'row image-container';
      $allImages.appendChild(imageContainer);

      var image = document.createElement('img');
      image.setAttribute('src', xhr.response[i].url);
      image.className = 'column-full';
      imageContainer.appendChild(image);

      var commentSection = document.createElement('div');
      commentSection.className = 'row comment-section';
      imageContainer.appendChild(commentSection);

      var columnHalf = document.createElement('div');
      columnHalf.className = 'comment-form not-visible column-half';
      commentSection.appendChild(columnHalf);

      var commentOutput = document.createElement('p');
      columnHalf.appendChild(commentOutput);

      var form = document.createElement('form');
      form.setAttribute('id', 'form-input');
      columnHalf.appendChild(form);

      var commentInput = document.createElement('input');
      commentInput.setAttribute('type', 'text');
      commentInput.setAttribute('placeholder', 'Add comments here');
      commentInput.setAttribute('id', 'comment-box');
      form.appendChild(commentInput);

      var saveComment = document.createElement('input');
      saveComment.setAttribute('type', 'submit');
      saveComment.setAttribute('value', 'Save');
      saveComment.setAttribute('id', 'save-button');
      form.appendChild(saveComment);

      var commentIconContainer = document.createElement('div');
      commentIconContainer.className = 'comment-icon column-half';
      commentSection.appendChild(commentIconContainer);

      var commentIcon = document.createElement('i');
      commentIcon.className = 'far fa-comment';
      commentIconContainer.appendChild(commentIcon);
    }
  });
  xhr.send();
}

renderData();

// function handleDomContent(event) {

// }

function clickedCommentIcon(event) {
  if (event.target && event.target.tagName === 'I') {
    var closestCommentForm = event.target.parentElement.parentElement.querySelector('.comment-form');
    closestCommentForm.className = 'comment-form';
  }
}
$allImages.addEventListener('click', clickedCommentIcon);

// function handleSaveComment(event) {
//   event.preventDefault();
//   // var commentData = {
//   //   comment: $formInputs.elements['comment-box'].value,
//   //   imageId: data.imageId
//   // };
//   // data.imageId++;
//   // data.comments.unshift(commentData);
// }
// $formInputs.addEventListener('submit', handleSaveComment);
