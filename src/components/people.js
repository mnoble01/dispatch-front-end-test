import React, {Component} from 'react'
// import Backbone from 'backbone-react-component';
import BackboneReact from 'backbone-react-component';
import Button from 'react-button'
import {BasicForm, InputField} from 'react-serial-forms'

import Header from 'components/header'
import PersonModel from 'models/person'
import NAV_LINKS from 'lib/nav-links'

export class Person extends Component {
  render () {
    return (
      <div>
        <div className='name'>{this.props.name}</div>
        <div className='subjects'>{this.props.subjects}</div>
      </div>
    )
  }
}

export class CreatePerson extends Component {
  mixins: [BackboneReact.Component.mixin]

  constructor (...args) {
    super(...args)
    this.state = {
      model: new PersonModel
    }
    console.log('model', this.state.model)
  }

  onSubmit (e) {
    e.preventDefault()
    this.refs.form.validate((errs) => {
      if (errs) {
        console.log(errs)
        return
      }
      this.state.model.save(this.refs.form.serialize())
    })
  }

  render () {
      // <Form ref='form'>
      //   <Field name='name' label='Name'type='text' validators={['required']} />
      //   <Field name='subjects' label='Expertise'type='text' />
      // </Form>
      // <button onClick={this.submitForm.bind(this)}>Submit</button>
    // let schema = (
    //   <Schema>
    //     <Property name='name' label='Name' />
    //     <Property name='subjects' label='Expertise' />
    //   </Schema>
    // )
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
  constructor(...args) {
    super(...args)
    this.state = {
      showCreateForm: false
    }

    this.toggleCreateForm = this.toggleCreateForm.bind(this)
  }

  static get defaultProps () {
    return {
      people: []
    }
  }

  toggleCreateForm () {
    this.setState({showCreateForm: !this.state.showCreateForm})
  }

  render () {
    return (
      <div id='people'>
        <Header text={this.props.pageTitle || this.props.route.pageTitle} />
        {!this.state.showCreateForm && <button onClick={this.toggleCreateForm}>+ Create</button>}
        {this.state.showCreateForm && <button onClick={this.toggleCreateForm}>✕ Cancel</button>}
        {this.state.showCreateForm && <CreatePerson />}
        {this.props.people.map((p) => {
          return <Person props={p}/>
        })}
      </div>
    )
  }
}
