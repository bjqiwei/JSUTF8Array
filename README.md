JavaScript String 和UTF8编码的Uint8Array互转

Unicode符号范围 | UTF-8编码方式

(十六进制) | （二进制）

--------------------+---------------------------------------------

0000 0000-0000 007F | 0xxxxxxx 

0000 0080-0000 07FF | 110xxxxx 10xxxxxx

0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx

0001 0000-001F FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

0020 0000-03FF FFFF | 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx

0400 0000-7FFF FFFF | 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx


示例
var str = "🐑😄𝕆";
var utf8_array = strToUint8Array(str);
var str2 = uint8ArrayToStr(utf8_array);