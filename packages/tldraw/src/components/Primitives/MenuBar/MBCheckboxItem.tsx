import { CheckboxItem } from '@radix-ui/react-menubar'
import * as React from 'react'
import { RowButton, RowButtonProps } from '~components/Primitives/RowButton'
import { preventEvent } from '~components/preventEvent'

interface MBCheckboxItemProps {
  checked: boolean
  disabled?: boolean
  onCheckedChange: (isChecked: boolean | string) => void
  children: React.ReactNode
  variant?: RowButtonProps['variant']
  kbd?: string
  id?: string
}

export function MBCheckboxItem({
  checked,
  disabled = false,
  variant,
  onCheckedChange,
  kbd,
  id,
  children,
}: MBCheckboxItemProps) {
  return (
    <CheckboxItem
      dir="ltr"
      onSelect={preventEvent}
      onCheckedChange={onCheckedChange}
      checked={checked}
      disabled={disabled}
      asChild
      id={id}
    >
      <RowButton kbd={kbd} variant={variant} hasIndicator>
        {children}
      </RowButton>
    </CheckboxItem>
  )
}
