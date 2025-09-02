import { useState } from 'react'
import { Input } from '../../Atoms/Input/Input'
import { Select } from '../../Atoms/Select/Select'
import { Button } from '../../Atoms/Button/Button'
import styles from './TableHeaderForm.module.scss'
import { HeaderColumn, createTable } from '../../../store/tablesSlice'
import { useAppDispatch } from '../../../hooks'

const typeOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Select', value: 'select' },
]

type Props = { onCreated?: () => void }

export const TableHeaderForm = ({ onCreated }: Props) => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'text' | 'number' | 'select'>('text')
  const [columns, setColumns] = useState<HeaderColumn[]>([])
  const [selectOptions, setSelectOptions] = useState<string[]>([])
  const [chipDraft, setChipDraft] = useState('')

  const addOption = (raw: string) => {
    const v = raw.trim()
    if (!v) return
    setSelectOptions((curr) => (curr.includes(v) ? curr : [...curr, v]))
    setChipDraft('')
  }

  const removeOptionAt = (idx: number) => {
    setSelectOptions((curr) => curr.filter((_, i) => i !== idx))
  }

  const addColumn = () => {
    if (!title.trim()) return
    const key = `${title.trim().toLowerCase().replace(/\s+/g, '_')}_${columns.length + 1}`
    const options = type === 'select' ? selectOptions : undefined
    setColumns([
      ...columns,
      { key, title: title.trim(), type, align: 'left', ...(options && options.length ? { options } : {}) },
    ])
    setTitle('')
    if (type === 'select') {
      setSelectOptions([])
      setChipDraft('')
    }
  }

  const removeColumn = (key: string) => {
    setColumns(columns.filter((c) => c.key !== key))
  }

  const onCreate = () => {
    if (!columns.length) return
    dispatch(createTable({ header: columns }))
    setColumns([])
    onCreated?.()
  }

  return (
    <div>
      <div className={styles.form}>
        <Input label="Column title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          options={typeOptions}
        />
        {type === 'select' && (
          <div className={styles.optionsBlock}>
            <label className={styles.label}>
              <span>Options (press Enter)</span>
              <div className={styles.chips}>
                {selectOptions.map((o, i) => (
                  <span key={`${o}-${i}`} className={styles.chip} title={o}>
                    {o}
                    <button
                      type="button"
                      className={styles.chipRemove}
                      aria-label={`Remove ${o}`}
                      data-role="chip-remove"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        removeOptionAt(i)
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  className={styles.chipInput}
                  placeholder={selectOptions.length ? '' : 'e.g. New'}
                  value={chipDraft}
                  onChange={(e) => setChipDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault()
                      addOption(chipDraft)
                    } else if (e.key === 'Backspace' && !chipDraft && selectOptions.length) {
                      removeOptionAt(selectOptions.length - 1)
                    }
                  }}
                  onBlur={(e) => {
                    const rt = e.relatedTarget as HTMLElement | null
                    if (rt?.dataset.role === 'chip-remove') return
                    addOption(chipDraft)
                  }}
                />
              </div>
            </label>
          </div>
        )}
        <Button
          className={styles.fixedButton}
          onClick={addColumn}
          disabled={type === 'select' && selectOptions.length === 0}
        >
          Add
        </Button>
      </div>

      {!!columns.length && (
        <div className={styles.list}>
          {columns.map((c) => (
            <span key={c.key} className={styles.tag}>
              {c.title} / {c.type}
              {c.type === 'select' && c.options && c.options.length ? ` (${c.options.length})` : ''}
              <button className={styles.remove} onClick={() => removeColumn(c.key)} aria-label="remove">
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <Button className={styles.fixedButton} onClick={onCreate}>Create</Button>
      </div>
    </div>
  )
}
