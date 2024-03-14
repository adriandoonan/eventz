import EventTile from "../Components/Events/EventTile"
import EventsList from "../Components/Events/EventsList"

const HomePage = ({events}) => {
  return (
    <div>
      <article id="homepage-hero">
        <img src="https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </article>
      <h1>Home Page</h1>
      <p>Hey, you like events? Here are some events!</p>
    <EventsList events={events.slice(0,4)} />
    </div>
  )
}
export default HomePage