import * as MenuBar from '@radix-ui/react-menubar'
import * as React from 'react'
import { MenuContent } from '~components/Primitives/MenuContent'
import { stopPropagation } from '~components/stopPropagation'
import { useContainer } from '~hooks'
import { styled } from '~styles/stitches.config'

export interface MBContentProps {
  variant?: 'menu' | 'horizontal'
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  sideOffset?: number
  children: React.ReactNode
  overflow?: boolean
  id?: string
  side?: 'top' | 'left' | 'right' | 'bottom' | undefined
}

export function MBContent({
  sideOffset = 4,
  alignOffset = 0,
  children,
  align,
  variant,
  id,
  overflow = false,
  side = 'bottom',
}: MBContentProps) {
  const container = useContainer()

  return (
    <MenuBar.Portal container={container.current} dir="ltr">
      <MenuBar.Content
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        onEscapeKeyDown={stopPropagation}
        asChild
        id={id}
        side={side}
      >
        <StyledContent variant={variant} overflow={overflow}>
          {children}
        </StyledContent>
      </MenuBar.Content>
    </MenuBar.Portal>
  )
}

export const StyledContent = styled(MenuContent, {
  width: 'fit-content',
  height: 'fit-content',
  minWidth: 0,
  maxHeight: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none' /* for Internet Explorer, Edge */,
  scrollbarWidth: 'none',
  variants: {
    variant: {
      horizontal: {
        flexDirection: 'row',
      },
      menu: {
        minWidth: 128,
      },
    },
    overflow: {
      true: {
        maxHeight: '60vh',
      },
    },
  },
})
