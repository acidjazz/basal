Client =

  selectUser: false
  _id: false
  crop: false
  profile: false

  i: ->

    @handlers()
    if match = location.pathname.match /\/clients\/([0-9a-fA-F]{24})/
      @_id = match[1]
      @load @_id

    @selectUser = Selectize.users $('.page.client > .input-users > input'), @selectUserHandler, me: false

    $('.page.client > .input > input').focus()
 
  handlers: ->
    $('.page.client > .submit').click @modifyHandler

    $(document).on 'dragover', @dragover
    $(document).on 'dragleave', @dragleave
    $(document).on 'dragenter dragover', @cancel

    $(document).on 'drop dragdrop', @drop

    $('.input-image > button.cta').on 'click', @chooseFile
    $('.input-image > input:file').change @change

  cancel: ->
    event.preventDefault()

  dragover: ->
    _.on '.input-image'

  dragleave: ->
    _.off '.input-image'

  drop: (e) ->
    e.preventDefault()
    _.off '.input-image'

    if e.originalEvent.dataTransfer and e.originalEvent.dataTransfer.files.length
      files = e.originalEvent.dataTransfer.files

    Client.croppie files[0]

  change: ->
    if $(this)[0].files
      files = $(this)[0].files
    Client.croppie files[0]

  chooseFile: ->
    $('.input-image > input').trigger 'click'


  croppie: (file) ->
    reader = new FileReader()
    reader.onloadend = ->

      if Client.crop isnt false
        Client.crop.croppie 'destroy'
        Client.crop = false

      Client.crop = $('.input-image > .croppie').croppie
        url: reader.result
        viewport:
          width: 200
          height: 200
        boundary:
          width: 300
          height: 300

    reader.readAsDataURL file

  selectUserHandler: ->

  modifyHandler: ->

    if Client.crop isnt false
      Client.crop.croppie 'result',
        type: 'canvas'
        size: 'viewport'
      .then (response) ->
        Client.imageUpload Client.dataURItoBlob(response), ->
          Client.modify()
    else
      Client.modify()

  modify: ->

    name = $('.page.client > .input-name > input').val()
    users = $('.page.client > .input-users > input').val().split ','

    call = '/api/clients/add'
    if Client._id isnt false
      call = "/api/clients/update/#{Client._id}"

    Spinner.i($('.page.client'))

    _.get call, name: name, users: users, profile: Client.profile
      .always ->
        Spinner.d()
      .done (response) ->
        Notice.i response.data.status, 'success'
        if Client._id is false
          window.history.pushState {}, '', "/clients/#{response.data._id}"
        Client._id = response.data._id
        if Client.profile
          $('.page.client > .input-image > .picture').css 'background-image', "url('#{Client.profile}')"

  load: ->

    Spinner.i($('.page.client'))

    _.get '/api/clients/',
      _id: @_id
    .always ->
      Spinner.d()
    .done (response) ->
      location.href = '/clients/new' if response.data.length < 1
      client = response.data[0]
      $('.page.client > .input-name > input').val client.name
      if client.profile
        $('.page.client > .input-image > .picture').css 'background-image', "url('#{client.profile}')"
        Client.profile = client.profile
      for index, user of client.users
        if user.id isnt User._id
          Client.selectUser[0].selectize.addOption id: user.id, name: "#{user.name} (#{user.email})"
          Client.selectUser[0].selectize.addItem user.id


  dataURItoBlob: (dataURI) ->
    byteString = undefined
    if dataURI.split(',')[0].indexOf('base64') >= 0
      byteString = atob(dataURI.split(',')[1])
    else
      byteString = unescape(dataURI.split(',')[1])
    # separate out the mime component
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    # write the bytes of the string to a typed array
    ia = new Uint8Array(byteString.length)
    i = 0
    while i < byteString.length
      ia[i] = byteString.charCodeAt(i)
      i++
    new Blob([ ia ], type: mimeString)
        
  imageUpload: (blob, callback) ->

    fd = new FormData()
    fd.append 'file', blob

    _.post
      xhr: ->
        xhr = new window.XMLHttpRequest()
        xhr.upload.addEventListener 'progress', (e) ->
          complete = e.loaded / e.total
          if complete < 1 then Notice.i 'Uploading image..', progress: complete
          if complete is 1 then Notice.i 'Processing image..', progress: complete
        , false
        return xhr

      url: '/api/upload'
      data: fd
      cache: false
      contentType: false
      processData: false
      error: ->
        Notice.d()
      success: (result) ->
        Notice.i 'File uploaded successfully', type: 'success'
        Client.profile = result.data.url
        callback(result)


