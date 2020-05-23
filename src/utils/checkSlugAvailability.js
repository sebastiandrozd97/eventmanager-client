import axios from 'axios';

const getEvents = async () => {
  return await axios.get(`${process.env.VUE_APP_API_URL}/events`, {
    headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`}
  })
}

const check = (events, slug, suffix) => {
  let result = null;
  if (suffix === 1) {
    result = events.find(event => event.slug === slug);
  } else {
    result = events.find(event => event.slug === slug + '-' + suffix);
  }
  if (result) {
    suffix++;
    return check(events, slug, suffix);
  } else if(suffix === 1){
    return slug
  } else {
    return slug + '-' + suffix;
  }
}

export const checkSlugAvailability = async (slug) => {
  const filteredEvents = [];
  let events = await getEvents();
  events.data.forEach(event => {
    if (event.slug.includes(slug)) {
      filteredEvents.push(event);
    }
  })
  if (filteredEvents) {
    let suffix = 1;
    return check(filteredEvents, slug, suffix);
  } else {
    return slug;
  }
}