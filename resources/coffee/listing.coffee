Listing =
  content: false
  selected: []
  filters: []
  selectedCursor: 0

  otherActions: false

  i: (content, otherActions=false, filters=[]) ->

    @filters = filters
    @content = content
    @otherActions = otherActions
    @load()
    @handlers()

    _.on ".filter_#{filter}" for filter in @filters

  handlers: ->
    $(".listing.#{@content}").on 'click', '.checkbox', @checkboxHandler
    $(".listing.#{@content}").on 'change', '.list-header > .checkbox > input', @selectAllHandler
    $(".listing.#{@content}").on 'change', '.checkbox > input', @stateHandler
    $(".listing.#{@content}").on 'click', '.list-header > .state_actions > .actions > .action', @actionHandler
    $(".listing.#{@content}").on 'click', '.list-header > .filters > .filter', @filterHandler if @filters.length > 0

  checkboxHandler: ->
    cb = $(this).find 'input'
    if event.target.type isnt 'checkbox'
      cb[0].checked = !cb[0].checked
      cb.change()

  selectAllHandler: ->
    if this.checked
      $('.listing > .items > .item > .checkbox > input').prop 'checked', true
    else
      $('.listing > .items > .item > .checkbox > input').prop 'checked', false

  stateHandler: ->
    ids = []

    $('.items > .item > .checkbox > input').each (i, el) ->
      if el.checked
        ids.push $(el).data '_id'

    .promise().done ->
      if ids.length > 0
        $('.listing > .list-header > .state_actions > .copy > .value').text ids.length
        _.off '.listing > .list-header > .state_stats'
        _.on '.listing > .list-header > .state_actions'
      else
        _.on '.listing > .list-header > .state_stats'
        _.off '.listing > .list-header > .state_actions'
      Listing.selected = ids

  actionHandler: ->
    type = $(this).data 'type'

    switch type
      when 'delete'
        Prompt.i "Deleting #{Listing.selected.length} items(s)",
          'Are you sure you want to delete these?', ['Yes','No'], (response) ->
            return true if response isnt 'Yes'
            Listing.deleteSelected()
      else
        Listing.otherActions(type)

  filterHandler: ->
    event.stopPropagation()
    Filter.i $(this).data 'filter'
                        
  delete: (id, callback) ->

    Spinner.i($(".listing.#{Listing.content}"))
    _.get "/api/#{Listing.content}/delete/#{id}"
    .always ->
      Spinner.d()
    .done (response) ->
      callback true
    .fail ->
      callback false

  deleteSelected: (cursor=0) ->

    if Listing.selected.length is cursor
      Notice.i 'Structure(s) deleted successfully', type: 'success'
      @load()
      return true

    Listing.delete Listing.selected[cursor], (result) ->
      Listing.deleteSelected ++cursor if result is true

  load: ->

    Spinner.i($(".page.#{Listing.content}"))

    _.get "/api/#{@content}", view: true
    .done (response) =>
      Time.i()
      Spinner.d()
      $('.listing > .list-header > .state_stats > .copy > .value').text response.data.length
      $(".#{@content} > .content > .listing > .items").html response.view
