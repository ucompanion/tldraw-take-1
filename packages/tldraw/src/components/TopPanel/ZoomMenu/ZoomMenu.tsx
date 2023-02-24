import * as MenuBar from '@radix-ui/react-menubar'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { MBContent, MBItem } from '~components/Primitives/MenuBar'
import { ToolButton } from '~components/Primitives/ToolButton'
import { preventEvent } from '~components/preventEvent'
import { useTldrawApp } from '~hooks'
import { styled } from '~styles'
import type { TDSnapshot } from '~types'

const zoomSelector = (s: TDSnapshot) => s.document.pageStates[s.appState.currentPageId].camera.zoom

export const ZoomMenu = function ZoomMenu() {
  const app = useTldrawApp()

  const zoom = app.useStore(zoomSelector)

  return (
    <MenuBar.Root dir="ltr">
      <MenuBar.Menu>
        <MenuBar.Trigger dir="ltr" asChild id="TD-Zoom">
          <FixedWidthToolButton onDoubleClick={app.resetZoom} variant="text">
            {Math.round(zoom * 100)}%
          </FixedWidthToolButton>
        </MenuBar.Trigger>
        <MBContent align="end" sideOffset={8}>
          <MBItem onSelect={preventEvent} onClick={app.zoomIn} kbd="#+" id="TD-Zoom-Zoom_In">
            <FormattedMessage id="zoom.in" />
          </MBItem>
          <MBItem onSelect={preventEvent} onClick={app.zoomOut} kbd="#−" id="TD-Zoom-Zoom_Out">
            <FormattedMessage id="zoom.out" />
          </MBItem>
          <MBItem
            onSelect={preventEvent}
            onClick={app.resetZoom}
            kbd="⇧0"
            id="TD-Zoom-Zoom_To_100%"
          >
            <FormattedMessage id="zoom.to" /> 100%
          </MBItem>
          <MBItem onSelect={preventEvent} onClick={app.zoomToFit} kbd="⇧1" id="TD-Zoom-To_Fit">
            <FormattedMessage id="zoom.to.fit" />
          </MBItem>
          <MBItem
            onSelect={preventEvent}
            onClick={app.zoomToSelection}
            kbd="⇧2"
            id="TD-Zoom-To_Selection"
          >
            <FormattedMessage id="zoom.to.selection" />
          </MBItem>
        </MBContent>
      </MenuBar.Menu>
    </MenuBar.Root>
  )
}

const FixedWidthToolButton = styled(ToolButton, {
  minWidth: 40,
})
