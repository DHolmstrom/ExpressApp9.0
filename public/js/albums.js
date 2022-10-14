const albumsGrid = document.getElementById('album-grid');

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

  const albumImageGroup = document.createElement('div');
  albumImageGroup.classList.add(
    'flex',
    'flex-col',
    'flex-grow',
    'justify-center',
    'items-center'
  );
  albumImageGroup.appendChild(albumCoverImg);

  const albumCoverTitle = document.createElement('h3');
  albumCoverTitle.classList.add('text-lg', 'font-semibold');
  albumCoverTitle.appendChild(document.createTextNode(title));

  const albumCoverInfo = document.createElement('p');
  albumCoverInfo.classList.add();
  albumCoverInfo.appendChild(document.createTextNode(subTitle));

  const albumTextGroup = document.createElement('div');
  albumTextGroup.classList.add('flex', 'flex-col', 'gap-1');
  albumTextGroup.appendChild(albumCoverTitle);
  albumTextGroup.appendChild(albumCoverInfo);

  const albumCoverA = document.createElement('a');
  albumCoverA.href = `/albums/${_id}`;
  albumCoverA.classList.add(
    'bg-[#999999]',
    'py-4',
    'px-4',
    'flex',
    'flex-col',
    'justify-between',
    'items-center',
    'gap-4'
  );

  albumCoverA.appendChild(albumImageGroup);
  albumCoverA.appendChild(albumTextGroup);
  albumsGrid.appendChild(albumCoverA);
}
