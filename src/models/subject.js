import BaseModel from 'models/base-model'

let SubjectModel = BaseModel.extend({
  idAttribute: 'name',

  defaults: {
    name: ''
  }
})

export default SubjectModel