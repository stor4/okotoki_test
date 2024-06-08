import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import searchIcon from '@vscode/codicons/src/icons/search.svg'
import close from '@vscode/codicons/src/icons/close.svg'
import starFull from '@vscode/codicons/src/icons/star-full.svg'
import sadIcon from '../assets/sad_icon.svg'
import SearchItem from './SearchItem'
import data from '../coins'
import useLocalStorage from '../hooks/useLocaStorage'

function HeaderSearch() {
    const [open, setOpen] = useState(false)
    const [liked, setLiked] = useState(false)
    const [search, setSearch] = useState('')
    const [favorites, setFavorites] = useLocalStorage('favorites', [])
    const containerRef = useRef(null)
    const inputRef = useRef(null)
    const listRef = useRef(null)
    const portalRef = useRef(null)
    const [visibleData, setVisibleData] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(10)
    const ITEM_HEIGHT = 44
    const LIST_HEIGHT = 270

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

    const filteredData = useMemo(() => data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    ), [search])

    const filteredFavorites = useMemo(() => favorites.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    ), [search, favorites])

    const handleScroll = useCallback(() => {
        if (listRef.current) {
            const scrollTop = listRef.current.scrollTop;
            const newStartIndex = Math.floor(scrollTop / ITEM_HEIGHT);
            const newEndIndex = newStartIndex + Math.ceil(LIST_HEIGHT / ITEM_HEIGHT)

            setStartIndex(newStartIndex)
            setEndIndex(newEndIndex)
        }
    }, [ITEM_HEIGHT, LIST_HEIGHT])

    useEffect(() => {
        const updatedVisibleData = filteredData.slice(startIndex, endIndex);
        setVisibleData(updatedVisibleData)
    }, [filteredData, startIndex, endIndex])

    useEffect(() => {
        if (open) {
            if (listRef.current) {
                listRef.current.addEventListener('scroll', handleScroll)
            } 
        } else {
            if (listRef.current) {
                listRef.current.removeEventListener('scroll', handleScroll)
            }
        }
    }, [open, handleScroll])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target) &&
                portalRef.current &&
                !portalRef.current.contains(event.target)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const searchBTNStyle = `flex uppercase font-thin text-[16px] items-center px-[6px] py-[4px] rounded-[8px] hover:bg-textGray ${
        open ? 'border-[gray] border-[2px] bg-textGray' : ''
    }`

    const searchStyle = `
    min-h-[100px] w-[300px] absolute left-[250px] top-[46px] text-[white] bg-bgMain transition-all duration-150 ease-in-out rounded-[8px] border-[1px] border-borderColor overflow-hidden right-0 mt-[5px] font-IBM select-none text-textColor ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`;

    const noResultStyle = 'p-4 font-normal text-textGray text-[14px] text-center flex flex-col items-center';

    const favoritesBTN = `uppercase p-1 rounded-[4px] flex items-center
    ${liked ? 'font-semibold cursor-default' : 'hover:bg-textGray'}`

    const allCoinsBTN = `uppercase p-1 rounded-[4px]
    ${liked ? 'hover:bg-textGray' : 'font-semibold cursor-default'}`

    const deleteStyle = `${search.length === 0 ? 'hidden' : 'block'}`

    const iconColor = { filter: 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(7500%) hue-rotate(52deg) brightness(107%) contrast(109%)' }

    return (
        <div ref={containerRef} className='relative select-none text-textColor'>
            <button className={searchBTNStyle} onClick={() => setOpen(!open)}>
                <img src={searchIcon} className='h-[20px] mr-1.5 transform scale-x-[1]' style={iconColor} alt="search" />
                Search
            </button>
            {open && createPortal(
                <div ref={portalRef} className={searchStyle}>
                    <div className="flex p-2 border-b-[1px] relative border-b-borderColor">
                        <img src={searchIcon} className='h-[20px] mr-[5px] pt-1 pl-1' style={iconColor} alt="search" />
                        <input placeholder='Search...' ref={inputRef} onChange={(e) => setSearch(e.target.value)} className='bg-[transparent] text-[16px] w-full px-1 font-thin focus:outline-none focus:ring-0 focus:border-transparent pr-6 placeholder-textGray' type="text" />
                        <button className={deleteStyle} onClick={clearSearch}>
                            <img className='h-[24px] absolute right-[8px] top-[8px]' style={iconColor} src={close} alt="delete" />
                        </button>
                    </div>
                    <div className='flex gap-[20px] font-thin text-[16px] py-1.5 font-IBM-mono flex-row justify-center align-middle'>
                        <button disabled={liked} className={favoritesBTN} onClick={() => setLiked(true)}>
                            <img src={starFull} style={{ filter: 'brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(0%) hue-rotate(75deg) brightness(107%) contrast(100%)' }} alt='favorites' className='mr-[4px] h-[24px] pb-1' />
                            <span >Favorites</span>
                        </button>
                        <button disabled={!liked} className={allCoinsBTN} onClick={() => setLiked(false)}>
                            <span className='uppercase'>All coins</span>
                        </button>
                    </div>
                    <div ref={listRef} className='max-h-[260px] overflow-y-auto h-full'>
                        {liked ? (
                            <ul className='flex flex-col items-center h-full'>
                                {filteredFavorites.length > 0 ? filteredFavorites.map((item, key) =>
                                    <SearchItem name={item} key={key} setOpen={() => setOpen(false)} isFavorite={favorites.includes(item)} onToggleFavorite={() => toggleFavorite(item)} />
                                ) : (
                                    <div className={noResultStyle}>
                                        <img src={sadIcon} className='h-[134px]' alt="search-result" />
                                        <span>Ooops, nothing found</span>
                                    </div>
                                )}
                            </ul>
                        ) : (
                            filteredData.length > 0 ? (
                                <div style={{ height: filteredData.length * ITEM_HEIGHT + 'px', position: 'relative' }}>
                                    {visibleData.map((item, index) => (
                                        <div key={index + startIndex} style={{ position: 'absolute', top: (startIndex + index) * ITEM_HEIGHT + 'px', left: 0, right: 0 }}>
                                            <SearchItem
                                                name={item}
                                                isFavorite={favorites.includes(item)}
                                                onToggleFavorite={() => toggleFavorite(item)}
                                                setOpen={() => setOpen(false)} 
                                                style={{ height: ITEM_HEIGHT }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={noResultStyle}>
                                    <img src={sadIcon} className='h-[134px]' alt="search-result" />
                                    <span>Ooops, nothing found</span>
                                </div>
                            )
                        )}
                    </div>
                </div>,
                document.getElementById('portal-root')
            )}
        </div>
    )
}

export default HeaderSearch
