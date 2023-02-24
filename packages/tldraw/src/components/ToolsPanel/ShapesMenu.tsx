import * as MenuBar from '@radix-ui/react-menubar'
import * as React from 'react'
import { useIntl } from 'react-intl'
import { Panel } from '~components/Primitives/Panel'
import { ToolButton } from '~components/Primitives/ToolButton'
import { Tooltip } from '~components/Primitives/Tooltip'
import {
  Circle2Icon,
  ShapeGroupIcon,
  SquareIcon,
  TriangleIcon,
} from '~components/Primitives/icons/icoTools'
import { useTldrawApp } from '~hooks'
import { TDShapeType, TDSnapshot, TDToolType } from '~types'

interface ShapesMenuProps {
  activeTool: TDToolType
  isToolLocked: boolean
}

type ShapeShape = TDShapeType.Rectangle | TDShapeType.Ellipse | TDShapeType.Triangle

const shapeShapes: ShapeShape[] = [TDShapeType.Rectangle, TDShapeType.Ellipse, TDShapeType.Triangle]

const shapeShapeIcons = {
  [TDShapeType.Rectangle]: <SquareIcon />,
  [TDShapeType.Ellipse]: <Circle2Icon />,
  [TDShapeType.Triangle]: <TriangleIcon />,
}

const dockPositionState = (s: TDSnapshot) => s.settings.dockPosition

export const ShapesMenu = React.memo(function ShapesMenu({
  activeTool,
  isToolLocked,
}: ShapesMenuProps) {
  const app = useTldrawApp()
  const intl = useIntl()

  const dockPosition = app.useStore(dockPositionState)

  const [lastActiveTool, setLastActiveTool] = React.useState<ShapeShape>(TDShapeType.Rectangle)

  React.useEffect(() => {
    if (shapeShapes.includes(activeTool as ShapeShape) && lastActiveTool !== activeTool) {
      setLastActiveTool(activeTool as ShapeShape)
    }
  }, [activeTool])

  const selectShapeTool = React.useCallback(() => {
    app.selectTool(lastActiveTool)
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

  const isActive = shapeShapes.includes(activeTool as ShapeShape)
  const contentSide = dockPosition === 'bottom' || dockPosition === 'top' ? 'top' : dockPosition

  const panelStyle = dockPosition === 'bottom' || dockPosition === 'top' ? 'row' : 'column'

  return (
    <MenuBar.Root dir="ltr" onValueChange={selectShapeTool}>
      <MenuBar.Menu>
        <MenuBar.Trigger dir="ltr" asChild id="TD-PrimaryTools-Shapes">
          {/* <div>E</div> */}
          <ToolButton
            disabled={isActive && app.shiftKey} // otherwise this continuously opens and closes on "SpacePanning"
            variant="primary"
            onDoubleClick={handleDoubleClick}
            isToolLocked={isActive && isToolLocked}
            isActive={isActive}
            onKeyDown={handleKeyDown}
            onClick={() => console.log(isActive)}
          >
            <ShapeGroupIcon />
          </ToolButton>
        </MenuBar.Trigger>
        <MenuBar.Portal>
          <MenuBar.Content asChild side={contentSide} sideOffset={12}>
            <Panel side="center" style={{ flexDirection: panelStyle }}>
              {shapeShapes.map((shape, i) => (
                <Tooltip
                  key={shape}
                  label={intl.formatMessage({ id: shape })}
                  kbd={(4 + i).toString()}
                  id={`TD-PrimaryTools-Shapes-${shape}`}
                >
                  <MenuBar.Item asChild>
                    <ToolButton
                      variant="primary"
                      onClick={() => {
                        app.selectTool(shape)
                        setLastActiveTool(shape)
                      }}
                    >
                      {shapeShapeIcons[shape]}
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
