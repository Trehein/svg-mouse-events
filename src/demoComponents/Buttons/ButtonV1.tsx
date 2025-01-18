import React from 'react'
import { ButtonProps } from './ButtonProps'

export type StyleParams = {
  textColor: string,
  backgroundColor: string,
  fontSize?: string
}

export const buttonV1Styles = (params: StyleParams) => {
  const {textColor, backgroundColor, fontSize} = params
  return {
    color: textColor,
    backgroundColor: backgroundColor,
    textDecoration: 'none',
    // boxShadow: '0px 2px 6px 2px #D3D3D3',
    // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    border: 'none',
    padding: '.5em 1em',
    borderRadius: '.25em',
    fontSize: fontSize
  }
}

const ButtonV1: React.FC<ButtonProps> = (props) => {
  const {onClick, textColor, displayText, backgroundColor, fontSize} = props
  const styles = buttonV1Styles({textColor, backgroundColor, fontSize})

  return (
    <button
      onClick={onClick()}
      style={styles}
  >
      {displayText}
    </button>
  )
}

export default ButtonV1