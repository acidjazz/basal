Entry =

  selectStructure: {}

  _id: false
  structure: false
  entry: false

  i: ->

    @selectize()
    @handlers()

    if match = location.pathname.match /\/entries\/([0-9a-fA-F]{24})/
      @_id = match[1]
      @load @_id
    else
      Entry.selectStructure[0].selectize.focus()
 
  selectize: ->

    @selectStructure = Selectize.structures $('.modify > .structure > select'),
      Entry.structureSelectHandler

  handlers: ->
    $('.page.entry > .modify > .submit').click @submit

    $('.focusme').focus ->
      $('.note-editable').focus()


  load: (_id) ->

    Spinner.i($('.page.entry'))

    _.get '/api/entries/',
      _id: _id
    .always ->
      Spinner.d()
    .done (response) ->
      entry = response.data[0]
      Entry.entry = entry
      Entry.selectStructure[0].selectize.addOption entry.structure
      Entry.selectStructure[0].selectize.setValue entry.structure.id
      Entry.selectStructure[0].selectize.disable()

  submit: ->

    name = $('.page.entry > .modify > .name > .input > input').val()
    entities = {}

    $('.page.entry > .modify > .body > .entity').each (i, el) ->
      entity_name = $(el).find('.label').html()
      type = $(el).data 'type'

      switch type
        when 'Text','Date','Time','DateTime','DateRange','DateTimeRange' then value = $(el).find('input').val()
        when 'Tags' then value = $(el).find('input').val().split ','
        when 'Blog'
          blog = Entities.blogGetCode entity_name
          value = blog
        when 'Image'
          value = Entities.images[entity_name]

      entities[entity_name] = name: entity_name, type: type, value: value

    .promise().done ->

      console.log entities

      Spinner.i($('.page.entry > .modify'))

      call = '/api/entries/add'
      if Entry._id isnt false
        call = "/api/entries/update/#{Entry._id}"

      _.get call,
        name: name
        structure: Entry.structure
        entities: entities
      .always ->
        Spinner.d()
      .done (response) ->
        Notice.i response.data.status, type: 'success'
        if Entry._id is false
          window.history.pushState {}, '', "/entries/#{response.data._id}"
        Entry._id = response.data._id

  structureSelectHandler: (e) ->
    structure_id = $(e.currentTarget).val()
    return false if structure_id.length isnt 24
    if Entry.entry isnt false
      Entry.loadEntities Entry.entry.entities, Entry.entry.name
    else
      Entry.loadStructure structure_id

  loadStructure: (_id) ->

    Spinner.i($('.page.entry > .modify'))

    _.get '/api/structures',
      _id: _id
    .always ->
      Spinner.d()
    .done (response) =>
      Entry.structure = _id
      @loadEntities response.data[0].entities

  loadEntities: (entities, name=false) ->

    _.on '.page.entry > .modify > .name'
    $('.page.entry > .modify > .name > .input > input').val(name) if name isnt false

    body = $('.page.entry > .modify > .body')
    body.html ''

    tabindex = 3
    index = 0

    for i, entity of entities

      html = $(".page.entry > #template > .entity_#{entity.type}").clone()
      html.addClass "entity_index_#{++index}"
      html.data "index", index
      html.data "name", name

      if entity.value
        switch entity.type
          when 'Text','Date','Time','DateTime','DateRange','DateTimeRange' then html.find('input').val entity.value

      html.find('input,select,textarea').attr 'tabindex', tabindex++
      body.append html

      entityEl = $(".page.entry > .modify > .body .entity_index_#{index}")
      entityEl.find('.label').html entity.name

      if Entities[entity.type] isnt undefined
        Entities[entity.type](entityEl, entity.name, entity.value)

    $('[tabindex=2]').focus()
    _.on '.page.entry > .modify > .submit'
    $('.page.entry > .modify > .submit').attr 'tabindex', tabindex
