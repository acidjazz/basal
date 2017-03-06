Search =

  i: ->

    @handlers()

  handlers: ->

    console.log 'handlers fired'

    $('.listing').on 'click', '.list-header', Search.cancelHandler

  cancelHander: ->
    console.log 'cancelHeader handler'
    $('.list-header > .search > input').val ''


