import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// <script type="text/jsx">
//   // React Code Goes Here
//   ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('app-entry')
//   )
// </script>

console.log('whatup')

// class FriendsApp extends React.Component {
//   constructor(props) {
//     console.log('heya')
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.state = {items: [], text: ''}
//   }

//   render() {
//     return (
//       <div>
//         <h3>TODO</h3>
//         <TodoList items={this.state.items} />
//         <form onSubmit={this.handleSubmit}>
//           <input onChange={this.handleChange} value={this.state.text} />
//           <button>{'Add #' + (this.state.items.length + 1)}</button>
//         </form>
//       </div>
//     )
//   }

//   handleChange(e) {
//     this.setState({text: e.target.value})
//   }

//   handleSubmit(e) {
//     e.preventDefault()
//     var newItem = {
//       text: this.state.text,
//       id: Date.now()
//     };
//     this.setState((prevState) => ({
//       items: prevState.items.concat(newItem),
//       text: ''
//     }))
//   }
// }

// export default FriendsApp
// var Chat = require('./Chat');
// import FriendsApp from 'friends'

class Nav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  static get defaultProps() {
    return {
      links: []
    }
  }

  render () {
    return (
      <ul className='nav nav-pills nav-stacked'>
        <li className='sidebar-brand'>
          <a onClick={this.handleClick}>
            <i className='glyphicon glyphicon-globe'/>
            Friends of Friends
          </a>
        </li>
        {this.props.links.map((l) => {
          // assuming unique link text
          return <li key={l} className={this.state.selected == l ? 'active' : ''}>
            <a onClick={this.handleClick}>{l}</a>
          </li>
        })}
      </ul>
    )
  }

  handleClick (event) {
    console.log('handleClick', arguments)
    // this.setState({selected: })
    this.setState({selected: event.currentTarget.dataset.key})
  }
}

class Sidebar extends Component {
  static get defaultProps () {
    return {
      links: [
        'Search',
        'People'
      ]
    }
  }

  render () {
    return (
      <nav className='col-sm-3 col-md-2 sidebar'>
        <Nav links={this.props.links} />
      </nav>
    )
  }
}

class Friends extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <Sidebar />
          <h3>
            <i className='glyphicon glyphicon-globe'/>
            Friends of Friends
          </h3>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Friends />,
  document.getElementById('app')
)

export default {}
