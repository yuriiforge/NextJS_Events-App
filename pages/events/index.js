import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const AllEventsPage = () => {
  const allEvents = getAllEvents();

  return (
    <>
      <EventsSearch />
      <EventList events={allEvents} />
    </>
  );
};

export default AllEventsPage;
