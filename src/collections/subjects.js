import Backbone from 'backbone'
import SubjectModel from 'models/subject'
import BBLocalStorage from 'backbone.localstorage'

let SubjectCollection = Backbone.Collection.extend({
  model: SubjectModel,
  idAttribute: 'name',

  comparator: 'name',

  localStorage: new BBLocalStorage('SubjectCollection')
})

export default SubjectCollection