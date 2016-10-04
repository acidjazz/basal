Global =

  # kevin olson (kevin@256.io) 🌀🎷

  window: false
  windowTimer: false
  init: false

  i: ->
    Global.handlers()
    Global.loginCheck()

    _.on ".menu > .options > .option_#{Page}, .menu" if Page?

  handlers: ->

    $('header > .inner > .me > .profile').click Global.userProfileHandler
    $('.oauths > .oauth').click Global.userOauthHandler
    $('header > .inner > .me > .picture > .logout').click Global.logoutHandler
    $('.menu > .options > .option').click Global.menuHandler

  menuHandler: ->
    _.off $('.menu > .options > .option')
    selected = $(this).find('.label').html()
    _.on $(".menu > .options > .option.option_#{selected}")

  logoutHandler: ->

    Prompt.i 'Logout', 'Are you sure you want to log out?', ['Yes','No'], (response) ->
      return false if response isnt 'Yes'

      Spinner.i $('header')

      Me.logout ->
        _.swap '.me > .profile'
        _.swap '.me > .picture'
        Notice.i 'Logout Successful', 'success'
        Spinner.d()
        setTimeout ->
          location.href = '/'
        , 1200

  userProfileHandler: ->

    oa = $('.oauths')
    tl = new TimelineMax repeat: 0

    if oa.hasClass 'off'
      _.on oa
      tl.to '#profileSVG', 0.8, {morphSVG: '#cancelSVG', ease:Power4.easeInOut}
    else
      tl.to '#profileSVG', 0.8, {morphSVG: '#profileSVG', ease:Power4.easeInOut}
      _.off oa, offing: 0.5

  userOauthHandler: ->

    type = $(this).data 'type'

    return true if type is 'cancel'

    Global.oauthWindow '/loading'

    Spinner.i $('header')

    Me.oauth type, (uri) ->
      Global.window.location.href = uri

  oauthWindow: (url) ->
    w = 640
    h = 550
    left = (screen.width/2) - (w/2)
    top = (screen.height/2) - (h/2)


    Global.window = window.open(url, 'Login / Register', "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=#{w},height=#{h},top=#{top},left=#{left}")
    Global.window.focus if window.focus
    Global.windowTimer = setInterval ->
      if Global.window.closed
        clearInterval Global.windowTimer
        Spinner.d()
        console.log 'closing our shite'
    , 50



    return

  oauthComplete: (user) ->
    Spinner.d()
    Global.login user
    Notice.i 'Login Successful', 'success'
    setTimeout ->
      location.href = '/dashboard'
    , 2000

  login: (user) ->

    window.User = user

    $('header > .inner > .me > .picture > .image').css 'background-image', "url(#{User.picture})"
    _.off '.me > .profile'
    _.off '.me > .oauths'
    _.on '.me > .picture'

    if User.client isnt undefined
      $('header > .inner > .client > .name').html User.client.name

  loginCheck: ->

    Spinner.i($('header'))

    Me.authed (result) ->
      Global.login(result) if result isnt false
      if Global.init isnt false and result isnt false
        window[Global.init].i()

      Spinner.d()
      location.href = '/dashboard' if location.pathname is '/' and result isnt false
      location.href = '/' if result is false and location.pathname isnt '/'
