import { useNavigate } from "react-router-dom"

const EventTile = ({event}) => {
  const {id,name,startDate,endDate,organisers,slug} = event
  console.log('event props',id)
  const navigate = useNavigate()
  return (
    <article className="event-tile">
      <h2>{name}</h2>
      <p>This event runs from {startDate} until {endDate} and is organised by {organisers}</p>
      <button className="event-tile-more-info-button" type="button" onClick={() => {console.log(id);navigate(`/events/${slug}`)}}>More information</button>
    </article>
  )
}
export default EventTile