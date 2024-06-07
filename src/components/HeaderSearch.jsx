import { useEffect, useRef, useState } from 'react';
import searchIcon from '../assets/search-icon.svg';
import star from '../assets/star.svg'
import cross from '../assets/cross.svg'
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

  return (
    <div ref={containerRef} className='relative '>
        <button className='flex uppercase font-thin text-[18px] items-center px-1 py-0.5 rounded-[8px] hover:bg-[gray]'
        onClick={() => setOpen(!open)}>
            <img src={searchIcon} alt="search" />
            Search
        </button>
        <div className={searchStyle}>
            <div className="flex p-2 border-b-[1px] relative border-b-borderColor">
                <img src={searchIcon} alt="search" className='mr-[10px]' />
                <input placeholder='Search...' ref={inputRef} onChange={(e) => setSearch(e.target.value)} className='bg-[transparent] text-[16px] w-full px-1 font-thin focus:outline-none focus:ring-0 focus:border-transparent pr-6' type="text" />
                <button className={deleteStyle} onClick={clearSearch}><img className='h-[14px] absolute right-[10px] top-[13px]' src={cross} alt="delete" /></button>
            </div>
            <div className='flex gap-[20px] font-thin text-[16px] py-2 flex-row justify-center align-middle'>
                <button className='uppercase flex items-center hover:bg-[gray]' onClick={() => setLiked(true)}>
                    <img src={star} alt='favorites' className='mr-[4px] pb-0.5'/>
                    Favorites
                </button>
                <button className='uppercase hover:bg-[gray]' onClick={() => setLiked(false)}>
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
                    {data.filter((item) => {
                        return search.toLowerCase() === '' ? item : item.toLowerCase().includes(search)
                    }).map((item, key) => 
                        <SearchItem name={item} key={key} setOpen={() => setOpen(false)} isFavorite={favorites.includes(item)} onToggleFavorite={() => toggleFavorite(item)}/>
                    )}
                </ul>}
            </div>

            
        </div>
        
    </div>
  )
}

export default HeaderSearch