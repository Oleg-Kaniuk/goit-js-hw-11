import './styles.css' // Імпортуємо стилі з файлу 'styles.css'
import { elem } from './js/elements'; // Імпортуємо об'єкт 'elem' з модуля './js/elements'
import { photoMarkup } from './js/photoMarkup'; // Імпортуємо функцію 'photoMarkup' з модуля './js/photoMarkup'
import { searchFoto } from './js/pixabay'; // Імпортуємо функцію 'searchFoto' з модуля './js/pixabay'
import { lightbox } from './js/simplelightbox'; // Імпортуємо об'єкт 'lightbox' з модуля './js/simplelightbox'

import { Notify } from 'notiflix/build/notiflix-notify-aio'; // Імпортуємо об'єкт 'Notify' з бібліотеки 'notiflix'

const { btnLoadMore, galleryPhotos, formSearch } = elem; // Деструктуризуємо об'єкт 'elem' для отримання конкретних DOM-елементів

// Ініціалізуємо змінні для відстеження номеру сторінки, кількості фотографій на сторінці та пошукового запиту
let page = 1;
const per_page = 40;
let searchWord = '';

btnLoadMore.classList.add('is-hidden'); // Додаємо клас 'is-hidden' до кнопки завантаження 'btnLoadMore', щоб спочатку приховати її
formSearch.addEventListener('submit', onSubmitSearchForm); // Додаємо обробник події 'submit' до форми пошуку 'formSearch'

// Обробник події для подання форми пошуку
function onSubmitSearchForm(evt) {
    evt.preventDefault(); // Передбачаємо дефолтну дію форми
    galleryPhotos.innerHTML = ''; // Очищаємо вміст галереї фотографій 'galleryPhotos'
    page = 1; // Скидаємо номер сторінки на початок
    const { searchQuery } = evt.currentTarget.elements; // Отримуємо значення пошукового запиту з елементів форми
    // console.log(evt.currentTarget.elements);
    searchWord = searchQuery.value.trim().toLowerCase();

    // Перевіряємо, чи пошуковий запит не є порожнім
    if (searchWord === '') {
        // Якщо порожній, приховуємо кнопку завантаження і показуємо повідомлення
        btnLoadMore.classList.add('is-hidden');
        Notify.info('Enter your request, please!');
        return;
    }

        // Викликаємо функцію пошуку фотографій 'searchFoto' і передаємо параметри
searchFoto(searchWord, page, per_page)
    .then(data => {
        // console.log(data);
        // Виконуємо пошук фотографій за допомогою функції 'searchFoto' з переданими параметрами.

        // Отримуємо дані результатів пошуку, які приходять у вигляді об'єкта 'data'.

        // Отримуємо масив фотографій з властивості 'hits' об'єкта 'data'.
        const searchImages = data.hits;

        // Перевіряємо, чи результати пошуку містять фотографії.
        if (data.totalHits === 0) {
            // Якщо результати порожні, показуємо повідомлення про відсутність результатів.
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            // Якщо є результати, виводимо інформаційне повідомлення про кількість знайдених фотографій.
            Notify.info(`Hooray! We found ${data.totalHits} images.`);

            // Викликаємо функцію 'photoMarkup', яка створює розмітку для фотографій і вставляє її в DOM.
            photoMarkup(searchImages);

            // Оновлюємо лайтбокс (вікно для перегляду фотографій).
            lightbox.refresh();
        };

        // Перевіряємо, чи загальна кількість знайдених фотографій більше, ніж кількість фотографій на сторінці.
        if (data.totalHits > per_page) {
            // Якщо так, показуємо кнопку "Завантажити більше".
            btnLoadMore.classList.remove('is-hidden');
        } 

        // Перевіряємо, чи загальна кількість знайдених фотографій менше або дорівнює кількість фотографій на сторінці.
        if (data.totalHits <= per_page) {
            // Якщо так, виводимо інформаційне повідомлення про досягнення кінця результатів.
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    })
    .catch(onError); // Обробка помилок, якщо запит не вдається виконати успішно.

// Додаємо обробник події для кнопки "Завантажити більше".
btnLoadMore.addEventListener('click', onClickLoadMore);

// Скидаємо форму (очищаємо поля вводу).
evt.currentTarget.reset();

};

// Обробник події для кнопки завантаження більше фотографій
function onClickLoadMore() {
    page += 1; // Збільшуємо номер сторінки

    // Викликаємо функцію пошуку фотографій 'searchFoto' з новим номером сторінки
    searchFoto(searchWord, page, per_page)
        .then(data => {
            // Отримуємо дані результатів пошуку, які приходять у вигляді об'єкта 'data'

            // Отримуємо масив фотографій з властивості 'hits' об'єкта 'data'
            const searchImages = data.hits;

            // Визначаємо кількість сторінок результатів шляхом ділення загальної кількості результатів на кількість фотографій на сторінці
            const numberPage = Math.ceil(data.totalHits / per_page);

            // Викликаємо функцію 'photoMarkup', яка створює розмітку для фотографій і вставляє її в DOM
            photoMarkup(searchImages);

            // Перевіряємо, чи це остання сторінка результатів
            if (page === numberPage) {
                // Якщо так, приховуємо кнопку завантаження і показуємо інформаційне повідомлення
                btnLoadMore.classList.add('is-hidden');
                Notify.info("We're sorry, but you've reached the end of search results.");

                // Видаляємо обробник події для кнопки "Завантажити більше", так як більше сторінок для завантаження немає
                btnLoadMore.removeEventListener('click', onClickLoadMore);
            }

            // Оновлюємо лайтбокс (вікно для перегляду фотографій)
            lightbox.refresh();
        })
        .catch(onError); // Обробляємо помилки, якщо запит не вдається виконати успішно
};

// Обробник помилок під час виконання запитів
function onError() {
    // Виводимо повідомлення про помилку, яке буде видимим для користувача.
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