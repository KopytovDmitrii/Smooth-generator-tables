import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

export type HeaderColumn = {
  key: string
  title: string
  type: 'text' | 'number' | 'select'
  align: 'left' | 'center' | 'right'
  // For 'select' type, available options
  options?: string[]
}

export type Table = {
  id: string
  header: HeaderColumn[]
  rows: Array<Record<string, string | number>>
}

type CreateTablePayload = {
  header: HeaderColumn[]
}

type TablesState = {
  tables: Table[]
}

const initialState: TablesState = {
  tables: [],
}

type UpdateCellPayload = {
  tableId: string
  rowIndex: number
  colKey: string
  value: string | number
}

type ReorderTablesPayload = {
  sourceIndex: number
  destinationIndex: number
}

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    createTable: (state, action: PayloadAction<CreateTablePayload>) => {
      const id = nanoid()
      state.tables.push({ id, header: action.payload.header, rows: [] })
    },
    copyTable: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.tables.findIndex((t) => t.id === id)
      if (index === -1) return
      const source = state.tables[index]
      const clonedHeader = source.header.map((col) => ({ ...col }))
      const clonedRows = source.rows.map((row) => ({ ...row }))
      const newTable: Table = { id: nanoid(), header: clonedHeader, rows: clonedRows }
      state.tables.splice(index + 1, 0, newTable)
    },
    deleteTable: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.tables = state.tables.filter((t) => t.id !== id)
    },
    updateCell: (state, action: PayloadAction<UpdateCellPayload>) => {
      const { tableId, rowIndex, colKey, value } = action.payload
      const table = state.tables.find((t) => t.id === tableId)
      if (!table || rowIndex < 0) return
      while (table.rows.length <= rowIndex) {
        table.rows.push({})
      }
      const row = table.rows[rowIndex]
      row[colKey] = value
    },
    reorderTables: (state, action: PayloadAction<ReorderTablesPayload>) => {
      const { sourceIndex, destinationIndex } = action.payload
      const from = sourceIndex
      let to = destinationIndex
      const { tables } = state
      if (
        from < 0 ||
        from >= tables.length ||
        to < 0 ||
        to >= tables.length ||
        from === to
      ) {
        return
      }
      const [moved] = tables.splice(from, 1)
      // Новая логика:
      // - Если from < to (тащим слева направо) — вставляем ПОСЛЕ цели: to уже указывает на позицию после сдвига цели влево
      // - Если from > to (справа налево) — вставляем ПЕРЕД целью: to указывает на текущую позицию цели
      tables.splice(to, 0, moved)
    },
  },
})

export const { createTable, copyTable, deleteTable, updateCell, reorderTables } = tablesSlice.actions
export default tablesSlice.reducer

