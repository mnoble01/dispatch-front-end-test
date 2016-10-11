import React, {Component} from 'react'
import {Link} from 'react-router'
import Header from 'components/header'
import PersonCollection from 'collections/people'
import SubjectCollection from 'collections/subjects'
import FriendCollection from 'collections/friends'
import {BasicForm, SelectField} from 'react-serial-forms'
import reject from 'lodash/reject'

class SearchResults extends Component {
  render () {
    let person = this.props.personName
    let subject = this.props.subjectName
    let path = this.props.path

    if (this.props.isExpert) {
      return (
        <div id='search-results'>
          <span className='person'>{person}</span> should talk to herself,
          because she's an expert in <span className='subject'>{subject}</span>.
          I wouldn't suggest doing that in public, though.
        </div>
      )
    }
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
        {intro}{outro}
        </div>
      )
    }

    return (
      <div id='search-results'>
        {intro}
        {path.map((pers, i) => {
          if (i > 0) {
            return <span className='search-line'k key={i}>
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
    let person = this.state.personCollection.findWhere({name: this.state.personName})
    let isExpert = person && person.isExpertIn(this.state.subjectName)
    return (
      <div id='search'>
        <Header text={this.props.route.pageTitle} />
        {this.renderForm()}
        {this.state.search &&
          <SearchResults path={this.state.path} personName={this.state.personName} subjectName={this.state.subjectName} isExpert={isExpert} />}
      </div>
    )
  }

  renderForm () {
    if (this.state.personCollection.isEmpty()) {
      return (
        <span>
          There aren't any people to search for yet. Go <Link to='people'>here</Link> to create some.
        </span>
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
    people.each((p) => p.set('visited', false))
    let person = people.findWhere({name: personName})
    let friends = new FriendCollection
    friends.fetch().done(() => {
      let path = []
      this.searchRecurse(people, friends, person, subjectName, path)
      this.setState({
        search: true,
        path,
        personName,
        subjectName,
        key: new Date // reset form trickery
      })
    })
  }

  searchRecurse (people, friends, person, subject, path) {
    person.set('visited', true)
    if (person.isExpertIn(subject)) {
      return true
    }
    if (people.every((p) => p.get('visited'))) {
      return false
    }
    let friendModels = reject(friends.of(person), (f) => {
      return people.get(f.other(person)).get('visited')
    })
    let friendsOfPerson = new FriendCollection(friendModels)
    return friendsOfPerson.some((f) => {
      let otherPerson = people.get(f.other(person))
      let found = this.searchRecurse(people, friends, otherPerson, subject, path)
      if (found) {
        path.splice(0, 0, otherPerson)
      }
      return found
    })
  }
}
