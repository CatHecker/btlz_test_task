# Тестовое задание

## Описание

Сервис, который реализует логику обращения по расписанию к маркетплейсу Wildberries через заданный Endpoint, получает и ежедневно накапливает в базе данных информацию, получаемую по api, и выдает ее в произвольное количество google-таблиц.

Сервис, написан на основе шаблона btlz-wb-test

Для полноценной работы приложения не забудьте создать файлы .env и credentials.json, их содержимое направил вам в личных сообщениях на HH!

Для того, чтобы прикрепить новую google таблицу, нужно:
1) Создать таблицу, назвать лист "stocks_coefs" и дать право редактирования пользователю test-task@caramel-era-435207-r3.iam.gserviceaccount.com 
2) Из ссылки вынести sheet_id, он будет находится между d/ и /edit, пример: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit?gid=0#gid=0
3) Прописать команду, вставив sheet_id: `npx tsx ./src/googlesheets/update_key.ts --value {SHEET_ID}`

Все id google таблиц записаны в файле sheet_ids.txt

Для запуска приложения достаточно использовать `docker compose up`, не забудьте про файлы .env и credentials.json перед запуском!

## Прочие команды:

Заменить google таблицу на новую:
```bash
npx tsx ./src/googlesheets/update_key.ts --value {SHEET_ID}
```

Запуск базы данных:
```bash
docker compose up -d --build postgres
```

Для выполнения миграций и сидов не из контейнера:
```bash
npm run knex:dev migrate latest
```

```bash
npm run knex:dev seed run
```
Также можно использовать и остальные команды (`migrate make <name>`,`migrate up`, `migrate down` и т.д.)

Для запуска приложения в режиме разработки:
```bash
npm run dev
```

Запуск проверки самого приложения:
```bash
docker compose up -d --build app
```

Для финальной проверки рекомендую:
```bash
docker compose down --rmi local --volumes
docker compose up --build
```

PS: С наилучшими пожеланиями! 
