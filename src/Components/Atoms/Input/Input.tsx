import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input = ({ label, className, ...rest }: Props) => {
  return (
    <label className={styles.root}>
      {label && <span className={styles.label}>{label}</span>}
      <input className={[styles.input, className].filter(Boolean).join(' ')} {...rest} />
    </label>
  )
}
