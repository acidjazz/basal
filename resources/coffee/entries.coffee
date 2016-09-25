Entries =

  i: ->

    @selectize()

    editor = new Quill '#editor',
      modules:
        toolbar: '#toolbar'
      theme: 'snow'

  selectize: ->

    Selectize.clients $('.add > .client > select'), Entries.clientSelectHandler
    Selectize.structures $('.add > .structure > select'), Entries.structureSelectHandler

  clientSelectHandler: (e) ->

    client_id = $(e.currentTarget).val()

    console.log client_id

    return false if client_id.length isnt 24


  structureSelectHandler: (e) ->

    structure_id = $(e.currentTarget).val()

    console.log structure_id

    return false if structure_id.length isnt 24



