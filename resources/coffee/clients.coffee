Clients =

  i: ->
    @load()

  load: ->
    Spinner.i($('.clients > .content'))
    _.get '/api/clients',
      view: true
    .done (response) ->
      Time.i()
      $('.clients > .content > .listing').html response.view
      Spinner.d()
