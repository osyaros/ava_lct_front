import React from 'react'
import cl from './SearchInput.module.css'
import search from '../../assets/images/search.svg'

function SearchInput({placeholder}) {
  return (
    <div className={cl.searchInput}>
        <input type="text" placeholder={placeholder} className={cl.searchInput__input}/>
        <img src={search} alt="search" className={cl.searchInput__image}/>
    </div>
  )
}

export default SearchInput