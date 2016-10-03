Client =

  _id: false

  i: ->

    @handlers()
    if match = location.pathname.match /\/clients\/([0-9a-fA-F]{24})/
      @_id = match[1]
      @load @_id

    $('.page.client > .input > input').focus()
 
  handlers: ->
    $('.page.client > .submit').click @modifyHandler

  modifyHandler: ->

    name = $('.page.client > .input > input').val()

    call = '/api/clients/add'
    if Client._id isnt false
      call = "/api/clients/update/#{Client._id}"

    Spinner.i($('.page.client'))

    _.get call, name: name
      .always ->
        Spinner.d()
      .done (response) ->
        Notice.i response.data.status, 'success'
        if Client._id is false
          window.history.pushState {}, '', "/clients/#{response.data._id}"
        Client._id = response.data._id

  load: ->

    Spinner.i($('.page.client'))

    _.get '/api/clients/',
      _id: @_id
    .always ->
      Spinner.d()
    .done (response) ->
      client = response.data[0]
      $('.page.client > .input > input').val client.name
