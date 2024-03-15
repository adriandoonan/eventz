import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import database from '../eventz-db.json'

const EventDetailPage = () => {
  const [event,setEvent] = useState(null)
  const {eventSlug} = useParams()


  useEffect(() => {
    console.log(eventSlug)
    const theEvent = database.events.find(event => event.slug === eventSlug)
    console.log(theEvent)
    setEvent(theEvent)
  },[])

  if (event == null) {
    return <h1>fetching event details</h1>
  }
  if (event === undefined) {
    return <h1>Couldn't find details for that event</h1>
  }
  const {name,startDate,endDate,organisers} = event
  return (
    <div>
      <h1>{name}</h1>
      <p>This event is happening from {startDate} to {endDate} and is organised by {organisers}</p>

    </div>
  )
}
export default EventDetailPage