import { getEventById, getAllEvents } from '../../helpers/api-util';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/UI/error-alert';

const EventDetailPage = (props) => {
  if (!props.selectedEvent) {
    return (
      <ErrorAlert>
        <p>No event found.</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={props.selectedEvent.title} />
      <EventLogistics
        date={props.selectedEvent.date}
        address={props.selectedEvent.location}
        image={props.selectedEvent.image}
        imageAlt={props.selectedEvent.title}
      />
      <EventContent>
        <p>{props.selectedEvent.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: false,
  };
}

export default EventDetailPage;
