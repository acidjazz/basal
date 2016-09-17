Dashboard =

  data:{}

  i: ->
    @getdata =>
      @populate()

  populate: ->
    $('.dashboard .value').each (i, el) =>
      $(el).html @dotstovalue $(el).data 'value'

  getdata: (complete) ->

    gets = ['users','clients']

    $(gets).each (index, get) =>
      _.get "/api/#{get}"
        .done (response) =>
          @data[get] = response
          if Object.keys(@data).length == gets.length
            complete()

  dotstovalue: (dots) ->
    result = @data
    for dim in dots.split '.'
      result = result[dim]

    return result

