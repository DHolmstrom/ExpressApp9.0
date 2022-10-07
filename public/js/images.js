const albumsGrid = document.querySelector('.albums__grid');
const albumTitle = document.getElementById('album-title');
const albumSubTitle = document.getElementById('album-sub-title');
const popupImage = document.getElementById('popup-image');
const popupContainer = document.getElementById('popup-container');
const popupimageDownload = document.getElementById('popup-image-download');
const popupAlbumLink = document.getElementById('popup-album-link');
const popupTags = document.getElementById('popup-tags');
const popupFilename = document.getElementById('popup-filename');
const popupFilenameTextArea = document.getElementById(
  'popup-filename-text-area'
);
const htmlBody = document.querySelector('body');

albumInfo = {};
activeImageIndex = 0;
albumId = window.location.pathname.split('/').pop();

fetch(`/api/albums/${albumId}`)
  .then((res) => res.json())
  .then((res) => {
    if (res === []) {
      return noAlbumAvailable();
    }
    albumInfo = res;
    const { title, subTitle, images } = res;
    albumTitle.innerText = title;
    albumSubTitle.innerText = subTitle;
    images?.forEach(createImageItem);
  });

popupContainer.addEventListener('click', function (e) {
  if (e.target.id !== 'popup-container') {
    return;
  }
  setPopupview(false);
});

function createImageItem(image) {
  const { _id, tags = [], filename } = image;
  var albumCoverImg = document.createElement('img');
  albumCoverImg.src = `/images/lowres/${filename}`;
  albumCoverImg.alt = `${tags.join(', ')}`;
  albumCoverImg.defer = true;

  var albumCoverA = document.createElement('div');
  albumCoverA.onclick = updatePopupImage(_id);
  albumCoverA.classList.add('album');

  albumCoverA.addEventListener('click', function () {
    updatePopupImage(_id);
    setPopupview(true);
  });

  albumCoverA.appendChild(albumCoverImg);
  albumsGrid.appendChild(albumCoverA);
}

function updatePopupImage(imageId) {
  const activeImage = albumInfo.images.filter((image, index) => {
    if (image._id === imageId) {
      activeImageIndex = index;
      return true;
    }
  })[0];
  const { tags = [], filename } = activeImage;
  const path = `/images/lowres/${filename}`;
  const tagsString = tags.join(', ');
  popupImage.src = path;
  popupimageDownload.href = path;
  popupImage.alt = tagsString;
  popupTags.innerText = tagsString;
  popupFilename.innerText = filename;
  popupFilenameTextArea.innerText = filename;
}

function setPopupview(status) {
  if (status) {
    popupContainer.classList.remove('hidden');
    popupContainer.classList.add('flex');
    htmlBody.classList.add('overflow-y-hidden');
    htmlBody.classList.add('h-screen');
    document.addEventListener('keydown', popupEventListener);
    return;
  }
  popupContainer.classList.add('hidden');
  popupContainer.classList.remove('flex');
  htmlBody.classList.remove('overflow-y-hidden');
  htmlBody.classList.remove('h-screen');
  document.removeEventListener('keydown', popupEventListener);
}

function popupEventListener(event) {
  if (event.code === 'Escape') {
    setPopupview(false);
  } else if (event.code === 'ArrowRight') {
    nextPopupImage();
  } else if (event.code === 'ArrowLeft') {
    prevPopupImage();
  }
}

function nextPopupImage() {
  updatePopupImage(
    albumInfo.images[
      Math.min(activeImageIndex + 1, albumInfo.images.length - 1)
    ]._id
  );
}

function prevPopupImage() {
  updatePopupImage(albumInfo.images[Math.max(activeImageIndex - 1, 0)]._id);
}

function noAlbumAvailable() {
  albumTitle.innerText = 'Hittade bilder';
}
