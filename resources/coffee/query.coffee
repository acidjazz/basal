Query =

  getQuery: ->
    return location.search.slice(1)

  setQuery: (params) ->
    query = qs.stringify params
    location.search = '?' + query if query isnt undefined
    location.search = location.search.substr(1) if query is undefined

    
  param: (key, value) ->

    query = @getQuery()

    params = qs.parse query

    return params[key] if value is undefined

    if value is false
      delete params[key]
    else
      params[key] = value
    @setQuery params
