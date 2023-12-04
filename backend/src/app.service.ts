import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello World!'
    }
  }
  sum(value1: number, value2: number) {
    return {
      sum: value1 + value2
    }
  }
  minus(value1: number, value2: number) {
    return {
      minus: value1 - value2
    }
  }
  multiply(value1: number, value2: number) {
    return {
      multiply: value1 * value2
    }
  }
  divides(value1: number, value2: number) {
    return {
      divides: value1 / value2
    }
  }
  per(value1: number, value2: number) {
    return {
      percentage: value1 * value2 / 100
    }
  }
  interest(price: number, month: number, rate: number) {
    return {
      interest: price * month * rate / 100
    }
  }
  string(text: string) {
      return{
        length: text.length
      }
  }
  stringComp(text1: string, text2: string) {
    var length1 = text1.length;
    var length2 = text2.length
    if (length1 > length2)
    return{
      answer : `text1 is greater than text2`
    }
    else{
      return{
        answer : `text2 is greater than text1 `
      }
    }
}
}