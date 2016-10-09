import React, {Component} from 'react'
import Header from 'components/header'
import NAV_LINKS from 'lib/nav-links'

export class Person extends Component {
  render () {
    return (
      <div>
        <div className='name'>{this.props.name}</div>
        <div className='subjects'>{this.props.subjects}</div>
      </div>
    )
  }
}

export class CreatePerson extends Component {
  render () {
    return (
      <div>
      </div>
    )
  }
}

export default class People extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      showCreateForm: false
    }
  }

  static get defaultProps () {
    return {
      people: []
    }
  }

  showCreateForm () {
    this.setState({showCreateForm: true})
  }

  render () {
    return (
      <div>
        <Header text={this.props.pageTitle || this.props.route.pageTitle} />
        {this.state.showCreateForm && <CreatePerson />}
        {this.props.people.map((p) => {
          return <Person props={p}/>
        })}
      </div>
    )
  }
}
