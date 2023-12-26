const getTime = (postedTime) => {
    const timeElapsed = (Date.now() - postedTime) / 1000
    
    const time = [
      { name: 'years', number: 365*24*60*60 },
      { name: 'months', number: 30*24*60*60 },
      { name: 'weeks', number: 7*24*60*60 },
      { name: 'days', number: 24*60*60 },
      { name: 'hours', number: 60*60 },
      { name: 'minutes', number: 60 },
      { name: 'seconds', number: 1 }
    ]

    for (let t of time) {
      if (timeElapsed >= t.number) {
        const convertedTime = Math.floor(timeElapsed / t.number)
        if (convertedTime > 1) {
          return convertedTime + ' ' + t.name + ' ago'
        } else {
          return convertedTime + ' ' + t.name.slice(0, -1) + ' ago'
        }
      }
    }
  }

export default getTime