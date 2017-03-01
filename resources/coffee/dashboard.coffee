Dashboard =

  i: ->
    @load() if window.User isnt undefined

  load: (complete) ->
    _.off '.page.home'
    _.on '.page.dashboard'
    Spinner.i($('.page.dashboard > .collections'))

    _.get '/api/clients',
      view: 'dashboard'
    .always ->
      Spinner.d()
    .done (response) ->
      Time.i()
      $('.collections').html response.view

