Structures =

  template: false

  i: ->
    @template = $('.add > #template').html()
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

    $("""
      .content > .add > .name input,
      .content > .add > .entities input,
      .content > .add > .entities select
      """).each (i, el) ->
      jel = $ el
      console.log jel.attr('name') + ":" + jel.val()
