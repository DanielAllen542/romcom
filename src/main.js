var newCoverImage = document.querySelector('.cover-image');
var newTitle = document.querySelector('.cover-title');
var newTaglineOne = document.querySelector('.tagline-1');
var newTaglineTwo = document.querySelector('.tagline-2');
var homePageSection = document.querySelector('.home-view');
var formViewSection = document.querySelector('.form-view');
var savedCoverSection = document.querySelector('.saved-covers-section');
var savedViewSection = document.querySelector('.saved-view ');
var homeButton = document.querySelector('.home-button');
var randomCoverButton = document.querySelector('.random-cover-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var viewSavedCoversButton = document.querySelector('.view-saved-button');
var makeNewFormButton = document.querySelector('.make-new-button');
var createUserCoverButton = document.querySelector('.create-new-book-button');

var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

homeButton.addEventListener('click', showHomeCover);
randomCoverButton.addEventListener('click', createRandomCover);
makeNewFormButton.addEventListener('click', createNewCover);
viewSavedCoversButton.addEventListener('click', displaySavedCovers);
createUserCoverButton.addEventListener('click', storeUserData);
saveCoverButton.addEventListener('click', saveCover);
savedViewSection.addEventListener('dblclick', removeSavedCover);

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
function generateCover(cover, title, tagline1, tagline2) {
  currentCover = new Cover(cover, title, tagline1, tagline2)
  newCoverImage.src = cover;
  newTitle.innerText = title;
  newTaglineOne.innerText = tagline1;
  newTaglineTwo.innerText = tagline2;
}
function loadHomePage() {
  generateCover(
    covers[getRandomIndex(covers)],
    titles[getRandomIndex(titles)],
    descriptors[getRandomIndex(descriptors)],
    descriptors[getRandomIndex(descriptors)]
  );
}
function createRandomCover() {
  loadHomePage();
}
function addHidden(arr) {
  for (var i=0; i<arr.length; i++) {
    arr[i].classList.add('hidden')
  }
}
function removeHidden(arr) {
  for (var i=0; i<arr.length; i++) {
    arr[i].classList.remove('hidden')
  }
}
function createNewCover() {
  var showList = [homeButton,formViewSection];
  var hideList = [homePageSection,randomCoverButton,saveCoverButton,savedViewSection];
  addHidden(hideList);
  removeHidden(showList);
}
function viewSavedCovers() {
  var showList = [homeButton,savedViewSection];
  var hideList = [formViewSection,homePageSection,randomCoverButton,saveCoverButton];
  addHidden(hideList);
  removeHidden(showList);
}
function showHomeCover() {
  var showList = [homePageSection,randomCoverButton,saveCoverButton];
  var hideList = [homeButton,savedViewSection,formViewSection];
  addHidden(hideList);
  removeHidden(showList);
}
function storeUserData() {
  event.preventDefault();
  var userCover = document.querySelector('#cover');
  var userTitle = document.querySelector('#title');
  var userDesc1 = document.querySelector('#descriptor1');
  var userDesc2 = document.querySelector('#descriptor2');
  currentCover = new Cover (userCover.value, userTitle.value, userDesc1.value, userDesc2.value);
  covers.push(userCover.value);
  titles.push(userTitle.value);
  descriptors.push(userDesc1.value);
  descriptors.push(userDesc2.value);
  showHomeCover();
  generateCover(currentCover.cover, currentCover.title, currentCover.tagline1, currentCover.tagline2);
}
function saveCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover)
  }
}
function displaySavedCovers() {
  viewSavedCovers();
  savedCoverSection.innerHTML = '';
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoverSection.innerHTML +=
    `<section class="mini-cover">
      <img class="cover-image" src= ${savedCovers[i].cover}>
      <h2 class="cover-title"> ${savedCovers[i].title}</h2>
      <h3 class="tagline">A tale of ${savedCovers[i].tagline1} and ${savedCovers[i].tagline2}</h3>
      <img class="price-tag" src="./assets/price.png">
      <img class="overlay" src="./assets/overlay.png">
    </section>`;
  }
}
function removeSavedCover() {
  if (event.target.classList.contains('cover-image')) {
    for (var i = 0; i < savedCovers.length; i++) {
      if (event.target.src === savedCovers[i].cover) {
        savedCovers.splice(i,1);
        event.target.closest('.mini-cover').remove();
      }
    }
  }
}
loadHomePage();
