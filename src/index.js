import './styles.css'
import { elem } from './js/elements';
import { photoMarkup } from './js/photoMarkup';
import { searchFoto } from './js/pixabay';
import { lightbox } from './js/simplelightbox'; 

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { btnLoadMore, galleryPhotos, formSearch } = elem;

let page = 1;
const per_page = 40;
let searchWord = '';

btnLoadMore.classList.add('is-hidden');
formSearch.addEventListener('submit', onSubmitSearchForm);

function onSubmitSearchForm(evt) {
    evt.preventDefault();
    galleryPhotos.innerHTML = '';
    page = 1;
    const { searchQuery } = evt.currentTarget.elements;
    searchWord = searchQuery.value.trim().toLowerCase();

    if (searchWord === '') {
        btnLoadMore.classList.add('is-hidden');
        Notify.info('Enter your request, please!');
        return;
    }

searchFoto(searchWord, page, per_page)
    .then(data => {
        const searchImages = data.hits;
        if (data.totalHits === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            Notify.info(`Hooray! We found ${data.totalHits} images.`);
            photoMarkup(searchImages);
            lightbox.refresh();
        };
        if (data.totalHits > per_page) {
            btnLoadMore.classList.remove('is-hidden');
            // window.addEventListener('scroll', onLoadNewPage)
        } 
        if (data.totalHits <= per_page) {
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    })
    .catch(onError);

    btnLoadMore.addEventListener('click', onClickLoadMore);

    evt.currentTarget.reset();
};

function onClickLoadMore() {
    page += 1;
    searchFoto(searchWord, page, per_page)
        .then(data => {
            const searchImages = data.hits;
            const numberPage = Math.ceil(data.totalHits / per_page);
            photoMarkup(searchImages);

            if (page === numberPage) {
                btnLoadMore.classList.add('is-hidden');
                Notify.info("We're sorry, but you've reached the end of search results.");
                btnLoadMore.removeEventListener('click', onClickLoadMore);
                // window.removeEventListener('scroll', onLoadNewPage);
            };
            lightbox.refresh();
        })
        .catch(onError);
};

function onError() {
    Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!');
};

// function onLoadNewPage() {
//     if (checkIfEndOfPage()) {
//         onClickLoadMore();
//     };
// };

// function checkIfEndOfPage() {
//   return (
//     window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
//   );
// }