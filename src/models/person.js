
import BaseModel from 'models/base-model'
import Backbone from 'backbone'
import BBLocalStorage from 'backbone.localstorage'

let PersonModel = BaseModel.extend({
  idAttribute: 'name',

  defaults () { // is function so 'subjects' array is not shared
    return {
      name: '',
      subjects: []
    }
  }
})

export default PersonModel