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
      $('.clients > .content').html response.view
      Spinner.d()

  handlers: ->
    $('.add > .cta').click @addHandler
    $('.add > .input > input').keyup @addEnterHandler

  addEnterHandler: (e) ->
    Clients.addHandler() if e.which == 13

  addHandler: ->

    inputel = $('.add > .input')
    input = $('.add > .input > input')

    return _.on inputel if inputel.hasClass 'off'

    if input.val() == ""
      Notice.i 'Place specify a name', 'warning'
      return input.focus()


    Spinner.i($('.clients > .content'))
    _.get '/api/client/add', name: input.val()
    .done (response) ->
      console.log response
      Spinner.d()
      input.val('')
      _.off inputel
      Notice.i 'Client added successfully', 'success'
      Clients.load()
