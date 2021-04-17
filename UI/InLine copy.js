import React from 'react'
import Script from 'react-inline-script'


const InLine = () => {
    const script = document.createElement('script');
  
    script.innerHTML = "var OO = { \
        foo: function(x) { alert(x.a); alert(x.b); }, \
        bar: function() {  window.x = 1; } \
    };";
    script.async = true;
  
    document.body.appendChild(script);
    document.body.removeChild(script);

    const script1 = document.createElement('script');

    const par = {"a" : "aaaaa", "b":"bbbbbbb"};
  
    const ss = JSON.stringify(par);
    script1.innerHTML = "var x = " + ss + " ; OO.foo(x)";
    script1.async = true;
  
    document.body.appendChild(script1);
    document.body.removeChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = "OO.bar();";
    script2.async = true;
  
    document.body.appendChild(script2);
    document.body.removeChild(script2);

    var res = window.x;
  
    return null;
  };

export default InLine;