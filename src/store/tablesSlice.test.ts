import reducer, { createTable, copyTable, deleteTable, type HeaderColumn } from './tablesSlice'

describe('tablesSlice', () => {
  it('createTable добавляет новую таблицу с указанным header и пустыми rows', () => {
    const initialState = { tables: [] as any[] }
    const header: HeaderColumn[] = [
      { key: 'col_1', title: 'Name', type: 'text', align: 'left' },
      { key: 'col_2', title: 'Amount', type: 'number', align: 'right' },
    ]

    const next = reducer(initialState, createTable({ header }))

    expect(next.tables).toHaveLength(1)
    const table = next.tables[0]
    expect(table.id).toBeDefined()
    expect(table.header).toEqual(header)
    expect(table.rows).toEqual([])
  })

  it('copyTable вставляет клон сразу после исходной', () => {
    const header: HeaderColumn[] = [
      { key: 'col_1', title: 'Name', type: 'text', align: 'left' },
    ]
    // создаём 2 таблицы
    let state = reducer({ tables: [] as any[] }, createTable({ header }))
    state = reducer(state, createTable({ header }))
    const firstId = state.tables[0].id
    const secondId = state.tables[1].id

    // копируем первую
    const next = reducer(state, copyTable(firstId))

    expect(next.tables).toHaveLength(3)
    // порядок: [first, firstCopy, second]
    expect(next.tables[0].id).toBe(firstId)
    expect(next.tables[1].id).not.toBe(firstId)
    expect(next.tables[2].id).toBe(secondId)
    expect(next.tables[0].header).toEqual(next.tables[1].header)
  })

  it('deleteTable удаляет таблицу по id', () => {
    const header: HeaderColumn[] = [
      { key: 'col_1', title: 'Name', type: 'text', align: 'left' },
    ]
    let state = reducer({ tables: [] as any[] }, createTable({ header }))
    state = reducer(state, createTable({ header }))
    const firstId = state.tables[0].id

    const next = reducer(state, deleteTable(firstId))
    expect(next.tables).toHaveLength(1)
    expect(next.tables[0].id).not.toBe(firstId)
  })

  it('updateCell изменяет значение ячейки, создавая строку при необходимости', () => {
    const header: HeaderColumn[] = [
      { key: 'name', title: 'Name', type: 'text', align: 'left' },
      { key: 'amount', title: 'Amount', type: 'number', align: 'right' },
    ]
    let state = reducer({ tables: [] as any[] }, createTable({ header }))
    const tableId = state.tables[0].id

    // устанавливаем значение в 0-й строке, колонки name
    // импорт через require, чтобы избежать циклического импорта типов
    const { updateCell } = require('./tablesSlice')
    state = reducer(state, updateCell({ tableId, rowIndex: 0, colKey: 'name', value: 'John' }))

    expect(state.tables[0].rows).toHaveLength(1)
    expect(state.tables[0].rows[0].name).toBe('John')
  })

  it('reorderTables меняет порядок таблиц (перемещение с конца в начало)', () => {
    const header: HeaderColumn[] = [
      { key: 'col_1', title: 'Name', type: 'text', align: 'left' },
    ]
    let state = reducer({ tables: [] as any[] }, createTable({ header })) // A
    state = reducer(state, createTable({ header })) // B
    state = reducer(state, createTable({ header })) // C

    const [a, b, c] = state.tables.map((t: any) => t.id)

    const { reorderTables } = require('./tablesSlice')
    const next = reducer(state, reorderTables({ sourceIndex: 2, destinationIndex: 0 }))
    expect(next.tables.map((t: any) => t.id)).toEqual([c, a, b])
  })
})

