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
let currentView = 'all';

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
  const imagesToRender = currentView === 'favorites' ? data.favorites : imageValues;
  const imagesHTML = imagesToRender.map(imageValue => {
    const commentObj = data.comments.find(comment => comment.imageId === imageValue.id);
    const isFavorite = data.favorites.includes(imageValue);
    const commentHTML = commentObj ? `<p>${commentObj.textValue}</p>` : '';
    const editingClass = imageValue.editing ? 'comment-form' : 'comment-form hidden';
    const favoriteClass = isFavorite ? 'fas fa-heart fave-heart' : 'far fa-heart outline-heart';

    return `
    <div class="frame">
      <div class="image-container" data-id="${imageValue.id}">
        <img src="${imageValue.url}">
        ${commentHTML}
        <div class="comment-container">
          <div class="${editingClass}">
            <form id="form-input" name="comment">
              <input type="text" placeholder="Add comments here" id="comment-input" value="${commentObj ? commentObj.textValue : ''}">
              <div class="row sb">
                <input type="button" value="Delete" id="delete-button">
                <input type="submit" value="Save" id="save-button">
              </div>
            </form>
          </div>
          <div class="icons-container">
            <i class="far fa-comment"></i>
            <i class="${favoriteClass}"></i>
          </div>
        </div>
      </div>
      </div>
    `;
  }).join('');

  $allImages.innerHTML = imagesHTML;

  imagesToRender.forEach(imageValue => {
    const imageContainer = $allImages.querySelector(`.image-container[data-id="${imageValue.id}"]`);
    imageContainer.querySelector('.fa-comment').addEventListener('click', clickedCommentIcon);
    imageContainer.querySelector('.fa-heart').addEventListener('click', handleFavoriteImage);
    imageContainer.querySelector('form').addEventListener('submit', handleSaveComment);
    imageContainer.querySelector('#delete-button').addEventListener('click', handleDeleteComment);
  });
}

fetchImages();

function findImageIndex(target) {
  const closestImageContainer = target.closest('.frame');
  return Array.from($allImages.children).indexOf(closestImageContainer);
}

function clickedCommentIcon(event) {
  if (event.target && event.target.tagName === 'I') {
    const imageIndex = findImageIndex(event.target);
    if (imageIndex !== undefined) {
      imageValues[imageIndex].editing = !imageValues[imageIndex].editing;
      renderImages();
    }
  }
}

function handleSaveComment(event) {
  event.preventDefault();
  const textValue = event.target.querySelector('input').value;
  const closestImageContainer = event.target.closest('.image-container');
  const imageId = closestImageContainer.getAttribute('data-id');

  const imageIndex = findImageIndex(event.target);
  if (imageIndex !== undefined) {
    imageValues[imageIndex].editing = false;
    data.comments.push({
      textValue,
      imageId
    });
  }
  renderImages();
}

function handleDeleteComment(event) {
  imageValues.forEach((image, index) => {
    if (image.editing) {
      const commentIndex = data.comments.findIndex(comment => comment.imageId === image.id);
      if (commentIndex !== -1) {
        data.comments.splice(commentIndex, 1);
      }
      imageValues[index].editing = false;
    }
  });
  renderImages();
}

function handleFavoriteImage(event) {
  const imageIndex = findImageIndex(event.target);
  const image = imageValues[imageIndex];
  if (data.favorites.includes(image)) {
    data.favorites = data.favorites.filter(favImage => favImage !== image);
  } else {
    data.favorites.push(image);
  }
  renderImages();
}

function viewFavorites(event) {
  currentView = 'favorites';
  imageValues = [...data.favorites];
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
  currentView = 'all';
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
