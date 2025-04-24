import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddPlayer({setPlayers}){
    const [playerName, setPlayerName] = useState("")
    const [playerBreed, setPlayerBreed] = useState("")
    const [playerImageUrl, setPlayerImageUrl] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(
            "https://fsa-puppy-bowl.herokuapp.com/api/2501-PUPPIES/players",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: playerName,
                breed: playerBreed,
                imageUrl: playerImageUrl,
                status: "field", 
              }),
            }
          )
      
          const result = await response.json()
          console.log("Player added:", result.data)


          setPlayers((prev) => [...prev, result.data.newPlayer])
          setPlayerName("");
          setPlayerBreed("");
          setPlayerImageUrl("");
          navigate("/allplayer")
        } catch (error) {
          console.error(error);
        }
      }

    return(
        <>
        <div className="add-container">
            <h2>Add A Player!</h2>
            <form onSubmit={handleSubmit} className="add-form">
                <label>
                  Player Name: 
                  <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                </label>
                <br></br>
                <label>
                  Breed: 
                  <input value={playerBreed} onChange={(e) => setPlayerBreed(e.target.value)} />
                </label>
                <br></br>
                <label>
                   Image URL: 
                   <input value={playerImageUrl} onChange={(e) => setPlayerImageUrl(e.target.value)} />
                </label>
                <br></br>
                <button type="submit" className="button">Submit Player</button>     
            </form>
        </div>
        </>
    )
}
export default AddPlayer