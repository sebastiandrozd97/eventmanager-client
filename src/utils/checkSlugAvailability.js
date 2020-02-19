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
  } else {
    return slug + '-' + suffix;
  }
}

export const checkSlugAvailability = (events, slug) => {
  const filteredEvents = [];
  events.forEach(event => {
    if (event.data().slug.includes(slug)) {
      filteredEvents.push(event.data());
    }
  })
  if (filteredEvents) {
    let suffix = 1;
    return check(filteredEvents, slug, suffix);
  } else {
    return slug;
  }
}