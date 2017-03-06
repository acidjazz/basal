Listing =
  content: false
  selected: []
  filters: []
  selectedCursor: 0
  deleted: false

  otherActions: false

  i: (content, otherActions=false, filters=[]) ->

    @filters = filters
    @content = content
    @otherActions = otherActions

    if document.location.pathname.indexOf('deleted') isnt -1
      _.on ".page.#{@content} > .active.deleted"
      @deleted = true
      _.off '.state_actions > .actions > .action.delete'
      _.on '.state_actions > .actions > .action.restore'
      _.on '.state_actions > .actions > .action.force'
      _.off ".state_actions > .actions > .action_#{Listing.content}"
    else
      _.on $(".page.#{@content} > .deleted").not '.active'
      _.on ".state_actions > .actions > .action_#{Listing.content}"

    @load()
    @handlers()

    Filter.i @filters if @filters.length > 0
    Search.i()

  handlers: ->
    $(".listing.#{@content}").on 'click', '.checkbox', @checkboxHandler
    $(".listing.#{@content}").on 'click', '.switch', @switchHandler
    $(".listing.#{@content}").on 'change', '.list-header > .checkbox > input', @selectAllHandler
    $(".listing.#{@content}").on 'change', '.checkbox > input', @stateHandler
    $(".listing.#{@content}").on 'click', '.list-header > .state_actions > .actions > .action', @actionHandler

    $(".listing.#{@content}").on 'click', '> .inner > .paginate > .inner > .num', @pageHandler

  checkboxHandler: ->
    cb = $(this).find 'input'
    if event.target.type isnt 'checkbox'
      cb[0].checked = !cb[0].checked
      cb.change()

  switchHandler: ->

    el = $(this)

    _id = el.data '_id'
    name = el.data 'name'
    value = !el.hasClass 'on'

    Listing.toggle [_id], name, value, ->
      _.swap el

  toggle: (ids, name, value, complete) ->

    ids.forEach (_id, index) ->

      options = {}
      options[name] = value

      _.get "/api/#{Listing.content}/update/#{_id}",
        options
      .done (resposne) ->
        if index is ids.length-1
          Notice.i "Updated successfully", type: 'success'
          complete?()

  selectAllHandler: ->
    if this.checked
      $('.listing > .inner > .items > .item > .checkbox > input').prop 'checked', true
    else
      $('.listing > .inner > .items > .item > .checkbox > input').prop 'checked', false

  unselectAll: ->
      $(".listing.#{Listing.content} > .inner > .items > .item > .checkbox > input").prop 'checked', false
      $(".listing.#{Listing.content} > .list-header > .checkbox > input").prop 'checked', false
      Listing.stateHandler()

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

  pageLinks: ->
    params = Query.params()
    $('.paginate > .inner > .num').each (i, el) ->
      page = $(el).data 'page'
      return if page is undefined
      params.page = page
      query = Query.stringify params
      $(el).attr 'href', "?#{Query.stringify(params)}"

  pageHandler: ->
    page = $(this).data 'page'
    return true if page is undefined
    Listing.unselectAll()
    Query.param 'page', page
    Listing.load()
    return false

  actionHandler: ->
    type = $(this).data 'type'

    switch type
      when 'delete'
        Prompt.i "Deleting #{Listing.selected.length} item(s)",
          'Are you sure you want to delete these?', ['Yes','No'], (response) ->
            return true if response isnt 'Yes'
            Listing.deleteSelected()
      when 'restore'
        Prompt.i "Restoring #{Listing.selected.length} item(s)",
          'Are you sure you want to restore these?', ['Yes','No'], (response) ->
            return true if response isnt 'Yes'
            Listing.deleteSelected 0, 'restore'
      when 'force'
        Prompt.i "Deleting #{Listing.selected.length} item(s)",
          'Are you sure you want to PERMANENTLY delete these?', ['Yes','No'], (response) ->
            return true if response isnt 'Yes'
            Listing.deleteSelected 0, 'force'

      when 'publish', 'hide'

        value = (type is 'publish')
        Spinner.i($(".listing.#{Listing.content}"))
        Listing.toggle Listing.selected, 'active', value, ->

          $('.switch.active').each (i, el) ->
            for _id in Listing.selected
              _.on $(el) if _id is $(el).data('_id') and value is true
              _.off $(el) if _id is $(el).data('_id') and value is false

          if value
            Notice.i "#{Listing.selected.length} Entries published", type: 'success'
          else
            Notice.i "#{Listing.selected.length} Entries hidden", type: 'success'
          Spinner.d()


      else
        Listing.otherActions(type)
                        
  delete: (id,type='delete',callback) ->

    Spinner.i($(".listing.#{Listing.content}"))
    _.get "/api/#{Listing.content}/#{type}/#{id}"
    .always ->
      Spinner.d()
    .done (response) ->
      callback true
    .fail ->
      callback false

  deleteSelected: (cursor=0,type='delete') ->

    if Listing.selected.length is cursor
      if type is 'delete'
        Notice.i 'Deleted successfully', type: 'success'
      if type is 'restore'
        Notice.i 'Restored successfully', type: 'success'
      if type is 'force'
        Notice.i 'Permanently deleted successfully', type: 'success'
      Listing.unselectAll()
      @load()

      return true

    Listing.delete Listing.selected[cursor],type, (result) ->
      Listing.deleteSelected(++cursor, type) if result is true

  load: ->

    Spinner.i($(".listing.#{Listing.content}"))

    options = view: true

    options.deleted = true if Listing.deleted is true

    for filter in @filters
      if Query.param(filter) isnt undefined
        options[filter + '.name'] = Query.param filter
    if Query.param('page') isnt undefined
      options.page = Query.param 'page'

    _.get "/api/#{@content}", options
    .done (response) =>
      Time.i()
      Spinner.d()
      $('.listing > .list-header > .state_stats > .copy > .value').text response.paginate.total
      $(".#{@content} > .content > .listing > .inner").html response.view
      Listing.pageLinks()


