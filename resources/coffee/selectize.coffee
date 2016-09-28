Selectize =

  clients: (element, handler, options) ->
    selectClient = element.selectize
      placeholder: "Choose a Client "
      valueField: 'id'
      labelField: 'name'
      searchField: 'name'
      create: false
      preload: 'focus'
      render:
        option: (item, escape) ->
          return "<div>#{item.name}</div>"
      load: (query, callback) ->
        _.get '/api/clients', options
          .done (response) ->
            results = []
            for item in response.data
              results.push id: item._id, name: item.name
            callback(results)

    selectClient.change handler
    return selectClient

  structures: (element, handler, options) ->

    selectStructure = element.selectize
      placeholder: "Choose a Structure   "
      valueField: 'id'
      labelField: 'name'
      searchField: 'name'
      create: false
      preload: 'focus'
      render:
        option: (item, escape) ->
          return "<div>#{item.name}</div>"
      load: (query, callback) ->
        _.get '/api/structures', options
          .done (response) ->
            results = []
            for item in response.data
              results.push id: item._id, name: item.name
            callback(results)

    selectStructure.change handler
    return selectStructure

