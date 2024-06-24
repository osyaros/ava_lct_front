import React, { useRef } from 'react'
import cl from './SearchInput.module.css'
import search from '../../assets/images/search.svg'

function SearchInput({placeholder, setSearchQuery, searchQuery}) {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  }


  return (
    <div className={cl.searchInput}>
        <input 
          ref={inputRef}
          type="text" 
          placeholder={placeholder} 
          className={cl.searchInput__input} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img src={search} alt="search" className={cl.searchInput__image} onClick={handleFocus}/>
    </div>
  )
}

export default SearchInput