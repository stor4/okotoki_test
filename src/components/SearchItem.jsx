import starFull from '@vscode/codicons/src/icons/star-full.svg'
import starEmpty from '@vscode/codicons/src/icons/star-empty.svg'

function SearchItem({name='BTC', setOpen, isFavorite, onToggleFavorite}) {
  return (
    <li className='flex font-thin w-full px-4 py-1 hover:bg-[gray] cursor-pointer'>
        <button onClick={onToggleFavorite}>
            <img style={{filter: 'brightness(0) saturate(100%) invert(34%) sepia(0%) saturate(1%) hue-rotate(161deg) brightness(94%) contrast(98%)'}}
            className='h-[24px] mr-[5px]' 
            src={isFavorite ? starFull : starEmpty} 
            alt={isFavorite ? 'Unfavorite' : 'Favorite'}
            />
        </button>
        <span className='w-full' onClick={setOpen}>{name}</span>
    </li>
  )
}

export default SearchItem