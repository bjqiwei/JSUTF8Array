const uint8ArrayToStr = function (array) {
  if (!array)
    return false;
  let result = "";
  for (let i = 0, j = array.length; i < j; i++) {
    let code = array[i];
    if (code >= 0 && code <= 0x7f) {
      code = (0x7f & code);
    } else if (code <= 0xdf) {
      code = ((0x1F & array[i]) << 6) | (0x3f & array[i + 1]);
      i += 1;
    } else if (code <= 0xef) {
      code = ((0x0f & array[i]) << 12) | ((0x3f & array[i + 1]) << 6) | (0x3f & array[i + 2]);
      i += 2;
    } else if(code <= 0xf7){
      code = ((0x07 & array[i]) << 18) | ((0x3f & array[i + 1]) << 12) | ((0x3f & array[i + 2]) << 6) | (0x3f & array[i + 3]);
      i += 3;
    } else if(code <= 0xfb){
      code = ((0x03 & array[i]) << 24) | ((0x3f & array[i + 1]) << 18) | ((0x3f & array[i + 2]) << 12) | ((0x3f & array[i + 3]) << 6) | (0x3f & array[i + 4]);
      i += 4;
    } else if(code <= 0xfd){
      code = ((0x01 & array[i]) << 30) | ((0x3f & array[i + 1]) << 24) | ((0x3f & array[i + 2]) << 18) | ((0x3f & array[i + 3]) << 12) | ((0x3f & array[i + 4]) << 6) | (0x3f & array[i + 5]);
      i += 5;
    }
    else {
      return false;
    }
    let char = String.fromCodePoint(code);
    result += char;
  }
  return result;
}

const strToUint8Array = function (str) {
  if (!str)
    return false;
  let result = [];
  for (let c of str) {
    let code = c.codePointAt();
    if (code <= 0x7f) {
      result.push(code);
    } else if (code <= 0x7ff) {
      result.push((0xC0 | (0x1F & (code >> 6))));
      result.push((0x80 | (0x3F & code)));
    } else if (code <= 0xffff) {
      result.push((0xE0 | (0x0F & (code >> 12))));
      result.push((0x80 | (0x3F & (code >> 6))));
      result.push((0x80 | (0x3F & code)));
    } else if (code <= 0x1fffff) {
      result.push((0xF0 | (0x07 & (code >> 18))));
      result.push((0x80 | (0x3F & (code >> 12))));
	  result.push((0x80 | (0x3F & (code >> 6))));
      result.push((0x80 | (0x3F & code)));
    } else if (code <= 0x3ffffff) {
      result.push((0xF8 | (0x03 & (code >> 24))));
	  result.push((0x80 | (0x3F & (code >> 18))));
      result.push((0x80 | (0x3F & (code >> 12))));
	  result.push((0x80 | (0x3F & (code >> 6))));
      result.push((0x80 | (0x3F & code)));
    } else if (code <= 0x7fffffff) {
      result.push((0xFC | (0x01 & (code >> 30))));
	  result.push((0x80 | (0x3F & (code >> 24))));
	  result.push((0x80 | (0x3F & (code >> 18))));
      result.push((0x80 | (0x3F & (code >> 12))));
	  result.push((0x80 | (0x3F & (code >> 6))));
      result.push((0x80 | (0x3F & code)));
    } else {
      return false;
    }
  }
  return Uint8Array.from(result);
}
