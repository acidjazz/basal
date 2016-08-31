`import _ from './256.coffee'`

Prompt =
  el: {}
  options: {}
  callback: false
  params: {}

  i: (title, copy, options=['OK'], params, callback) ->

    Prompt.callback = false
    Prompt.params = false

    Prompt.callback = params if typeof params is 'function'
    Prompt.callback = callback if typeof callback is 'function'

    Prompt.params = params if typeof params is 'object'

    Prompt.el = $ '.prompt'

    Prompt.el.find '.title'
      .html title
    Prompt.el.find '.copy'
      .html copy

    if typeof params is 'object' and 'textarea' of params and params.textarea is true
      _.on Prompt.el.find '.textarea'
      Prompt.el.find '.textarea > textarea'
        .val params.value

    Prompt.options = Prompt.el.find '.options > .option'
    _.off Prompt.options
    Prompt.options.removeClass 'active'
    Prompt.options.first().addClass 'active'

    for o,i in options
      option = Prompt.el.find ".options  > .option_#{i+1}"
      _.on option
      option.html o
        .data 'value', o

    _.on Prompt.el,
    _.on '.fade'

    Prompt.handlers()

  handlers: ->
    $(document).keydown Prompt.keydown
    Prompt.options.on 'click', Prompt.click
    Prompt.el.find('.inner > .cancel').on 'click', Prompt.cancel

  keydown: ->
    k = event.which
    keys = [39, 9, 37, 13, 27]
    return true if k not in keys

    current = Prompt.el.find '.option.on.active'
    shift = window.event.shiftKey

    if k is 39 or (k is 9 and !shift)
      current.removeClass 'active'
      if current.next().hasClass 'on'
        current.next().addClass 'active'
      else
        Prompt.el.find('.option_1').addClass 'active'
      return false

    if k is 37 or (k is 9 and shift)
      current.removeClass 'active'
      if current.prev().hasClass 'on'
        current.prev().addClass 'active'
      else
        Prompt.el.find('.option.on').last().addClass 'active'
      return false

    if k is 13
      Prompt.trigger Prompt.el.find('.option.active').data 'value'
      return false
    if k is 27
      Prompt.trigger(false)
      return false

  cancel: ->
    Prompt.trigger false

  click: ->
    Prompt.trigger $(this).data 'value'

  trigger: (value) ->
    _.off Prompt.el.find '.textarea'
    _.off Prompt.el
    _.off '.fade'
    Prompt.options.unbind 'click', Prompt.click
    $(document).unbind 'keydown', Prompt.keydown
    console.log Prompt.params
    if Prompt.params.textarea
      val = Prompt.el.find '.textarea > textarea'
        .val()
      Prompt.callback? response: value, val: val
    else
      Prompt.callback? value

`export default Prompt`
