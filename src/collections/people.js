import BBCollection from 'backbone-collection'
import PersonModel from 'models/person'

export default PersonCollection = BBCollection.extend({
  model: PersonModel,

  comparator: 'name'
})