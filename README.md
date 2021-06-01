Ориентировочное время выполнения 4-8 часов

Разработать SPA приложение по заданию ниже. 
В качестве фреймворка предпочтительнее использовать vue.js. Но также рассматриваем кандидатов с выполненным заданием на react или angular.
В качетсве сборщика предпочтительнее использовать Webpack.


--- ПРИЛОЖЕНИЕ и ЯДРО ---

Разработать родительское приложение, которое послужит контейнером для подключения дочерних блоков с бизнес-логикой.
В состав контейнера должны войти хидер с меню из двух страниц и область для загрузки контента под каждую страницу (блоков).
Контент дочерних блоков должен подгружаться динамически с отложенной загрузкой (отдельным бандлом). 

Далее необходимо разработать мини-ядро, которое будет грузиться вместе с родительским приложенияем и иметь api для загрузки дополнительных плагинов. Ядро должно быть доступно из кода каждой страницы родительского приложения.

Первым плагином ядра является плагин, реализующий паттерн шина данных. Он реализует в себе глобальную на уровне приложения шину данных. Каждый компонент системы может писать в нее события или читать их из нее (посредством подписки).

Вторым плагином ядра будет плагин, реализующий SDK для взимодействия с биржей binance (только 2 метода: получить биржевой стакан по определенному символу по REST и подписаться на обновления стакана по WS). (См. раздел Diff. Depth Stream в документации: https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md).


--- GUI КОМПОНЕНТЫ ---

В приложении на первой странице расположить компонент, который при помощи плагина ядра "SDK" забирает состояние стакана по определенному символу с биржи binance (можно применить limit=500, чтобы не тянуть стакан на всю глубину), подключается на обновления данных по ws для этого символа (по умолчанию берется по BTCUSDT) и отрисовывает стакан в подобном формате

|----------|----------|----------||----------|----------|----------|
|--Amount--|--Price---|--Total---||--Amount--|--Price---|--Total---|
|----------|----------|----------||----------|----------|----------|
|   ...    |   ...    |   ...    ||   ...    |   ...    |   ...    |

Где левые три колонки относятся к ордерам тиба Bid, правые к ордерам типа Ask. 
Price и Amount (Quantity) получаются из binance. Total рассчитывается на клиенте как Price * Amount.


Для верстки желательно использовать правила именования по БЭМу.
Цвета и отступы можно использовать на свой вкус.

Верстка должа быть резиновая и адаптивная для мобилки и десктопа. Breakpoint можно выбрать самостоятельно.
В мобильной версии отображать только колонки с Price и Amount.


Таблица должна помещаться по вертикали на странице (без скрола на страница) и должна содержать свой скрол-бар.
Скролл в таблице должен появляться по ховеру на таблицу, сама таблица и ее контент должны оставаться на месте при этом.
Внешний вид скроллбара не принципиален. Таблица скроллится внутри, шапка остаётся на месте.
Полоса скролл бара начинается под шапкой. При скролле значения в таблице не должны наезжать на шапку.


Компонент должен уметь: 
* читать сообщение об изменении читаемого символа из плагина "шина данных". При изменении символа компонент должен очищать свое содержимое по предыдущему символу и загрузить данные по новому.  
* транслировать в шину данных в виде сообщений все примененные diff-изменения.



На второй странице расположить компонент, сожержащий в себе:
* DropDown  перечнем символов. Их можно зашить статически BTCUSDT, BNBBTC и ETHBTC
* Cписочный элемент

DropDown при изменении выбранного элемента отправляет в шину данных событие об изменении активного символа.
Cписочный элемент читает шину данных и отображает информацию о каждом diff-изменении в новой строке.


Дополнительное задание (если успеваете):
* Релизовать SSR для приложения
