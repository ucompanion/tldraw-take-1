import type { TDShapeUtil } from '~state/shapes/TDShapeUtil'
import { TDShape, TDShapeType } from '~types'
import { ArrowUtil } from './ArrowUtil'
import { DrawUtil } from './DrawUtil'
import { EllipseUtil } from './EllipseUtil'
import { GroupUtil } from './GroupUtil'
import { HighlightUtil } from './HighlightUtil'
import { ImageUtil } from './ImageUtil'
import { RectangleUtil } from './RectangleUtil'
import { StickyUtil } from './StickyUtil'
import { TableUtil } from './TableUtil'
import { TemplateUtil } from './TemplateUtil'
import { TextUtil } from './TextUtil'
import { TriangleUtil } from './TriangleUtil'
import { VideoUtil } from './VideoUtil'

export const Rectangle = new RectangleUtil()
export const Triangle = new TriangleUtil()
export const Ellipse = new EllipseUtil()
export const Draw = new DrawUtil()
export const Highlight = new HighlightUtil()
export const Arrow = new ArrowUtil()
export const Text = new TextUtil()
export const Group = new GroupUtil()
export const Sticky = new StickyUtil()
export const Table = new TableUtil()
export const Image = new ImageUtil()
export const Video = new VideoUtil()
export const Template = new TemplateUtil()

export const shapeUtils = {
  [TDShapeType.Rectangle]: Rectangle,
  [TDShapeType.Triangle]: Triangle,
  [TDShapeType.Ellipse]: Ellipse,
  [TDShapeType.Draw]: Draw,
  [TDShapeType.Highlight]: Highlight,
  [TDShapeType.Arrow]: Arrow,
  [TDShapeType.Text]: Text,
  [TDShapeType.Group]: Group,
  [TDShapeType.Sticky]: Sticky,
  [TDShapeType.Table]: Table,
  [TDShapeType.Image]: Image,
  [TDShapeType.Video]: Video,
  [TDShapeType.Template]: Template,
}

export const getShapeUtil = <T extends TDShape>(shape: T | T['type']) => {
  if (typeof shape === 'string') return shapeUtils[shape] as unknown as TDShapeUtil<T>
  return shapeUtils[shape.type] as unknown as TDShapeUtil<T>
}
