
Entries =

  addSelectClient: {}
  addSelectStructure: {}

  addSelectClientId: false

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

    $('.page.entries > .add').keydown (e) ->

      keycode = e.keycode || e.which
      return true if keycode isnt 9

      el = $(e.target)
      parent = $(e.target).closest('.entity')

      if e.shiftKey then next = parent.prev() else next = parent.next()

      if el.hasClass 'submit'
        if e.shiftKey then next = el.prev() else return true

      if next.length is 0
        $('.add > button.submit').focus()
        return false

      if next.data('type') is 'Blog'
        name = next.find('.label').html()
        Entities.blogFocus(name)
      else
        next.find('select,input,button').focus()

      return false

  submit: ->
    entries = {}
    $('.page.entries > .add > .body > .entity').each (i, el) ->
      name = $(el).find('.label').html()
      type = $(el).data 'type'

      switch type
        when 'Text' then value = $(el).find('input').val()
        when 'Tags' then value = $(el).find('input').val()
        when 'Blog'
          blog = Entities.blogGetCode name
          value = blog

      entries[name] = type: type, value: value

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
    tabindex = 1
    for entity, i in entities
      html = $(".page.entries > #template > .entity_#{entity.type}")
      html.find('input,select').attr 'tabindex', tabindex++ if entity.type isnt 'Blog'
      body.append html
      entityEl = $(".page.entries > .add > .body > .entity_#{entity.type}")
      entityEl.find('.label').html entity.name
      if Entities[entity.type] isnt undefined
        Entities[entity.type](entityEl, entity.name)
    $('[tabindex=1]').focus()
    _.on '.page.entries > .add > .submit'
