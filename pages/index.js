import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
  return (
    <div>
      <EventList events={props.featuredEvents} />
    </div>
  );
};

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
  };
}

export default HomePage;
