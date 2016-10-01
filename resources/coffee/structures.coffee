Structures =

  i: ->
    @load()
    Time.i()

  load: ->

    Spinner.i($('.structures > .content'))

    _.get '/api/structures',
      view: true, client: User.client.id
    .done (response) ->
      $('.structures > .content > .listing').html response.view
      Spinner.d()
