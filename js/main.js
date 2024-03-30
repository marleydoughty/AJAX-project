/* global data */
/* exported data */
const $allImages = document.querySelector('.images');
const $topNavFavorites = document.querySelector('.favorites-link');
const $topNavFacts = document.querySelector('.facts-link');
const $topNavImages = document.querySelector('.images-link');
const $bottomNavImages = document.querySelector('.bottom-nav-item.img');
const $bottomNavFacts = document.querySelector('.bottom-nav-item.fact');
const $bottomNavFavorites = document.querySelector('.bottom-nav-item.fave');
const $factsSection = document.querySelector('.facts');
const topImg = document.querySelector('.top-nav-item.img');
const topFav = document.querySelector('.top-nav-item.fave');
const topFact = document.querySelector('.top-nav-item.fact');
const bottomImg = document.querySelector('.bottom-nav-item.img');
const bottomFav = document.querySelector('.bottom-nav-item.fave');
const bottomFact = document.querySelector('.bottom-nav-item.fact');
const $loadingScreen = document.querySelector('.loading-screen');
let imageValues = [];
let factValues = [];

async function fetchImages() {
  try {
    $loadingScreen.classList.remove('hidden');
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=100&page=0');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    imageValues = await response.json();
    renderImages();
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    $loadingScreen.classList.add('hidden');
  }
}

function renderImages() {
  $allImages.innerHTML = '';
  imageValues.forEach(imageValue => {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.setAttribute('data-id', imageValue.id);
    $allImages.appendChild(imageContainer);

    const image = document.createElement('img');
    image.setAttribute('src', imageValue.url);
    imageContainer.appendChild(image);

    const commentObj = data.comments.find(comment => comment.imageId === imageValue.id);
    const commentOutput = document.createElement('p');
    if (commentObj) {
      commentOutput.textContent = commentObj.textValue;
      imageContainer.classList.add('row', 'sb');
    }
    imageContainer.appendChild(commentOutput);

    const commentContainer = document.createElement('div');
    commentContainer.className = 'comment-container';
    imageContainer.appendChild(commentContainer);

    const commentForm = document.createElement('div');
    commentForm.className = imageValue.editing ? 'comment-form' : 'comment-form hidden';
    commentContainer.appendChild(commentForm);

    const form = document.createElement('form');
    form.setAttribute('id', 'form-input');
    form.setAttribute('name', 'comment');
    form.addEventListener('submit', handleSaveComment);
    commentForm.appendChild(form);

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add comments here';
    commentInput.id = 'comment-input';
    if (imageValue.editing) {
      commentOutput.classList.add('hidden');
      commentInput.value = commentOutput.textContent;
    }
    form.appendChild(commentInput);

    const buttonRow = document.createElement('div');
    buttonRow.className = 'row sb';
    form.appendChild(buttonRow);

    const deleteComment = document.createElement('input');
    deleteComment.type = 'button';
    deleteComment.value = 'Delete';
    deleteComment.id = 'delete-button';
    deleteComment.addEventListener('click', handleDeleteComment);
    buttonRow.appendChild(deleteComment);

    const saveComment = document.createElement('input');
    saveComment.type = 'submit';
    saveComment.value = 'Save';
    saveComment.id = 'save-button';
    buttonRow.appendChild(saveComment);

    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'icons-container';
    commentContainer.appendChild(iconsContainer);

    const commentIcon = document.createElement('i');
    commentIcon.className = 'far fa-comment';
    commentIcon.addEventListener('click', clickedCommentIcon);
    iconsContainer.appendChild(commentIcon);

    const favoriteIcon = document.createElement('i');
    favoriteIcon.className = data.favorites.includes(imageValue) ? 'fas fa-heart fave-heart' : 'far fa-heart outline-heart';
    favoriteIcon.addEventListener('click', handleFavoriteImage);
    iconsContainer.appendChild(favoriteIcon);
  });
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
  var imageIndex = findImageIndex(event.target);
  if (!data.favorites.includes(imageValues[imageIndex])) {
    data.favorites.push(
      imageValues[imageIndex]
    );
  }
  renderImages();
}

function viewFavorites(event) {
  imageValues = data.favorites;
  $allImages.className = 'images';
  $factsSection.className = 'facts hidden';
  topImg.className = 'top-nav-item img';
  bottomImg.className = 'bottom-nav-item img';
  topFact.className = 'top-nav-item fact';
  bottomFact.className = 'bottom-nav-item fact';
  topFav.className = 'active top-nav-item fave';
  bottomFav.className = 'active bottom-nav-item fave';
  renderImages();
}

function viewFacts(event) {
  $allImages.className = 'images hidden';
  $factsSection.className = 'facts';
  topFact.className = 'active top-nav-item fact';
  bottomFact.className = 'active bottom-nav-item fact';
  topImg.className = 'top-nav-item img';
  bottomImg.className = 'bottom-nav-item img';
  topFav.className = 'top-nav-item fave';
  bottomFav.className = 'bottom-nav-item fave';
}

function viewImages(event) {
  imageValues = [];
  $allImages.className = 'images';
  $factsSection.className = 'facts hidden';
  topImg.className = 'active top-nav-item img';
  bottomImg.className = 'active bottom-nav-item img';
  topFact.className = 'top-nav-item fact';
  bottomFact.className = 'bottom-nav-item fact';
  topFav.className = 'top-nav-item fave';
  bottomFav.className = 'bottom-nav-item fave';
  renderImages();
  fetchImages();
}

async function fetchFacts() {
  try {
    const response = await fetch('https://cat-fact.herokuapp.com/facts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    factValues = await response.json();
    renderFacts();
  } catch (error) {
    console.error('Error fetching facts:', error);
  }
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

$topNavFavorites.addEventListener('click', viewFavorites);
$topNavImages.addEventListener('click', viewImages);
$topNavFacts.addEventListener('click', viewFacts);
$bottomNavImages.addEventListener('click', viewImages);
$bottomNavFacts.addEventListener('click', viewFacts);
$bottomNavFavorites.addEventListener('click', viewFavorites);
