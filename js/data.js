/* exported data */
var data = {
  view: 'images',
  favorites: [],
  comments: [],
  editing: null,
  imageId: 1
};
var previousData = localStorage.getItem('data-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
function stringifyData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}
window.addEventListener('beforeunload', stringifyData);
