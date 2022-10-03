const albumsGrid = document.querySelector('.albums__grid');

fetch('/api/albums')
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res.forEach((album) => {
      const {
        _id,
        title = '',
        subTitle = '',
        images: { filename, tags = [] },
      } = album;
      var albumCoverImg = document.createElement('img');
      albumCoverImg.src = `/images/lowres/${filename}`;
      albumCoverImg.alt = `${tags.join(', ')}`;
      var albumCoverTitle = document.createElement('h6');
      albumCoverTitle.classList.add('album__title');
      albumCoverTitle.appendChild(document.createTextNode(title));
      var albumCoverInfo = document.createElement('p');
      albumCoverInfo.appendChild(document.createTextNode(subTitle));
      var albumCoverA = document.createElement('a');
      albumCoverA.href = `/albums/${_id}`;
      albumCoverA.classList.add('album');
      albumCoverA.appendChild(albumCoverImg);
      albumCoverA.appendChild(albumCoverTitle);
      albumCoverA.appendChild(albumCoverInfo);
      albumsGrid.appendChild(albumCoverA);
    });
  });
