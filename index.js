module.exports = function (entry, asSettled) {
  const type = asSettled === true ? "allSettled" : "all"
  if (Array.isArray(entry)) return Promise[type](entry)

  let proms = []
  const keys = Object.keys(entry)
  for (let i = 0; i < keys.length; i++) proms.push(entry[keys[i]])
  return Promise[type](proms).then((results) => {
    let obj = {}
    for (let i = 0; i < keys.length; i++) obj[keys[i]] = results[i]
    return obj
  })
}
