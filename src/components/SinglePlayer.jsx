import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SinglePlayer({setPlayerDetails}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [playerDetails, setPlayerDetailsState] = useState(null)

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-PUPPIES/players/${id}`);
        const result = await response.json();
        setPlayerDetailsState(result.data.player)
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayerDetails()
  }, [id])

const handleBackButton = () => {
    navigate("/allplayer")
}

  return (
    <div className="details-container">
      {playerDetails ? (
        <>
          <img src={playerDetails.imageUrl} className="image" alt={playerDetails.name} />
          <h2 className='titleName'>{playerDetails.name}</h2>
          <p>Breed: {playerDetails.breed}</p>
          <p>Status: {playerDetails.status}</p>
          <p>Team ID: {playerDetails.teamId}</p>
          <button onClick={handleBackButton} className="button">
            Go Back To Puppies!
          </button>
        </>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
}

export default SinglePlayer;
