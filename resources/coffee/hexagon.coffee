hexagon = ->
  c = document.getElementById 'canvas'
  w = c.width = window.innerWidth
  h = c.height = window.innerHeight
  ctx = c.getContext('2d')
  opts =
    len: 20
    count: 50
    baseTime: 10
    addedTime: 10
    dieChance: .05
    spawnChance: 1
    sparkChance: .1
    sparkDist: 10
    sparkSize: 2
    color: 'hsl(hue,100%,light%)'
    baseLight: 50
    addedLight: 10
    shadowToTimePropMult: 6
    baseLightInputMultiplier: .01
    addedLightInputMultiplier: .02
    cx: w / 2
    cy: h / 2
    repaintAlpha: .04
    hueChange: .1
  tick = 0
  lines = []
  dieX = w / 2 / opts.len
  dieY = h / 2 / opts.len
  baseRad = Math.PI * 2 / 6

  ctx.fillStyle = 'black'
  ctx.fillRect 0, 0, w, h

  looop = ->
    window.requestAnimationFrame looop
    ++tick
    ctx.globalCompositeOperation = 'source-over'
    ctx.shadowBlur = 0
    ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha)
    ctx.fillRect 0, 0, w, h
    ctx.globalCompositeOperation = 'lighter'
    if lines.length < opts.count and Math.random() < opts.spawnChance
      lines.push new Line
    lines.map (line) ->
      line.step()
      return
    return

  Line = ->
    @reset()
    return

  Line::reset = ->
    @x = 0
    @y = 0
    @addedX = 0
    @addedY = 0
    @rad = 0
    @lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random()
    @color = opts.color.replace('hue', tick * opts.hueChange)
    @cumulativeTime = 0
    @beginPhase()
    return

  Line::beginPhase = ->
    @x += @addedX
    @y += @addedY
    @time = 0
    @targetTime = opts.baseTime + opts.addedTime * Math.random() | 0
    @rad += baseRad * (if Math.random() < .5 then 1 else -1)
    @addedX = Math.cos(@rad)
    @addedY = Math.sin(@rad)
    if Math.random() < opts.dieChance or @x > dieX or @x < -dieX or @y > dieY or @y < -dieY
      @reset()
    return

  Line::step = ->
    ++@time
    ++@cumulativeTime
    if @time >= @targetTime
      @beginPhase()
    prop = @time / @targetTime
    wave = Math.sin(prop * Math.PI / 2)
    x = @addedX * wave
    y = @addedY * wave
    ctx.shadowBlur = prop * opts.shadowToTimePropMult
    ctx.fillStyle = ctx.shadowColor = @color.replace('light', opts.baseLight + opts.addedLight * Math.sin(@cumulativeTime * @lightInputMultiplier))
    ctx.fillRect opts.cx + (@x + x) * opts.len, opts.cy + (@y + y) * opts.len, 2, 2
    if Math.random() < opts.sparkChance
      ctx.fillRect opts.cx + (@x + x) * opts.len + Math.random() * opts.sparkDist * (if Math.random() < .5 then 1 else -1) - (opts.sparkSize / 2), opts.cy + (@y + y) * opts.len + Math.random() * opts.sparkDist * (if Math.random() < .5 then 1 else -1) - (opts.sparkSize / 2), opts.sparkSize, opts.sparkSize
    return

  window.addEventListener 'resize', ->
    w = c.width = window.innerWidth
    h = c.height = window.innerHeight
    ctx.fillStyle = 'black'
    ctx.fillRect 0, 0, w, h
    opts.cx = w / 2
    opts.cy = h / 2
    dieX = w / 2 / opts.len
    dieY = h / 2 / opts.len
    return

  looop()

