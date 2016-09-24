Users =

  selectClient: false

  i: ->
    @load()
    Time.i()
    @handlers()

  load: ->
    Spinner.i($('.users > .content'))
    _.get '/api/users',
      view: true
    .done (response) ->
      $('.users > .content').html response.view
      Spinner.d()
      Users.selectize()

  handlers: ->
    $('.users > .content').on 'change', '.details > .detail > .value.toggle > input:checkbox', @toggleHandler

  toggleHandler: ->
    t = $ this
    if t.is(':checked') then checked = 1 else checked = 0
    Users.update t.data('_id'), t.data('field'), checked

  selectClientHandler: (e) ->

    client_id = $(e.currentTarget).val()
    user_id = $(e.currentTarget).data '_id'

    return false if client_id.length isnt 24

    Users.update user_id, 'client', client_id

  selectize: ->

    @selectClient = $('.user > .details > .detail_client > .value.select select').selectize
      placeholder: "Choose a Client "
      valueField: 'id'
      labelField: 'name'
      searchField: 'name'
      create: false
      preload: 'focus'
      #onChange: @selectClientHandler
      render:
        option: (item, escape) ->
          console.log item
          return "<div>#{item.name}</div>"
      load: (query, callback) ->
        _.get '/api/clients'
          .done (response) ->
            results = []
            for item in response.data
              results.push id: item._id, name: item.name
            console.log results
            callback(results)

    @selectClient.change @selectClientHandler
  update: (_id, field, value) ->

    params = {}
    params[field] = value
    Spinner.i($('.users > .content'))

    _.get "/api/users/update/#{_id}", params
      .always ->
        Spinner.d()
      .done (response) ->
        Notice.i 'User updated successfully', 'success'
        $(".user.user_#{response.data.user._id} > .details > .detail_updated > .value > time")
          .attr 'title', response.data.user.updated_at
