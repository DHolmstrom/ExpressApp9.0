const body = document.querySelector('body');
const header = document.querySelector('.header');
const mainNavToggle = document.querySelector('.toggle__main__nav');
if (mainNavToggle) {
  mainNavToggle.addEventListener('click', () => {
    body.classList.toggle('open_nav');
    header.classList.toggle('open_nav');
  });
}
