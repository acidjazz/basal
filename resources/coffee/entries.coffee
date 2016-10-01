Entries =

  i: ->

    @load()
    Time.i()

  load: ->

    Spinner.i($('.entries > .content'))

    _.get '/api/entries',
      view: true
    .done (response) ->
      $('.entries > .content > .listing').html response.view
      Spinner.d()
