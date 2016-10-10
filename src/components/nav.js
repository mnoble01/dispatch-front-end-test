import React, {Component} from 'react'
import {Link} from 'react-router'
import dashify from 'dashify'

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
            let path = l.path
            console.log(l)
            return <li key={path}>
              <Link to={path} activeClassName='active'> {l.text} </Link>
            </li>
          })}
        </ul>
      </nav>
    )
  }
}
