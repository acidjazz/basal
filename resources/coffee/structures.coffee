Structures =

  i: ->
    @load()

  load: ->

    Spinner.i($('.page.structures'))

    _.get '/api/structures',
      view: true, client: User.client.id
    .done (response) ->
      Time.i()
      $('.structures > .content > .listing').html response.view
      Spinner.d()
