import React, {Component} from 'react'
import BackboneReactComponent from 'backbone-react-component';
import Button from 'react-button'
import {BasicForm, InputField} from 'react-serial-forms'

import Header from 'components/header'
import PersonModel from 'models/person'
import PersonCollection from 'collections/people'
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
    return (
      <div className='person'>
        <div className='name'>{this.state.model.get('name')}</div>
        <div className='subjects'>Expert in: {this.state.model.get('subjects')}</div>
      </div>
    )
  }
}

export class CreatePerson extends Component {
  mixins: [BackboneReactComponent]

  constructor (...args) {
    super(...args)
    console.log(this.props.collection.cid)
    this.state = {
      model: new PersonModel
    }
  }

  onSubmit (e) {
    e.preventDefault()
    this.refs.form.validate((errs) => {
      if (errs) {
        console.log(errs)
        return
      }
      this.state.model.set(this.refs.form.serialize())
      this.props.collection.add(this.state.model).save()
      this.props.removeHandler()
    })
  }

  render () {
    return (
      <div id='create-person'>
        <BasicForm ref='form' onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor='name'>Name</label>
          <InputField type='text' validation='required' name='name' value={this.state.model.name} />
          <label htmlFor='subjects'>Expertise</label>
          <InputField name='subjects' type='text' validation='required' value='Submit' />
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
