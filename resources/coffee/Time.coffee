Time =
  interval: false
  gap: 1000

  i: ->
    @interval = setInterval @scrape, @gap
    @scrape()

  scrape: ->
    $('time').each (i, el) =>
      jel = $ el
      jel.html moment(jel.attr('title')).fromNow()

