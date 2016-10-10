import Backbone from 'backbone'
import BBLocalStorage from 'backbone.localstorage'

let FriendModel = Backbone.Model.extend({
  defaults: {
    person1: null,
    person2: null
  }
})

let FriendCollection = Backbone.Collection.extend({
  model: FriendModel,

  localStorage: new BBLocalStorage('FriendCollection')
})

export default FriendCollection