import Backbone from 'backbone'

let SubjectModel = Backbone.Model.extend({
  idAttribute: 'name',

  defaults: {
    name: ''
  }
})

export default SubjectModel