// Імпортуємо бібліотеку Axios для здійснення HTTP-запитів
import axios from 'axios';

// Визначаємо константи для базового URL та ключа API
const BASE_URL = "https://pixabay.com/api/";
const KEY = "39168194-caf31c4785fb07e962fbb3d97";

// Визначаємо асинхронну функцію 'searchFoto', яка приймає параметри для пошуку
export async function searchFoto(q, page, per_page) {
    // Складаємо URL для запиту, включаючи ключ API та інші параметри
    const url = `${BASE_URL}?key=${KEY}&q=${q}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`;

    // Відправляємо GET-запит до вказаного URL за допомогою Axios і очікуємо на відповідь
    const resp = await axios.get(url);

    // Розкоментуйте наступний рядок, якщо потрібно перевірити відповідь в консолі
    console.log(resp);

    // Повертаємо дані з відповіді у вигляді об'єкта
    return resp.data;
};
