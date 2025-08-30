document.addEventListener("DOMContentLoaded", function(e) {
    var t = document.querySelectorAll(".jsFindStaff li");
    let a = window.location.origin;
    console.log(a);
    var n = document.querySelectorAll(".ex-page");
    let o = {},
        l = (0 < n.length && n.forEach(e => {
            var t = e.getAttribute("data-page"),
                e = e.innerHTML.trim();
            t && e && (o.page = t, o.page_id = e)
        }), t ? .forEach(function(n) {
            n.addEventListener("click", function(e) {
                var t = n.getAttribute("data-value");
                window.location.href = "" + a + t
            })
        }), "#434C6C"),
        c = "#B9E2F5",
        r = document.querySelector("#fromSlider"),
        i = document.querySelector("#toSlider"),
        u = document.querySelector("#fromSliderTooltip"),
        d = document.querySelector("#toSliderTooltip"),
        m = document.getElementById("scale");
    var n = parseInt(r ? .getAttribute("min")),
        t = parseInt(r ? .getAttribute("max")),
        s = parseInt(m ? .dataset.steps),
        v = (t, n) => {
            let a;
            return function(...e) {
                clearTimeout(a), a = setTimeout(() => {
                    t(...e)
                }, n)
            }
        };

    function h(e, t, n) {
        var a, o;
        e && ([a, o] = f(e, t), g(e, t, l, c, t), o < a && (e.value = o), y(e, n))
    }

    function p(e, t, n, a) {
        var o, r;
        e && ([o, r] = f(e, t), g(e, t, l, c, t), w(t), t.value = o <= r ? r : o, y(t, a))
    }

    function f(e, t) {
        return [parseInt(e.value, 10), parseInt(t.value, 10)]
    }

    function g(e, t, n, a, o) {
        var r = t.max - t.min,
            e = e.value - t.min,
            t = t.value - t.min;
        o.style.background = `linear-gradient(
            to right,
            ${n} 0%,
            ${n} ${e/r*100}%,
            ${a} ${e/r*100}%,
            ${a} ${t/r*100}%,
            ${n} ${t/r*100}%,
            ${n} 100%)`
    }

    function w(e) {
        var t = document.querySelector("#toSlider");
        Number(e.value) <= 0 ? t.style.zIndex = 2 : t.style.zIndex = 0
    }

    function y(e, t) {
        var n = e.value,
            n = (t.textContent = "£" + n, (n - e.min) / (e.max - e.min)),
            e = 100 * n;
        t.style.left = `calc(${e}% - ${(e-50)/50*20/2}px)`
    }
    var E = v(() => h(r, i, u, d), 100),
        S = v(() => p(r, i, u, d), 100);
    if (r && (r.oninput = E), i && (i.oninput = S), r && i) {
        g(r, i, l, c, i), w(i), y(r, u), y(i, d);
        var q = n,
            L = s,
            A = t - q,
            C = A / L;
        for (let e = 0; e <= C; e++) {
            var $ = q + e * L,
                x = ($ - q) / A * 100,
                I = document.createElement("div");
            I.style.left = x + "%", I.textContent = "£" + $, m.appendChild(I)
        }
    }
    document.querySelectorAll('input[name="nationality"], input[name="type"], input[name="services"], input[name="locations"]').forEach(a => {
        a.addEventListener("change", () => {
            var e, t = a.name,
                n = document.querySelectorAll(`input[name="${t}"]:checked`),
                n = Array.from(n).map(e => e.value).join("-");
            document.querySelector(".gallery-row") ? (e = new CustomEvent("filter-change", {
                detail: {
                    param: t,
                    value: n,
                    pageData: o
                }
            }), document.dispatchEvent(e)) : (e = new URL(window.location.href), n ? e.searchParams.set(t, n) : e.searchParams.delete(t), window.location.href = e.toString())
        })
    }), r && i && (E = v(() => {
        var e, t = r.value + "-" + i.value;
        document.querySelector(".gallery-row") ? (e = new CustomEvent("filter-change", {
            detail: {
                param: "price",
                value: t,
                pageData: o
            }
        }), document.dispatchEvent(e)) : ((e = new URL(window.location.href)).searchParams.set("price", t), window.location.href = e.toString())
    }, 500), r.addEventListener("change", E), i.addEventListener("change", E), r.addEventListener("mouseup", E), i.addEventListener("mouseup", E), r.addEventListener("touchend", E), i.addEventListener("touchend", E)), document.querySelectorAll('input[name="location"]').forEach(n => {
        n.addEventListener("change", () => {
            var e, t = n.value;
            console.log(t), document.querySelector(".gallery-row") ? (e = new CustomEvent("filter-change", {
                detail: {
                    param: "location",
                    value: t,
                    pageData: o
                }
            }), document.dispatchEvent(e)) : ((e = new URL(window.location.href)).searchParams.set("location", t), window.location.href = e.toString())
        })
    }), document.querySelectorAll('input[name="short"]').forEach(n => {
        n.addEventListener("change", () => {
            var e, t = n.value;
            document.querySelector(".gallery-row") ? (e = new CustomEvent("filter-change", {
                detail: {
                    param: "sort",
                    value: t,
                    pageData: o
                }
            }), document.dispatchEvent(e)) : ((e = new URL(window.location.href)).searchParams.set("sort", t), window.location.href = e.toString())
        })
    });
    document.querySelectorAll('select[name="sort"]').forEach(n => {
        n.addEventListener("change", () => {
            var e, t = n.value;
            document.querySelector(".gallery-row") ? (e = new CustomEvent("filter-change", {
                detail: {
                    param: "sort",
                    value: t,
                    pageData: o
                }
            }), document.dispatchEvent(e)) : ((e = new URL(window.location.href)).searchParams.set("sort", t), window.location.href = e.toString())
        })
    });
    S = document.querySelector(".clear-filter");
    console.log(S), S ? .addEventListener("click", e => {
        console.log("Clear filter button clicked"), e.preventDefault(), document.querySelector(".gallery-row") ? (document.querySelectorAll('input[type="checkbox"]').forEach(e => {
            e.checked = !1
        }), document.querySelectorAll('input[type="radio"]').forEach(e => {
            e.checked = !1
        }), document.querySelectorAll("select").forEach(e => {
            e.selectedIndex = 0
        }), r && i && (r.value = r.min, i.value = i.max, h(r, i, u, d), p(r, i, u, d)), e = new CustomEvent("filter-reset", {
            detail: {
                pageData: o
            }
        }), document.dispatchEvent(e)) : window.location.href = window.location.pathname
    })
});