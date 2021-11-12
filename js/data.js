/* exported data */
var data = {
  view: 'images',
  comments: [{
    imageId: '',
    textValue: ''
  }],
  favorites: [
    {
      src: '',
      imageId: 1
    }
  ],
  editing: null
};
// var previousData = localStorage.getItem('image-local-storage');
// if (previousData !== null) {
//   data = JSON.parse(previousData);
// }
function stringifyData(event) {
  var imagesJSON = JSON.stringify(data);
  localStorage.setItem('image-local-storage', imagesJSON);
}
window.addEventListener('beforeunload', stringifyData);
