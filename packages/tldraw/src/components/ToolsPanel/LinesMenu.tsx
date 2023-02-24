import * as MenuBar from '@radix-ui/react-menubar'
import * as React from 'react'
import { useIntl } from 'react-intl'
import { Panel } from '~components/Primitives/Panel'
import { ToolButton } from '~components/Primitives/ToolButton'
import { Tooltip } from '~components/Primitives/Tooltip'
import { ArrowDrawIcon, Line2Icon } from '~components/Primitives/icons/icoTools'
import { useTldrawApp } from '~hooks'
import { TDShapeType, TDSnapshot, TDToolType } from '~types'

interface LineMenuProps {
  activeTool: TDToolType
  isToolLocked: boolean
}

type LineShape = TDShapeType.Line | TDShapeType.Arrow

const lineShapes: LineShape[] = [TDShapeType.Line, TDShapeType.Arrow]

const lineShapeIcons = {
  [TDShapeType.Line]: <Line2Icon />,
  [TDShapeType.Arrow]: <ArrowDrawIcon />,
}

const dockPositionState = (s: TDSnapshot) => s.settings.dockPosition

export const LinesMenu = React.memo(function LinesMenu({
  activeTool,
  isToolLocked,
}: LineMenuProps) {
  const app = useTldrawApp()
  const intl = useIntl()

  const dockPosition = app.useStore(dockPositionState)

  const [lineActiveTool, setLineActiveTool] = React.useState<LineShape>(TDShapeType.Line)

  React.useEffect(() => {
    if (lineShapes.includes(activeTool as LineShape) && lineActiveTool !== activeTool) {
      setLineActiveTool(activeTool as LineShape)
    }
  }, [activeTool])

  const selectShapeTool2 = React.useCallback(() => {
    app.selectTool(lineActiveTool)
  }, [activeTool, app])

  const handleDoubleClick = React.useCallback(() => {
    app.toggleToolLock()
  }, [app])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      if (app.shiftKey) {
        e.preventDefault()
      }
    }
  }, [])

  const isActive = lineShapes.includes(activeTool as LineShape)
  const contentSide = dockPosition === 'bottom' || dockPosition === 'top' ? 'top' : dockPosition

  const panelStyle = dockPosition === 'bottom' || dockPosition === 'top' ? 'row' : 'column'

  return (
    <MenuBar.Root dir="ltr" asChild onValueChange={selectShapeTool2}>
      <MenuBar.Menu>
        <MenuBar.Trigger dir="ltr" asChild id="TD-PrimaryTools-Lines">
          <ToolButton
            disabled={isActive && app.shiftKey}
            variant="primary"
            onDoubleClick={handleDoubleClick}
            isToolLocked={isActive && isToolLocked}
            isActive={isActive}
            onKeyDown={handleKeyDown}
            onClick={() => console.log(isActive)}
          >
            {lineShapeIcons[lineActiveTool]}
          </ToolButton>
        </MenuBar.Trigger>
        <MenuBar.Portal>
          <MenuBar.Content asChild side={contentSide} sideOffset={12}>
            <Panel side="center" style={{ flexDirection: panelStyle }}>
              {lineShapes.map((shape, i) => (
                <Tooltip
                  key={shape}
                  label={intl.formatMessage({ id: shape })}
                  kbd={(4 + i).toString()}
                  id={`TD-PrimaryTools-Lines-${shape}`}
                >
                  <MenuBar.Item asChild>
                    <ToolButton
                      variant="primary"
                      onClick={() => {
                        app.selectTool(shape)
                        setLineActiveTool(shape)
                      }}
                    >
                      {lineShapeIcons[shape]}
                    </ToolButton>
                  </MenuBar.Item>
                </Tooltip>
              ))}
            </Panel>
          </MenuBar.Content>
        </MenuBar.Portal>
      </MenuBar.Menu>
    </MenuBar.Root>
  )
})
