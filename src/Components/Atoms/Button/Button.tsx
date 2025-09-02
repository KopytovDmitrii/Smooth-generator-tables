import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  isCircle?: boolean
  fullWidth?: boolean
}

export const Button = ({ variant = 'primary', isCircle = false, fullWidth = false, className, ...rest }: Props) => {
  const cls = [styles.button]
  if (className) cls.push(className)
  if (variant === 'secondary') cls.push(styles.secondary)
  if (isCircle) cls.push(styles.circle)
  if (fullWidth) cls.push(styles.fullWidth)
  return <button className={cls.join(' ')} {...rest} />
}
