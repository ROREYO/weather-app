const apiKey = "484b5de30b844f49b41141438232401";

/* Элементы на странице */
const header = document.querySelector(".header");
const form = document.querySelector(".form");
const input = document.querySelector(".input");

// Слушаем отправку формы
form.onsubmit = function (e) {
  // Отменяем обновление страницы
  e.preventDefault();

  // Берем значение из инпута и обрезаем пробелы
  let city = input.value.trim();

  // Делаем запрос на сервер
  // Аддрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  // Выполняем запрос
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error) {
        // Если ошибка есть - выводим ее
        // Удаляем старые карточки на странице
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        const html = `<div class="card">${data.error.message}</div>`;

        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      } else {
        // Если ошибки нет - выводим карточку
        // Отображаем полученные данные в карточке
        // Разметка для карточки

        const html = `   
      <div class="card">
          <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

          <div class="card-weather">
              <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
              <img class="card-img" src="./img/example.png" alt="Weather" />
          </div>

          <div class="card-discription">${data.current.condition.text}</div>
      </div>`;

        // Удаляем старые карточки на странице
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      }
    });
};
