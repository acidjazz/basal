
Spinner =

  state: false

  el: {}

  i: (el, override) ->

    @el = $('.spinner')

    rect = el[0].getBoundingClientRect()

    coords =
      top: "#{rect.top + $(window).scrollTop()}px"
      left: "#{rect.left}px"
      width: "#{rect.width}px"
      height: "#{rect.height}px"

    if override isnt undefined
      for key, coord of override
        coords[key] = coord

    @el.css coords

    _.on @el
    @state = true

  d: ->
    _.off @el
    @state = false
