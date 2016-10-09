import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Nav extends Component {
  static get defaultProps() {
    return {
      links: []
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
