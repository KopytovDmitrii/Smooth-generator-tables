import styles from './TableCard.module.scss'
import type { Table } from '../../store/tablesSlice'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { Button } from '../../Components/Atoms/Button/Button'
import { Modal } from '../../Components/Atoms/Modal/Modal'
import { copyTable, deleteTable, updateCell } from '../../store/tablesSlice'
import copyIcon from '../../assets/icons/copy.svg'
import deleteIcon from '../../assets/icons/delete.svg'
import { EditableCell } from '../../Components/Molecules/EditableCell/EditableCell'
import { DragHandle } from '../../Components/Atoms/DragHandle/DragHandle'

type Props = {
  table: Table
}

export const TableCard = ({ table }: Props) => {
  const dispatch = useAppDispatch()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const onCopy = () => dispatch(copyTable(table.id))
  const onDelete = () => setConfirmOpen(true)
  const onConfirmDelete = () => {
    dispatch(deleteTable(table.id))
    setConfirmOpen(false)
  }

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        {table.header.map((col) => (
          <div key={col.key} className={styles.headerCell}>
            {col.title}
          </div>
        ))}

        <div className={styles.toolbar}>
          <DragHandle />
          <Button variant="secondary" isCircle onClick={onCopy} title="Copy" aria-label="Copy">
            <img src={copyIcon} alt="" width={16} height={16} />
          </Button>
          <Button variant="secondary" isCircle onClick={onDelete} title="Delete" aria-label="Delete">
            <img src={deleteIcon} alt="" width={16} height={16} />
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        {Array.from({ length: 4 }).map((_, r) => {
          const row = table.rows[r] ?? ({} as Record<string, string | number>)
          return (
          <div key={r} className={styles.row}>
            {table.header.map((col) => (
              <div key={col.key} className={styles.cell}>
                <EditableCell
                  value={row[col.key] as any}
                  column={col}
                  placeholder=""
                  onCommit={(next) =>
                    dispatch(updateCell({ tableId: table.id, rowIndex: r, colKey: col.key, value: next }))
                  }
                />
              </div>
            ))}
          </div>
          )
        })}
      </div>

      <Modal open={confirmOpen} title="Confirm delete" onClose={() => setConfirmOpen(false)}>
        <div>Delete this table?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          <Button fullWidth onClick={onConfirmDelete}>Confirm</Button>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  )
}

