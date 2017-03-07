Search =

  i: ->

    if Query.param('search') isnt undefined
      $('.list-header > .search > input').val Query.param 'search'
      $('.list-header > .search > input').addClass 'active'
      _.on '.list-header > .search > .cancel'

    @handlers()

  handlers: ->
    $('.listing').on 'click', '.cancel', @cancelHandler
    $('.listing').on 'keyup', '.list-header > .search > input', @searchHandler

  cancelHandler: ->
    $('.list-header > .search > input').val ''
    _.off '.list-header > .search > .cancel'
    $('.list-header > .search > input').removeClass 'active'
    if Query.param('search') isnt undefined
      Query.param 'search', false
      Listing.load()

  searchHandler: ->

    key = event.keyCode

    val = $(this).val()

    if val isnt ''
      $('.list-header > .search > input').addClass 'active'
      _.on '.list-header > .search > .cancel'
    else
      $('.list-header > .search > input').removeClass 'active'
      _.off '.list-header > .search > .cancel'

    if key is 13
      Query.param('search', val)
      Listing.load()


