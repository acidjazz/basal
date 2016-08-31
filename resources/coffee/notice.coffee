Notice =

  types: ['info','success','warning']
  el: false
  on: false
  timeout: false

  i: (copy,type='info') ->

    Notice.el = $('.notice') if Notice.el is false

    for dtype in Notice.types
      Notice.el.removeClass dtype

    Notice.el.addClass type

    Notice.el.find('.copy > .message').html copy

    if Notice.on is false
      _.on Notice.el
      Notice.handlers.on()
      Notice.on = true

    Notice.timeout = setTimeout ->
      Notice.d()
    , 5000

  handlers:
    on: ->
      $('.notice > .inner > .close').click Notice.d
    off: ->
      $('.notice > .inner > .close').unbind 'click', Notice.d

  d: ->
    clearTimeout Notice.timeout if Notice.timeout isnt false
    Notice.timeout = false
    Notice.handlers.off()
    _.off Notice.el, offing: true, offtime: 0.2
    Notice.on = false
