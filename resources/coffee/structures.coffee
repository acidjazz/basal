Structures =

  template: false
  selectClients: false

  i: ->

    @load()

    @template = $('.add > #template').html()
    @handlers()
    @entityAdd()

    Time.i()

  load: ->

    Spinner.i($('.structures > .content'))

    _.get '/api/structures',
      view: true
    .done (response) ->
      $('.structures > .content > .listing').html response.view
      Spinner.d()

  handlers: ->

    $('.page.structures > .ctab').click @toggleAddHandler

    $('.add > .entities > .more').click @entityAddHandler
    $('.add > .entities').on 'click','.entity > .remove', @entityRemoveHandler
    $('.add > .submit > .ctap').click @submitHandler


  toggleAddHandler: ->

    _.swap '.add'
    $('.add > .name .client select').focus()

    if Structures.selectClients is false
      Structures.selectClients = Selectize.clients $('.add > .client > select')
    Structures.selectClients[0].selectize.focus()

  entityAddHandler: ->
    Structures.entityAdd(true)

  entityRemoveHandler: ->
    $(this).parent().remove()

  entityAdd: (focus=false) ->
    $('.add > .entities > .body').append @template
    @selectize()
    if  focus
      $('.add > .entities > .body > .entity > .input.selectize-input input').last().focus()

  selectize: ->
    $('.entities > .body > .entity > .input > select').selectize
      placeholder: "Type"

  submitHandler: ->

    structure = {}
    structure.entities = []

    structure.name = $('.add > .name input').val()
    structure.client = $('.add > .client select').val()

    $('.add > .entities > .body > .entity').each (i, el) ->

      jinput = $(el).find '.input > input'
      jselect = $(el).find '.input > select'

      structure.entities.push
        name: jinput.val()
        type: jselect.val()

    .promise().done ->

      _.get '/api/structures/add', structure
        .always ->
          Spinner.d()
        .done (response) ->
          console.log response
          $('.add > .entities').empty()
          _.off '.add'
          Notice.i 'Structure added successfully', 'success'
          Structures.load()
          $('.add > .name input').val('')


