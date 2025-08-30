((A, e) => {
    var n = [],
        o = [],
        a = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(A, e) {
                var n = this;
                setTimeout(function() {
                    e(n[A])
                }, 0)
            },
            addTest: function(A, e, n) {
                o.push({
                    name: A,
                    fn: e,
                    options: n
                })
            },
            addAsyncTest: function(A) {
                o.push({
                    name: null,
                    fn: A
                })
            }
        },
        t = function() {},
        s = (t.prototype = a, t = new t, e.documentElement);

    function i(A, e) {
        return typeof A === e
    }
    var l, r, f, u, c, p, d, g, h, w = "svg" === s.nodeName.toLowerCase();

    function m(A) {
        var e, n = s.className,
            o = t._config.classPrefix || "";
        w && (n = n.baseVal), t._config.enableJSClass && (e = new RegExp("(^|\\s)" + o + "no-js(\\s|$)"), n = n.replace(e, "$1" + o + "js$2")), t._config.enableClasses && (n += " " + o + A.join(" " + o), w ? s.className.baseVal = n : s.className = n)
    }

    function v(A, e) {
        if ("object" == typeof A)
            for (var n in A) l(A, n) && v(n, A[n]);
        else {
            var o = (A = A.toLowerCase()).split("."),
                a = t[o[0]];
            if (void 0 !== (a = 2 == o.length ? a[o[1]] : a)) return t;
            e = "function" == typeof e ? e() : e, 1 == o.length ? t[o[0]] = e : (!t[o[0]] || t[o[0]] instanceof Boolean || (t[o[0]] = new Boolean(t[o[0]])), t[o[0]][o[1]] = e), m([(e && 0 != e ? "" : "no-") + o.join("-")]), t._trigger(A, e)
        }
        return t
    }
    for (h in l = void 0 !== (r = {}.hasOwnProperty) && void 0 !== r.call ? function(A, e) {
            return r.call(A, e)
        } : function(A, e) {
            return e in A && void 0 === A.constructor.prototype[e]
        }, a._l = {}, a.on = function(A, e) {
            this._l[A] || (this._l[A] = []), this._l[A].push(e), t.hasOwnProperty(A) && setTimeout(function() {
                t._trigger(A, t[A])
            }, 0)
        }, a._trigger = function(A, e) {
            var n;
            this._l[A] && (n = this._l[A], setTimeout(function() {
                for (var A = 0; A < n.length; A++)(0, n[A])(e)
            }, 0), delete this._l[A])
        }, t._q.push(function() {
            a.addTest = v
        }), t.addAsyncTest(function() {
            var n = [{
                    uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
                    name: "webp"
                }, {
                    uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
                    name: "webp.alpha"
                }, {
                    uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
                    name: "webp.animation"
                }, {
                    uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
                    name: "webp.lossless"
                }],
                A = n.shift();

            function o(n, A, o) {
                var a = new Image;

                function e(A) {
                    var e = !(!A || "load" !== A.type) && 1 == a.width;
                    v(n, "webp" === n && e ? new Boolean(e) : e), o && o(A)
                }
                a.onerror = e, a.onload = e, a.src = A
            }
            o(A.name, A.uri, function(A) {
                if (A && "load" === A.type)
                    for (var e = 0; e < n.length; e++) o(n[e].name, n[e].uri)
            })
        }), o)
        if (o.hasOwnProperty(h)) {
            if (f = [], (u = o[h]).name && (f.push(u.name.toLowerCase()), u.options) && u.options.aliases && u.options.aliases.length)
                for (c = 0; c < u.options.aliases.length; c++) f.push(u.options.aliases[c].toLowerCase());
            for (p = i(u.fn, "function") ? u.fn() : u.fn, d = 0; d < f.length; d++) 1 === (g = f[d].split(".")).length ? t[g[0]] = p : (!t[g[0]] || t[g[0]] instanceof Boolean || (t[g[0]] = new Boolean(t[g[0]])), t[g[0]][g[1]] = p), n.push((p ? "" : "no-") + g.join("-"))
        }
    m(n), delete a.addTest, delete a.addAsyncTest;
    for (var B = 0; B < t._q.length; B++) t._q[B]();
    A.Modernizr = t
})(window, document);