import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PersonCollection from 'collections/people'
import BackboneReactComponent from 'backbone-react-component'
import {BasicForm, SelectField, validation} from 'react-serial-forms'
import Header from 'components/header'
import FriendCollection from 'collections/friends'


class FriendList extends Component {
  mixins: [BackboneReactComponent]

  render () {
    return (
      <div id='friends-list'>
        {this.props.collection.map((f) => {
          return <div key={f.id} className='friend-pair'>
            {f.get('person1')} knows {f.get('person2')}
          </div>
        })}
      </div>
    )
  }
}

export default class MakeFriends extends Component {
  mixins: [BackboneReactComponent]

  constructor(...args) {
    super(...args)

    this.state = {
      collection: new FriendCollection,
      personCollection: new PersonCollection
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.state.collection.fetch()
    this.state.personCollection.fetch()
  }

  onSubmit (e) {
    e.preventDefault()
    this.refs.form.validate((errs) => {
      if (errs) {
        console.info(errs)
        return
      }
      let data = this.refs.form.serialize()
      data.id = data.person1 + data.person2
      this.state.collection.add(data).save()
      this.setState({
        collection: this.state.collection
      })
      this.setState({timestamp: new Date}) // trickery for form reset
    })
  }

  render () {
    let choices = this.state.personCollection.map((p) =>
      ({text: p.get('name'), value: p.get('name')})
    )
    choices.splice(0, 0, {
      text: '- People make the world go round',
      value: null
    })
    validation.registerValidator({
      name: 'different_people',
      determine: (value, pass, fail) => {
        let data = this.refs.form.serialize()
        if (data.person1 === data.person2) {
          fail()
        } else {
          pass()
        }
      },
      message: 'One can be friends with oneself in real life, but not here'
    })
    return (
      <div id='make-friends'>
        <Header text={this.props.route.pageTitle} />
        <BasicForm ref='form' onSubmit={this.onSubmit} key={this.state.timestamp}>
          <SelectField name='person1' options={choices} validation='required' />
          <SelectField name='person2' options={choices} validation='required,different_people' />
          <button name='submit' type='submit' value='Submit'>Connect</button>
        </BasicForm>
        <FriendList collection={this.state.collection} />
      </div>
    )
  }
}