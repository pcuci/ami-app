Router.configure
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'

Router.route '/',
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'

Router.route 'chat',
  name: 'chat'
  controller: 'ChatController'
  action: 'action'
  where: 'client'

Router.route 'track',
  name: 'track'
  controller: 'TrackController'
  action: 'action'
  where: 'client'

Router.route 'help',
  name: 'help'
  controller: 'HelpController'
  action: 'action'
  where: 'client'
