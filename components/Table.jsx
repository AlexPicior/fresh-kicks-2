import React, {useEffect, useState} from 'react'
import {Row, FirstRow} from '../components'
import {BiPlus} from 'react-icons/bi'
import { AiFillEdit } from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'



const Table = ({data, properties, editProperties, convertor, deleteMethod, editForm, form, setForm, defaultForm, getInputValue, createMethod, updateMethod, color, altColor}) => {
    
    const [diplayForm, setDiplayForm] = useState(false);
    const [formType, setFormType] = useState("Create");

    const setDisplayFormType = (display, type, dataItem) =>{
        if(type === "Edit")
        {
            setForm(dataItem);
        }
        else
        {
            setForm(defaultForm);
        }
        setDiplayForm(display);
        setFormType(type);
    }

    const saveForm = () =>{
        if(formType === "Create")
        {
            createMethod();
        }
        else if(formType === "Edit")
        {
            updateMethod();
        }
        setDiplayForm(false);
    }

    
    
    return (
        <div className='flex flex-col content-center flex-wrap pt-16 mb-32'>

            <button className={`${color} h-8 w-8 mb-10 text-white text-center rounded-lg ${altColor} transition-all duration-500`} onClick={() => setDisplayFormType(true, 'Create')} > <BiPlus className='relative left-2 font-extrabold'></BiPlus></button>
            
            <div className='shadow-xl bg-transparent'>
                <FirstRow properties={properties} color={color}></FirstRow>
                {data.map((dataItem, index)=>{ 
                    const list = convertor(dataItem);
                    return (
                    <div key={index} className='flex flex-row border-b-[2px] border-gray-300 w-fit relative z-0  h-12'>
                
                        {list.map((item, i) => (<div key={i} className={`flex ${properties[i].type == 'nr' ? 'w-[20vh]' : 'w-[30vh]'} content-center flex-wrap font-sans font-light truncate pl-5`}>{ item }</div>))}
            
                        <div className='flex w-[10vh] content-center flex-wrap justify-center' onClick={() => setDisplayFormType(true, 'Edit', dataItem)} > <button className='font-poppins text-blue-600'><AiFillEdit></AiFillEdit></button> </div>
                        <div className='flex w-[10vh] content-center flex-wrap justify-center' onClick={()=> deleteMethod(dataItem.id)} ><button className='font-poppins text-red-600'><BsTrash></BsTrash></button> </div>
                        
                    </div>
                )})}
                

                
                <div className={`${diplayForm ? 'block': 'hidden'} w-[99vw] h-[100vh] bg-black opacity-50 fixed z-10 top-0 left-0`} onClick={() => setDiplayForm(false)} ></div>
                <div className={`${diplayForm ? 'block': 'hidden'} w-[30vw] h-[80vh] bg-white fixed z-20 top-16 rounded-lg left-[35vw] px-7 py-5`}>
                    <div className='h-[5%] font-sans font-medium text-2xl'>{formType}</div>
                    <div className='overflow-y-auto h-[85%] px-3 pt-4'>
                        {editProperties.map((prop, i)=>(
                            <div key={i} className='flex flex-col mb-5'>
                                <span className='mb-1 font-sans font-medium'>{prop.name}</span>
                                {prop.type === 'str' || prop.type === 'nr' ? (
                                    <input className='border rounded-lg pl-2 font-sans w-[100%]' value={getInputValue(prop.name)} onChange={(e)=> editForm(e.target.value, prop.name)} type={`${prop.type == "str"? "text": "number"}`} />
                                ):(
                                    <select className='border rounded-lg' name="" id="" onChange={(e)=> editForm(e.target.value, prop.name)}>
                                        {prop.options.map((opt, i)=> <option key={i} value={`${opt.id}`}>{opt.name}</option>)}
                                    </select>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className='flex flex-row justify-between content-center flex-wrap h-[10%]'>
                        <button className='bg-red-700 h-10 w-20 text-white font-sans font-medium rounded-lg hover:bg-red-500 transition-all duration-500' onClick={() => setDiplayForm(false)} >Cancel</button>
                        <button className='bg-green-700 h-10 w-20 text-white font-sans font-medium rounded-lg hover:bg-green-500 transition-all duration-500' onClick={() => saveForm()} >Save</button>
                    </div>
                </div>
                
                
                
                
            </div>
        </div>
    )
}

export default Table