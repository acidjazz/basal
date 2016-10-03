Time =
  interval: false
  gap: 1000

  i: ->
    @interval = setInterval(@scrape, @gaa) if @interval is false
    @scrape()

  scrape: ->
    $('time').each (i, el) =>
      jel = $ el
      jel.html moment(jel.attr('title')).fromNow()
