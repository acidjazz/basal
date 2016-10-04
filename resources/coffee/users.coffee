Users =

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

  handlers: ->
    $('.users > .content').on 'change', '.details > .detail > .value.toggle > input:checkbox', @toggleHandler

  toggleHandler: ->
    t = $ this
    if t.is(':checked') then checked = 1 else checked = 0
    Users.update t.data('_id'), t.data('field'), checked

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
