
Entries =

  addSelectClient: {}
  addSelectStructure: {}

  addSelectClientId: false

  _id: false

  i: ->

    @selectize()
    @handlers()

  selectize: ->

    @addSelectClient = Selectize.clients $('.modify > .client > select'),
      Entries.clientSelectHandler
    @addSelectStructure = Selectize.structures $('.modify > .structure > select'),
      Entries.structureSelectHandler,
      client: Entries.getAddSelectClientId

  handlers: ->
    $('.page.entries > .modify > .submit').click @submit

    $('.focusme').focus ->
      $('.note-editable').focus()

  submit: ->

    name = $('.page.entries > .modify > .name > .input > input').val()
    entries = []

    $('.page.entries > .modify > .body > .entity').each (i, el) ->
      name = $(el).find('.label').html()
      type = $(el).data 'type'

      switch type
        when 'Text' then value = $(el).find('input').val()
        when 'Tags' then value = $(el).find('input').val().split ','
        when 'Blog'
          blog = Entities.blogGetCode name
          value = blog

      entries.push name: name, type: type, value: value

    .promise().done ->

      Spinner.i($('.page.entries > .modify'))

      if Entries._id is false
        call = '/api/entries/add'
      else call = "/api/entries/update/#{Entries._id}"

      _.get call,
        name: name
        entries: entries
      .always ->
        Spinner.d()
      .done (response) ->
        Notice.i response.data.status, type: 'success'
        Entries._id = response.data._id

  clientSelectHandler: (e) ->
    client_id = $(e.currentTarget).val()
    return false if client_id.length isnt 24
    Entries.addSelectClientId = client_id
    Entries.addSelectStructure[0].selectize.enable()
    Entries.addSelectStructure[0].selectize.clearOptions()

  structureSelectHandler: (e) ->
    structure_id = $(e.currentTarget).val()
    return false if structure_id.length isnt 24
    Entries.loadStructure structure_id

  getAddSelectClientId: ->
    return Entries.addSelectClientId

  loadStructure: (_id) ->

    Spinner.i($('.page.entries > .modify'))

    _.get '/api/structures',
      _id: _id
    .always ->
      Spinner.d()
    .done (response) =>
      @loadEntities response.data[0].entities

  loadEntities: (entities) ->
    _.on '.page.entries > .modify > .name'
    body = $('.page.entries > .modify > .body')
    body.html ''
    tabindex = 2

    for entity, i in entities
      html = $(".page.entries > #template > .entity_#{entity.type}")
      html.find('input,select,textarea').attr 'tabindex', tabindex++
      body.append html
      entityEl = $(".page.entries > .modify > .body > .entity_#{entity.type}")
      entityEl.find('.label').html entity.name
      if Entities[entity.type] isnt undefined
        Entities[entity.type](entityEl, entity.name)
    $('[tabindex=1]').focus()
    _.on '.page.entries > .modify > .submit'
