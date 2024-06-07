import { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import searchIcon from '@vscode/codicons/src/icons/search.svg'
import close from '@vscode/codicons/src/icons/close.svg'
import starFull from '@vscode/codicons/src/icons/star-full.svg'
import SearchItem from './SearchItem';
import data from '../coins'
import useLocalStorage from '../hooks/useLocaStorage'

function HeaderSearch() {
    const [open, setOpen] = useState(false)
    const [liked, setLiked] = useState(false)
    const [search, setSearch] = useState('')
    const [favorites, setFavorites] = useLocalStorage('favorites', [])
    const containerRef = useRef(null)
    const inputRef = useRef(null)
    // console.log(data)
    // console.log(favorites)

    const toggleFavorite = (currency) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(currency)) {
                return prevFavorites.filter(fav => fav !== currency)
            } else {
                return [...prevFavorites, currency]
            }
        })
    }

    const clearSearch = () => {
        setSearch('')
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const filteredData = data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    )

    const Row = ({index, style}) => (
        <div style={style}>
            <SearchItem
            key={filteredData[index]}
            name={filteredData[index]}
            isFavorite={favorites.includes(filteredData[index])}
            onToggleFavorite={() => toggleFavorite(filteredData[index])}
            />
        </div>
    )

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [containerRef])

    const searchStyle = `
    min-h-[100px] w-[300px] absolute bg-bgMain transition-all duration-150 ease-in-out rounded-[8px] border-[1px] border-borderColor overflow-hidden right-0 mt-[5px] ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`

    const deleteStyle = `
    ${search.length !== 0 ? 'display: block' : 'display: none'}
    `
    const iconColor = {filter: 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(7500%) hue-rotate(52deg) brightness(107%) contrast(109%)'}

  return (
    <div ref={containerRef} className='relative '>
        <button className='flex uppercase font-thin text-[18px] items-center px-1 py-0.5 rounded-[8px] hover:bg-[gray]'
        onClick={() => setOpen(!open)}>
            <img src={searchIcon} className='h-[20px] mr-1.5' style={iconColor} alt="search" />
            Search
        </button>
        <div className={searchStyle}>
            <div className="flex p-2 border-b-[1px] relative border-b-borderColor">
                <img src={searchIcon} className='h-[20px] mr-[5px] pt-1 pl-1' style={iconColor} alt="search" />
                <input placeholder='Search...' ref={inputRef} onChange={(e) => setSearch(e.target.value)} className='bg-[transparent] text-[16px] w-full px-1 font-thin focus:outline-none focus:ring-0 focus:border-transparent pr-6' type="text" />
                <button className={deleteStyle} onClick={clearSearch}>
                    <img className='h-[24px] absolute right-[8px] top-[8px]' style={iconColor} src={close} alt="delete" />
                </button>
            </div>
            <div className='flex gap-[20px] font-thin text-[16px] py-1.5 font-IBM-mono flex-row justify-center align-middle'>
                <button className='uppercase p-1 rounded-[4px] flex items-center hover:bg-[gray]' onClick={() => setLiked(true)}>
                    <img src={starFull} style={{filter: 'brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(0%) hue-rotate(75deg) brightness(107%) contrast(100%)'}} alt='favorites' className='mr-[4px] h-[24px] pb-1'/>
                    <span>Favorites</span>
                </button>
                <button className='uppercase p-1 rounded-[4px] hover:bg-[gray]' onClick={() => setLiked(false)}>
                    All coins
                </button>
            </div>
            <div className='max-h-[240px] overflow-y-auto '>
                {liked ? <ul className='flex flex-col items-center'>
                    {favorites.filter((item) => {
                        return search.toLowerCase() === '' ? item : item.toLowerCase().includes(search)
                    }).map((item, key) => 
                    <SearchItem name={item} key={key} setOpen={() => setOpen(false)} isFavorite={favorites.includes(item)} onToggleFavorite={() => toggleFavorite(item)}/>
                    )}
                </ul> : <ul className='flex flex-col items-center'>
                    <List
                    className='List'
                    height={250}
                    itemCount={filteredData.length}
                    itemSize={35}
                    width={300}
                    >
                        {Row}
                    </List>
                </ul>}
            </div>
        </div>
    </div>
  )
}

export default HeaderSearch