module.exports = function getGeoDistance (lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  }

  var R = 6371 // km
  var dLat = (lat2 - lat1) * Math.PI / 180
  var dLon = (lon2 - lon1) * Math.PI / 180
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.asin(Math.sqrt(a))
  // debug('geo function value: ' + Math.round(R * c * 1000))
  return Math.round(R * c * 1000)
}
