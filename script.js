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

template_load_javascript = function () {
  var _url = window.prompt("JavaScript URL")
  var _script = "var s=document.createElement('script');\n"
    + "s.setAttribute('src','" + _url + "');\n"
    + "document.getElementsByTagName('body')[0].appendChild(s)";
    
  var _panel = $(".file-process-framework");
  _panel.find('#bookmarklet_javascript').val(_script);
  return false;
}

// -----------------------

$(function () {
    var _panel = $(".file-process-framework");
    _panel.find('input, textarea').change(update_button)
    update_button();
    
    _panel.find(".template-load-javascript").click(template_load_javascript)
});