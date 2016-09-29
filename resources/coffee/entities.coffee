Entities =
  blogs: []

  Blog: (el) ->
    editor = new Quill el.find('.editor')[0],
      modules:
        toolbar: el.find('.toolbar')[0]
      placeholder: Entries.placeholders[Math.floor(Math.random() * Entries.placeholders.length)]
      theme: 'snow'
    @blogs.push editor

  Tags: (el) ->
    el.find('input').selectize
      plugins: ['restore_on_backspace','remove_button']
      delimiter: ','
      persist: false
      create: (input) ->
        value: input
        text: input

