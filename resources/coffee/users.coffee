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
      Users.select2()

  handlers: ->
    $('.users > .content').on 'change', '.details > .detail > .value.toggle > input:checkbox', @toggleHandler

  toggleHandler: ->
    t = $ this
    if t.is(':checked') then checked = 1 else checked = 0
    Users.update t.data('_id'), t.data('field'), checked

  select2: ->
    $('.user > .details > .detail_client > .value.select select').select2
      placeholder: "Client"
      ajax:
        url: '/api/clients'
        dataType: 'json'
        data: (params) ->
          q: params.search
          page: params.page

        processResults: (results, params) ->

          params.page = params.page || 1

          results: results.data
      scapeMarkup: (markup) -> markup
      templateResult: formatRepo
      templateSelection: formatRepoSelection


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
