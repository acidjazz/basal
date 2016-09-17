Clients =

  i: ->
    @load()
    Time.i()

    $('.date').each (i, el) ->
      console.log i, el

  load: ->
    Spinner.i($('.clients > .content'))
    _.get '/api/clients',
      view: true
    .done (response) ->
      $('.clients > .content').html response.view
      Spinner.d()
