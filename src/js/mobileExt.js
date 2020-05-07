export default function getIsMobile() {
  var match = window.matchMedia || window.msMatchMedia;
  if (match) {
    var mq = match('(pointer:coarse)');
    return mq.matches;
  }
  return false;
}
