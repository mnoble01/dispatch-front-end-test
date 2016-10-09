import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'
import NAV_LINKS from 'lib/nav-links'
import Nav from 'components/nav'
import People from 'components/people'
import pluck from 'lodash.pluck'


class Home extends Component {
  render () {
    return (
      <div>
        Hello and welcome! To begin
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <section id='sidebar'>
          <h4>
            Friends of Friends
            <span className='smile'>:)</span>
          </h4>
          <Nav links={pluck(NAV_LINKS, 'text')} />
        </section>
        <section id='content'>
          {this.props.children}
        </section>
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to={NAV_LINKS[0].path} />
      {NAV_LINKS.map((link, i) => {
        return <Route key={link.path} path={link.path} component={link.component} pageTitle={link.text} />
      })}
    </Route>
  </Router>,
  document.getElementById('app')
)

export default {}