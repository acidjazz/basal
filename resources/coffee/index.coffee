_.constructor()

class Index
  constructor: ->
    @handlers()

  handlers: ->
    $('.top .burger').click @mobile

  mobile: ->
    _.swap '.top > .burger'
    _.swap '.top > .menu'
