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

  Blog: (el, name) ->

    editor = el.find('.blog').summernote
      placeholder: @placeholders[Math.floor(Math.random() * @placeholders.length)]

    console.log editor

    @blogs.push name: name, editor: editor, el: el.find('.blog')

  blogGetCode: (name) ->
    for blog in @blogs
      return blog.el.summernote('code') if blog.name is name
 
  blogFocus: (name) ->
    for blog in @blogs
      if blog.name is name
        $('.note-editable').focus()


  Tags: (el, name) ->
    el.find('input').selectize
      plugins: ['restore_on_backspace','remove_button']
      delimiter: ','
      persist: false
      create: (input) ->
        value: input
        text: input
