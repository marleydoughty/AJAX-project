/* global data */
/* exported data */
var $allImages = document.querySelector('.images');
var $navFavoritesButton = document.querySelector('.tab-favorites');
var $navFactsButton = document.querySelector('.tab-facts');
var $navImagesButton = document.querySelector('.tab-images');
var $bottomNavImageButton = document.querySelector('.img');
var $bottomNavFactButton = document.querySelector('.fact');
var $bottomNavFavoritesButton = document.querySelector('.fav');
var $factsSection = document.querySelector('.facts');
var topImg = document.querySelector('.column-header.i');
var topFav = document.querySelector('.column-header.fv');
var topFact = document.querySelector('.column-header.fc');
var bottomImg = document.querySelector('.mb-10.img');
var bottomFav = document.querySelector('.mb-10.fav');
var bottomFact = document.querySelector('.mb-10.fact');
var imageValues = [];
var factValues = [];

function fetchImages() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=100&page=0');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    imageValues = xhr.response;
    renderImages();
  });
  xhr.send();
}

function renderImages() {
  $allImages.innerHTML = '';
  for (var i = 0; i < imageValues.length; i++) {
    var imageContainer = document.createElement('div');
    imageContainer.className = 'row image-container end view';
    imageContainer.setAttribute('data-id', imageValues[i].id);
    $allImages.appendChild(imageContainer);

    var image = document.createElement('img');
    image.setAttribute('src', imageValues[i].url);
    image.className = 'column-full';
    imageContainer.appendChild(image);

    var commentObj = null;
    for (var ci = 0; ci < data.comments.length; ci++) {
      if (data.comments[ci].imageId === imageValues[i].id) {
        commentObj = data.comments[ci];
      }
    }
    var commentOutput = document.createElement('p');
    if (commentObj) {
      commentOutput.textContent = commentObj.textValue;
      imageContainer.className = 'row image-container sb';
    }
    imageContainer.appendChild(commentOutput);

    var commentSection = document.createElement('div');
    commentSection.className = 'row comment-section';
    imageContainer.appendChild(commentSection);

    var columnHalf = document.createElement('div');
    if (imageValues[i].editing === true) {
      columnHalf.className = 'comment-form';
    } else {
      columnHalf.className = 'comment-form hidden column-half';
    }
    commentSection.appendChild(columnHalf);

    var form = document.createElement('form');
    form.setAttribute('id', 'form-input');
    form.setAttribute('name', 'comment');
    columnHalf.appendChild(form);
    form.addEventListener('submit', handleSaveComment);

    var commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('placeholder', 'Add comments here');
    commentInput.setAttribute('id', 'comment-box');
    if (imageValues[i].editing === true) {
      commentOutput.className = 'hidden';
      commentInput.value = commentOutput.textContent;
    }
    form.appendChild(commentInput);

    var buttonRow = document.createElement('div');
    buttonRow.className = 'row sb';
    form.appendChild(buttonRow);

    var deleteComment = document.createElement('input');
    deleteComment.setAttribute('type', 'button');
    deleteComment.setAttribute('value', 'Delete');
    deleteComment.setAttribute('id', 'delete-button');
    buttonRow.appendChild(deleteComment);
    deleteComment.addEventListener('click', handleDeleteComment);

    var saveComment = document.createElement('input');
    saveComment.setAttribute('type', 'submit');
    saveComment.setAttribute('value', 'Save');
    saveComment.setAttribute('id', 'save-button');
    buttonRow.appendChild(saveComment);

    var commentIconContainer = document.createElement('div');
    commentIconContainer.className = 'comment-icon column-half';
    commentSection.appendChild(commentIconContainer);

    var commentIcon = document.createElement('i');
    commentIcon.className = 'far fa-comment';
    commentIconContainer.appendChild(commentIcon);
    commentIcon.addEventListener('click', clickedCommentIcon);

    var favoriteIcon = document.createElement('i');
    favoriteIcon.className = 'far fa-heart';
    commentIconContainer.appendChild(favoriteIcon);
    favoriteIcon.addEventListener('click', handleFavoriteImage);
    for (var fi = 0; fi < data.favorites.length; fi++) {
      if (data.favorites[fi] === imageValues[i]) {
        favoriteIcon.className = 'fas fa-heart';
      }
    }
  }
}
fetchImages();

