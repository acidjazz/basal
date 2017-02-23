Entries =

  i: ->

    # limit filter types based on user type
    if User?.client isnt undefined
      Listing.i 'entries', false, ['structure']
    else
      Listing.i 'entries', false, ['client', 'structure']
