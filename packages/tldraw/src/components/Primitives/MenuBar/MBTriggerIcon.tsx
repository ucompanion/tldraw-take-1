import { Trigger } from '@radix-ui/react-menubar'
import * as React from 'react'
import { ToolButton, ToolButtonProps } from '~components/Primitives/ToolButton'

interface MBTriggerIconProps extends ToolButtonProps {
  children: React.ReactNode
  id?: string
}

export function MBTriggerIcon({ id, children, ...rest }: MBTriggerIconProps) {
  return (
    <Trigger asChild id={id}>
      <ToolButton {...rest}>{children}</ToolButton>
    </Trigger>
  )
}
