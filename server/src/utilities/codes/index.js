import { CODES } from "./codes";

export default class Codes {
  static get(code) {
    return {
      status: [200, 201].includes(code),
      ...CODES[code],
    }
  }
}
