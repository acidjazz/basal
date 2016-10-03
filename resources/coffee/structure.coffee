Structure =

  template: false
  _id: false

  i: ->

    @template = $('.modify > #template').html()
    @handlers()

    $('.modify > .name input').focus()

    if match = location.pathname.match /\/structures\/([0-9a-fA-F]{24})/
      @_id = match[1]
      @load @_id
    else
      @entityAdd()

  handlers: ->

    $('.modify > .entities > .more').click @entityAddHandler
    $('.modify > .entities').on 'click','.entity > .remove', @entityRemoveHandler
    $('.modify > .submit > .ctap').click @submitHandler

  load: ->

    Spinner.i($('.page.structure'))

    _.get '/api/structures/',
      _id: @_id
    .always ->
      Spinner.d()
    .done (response) ->
      structure = response.data[0]
      $('.modify > .name > .input > input').val structure.name
      for i, entity of structure.entities
        Structure.entityAdd false, entity


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

    console.log value
    ized[0].selectize.setValue value

  submitHandler: ->

    structure = {}
    structure.entities = []

    structure.name = $('.modify > .name > .input > input').val()

    $('.modify > .entities > .body > .entity').each (i, el) ->

      jinput = $(el).find '.input > input'
      jselect = $(el).find '.input > select'

      structure.entities.push
        name: jinput.val()
        type: jselect.val()

    .promise().done ->

      Structure.modify structure

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
        if Structure._id is false
          window.history.pushState {}, '', "/structures/#{response.data._id}"
        Structure._id = response.data._id
