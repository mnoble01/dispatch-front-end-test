import BaseModel from 'models/base-model'
import Backbone from 'backbone'
import BBLocalStorage from 'backbone.localstorage'
console.log(BBLocalStorage)

let PersonModel = BaseModel.extend({
  defaults () { // is function so 'subjects' array is not shared
    return {
      name: '',
      subjects: []
    }
  },

  localStorage: new BBLocalStorage('PersonModel')
  // BBLocalStorage.setPrefix('person')
})

export default PersonModel