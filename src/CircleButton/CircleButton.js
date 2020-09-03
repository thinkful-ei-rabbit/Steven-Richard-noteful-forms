import React from 'react'
import './CircleButton.css'


export default function NavCircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}
/* 
NavCircleButton.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
};  */