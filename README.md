# yalantis-intern

Настройка сервера:
npm init
npm i -D concurrently nodemon
npm i express cors sequelize sqlite3

Настройка клиентской части:
В консоле переходим в папку /client/
npm init
npm react react-bootstrap react-dom react-router-dom
npm i axios cors mobx mobx-react-lite

В базе данных предустановлен пользователь с админ-правами (имя: Ник, фамилия: Бог).
Зарегестрировавшись как админ, на странице /user будет кнопка "Разыграть" для старта игры.
Участники могут вводить информацию только на русском языке.
