import { Item } from '@radix-ui/react-menubar'
import * as React from 'react'
import { RowButton, RowButtonProps } from '~components/Primitives/RowButton'

export function MBItem({
  onSelect,
  id,
  ...rest
}: RowButtonProps & { onSelect?: (event: Event) => void; id?: string }) {
  return (
    <Item dir="ltr" asChild onSelect={onSelect} id={id}>
      <RowButton {...rest} />
    </Item>
  )
}
