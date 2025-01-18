import React from 'react'
import { ButtonProps } from './ButtonProps'
import { StyleParams } from './ButtonV1'

export const buttonV2Styles = (params: StyleParams) => {
  const {textColor, backgroundColor, fontSize} = params
  return {
    color: textColor,
    backgroundColor: backgroundColor,
    textDecoration: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    padding: '.5em 1em',
    borderRadius: '.25em',
    fontSize: fontSize,
    border: 'none'
  }
}

const ButtonV2: React.FC<ButtonProps> = (props) => {
  const {onClick, textColor, displayText, backgroundColor, fontSize} = props
  const styles = buttonV2Styles({textColor, backgroundColor, fontSize})

  return (
    <button
      onClick={onClick()}
      style={styles}
  >
      {displayText}
    </button>
  )
}

export default ButtonV2