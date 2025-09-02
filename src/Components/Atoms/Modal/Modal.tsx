import { ReactNode, MouseEvent } from 'react'
import styles from './Modal.module.scss'

type ModalProps = {
  open: boolean
  title?: string
  onClose: () => void
  children?: ReactNode
  footer?: ReactNode
}

export const Modal = ({ open, title, onClose, children, footer }: ModalProps) => {
  if (!open) return null

  const onOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={title}>
        {title && <div className={styles.header}>{title}</div>}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}
