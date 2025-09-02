Smooth generator tables

Визуализацию генератора таблиц вы найдете по ссылке на figma, но давайте обозначим
основные требовани:

1) Первый шаг - реализовать создание таблицы через форму: https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-189&t=gkTTLFhXTz4Ur0KU-4
- с помощью текстовых и выпадающих полей для ввода формируем header таблицы: https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-220&t=gkTTLFhXTz4Ur0KU-4
- после нажатия на кнопку создание - таблица создается и отображается на экране: https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-299&t=gkTTLFhXTz4Ur0KU-4
- первая таблица должна занимать 100% пространства контейнера: https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-299&t=gkTTLFhXTz4Ur0KU-4
- далее через форму мы можем создавать неограниченное кол-во таблиц которые занимают дальнейшее пространство: https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-505&t=gkTTLFhXTz4Ur0KU-4
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-689&t=gkTTLFhXTz4Ur0KU-4
- при создании второй таблицы - элементы должны занимать 50% ширины контейнера каждая, а создав 3 - треть от всей строки: https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-776&t=gkTTLFhXTz4Ur0KU-4
- Создавая четвертую - она занимает вторую строку на ширину 100%, добавляя 5 вторая строка разбивается на 2 блока по 50% и т.д. https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-1085&t=gkTTLFhXTz4Ur0KU-4

2) Второй шаг - реализовать возможность копирования таблицы:
у каждой созданной таблицы есть кнопка “Copy” - ее основная функция это скопировать текущую таблицу рядом справа (если есть место) или перенести ее ниже, основной момент - заключается в том чтобы созданная после копирования таблица, должна быть после текущей.
- при нажатии на кнопку "Copy" таблица копируется и добавляется рядом справа
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-1594&t=gkTTLFhXTz4Ur0KU-4
- если есть место - таблица добавляется рядом справа
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-1730&t=gkTTLFhXTz4Ur0KU-4
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-1902&t=gkTTLFhXTz4Ur0KU-4
- если места нет - таблица добавляется ниже

3) Третий шаг - реализовать возможность удаления таблицы:
- Рядом с кнопкой copy добавить кнопку delete
- при нажатии на delete таблица удаляется
- перед удалением появляется попап подтверждения удаления в той же стилистике что и весь проект. 

4) Четвертый шаг - реализовать возможность заполнения таблицы:
- необходимо добавить возможности заполнять ячейки через текстовое поле (в самой таблице. Можно кликнуть на ячейку и ввести текст)
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-1306&t=gkTTLFhXTz4Ur0KU-4
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=7-649&t=gkTTLFhXTz4Ur0KU-4
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-2262&t=gkTTLFhXTz4Ur0KU-4
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-2763&t=gkTTLFhXTz4Ur0KU-4
https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-2335&t=gkTTLFhXTz4Ur0KU-4

5) Пятый шаг - реализовать перетаскивания таблицы:
-  добавить возможность перетаскивание таблиц с помощью drag&drop. можно использовать кастомное решение или использовать библиотеку



