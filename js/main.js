var $images = document.querySelector('.images');

function getData(image) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=100&page=0');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < 9; i++) {
      var imageContainer = document.createElement('div');
      imageContainer.className = 'row flex-wrap width';
      $images.appendChild(imageContainer);

      // var columnFull = document.createElement('div');
      // columnFull.className = 'column-full';
      // imageContainer.appendChild(columnFull);

      var image = document.createElement('img');
      image.setAttribute('src', xhr.response[i].url);
      image.className = 'column-full';
      imageContainer.appendChild(image);

      var commentSection = document.createElement('div');
      commentSection.className = 'row comment-section align-center';
      imageContainer.appendChild(commentSection);

      var columnHalf = document.createElement('div');
      columnHalf.className = 'column-half';
      commentSection.appendChild(columnHalf);

      var commentOutput = document.createElement('p');
      columnHalf.appendChild(commentOutput);

      var form = document.createElement('form');
      columnHalf.appendChild(form);

      var commentInput = document.createElement('input');
      commentInput.setAttribute('type', 'text');
      commentInput.setAttribute('placeholder', 'Add comments here');
      commentInput.className = 'comment-box';
      form.appendChild(commentInput);

      var saveComment = document.createElement('input');
      saveComment.setAttribute('type', 'submit');
      saveComment.setAttribute('value', 'Save');
      saveComment.className = 'save-button';
      form.appendChild(saveComment);

      var commentIconContainer = document.createElement('div');
      commentIconContainer.className = 'comment-icon column-half';
      commentSection.appendChild(commentIconContainer);

      var commentIcon = document.createElement('i');
      commentIcon.className = 'fas fa-comment';
      commentIconContainer.appendChild(commentIcon);
    }
  });
  xhr.send();
}

getData();
