import React, {Component} from 'react'
import {Link} from 'react-router'
import Header from 'components/header'
import PersonCollection from 'collections/people'
import SubjectCollection from 'collections/subjects'
import FriendCollection from 'collections/friends'
import {BasicForm, SelectField} from 'react-serial-forms'
import includes from 'lodash/includes'
import map from 'lodash/map'
import reject from 'lodash/reject'

class SearchResults extends Component {
  render () {
    let person = this.props.personName
    let subject = this.props.subjectName
    let path = this.props.path

    if (!path.length) {
      return (
        <div id='search-results'>
          Sorry, <span className='person'>{person}</span> doesn't have any connections
          familiar with <span className='subject'>{subject}</span>.
          Better make some new friends!
        </div>
      )
    }
    let intro = (
      <span className='search-line'>
        <span className='person'>{person}</span> needs to talk to his friend <span className='person'>{path[0].get('name')}</span>
      </span>
    )
    let outro = (
      <span className='search-line'>
        who is an expert in <span className='subject'>{subject}</span>
      </span>
    )

    if (path.length === 1) {
      return (
        <div id='search-results'>
        {intro}, {outro}
        </div>
      )
    }

    return (
      <div id='search-results'>
        {intro}
        {path.map((pers, i) => {
          if (i > 0) {
            return <span className='search-line'>
              who can introduce <span className='person'>{path[i-1].get('name')}</span> to <span className='person'>{pers.get('name')}</span>
            </span>
          }
        })}
        {outro}
      </div>
    )
  }
}

export default class Search extends Component {
  mixins: [BackboneReactComponent]

  constructor (...args) {
    super(...args)

    this.state = {
      personCollection: new PersonCollection,
      subjectCollection: new SubjectCollection,
      search: false
    }

    this.renderForm = this.renderForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.search = this.search.bind(this)
    this.searchRecurse = this.searchRecurse.bind(this)
  }

  componentWillMount () {
    this.state.personCollection.fetch()
    this.state.subjectCollection.fetch()
  }

  onSubmit (e) {
    e.preventDefault()
    this.refs.form.validate((errs) => {
      if (errs) {
        console.info(errs)
        return
      }
      let data = this.refs.form.serialize()
      this.search(data.person, data.subject)
    })
  }

  render () {
    return (
      <div id='search'>
        <Header text={this.props.route.pageTitle} />
        {this.renderForm()}
        {this.state.search &&
          <SearchResults path={this.state.path} personName={this.state.personName} subjectName={this.state.subjectName} />}
      </div>
    )
  }

  renderForm () {
    if (this.state.personCollection.isEmpty()) {
      return (
        `There aren't any people to search for yet. Go <Link to='people'>here</Link> to create some.`
      )
    }
    let people = this.state.personCollection.map((p) =>
      ({text: p.get('name'), value: p.get('name')})
    )
    people.splice(0, 0, {
      text: 'Choose a person',
      value: null
    })
    let subjects = this.state.subjectCollection.map((p) =>
      ({text: p.get('name'), value: p.get('name')})
    )
    subjects.splice(0, 0, {
      text: 'Choose a subject',
      value: null
    })
    return (<BasicForm ref='form' onSubmit={this.onSubmit} key={this.state.timestamp}>
      <SelectField name='person' options={people} validation='required' />
      <SelectField name='subject' options={subjects} validation='required' />
      <button name='submit' type='submit' value='Submit'>Search</button>
    </BasicForm>)
  }

  search (personName, subjectName) {
    let people = this.state.personCollection.clone()
    // let people = this.state.personCollection.clone().filter((p) => {
    //   return includes(person.get('subjects'), subject)
    // })
    let person = people.findWhere({name: personName})
    let friends = new FriendCollection
    friends.fetch().done(() => {
      let path = []
      if (this.searchRecurse(people, friends, person, subjectName, path)) {
        console.log('found someone', path)
      } else {
        console.log('not found')
      }
      this.setState({
        search: true,
        path,
        personName,
        subjectName,
        key: new Date // reset form trickery
      })
    })
    // friends.reset(friends.filter()
    // get people who are experts in the subject
  }

  searchRecurse (people, friends, person, subject, path) {
    console.log(person.get('name'), person.get('visited'), people.findWhere({name: person.get('name')}).get('visited'))
    let subjectNames = map(person.get('subjects'), 'name')
    // person.set('visited', true)
    // if (person.get('visited')) {
    //   return false
    // }
    person.set('visited', true)
    console.log('searchRecurse', person.get('name'))
    // console.log(person.get('name'), subjectNames, subject)
    // console.log('looking for', subject, 'with', person, subjectNames)
    if (includes(subjectNames, subject)) {
      // this.setState({searchResults: `${person} should talk to themselves, because they're an expert in ${subject}. I wouldn't suggest doing that in public, though.`})
      console.log('subjects included!')
      // return true
      return true
    }
    console.log(people.pluck('name'), people.pluck('visited'))
    // if (people.every((p) => p.get('visited') && p.get('name') !== person.get('name'))) {
    if (people.every((p) => p.get('visited'))) {
      console.log(people.pluck('visited'))
      console.log('everyone visited, none found')
      return false
    }
    let friendModels = reject(friends.of(person), (f) => {
      return people.get(f.other(person)).get('visited')
    })
    let friendsOfPerson = new FriendCollection(friendModels)
    console.log('friendsOfPerson', person.get('name'), friendsOfPerson)
    return friendsOfPerson.some((f) => {
      let otherPerson = people.get(f.other(person))
      let found = this.searchRecurse(people, friends, otherPerson, subject, path)
      console.log('found?', found)
      console.log(friendsOfPerson)
      if (found) {
        path.splice(0, 0, otherPerson)
      }
      return found
    })
  }
}
