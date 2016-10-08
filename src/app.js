// import Backbone from 'backbone'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, hashHistory, Link} from 'react-router'
// <script type="text/jsx">
//   // React Code Goes Here
//   ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('app-entry')
//   )
// </script>

console.log('whatup')

// export default App
// var Chat = require('./Chat');
// import App from 'friends'

class Person extends Component {
  render () {
    return (
      <div>
        <div className='name'>{this.props.name}</div>
        <div className='subjects'>{this.props.subjects}</div>
      </div>
    )
  }
}

class People extends Component {
  static get defaultProps () {
    return {
      people: []
    }
  }

  render () {
    return (
      <div>
      People
      {this.props.people.map((p) => {
        return <Person props={p}/>
      })}
      </div>
    )
  }
}

class Search extends Component {
  render () {
    return (
      <div>
      Search here
      </div>
    )
  }
}

class AppNav extends Component {
  static get defaultProps() {
    return {
      links: [
        'Search',
        'People'
      ]
    }
  }

  render () {
    return (
      <nav>
        <ul>
          {this.props.links.map((l, i) => {
            // assuming unique link text
            let href = l.toLowerCase()
            return <li key={href}>
              <Link to={href} activeClassName='active'> {l} </Link>
            </li>
          })}
        </ul>
      </nav>
    )
  }
}

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
          <AppNav />
        </section>
        <section id='content'>
          {this.props.children}
        </section>
      </div>
    )
  }
}


// ReactDOM.render(
//   <App />,
// )
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='search' />
      <Route path='search' component={Search} />
      <Route path='people' component={People} />
    </Route>
  </Router>,
  document.getElementById('app')
)


// export default {}

// let AppRouter = Backbone.Router.extend({
//   routes: {
//     '': 'people',
//     people: 'people',
//     search: 'search'
//   },

//   people () {
//     console.log('people')
//   },

//   search () {
//     console.log('search')
//   }
// })

// new AppRouter
// Backbone.history.start({root: '/'})

export default {}