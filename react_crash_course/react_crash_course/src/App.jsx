import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);
  //this allows cards to manage their own states independently, making the component reusable and isolated
  //Hooks are special functions in react that let you tap into react features like state management , etc. There are many types of hooks in react: 
  //useState: for managing state
  //useEffect: for handling side effects like data fetching
  //useContext: for sharing data across components
  //useCallback: for optimizing calllback functions

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked])

  useEffect(() => {
    console.log('CARD RENDERED');
  }, [])

  return(
    <div className='card' style={{
      border: '1px solid #4b5362',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#31363f',
      borderRadius: '10px',
      minHeight: '100px',
    }} onClick={() => setCount((prevState) => prevState+1)}>
      <h2>{title} <br /> {count || null}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>  
        {/* now we can like and unlike each card */}
        {hasLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  )
}

const App = () => {
  
  return(
    <div className='card-container'>
      <h2>
        Functional Arrow Component
      </h2>

      <Card title="Stars Wars" rating={5} isCool={true} actors={[{name: 'Actor1'}, {name: 'Actor2'}]} />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
  )
}

export default App
