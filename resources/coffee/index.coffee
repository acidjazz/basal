`import _ from './256.coffee'`

_.constructor()

class Index
  constructor: ->
    @handlers()

  handlers: ->
    $('.top .burger').click @mobile

  mobile: ->
    _.swap '.top > .burger'
    _.swap '.top > .menu'

`export default Index`
