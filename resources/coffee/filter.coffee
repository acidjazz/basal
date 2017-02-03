Filter =
  filter: false
  endpoint: false
  filters: []

  i: (filters) ->

    @filters = filters

    _.on ".filter_#{filter}" for filter in @filters

    for filter in @filters
      if Query.param(filter) isnt undefined
        Filter.selected filter

    $(".listing").on 'click', '.list-header > .filters > .filter', @handlers.filterHandler
    $(".listing").on 'click', '.list-header > .filters > .filter > .option_selected > .icon.cancel', @handlers.filterClearHandler

  d: ->
    _.off ".selection.selection_#{Filter.filter}"
    Filter.handlers.d()
    Spinner.d()

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
    Filter.selected Filter.filter
    Filter.d()
    Listing.load()

  selected: (filter) ->
    if Query.param(filter) is undefined
      $(".filter_#{filter} > .option_selected > .copy").html ''
      _.on ".filter_#{filter} > .option_default"
      _.off ".filter_#{filter} > .option_selected"
      return true
    $(".filter_#{filter} > .option_selected > .copy").html Query.param filter
    _.off ".filter_#{filter} > .option_default"
    _.on ".filter_#{filter} > .option_selected"

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


    filterClearHandler: ->
      console.log 'about to clear'
      Filter.filter = $(this).data 'filter'
      Filter.select false
      Filter.d()

      return false

    filterHandler: ->
      event.stopPropagation()
      Filter.filter = $(this).data 'filter'
      Filter.endpoint = $(this).data 'endpoint'

      if $(".selection.selection_#{Filter.filter}").hasClass 'on'
        Filter.d()
        return false

      Filter.handlers.i()

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
        when 40, 39 then Filter.nav 'down'
        when 37,38 then Filter.nav 'up'
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

