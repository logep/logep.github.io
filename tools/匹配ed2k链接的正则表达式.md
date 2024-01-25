// 匹配ed2k链接的正则表达式
var regex = /ed2k:\/\/\|file\|[^]*?\|\//g;

var matches = text.match(regex);

// 输出匹配到的ed2k链接数组
console.log(matches);
