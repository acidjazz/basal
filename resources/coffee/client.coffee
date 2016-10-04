Client =

  selectUser: false
  _id: false

  i: ->

    @handlers()
    if match = location.pathname.match /\/clients\/([0-9a-fA-F]{24})/
      @_id = match[1]
      @load @_id

    @selectUser = Selectize.users $('.page.client > .input-users > input'), @selectUserHandler, me: false

    $('.page.client > .input > input').focus()
 
  handlers: ->
    $('.page.client > .submit').click @modifyHandler

  selectUserHandler: ->

  modifyHandler: ->

    name = $('.page.client > .input-name > input').val()
    users = $('.page.client > .input-users > input').val().split ','

    call = '/api/clients/add'
    if Client._id isnt false
      call = "/api/clients/update/#{Client._id}"

    Spinner.i($('.page.client'))

    _.get call, name: name, users: users
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
      location.href = '/clients/new' if response.data.length < 1
      client = response.data[0]
      $('.page.client > .input-name > input').val client.name
      for index, user of client.users
        if user.id isnt User._id
          Client.selectUser[0].selectize.addOption id: user.id, name: "#{user.name} (#{user.email})"
          Client.selectUser[0].selectize.addItem user.id

