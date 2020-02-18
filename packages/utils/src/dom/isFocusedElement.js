export default ele => {
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    return ele && document.activeElement === ele
  } catch (e) {
    return false
  }
}
