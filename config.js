module.exports = {

  ARDUINO_1 : {
    host: '192.168.3.42',
    port: 23,
    nickname: 'arduino1'
  },

  ARDUINO_2 : {
    host: '192.168.3.43',
    port: 23,
    nickname: 'arduino2'
  },

  ARDUINO_PIN: {
    STBY: 12,
    PWMA: 11,
    PWMB: 10,
    AIN1: 7,
    AIN2: 8,
    BIN1: 3,
    BIN2: 2
  }
  /*
    STBY 12 OUTPUT  LOW
    PWMA 11 PWM     255
    PWMB 10 PWM     255
    AIN2 8  OUTPUT  HIGH
    AIN1 7  OUTPUT  HIGH
    BIN1 3  OUTPUT
    BIN2 2  OUTPUT

    MAJU = {
      STBY HIGH
      AIN1 LOW
      AIN2 HIGH
      PWMA 255
      STBY HIGH
      BIN1 HIGH
      BIN2 LOW
      PWMB 255
    }

    MUNDUR {
      STBY HIGH
      AIN1 HIGH
      AIN2 LOW
      PWMA 255
      STBY HIGH
      BIN1 LOW
      BIN2 HIGH
      PWMB 255
    }

    KIRI {
      STBY HIGH
      AIN1 LOW
      AIN2 HIGH
      PWMA 255
      STBY HIGH
      BIN1 LOW
      BIN2 HIGH
      PWMB 255
    }

    KANAN {
      STBY HIGH
      AIN1 HIGH
      AIN2 LOW
      PWMA 255
      STBY HIGH
      BIN1 HIGH
      BIN2 LOW
      PWMB 255
    }

    STOP {
      STBY HIGH
      AIN1 LOW
      AIN2 LOW
      PWMA 255
      STBY HIGH
      BIN1 LOW
      BIN2 LOW
      PWMB 255
    }
  */


};
