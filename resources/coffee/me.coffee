Me =

  logout: (complete) ->

    _.get '/api/auth/logout'
      .done (response) ->
        complete()

  oauth: (type, complete) ->

    _.get "/api/auth/#{type}"
      .done (response) ->
        complete(response.data.uri)

  authed: (result) ->
    _.get '/api/auth'
      .done (response) ->
        result response.data.user

  get:
    clientId: ->
      return User.client.id
