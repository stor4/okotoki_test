import React from 'react'
import logo from '../assets/logo.svg'
import title from '../assets/title.svg'
import HeaderBTNS from './HeaderBTNS'
import HeaderSearch from './HeaderSearch'
import AddIcon from '@vscode/codicons/src/icons/add.svg'


function Header() {
  return (
    <header className='w-full flex flex-row text-[white]'>
        <nav className='flex flex-row p-[10px]'>
            <img src={logo} alt="logo" />
            <img className='ml-[10px]' src={title} alt="title" />
            <div className='flex flex-row items-center font-semibold ml-5 text-[18px]'>
                <a href="#">DOGE</a>
                <p className='font-thin ml-[10px]'>$0.163</p>
                <HeaderBTNS />
                <HeaderSearch/>                
            </div>
        </nav>
    </header>
  )
}

export default Header