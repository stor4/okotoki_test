import star_e from '../assets/star_empty.svg'
import star from '../assets/star.svg'

function SearchItem({name='BTC', setOpen, isFavorite, onToggleFavorite}) {
  return (
    <li className='flex font-thin w-full px-4 py-1 hover:bg-[gray] cursor-pointer'>
        <button onClick={onToggleFavorite}>
            <img className='h-[24px] mr-[5px]' 
            src={isFavorite ? star : star_e} 
            alt={isFavorite ? 'Unfavorite' : 'Favorite'}
            />
        </button>
        <span className='w-full' onClick={setOpen}>{name}</span>
    </li>
  )
}

export default SearchItem