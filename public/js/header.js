const body = document.querySelector('body');
const header = document.querySelector('.header');
const mainNavToggle = document.querySelector('.toggle__main__nav');
const mobileNav = document.getElementById('mobile-nav');
const destopNav = document.getElementById('destop-nav');
const pathNames = window.location.pathname.split('/').slice(1);
const navLinks = [
  {
    text: 'Hem',
    link: '',
  },
  {
    text: 'Album',
    link: 'albums',
  },
  {
    text: 'Om',
    link: '#om',
  },
  {
    text: 'Kontakt',
    link: '#kontakt',
  },
];
const navButtons = [
  {
    text: 'Logga in',
    link: '/signin',
    buttonType: 'fill',
  },
];

navLinks.forEach((linkObj) => {
  createNavLink(linkObj, mobileNav);
  createNavLink(linkObj, destopNav);
});

function createNavLink(linkObj, ulElement) {
  const { text, link } = linkObj;
  const linkLi = document.createElement('li');
  const linkA = document.createElement('a');

  if (pathNames.includes(link)) {
    linkLi.classList.add('font-semibold');
  }
  linkLi.classList.add('h-10', 'flex', 'justify-center', 'items-center');

  linkA.href = `/${link}`;
  linkA.appendChild(document.createTextNode(text));
  linkLi.appendChild(linkA);
  ulElement.appendChild(linkLi);
}

navButtons.forEach((buttonObj) => {
  createNavButton(buttonObj, mobileNav);
  createNavButton(buttonObj, destopNav);
});

function createNavButton(buttonObj, ulElement) {
  const { text, link, buttonType = 'outline' } = buttonObj;
  const linkLi = document.createElement('li');
  const linkA = document.createElement('a');

  if (buttonType === 'outline') {
    linkLi.classList.add(
      'border-2',
      'h-10',
      'flex',
      'justify-center',
      'items-center',
      'px-3',
      'text-red-800',
      'border-red-800',
      'rounded'
    );
  } else if (buttonType === 'fill') {
    linkLi.classList.add(
      'bg-red-800',
      'h-10',
      'flex',
      'justify-center',
      'items-center',
      'px-3',
      'rounded'
    );
  }

  if (pathNames.slice(1).includes(link)) {
    linkLi.classList.add('font-semibold');
  }

  linkA.href = `/${link}`;
  linkA.appendChild(document.createTextNode(text));
  linkLi.appendChild(linkA);
  ulElement.appendChild(linkLi);
}

function setMobileNavState(status) {
  if (status) {
    document.querySelector('.fas.fa-times').classList.remove('hidden');
    document.querySelector('.fas.fa-bars').classList.add('hidden');
    mobileNav.classList.add('block');
    mobileNav.classList.remove('hidden');
  } else {
    document.querySelector('.fas.fa-times').classList.add('hidden');
    document.querySelector('.fas.fa-bars').classList.remove('hidden');
    mobileNav.classList.remove('block');
    mobileNav.classList.add('hidden');
  }
}
