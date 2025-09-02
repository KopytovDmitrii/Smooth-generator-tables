import React, { useEffect, useRef } from 'react'
import cls from './InlineInput.module.scss'

export type InlineInputProps = {
  value: string | number
  type?: 'text' | 'number'
  autoFocus?: boolean
  hasError?: boolean
  align?: 'left' | 'center' | 'right'
  placeholder?: string
  onChange: (v: string) => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const InlineInput: React.FC<InlineInputProps> = ({
  value,
  type = 'text',
  autoFocus,
  hasError,
  align = 'left',
  placeholder,
  onChange,
  onBlur,
  onKeyDown,
}) => {
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus()
      // Поместить курсор в конец
      const len = String(value ?? '').length
      ref.current.setSelectionRange?.(len, len)
    }
  }, [autoFocus, value])

  return (
    <input
      ref={ref}
      className={[
        cls.input,
        cls[`align_${align}`],
        hasError ? cls.error : '',
      ].filter(Boolean).join(' ')}
      inputMode={type === 'number' ? 'decimal' : 'text'}
      type={type === 'number' ? 'text' : 'text'}
      value={String(value ?? '')}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  )
}
