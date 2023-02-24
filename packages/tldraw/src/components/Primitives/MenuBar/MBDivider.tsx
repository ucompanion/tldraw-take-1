import { Separator } from '@radix-ui/react-menubar'
import { styled } from '~styles/stitches.config'

export const MBDivider = styled(Separator, {
  backgroundColor: '$hover',
  height: 1,
  marginTop: '$2',
  marginRight: '-$2',
  marginBottom: '$2',
  marginLeft: '-$2',
})
