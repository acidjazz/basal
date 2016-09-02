Dashboard =

  data: {}

  i: ->
    @getdata =>
      @populate()

  populate: ->
    $('.dashboard .value').each (i, el) =>
      $(el).html @dotstovalue $(el).data 'value'

  getdata: (complete) ->

    _.get '/api/users'
      .done (response ) =>
        @data.users = response
        complete()

  dotstovalue: (dots) ->
    result = @data
    for dim in dots.split '.'
      result = result[dim]

    return result

