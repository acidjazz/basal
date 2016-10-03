Entities =

  blogs: []

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
    console.log fd

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
