import React from 'react'

const FirstRow = ({properties, color}) => {
    return (
        <div className={`flex flex-row ${color} rounded-t-lg w-fit relative z-0  h-12`}>
            
            {properties.map((prop, i) => (<div key={i} className={`flex ${prop.type == 'nr' ? 'w-[20vh]' : 'w-[30vh]'} text-white content-center flex-wrap font-sans font-medium  pl-5 `}>{ prop.name }</div>))}

            <div className='flex w-[10vh] content-center flex-wrap font-poppins justify-center'></div>
            <div className='flex w-[10vh] content-center flex-wrap font-poppins justify-center'></div>
            
        </div>
    )
}

export default FirstRow