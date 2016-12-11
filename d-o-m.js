(function(win, doc) {

    var replace = 'replace', DOM,

        a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;

    function cl(s) {
        return s.toLowerCase();
    }

    function cu(s) {
        return s.toUpperCase();
    }

    function str_has(str, s) {
        return str.indexOf(s) !== -1;
    }

    function count(x) {
        return x.length;
    }

    function is_set(x) {
        return typeof x !== "undefined";
    }

    function is_string(x) {
        return typeof x === "string";
    }

    function is_number(x) {
        return typeof x === "number";
    }

    function is_function(x) {
        return typeof x === "function";
    }

    function is_object(x) {
        return typeof x === "object";
    }

    function is_array(x) {
        return x instanceof Array;
    }

    function is_boolean(x) {
        return typeof x === "boolean";
    }

    function is_pattern(x) {
        return x instanceof RegExp ? (x.source || true) : false;
    }

    function is_dom(x) {
        return x instanceof HTMLElement;
    }

    function edge(a, b, c) {
        if (is_set(b) && a < b) return b;
        if (is_set(c) && a > c) return c;
        return a;
    }

    function pattern(a, b) {
        return new RegExp(a, b);
    }

    function trim(s, x) {
        if (x === 0) {
            return s[replace](/^[\s\uFEFF\xA0]+/, ""); // trim left
        } else if (x === 1) {
            return s[replace](/[\s\uFEFF\xA0]+$/, ""); // trim right
        }
        return s[replace](/^[\s\uFEFF\xA0]*|[\s\uFEFF\xA0]*$/g, "") // trim left and right
    }

    function str_split(s) {
        return is_string(s) ? trim(s).split(/\s+/) : s;
    }

    function str_join(s) {
        return is_object(s) ? s.join(' ') : s;
    }

    function num(x, i) {
        return parseInt(x, is_set(i) ? i : 10);
    }

    function camelize(s) {
        return s[replace](/\-([a-z])/g, function(a, b) {
            return cu(b);
        });
    }

    function dasherize(s) {
        return s[replace](/([A-Z])/g, function(a, b) {
            return '-' + cl(b);
        });
    }

    function css(a, b, c) {
        var o = win.getComputedStyle(a, (c = c || null)),
            h = {}, i, j, k, l;
        if (is_object(b)) {
            if (is_array(b)) {
                o = [];
                for (i in b) {
                    if (j = b[i]) {
                        l = css(a, j, c);
                        o[i] = l;
                    }
                }
                return o;
            }
            for (i in b) {
                j = b[i];
                a.style[camelize(i[replace](/^\0/, ""))] = j === 0 ? 0 : (j ? (is_string(j) ? j : j + 'px') : "");
            }
            return a;
        } else if (b) {
            if (b[0] === '\0') {
                b = b.slice(1);
                k = 1;
            }
            i = o[camelize(b)];
            j = k ? i : num(i);
            return j === 0 ? 0 : (j || i);
        }
        return (function() {
            for (i in o) {
                j = o.getPropertyValue(i);
                if (!j) continue;
                k = num(j);
                h[dasherize(i)] = k === 0 ? 0 : (k || j || "");
            }
            return h;
        })();
    }

    function extend(a, b) {
        b = b || {};
        for (i in b) {
            if (is_object(a[i]) && is_object(b[i]) && !is_dom(a[i]) && !is_dom(b[i])) {
                a[i] = extend(a[i], b[i]);
            } else {
                a[i] = b[i];
            }
        }
        return a;
    }

    function each(a, fn) {
        var i, j, k;
        if (is_array(a)) {
            for (i = 0, j = count(a); i < j; ++i) {
                k = fn(a[i], i, a);
                if (k === true) {
                    continue;
                } else if (k === false) {
                    break;
                }
            }
        } else {
            for (i in a) {
                k = fn(a[i], i, a);
                if (k === true) {
                    continue;
                } else if (k === false) {
                    break;
                }
            }
        }
        return a;
    }

    function timer_set(fn, i) {
        return setTimeout(fn, i || 0);
    }

    function timer_reset(timer_set_fn) {
        return clearTimeout(timer_set_fn);
    }

    function closest(a, b) {
        while ((a = dom_parent(a)) && a !== b);
        return a;
    }

    function el(em, node, attr) {
        em = trim(em || 'div');
        em = is_string(em) ? (em[0] === '<' ? (f = doc.createDocumentFragment(), f.innerHTML = em, f.firstChild) : doc.createElement(em)) : em;
        if (is_object(attr)) {
            for (i in attr) {
                v = attr[i];
                if (i === 'classes') {
                    class_set(em, v);
                } else if (i === 'data') {
                    for (j in v) {
                        v = v[j];
                        if (v === null) {
                            data_reset(em, j);
                        } else {
                            data_set(em, j, v);
                        }
                    }
                } else if (i === 'css') {
                    if (is_string(v)) {
                        attr_set(em, 'style', v);
                    } else if (v === null) {
                        attr_reset(em, 'style');
                    } else {
                        _css(em, v);
                    }
                } else {
                    if (is_function(v)) {
                        em[i] = v;
                    } else {
                        if (v === null) {
                            attr_reset(em, i);
                        } else {
                            attr_set(em, i, is_array(v) ? v.join(' ') : "" + v);
                        }
                    }
                }
            }
        }
        if (is_dom(node)) {
            dom_set(em, node);
        } else if (is_object(node)) {
            for (i in node) {
                v = node[i];
                if (is_dom(v)) {
                    dom_set(em, v);
                } else {
                    if (v !== false) content_set(em, v);
                }
            }
        } else {
            if (is_set(node) && node !== false) content_set(em, node);
        }
        return em;
    }

    function el_refresh(node) {
        return dom_replace(node, dom_copy(node, true));
    }

    function attr_set(node, a, b) {
        if (is_object(a)) {
            for (i in a) {
                attr_set(node, i, a[i]);
            }
        } else {
            node[(b === null ? 'remove' : 'set') + 'Attribute'](a, b);
        }
    }

    function attr_get(node, a, b) {
        if (is_string(a)) {
            return attr_get(node, [a], [is_set(b) ? b : ""])[0];
        }
        o = [];
        for (i in a) {
            i = a[i];
            if (i = node.getAttribute(i)) {
                o.push(i);
            }
        }
        return count(o) ? o : (is_set(b) ? b : []);
    }

    function attr_reset(node, a) {
        if (is_object(a)) {
            for (i in a) {
                attr_reset(node, a[i]);
            }
        } else {
            if (!is_set(a)) {
                attr_reset(node, 'class'); // :(
                for (i = 0, j = node.attributes, k = count(j); i < k; ++i) {
                    if (j[i]) attr_reset(node, j[i].name);
                }
            } else {
                node.removeAttribute(a);
            }
        }
    }

    function data_set(node, a, b) {
        if (is_object(a)) {
            for (i in a) {
                data_set(node, i, a[i]);
            }
        } else {
            attr_set(node, 'data-' + a, b);
        }
    }

    function data_get(node, a, b) {
        if (is_string(a)) {
            return data_get(node, [a], [is_set(b) ? b : ""])[0];
        }
        o = [];
        for (i in a) {
            i = a[i];
            if (i = attr_get(node, 'data-' + i)) {
                o.push(i);
            }
        }
        return count(o) ? o : (is_set(b) ? b : []);
    }

    function data_reset(node, a) {
        if (is_object(a)) {
            for (i in a) {
                attr_reset(node, 'data-' + a[i]);
            }
        } else {
            if (!is_set(a)) {
                for (i = 0, j = node.attributes, k = count(j); i < k; ++i) {
                    if (j[i] && j[i].name.slice(0, 5) === 'data-') {
                        attr_reset(node, j[i].name);
                    }
                }
            } else {
                attr_reset(node, 'data-' + a);
            }
        }
    }

    function class_set(node, s) {
        s = str_split(s);
        for (i in s) {
            node.classList.add(s[i]);
        }
    }

    function class_get(node, s, b) {
        if (is_string(s)) {
            return class_get(node, [s], [is_set(b) ? b : ""])[0];
        }
        o = [];
        for (i in s) {
            i = s[i];
            if (node.classList.contains(i)) {
                o.push(i);
            }
        }
        return count(o) ? o : (is_set(b) ? b : false);
    }

    function class_reset(node, s) {
        if (!is_set(s)) {
            attr_reset(node, 'class');
        } else {
            s = str_split(s);
            for (i in s) {
                node.classList.remove(s[i]);
            }
        }
    }

    function class_toggle(node, s) {
        s = str_split(s);
        for (i in s) {
            node.classList.toggle(s[i]);
        }
    }

    function event_exit(e) {
        if (e) e.preventDefault();
        return false;
    }

    function event_set(id, node, fn) {
        if (!node) return;
        id = str_split(id);
        for (i = 0, j = count(id); i < j; ++i) {
            node.addEventListener(id[i], fn, false);
        }
    }

    function event_reset(id, node, fn) {
        if (!node) return;
        id = str_split(id);
        for (i = 0, j = count(id); i < j; ++i) {
            if (!fn) {
                el_refresh(node);
            } else {
                node.removeEventListener(id[i], fn, false);
            }
        }
    }

    function event_fire(id, node, data) {
        id = str_split(id);
        var has_event = 'createEvent' in doc, e;
        for (i = 0, j = count(id); i < j; ++i) {
            if (has_event) {
                e = doc.createEvent('HTMLEvents');
                e.data = data;
                e.initEvent(id[i], true, false);
                node.dispatchEvent(e);
            }
        }
    }

    function content_set(node, s) {
        node.innerHTML = s;
    }

    function content_get(node, s) {
        return node.innerHTML || (is_set(s) ? s : "");
    }

    function content_reset(node, deep) {
        if ((!is_set(deep) || deep) && (c = dom_children(node))) {
            for (i = 0, j = count(c); i < j; ++i) {
                content_reset(c[i]);
            }
        }
        content_set(node, "");
    }

    function dom_parent(node) {
        return node && node.parentNode;
    }

    function dom_children(node) {
        return node && node.children || [];
    }

    function dom_closest(node, s) {
        if (!is_set(s)) {
            return dom_parent(node);
        }
        return is_string(s) ? node.closest(s) : closest(node, s);
    }

    function dom_next(node) {
        return node && (node.nextElementSibling || node.nextSibling);
    }

    function dom_previous(node) {
        return node && (node.previousElementSibling || node.previousSibling);
    }

    function dom_index(node) {
        i = 0;
        while (node = dom_previous(node)) ++i;
        return i;
    }

    function dom_is(node, s) {
        if (node && is_string(s)) {
            return node.nodeName.toLowerCase() === s.toLowerCase();
        } else if (node && is_function(s)) {
            return node === s(node);
        }
        return node === s;
    }

    function dom_copy(node, deep) {
        return node.cloneNode(!is_set(deep) ? true : !!deep);
    }

    function dom_replace(node, s) {
        dom_parent(node).replaceChild(s, node);
        return s;
    }

    (function($, $$) {

        $.version = '1.0.0';

        $.extend = extend;
        $.trim = trim;

        $.is = {
            a: is_array,
            b: is_boolean,
            e: is_dom,
            f: is_function,
            i: is_number,
            n: function(x) {
                return x === null;
            },
            o: is_object,
            r: is_pattern,
            s: is_string,
            x: function(x) {
                return !is_set(x);
            }
        };
    
        // current script path
        s = doc.currentScript;
        $.path = ((s && s.src) || win.location.href).split('/').slice(0, -1).join('/');

    })(win.$$ = win.DOM = function(target, parent) {

        return new DOM(target, parent);

    }, DOM = function(target, parent) {

        var $ = this;

        parent = parent || doc;
        if (is_string(target) && count(target)) {
            target = trim(target);
            if (target[0] === '<' && /^<.*?>$/.test(target)) {
                target = el(target);
            } else if (/^[#.]?(?:\\.|[\w-]|[^\x00-\xa0])+$/.test(target)) {
                if (target[0] === '#' && (e = parent.getElementById(target.slice(1)))) {
                    target = [e];
                } else if ((target[0] === '.' && count(e = parent.getElementsByClassName(target.slice(1)))) || count(e = parent.getElementsByTagName(target))) {
                    target = e;
                } else {
                    target = [];
                }
            } else {
                target = parent.querySelectorAll(target) || [];
            }
        } else if (is_dom(target)) {
            target = [target];
        }

        o = [];
        for (i = 0, j = count(target); i < j; ++i) {
            o.push(target[i]);
        }

        target = o;

        target.each = function(fn) {
            return each(target, fn);
        };
  
        target.is = function(s) {
            a = new DOM(s, dom_parent(this[0]));
            b = count(a);
            while (--b >= 0 && a[b] !== this[0]) {}
            return b > -1;
        };
  
        target.filter = function(x) {
            o = [];
            for (i = 0, j = count(this); i < j; ++i) {
                v = new DOM(this[i]);
                if ((is_string(x) && v.is(x)) || (is_function(x) && x.call(v[0]))) {
                    o.push(v[0]);
                }
            }
            return new DOM(o);
        };

        target.html = function(s) {
            if (!is_set(s)) {
                return content_get(target[0]);
            }
            return target.each(function(v) {
                content_set(v, s);
            });
        };

        target.text = function(s) {
            if (!is_set(s)) {
                return target[0].textContent;
            }
            return target.each(function(v) {
                v.textContent = s;
            });
        };
  
        target.attributes = {
            set: function(a, b) {
                return target.each(function(v) {
                    attr_set(v, a, b);
                });
            },
            reset: function(a) {
                return target.each(function(v) {
                    attr_reset(v, a);
                });
            },
            get: function(a) {
                return attr_get(target[0], a);
            }
        };
    
        target.data = {
            set: function(a, b) {
                return target.each(function(v) {
                    data_set(v, a, b);
                });
            },
            reset: function(a) {
                return target.each(function(v) {
                    data_reset(v, a);
                });
            },
            get: function(a) {
                return data_get(target[0], a);
            }
        };
    
        target.classes = {
            set: function(a, b) {
                return target.each(function(v) {
                    class_set(v, a, b);
                });
            },
            reset: function(a) {
                return target.each(function(v) {
                    class_reset(v, a);
                });
            },
            get: function(a) {
                return class_get(target[0], a);
            }
        };

        target.css = function(a, b) {
            if (!is_set(a)) {
                return css(target[0], a);
            }
            if (is_set(b)) {
                o = {};
                o[a] = b;
            } else {
                o = a;
            }
            if (is_string(o)) {
                return css(target[0], o);
            }
            return target.each(function(v) {
                css(v, o);
            });
        };

        target.event = {
            set: function(event, fn) {
                return target.each(function(v) {
                    event_set(event, v, fn);
                });
            },
            reset: function(event, fn) {
                return target.each(function(v) {
                    event_reset(event, v, fn);
                });
            },
            fire: function(event, data) {
                return target.each(function(v) {
                    event_fire(event, v, data);
                });
            },
            x: event_exit
        };

        target.index = function() {
            return dom_index(target[0]);
        };

        target.parent = function() {
            return new DOM([dom_parent(target[0])]);
        };

        target.children = function() {
            return new DOM(dom_children(target[0]));
        };

        target.closest = function(s) {
            return new DOM([dom_closest(target[0], s)]);
        };

        target.next = function() {
            return new DOM([dom_next(target[0])]);
        };

        target.previous = function() {
            return new DOM([dom_previous(target)]);
        };

        return target;

    });

})(window, document);