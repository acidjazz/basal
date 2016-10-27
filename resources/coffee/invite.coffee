Invite =
  hash: false

  i: ->

    Spinner.i($('.page.invite'))

    if User? isnt false
      Spinner.d()
      Prompt.i 'Invite Erorr', 'You are currently logged in', ['OK'], {}, ->
        location.href = '/'

    else
      if match = location.pathname.match /\/invite\/([0-9a-fA-F]{8})/
        @hash = match[1]
        @load @hash
      else

  load: (hash) ->

    _.get '/api/invite/get',
      hash: hash
    .always ->
      Spinner.d()
    .done (result) ->
      invite = result.data.invite

      $('.page.invite > .profile').css 'background-image',"url(#{invite.client.profile})"
      $('.page.invite > .title').html invite.client.name
