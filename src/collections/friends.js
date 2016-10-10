import Backbone from 'backbone'
import BBLocalStorage from 'backbone.localstorage'

let FriendModel = Backbone.Model.extend({
  defaults: {
    person1: null,
    person2: null
  },

  // given a person, return the other's name
  other (person) {
    if (person.get('name') === this.get('person1')) {
      return this.get('person2')
    }
    return this.get('person1')
  }
})

let FriendCollection = Backbone.Collection.extend({
  model: FriendModel,

  initialize () {
    this.of = this.of.bind(this)
  },

  localStorage: new BBLocalStorage('FriendCollection'),

  // return an array of FriendModels for a given person
  of (person) {
    return this.filter((f) => {
      return f.get('person1') === person.get('name') || f.get('person2') === person.get('name')
    })
  }
})

export default FriendCollection