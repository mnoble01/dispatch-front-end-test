// import Backbone from 'backbone'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router'
import {Nav, NavItem} from 'react-bootstrap'
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
      // <ul>
      //   <li>
      //     <a onClick={this.handleClick}>
      //       <i className='glyphicon glyphicon-globe'/>
      //       Friends of Friends
      //     </a>
      //   </li>
      //   {this.props.links.map((l) => {
      //     // assuming unique link text
      //     return <li key={l} className={this.state.selected == l ? 'active' : ''}>
      //       <a onClick={this.handleClick}>{l}</a>
      //     </li>
      //   })}
      // </ul>
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
        <header>
          <h4>
            <i className='glyphicon glyphicon-globe'/>
            Friends of Friends
          </h4>
          <AppNav />
        </header>
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
      <IndexRoute component={Search} />
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