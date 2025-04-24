import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'


function AllPlayers({players, setPlayers}){
const [searchTerm, setSearchTerm] = useState("")
const [filteredPlayers, setFilteredPlayers] = useState(players)
const navigate = useNavigate()

useEffect(()=> {
    const fetchPlayers = async () => {
    try{
        const response = await fetch ("https://fsa-puppy-bowl.herokuapp.com/api/2501-PUPPIES/players")
        const result = await response.json()
        console.log(result.data.players)
        setPlayers(result.data.players)
    }catch(error){
        console.log(error)
    }
}
fetchPlayers()
}, [setPlayers])

const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    if(term === ''){
        setFilteredPlayers(players);
      }else{
        const filtered = players.filter(
          (player) =>
            player.name.toLowerCase().includes(term.toLowerCase()) ||
            player.breed.toLowerCase().includes(term.toLowerCase()) 
        )
        setFilteredPlayers(filtered);
      }
    }

    return(
        <>
        <div>
            <h2 className='title'>Roster</h2>
            <input type='text' value={searchTerm} onChange={handleSearch} placeholder='Search by name or breed' className='search'/>
              {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                   <div key={player.id}>
                     <h2 className='titleName'>{player.name}</h2>
                     <img src={player.imageUrl} className='image' alt={player.name} />
                     <br></br>
                     <button onClick={() => navigate(`/player/${player.id}`)}>See More Details!</button>
                   </div>
                 ))) : (
                    <p>No players found</p>
                 )}
      </div>
        </>
    )
}
export default AllPlayers