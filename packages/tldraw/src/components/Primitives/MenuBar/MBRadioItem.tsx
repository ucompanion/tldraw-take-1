import { RadioItem } from '@radix-ui/react-menubar'
import { styled } from '~styles/stitches.config'

export const MBRadioItem = styled(RadioItem, {
  height: '32px',
  width: '32px',
  backgroundColor: '$panel',
  borderRadius: '4px',
  padding: '0',
  margin: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  border: 'none',
  pointerEvents: 'all',
  cursor: 'pointer',

  variants: {
    isActive: {
      true: {
        backgroundColor: '$selected',
        color: '$text',
      },
      false: {},
    },
    bp: {
      mobile: {},
      small: {},
    },
  },

  compoundVariants: [
    {
      isActive: false,
      bp: 'small',
      css: {
        '&:focus': {
          backgroundColor: '$hover',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: '$hover',
        },
      },
    },
  ],
})
