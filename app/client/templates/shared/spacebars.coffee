Template.registerHelper "debug", (optionalValue) ->
  if typeof console isnt "undefined" or typeof console.log isnt "undefined"
    console.log "Current Context"
    console.log "===================="
    console.log this
    if optionalValue
      console.log "Value"
      console.log "===================="
      console.log optionalValue
    return ""

Template.registerHelper 'session', (key) ->
  Session.get(key)

Template.registerHelper 'hasRole', (role) ->
  Roles.userHasRole(Meteor.userId(), role)
Template.registerHelper 'hasAnyRoles', (roles) ->
  if roles? and roles.length > 0
    for role in roles
      if Roles.userHasRole(Meteor.userId(), role)
        return true
  false

Template.registerHelper 'userHasRole', (userId, role) ->
  ReactivePromise (userId, role) ->
    Meteor.promise("userHasRole", userId, role)
