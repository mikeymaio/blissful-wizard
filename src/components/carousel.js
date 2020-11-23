import React from 'react'
import AwesomeSlider from 'react-awesome-slider'
// import withCaption from 'react-awesome-slider/dist/captioned'
import 'react-awesome-slider/dist/styles.css'
// import 'react-awesome-slider/dist/captioned.css'

export default function Carousel(props) {
  //   const Slider = props.withCaption ? withCaption(AwesomeSlider) : AwesomeSlider
  return <AwesomeSlider {...props}>{props.children}</AwesomeSlider>
}
