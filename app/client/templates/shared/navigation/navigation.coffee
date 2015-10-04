# Navigation: Event Handlers
Template.Navigation.events {
  'click #at-nav-button': (event, template) ->
    if Meteor.user()
      AccountsTemplates.logout()
    else
      Router.go 'login'
    return
  'click a#questions-edit': (event, template) ->
    event.preventDefault()
    if Meteor.user()
      routeToQuestions()
    else
      Router.go("login")
}

# Navigation: Helpers
Template.Navigation.helpers {
  active: (path) ->
    (if Router.current().url is path then "active" else "")
  environment: ->
    if (process and process.env and (process.env.NODE_ENV isnt "production"))
      process.env.NODE_ENV + " v" + if Meteor.settings? and Meteor.settings.public? and Meteor.settings.public.appVersion? then Meteor.settings.public.appVersion else "*.*.*"
  envBackground: ->
    if (process and process.env and (process.env.NODE_ENV isnt "production"))
      switch process.env.NODE_ENV
        when 'test' then "env-test";
        when 'staging' then "env-staging"
        else "env-development"
    else
      ""
  pendingConnectionsCount: ->
    count = Connections.find(
      status: "pending"
      connectionId: Meteor.userId()
    ).count()
    count
  activeChannelsCount: ->
    activeChannels = ActiveChannels.findOne()
    if activeChannels?.channelIds
      activeChannels.channelIds.length
}

# Navigation: Lifecycle Hooks
Template.Navigation.created = ->

Template.Navigation.rendered = ->

Template.Navigation.destroyed = ->
