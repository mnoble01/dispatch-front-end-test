import React, {Component} from 'react'
import {Link} from 'react-router'
import Header from 'components/header'

export default class Search extends Component {
  render () {
    return (
      <div>
        <Header text={this.props.route.pageTitle} />
        There aren't any people to search for yet. Go <Link to='people'>here</Link> to create some.
      </div>
    )
  }
}
