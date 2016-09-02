
Users =

  i: ->
    console.log 'Users.i'
    @load()

  load: ->
    Spinner.i($('.content'))
    _.get '/api/users',
      view: true
    .done (response) ->
      console.log response

