import React, { useCallback, useMemo, useState } from 'react'
import { InlineInput } from '../../Atoms/InlineInput/InlineInput'
import { Select as SelectAtom } from '../../Atoms/Select/Select'
import type { HeaderColumn } from '../../../store/tablesSlice'
import cls from './EditableCell.module.scss'

export type EditableCellProps = {
  value: string | number | undefined
  column: HeaderColumn
  placeholder?: string
  onCommit: (next: string | number) => void
}

export const EditableCell: React.FC<EditableCellProps> = ({ value, column, placeholder, onCommit }) => {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<string>(value == null ? '' : String(value))

  const align = column.align
  const inputType: 'text' | 'number' = column.type === 'number' ? 'number' : 'text'

  // If select-type column, render select directly
  if (column.type === 'select') {
    const options = (column.options ?? []).map((o) => ({ label: o, value: o }))
    const current = value == null ? '' : String(value)
    const optionsWithPlaceholder = current
      ? options
      : [{ label: 'Select…', value: '' }, ...options]
    return (
      <div className={cls.selectContainer}>
        <SelectAtom
          wrapperClassName={cls.selectRoot}
          uiSize="sm"
          fullWidth
          inCell
          value={current}
          onChange={(e) => onCommit(e.target.value)}
          options={optionsWithPlaceholder}
        />
      </div>
    )
  }

  const hasError = useMemo(() => {
    if (inputType === 'number' && draft.trim() !== '') {
      return Number.isNaN(Number(draft))
    }
    return false
  }, [inputType, draft])

  const startEdit = useCallback(() => {
    setDraft(value == null ? '' : String(value))
    setEditing(true)
  }, [value])

  const finish = useCallback(() => {
    setEditing(false)
  }, [])

  const commitOnChange = useCallback((next: string) => {
    setDraft(next)
    if (inputType === 'number') {
      if (next.trim() === '') return // пустую строку не сохраняем как number
      const num = Number(next)
      if (Number.isNaN(num)) return
      onCommit(num)
    } else {
      onCommit(next)
    }
  }, [inputType, onCommit])

  if (!editing) {
    return (
      <div
        className={[cls.view, cls[`align_${align}`]].join(' ')}
        role="button"
        tabIndex={0}
        onClick={startEdit}
        onKeyDown={(e) => { if (e.key === 'Enter') startEdit() }}
        title={String(value ?? '')}
      >
        {String(value ?? '') || placeholder || ''}
      </div>
    )
  }

  return (
    <InlineInput
      value={draft}
      type={inputType}
      autoFocus
      hasError={hasError}
      align={align}
      placeholder={placeholder}
      onChange={commitOnChange}
      onBlur={finish}
      onKeyDown={(e) => { if (e.key === 'Escape') finish() }}
    />
  )
}
