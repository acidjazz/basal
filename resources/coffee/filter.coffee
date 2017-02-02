Filter =
  filter: false

  i: (filter) ->

    @handlers.i()

    @filter = filter

    $('.selection > .inner > .values').html ''

    _.on ".selection.selection_#{@filter}"

    $(".selection.selection_#{@filter} > .inner > .search > input").focus()

    @get()

  d: ->
    _.off ".selection.selection_#{Filter.filter}"
    Filter.handlers.d()

  get: (search=null) ->
    Spinner.i($(".selection.selection_#{Filter.filter} > .inner > .values"))
    options =
      view: 'filters'

    options.name = search if search isnt null

    _.get "/api/#{@filter}", options
    .done (response) ->
      $('.selection > .inner > .values').html response.view
      Spinner.d()

  select: (option) ->
    console.log 'selected', option

  handlers:

    i: ->

      $('.selection').on 'click', '.inner > .label > .icon.cancel', Filter.d
      $('.selection').on 'keyup',' .inner > .search > input', @keyHandler
      $('.selection').on 'click', '.inner > .values > .value', @selectHandler
      $('.selection').on 'mouseover', '.inner > .values > .value', @hoverHandler
      $('.selection').on 'blur',  Filter.d
      $('.selection').on 'click', @insideCheck
      $(document).on 'click', @outsideCheck

    d: ->
      $('.selection').off 'click', '.inner > .label > .icon.cancel', Filter.d
      $('.selection').off 'keyup',' .inner > .search > input', @keyHandler
      $('.selection').off 'click', '.inner > .values > .value', @selectHandler
      $('.selection').off 'mouseover', '.inner > .values > .value', @hoverHandler
      $('.selection').off 'blur',  Filter.d
      $('.selection').off 'click', @insideCheck
      $(document).off 'click', @outsideCheck

    insideCheck: ->
      event.stopPropagation()
    outsideCheck: ->
      console.log $(this).className
      Filter.d()

    hoverHandler: ->

      console.log 'hover'
      _.off '.selection > .inner > .values > .value.on'
      _.on $(this)


    selectHandler: ->
      Filter.select $(this).find('name').html()

    keyHandler: ->

      key = event.keyCode

      switch key
        when 40 then Filter.nav 'down'
        when 38 then Filter.nav 'up'

        when 13 then Filter.select $('.selection > .inner > .values > .value.on > .name').html()

        else Filter.get $(this).val()

      return true

  nav: (dir) ->

    cur = $('.selection > .inner > .values > .value.on')
    next = cur.next() if dir is 'down'
    next = cur.prev() if dir is 'up'
    _.off cur

    if next.length isnt 0
      _.on next
      return

    _.on '.selection > .inner > .values > .value:first-child' if dir is 'down'
    _.on '.selection > .inner > .values > .value:last-child' if dir is 'up' 

