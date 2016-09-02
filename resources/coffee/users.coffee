
Users =

  i: ->
    console.log 'Users.i'
    @load()

  load: ->
    Spinner.i($('.users > .content'))
    _.get '/api/users',
      view: true
    .done (response) ->
      $('.users > .content').html response.view
      Spinner.d()
