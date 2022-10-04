const albumsGrid = document.querySelector('.albums__grid');

fetch('/api/albums')
  .then((res) => res.json())
  .then((res) => {
    res.forEach(createAlbumItem);
  });

function createAlbumItem(album) {
  const {
    _id,
    title = '',
    subTitle = '',
    images: { filename, tags = [] },
  } = album;
  const albumCoverImg = document.createElement('img');
  albumCoverImg.src = `/images/lowres/${filename}`;
  albumCoverImg.alt = `${tags.join(', ')}`;

  const albumCoverTitle = document.createElement('h6');
  albumCoverTitle.classList.add('album__title');
  albumCoverTitle.appendChild(document.createTextNode(title));

  const albumCoverInfo = document.createElement('p');
  albumCoverInfo.appendChild(document.createTextNode(subTitle));

  const albumCoverA = document.createElement('a');
  albumCoverA.href = `/albums/${_id}`;
  albumCoverA.classList.add('album');

  albumCoverA.appendChild(albumCoverImg);
  albumCoverA.appendChild(albumCoverTitle);
  albumCoverA.appendChild(albumCoverInfo);
  albumsGrid.appendChild(albumCoverA);
}
