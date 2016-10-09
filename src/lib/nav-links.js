import Search from 'components/search'
import People from 'components/people'

// you can assume unique link text/path (i.e. you can use for child keys)
const NAV_LINKS = [{
  text: 'Search',
  path: 'search',
  component: Search
}, {
  text: 'People',
  path: 'people',
  component: People
}]

export default NAV_LINKS
