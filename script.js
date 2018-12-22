var update_button = function () {
  var _panel = $(".file-process-framework");
  var _name = _panel.find('#bookmarklet_name').val();
  var _script = _panel.find('#bookmarklet_javascript').val();
  
  _script = parsing_script(_script);
  
  var _button = _panel.find('#bookmarklet_button');
  _button.find('span').text(_name);
  _button.attr('href', _script)
}

var parsing_script = function (_script) {
  /*
  // 刪除每一行的註解
  var _output = []
  var _lines = _script.split('\n')
  for (var _i = 0; _i < _lines.length; _i++) {
    var _line = _lines[_i]
    if ()
  }
  
  _script = _script.split('\n').join()
  */
  //_script = _script.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");
  _script = removeComments(_script);
  _script = _script.split('\n').join('')
  _script = 'javascript:' + _script
  
  return _script
}

/* 
    This function is loosely based on the one found here:
    http://www.weanswer.it/blog/optimize-css-javascript-remove-comments-php/
*/
function removeComments(str) {
    str = ('__' + str + '__').split('');
    var mode = {
        singleQuote: false,
        doubleQuote: false,
        regex: false,
        blockComment: false,
        lineComment: false,
        condComp: false 
    };
    for (var i = 0, l = str.length; i < l; i++) {
 
        if (mode.regex) {
            if (str[i] === '/' && str[i-1] !== '\\') {
                mode.regex = false;
            }
            continue;
        }
 
        if (mode.singleQuote) {
            if (str[i] === "'" && str[i-1] !== '\\') {
                mode.singleQuote = false;
            }
            continue;
        }
 
        if (mode.doubleQuote) {
            if (str[i] === '"' && str[i-1] !== '\\') {
                mode.doubleQuote = false;
            }
            continue;
        }
 
        if (mode.blockComment) {
            if (str[i] === '*' && str[i+1] === '/') {
                str[i+1] = '';
                mode.blockComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.lineComment) {
            if (str[i+1] === 'n' || str[i+1] === 'r') {
                mode.lineComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.condComp) {
            if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
                mode.condComp = false;
            }
            continue;
        }
 
        mode.doubleQuote = str[i] === '"';
        mode.singleQuote = str[i] === "'";
 
        if (str[i] === '/') {
 
            if (str[i+1] === '*' && str[i+2] === '@') {
                mode.condComp = true;
                continue;
            }
            if (str[i+1] === '*') {
                str[i] = '';
                mode.blockComment = true;
                continue;
            }
            if (str[i+1] === '/') {
                str[i] = '';
                mode.lineComment = true;
                continue;
            }
            mode.regex = true;
 
        }
 
    }
    return str.join('').slice(2, -2);
}

// -----------------------

$(function () {
    var _panel = $(".file-process-framework");
    _panel.find('input, textarea').change(update_button)
    update_button();
});