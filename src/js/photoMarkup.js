// Імпорт об'єкта 'elem' з іншого модуля 'elements'
import { elem } from "./elements";

// Деструктуризація об'єкту 'elem' для отримання властивості 'galleryPhotos'
const { galleryPhotos } = elem;

// Визначення функції 'photoMarkup', яка створює розмітку для фотографій і вставляє її в DOM
export function photoMarkup(searchImages) {
    // Використовуємо метод 'map' для створення масиву рядків з розміткою для кожної фотографії
    const arrImages = searchImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
            <a class="link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b><i>Likes: ${likes}</i></b>
                </p>
                <p class="info-item">
                    <b><i>Views: ${views}</i></b>
                </p>
                <p class="info-item">
                    <b><i>Comments: ${comments}</i></b>
                </p>
                <p class="info-item">
                    <b><i>Downloads: ${downloads}</i></b>
                </p>
            </div>
        </div>`
    }).join(''); // Об'єднуємо всі рядки розмітки в один рядок

    // Вставляємо створену розмітку в кінець DOM-елемента 'galleryPhotos'
    galleryPhotos.insertAdjacentHTML("beforeend", arrImages);
}
