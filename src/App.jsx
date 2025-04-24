import { useState } from 'react'
import './App.css'
import { Routes, Route, Link} from 'react-router-dom'
import AddPlayer from './components/AddPlayer'
import AllPlayers from './components/AllPlayers'
import SinglePlayer from './components/SinglePlayer'


function App() {
  const [players, setPlayers] = useState([])
  const [playerDetails, setPlayerDetails] = useState([])
  const [addPlayer, setAddPlayer] = useState(null)



  return (
    <>
    <div>
      <h1>Meet the Roster for Puppy Bowl 2025!</h1>
      <Link to="/allplayer" className='nav'>All Players</Link>
      <Link to="/addplayer" className='nav'>Add A Player</Link>
    </div>
    <div>
    <Routes>
          <Route path="/" element={<AllPlayers players={players} setPlayers={setPlayers} />} />
          <Route path="/allplayer" element={<AllPlayers players={players} setPlayers={setPlayers} />} />
          <Route path="/addplayer" element={<AddPlayer addPlayer={addPlayer} setAddPlayer={setAddPlayer} players={players} setPlayers={setPlayers}/>} />
          <Route path="/player/:id" element={<SinglePlayer />} />
      </Routes>
      </div>
    </>
  )
}

export default App
