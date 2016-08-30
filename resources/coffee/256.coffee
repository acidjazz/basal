_ =

  constructor: ->
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
      setTimeout ->
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

`export default _`
