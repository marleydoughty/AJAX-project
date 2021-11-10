// var $images = document.querySelector('.images');

// function getData(image) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=100&page=0');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     for (var i = 0; i < xhr.response.length; i++) {
//       var image = document.createElement('img');
//       image.setAttribute('src', xhr.response[i].url);
//       $images.appendChild(image);

//       var commentSection = document.createElement('div');
//       commentSection.className = 'row comment-section';
//       $images.appendChild(commentSection);

//       var commentOutput = document.createElement('p');
//       commentSection.appendChild(commentOutput);

//       var form = document.createElement('form');
//       commentSection.appendChild(form);

//       var commentInput = document.createElement('input');
//       commentInput.setAttribute('type', 'text');
//       form.appendChild(commentInput);

//       var saveComment = document.createElement('input');
//       saveComment.setAttribute('type', 'submit');
//       form.appendChild(saveComment);

//       var commentIconContainer = document.createElement('div');
//       commentIconContainer.className = 'row comment-icon';
//       $images.appendChild(commentIconContainer);

//       var commentIcon = document.createElement('i');
//       commentIcon.className = 'fas fa-comment';
//       commentIconContainer.appendChild(commentIcon);
//     }
//   });
//   xhr.send();
// }

// getData();
