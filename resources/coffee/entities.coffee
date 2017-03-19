Entities =

  blogs: []
  crops: {}
  images: {}

  placeholders: [
    "That's what I'm blogging about"
    "Have you guys been blogging?"
    "Hold all my calls, I'm blogging"
    "Tell Donnie I'm blogging and I'll call him back"
    "I gotta run, you should be blogging"
    "I want you on the phone, but I also want you blogging"
  ]

  Blog: (el, name, value=false) ->

    editor = el.find('.blog').summernote
      placeholder: @placeholders[Math.floor(Math.random() * @placeholders.length)]
      callbacks:
        onImageUpload: (files) ->
          Entities.imageUpload files, this

    el.find('.blog').summernote('code', value) if value isnt false

    @blogs.push name: name, editor: editor, el: el.find('.blog')

  blogGetCode: (name) ->
    for blog in @blogs
      return blog.el.summernote('code') if blog.name is name
 
  blogFocus: (name) ->
    for blog in @blogs
      if blog.name is name
        $('.note-editable').focus()

  imageUpload: (files, el) ->

    fd = new FormData()
    fd.append 'file', files[0]

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
        $(el).summernote('editor.insertImage', result.data.url)
        Notice.i 'File uploaded successfully', type: 'success'

  Tags: (el, name) ->
    el.find('input').selectize
      plugins: ['restore_on_backspace','remove_button']
      delimiter: ','
      persist: false
      create: (input) ->
        value: input
        text: input

  Time: (el, name, value) ->
    el.find('input').flatpickr
      enableTime: true
      noCalendar: true
      dateFormat: 'h:i K'

  Date: (el, name, value) ->
    el.find('input').flatpickr
      dateFormat: 'm/d/Y'

  DateTime: (el, name, value) ->
    el.find('input').flatpickr
      dateFormat: 'm/d/Y h:i K'
      enableTime: true

  DateRange: (el, name, value) ->
    el.find('input').flatpickr
      dateFormat: 'm/d/Y'
      mode: 'range'

  DateTimeRange: (el, name, value) ->
    el.find('input').flatpickr
      dateFormat: 'm/d/Y h:i K'
      enableTime: true
      mode: 'range'

  Image: (el, name, value) ->

    @imageHandlers el

    # preload existing images
    if value isnt undefined
      Entities.cropper(value, el)
      Entities.images[name] = value


  imageHandlers: (el, name) ->

    el.on 'dragover', @imageHandler.dragover
    el.on 'dragleave', @imageHandler.dragleave
    el.on 'dragenter dragover', @imageHandler.cancel
    el.on 'drop dragdrop', @imageHandler.drop
    el.find('.input-image > button.cta.select').on 'click', @imageHandler.chooseFile
    el.find('.input-image > button.cta.save').on 'click', @imageHandler.save
    el.find('.input-image > input:file').on 'change', @imageHandler.change

  imageHandler:

    dragover: ->
      _.on $(this).find('.input-image')
    dragleave: ->
      _.off $(this).find('.input-image')
    cancel: ->
      event.preventDefault()

    drop: (e) ->

      e.preventDefault()

      _.off $(this).find '.input-image'

      if e.originalEvent.dataTransfer and e.originalEvent.dataTransfer.files.length
        files = e.originalEvent.dataTransfer.files

      Entities.loadCropper files[0], $(this)

    chooseFile: ->
      $(this).parent().find('input').trigger 'click'

    change: ->
      if $(this)[0].files
        files = $(this)[0].files

        Entities.loadCropper files[0], $(this).parent().parent()

    save: ->

      name = $(this).parent().parent().data 'name'
      index = $(this).parent().parent().data 'index'

      Spinner.i($(".entity_index_#{index}"))

      Entities.crops[name].getCroppedCanvas().toBlob (blob) ->
        Client.imageUpload blob, (result) ->
          Spinner.d()
          Entities.images[name] = result.data.url
      , 'image/jpeg'

  loadCropper: (file, el) ->

    reader = new FileReader()

    reader.onloadend = ->
      Entities.cropper reader.result, el
    reader.readAsDataURL file

  cropper: (url, el) ->

    name = el.data 'name'
    index = el.data 'index'

    console.log name, index

    if Entities.crops[name] isnt undefined
      Entities.crops[name].destroy()
      Entities.crops[name] = false

    el.find('.cropper').attr 'src', url

    Entities.crops[name] = new Cropper el.find('.cropper')[0],
      minContainerHeight: 300
      minCanvasHeight: 300
      responsive: true
      preview: "div.entity_index_#{index} > div.input-image > div.picture"
      autoCropArea: 1
      strict: false
      highlight: true

    _.on el.find('.save')


