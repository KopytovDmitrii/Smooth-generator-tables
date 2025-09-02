import { SelectHTMLAttributes } from 'react'
import styles from './Select.module.scss'

type Option = { label: string; value: string }

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: Option[]
  uiSize?: 'sm' | 'md'
  fullWidth?: boolean
  wrapperClassName?: string
  inCell?: boolean
}

export const Select = ({ label, className, options, uiSize = 'md', fullWidth, wrapperClassName, inCell, ...rest }: Props) => {
  const rootCls = [styles.root, wrapperClassName].filter(Boolean).join(' ')
  const selectCls = [
    styles.select,
    uiSize === 'sm' ? styles.sizeSm : '',
    fullWidth ? styles.fullWidth : '',
    inCell ? styles.inCell : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <label className={rootCls}>
      {label && <span className={styles.label}>{label}</span>}
      <select className={selectCls} {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
