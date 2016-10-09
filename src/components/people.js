import React, {Component} from 'react'
import BackboneReactComponent from 'backbone-react-component';
// import Button from 'react-button'
import {BasicForm, InputField} from 'react-serial-forms'
import ReactTags from 'react-tag-autocomplete'
import includes from 'lodash/includes'

import Header from 'components/header'
import PersonModel from 'models/person'
import PersonCollection from 'collections/people'
import SubjectCollection from 'collections/subjects'
import NAV_LINKS from 'lib/nav-links'

export class Person extends Component {
  mixins: [BackboneReactComponent]

  constructor (...args) {
    super(...args)
    this.state = {
      model: this.props.model
    }
  }

  render () {
    let subjects = this.state.model.get('subjects')
    console.log(subjects)
    subjects = ['one', 'two'].join(' • ')
    return (
      <div className='person'>
        <div className='name'>{this.state.model.get('name')}</div>
        <div className='subjects'>Expert in: {subjects}</div>
      </div>
    )
  }
}

export class CreatePerson extends Component {
  mixins: [BackboneReactComponent]

  constructor (...args) {
    super(...args)

    this.state = {
      model: new PersonModel,
      collection: new SubjectCollection,
      hasSubjects: false,
      subjectTags: [],
      subjectSugg: [] // suggestions
    }

    this.onTagDelete = this.onTagDelete.bind(this)
    this.onTagAdd = this.onTagAdd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.state.collection.fetch().done(() => {
      let suggestions = this.state.collection.map((s) => {
        return {id: s.get('name'), name: s.get('name')}
      })
      this.setState({subjectSugg: suggestions})
    })
  }

  onSubmit (e) {
    e.preventDefault()
    this.refs.form.validate((errs) => {
      if (errs) {
        console.log(errs)
        return
      }
      // TODO fix data so Person.name is title-cased and trimmed,
      // same with Subject.name
      // TODO save new subjectTags first
      // save subjects
      let subjects = this.state.subjectTags
      console.log(subjects)
      // compose & set model attrs
      let attrs = this.refs.form.serialize()
      attrs.subjects = subjects
      this.state.model.set(attrs)
      // save model to collection
      this.props.collection.add(this.state.model).save()
      this.props.removeHandler()
    })
  }

  onTagDelete (i) {
    let tags = this.state.subjectTags
    tags.splice(i, 1)
    this.setState({
      tags,
      hasSubjects: tags.length > 0
    })
  }

  onTagAdd (tag) {
    let tags = this.state.subjectTags
    let existingTagNames = tags.map((t) => t.name)
    if (!includes(existingTagNames, tag.name)) { // don't allow duplicates
      // TODO maybe allow subject collection to handle this
      tags.push(tag)
      this.setState({
        tags,
        hasSubjects: tags.length > 0
      })
    }
  }

  render () {
    // <InputField name='subjects' type='text' validation='required' value='Submit' />
    let tagHint = null
    if (this.state.hasSubjects) {
      tagHint = <span className='hint'>Click tag to remove</span>
    }
    return (
      <div id='create-person'>
        <BasicForm ref='form' onSubmit={this.onSubmit}>
          <label htmlFor='name'>Name</label>
          <InputField type='text' validation='required' name='name' value={this.state.model.name} />
          <label htmlFor='subjects'>
            Expertise
            {tagHint}
          </label>
          <ReactTags
            tags={this.state.subjectTags}
            suggestions={this.state.subjectSugg}
            handleDelete={this.onTagDelete}
            handleAddition={this.onTagAdd}
            allowNew={true}
            placeholder=' '
            minQueryLength={1} />
          <button name='submit' type='submit' value='Submit'>Submit</button>
        </BasicForm>
      </div>
    )
  }
}

export default class People extends Component {
  mixins: [BackboneReactComponent]

  constructor(...args) {
    super(...args)
    this.state = {
      showCreateForm: false,
      collection: new PersonCollection
    }

    this.toggleCreateForm = this.toggleCreateForm.bind(this)
  }

  componentWillMount () {
    // console.log(BackboneReactComponent.componentWillMount)
    // this.getCollection().fetch()
    this.state.collection.fetch()
  }

  toggleCreateForm () {
    this.setState({showCreateForm: !this.state.showCreateForm})
  }

  render () {
    console.log(this.state.collection.models)
    return (
      <div id='people'>
        <Header text={this.props.pageTitle || this.props.route.pageTitle} />
        {!this.state.showCreateForm && <button onClick={this.toggleCreateForm}>+ Create</button>}
        {this.state.showCreateForm && <button onClick={this.toggleCreateForm}>✕ Cancel</button>}
        {this.state.showCreateForm &&
          <CreatePerson removeHandler={this.toggleCreateForm} collection={this.state.collection}/>
        }
        {this.state.collection.map((p) => {
          return <Person key={p.get('name')} model={p}/>
        })}
      </div>
    )
  }
}
