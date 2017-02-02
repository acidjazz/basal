Filter =
  filter: false
  endpoint: false
  filters: []

  i: (filters) ->

    @filters = filters

    _.on ".filter_#{filter}" for filter in @filters

    for filter in @filters
      if Query.param(filter) isnt undefined
        $(".filter_#{filter} > .option_selected > .copy").html Query.param filter
        _.off ".filter_#{filter} > .option_default"
        _.on ".filter_#{filter} > .option_selected"

    @handlers.i()

  d: ->
    _.off ".selection.selection_#{Filter.filter}"
    Filter.handlers.d()

  get: (search=null) ->
    Spinner.i($(".selection.selection_#{Filter.filter} > .inner > .values"))
    options =
      view: 'filters'

    options.name = search if search isnt null

    _.get "/api/#{@endpoint}", options
    .done (response) ->
      $('.selection > .inner > .values').html response.view
      Spinner.d()

  select: (option) ->

    Query.param Filter.filter, option

  handlers:

    i: ->

      $(".listing").on 'click', '.list-header > .filters > .filter', @filterHandler

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


    filterHandler: ->

      event.stopPropagation()

      Filter.filter = $(this).data 'filter'
      Filter.endpoint = $(this).data 'endpoint'

      if $(this).has('.option_selected.on').length
        Filter.select false
        return true


      $(".selection.selection_#{Filter.filter} > .inner > .values").html ''
      _.on ".selection.selection_#{Filter.filter}"
      $(".selection.selection_#{Filter.filter} > .inner > .search > input").focus()

      Filter.get()


    insideCheck: ->
      event.stopPropagation()
    outsideCheck: ->
      Filter.d()

    hoverHandler: ->

      _.off '.selection > .inner > .values > .value.on'
      _.on $(this)


    selectHandler: ->
      Filter.select $(this).find('.name').html()

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

