import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Divider } from '~components/Primitives/Divider'
import { MBCheckboxItem, MBSubMenu } from '~components/Primitives/MenuBar'
import { useTldrawApp } from '~hooks'
import { styled } from '~styles'
import { TDDockPosition, TDExportBackground, TDSnapshot } from '~types'

const settingsSelector = (s: TDSnapshot) => s.settings

const DockPosition = ['bottom', 'left', 'right', 'top']

export function PreferencesMenu() {
  const app = useTldrawApp()
  const intl = useIntl()

  const settings = app.useStore(settingsSelector)

  const toggleDebugMode = React.useCallback(() => {
    app.setSetting('isDebugMode', (v) => !v)
  }, [app])

  const toggleDarkMode = React.useCallback(() => {
    app.setSetting('isDarkMode', (v) => !v)
  }, [app])

  const toggleFocusMode = React.useCallback(() => {
    app.setSetting('isFocusMode', (v) => !v)
  }, [app])

  const toggleGrid = React.useCallback(() => {
    app.setSetting('showGrid', (v) => !v)
  }, [app])

  const toggleKeepStyleMenuOpen = React.useCallback(() => {
    app.setSetting('keepStyleMenuOpen', (v) => !v)
  }, [app])

  const toggleCadSelectMode = React.useCallback(() => {
    app.setSetting('isCadSelectMode', (v) => !v)
  }, [app])

  const handleChangeDockPosition = React.useCallback(
    (position: TDDockPosition) => {
      app.setSetting('dockPosition', position)
    },
    [app]
  )

  const selectExportBackground = React.useCallback(
    (background: TDExportBackground) => {
      app.setSetting('exportBackground', background)
    },
    [app]
  )

  return (
    <MBSubMenu label={intl.formatMessage({ id: 'menu.preferences' })} id="TD-MenuItem-Preferences">
      {/* <MBCheckboxItem
        checked={settings.isDarkMode}
        onCheckedChange={toggleDarkMode}
        kbd="#⇧D"
        id="TD-MenuItem-Preferences-Dark_Mode"
      >
        <FormattedMessage id="preferences.dark.mode" />
      </MBCheckboxItem> */}
      <MBCheckboxItem
        checked={settings.isFocusMode}
        onCheckedChange={toggleFocusMode}
        kbd="#."
        id="TD-MenuItem-Preferences-Focus_Mode"
      >
        <FormattedMessage id="preferences.focus.mode" />
      </MBCheckboxItem>
      {/* <MBCheckboxItem
        checked={settings.isDebugMode}
        onCheckedChange={toggleDebugMode}
        id="TD-MenuItem-Preferences-Debug_Mode"
      >
        <FormattedMessage id="preferences.debug.mode" />
      </MBCheckboxItem> */}
      {/* <Divider /> */}
      <MBCheckboxItem
        checked={!settings.showGrid}
        onCheckedChange={toggleGrid}
        kbd="#⇧G"
        id="TD-MenuItem-Preferences-Grid"
      >
        <FormattedMessage id="preferences.show.grid" />
      </MBCheckboxItem>
      {/* <MBCheckboxItem
        checked={settings.isCadSelectMode}
        onCheckedChange={toggleCadSelectMode}
        id="TD-MenuItem-Preferences-Cad_Selection"
      >
        <FormattedMessage id="preferences.use.cad.selection" />
      </MBCheckboxItem> */}
      <MBCheckboxItem
        checked={settings.keepStyleMenuOpen}
        onCheckedChange={toggleKeepStyleMenuOpen}
        id="TD-MenuItem-Preferences-Style_menu"
      >
        <FormattedMessage id="preferences.keep.stylemenu.open" />
      </MBCheckboxItem>
      <MBSubMenu label={intl.formatMessage({ id: 'dock.position' })}>
        {DockPosition.map((position) => (
          <MBCheckboxItem
            key={position}
            checked={settings.dockPosition === position}
            onCheckedChange={() => handleChangeDockPosition(position as TDDockPosition)}
            id={`TD-MenuItem-DockPosition-${position}`}
          >
            <StyledText>
              <FormattedMessage id={position} />
            </StyledText>
          </MBCheckboxItem>
        ))}
      </MBSubMenu>
      {/* <MBSubMenu label={intl.formatMessage({ id: 'export.background' })}>
        {Object.values(TDExportBackground).map((exportBackground) => (
          <MBCheckboxItem
            key={exportBackground}
            checked={settings.exportBackground === exportBackground}
            onCheckedChange={() => selectExportBackground(exportBackground as TDExportBackground)}
            id={`TD-MenuItem-ExportBackground-${exportBackground}`}
          >
            <StyledText>
              <FormattedMessage id={exportBackground as string} />
            </StyledText>
          </MBCheckboxItem>
        ))}
      </MBSubMenu> */}
    </MBSubMenu>
  )
}

const StyledText = styled('span', {
  textTransform: 'capitalize',
})
