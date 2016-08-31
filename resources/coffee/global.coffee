Global =

  # kevin olson (kevin@256.io) aka 🌀🎷

  window: false

  i: ->
    Global.handlers()
    Global.loginCheck()

  handlers: ->

    $('header > .inner > .user > .profile').click Global.userProfileHandler
    $('header > .inner > .user > .oauths > .oauth').click Global.userOauthHandler
    $('header > .inner > .user > .picture > .logout').click Global.logoutHandler

  logoutHandler: ->

    Spinner.i $('header')

    Me.logout ->
      _.swap '.user > .profile'
      _.swap '.user > .picture'
      Notice.i 'Logout Successful', 'success'

  userProfileHandler: ->

    oa = $('.oauths')
    tl = new TimelineMax repeat: 0

    if oa.hasClass 'off'
      _.on oa
      tl.to '#profileSVG', 0.8, {morphSVG: '#cancelSVG', ease:Back.easeInOut}
    else
      tl.to '#profileSVG', 0.8, {morphSVG: '#profileSVG', ease:Back.easeInOut}
      _.off oa, offing: 0.5

  userOauthHandler: ->

    type = $(this).data 'type'

    Global.userProfileHandler()
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

    return

  oauthComplete: (user) ->

    Spinner.d()

    Global.login user

    Notice.i 'Login Successful', 'success'

  login: (user) ->

    window.User = user

    $('header > .inner > .user > .picture > img').attr 'src', User.picture
    _.off '.user > .profile'
    _.off '.user > .oauths'
    _.on '.user > .picture'

  loginCheck: ->
    Me.authed (result) ->
      Global.login(result) if result isnt false
