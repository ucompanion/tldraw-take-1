import * as MenuBar from '@radix-ui/react-menubar'
import { supported } from 'browser-fs-access'
import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FilenameDialog } from '~components/Primitives/AlertDialog'
import { Divider } from '~components/Primitives/Divider'
import { MBContent, MBItem, MBSubMenu, MBTriggerIcon } from '~components/Primitives/MenuBar'
import { HamburgerMenuIcon } from '~components/Primitives/icons/icoCommon'
import { preventEvent } from '~components/preventEvent'
import { useTldrawApp } from '~hooks'
import { useFileSystemHandlers } from '~hooks'
import { TDExportType, TDSnapshot } from '~types'
import { PreferencesMenu } from '../PreferencesMenu'

interface MenuProps {
  readOnly: boolean
}

const numberOfSelectedIdsSelector = (s: TDSnapshot) => {
  return s.document.pageStates[s.appState.currentPageId].selectedIds.length
}

const disableAssetsSelector = (s: TDSnapshot) => {
  return s.appState.disableAssets
}

export const Menu = React.memo(function Menu({ readOnly }: MenuProps) {
  const app = useTldrawApp()
  const intl = useIntl()
  const [openDialog, setOpenDialog] = React.useState(false)

  const numberOfSelectedIds = app.useStore(numberOfSelectedIdsSelector)

  const disableAssets = app.useStore(disableAssetsSelector)

  const [_, setForce] = React.useState(0)

  React.useEffect(() => setForce(1), [])

  const { onNewProject, onOpenProject, onSaveProject, onSaveProjectAs } = useFileSystemHandlers()

  const handleSaveProjectAs = React.useCallback(() => {
    if (!supported) {
      setOpenDialog(true)
    } else {
      app.saveProjectAs()
    }
  }, [app])

  const handleDelete = React.useCallback(() => {
    app.delete()
  }, [app])

  const handleCopySVG = React.useCallback(() => {
    app.copyImage(TDExportType.SVG, { scale: 1, quality: 1, transparentBackground: false })
  }, [app])

  const handleCopyPNG = React.useCallback(() => {
    app.copyImage(TDExportType.PNG, { scale: 2, quality: 1, transparentBackground: true })
  }, [app])

  const handleExportPNG = React.useCallback(async () => {
    app.exportImage(TDExportType.PNG, { scale: 2, quality: 1 })
  }, [app])

  const handleExportJPG = React.useCallback(async () => {
    app.exportImage(TDExportType.JPG, { scale: 2, quality: 1 })
  }, [app])

  const handleExportWEBP = React.useCallback(async () => {
    app.exportImage(TDExportType.WEBP, { scale: 2, quality: 1 })
  }, [app])

  const handleExportSVG = React.useCallback(async () => {
    app.exportImage(TDExportType.SVG, { scale: 2, quality: 1 })
  }, [app])

  const handleCopyJSON = React.useCallback(async () => {
    app.copyJson()
  }, [app])

  const handleExportJSON = React.useCallback(async () => {
    app.exportJson()
  }, [app])

  const handleCut = React.useCallback(() => {
    app.cut()
  }, [app])

  const handleCopy = React.useCallback(() => {
    app.copy()
  }, [app])

  const handlePaste = React.useCallback(() => {
    app.paste()
  }, [app])

  const handleSelectAll = React.useCallback(() => {
    app.selectAll()
  }, [app])

  const handleSelectNone = React.useCallback(() => {
    app.selectNone()
  }, [app])

  const handleUploadMedia = React.useCallback(() => {
    app.openAsset()
  }, [app])

  const handleZoomTo100 = React.useCallback(() => {
    app.zoomTo(1)
  }, [app])

  const showFileMenu =
    app.callbacks.onNewProject ||
    app.callbacks.onOpenProject ||
    app.callbacks.onSaveProject ||
    app.callbacks.onSaveProjectAs ||
    app.callbacks.onExport

  const hasSelection = numberOfSelectedIds > 0

  return (
    <>
      <MenuBar.Root dir="ltr">
        <MenuBar.Menu>
          <MBTriggerIcon id="TD-MenuIcon">
            <HamburgerMenuIcon />
          </MBTriggerIcon>
          <MBContent variant="menu" id="TD-Menu" side="bottom" align="end">
            {showFileMenu && (
              <MBSubMenu
                label={`${intl.formatMessage({ id: 'menu.file' })}...`}
                id="TD-MenuItem-File"
              >
                {app.callbacks.onNewProject && (
                  <MBItem onClick={onNewProject} kbd="#N" id="TD-MenuItem-File-New_Project">
                    <FormattedMessage id="new.project" />
                  </MBItem>
                )}
                {app.callbacks.onOpenProject && (
                  <MBItem onClick={onOpenProject} kbd="#O" id="TD-MenuItem-File-Open">
                    <FormattedMessage id="open" />
                    ...
                  </MBItem>
                )}
                {app.callbacks.onSaveProject && (
                  <MBItem onClick={onSaveProject} kbd="#S" id="TD-MenuItem-File-Save">
                    <FormattedMessage id="save" />
                  </MBItem>
                )}
                {app.callbacks.onSaveProjectAs && (
                  <MBItem onClick={handleSaveProjectAs} kbd="#⇧S" id="TD-MenuItem-File-Save_As">
                    <FormattedMessage id="save.as" />
                    ...
                  </MBItem>
                )}
                {!disableAssets && (
                  <>
                    <Divider />
                    <MBItem onClick={handleUploadMedia} kbd="#U" id="TD-MenuItem-File-Upload_Media">
                      <FormattedMessage id="upload.media" />
                    </MBItem>
                  </>
                )}
              </MBSubMenu>
            )}
            <MBSubMenu
              label={`${intl.formatMessage({ id: 'menu.edit' })}...`}
              id="TD-MenuItem-Edit"
            >
              <MBItem
                onSelect={preventEvent}
                onClick={app.undo}
                disabled={readOnly}
                kbd="#Z"
                id="TD-MenuItem-Edit-Undo"
              >
                <FormattedMessage id="undo" />
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                onClick={app.redo}
                disabled={readOnly}
                kbd="#⇧Z"
                id="TD-MenuItem-Edit-Redo"
              >
                <FormattedMessage id="redo" />
              </MBItem>
              <Divider />
              <MBItem
                onSelect={preventEvent}
                disabled={!hasSelection || readOnly}
                onClick={handleCut}
                kbd="#X"
                id="TD-MenuItem-Edit-Cut"
              >
                <FormattedMessage id="cut" />
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                disabled={!hasSelection}
                onClick={handleCopy}
                kbd="#C"
                id="TD-MenuItem-Edit-Copy"
              >
                <FormattedMessage id="copy" />
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                onClick={handlePaste}
                kbd="#V"
                id="TD-MenuItem-Edit-Paste"
              >
                <FormattedMessage id="paste" />
              </MBItem>
              <Divider />
              <MBSubMenu
                label={`${intl.formatMessage({ id: 'copy.as' })}...`}
                size="small"
                id="TD-MenuItem-Copy-As"
              >
                <MBItem onClick={handleCopySVG} id="TD-MenuItem-Copy-as-SVG">
                  SVG
                </MBItem>
                <MBItem onClick={handleCopyPNG} id="TD-MenuItem-Copy-As-PNG">
                  PNG
                </MBItem>
                <MBItem onClick={handleCopyJSON} id="TD-MenuItem-Copy_as_JSON">
                  JSON
                </MBItem>
              </MBSubMenu>
              <MBSubMenu
                label={`${intl.formatMessage({ id: 'export.as' })}...`}
                size="small"
                id="TD-MenuItem-Export"
              >
                <MBItem onClick={handleExportSVG} id="TD-MenuItem-Export-SVG">
                  SVG
                </MBItem>
                <MBItem onClick={handleExportPNG} id="TD-MenuItem-Export-PNG">
                  PNG
                </MBItem>
                <MBItem onClick={handleExportJPG} id="TD-MenuItem-Export-JPG">
                  JPG
                </MBItem>
                <MBItem onClick={handleExportWEBP} id="TD-MenuItem-Export-WEBP">
                  WEBP
                </MBItem>
                <MBItem onClick={handleExportJSON} id="TD-MenuItem-Export-JSON">
                  JSON
                </MBItem>
              </MBSubMenu>

              <Divider />
              <MBItem
                onSelect={preventEvent}
                onClick={handleSelectAll}
                kbd="#A"
                id="TD-MenuItem-Select_All"
              >
                <FormattedMessage id="select.all" />
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                disabled={!hasSelection}
                onClick={handleSelectNone}
                id="TD-MenuItem-Select_None"
              >
                <FormattedMessage id="select.none" />
              </MBItem>
              <Divider />
              <MBItem
                onSelect={handleDelete}
                disabled={!hasSelection}
                kbd="⌫"
                id="TD-MenuItem-Delete"
              >
                <FormattedMessage id="delete" />
              </MBItem>
            </MBSubMenu>
            <MBSubMenu label={intl.formatMessage({ id: 'menu.view' })} id="TD-MenuItem-Edit">
              <MBItem
                onSelect={preventEvent}
                onClick={app.zoomIn}
                kbd="#+"
                id="TD-MenuItem-View-ZoomIn"
              >
                <FormattedMessage id="zoom.in" />
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                onClick={app.zoomOut}
                kbd="#-"
                id="TD-MenuItem-View-ZoomOut"
              >
                <FormattedMessage id="zoom.out" />
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                onClick={handleZoomTo100}
                kbd="⇧+0"
                id="TD-MenuItem-View-ZoomTo100"
              >
                <FormattedMessage id="zoom.to" /> 100%
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                onClick={app.zoomToFit}
                kbd="⇧+1"
                id="TD-MenuItem-View-ZoomToFit"
              >
                <FormattedMessage id="zoom.to.fit" />
              </MBItem>
              <MBItem
                onSelect={preventEvent}
                onClick={app.zoomToSelection}
                kbd="⇧+2"
                id="TD-MenuItem-View-ZoomToSelection"
              >
                <FormattedMessage id="zoom.to.selection" />
              </MBItem>
            </MBSubMenu>
            <Divider />
            <PreferencesMenu />
          </MBContent>
        </MenuBar.Menu>
      </MenuBar.Root>
      <FilenameDialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  )
})
