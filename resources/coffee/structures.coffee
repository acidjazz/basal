Structures =

  template: false

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

    Selectize.clients $('.add > .client > select')

  toggleAddHandler: ->
    _.swap '.add'
    $('.add > .name input').focus()

  entityAddHandler: ->
    Structures.entityAdd(true)

  entityRemoveHandler: ->
    $(this).parent().remove()

  entityAdd: (focus=false) ->
    $('.add > .entities').append @template
    @selectize()
    if  focus
      $('.add > .entities > .entity > .input.selectize-input input').last().focus()

  selectize: ->
    $('.entities > .entity > .input > select').selectize
      placeholder: "Type"

  submitHandler: ->

    structure = {}
    structure.entities = []

    structure.name = $('.add > .name input').val()
    structure.client = $('.add > .client select').val()

    $('.add > .entities > .entity').each (i, el) ->

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