function findImageIndex(target) {
  var closestImageContainer = target.closest('.image-container');
  for (var i = 0; i < $allImages.children.length; i++) {
    if ($allImages.children[i] === closestImageContainer) {
      return i;
    }
  }
  return undefined;
}

function clickedCommentIcon(event) {
  if (event.target && event.target.tagName === 'I') {
    var imageIndex = findImageIndex(event.target);
    if (imageIndex !== undefined) {
      imageValues[imageIndex].editing = true;
      renderImages();
    }
  }
}

function handleSaveComment(event) {
  event.preventDefault();
  var textValue = event.target.querySelector('input').value;
  var closestImageContainer = event.target.closest('.image-container');
  var imageId = closestImageContainer.getAttribute('data-id');

  var imageIndex = findImageIndex(event.target);
  if (imageIndex !== undefined) {
    imageValues[imageIndex].editing = false;
  }
  data.comments.push({
    textValue,
    imageId
  });
  renderImages();
}

function handleDeleteComment(event) {
  for (var i = 0; i < imageValues.length; i++) {
    if (imageValues[i].editing === true) {
      for (var ci = 0; ci < data.comments.length; ci++) {
        if (data.comments[ci].imageId === imageValues[i].id) {
          data.comments.splice(ci, 1);
          imageValues[i].editing = false;
          renderImages();
        }
      }
    }
  }
}

function handleFavoriteImage(event) {
  // event.preventDefault();
  var imageIndex = findImageIndex(event.target);
  // if (!data.favorites.includes(imageValues[imageIndex])) {
  data.favorites.push(
    imageValues[imageIndex]
  );
  // }
  renderImages();
}

function viewFavorites(event) {
  imageValues = data.favorites;
  $allImages.className = 'images';
  $factsSection.className = 'facts hidden';
  topImg.className = 'column-header i';
  bottomImg.className = 'mb-10 img';
  topFact.className = 'column-header fc';
  bottomFact.className = 'mb-10 fact';
  topFav.className = 'active column-header fv';
  bottomFav.className = 'active mb-10 fav';
  renderImages();
}

function viewFacts(event) {
  $allImages.className = 'images hidden';
  $factsSection.className = 'facts';
  topFact.className = 'active column-header fc';
  bottomFact.className = 'active mb-10 fact';
  topImg.className = 'column-header i';
  bottomImg.className = 'mb-10 img';
  topFav.className = 'column-header fv';
  bottomFav.className = 'mb-10 fav';
}

function viewImages(event) {
  imageValues = [];
  $allImages.className = 'images';
  $factsSection.className = 'facts hidden';
  topImg.className = 'active column-header i';
  bottomImg.className = 'active mb-10 img';
  topFact.className = 'column-header fc';
  bottomFact.className = 'mb-10 fact';
  topFav.className = 'column-header fv';
  bottomFav.className = 'mb-10 fav';
  renderImages();
  fetchImages();
}

function fetchFacts(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://cat-fact.herokuapp.com/facts');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    factValues = xhr.response;
    renderFacts();
  });
  xhr.send();
}
fetchFacts();

function renderFacts(event) {
  var header = document.createElement('h1');
  header.textContent = 'Did you know?';
  $factsSection.appendChild(header);

  var factsContainer = document.createElement('ul');
  $factsSection.appendChild(factsContainer);

  for (var i = 0; i < factValues.length; i++) {
    var fact = document.createElement('li');
    fact.textContent = factValues[i].text;
    factsContainer.appendChild(fact);
  }
}

$navFavoritesButton.addEventListener('click', viewFavorites);
$navImagesButton.addEventListener('click', viewImages);
$navFactsButton.addEventListener('click', viewFacts);
$bottomNavImageButton.addEventListener('click', viewImages);
$bottomNavFactButton.addEventListener('click', viewFacts);
$bottomNavFavoritesButton.addEventListener('click', viewFavorites);
