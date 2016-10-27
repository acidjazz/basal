Clients =
  i: ->
    Listing.i 'clients', Clients.action

  action: (type) ->

    switch type
      when 'Client Invite'
        if Listing.selected.length > 1
          Notice.i 'Please choose a single client for an invite link', type: 'warning'
          return false
        Clients.getInvite(Listing.selected[0])

  getInvite: (client) ->

    Spinner.i($('.page.clients'))

    _.get '/api/invite', client: client
    .always ->
      Spinner.d()
    .done (response) ->
      console.log response
      Prompt.i(
        'Client Invite',
        'Share this URL with your client to allow them to modify their own entries',
        ['OK'],
          clipboard: true
          value: window.location.origin + '/invite/' + response.data.invite.hash,
      )



