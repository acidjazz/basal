Structure =

  template: false
  _id: false

  clientSelect: false

  i: ->

    @template = $('.modify > #template').html()
    @handlers()

    @clientSelect = Selectize.clients $('.page.structure > .modify > .detail.client > .input > select'),
      @clientSelecthandler

    if match = location.pathname.match /\/structures\/([0-9a-fA-F]{24})/
      @_id = match[1]
      @load @_id
      _.on '.modify > .submit > .cta'
    else
      @entityAdd()
      _.off '.modify > .clientAccess > .switch'

    @clientSelect[0].selectize.focus() if @_id is false

  handlers: ->

    $('.modify > .entities > .more').click @entityAddHandler
    $('.modify > .entities').on 'click','.entity > .remove', @entityRemoveHandler
    $('.modify > .submit > .ctap').click @submitHandler
    $('.modify > .submit > .cta').click @newEntryHandler
    $('.modify > .clientAccess > .switch').on 'click', @checkboxHandler

  checkboxHandler: ->
    _.swap this

  load: ->

    Spinner.i($('.page.structure'))

    _.get '/api/structures/',
      _id: @_id
    .always ->
      Spinner.d()
    .done (response) ->
      location.href = '/structures/new' if response.data.length < 1
      structure = response.data[0]
      $('.modify > .name > .input > input').val structure.name

      if structure.clientAccess is true
        _.on '.modify > .clientAccess > .switch'
      else
        _.off '.modify > .clientAccess > .switch'

      for i, entity of structure.entities
        Structure.entityAdd false, entity

      Structure.clientSelect[0].selectize.addOption
        id: structure.client.id, name: structure.client.name
      Structure.clientSelect[0].selectize.setValue structure.client.id



  entityAddHandler: ->
    Structure.entityAdd(true)

  entityRemoveHandler: ->
    $(this).parent().remove()

  entityAdd: (focus=false, entity=false) ->

    $('.modify > .entities > .body').append @template

    if entity isnt false
      $('.modify > .entities > .body > .entity:last-child').find('.input > input').val(entity.name)
      @selectize $('.modify > .entities > .body > .entity:last-child').find('.input > select'), entity.type
    else
      @selectize $('.modify > .entities > .body > .entity:last-child').find('.input > select')

    if  focus
      $('.modify > .entities > .body > .entity > .input.selectize-input input').last().focus()

  selectize: (el, value=false) ->
    ized = el.selectize
      placeholder: "Type"

    ized[0].selectize.setValue value

  submitHandler: ->

    structure = {}
    structure.entities = {}
    structure.client = $('.modify > .client > .input > select').val()
    structure.name = $('.modify > .name > .input > input').val()
    structure.clientAccess = $('.modify > .clientAccess > .switch').hasClass 'on'

    $('.modify > .entities > .body > .entity').each (i, el) ->

      name = $(el).find('.input > input').val()
      type = $(el).find('.input > select').val()

      structure.entities[name] =
        name: name
        type: type

    .promise().done ->

      console.log structure.entities
      Structure.modify structure

  newEntryHandler: ->
    location.href = "/entries/new#structure=#{Structure._id}"

  modify: (structure) ->

    Spinner.i($('.page.structure'))

    call = '/api/structures/add'
    if Structure._id isnt false
      call = "/api/structures/update/#{Structure._id}"

    _.get call, structure
      .always ->
        Spinner.d()
      .done (response) ->
        Notice.i response.data.status, 'success'
        _.on '.modify > .submit > .cta'
        if Structure._id is false
          window.history.pushState {}, '', "/structures/#{response.data._id}"
        Structure._id = response.data._id
