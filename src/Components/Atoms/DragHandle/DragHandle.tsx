import React from 'react'
import cls from './DragHandle.module.scss'

export type DragHandleProps = {
  title?: string
}

export const DragHandle: React.FC<DragHandleProps> = ({ title = 'Drag' }) => {
  return (
    <div
      className={cls.handle}
      title={title}
      aria-label={title}
      role="button"
      tabIndex={0}
      data-drag-handle="true"
      draggable
    >
      <span className={cls.dot} />
      <span className={cls.dot} />
      <span className={cls.dot} />
      <span className={cls.dot} />
      <span className={cls.dot} />
      <span className={cls.dot} />
    </div>
  )
}
