import { TldrawApp } from '~state'
import { TemplateTool } from './TemplateTool'

describe('TemplateTool', () => {
  it('creates tool', () => {
    const app = new TldrawApp()
    new TemplateTool(app)
  })
})
