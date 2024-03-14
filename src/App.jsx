import "./App.scss";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import EventsListPage from "./Pages/EventsListPage";
import EventDetailPage from "./Pages/EventDetailPage";
import PerformersListPage from "./Pages/PerformersListPage";
import PerformerDetailPage from "./Pages/PerformerDetailPage";
import AdminPage from "./Pages/AdminPage";
import SubmitEventPage from "./Pages/SubmitEventPage";
import NotFoundPage from "./Pages/NotFoundPage";
import HeaderNav from "./Components/Navigation/HeaderNav";
import Footer from "./Components/Navigation/Footer";
import SideBar from "./Components/Navigation/SideBar";
import AboutPage from "./Pages/AboutPage";
import EventsCalendarPage from "./Pages/EventsCalendarPage";

import database from './eventz-db.json';


function App() {
  return (
    <>
    <HeaderNav />

      <section id="main-content">
        
        <SideBar />

        <main className="">
          

          <Routes>
            <Route path="/" element={<HomePage events={database.events.slice(0,4)} />} />

            <Route path="/events" element={<EventsListPage />} />
            
            <Route path="/events-calendar" element={<EventsCalendarPage />} />

            <Route path="/events/:eventSlug" element={<EventDetailPage />} />

            <Route path="/events/:eventSlug/performers" element={<PerformersListPage />} />
            
            <Route path="/events/:eventSlug/performers/:performerId" element={<PerformerDetailPage />} />

            <Route path="/events/submit-event" element={<SubmitEventPage />} />

            <Route path="/about" element={<AboutPage />} />

            <Route path="/admin" element={<AdminPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        
        </main>
       
      </section>
      <Footer />
    </>
  );
}

export default App;
