import BaseModel from 'models/base-model'

let PersonModel = BaseModel.extend({
  idAttribute: 'name',

  defaults () { // function so 'subjects' array is not shared
    return {
      name: '',
      subjects: []
    }
  }
})

export default PersonModel