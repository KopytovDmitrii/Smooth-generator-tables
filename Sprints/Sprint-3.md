# Спринт 3 — Редактирование ячеек и Drag&Drop

## Ссылки Figma
- Inline редактирование (ячейки): https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-1306&t=gkTTLFhXTz4Ur0KU-4
- Inline редактирование (вариант 2): https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=7-649&t=gkTTLFhXTz4Ur0KU-4
- Inline редактирование (вариант 3): https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-2262&t=gkTTLFhXTz4Ur0KU-4
- Inline редактирование (вариант 4): https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-2763&t=gkTTLFhXTz4Ur0KU-4
- Inline редактирование (вариант 5): https://www.figma.com/design/AG7AGTSP5dkPEJW9jfpsKS/Frontend?node-id=4-2335&t=gkTTLFhXTz4Ur0KU-4
- Drag&Drop: отдельной ссылки в `idea.md` нет; ориентироваться на общую стилистику проекта.

## Цели
- Добавить редактирование ячеек таблицы "на месте" (inline edit).
- Добавить перетаскивание таблиц (drag&drop) с корректным пересчётом сетки.
- Завершить MVP: по окончании спринта весь заявленный функционал готов.

## Объём работ
- Atoms:
  - `InlineInput` — однотипный инпут для редактирования ячеек (состояния: idle/focus/error).
  - `DragHandle` — иконка/зона захвата для перетаскивания карточки таблицы.
- Molecules:
  - `EditableCell` — обёртка над `InlineInput` с отображением значения и переходом в режим редактирования по клику/Enter.
  - `TableToolbar` — дополнить, если нужен явный drag handle.
- Views:
  - `Tables/TableCard` — поддержка редактируемых ячеек, отображение `DragHandle`.
  - `Tables/ListView` — интеграция с DnD провайдером.
- Состояние (`tablesSlice`):
  - `updateCell({ tableId, rowIndex, colKey, value })` — обновление значения.
  - `reorderTables({ sourceIndex, destinationIndex })` — изменение порядка таблиц.
  - Переиспользовать функцию раскладки из Спринтов 1–2 после reorder.
- DnD:
  - Библиотека на выбор (например, `@dnd-kit/core` или `react-beautiful-dnd`), либо кастом.
  - Событие завершения перетаскивания вызывает `reorderTables` и пересчёт сетки.
- UX редактирования:
  - Клик по ячейке — режим редактирования; Enter — сохранить; Esc/blur — отмена.
  - Валидировать по типу колонки (текст/число/селект, согласно header).
- Тесты (Jest):
  - `updateCell` корректно меняет данные.
  - `reorderTables` меняет порядок и не ломает раскладку.

## Критерии приёмки
- Ячейки редактируются inline, с предиктивной валидацией по типу.
- Перетаскивание таблиц меняет их порядок и корректно обновляет сетку в соответствии с правилами из `idea.md`.
- Линт/типы — без ошибок; критичные редьюсеры покрыты тестами.

## DoD
- Компоненты соответствуют уровню (Atoms/Molecules/Views), без смешения.
- Все критичные кейсы протестированы: редактирование, reorder, раскладка.
- UI и интеракции соответствуют общей стилистике Figma.

## Риски/заметки
- Следить за производительностью при множественных инпут-ячейках (мемоизация, key-стратегия).
- Валидация должна быть унифицирована по типам колонок, лучше вынести в утилиту.
