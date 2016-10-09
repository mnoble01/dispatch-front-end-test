import BBCollection from 'backbone-collection'
import PersonModel from 'models/person'
import BBLocalStorage from 'backbone.localstorage'

export default PersonCollection = BBCollection.extend({
  model: PersonModel,

  comparator: 'name',

  // localStorage: LocalStorage.setPrefix('people')
  localStorage: new BBLocalStorage('PersonModel')
})