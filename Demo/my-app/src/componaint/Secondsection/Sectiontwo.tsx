'use client'
import React from 'react'
import "./Section.css"
interface proptyp {
    main: string,
    second: string,
    therd:string
}
function Sectiontwo ({main,second,therd}:proptyp) {
  return (
      <div className='main'>
          <span className='line f'></span>
          <p className='wordone'>{main} </p>
          <span className='line s'></span>
          <h1 className='headerword'>{ second}</h1>
          <p className='wordtwo'>{therd }</p>
    </div>
  )
}

export default Sectiontwo