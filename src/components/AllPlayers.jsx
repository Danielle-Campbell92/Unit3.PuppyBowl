import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

function AllPlayers({players, setPlayers}){
const [search, setSearch] = useState("")
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

useEffect(() => {
    if(search === ''){
      setFilteredPlayers(players)
    }else{
      const filtered = players.filter(
        (player) =>
          player.name.toLowerCase().includes(search.toLowerCase()) ||
          player.breed.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredPlayers(filtered)
    }
  }, [search, players])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleRemove = async (id) => {
    try{
        const id = localStorage.getItem("id")
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-PUPPIES/players/${id}`, {
            method: "DELETE",
        })
        if (response.ok) {
            setPlayers((prevPlayers) =>
              prevPlayers.filter((id) => player.id !== playerId)
            )
          } else {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return(
    <>
        <div>
            <h2 className='title'>Roster</h2>
            <input type='text' value={search} onChange={handleSearch} placeholder='Search by name or breed' className='search'/>
              {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                   <div key={player.id}>
                     <h2 className='titleName'>{player.name}</h2>
                     <img src={player.imageUrl} className='image'/>
                     <br></br>
                     <button onClick={() => navigate(`/player/${player.id}`)} className='button'>See More Details!</button>
                   </div>
                 ))) : (
                    <p>No players found</p>
                 )}
            <button className='button' onClick={() => handleRemove(player.id)}>Remove Player</button>    
      </div>
    </>
    )
}
export default AllPlayers