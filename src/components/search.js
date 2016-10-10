import React, {Component} from 'react'
import {Link} from 'react-router'
import Header from 'components/header'
import PersonCollection from 'collections/people'
import SubjectCollection from 'collections/subjects'
import {BasicForm, SelectField} from 'react-serial-forms'

export default class Search extends Component {
  mixins: [BackboneReactComponent]

  constructor (...args) {
    super(...args)

    this.state = {
      personCollection: new PersonCollection,
      subjectCollection: new SubjectCollection
    }

    this.renderForm = this.renderForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
      console.log(data)
      // TODO do search
    })
  }

  render () {
    return (
      <div id='search'>
        <Header text={this.props.route.pageTitle} />
        {this.renderForm()}
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
}
