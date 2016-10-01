Entry =

  #addSelectClient: {}
  addSelectStructure: {}

  #addSelectClientId: false

  _id: false
  structure: false

  i: ->

    @selectize()
    @handlers()

  selectize: ->

    #@addSelectClient = Selectize.clients $('.modify > .client > select'),
    #  Entry.clientSelectHandler
    @addSelectStructure = Selectize.structures $('.modify > .structure > select'),
      Entry.structureSelectHandler,
      #client: Entry.getAddSelectClientId
      client: Me.get.clientId

  handlers: ->
    $('.page.entry > .modify > .submit').click @submit

    $('.focusme').focus ->
      $('.note-editable').focus()

  submit: ->

    name = $('.page.entry > .modify > .name > .input > input').val()
    entities = []

    $('.page.entry > .modify > .body > .entity').each (i, el) ->
      entity_name = $(el).find('.label').html()
      type = $(el).data 'type'

      switch type
        when 'Text' then value = $(el).find('input').val()
        when 'Tags' then value = $(el).find('input').val().split ','
        when 'Blog'
          blog = Entities.blogGetCode entity_name
          value = blog

      entities.push name: entity_name, type: type, value: value

    .promise().done ->

      Spinner.i($('.page.entry > .modify'))

      call = '/api/entries/add'
      if Entry._id isnt false
        call = "/api/entries/update/#{Entry._id}"

      console.log entities

      _.get call,
        name: name
        structure: Entry.structure
        entities: entities
      .always ->
        Spinner.d()
      .done (response) ->
        Notice.i response.data.status, type: 'success'
        Entry._id = response.data._id

  clientSelectHandler: (e) ->
    client_id = $(e.currentTarget).val()
    return false if client_id.length isnt 24
    Entry.addSelectClientId = client_id
    Entry.addSelectStructure[0].selectize.enable()
    Entry.addSelectStructure[0].selectize.clearOptions()

  structureSelectHandler: (e) ->
    structure_id = $(e.currentTarget).val()
    return false if structure_id.length isnt 24
    Entry.loadStructure structure_id

  getAddSelectClientId: ->
    return Entry.addSelectClientId

  loadStructure: (_id) ->

    Spinner.i($('.page.entry > .modify'))

    _.get '/api/structures',
      _id: _id
    .always ->
      Spinner.d()
    .done (response) =>
      Entry.structure = _id
      @loadEntities response.data[0].entities

  loadEntities: (entities) ->
    _.on '.page.entry > .modify > .name'
    body = $('.page.entry > .modify > .body')
    body.html ''
    tabindex = 2

    for entity, i in entities
      html = $(".page.entry > #template > .entity_#{entity.type}")
      html.find('input,select,textarea').attr 'tabindex', tabindex++
      body.append html
      entityEl = $(".page.entry > .modify > .body > .entity_#{entity.type}")
      entityEl.find('.label').html entity.name
      if Entities[entity.type] isnt undefined
        Entities[entity.type](entityEl, entity.name)
    $('[tabindex=1]').focus()
    _.on '.page.entry > .modify > .submit'
