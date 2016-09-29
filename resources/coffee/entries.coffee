
Entries =

  addSelectClient: {}
  addSelectStructure: {}

  addSelectClientId: false

  placeholders: [
    "That's what I'm blogging about"
    "Have you guys been blogging?"
    "Hold all my calls, I'm blogging"
    "Tell Donnie I'm blogging and I'll call him back"
    "I gotta run, you should be blogging"
    "I want you on the phone, but I also want you blogging"
  ]

  i: ->

    @selectize()
    @handlers()

  selectize: ->

    @addSelectClient = Selectize.clients $('.add > .client > select'),
      Entries.clientSelectHandler
    @addSelectStructure = Selectize.structures $('.add > .structure > select'),
      Entries.structureSelectHandler,
      client: Entries.getAddSelectClientId

  handlers: ->
    $('.page.entries > .add > .submit').click @submit

  submit: ->
    entries = []
    $('.page.entries > .add > .body > .entity').each (i, el) ->
      name = $(el).find('.label').html()
      type = $(el).data 'type'
      console.log name, type

      switch type
        when 'Text' then value = $(el).find('input').val()
        when 'Tags' then value = $(el).find('seletct').val()

      entries.push
        name: name, type: type, value: value


    .promise().done ->

      console.log entries



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

    Spinner.i($('.page.entries > .add'))

    _.get '/api/structures',
      _id: _id
    .always ->
      Spinner.d()
    .done (response) =>
      @loadEntities response.data[0].entities

  loadEntities: (entities) ->
    body = $('.page.entries > .add > .body')
    body.html ''
    for entity in entities
      html = $(".page.entries > #template > .entity_#{entity.type}")
      body.append html
      entityEl = $(".page.entries > .add > .body > .entity_#{entity.type}")
      entityEl.find('.label').html entity.name
      if Entities[entity.type] isnt undefined
        Entities[entity.type](entityEl)
    _.on '.page.entries > .add > .submit'


