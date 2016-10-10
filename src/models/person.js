import Backbone from 'backbone'
import map from 'lodash/map'
import includes from 'lodash/includes'

let PersonModel = Backbone.Model.extend({
  idAttribute: 'name',

  defaults () { // function so 'subjects' array is not shared
    return {
      name: '',
      subjects: []
    }
  },

  isExpertIn (subjectName) {
    let subjectNames = map(this.get('subjects'), 'name')
    return includes(subjectNames, subjectName)
  }
})

export default PersonModel