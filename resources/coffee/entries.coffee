
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

    # blog entry
    #Entries.blog($('.entity_blog'))
    # tags entity
    #Entries.tags($('.entity_tags'))

  selectize: ->

    @addSelectClient = Selectize.clients $('.add > .client > select'), Entries.clientSelectHandler
    @addSelectStructure = Selectize.structures $('.add > .structure > select'), Entries.structureSelectHandler,
      client: Entries.getAddSelectClientId

  clientSelectHandler: (e) ->
    client_id = $(e.currentTarget).val()
    return false if client_id.length isnt 24
    Entries.addSelectClientId = client_id
    console.log Entries.addSelectStructure
    Entries.addSelectStructure[0].selectize.enable()
    Entries.addSelectStructure[0].selectize.clearOptions()

  structureSelectHandler: (e) ->
    structure_id = $(e.currentTarget).val()
    return false if structure_id.length isnt 24

  getAddSelectClientId: ->
    return Entries.addSelectClientId

  blog: (el) ->
    editor = new Quill el.find('.editor')[0],
      modules:
        toolbar: el.find('.toolbar')[0]
      placeholder: Entries.placeholders[Math.floor(Math.random() * Entries.placeholders.length)]
      theme: 'snow'

  tags: (el) ->
    el.find('input').selectize
      plugins: ['restore_on_backspace','remove_button']
      delimiter: ','
      persist: false
      create: (input) ->
        value: input
        text: input
