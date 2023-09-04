// Описаний в документації
import SimpleLightbox from "simplelightbox";

// Додатковий імпорт стилів - імпортуємо CSS стилі для лайтбокса
import "simplelightbox/dist/simple-lightbox.min.css";

// Створюємо новий екземпляр лайтбокса
export let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,  // Включаємо підписи для зображень
  captionsData: 'alt', // Вказуємо, що дані для підписів беруться з атрибуту 'alt' зображення
  captionDelay: 250, // Затримка перед показом підпису (у мілісекундах)
});
