import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
    // searchTerm = 'I AM BATMAN NOT!'  though this will work , but we should never do this as this goes against how react elements should work and be handled, as we have a setSearchTerm for this task. 
  return (
    <div className='search'>
      <div>
        <img src="search.svg" alt="search" />

        <input type="text"
         placeholder='Search through thousands of movies'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    </div>
  )
}

export default Search
