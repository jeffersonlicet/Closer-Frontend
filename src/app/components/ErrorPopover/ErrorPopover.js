import React from 'react'
import { Popover } from 'antd'

import './ErrorPopover.css'
const ErrorPopover = (props) => {
  return (
      <Popover
        content={props.content}
        title={props.title}
        visible={props.visible}
        placement={props.placement}>
        {props.children}
      </Popover>
  )
}

export default ErrorPopover
