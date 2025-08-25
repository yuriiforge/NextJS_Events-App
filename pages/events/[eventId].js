import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventDetailPage = (props) => {
  if (!props.selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export default EventDetailPage;
