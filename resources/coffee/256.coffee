_ =

  i: ->
    @console = setInterval(@detect.bind(@), 200)

  p:
    offing: false
    offtime: 0

  turn: (el, remove=false, add=false) ->

    if el not instanceof jQuery
      el = $(el)

    if remove isnt false
      el.removeClass(remove)

    if add isnt false
      el.addClass(add)

    return true

  off: (el, p={}) ->

    if p.offing and p.offtime > 0

      @turn el, false, 'offing'
      setTimeout =>
        @turn el, 'offing', false
        @turn el, 'on', 'off'
      , p.offtime*1000 + 100

    else
      @turn el, 'on', 'off'

    return

  on: (el, p) ->
    @turn el, 'off', 'on'

  swap: (el, p) ->

    if el not instanceof jQuery
      el = $(el)

    if el.hasClass 'off'
      @on el, p
    else
      @off el, p

    return

  encode: (str) ->
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')

  t: (category, action, label, value) ->
    _gaq.push ['_trackEvent', category, action, label, value]

  rand: (min, max) ->
    return Math.floor(Math.random() * max) + min

  range: (start, end) ->
    result = []
    for num in [start..end]
      result.push num
    result

  fit: (srcWidth, srcHeight, maxWidth, maxHeight) ->
    ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
    width: srcWidth*ratio, height: srcHeight*ratio

  jinit: ->
    $.ajaxSetup
      dataType: "json"

  patch: (url, data) ->

    @jinit()

    jpatch = $.ajax
      url: url
      data: data
      type: 'PATCH'

    jpatch.fail (response) ->
      @fail(response)

    return jpatch

  get: (args...) ->

    @jinit()

    jget = $.get args...

    jget.fail (response) =>
      @fail(response)
      jget.fail(response)

    return jget

  post: (args...) ->

    jpost = $.post args...

    jpost.fail (response) =>
      @fail(response)
      jpost.fail(response)

    return jpost

  fail: (response) ->

    error = response.responseJSON?.errors?[0]
    if error is undefined
      return Prompt.i response.status, response.statusText

    pug = error.message.match /Pug Error: (.*?):([0-9]+)/
    if pug isnt null
      error.message = error.message.replace /Pug Error: (.*?):([0-9]+)/, ''
      error.file = pug[1]
      error.line = pug[2]

    file = @encode "#{error.file}"

    switch config.app.editor
      when 'macvim' then editor = 'mvim://open?url=file://'
      when 'sublime' then editor = 'subl://open?url=file://'
      when 'emacs' then editor = 'emacs://open?url=file://'
      when 'textmate' then editor = 'textmate://open/?url=file://'
      when 'phpstorm' then editor = 'phpstorm://open?file='

    if error.file isnt null
      body = """
        <pre>#{error.message}</pre>
        <a href="#{editor}#{file}&line=#{error.line}"><b>#{error.file}:#{error.line}</b></a>
      """
    else
      body = error.message

    Prompt.i error.type, body, ['OK']

  llc: ->
    ascii = """

      %cmmm/............................................................./mmm
      mmo................-:://::-.......-:::::::::::::-........-::///:-.omm
      md-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm
      mo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom
      m-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m
      d.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d
      h.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h
      h.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh
      d..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm
      m-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm
      mo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm
      md-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm
      mmo.............:::::::::::::::.......-:///::-...........-:///:-..omm
      mmm/............................................................./mmm

      :: syntactic sugar by 256
      :: http://256.io/
      :: #{config.meta.repo}
    """
    console.log ascii, "color: grey; font-family: Menlo, monospace;"

  detect: ->
    if (((window.outerHeight - window.innerHeight) > 100) || ((window.outerWidth - window.innerWidth) > 100))
      @llc()
      clearInterval @console

  methods: (obj) ->
    res = []
    for i,m of obj
      if typeof m is 'function'
        res.push m
    return res

_.i()
