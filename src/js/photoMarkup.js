import { elem } from "./elements";
const { galleryPhotos } = elem;

export function photoMarkup(searchImages) {
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
    }).join('');
    galleryPhotos.insertAdjacentHTML("beforeend", arrImages);
}