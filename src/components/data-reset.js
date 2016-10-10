import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import PeopleCollection from 'collections/people'
import FriendCollection from 'collections/friends'
import SubjectCollection from 'collections/subjects'
import invoke from 'lodash/invoke'


export default class DataReset extends Component {
  componentDidMount () {
    if (confirm('Are you sure you want to clear all app data?')) {
      let colls = [
        new PeopleCollection,
        new FriendCollection,
        new SubjectCollection
      ]
      colls.forEach((c) => {
        c.fetch() // since we're using LocalStorage, this is effectively synchronous
        c.toArray().forEach((m) => m.destroy())
      })
      browserHistory.goBack()
    } else {
      browserHistory.goBack()
    }
  }

  render () {
    return (<div></div>)
  }
}
