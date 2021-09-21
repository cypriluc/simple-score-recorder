class TimeFormat {
  // init
  constructor(duration) {
    this.miliseconds = Math.floor((duration % 1000) / 10);
    this.seconds = Math.floor((duration / 1000) % 60);
    this.minutes = Math.floor((duration / (1000 * 60)) % 60);
  }

  // methods
  getTime() {
    let formattedMs = this.miliseconds.toString().padStart(2, "0");
    let formattedS = this.seconds.toString().padStart(2, "0");
    let formattedMin = this.minutes.toString().padStart(2, "0");

    return formattedMin + ":" + formattedS + "." + formattedMs;
  }
}

export default TimeFormat;
