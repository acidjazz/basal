Dashboard =

  i: ->
    @load()

  load: (complete) ->
    Spinner.i($('.page.dashboard > .collections'))

    _.get '/api/clients',
      view: 'dashboard'
    .always ->
      console.log 'always'
      Spinner.d()
    .done (response) ->
      Time.i()
      $('.collections').html response.view

