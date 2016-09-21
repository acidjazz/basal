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
    $('.add > .entities > .more').click @entityAddHandler
    $('.add > .entities').on 'click','.entity > .remove', @entityRemoveHandler
    $('.page.structures > .ctap').click @toggleAddHandler
    $('.add > .submit > .ctap').click @submitHandler

  toggleAddHandler: ->
    _.swap '.add'
    $('.add > .name > input').focus()

  entityAddHandler: ->
    Structures.entityAdd()

  entityRemoveHandler: ->
    $(this).parent().remove()

  entityAdd: ->
    $('.add > .entities').append @template
    @select2()

  select2: ->
    $('.entities > .entity > .input > select').select2
      placeholder: "Type", minimumResultsForSearch: -1

  submitHandler: ->

    structure = {}
    structure.entities = []

    structure.name = $('.add > .name input').val()

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


