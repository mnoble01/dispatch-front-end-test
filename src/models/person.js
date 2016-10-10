import Backbone from 'backbone'

let PersonModel = Backbone.Model.extend({
  idAttribute: 'name',

  defaults () { // function so 'subjects' array is not shared
    return {
      name: '',
      subjects: []
    }
  }
})

export default PersonModel