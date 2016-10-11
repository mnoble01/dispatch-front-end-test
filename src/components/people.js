import React, {Component} from 'react'
import BackboneReactComponent from 'backbone-react-component'
import {BasicForm, InputField} from 'react-serial-forms'
import ReactTags from 'react-tag-autocomplete'
import includes from 'lodash/includes'
import titleize from 'titleize'

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
    let subjects = this.state.model.get('subjects').map((s) => s.name).join(' • ')
    if (!subjects) {
      subjects = 'nothing'
    }
    return (
      <div className='person'>
        <div className='user-icon'></div>
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
      hasSubjects: false,
      subjectTags: [],
      subjectSugg: [] // suggestions
    }

    this.onTagDelete = this.onTagDelete.bind(this)
    this.onTagAdd = this.onTagAdd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.props.collection.fetch().done(() => {
      let suggestions = this.props.collection.map((s) => {
        return {id: s.get('name'), name: s.get('name')}
      })
      this.setState({subjectSugg: suggestions})
    })
    this.props.subjectCollection.fetch().done(() => {
      let tags = this.props.subjectCollection.map((s) => {
        return {id: s.get('name'), name: s.get('name')}
      })
      this.setState({subjectSugg: tags})
    })
  }

  onSubmit (e) {
    e.preventDefault()
    this.refs.form.validate((errs) => {
      if (errs) {
        console.info(errs)
        return
      }
      // TODO fix data so Person.name is title-cased and trimmed,
      // same with Subject.name
      // save subjects
      let subjects = this.state.subjectTags.map((s) => {
        let name = titleize(s.name.trim())
        return {id: name, name}
      })
      this.props.subjectCollection
        .reset(subjects, {remove: true, merge: true})
      this.props.subjectCollection.each((s) => s.save())
      // compose & set model attrs
      let attrs = this.refs.form.serialize()
      attrs.subjects = this.props.subjectCollection
      attrs.name = titleize(attrs.name.trim())
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
      tags.push(tag)
      this.setState({
        tags,
        hasSubjects: tags.length > 0
      })
    }
  }

  render () {
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
            autofocus={false}
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
      collection: new PersonCollection,
      subjectCollection: new SubjectCollection
    }

    this.toggleCreateForm = this.toggleCreateForm.bind(this)
  }

  componentWillMount () {
    this.state.collection.fetch()
    this.state.subjectCollection.fetch()
  }

  toggleCreateForm () {
    this.setState({showCreateForm: !this.state.showCreateForm})
  }

  render () {
    return (
      <div id='people'>
        <Header text={this.props.route.pageTitle} />
        {!this.state.showCreateForm && <button onClick={this.toggleCreateForm}>+ Create</button>}
        {this.state.showCreateForm && <button onClick={this.toggleCreateForm}>✕ Cancel</button>}
        {this.state.showCreateForm &&
          <CreatePerson
            removeHandler={this.toggleCreateForm}
            collection={this.state.collection}
            subjectCollection={this.state.subjectCollection} />
        }
        {this.state.collection.map((p) => {
          return <Person key={p.get('name')} model={p}/>
        })}
      </div>
    )
  }
}
