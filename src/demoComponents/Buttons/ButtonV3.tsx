import React from 'react'
import { ButtonProps } from './ButtonProps'
import { StyleParams } from './ButtonV1'

export const buttonV3Styles = (params: StyleParams) => {
  const {textColor, backgroundColor, fontSize} = params
  return {
    color: textColor,
    backgroundColor: backgroundColor,
    textDecoration: 'none',
    // boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(228, 228, 228, 0.3) 0px 7px 13px -3px, inset 0 7px 9px -7px rgba(0, 0, 0, 0.2)',
    // boxShadow: 'inset 0 7px 9px -7px rgba(0, 0, 0, 0.2)',
    boxShadow: '0px -1px 3px 1px rgba(255, 255, 255, 1), inset 0 2px 2px -1px rgba(255, 255, 255, 1), 0px 2px 3px 3px rgb(22, 22, 22, .2)',
    padding: '.5em 1em',
    borderRadius: '.25em',
    fontSize: fontSize,
    border: '1.5px solid #b5b6ba'
  }
}

const ButtonV3: React.FC<ButtonProps> = (props) => {
  const {onClick, textColor, displayText, backgroundColor, fontSize} = props
  const styles = buttonV3Styles({textColor, backgroundColor, fontSize})

  return (
    <button
      onClick={onClick()}
      style={styles}
  >
      {displayText}
    </button>
  )
}

export default ButtonV3