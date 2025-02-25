## Teстовое задание для разработчика

Сделать список/таблицу с тестовыми значениями от 1 до 1 000 000 со следующим функционалом:

- Каждая строка должна иметь функционал выбора (галочкой, или иным способом), в том числе множественного выбора (несколько строк);
- Фильтрация поиском;
- Сортировка элементов (Drag&Drop);
- Сортировка отфильтрованного через поиск результата;
- При количестве элементов больше 20, он не должен загружать их все сразу, а подгружать их при скролле по 20 шт;
- При перезагрузке страницы выбранные и отсортированные элементы должны отображаться в том порядке, в котором они были до обновления страницы, но не более 20, остальные должны опять подгружаться при скролле.
- Результаты сортировки и выбора должны хранится на сервере (база не нужна, достаточно хранить во время жизни приложения);
- В результатах поиска тоже должно быть не более 20 элементов, остальные подгружаются при скроле результатов поиска.

Бэк: express
Фронт: react

## Запуск: установить зависимости (npm i) в родительской папке, а также в папке backend

## Запуск бекенда: cd ./backend node server.js

## Запуск фронта: cd ../frontend npm start
