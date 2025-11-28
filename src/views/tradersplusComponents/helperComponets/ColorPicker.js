/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import Compact from 'react-color/lib/components/compact/Compact';
import style from "./colorPicker.module.css"

const ColorPicker = ({setAddBannerState ,submitState ,setSubmitState ,hexColor = ""}) => {

  

    const [state ,setState] = useState({
        displayColorPicker: false,
        color: {
          r: '0',
          g: '0',
          b: '0',
          a: '1',
        },
    })

    useEffect(() => {
     
        return setState({
          displayColorPicker: false,
          color: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
          },
        })
    } ,[submitState])

  const handleClick = () => {
    setState({ ...state , displayColorPicker: !state.displayColorPicker })
  };

  const handleClose = () => {
    setState({...state , displayColorPicker: false })
  };

   const handleChange = (color) => {
      setAddBannerState(color.hex)
      setState({ ...state , color: color.rgb })
  };

    const styles = reactCSS({
      'default': {
        color: {
          width: '100%',
          height: '14px',
          borderRadius: '2px',
          background: hexColor ? hexColor.length > 0 ? hexColor : `rgba(${ state.color.r }, ${ state.color.g }, ${ state.color.b }, ${ state.color.a })` :`rgba(${ state.color.r }, ${ state.color.g }, ${ state.color.b }, ${ state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          width:"100%",
          
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          width:"55%",
        
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          width:"100%"
        },
      },
    });

    return (
      <div style={{width:"90% !important"}}>
        <div style={ styles.swatch } onClick={ handleClick }>
          <div style={ styles.color } />
        </div>
        { state.displayColorPicker ? 
        <div className={style.popover} style={ styles.popover }>
          <div style={ styles.cover } onClick={ handleClose } className={"sssssssssssssssssssssssss"}/>
          <Compact  className={style.compact} color={ state.color } onChange={ handleChange } />
        </div> : null 
        }

      </div>
    )
}

export default React.memo(ColorPicker);