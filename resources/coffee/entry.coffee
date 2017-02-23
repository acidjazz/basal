Entry =

  selectStructure: {}

  _id: false
  structure: false
  selectedStructure: false
  entry: false

  i: ->

    if match = location.hash.match /#structure=([0-9a-fA-F]{24})/
      Entry.selectedStructure = match[1]

    @selectize()
    @handlers()

    if match = location.pathname.match /\/entries\/([0-9a-fA-F]{24})/
      @_id = match[1]
      @load @_id
    else
      Entry.selectStructure[0].selectize.focus()

  structureSpecified: ->
    if Entry.selectedStructure isnt false
      Entry.selectStructure[0].selectize.setValue Entry.selectedStructure

  selectize: ->

    @selectStructure = Selectize.structures $('.modify > .structure > select'),
      Entry.structureSelectHandler

  handlers: ->
    $('.page.entry > .modify > .submit').click @submit
    $('.page.entry > .modify > .another').click @another

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
      Entry.selectStructure[0].selectize.addOption
        id: entry.structure.id, name: entry.structure.name, clientProfile: entry.client.profile
      Entry.selectStructure[0].selectize.setValue entry.structure.id
      Entry.selectStructure[0].selectize.disable()

  submit: ->

    name = $('.page.entry > .modify > .name > .input > input').val()
    entities = {}

    $('.page.entry > .modify > .body > .entity').each (i, el) ->
      entity_name = $(el).find('.label').html()
      type = $(el).data 'type'

      switch type
        when 'Text','Link','Date','Time','DateTime','DateRange','DateTimeRange' then value = $(el).find('input').val()
        when 'Tags' then value = $(el).find('input').val().split ','
        when 'Blog'
          blog = Entities.blogGetCode entity_name
          value = blog
        when 'Image'
          value = Entities.images[entity_name]

      entities[entity_name] = name: entity_name, type: type, value: value

    .promise().done ->

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
        _.on '.page.entry > .modify > .another'

  another: ->
    location.href = "/entries/new#structure=#{Entry.structure}"
  structureSelectHandler: (e) ->
    structure_id = $(e.currentTarget).val()
    return false if structure_id.length isnt 24
    #if Entry.entry isnt false
    #  Entry.loadEntities Entry.entry.entities, Entry.entry.name
    #else
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
    if Entry.entry.name isnt false
      $('.page.entry > .modify > .name > .input > input').val(Entry.entry.name)

    body = $('.page.entry > .modify > .body')
    body.html ''

    tabindex = 3
    index = 0

    for i, entity of entities

      html = $(".page.entry > #template > .entity_#{entity.type}").clone()
      html.addClass "entity_index_#{++index}"
      html.data "index", index
      html.data "name", entity.name

      if Entry.entry.entities?[i]?.value

        value = Entry.entry.entities[i].value

        switch entity.type
          when 'Tags', 'Text','Link','Date','Time','DateTime','DateRange','DateTimeRange' then html.find('input').val value

      html.find('input,select,textarea').attr 'tabindex', tabindex++
      body.append html

      entityEl = $(".page.entry > .modify > .body .entity_index_#{index}")
      entityEl.find('.label').html entity.name

      if Entities[entity.type] isnt undefined
        Entities[entity.type](entityEl, entity.name, value)

    $('[tabindex=2]').focus()
    _.on '.page.entry > .modify > .submit'
    $('.page.entry > .modify > .submit').attr 'tabindex', tabindex++
    $('.page.entry > .modify > .another').attr 'tabindex', tabindex
