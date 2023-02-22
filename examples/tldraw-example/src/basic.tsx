import { Tldraw } from '@tldraw/tldraw'
import * as React from 'react'

export default function Basic() {
  return (
    <div className="tldraw">
      <Tldraw /* disableZoom backgroundOpacityValue={0.5} */ />
    </div>
  )
}
