Clients =

  i: ->
    @load()
    @handlers()
    Time.i()

    $('.date').each (i, el) ->
      console.log i, el

  load: ->
    Spinner.i($('.clients > .content'))
    _.get '/api/clients',
      view: true
    .done (response) ->
      $('.clients > .content > .listing').html response.view
      Spinner.d()

  handlers: ->
    $('.add > .ctab').click @addHandler
    $('.add > .input > input').keyup @addEnterHandler

  addEnterHandler: (e) ->
    Clients.addHandler() if e.which == 13

  addHandler: ->

    inputel = $('.add > .input')
    input = $('.add > .input > input')

    if inputel.hasClass 'off'
      _.on inputel
      return input.focus()

    if input.val() == ""
      Notice.i 'Place specify a name', 'warning'
      return input.focus()

    Spinner.i($('.clients > .content'))
    _.get '/api/clients/add', name: input.val()
    .always ->
      Spinner.d()
    .done (response) ->
      console.log response
      input.val('')
      _.off inputel
      Notice.i 'Client added successfully', 'success'
      Clients.load()
