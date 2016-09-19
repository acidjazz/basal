Structures =

  template: false

  i: ->
    @template = $('.entities > #template').html()
    @handlers()
    @entityAdd()

  handlers: ->
    $('.content > .add > .entities > .more').click @entityAddHandler
    $('.content > .add > .entities').on 'click','.entity > .remove', @entityRemoveHandler

    $('.content > .add > .submit > .ctap').click @submitHandler

  entityAddHandler: ->
    Structures.entityAdd()

  entityRemoveHandler: ->
    $(this).parent().remove()

  entityAdd: ->
    $('.entities').append @template
    @select2()

  select2: ->
    $('.entities > .entity > .input > select').select2
      placeholder: "Type", minimumResultsForSearch: -1

  submitHandler: ->

    console.log 'submit'
