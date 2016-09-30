Notice =

  types: ['info','success','warning']

  el: false

  on: false
  progress: false
  timeout: false
  close: true

  default:
    type: 'info'
    progress: false
    timeout: 5000

  i: (copy,options={}) ->

    @options = Object.assign {}, @default

    for key, param of options
      @options[key] = param

    @el = $('.notice') if @el is false

    for dtype in @types
      @el.removeClass dtype
    @el.addClass @options.type
    @el.find('.copy > .message').html copy

    if @options.progress isnt false
      if @progress is false
        _.on @el.find('.notice_progress')
        @progress = true
      if @close is true
        _.off @el.find('.close')
        @close = false
      if @on is false
        setTimeout =>
          @el.find('.full').css('width', @options.progress*100 + '%')
        , 100
      else
        @el.find('.full').css('width', @options.progress*100 + '%')

    if @options.progress is false and @progress is true
      @el.find('.full').css('width', '0%')
      _.off @el.find('.notice_progress')
      @progress = false
      _.on @el.find('.close')
      @close = true

    if @on is false
      _.on @el
      @handlers.on()
      @on = true

    if @options.timeout isnt false and @options.progress is false
      @timeout = setTimeout =>
        @d()
      , @options.timeout

  handlers:
    on: ->
      $('.notice').on 'click', '.inner > .close > .inner', Notice.d
    off: ->
      $('.notice').off 'click', '.inner > .close > .inner', Notice.d

  d: ->
    clearTimeout Notice.timeout if Notice.timeout isnt false
    Notice.timeout = false
    Notice.handlers.off()
    _.on Notice.el.find('.close')
    Notice.close = true
    _.off Notice.el.find('.notice_progress')
    Notice.progress = false
    _.off Notice.el, offing: true, offtime: 0.2
    Notice.on = false
