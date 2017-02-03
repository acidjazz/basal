Query =

  getQuery: ->
    return location.search.slice(1)

  setQuery: (params) ->
    query = qs.stringify params
    if query is undefined or query is ''
      history.pushState null, null, location.pathname
      return true

    history.pushState null, null, location.pathname + '?' + query
    
  param: (key, value) ->

    query = @getQuery()

    params = qs.parse query

    return params[key] if value is undefined

    if value is false
      delete params[key]
    else
      params[key] = value
    @setQuery params
