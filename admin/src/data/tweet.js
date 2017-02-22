/**
 * @param picture {String} url
 * @param message {String} text
 * @param handle {String} twitter handle
 * @param name {String} real name
 * @param likes {Number} number of likes
 * @param retweets {Number} number of retweets
 * @param timestamp {Number} unix timestamp in milliseconds
 * @param id {Number} identifier for tweet
 */
function Tweet(picture, message, handle, name, likes, retweets, timestamp, id) {
  this.picture = picture || ''
  this.message = message || ''
  this.handle = handle || ''
  this.name = name || ''
  this.likes = likes || 0
  this.retweets = retweets || 0
  this.timestamp = timestamp || new Date().getTime()
  this.id = id || -1

  this.toString = function() {
    return `${this.picture}\n@${this.handle} ${this.name}:\n\t${this.message}\n\t${this.likes}  ${this.retweets}\n\t${this.timestamp} - id = ${this.id}`
  }
}

module.exports = Tweet