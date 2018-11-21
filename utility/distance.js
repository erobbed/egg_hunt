Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

export function withinRange(lat1, lon1, lat2, lon2, metersAway=3) {
  const distance = calculateDistance(lat1, lon1, lat2, lon2); // km

  if (distance <= metersAway/1000) {
    return true;
  }

  return false;
}
      