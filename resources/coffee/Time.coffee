Time =
  interval: false
  gap: 1000

  i: ->
    @scrape()
    @int3erval = setInterval @scrape, @gap

  scrape: ->
    $('time').each (i, el) =>
      jel = $ el
      jel.html moment(jel.attr('title')).fromNow true

