Global =

  # kevin olson (kevin@256.io) 🌀🎷

  window: false
  windowTimer: false
  init: false
  protected: ['entries','structures','clients','users']

  i: ->
    Global.handlers()
    Global.loginCheck()

    $(".menu > .option_#{Page}").addClass('active') if Page?

  handlers: ->

    $('header > .inner > .me > .profile').click Global.userProfileHandler
    $('.oauths > .oauth').click Global.userOauthHandler
    $('header > .inner > .me > .picture > .logout').click Global.logoutHandler
    $('.menu > .option').click Global.menuHandler

  menuHandler: ->
    $('.menu > .option').removeClass 'active'
    $(this).addClass 'active'
    Spinner.i($('header'))

  logoutHandler: ->

    Prompt.i 'Logout', 'Are you sure you want to log out?', ['Yes','No'], (response) ->
      return false if response isnt 'Yes'

      Spinner.i $('header')

      Me.logout ->
        _.swap '.me > .profile'
        _.swap '.me > .picture'
        Notice.i 'Logout successful', type: 'success'
        Spinner.d()
        setTimeout ->
          location.href = '/'
        , 1200

  userProfileHandler: ->

    oa = $('header > .inner > .me > .oauths')
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

    params = {}
    params.invite = Invite.hash if Invite.hash

    Me.oauth type, params, (uri) ->
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
    Notice.i 'Login successful', type: 'success'
    if User.client isnt undefined
      setTimeout ->
        location.href = '/entries'
      2000
    else
      setTimeout ->
        location.href = '/'
      2000

  login: (user) ->

    window.User = user

    $('header > .inner > .me > .picture > .image').css 'background-image', "url(#{User.picture})"
    _.off '.me > .profile'
    _.off '.me > .oauths'
    _.on '.me > .picture'

    if User.client isnt undefined
      $('header > .inner > .client > .name').html User.client.name
      $('header > .inner > .client > .picture').css 'background-image', "url(#{User.client.profile})"
      _.on 'header > .inner > .client'
      _.off 'header > .inner > .logo'
      _.off 'header > .inner > .name'
      _.off 'header > .inner > .menu > .option_clients'
      _.off 'header > .inner > .menu > .option_structures'
      _.on 'header > .inner > .menu'

  loginCheck: ->

    Me.authed (result) ->

      Global.login(result) if result isnt false

      # if the page were on 
      if Global.protected.indexOf(location.pathname.replace(/\//g, '')) isnt -1 and result is false
        location.href = '/'

      if Global.init isnt false and ( result isnt false or Global.init is 'Invite' )
        window[Global.init].i()

      # turn on all login / registration divs
      if window.User is undefined
        _.on 'header > .inner > .me > .profile'
        _.on '.page.home'
        _.on 'header > .inner > .logo'
        _.on 'header > .inner > .name'

      # client based user, go to entries
      if User?.client isnt undefined and Page isnt 'entries'
        location.href = '/entries'

      if window.User isnt undefined and User.client is undefined
        _.on 'header > .inner > .logo'
        _.on 'header > .inner > .name'
        _.on '.menu'
