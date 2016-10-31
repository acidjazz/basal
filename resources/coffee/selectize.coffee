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
      openOnFocus: true
      onLoad: Entry.structureSpecified
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

  users: (element, handler, options) ->
    selectUser = element.selectize
      plugins: ['remove_button']
      valueField: 'id'
      labelField: 'name'
      searchField: 'name'
      create: false
      preload: 'focus'
      render:
        option: (item, escape) ->
          return "<div style='line-height: 30px;'>#{item.name} (#{item.email}) <img src='#{item.picture}' style='float: left; width: 30px; height: 30px; margin-right: 10px;' /></div>"
      load: (query, callback) ->
        _.get '/api/users', options
          .done (response) ->
            results = []
            for item in response.data
              results.push id: item._id, name: item.name, email: item.email, picture: item.picture
            callback(results)

    selectUser.change handler
    return selectUser


