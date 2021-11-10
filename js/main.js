var $images = document.querySelector('.images');
function getData(image) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=100&page=0');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr status:', xhr.status);
    // console.log('xhr response:', xhr.response);
    for (var i = 0; i < xhr.response.length; i++) {
      var image = document.createElement('img');
      image.setAttribute('src', xhr.response[i].url);
      $images.appendChild(image);
    }
  });
  xhr.send();
}

getData();
