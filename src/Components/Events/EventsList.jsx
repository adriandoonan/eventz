import EventTile from "./EventTile"

const EventsList = ({events}) => {
    console.log(events);
  return (
    events?.map(event => {
        return <EventTile key={event.id} event={event} />
      })
  )
}
export default EventsList