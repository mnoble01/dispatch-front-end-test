import React, {Component} from 'react'
import Header from 'components/header'

export default class Search extends Component {
  render () {
    return (
      <div>
        <Header text={this.props.route.pageTitle} />
      </div>
    )
  }
}
