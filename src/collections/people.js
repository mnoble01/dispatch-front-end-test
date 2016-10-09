import Backbone from 'backbone'
import PersonModel from 'models/person'
import BBLocalStorage from 'backbone.localstorage'

let PersonCollection = Backbone.Collection.extend({
  model: PersonModel,
  idAttribute: 'name',

  comparator: 'name',

  localStorage: new BBLocalStorage('PeopleCollection')
})

export default PersonCollection