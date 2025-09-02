import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { TableHeaderForm } from '../../Components/Molecules/TableHeaderForm/TableHeaderForm'
import { TableCard } from './TableCard'
import styles from './ListView.module.scss'
import type { Table } from '../../store/tablesSlice'
import { Button } from '../../Components/Atoms/Button/Button'
import { Modal } from '../../Components/Atoms/Modal/Modal'
import { reorderTables } from '../../store/tablesSlice'

export const TablesListView = () => {
  const tables = useAppSelector((s) => s.tables.tables) as Table[]
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [dragSrcIndex, setDragSrcIndex] = useState<number | null>(null)

  const getSpanClass = (index: number, total: number) => {
    // N=1 — вся ширина
    if (total === 1) return styles.full
    // N=2 — оба по половине
    if (total === 2) return styles.half

    // N>=3: базово треть; корректируем хвост
    const rem = total % 3
    // Хвост 1 — последний на всю
    if (rem === 1 && index === total - 1) return styles.full
    // Хвост 2 — последние два по половине
    if (rem === 2 && (index === total - 1 || index === total - 2)) return styles.half

    // Иначе — треть (база)
    return ''
  }

  return (
    <div className={styles.root}>
      <div>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>

      <Modal open={open} title="Create new table" onClose={() => setOpen(false)}>
        <TableHeaderForm onCreated={() => setOpen(false)} />
      </Modal>

      <div
        className={styles.grid}
        onDragStartCapture={(e) => {
          const target = e.target as HTMLElement
          // Стартуем drag только если начало на хэндлере
          const handle = target.closest('[data-drag-handle="true"]') as HTMLElement | null
          if (!handle) return
          const card = handle.closest('[data-index]') as HTMLElement | null
          if (!card) return
          const src = Number(card.dataset.index)
          if (Number.isNaN(src)) return
          // Сохраняем индекс источника и записываем его в dataTransfer
          setDragSrcIndex(src)
          try {
            e.dataTransfer?.setData('text/plain', String(src))
            e.dataTransfer!.effectAllowed = 'move'
            // Ставим превью перетаскиваемой карточки
            if (e.dataTransfer && card) {
              e.dataTransfer.setDragImage(card, card.clientWidth / 2, 10)
            }
          } catch {}
          console.debug('[DnD] dragstart(capture)', { src })
        }}
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          const card = (e.target as HTMLElement).closest(`[data-index]`) as HTMLElement | null
          if (card) setDragOverIndex(Number(card.dataset.index))
        }}
        onDrop={(e) => {
          e.preventDefault()
          const srcStr = e.dataTransfer.getData('text/plain')
          const src = Number(srcStr)
          const card = (e.target as HTMLElement).closest(`[data-index]`) as HTMLElement | null
          const dst = card ? Number(card.dataset.index) : -1
          if (!Number.isNaN(src) && !Number.isNaN(dst) && src >= 0 && dst >= 0 && src !== dst) {
            dispatch(reorderTables({ sourceIndex: src, destinationIndex: dst }))
          }
          setDragOverIndex(null)
        }}
        onDragLeave={(e) => {
          // Если ушли за пределы grid — убираем подсветку
          const related = e.relatedTarget as HTMLElement | null
          if (!related || !related.closest(`.${styles.grid}`)) {
            setDragOverIndex(null)
          }
        }}
      >
        {tables.map((t: Table, i: number) => (
          <div
            key={t.id}
            className={`${styles.card} ${getSpanClass(i, tables.length)} ${dragOverIndex === i ? styles.dropTarget : ''}`}
            data-index={i}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              e.dataTransfer.dropEffect = 'move'
              setDragOverIndex(i)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              const srcData = e.dataTransfer.getData('text/plain')
              const src = Number(srcData)
              const dst = i
              const finalSrc = !Number.isNaN(src) ? src : dragSrcIndex
              // debug
              console.debug('[DnD] drop', { srcData, parsed: src, finalSrc, dst })
              if (finalSrc != null && finalSrc !== dst) {
                dispatch(reorderTables({ sourceIndex: finalSrc, destinationIndex: dst }))
              }
              setDragOverIndex(null)
              setDragSrcIndex(null)
            }}
            onDragLeave={(e) => {
              const related = e.relatedTarget as HTMLElement | null
              if (!related || !related.closest(`[data-index="${i}"]`)) {
                setDragOverIndex((curr) => (curr === i ? null : curr))
              }
            }}
            onDragEnd={() => {
              // страховка очистки состояния
              setDragOverIndex(null)
              setDragSrcIndex(null)
            }}
          >
            <TableCard table={t} />
          </div>
        ))}
      </div>
    </div>
  )
}
