/*
 Highmaps JS v10.2.1 (2022-08-29)

 (c) 2011-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (W, I) {
  "object" === typeof module && module.exports
    ? ((I["default"] = I), (module.exports = W.document ? I(W) : I))
    : "function" === typeof define && define.amd
    ? define("highcharts/highmaps", function () {
        return I(W);
      })
    : (W.Highcharts && W.Highcharts.error(16, !0), (W.Highcharts = I(W)));
})("undefined" !== typeof window ? window : this, function (W) {
  function I(b, K, e, B) {
    b.hasOwnProperty(K) ||
      ((b[K] = B.apply(null, e)),
      "function" === typeof CustomEvent &&
        W.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: K, module: b[K] },
          })
        ));
  }
  var e = {};
  I(e, "Core/Globals.js", [], function () {
    var b;
    (function (b) {
      b.SVG_NS = "http://www.w3.org/2000/svg";
      b.product = "Highcharts";
      b.version = "10.2.1";
      b.win = "undefined" !== typeof W ? W : {};
      b.doc = b.win.document;
      b.svg =
        b.doc &&
        b.doc.createElementNS &&
        !!b.doc.createElementNS(b.SVG_NS, "svg").createSVGRect;
      b.userAgent = (b.win.navigator && b.win.navigator.userAgent) || "";
      b.isChrome = -1 !== b.userAgent.indexOf("Chrome");
      b.isFirefox = -1 !== b.userAgent.indexOf("Firefox");
      b.isMS = /(edge|msie|trident)/i.test(b.userAgent) && !b.win.opera;
      b.isSafari = !b.isChrome && -1 !== b.userAgent.indexOf("Safari");
      b.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(b.userAgent);
      b.isWebKit = -1 !== b.userAgent.indexOf("AppleWebKit");
      b.deg2rad = (2 * Math.PI) / 360;
      b.hasBidiBug =
        b.isFirefox && 4 > parseInt(b.userAgent.split("Firefox/")[1], 10);
      b.hasTouch = !!b.win.TouchEvent;
      b.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      b.noop = function () {};
      b.supportsPassiveEvents = (function () {
        var e = !1;
        if (!b.isMS) {
          var K = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0;
            },
          });
          b.win.addEventListener &&
            b.win.removeEventListener &&
            (b.win.addEventListener("testPassive", b.noop, K),
            b.win.removeEventListener("testPassive", b.noop, K));
        }
        return e;
      })();
      b.charts = [];
      b.dateFormats = {};
      b.seriesTypes = {};
      b.symbolSizes = {};
      b.chartCount = 0;
    })(b || (b = {}));
    ("");
    return b;
  });
  I(e, "Core/Utilities.js", [e["Core/Globals.js"]], function (b) {
    function e(c, q, k, H) {
      var a = q ? "Highcharts error" : "Highcharts warning";
      32 === c && (c = "" + a + ": Deprecated member");
      var l = p(c),
        E = l
          ? "" + a + " #" + c + ": www.highcharts.com/errors/" + c + "/"
          : c.toString();
      if ("undefined" !== typeof H) {
        var d = "";
        l && (E += "?");
        x(H, function (c, q) {
          d += "\n - ".concat(q, ": ").concat(c);
          l && (E += encodeURI(q) + "=" + encodeURI(c));
        });
        E += d;
      }
      u(
        b,
        "displayError",
        { chart: k, code: c, message: E, params: H },
        function () {
          if (q) throw Error(E);
          f.console && -1 === e.messages.indexOf(E) && console.warn(E);
        }
      );
      e.messages.push(E);
    }
    function y(c, q) {
      var f = {};
      x(c, function (k, a) {
        if (F(c[a], !0) && !c.nodeType && q[a])
          (k = y(c[a], q[a])), Object.keys(k).length && (f[a] = k);
        else if (F(c[a]) || c[a] !== q[a] || (a in c && !(a in q))) f[a] = c[a];
      });
      return f;
    }
    function B(c, q) {
      return parseInt(c, q || 10);
    }
    function v(c) {
      return "string" === typeof c;
    }
    function t(c) {
      c = Object.prototype.toString.call(c);
      return "[object Array]" === c || "[object Array Iterator]" === c;
    }
    function F(c, q) {
      return !!c && "object" === typeof c && (!q || !t(c));
    }
    function z(c) {
      return F(c) && "number" === typeof c.nodeType;
    }
    function r(c) {
      var q = c && c.constructor;
      return !(!F(c, !0) || z(c) || !q || !q.name || "Object" === q.name);
    }
    function p(c) {
      return (
        "number" === typeof c && !isNaN(c) && Infinity > c && -Infinity < c
      );
    }
    function h(c) {
      return "undefined" !== typeof c && null !== c;
    }
    function a(c, q, f) {
      var k = v(q) && !h(f),
        a,
        l = function (q, f) {
          h(q)
            ? c.setAttribute(f, q)
            : k
            ? (a = c.getAttribute(f)) ||
              "class" !== f ||
              (a = c.getAttribute(f + "Name"))
            : c.removeAttribute(f);
        };
      v(q) ? l(f, q) : x(q, l);
      return a;
    }
    function d(c, q) {
      var f;
      c || (c = {});
      for (f in q) c[f] = q[f];
      return c;
    }
    function g() {
      for (var c = arguments, q = c.length, f = 0; f < q; f++) {
        var k = c[f];
        if ("undefined" !== typeof k && null !== k) return k;
      }
    }
    function m(c, q) {
      b.isMS &&
        !b.svg &&
        q &&
        h(q.opacity) &&
        (q.filter = "alpha(opacity=".concat(100 * q.opacity, ")"));
      d(c.style, q);
    }
    function n(c) {
      return Math.pow(10, Math.floor(Math.log(c) / Math.LN10));
    }
    function G(c, q) {
      return 1e14 < c ? c : parseFloat(c.toPrecision(q || 14));
    }
    function J(c, q, k) {
      var H = b.getStyle || J;
      if ("width" === q)
        return (
          (q = Math.min(c.offsetWidth, c.scrollWidth)),
          (k = c.getBoundingClientRect && c.getBoundingClientRect().width),
          k < q && k >= q - 1 && (q = Math.floor(k)),
          Math.max(
            0,
            q -
              (H(c, "padding-left", !0) || 0) -
              (H(c, "padding-right", !0) || 0)
          )
        );
      if ("height" === q)
        return Math.max(
          0,
          Math.min(c.offsetHeight, c.scrollHeight) -
            (H(c, "padding-top", !0) || 0) -
            (H(c, "padding-bottom", !0) || 0)
        );
      f.getComputedStyle || e(27, !0);
      if ((c = f.getComputedStyle(c, void 0))) {
        var a = c.getPropertyValue(q);
        g(k, "opacity" !== q) && (a = B(a));
      }
      return a;
    }
    function x(c, q, f) {
      for (var k in c)
        Object.hasOwnProperty.call(c, k) && q.call(f || c[k], c[k], k, c);
    }
    function C(c, q, f) {
      function k(q, f) {
        var k = c.removeEventListener || b.removeEventListenerPolyfill;
        k && k.call(c, q, f, !1);
      }
      function a(f) {
        var H;
        if (c.nodeName) {
          if (q) {
            var a = {};
            a[q] = !0;
          } else a = f;
          x(a, function (c, q) {
            if (f[q]) for (H = f[q].length; H--; ) k(q, f[q][H].fn);
          });
        }
      }
      var l = ("function" === typeof c && c.prototype) || c;
      if (Object.hasOwnProperty.call(l, "hcEvents")) {
        var E = l.hcEvents;
        q
          ? ((l = E[q] || []),
            f
              ? ((E[q] = l.filter(function (c) {
                  return f !== c.fn;
                })),
                k(q, f))
              : (a(E), (E[q] = [])))
          : (a(E), delete l.hcEvents);
      }
    }
    function u(c, q, f, k) {
      f = f || {};
      if (A.createEvent && (c.dispatchEvent || (c.fireEvent && c !== b))) {
        var H = A.createEvent("Events");
        H.initEvent(q, !0, !0);
        f = d(H, f);
        c.dispatchEvent ? c.dispatchEvent(f) : c.fireEvent(q, f);
      } else if (c.hcEvents) {
        f.target ||
          d(f, {
            preventDefault: function () {
              f.defaultPrevented = !0;
            },
            target: c,
            type: q,
          });
        H = [];
        for (var a = c, l = !1; a.hcEvents; )
          Object.hasOwnProperty.call(a, "hcEvents") &&
            a.hcEvents[q] &&
            (H.length && (l = !0), H.unshift.apply(H, a.hcEvents[q])),
            (a = Object.getPrototypeOf(a));
        l &&
          H.sort(function (c, f) {
            return c.order - f.order;
          });
        H.forEach(function (q) {
          !1 === q.fn.call(c, f) && f.preventDefault();
        });
      }
      k && !f.defaultPrevented && k.call(c, f);
    }
    var l = b.charts,
      A = b.doc,
      f = b.win;
    (e || (e = {})).messages = [];
    Math.easeInOutSine = function (c) {
      return -0.5 * (Math.cos(Math.PI * c) - 1);
    };
    var w = Array.prototype.find
      ? function (c, f) {
          return c.find(f);
        }
      : function (c, f) {
          var q,
            k = c.length;
          for (q = 0; q < k; q++) if (f(c[q], q)) return c[q];
        };
    x(
      {
        map: "map",
        each: "forEach",
        grep: "filter",
        reduce: "reduce",
        some: "some",
      },
      function (c, f) {
        b[f] = function (q) {
          var k;
          e(
            32,
            !1,
            void 0,
            ((k = {}), (k["Highcharts.".concat(f)] = "use Array.".concat(c)), k)
          );
          return Array.prototype[c].apply(q, [].slice.call(arguments, 1));
        };
      }
    );
    var k,
      D = (function () {
        var c = Math.random().toString(36).substring(2, 9) + "-",
          f = 0;
        return function () {
          return "highcharts-" + (k ? "" : c) + f++;
        };
      })();
    f.jQuery &&
      (f.jQuery.fn.highcharts = function () {
        var c = [].slice.call(arguments);
        if (this[0])
          return c[0]
            ? (new b[v(c[0]) ? c.shift() : "Chart"](this[0], c[0], c[1]), this)
            : l[a(this[0], "data-highcharts-chart")];
      });
    w = {
      addEvent: function (c, f, k, H) {
        void 0 === H && (H = {});
        var q = ("function" === typeof c && c.prototype) || c;
        Object.hasOwnProperty.call(q, "hcEvents") || (q.hcEvents = {});
        q = q.hcEvents;
        b.Point &&
          c instanceof b.Point &&
          c.series &&
          c.series.chart &&
          (c.series.chart.runTrackerClick = !0);
        var a = c.addEventListener || b.addEventListenerPolyfill;
        a &&
          a.call(
            c,
            f,
            k,
            b.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === H.passive
                      ? -1 !== f.indexOf("touch")
                      : H.passive,
                  capture: !1,
                }
              : !1
          );
        q[f] || (q[f] = []);
        q[f].push({
          fn: k,
          order: "number" === typeof H.order ? H.order : Infinity,
        });
        q[f].sort(function (c, f) {
          return c.order - f.order;
        });
        return function () {
          C(c, f, k);
        };
      },
      arrayMax: function (c) {
        for (var f = c.length, k = c[0]; f--; ) c[f] > k && (k = c[f]);
        return k;
      },
      arrayMin: function (c) {
        for (var f = c.length, k = c[0]; f--; ) c[f] < k && (k = c[f]);
        return k;
      },
      attr: a,
      clamp: function (c, f, k) {
        return c > f ? (c < k ? c : k) : f;
      },
      cleanRecursively: y,
      clearTimeout: function (c) {
        h(c) && clearTimeout(c);
      },
      correctFloat: G,
      createElement: function (c, f, k, H, a) {
        c = A.createElement(c);
        f && d(c, f);
        a && m(c, { padding: "0", border: "none", margin: "0" });
        k && m(c, k);
        H && H.appendChild(c);
        return c;
      },
      css: m,
      defined: h,
      destroyObjectProperties: function (c, f) {
        x(c, function (k, q) {
          k && k !== f && k.destroy && k.destroy();
          delete c[q];
        });
      },
      discardElement: function (c) {
        c && c.parentElement && c.parentElement.removeChild(c);
      },
      erase: function (c, f) {
        for (var k = c.length; k--; )
          if (c[k] === f) {
            c.splice(k, 1);
            break;
          }
      },
      error: e,
      extend: d,
      extendClass: function (c, f) {
        var k = function () {};
        k.prototype = new c();
        d(k.prototype, f);
        return k;
      },
      find: w,
      fireEvent: u,
      getMagnitude: n,
      getNestedProperty: function (c, k) {
        for (c = c.split("."); c.length && h(k); ) {
          var q = c.shift();
          if ("undefined" === typeof q || "__proto__" === q) return;
          k = k[q];
          if (
            !h(k) ||
            "function" === typeof k ||
            "number" === typeof k.nodeType ||
            k === f
          )
            return;
        }
        return k;
      },
      getStyle: J,
      inArray: function (c, f, k) {
        e(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
        return f.indexOf(c, k);
      },
      isArray: t,
      isClass: r,
      isDOMElement: z,
      isFunction: function (c) {
        return "function" === typeof c;
      },
      isNumber: p,
      isObject: F,
      isString: v,
      keys: function (c) {
        e(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
        return Object.keys(c);
      },
      merge: function () {
        var c,
          f = arguments,
          k = {},
          H = function (c, f) {
            "object" !== typeof c && (c = {});
            x(f, function (k, q) {
              "__proto__" !== q &&
                "constructor" !== q &&
                (!F(k, !0) || r(k) || z(k)
                  ? (c[q] = f[q])
                  : (c[q] = H(c[q] || {}, k)));
            });
            return c;
          };
        !0 === f[0] && ((k = f[1]), (f = Array.prototype.slice.call(f, 2)));
        var a = f.length;
        for (c = 0; c < a; c++) k = H(k, f[c]);
        return k;
      },
      normalizeTickInterval: function (c, f, k, H, a) {
        var q = c;
        k = g(k, n(c));
        var l = c / k;
        f ||
          ((f = a
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === H &&
            (1 === k
              ? (f = f.filter(function (c) {
                  return 0 === c % 1;
                }))
              : 0.1 >= k && (f = [1 / k])));
        for (
          H = 0;
          H < f.length &&
          !((q = f[H]),
          (a && q * k >= c) || (!a && l <= (f[H] + (f[H + 1] || f[H])) / 2));
          H++
        );
        return (q = G(q * k, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: x,
      offset: function (c) {
        var k = A.documentElement;
        c =
          c.parentElement || c.parentNode
            ? c.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: c.top + (f.pageYOffset || k.scrollTop) - (k.clientTop || 0),
          left: c.left + (f.pageXOffset || k.scrollLeft) - (k.clientLeft || 0),
          width: c.width,
          height: c.height,
        };
      },
      pad: function (c, f, k) {
        return (
          Array((f || 2) + 1 - String(c).replace("-", "").length).join(
            k || "0"
          ) + c
        );
      },
      pick: g,
      pInt: B,
      relativeLength: function (c, f, k) {
        return /%$/.test(c)
          ? (f * parseFloat(c)) / 100 + (k || 0)
          : parseFloat(c);
      },
      removeEvent: C,
      splat: function (c) {
        return t(c) ? c : [c];
      },
      stableSort: function (c, f) {
        var k = c.length,
          q,
          a;
        for (a = 0; a < k; a++) c[a].safeI = a;
        c.sort(function (c, k) {
          q = f(c, k);
          return 0 === q ? c.safeI - k.safeI : q;
        });
        for (a = 0; a < k; a++) delete c[a].safeI;
      },
      syncTimeout: function (c, f, k) {
        if (0 < f) return setTimeout(c, f, k);
        c.call(0, k);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: D,
      useSerialIds: function (c) {
        return (k = g(c, k));
      },
      wrap: function (c, f, k) {
        var q = c[f];
        c[f] = function () {
          var c = Array.prototype.slice.call(arguments),
            f = arguments,
            a = this;
          a.proceed = function () {
            q.apply(a, arguments.length ? arguments : f);
          };
          c.unshift(q);
          c = k.apply(this, c);
          a.proceed = null;
          return c;
        };
      },
    };
    ("");
    return w;
  });
  I(e, "Core/Chart/ChartDefaults.js", [], function () {
    return {
      alignThresholds: !1,
      panning: { enabled: !1, type: "x" },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      allowMutatingData: !0,
      defaultSeriesType: "line",
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: "right", x: -10, y: 10 },
      },
      zoomBySingleTouch: !1,
      zooming: {
        singleTouch: !1,
        resetButton: {
          theme: { zIndex: 6 },
          position: { align: "right", x: -10, y: 10 },
        },
      },
      width: null,
      height: null,
      borderColor: "#335cad",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc",
    };
  });
  I(
    e,
    "Core/Color/Color.js",
    [e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var K = e.isNumber,
        B = e.merge,
        v = e.pInt;
      e = (function () {
        function e(F) {
          this.rgba = [NaN, NaN, NaN, NaN];
          this.input = F;
          var z = b.Color;
          if (z && z !== e) return new z(F);
          if (!(this instanceof e)) return new e(F);
          this.init(F);
        }
        e.parse = function (b) {
          return b ? new e(b) : e.None;
        };
        e.prototype.init = function (b) {
          var z;
          if ("object" === typeof b && "undefined" !== typeof b.stops)
            this.stops = b.stops.map(function (a) {
              return new e(a[1]);
            });
          else if ("string" === typeof b) {
            this.input = b = e.names[b.toLowerCase()] || b;
            if ("#" === b.charAt(0)) {
              var r = b.length;
              var p = parseInt(b.substr(1), 16);
              7 === r
                ? (z = [(p & 16711680) >> 16, (p & 65280) >> 8, p & 255, 1])
                : 4 === r &&
                  (z = [
                    ((p & 3840) >> 4) | ((p & 3840) >> 8),
                    ((p & 240) >> 4) | (p & 240),
                    ((p & 15) << 4) | (p & 15),
                    1,
                  ]);
            }
            if (!z)
              for (p = e.parsers.length; p-- && !z; ) {
                var h = e.parsers[p];
                (r = h.regex.exec(b)) && (z = h.parse(r));
              }
          }
          z && (this.rgba = z);
        };
        e.prototype.get = function (b) {
          var z = this.input,
            r = this.rgba;
          if ("object" === typeof z && "undefined" !== typeof this.stops) {
            var p = B(z);
            p.stops = [].slice.call(p.stops);
            this.stops.forEach(function (h, a) {
              p.stops[a] = [p.stops[a][0], h.get(b)];
            });
            return p;
          }
          return r && K(r[0])
            ? "rgb" === b || (!b && 1 === r[3])
              ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")"
              : "a" === b
              ? "".concat(r[3])
              : "rgba(" + r.join(",") + ")"
            : z;
        };
        e.prototype.brighten = function (b) {
          var z = this.rgba;
          if (this.stops)
            this.stops.forEach(function (p) {
              p.brighten(b);
            });
          else if (K(b) && 0 !== b)
            for (var r = 0; 3 > r; r++)
              (z[r] += v(255 * b)),
                0 > z[r] && (z[r] = 0),
                255 < z[r] && (z[r] = 255);
          return this;
        };
        e.prototype.setOpacity = function (b) {
          this.rgba[3] = b;
          return this;
        };
        e.prototype.tweenTo = function (b, z) {
          var r = this.rgba,
            p = b.rgba;
          if (!K(r[0]) || !K(p[0])) return b.input || "none";
          b = 1 !== p[3] || 1 !== r[3];
          return (
            (b ? "rgba(" : "rgb(") +
            Math.round(p[0] + (r[0] - p[0]) * (1 - z)) +
            "," +
            Math.round(p[1] + (r[1] - p[1]) * (1 - z)) +
            "," +
            Math.round(p[2] + (r[2] - p[2]) * (1 - z)) +
            (b ? "," + (p[3] + (r[3] - p[3]) * (1 - z)) : "") +
            ")"
          );
        };
        e.names = { white: "#ffffff", black: "#000000" };
        e.parsers = [
          {
            regex:
              /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            parse: function (b) {
              return [v(b[1]), v(b[2]), v(b[3]), parseFloat(b[4], 10)];
            },
          },
          {
            regex:
              /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function (b) {
              return [v(b[1]), v(b[2]), v(b[3]), 1];
            },
          },
        ];
        e.None = new e("");
        return e;
      })();
      ("");
      return e;
    }
  );
  I(e, "Core/Color/Palettes.js", [], function () {
    return {
      colors:
        "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
          " "
        ),
    };
  });
  I(
    e,
    "Core/Time.js",
    [e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var K = b.win,
        B = e.defined,
        v = e.error,
        t = e.extend,
        F = e.isObject,
        z = e.merge,
        r = e.objectEach,
        p = e.pad,
        h = e.pick,
        a = e.splat,
        d = e.timeUnits,
        g = b.isSafari && K.Intl && K.Intl.DateTimeFormat.prototype.formatRange,
        m =
          b.isSafari && K.Intl && !K.Intl.DateTimeFormat.prototype.formatRange;
      e = (function () {
        function n(a) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = K.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(a);
        }
        n.prototype.get = function (a, d) {
          if (this.variableTimezone || this.timezoneOffset) {
            var g = d.getTime(),
              m = g - this.getTimezoneOffset(d);
            d.setTime(m);
            a = d["getUTC" + a]();
            d.setTime(g);
            return a;
          }
          return this.useUTC ? d["getUTC" + a]() : d["get" + a]();
        };
        n.prototype.set = function (a, d, m) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              "Milliseconds" === a ||
              "Seconds" === a ||
              ("Minutes" === a && 0 === this.getTimezoneOffset(d) % 36e5)
            )
              return d["setUTC" + a](m);
            var n = this.getTimezoneOffset(d);
            n = d.getTime() - n;
            d.setTime(n);
            d["setUTC" + a](m);
            a = this.getTimezoneOffset(d);
            n = d.getTime() + a;
            return d.setTime(n);
          }
          return this.useUTC || (g && "FullYear" === a)
            ? d["setUTC" + a](m)
            : d["set" + a](m);
        };
        n.prototype.update = function (a) {
          var d = h(a && a.useUTC, !0);
          this.options = a = z(!0, this.options || {}, a);
          this.Date = a.Date || K.Date || Date;
          this.timezoneOffset =
            ((this.useUTC = d) && a.timezoneOffset) || void 0;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = d && !(!a.getTimezoneOffset && !a.timezone);
        };
        n.prototype.makeTime = function (a, d, g, n, u, l) {
          if (this.useUTC) {
            var A = this.Date.UTC.apply(0, arguments);
            var f = this.getTimezoneOffset(A);
            A += f;
            var w = this.getTimezoneOffset(A);
            f !== w
              ? (A += w - f)
              : f - 36e5 !== this.getTimezoneOffset(A - 36e5) ||
                m ||
                (A -= 36e5);
          } else
            A = new this.Date(
              a,
              d,
              h(g, 1),
              h(n, 0),
              h(u, 0),
              h(l, 0)
            ).getTime();
          return A;
        };
        n.prototype.timezoneOffsetFunction = function () {
          var a = this,
            d = this.options,
            g = d.getTimezoneOffset,
            m = d.moment || K.moment;
          if (!this.useUTC)
            return function (a) {
              return 6e4 * new Date(a.toString()).getTimezoneOffset();
            };
          if (d.timezone) {
            if (m)
              return function (a) {
                return 6e4 * -m.tz(a, d.timezone).utcOffset();
              };
            v(25);
          }
          return this.useUTC && g
            ? function (a) {
                return 6e4 * g(a.valueOf());
              }
            : function () {
                return 6e4 * (a.timezoneOffset || 0);
              };
        };
        n.prototype.dateFormat = function (a, d, g) {
          if (!B(d) || isNaN(d))
            return (
              (b.defaultOptions.lang && b.defaultOptions.lang.invalidDate) || ""
            );
          a = h(a, "%Y-%m-%d %H:%M:%S");
          var m = this,
            n = new this.Date(d),
            l = this.get("Hours", n),
            A = this.get("Day", n),
            f = this.get("Date", n),
            w = this.get("Month", n),
            k = this.get("FullYear", n),
            D = b.defaultOptions.lang,
            c = D && D.weekdays,
            q = D && D.shortWeekdays;
          n = t(
            {
              a: q ? q[A] : c[A].substr(0, 3),
              A: c[A],
              d: p(f),
              e: p(f, 2, " "),
              w: A,
              b: D.shortMonths[w],
              B: D.months[w],
              m: p(w + 1),
              o: w + 1,
              y: k.toString().substr(2, 2),
              Y: k,
              H: p(l),
              k: l,
              I: p(l % 12 || 12),
              l: l % 12 || 12,
              M: p(this.get("Minutes", n)),
              p: 12 > l ? "AM" : "PM",
              P: 12 > l ? "am" : "pm",
              S: p(n.getSeconds()),
              L: p(Math.floor(d % 1e3), 3),
            },
            b.dateFormats
          );
          r(n, function (c, f) {
            for (; -1 !== a.indexOf("%" + f); )
              a = a.replace(
                "%" + f,
                "function" === typeof c ? c.call(m, d) : c
              );
          });
          return g ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
        };
        n.prototype.resolveDTLFormat = function (d) {
          return F(d, !0)
            ? d
            : ((d = a(d)), { main: d[0], from: d[1], to: d[2] });
        };
        n.prototype.getTimeTicks = function (a, g, m, n) {
          var u = this,
            l = [],
            A = {},
            f = new u.Date(g),
            w = a.unitRange,
            k = a.count || 1,
            D;
          n = h(n, 1);
          if (B(g)) {
            u.set(
              "Milliseconds",
              f,
              w >= d.second ? 0 : k * Math.floor(u.get("Milliseconds", f) / k)
            );
            w >= d.second &&
              u.set(
                "Seconds",
                f,
                w >= d.minute ? 0 : k * Math.floor(u.get("Seconds", f) / k)
              );
            w >= d.minute &&
              u.set(
                "Minutes",
                f,
                w >= d.hour ? 0 : k * Math.floor(u.get("Minutes", f) / k)
              );
            w >= d.hour &&
              u.set(
                "Hours",
                f,
                w >= d.day ? 0 : k * Math.floor(u.get("Hours", f) / k)
              );
            w >= d.day &&
              u.set(
                "Date",
                f,
                w >= d.month
                  ? 1
                  : Math.max(1, k * Math.floor(u.get("Date", f) / k))
              );
            if (w >= d.month) {
              u.set(
                "Month",
                f,
                w >= d.year ? 0 : k * Math.floor(u.get("Month", f) / k)
              );
              var c = u.get("FullYear", f);
            }
            w >= d.year && u.set("FullYear", f, c - (c % k));
            w === d.week &&
              ((c = u.get("Day", f)),
              u.set("Date", f, u.get("Date", f) - c + n + (c < n ? -7 : 0)));
            c = u.get("FullYear", f);
            n = u.get("Month", f);
            var q = u.get("Date", f),
              E = u.get("Hours", f);
            g = f.getTime();
            (!u.variableTimezone && u.useUTC) ||
              !B(m) ||
              (D =
                m - g > 4 * d.month ||
                u.getTimezoneOffset(g) !== u.getTimezoneOffset(m));
            g = f.getTime();
            for (f = 1; g < m; )
              l.push(g),
                (g =
                  w === d.year
                    ? u.makeTime(c + f * k, 0)
                    : w === d.month
                    ? u.makeTime(c, n + f * k)
                    : !D || (w !== d.day && w !== d.week)
                    ? D && w === d.hour && 1 < k
                      ? u.makeTime(c, n, q, E + f * k)
                      : g + w * k
                    : u.makeTime(c, n, q + f * k * (w === d.day ? 1 : 7))),
                f++;
            l.push(g);
            w <= d.hour &&
              1e4 > l.length &&
              l.forEach(function (c) {
                0 === c % 18e5 &&
                  "000000000" === u.dateFormat("%H%M%S%L", c) &&
                  (A[c] = "day");
              });
          }
          l.info = t(a, { higherRanks: A, totalRange: w * k });
          return l;
        };
        n.prototype.getDateFormat = function (a, g, n, m) {
          var u = this.dateFormat("%m-%d %H:%M:%S.%L", g),
            l = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
            h = "millisecond";
          for (f in d) {
            if (
              a === d.week &&
              +this.dateFormat("%w", g) === n &&
              "00:00:00.000" === u.substr(6)
            ) {
              var f = "week";
              break;
            }
            if (d[f] > a) {
              f = h;
              break;
            }
            if (l[f] && u.substr(l[f]) !== "01-01 00:00:00.000".substr(l[f]))
              break;
            "week" !== f && (h = f);
          }
          return this.resolveDTLFormat(m[f]).main;
        };
        return n;
      })();
      ("");
      return e;
    }
  );
  I(
    e,
    "Core/DefaultOptions.js",
    [
      e["Core/Chart/ChartDefaults.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Color/Palettes.js"],
      e["Core/Time.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t) {
      e = e.parse;
      var K = t.merge,
        z = {
          colors: B.colors,
          symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
          lang: {
            loading: "Loading...",
            months:
              "January February March April May June July August September October November December".split(
                " "
              ),
            shortMonths:
              "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays:
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " "
              ),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " ",
          },
          global: {},
          time: {
            Date: void 0,
            getTimezoneOffset: void 0,
            timezone: void 0,
            timezoneOffset: 0,
            useUTC: !0,
          },
          chart: b,
          title: {
            text: "Cemetery Garden",
            align: "center",
            margin: 15,
            widthAdjust: -44,
          },
          subtitle: { text: "", align: "center", widthAdjust: -44 },
          caption: {
            margin: 15,
            text: "",
            align: "left",
            verticalAlign: "bottom",
          },
          plotOptions: {},
          labels: { style: { position: "absolute", color: "#333333" } },
          legend: {
            enabled: !0,
            align: "center",
            alignColumns: !0,
            className: "highcharts-no-tooltip",
            layout: "horizontal",
            labelFormatter: function () {
              return this.name;
            },
            borderColor: "#999999",
            borderRadius: 0,
            navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
            itemStyle: {
              color: "#333333",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              textOverflow: "ellipsis",
            },
            itemHoverStyle: { color: "#000000" },
            itemHiddenStyle: { color: "#cccccc" },
            shadow: !1,
            itemCheckboxStyle: {
              position: "absolute",
              width: "13px",
              height: "13px",
            },
            squareSymbol: !0,
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: { style: { fontWeight: "bold" } },
          },
          loading: {
            labelStyle: {
              fontWeight: "bold",
              position: "relative",
              top: "45%",
            },
            style: {
              position: "absolute",
              backgroundColor: "#ffffff",
              opacity: 0.5,
              textAlign: "center",
            },
          },
          tooltip: {
            enabled: !0,
            animation: y.svg,
            borderRadius: 3,
            dateTimeLabelFormats: {
              millisecond: "%A, %b %e, %H:%M:%S.%L",
              second: "%A, %b %e, %H:%M:%S",
              minute: "%A, %b %e, %H:%M",
              hour: "%A, %b %e, %H:%M",
              day: "%A, %b %e, %Y",
              week: "Week from %A, %b %e, %Y",
              month: "%B %Y",
              year: "%Y",
            },
            footerFormat: "",
            headerShape: "callout",
            hideDelay: 500,
            padding: 8,
            shape: "callout",
            shared: !1,
            snap: y.isTouchDevice ? 25 : 10,
            headerFormat:
              '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            backgroundColor: e("#f7f7f7").setOpacity(0.85).get(),
            borderWidth: 1,
            shadow: !0,
            stickOnContact: !1,
            style: {
              color: "#333333",
              cursor: "default",
              fontSize: "12px",
              whiteSpace: "nowrap",
            },
            useHTML: !1,
          },
          credits: {
            enabled: !0,
            href: "https://www.highcharts.com?credits",
            position: {
              align: "right",
              x: -10,
              verticalAlign: "bottom",
              y: -5,
            },
            style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
            text: "Highcharts.com",
          },
        };
      z.chart.styledMode = !1;
      ("");
      var r = new v(K(z.global, z.time));
      b = {
        defaultOptions: z,
        defaultTime: r,
        getOptions: function () {
          return z;
        },
        setOptions: function (p) {
          K(!0, z, p);
          if (p.time || p.global)
            y.time
              ? y.time.update(K(z.global, z.time, p.global, p.time))
              : (y.time = r);
          return z;
        },
      };
      ("");
      return b;
    }
  );
  I(
    e,
    "Core/Animation/Fx.js",
    [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (b, e, y) {
      var K = b.parse,
        v = e.win,
        t = y.isNumber,
        F = y.objectEach;
      return (function () {
        function b(b, p, h) {
          this.pos = NaN;
          this.options = p;
          this.elem = b;
          this.prop = h;
        }
        b.prototype.dSetter = function () {
          var b = this.paths,
            p = b && b[0];
          b = b && b[1];
          var h = this.now || 0,
            a = [];
          if (1 !== h && p && b)
            if (p.length === b.length && 1 > h)
              for (var d = 0; d < b.length; d++) {
                for (var g = p[d], m = b[d], n = [], G = 0; G < m.length; G++) {
                  var J = g[G],
                    x = m[G];
                  t(J) && t(x) && ("A" !== m[0] || (4 !== G && 5 !== G))
                    ? (n[G] = J + h * (x - J))
                    : (n[G] = x);
                }
                a.push(n);
              }
            else a = b;
          else a = this.toD || [];
          this.elem.attr("d", a, void 0, !0);
        };
        b.prototype.update = function () {
          var b = this.elem,
            p = this.prop,
            h = this.now,
            a = this.options.step;
          if (this[p + "Setter"]) this[p + "Setter"]();
          else
            b.attr
              ? b.element && b.attr(p, h, null, !0)
              : (b.style[p] = h + this.unit);
          a && a.call(b, h, this);
        };
        b.prototype.run = function (r, p, h) {
          var a = this,
            d = a.options,
            g = function (d) {
              return g.stopped ? !1 : a.step(d);
            },
            m =
              v.requestAnimationFrame ||
              function (a) {
                setTimeout(a, 13);
              },
            n = function () {
              for (var a = 0; a < b.timers.length; a++)
                b.timers[a]() || b.timers.splice(a--, 1);
              b.timers.length && m(n);
            };
          r !== p || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = r),
              (this.end = p),
              (this.unit = h),
              (this.now = this.start),
              (this.pos = 0),
              (g.elem = this.elem),
              (g.prop = this.prop),
              g() && 1 === b.timers.push(g) && m(n))
            : (delete d.curAnim[this.prop],
              d.complete &&
                0 === Object.keys(d.curAnim).length &&
                d.complete.call(this.elem));
        };
        b.prototype.step = function (b) {
          var p = +new Date(),
            h = this.options,
            a = this.elem,
            d = h.complete,
            g = h.duration,
            m = h.curAnim;
          if (a.attr && !a.element) b = !1;
          else if (b || p >= g + this.startTime) {
            this.now = this.end;
            this.pos = 1;
            this.update();
            var n = (m[this.prop] = !0);
            F(m, function (a) {
              !0 !== a && (n = !1);
            });
            n && d && d.call(a);
            b = !1;
          } else
            (this.pos = h.easing((p - this.startTime) / g)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (b = !0);
          return b;
        };
        b.prototype.initPath = function (b, p, h) {
          function a(a, d) {
            for (; a.length < C; ) {
              var l = a[0],
                f = d[C - a.length];
              f &&
                "M" === l[0] &&
                (a[0] =
                  "C" === f[0]
                    ? ["C", l[1], l[2], l[1], l[2], l[1], l[2]]
                    : ["L", l[1], l[2]]);
              a.unshift(l);
              n && ((l = a.pop()), a.push(a[a.length - 1], l));
            }
          }
          function d(a, l) {
            for (; a.length < C; )
              if (
                ((l = a[Math.floor(a.length / G) - 1].slice()),
                "C" === l[0] && ((l[1] = l[5]), (l[2] = l[6])),
                n)
              ) {
                var d = a[Math.floor(a.length / G)].slice();
                a.splice(a.length / 2, 0, l, d);
              } else a.push(l);
          }
          var g = b.startX,
            m = b.endX;
          h = h.slice();
          var n = b.isArea,
            G = n ? 2 : 1;
          p = p && p.slice();
          if (!p) return [h, h];
          if (g && m && m.length) {
            for (b = 0; b < g.length; b++)
              if (g[b] === m[0]) {
                var J = b;
                break;
              } else if (g[0] === m[m.length - g.length + b]) {
                J = b;
                var x = !0;
                break;
              } else if (g[g.length - 1] === m[m.length - g.length + b]) {
                J = g.length - b;
                break;
              }
            "undefined" === typeof J && (p = []);
          }
          if (p.length && t(J)) {
            var C = h.length + J * G;
            x ? (a(p, h), d(h, p)) : (a(h, p), d(p, h));
          }
          return [p, h];
        };
        b.prototype.fillSetter = function () {
          b.prototype.strokeSetter.apply(this, arguments);
        };
        b.prototype.strokeSetter = function () {
          this.elem.attr(
            this.prop,
            K(this.start).tweenTo(K(this.end), this.pos),
            void 0,
            !0
          );
        };
        b.timers = [];
        return b;
      })();
    }
  );
  I(
    e,
    "Core/Animation/AnimationUtilities.js",
    [e["Core/Animation/Fx.js"], e["Core/Utilities.js"]],
    function (b, e) {
      function K(a) {
        return r(a)
          ? p({ duration: 500, defer: 0 }, a)
          : { duration: a ? 500 : 0, defer: 0 };
      }
      function B(a, g) {
        for (var d = b.timers.length; d--; )
          b.timers[d].elem !== a ||
            (g && g !== b.timers[d].prop) ||
            (b.timers[d].stopped = !0);
      }
      var v = e.defined,
        t = e.getStyle,
        F = e.isArray,
        z = e.isNumber,
        r = e.isObject,
        p = e.merge,
        h = e.objectEach,
        a = e.pick;
      return {
        animate: function (a, g, m) {
          var d,
            G = "",
            J,
            x;
          if (!r(m)) {
            var C = arguments;
            m = { duration: C[2], easing: C[3], complete: C[4] };
          }
          z(m.duration) || (m.duration = 400);
          m.easing =
            "function" === typeof m.easing
              ? m.easing
              : Math[m.easing] || Math.easeInOutSine;
          m.curAnim = p(g);
          h(g, function (n, l) {
            B(a, l);
            x = new b(a, m, l);
            J = void 0;
            "d" === l && F(g.d)
              ? ((x.paths = x.initPath(a, a.pathArray, g.d)),
                (x.toD = g.d),
                (d = 0),
                (J = 1))
              : a.attr
              ? (d = a.attr(l))
              : ((d = parseFloat(t(a, l)) || 0), "opacity" !== l && (G = "px"));
            J || (J = n);
            "string" === typeof J &&
              J.match("px") &&
              (J = J.replace(/px/g, ""));
            x.run(d, J, G);
          });
        },
        animObject: K,
        getDeferredAnimation: function (a, g, m) {
          var d = K(g),
            h = 0,
            b = 0;
          (m ? [m] : a.series).forEach(function (a) {
            a = K(a.options.animation);
            h = g && v(g.defer) ? d.defer : Math.max(h, a.duration + a.defer);
            b = Math.min(d.duration, a.duration);
          });
          a.renderer.forExport && (h = 0);
          return { defer: Math.max(0, h - b), duration: Math.min(h, b) };
        },
        setAnimation: function (d, g) {
          g.renderer.globalAnimation = a(d, g.options.chart.animation, !0);
        },
        stop: B,
      };
    }
  );
  I(
    e,
    "Core/Renderer/HTML/AST.js",
    [e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var K = b.SVG_NS,
        B = e.attr,
        v = e.createElement,
        t = e.css,
        F = e.error,
        z = e.isFunction,
        r = e.isString,
        p = e.objectEach,
        h = e.splat,
        a =
          (e = b.win.trustedTypes) &&
          z(e.createPolicy) &&
          e.createPolicy("highcharts", {
            createHTML: function (a) {
              return a;
            },
          }),
        d = a ? a.createHTML("") : "";
      try {
        var g = !!new DOMParser().parseFromString(d, "text/html");
      } catch (m) {
        g = !1;
      }
      z = (function () {
        function m(a) {
          this.nodes = "string" === typeof a ? this.parseMarkup(a) : a;
        }
        m.filterUserAttributes = function (a) {
          p(a, function (d, g) {
            var n = !0;
            -1 === m.allowedAttributes.indexOf(g) && (n = !1);
            -1 !==
              ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(g) &&
              (n =
                r(d) &&
                m.allowedReferences.some(function (a) {
                  return 0 === d.indexOf(a);
                }));
            n ||
              (F(33, !1, void 0, {
                "Invalid attribute in config": "".concat(g),
              }),
              delete a[g]);
          });
          return a;
        };
        m.parseStyle = function (a) {
          return a.split(";").reduce(function (a, d) {
            d = d.split(":").map(function (a) {
              return a.trim();
            });
            var g = d.shift();
            g &&
              d.length &&
              (a[
                g.replace(/-([a-z])/g, function (a) {
                  return a[1].toUpperCase();
                })
              ] = d.join(":"));
            return a;
          }, {});
        };
        m.setElementHTML = function (a, d) {
          a.innerHTML = m.emptyHTML;
          d && new m(d).addToDOM(a);
        };
        m.prototype.addToDOM = function (a) {
          function d(a, g) {
            var n;
            h(a).forEach(function (a) {
              var l = a.tagName,
                h = a.textContent
                  ? b.doc.createTextNode(a.textContent)
                  : void 0,
                f = m.bypassHTMLFiltering;
              if (l)
                if ("#text" === l) var w = h;
                else if (-1 !== m.allowedTags.indexOf(l) || f) {
                  l = b.doc.createElementNS(
                    "svg" === l ? K : g.namespaceURI || K,
                    l
                  );
                  var k = a.attributes || {};
                  p(a, function (a, c) {
                    "tagName" !== c &&
                      "attributes" !== c &&
                      "children" !== c &&
                      "style" !== c &&
                      "textContent" !== c &&
                      (k[c] = a);
                  });
                  B(l, f ? k : m.filterUserAttributes(k));
                  a.style && t(l, a.style);
                  h && l.appendChild(h);
                  d(a.children || [], l);
                  w = l;
                } else F(33, !1, void 0, { "Invalid tagName in config": l });
              w && g.appendChild(w);
              n = w;
            });
            return n;
          }
          return d(this.nodes, a);
        };
        m.prototype.parseMarkup = function (d) {
          var n = [];
          d = d.trim().replace(/ style=(["'])/g, " data-style=$1");
          if (g)
            d = new DOMParser().parseFromString(
              a ? a.createHTML(d) : d,
              "text/html"
            );
          else {
            var h = v("div");
            h.innerHTML = d;
            d = { body: h };
          }
          var x = function (a, d) {
            var l = a.nodeName.toLowerCase(),
              g = { tagName: l };
            "#text" === l && (g.textContent = a.textContent || "");
            if ((l = a.attributes)) {
              var f = {};
              [].forEach.call(l, function (a) {
                "data-style" === a.name
                  ? (g.style = m.parseStyle(a.value))
                  : (f[a.name] = a.value);
              });
              g.attributes = f;
            }
            if (a.childNodes.length) {
              var w = [];
              [].forEach.call(a.childNodes, function (a) {
                x(a, w);
              });
              w.length && (g.children = w);
            }
            d.push(g);
          };
          [].forEach.call(d.body.childNodes, function (a) {
            return x(a, n);
          });
          return n;
        };
        m.allowedAttributes =
          "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex".split(
            " "
          );
        m.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
        m.allowedTags =
          "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead tbody tspan td th tr u ul #text".split(
            " "
          );
        m.emptyHTML = d;
        m.bypassHTMLFiltering = !1;
        return m;
      })();
      ("");
      return z;
    }
  );
  I(
    e,
    "Core/FormatUtilities.js",
    [e["Core/DefaultOptions.js"], e["Core/Utilities.js"]],
    function (b, e) {
      function K(b, h, a, d) {
        b = +b || 0;
        h = +h;
        var g = B.lang,
          m = (b.toString().split(".")[1] || "").split("e")[0].length,
          n = b.toString().split("e"),
          G = h;
        if (-1 === h) h = Math.min(m, 20);
        else if (!F(h)) h = 2;
        else if (h && n[1] && 0 > n[1]) {
          var p = h + +n[1];
          0 <= p
            ? ((n[0] = (+n[0]).toExponential(p).split("e")[0]), (h = p))
            : ((n[0] = n[0].split(".")[0] || 0),
              (b = 20 > h ? (n[0] * Math.pow(10, n[1])).toFixed(h) : 0),
              (n[1] = 0));
        }
        p = (
          Math.abs(n[1] ? n[0] : b) + Math.pow(10, -Math.max(h, m) - 1)
        ).toFixed(h);
        m = String(r(p));
        var x = 3 < m.length ? m.length % 3 : 0;
        a = z(a, g.decimalPoint);
        d = z(d, g.thousandsSep);
        b = (0 > b ? "-" : "") + (x ? m.substr(0, x) + d : "");
        b =
          0 > +n[1] && !G
            ? "0"
            : b + m.substr(x).replace(/(\d{3})(?=\d)/g, "$1" + d);
        h && (b += a + p.slice(-h));
        n[1] && 0 !== +b && (b += "e" + n[1]);
        return b;
      }
      var B = b.defaultOptions,
        v = b.defaultTime,
        t = e.getNestedProperty,
        F = e.isNumber,
        z = e.pick,
        r = e.pInt;
      return {
        dateFormat: function (b, h, a) {
          return v.dateFormat(b, h, a);
        },
        format: function (b, h, a) {
          var d = "{",
            g = !1,
            m = /f$/,
            n = /\.([0-9])/,
            G = B.lang,
            p = (a && a.time) || v;
          a = (a && a.numberFormatter) || K;
          for (var x = []; b; ) {
            var C = b.indexOf(d);
            if (-1 === C) break;
            var u = b.slice(0, C);
            if (g) {
              u = u.split(":");
              d = t(u.shift() || "", h);
              if (u.length && "number" === typeof d)
                if (((u = u.join(":")), m.test(u))) {
                  var l = parseInt((u.match(n) || ["", "-1"])[1], 10);
                  null !== d &&
                    (d = a(
                      d,
                      l,
                      G.decimalPoint,
                      -1 < u.indexOf(",") ? G.thousandsSep : ""
                    ));
                } else d = p.dateFormat(u, d);
              x.push(d);
            } else x.push(u);
            b = b.slice(C + 1);
            d = (g = !g) ? "}" : "{";
          }
          x.push(b);
          return x.join("");
        },
        numberFormat: K,
      };
    }
  );
  I(
    e,
    "Core/Renderer/RendererUtilities.js",
    [e["Core/Utilities.js"]],
    function (b) {
      var e = b.clamp,
        y = b.pick,
        B = b.stableSort,
        v;
      (function (b) {
        function t(b, r, p) {
          var h = b,
            a = h.reducedLen || r,
            d = function (a, d) {
              return (d.rank || 0) - (a.rank || 0);
            },
            g = function (a, d) {
              return a.target - d.target;
            },
            m,
            n = !0,
            G = [],
            J = 0;
          for (m = b.length; m--; ) J += b[m].size;
          if (J > a) {
            B(b, d);
            for (J = m = 0; J <= a; ) (J += b[m].size), m++;
            G = b.splice(m - 1, b.length);
          }
          B(b, g);
          for (
            b = b.map(function (a) {
              return {
                size: a.size,
                targets: [a.target],
                align: y(a.align, 0.5),
              };
            });
            n;

          ) {
            for (m = b.length; m--; )
              (a = b[m]),
                (d =
                  (Math.min.apply(0, a.targets) +
                    Math.max.apply(0, a.targets)) /
                  2),
                (a.pos = e(d - a.size * a.align, 0, r - a.size));
            m = b.length;
            for (n = !1; m--; )
              0 < m &&
                b[m - 1].pos + b[m - 1].size > b[m].pos &&
                ((b[m - 1].size += b[m].size),
                (b[m - 1].targets = b[m - 1].targets.concat(b[m].targets)),
                (b[m - 1].align = 0.5),
                b[m - 1].pos + b[m - 1].size > r &&
                  (b[m - 1].pos = r - b[m - 1].size),
                b.splice(m, 1),
                (n = !0));
          }
          h.push.apply(h, G);
          m = 0;
          b.some(function (a) {
            var d = 0;
            return (a.targets || []).some(function () {
              h[m].pos = a.pos + d;
              if (
                "undefined" !== typeof p &&
                Math.abs(h[m].pos - h[m].target) > p
              )
                return (
                  h.slice(0, m + 1).forEach(function (a) {
                    return delete a.pos;
                  }),
                  (h.reducedLen = (h.reducedLen || r) - 0.1 * r),
                  h.reducedLen > 0.1 * r && t(h, r, p),
                  !0
                );
              d += h[m].size;
              m++;
              return !1;
            });
          });
          B(h, g);
          return h;
        }
        b.distribute = t;
      })(v || (v = {}));
      return v;
    }
  );
  I(
    e,
    "Core/Renderer/SVG/SVGElement.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v = b.animate,
        t = b.animObject,
        K = b.stop,
        z = y.deg2rad,
        r = y.doc,
        p = y.svg,
        h = y.SVG_NS,
        a = y.win,
        d = B.addEvent,
        g = B.attr,
        m = B.createElement,
        n = B.css,
        G = B.defined,
        J = B.erase,
        x = B.extend,
        C = B.fireEvent,
        u = B.isArray,
        l = B.isFunction,
        A = B.isString,
        f = B.merge,
        w = B.objectEach,
        k = B.pick,
        D = B.pInt,
        c = B.syncTimeout,
        q = B.uniqueKey;
      b = (function () {
        function E() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = h;
          this.symbolCustomAttribs =
            "x y width height r start end innerR anchorX anchorY rounded".split(
              " "
            );
        }
        E.prototype._defaultGetter = function (c) {
          c = k(
            this[c + "Value"],
            this[c],
            this.element ? this.element.getAttribute(c) : null,
            0
          );
          /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
          return c;
        };
        E.prototype._defaultSetter = function (c, a, f) {
          f.setAttribute(a, c);
        };
        E.prototype.add = function (c) {
          var a = this.renderer,
            f = this.element;
          c && (this.parentGroup = c);
          this.parentInverted = c && c.inverted;
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            a.buildText(this);
          this.added = !0;
          if (!c || c.handleZ || this.zIndex) var k = this.zIndexSetter();
          k || (c ? c.element : a.box).appendChild(f);
          if (this.onAdd) this.onAdd();
          return this;
        };
        E.prototype.addClass = function (c, a) {
          var f = a ? "" : this.attr("class") || "";
          c = (c || "")
            .split(/ /g)
            .reduce(
              function (c, a) {
                -1 === f.indexOf(a) && c.push(a);
                return c;
              },
              f ? [f] : []
            )
            .join(" ");
          c !== f && this.attr("class", c);
          return this;
        };
        E.prototype.afterSetters = function () {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        };
        E.prototype.align = function (c, a, f) {
          var q = {},
            d = this.renderer,
            l = d.alignedObjects,
            H,
            g,
            w;
          if (c) {
            if (
              ((this.alignOptions = c), (this.alignByTranslate = a), !f || A(f))
            )
              (this.alignTo = H = f || "renderer"),
                J(l, this),
                l.push(this),
                (f = void 0);
          } else
            (c = this.alignOptions),
              (a = this.alignByTranslate),
              (H = this.alignTo);
          f = k(f, d[H], "scrollablePlotBox" === H ? d.plotBox : void 0, d);
          H = c.align;
          var D = c.verticalAlign;
          d = (f.x || 0) + (c.x || 0);
          l = (f.y || 0) + (c.y || 0);
          "right" === H ? (g = 1) : "center" === H && (g = 2);
          g && (d += (f.width - (c.width || 0)) / g);
          q[a ? "translateX" : "x"] = Math.round(d);
          "bottom" === D ? (w = 1) : "middle" === D && (w = 2);
          w && (l += (f.height - (c.height || 0)) / w);
          q[a ? "translateY" : "y"] = Math.round(l);
          this[this.placed ? "animate" : "attr"](q);
          this.placed = !0;
          this.alignAttr = q;
          return this;
        };
        E.prototype.alignSetter = function (c) {
          var a = { left: "start", center: "middle", right: "end" };
          a[c] &&
            ((this.alignValue = c),
            this.element.setAttribute("text-anchor", a[c]));
        };
        E.prototype.animate = function (a, f, q) {
          var d = this,
            l = t(k(f, this.renderer.globalAnimation, !0));
          f = l.defer;
          k(r.hidden, r.msHidden, r.webkitHidden, !1) && (l.duration = 0);
          0 !== l.duration
            ? (q && (l.complete = q),
              c(function () {
                d.element && v(d, a, l);
              }, f))
            : (this.attr(a, void 0, q || l.complete),
              w(
                a,
                function (c, a) {
                  l.step &&
                    l.step.call(this, c, { prop: a, pos: 1, elem: this });
                },
                this
              ));
          return this;
        };
        E.prototype.applyTextOutline = function (c) {
          var a = this.element;
          -1 !== c.indexOf("contrast") &&
            (c = c.replace(
              /contrast/g,
              this.renderer.getContrast(a.style.fill)
            ));
          var f = c.split(" ");
          c = f[f.length - 1];
          if ((f = f[0]) && "none" !== f && y.svg) {
            this.fakeTS = !0;
            this.ySetter = this.xSetter;
            f = f.replace(/(^[\d\.]+)(.*?)$/g, function (c, a, f) {
              return 2 * Number(a) + f;
            });
            this.removeTextOutline();
            var k = r.createElementNS(h, "tspan");
            g(k, {
              class: "highcharts-text-outline",
              fill: c,
              stroke: c,
              "stroke-width": f,
              "stroke-linejoin": "round",
            });
            c = a.querySelector("textPath") || a;
            [].forEach.call(c.childNodes, function (c) {
              var a = c.cloneNode(!0);
              a.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach(function (
                  c
                ) {
                  return a.removeAttribute(c);
                });
              k.appendChild(a);
            });
            var q = 0;
            [].forEach.call(c.querySelectorAll("text tspan"), function (c) {
              q += Number(c.getAttribute("dy"));
            });
            f = r.createElementNS(h, "tspan");
            f.textContent = "\u200b";
            g(f, { x: Number(a.getAttribute("x")), dy: -q });
            k.appendChild(f);
            c.insertBefore(k, c.firstChild);
          }
        };
        E.prototype.attr = function (c, a, f, k) {
          var q = this.element,
            d = this.symbolCustomAttribs,
            l,
            g = this,
            H,
            D;
          if ("string" === typeof c && "undefined" !== typeof a) {
            var m = c;
            c = {};
            c[m] = a;
          }
          "string" === typeof c
            ? (g = (this[c + "Getter"] || this._defaultGetter).call(this, c, q))
            : (w(
                c,
                function (a, f) {
                  H = !1;
                  k || K(this, f);
                  this.symbolName &&
                    -1 !== d.indexOf(f) &&
                    (l || (this.symbolAttr(c), (l = !0)), (H = !0));
                  !this.rotation ||
                    ("x" !== f && "y" !== f) ||
                    (this.doTransform = !0);
                  H ||
                    ((D = this[f + "Setter"] || this._defaultSetter),
                    D.call(this, a, f, q),
                    !this.styledMode &&
                      this.shadows &&
                      /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                        f
                      ) &&
                      this.updateShadows(f, a, D));
                },
                this
              ),
              this.afterSetters());
          f && f.call(this);
          return g;
        };
        E.prototype.clip = function (c) {
          return this.attr(
            "clip-path",
            c ? "url(" + this.renderer.url + "#" + c.id + ")" : "none"
          );
        };
        E.prototype.crisp = function (c, a) {
          a = a || c.strokeWidth || 0;
          var f = (Math.round(a) % 2) / 2;
          c.x = Math.floor(c.x || this.x || 0) + f;
          c.y = Math.floor(c.y || this.y || 0) + f;
          c.width = Math.floor((c.width || this.width || 0) - 2 * f);
          c.height = Math.floor((c.height || this.height || 0) - 2 * f);
          G(c.strokeWidth) && (c.strokeWidth = a);
          return c;
        };
        E.prototype.complexColor = function (c, a, k) {
          var d = this.renderer,
            l,
            g,
            H,
            D,
            m,
            n,
            E,
            h,
            b,
            A,
            x = [],
            p;
          C(this.renderer, "complexColor", { args: arguments }, function () {
            c.radialGradient
              ? (g = "radialGradient")
              : c.linearGradient && (g = "linearGradient");
            if (g) {
              H = c[g];
              m = d.gradients;
              n = c.stops;
              b = k.radialReference;
              u(H) &&
                (c[g] = H =
                  {
                    x1: H[0],
                    y1: H[1],
                    x2: H[2],
                    y2: H[3],
                    gradientUnits: "userSpaceOnUse",
                  });
              "radialGradient" === g &&
                b &&
                !G(H.gradientUnits) &&
                ((D = H),
                (H = f(H, d.getRadialAttr(b, D), {
                  gradientUnits: "userSpaceOnUse",
                })));
              w(H, function (c, a) {
                "id" !== a && x.push(a, c);
              });
              w(n, function (c) {
                x.push(c);
              });
              x = x.join(",");
              if (m[x]) A = m[x].attr("id");
              else {
                H.id = A = q();
                var P = (m[x] = d.createElement(g).attr(H).add(d.defs));
                P.radAttr = D;
                P.stops = [];
                n.forEach(function (c) {
                  0 === c[1].indexOf("rgba")
                    ? ((l = e.parse(c[1])),
                      (E = l.get("rgb")),
                      (h = l.get("a")))
                    : ((E = c[1]), (h = 1));
                  c = d
                    .createElement("stop")
                    .attr({ offset: c[0], "stop-color": E, "stop-opacity": h })
                    .add(P);
                  P.stops.push(c);
                });
              }
              p = "url(" + d.url + "#" + A + ")";
              k.setAttribute(a, p);
              k.gradient = x;
              c.toString = function () {
                return p;
              };
            }
          });
        };
        E.prototype.css = function (c) {
          var a = this.styles,
            k = {},
            q = this.element,
            d = !a;
          c.color && (c.fill = c.color);
          a &&
            w(c, function (c, f) {
              a && a[f] !== c && ((k[f] = c), (d = !0));
            });
          if (d) {
            a && (c = x(a, k));
            if (null === c.width || "auto" === c.width) delete this.textWidth;
            else if ("text" === q.nodeName.toLowerCase() && c.width)
              var l = (this.textWidth = D(c.width));
            this.styles = c;
            l && !p && this.renderer.forExport && delete c.width;
            var g = f(c);
            q.namespaceURI === this.SVG_NS &&
              ["textOutline", "textOverflow", "width"].forEach(function (c) {
                return g && delete g[c];
              });
            n(q, g);
            this.added &&
              ("text" === this.element.nodeName &&
                this.renderer.buildText(this),
              c.textOutline && this.applyTextOutline(c.textOutline));
          }
          return this;
        };
        E.prototype.dashstyleSetter = function (c) {
          var a = this["stroke-width"];
          "inherit" === a && (a = 1);
          if ((c = c && c.toLowerCase())) {
            var f = c
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (c = f.length; c--; ) f[c] = "" + D(f[c]) * k(a, NaN);
            c = f.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", c);
          }
        };
        E.prototype.destroy = function () {
          var c = this,
            a = c.element || {},
            f = c.renderer,
            k = a.ownerSVGElement,
            q = (f.isSVG && "SPAN" === a.nodeName && c.parentGroup) || void 0;
          a.onclick =
            a.onmouseout =
            a.onmouseover =
            a.onmousemove =
            a.point =
              null;
          K(c);
          if (c.clipPath && k) {
            var d = c.clipPath;
            [].forEach.call(
              k.querySelectorAll("[clip-path],[CLIP-PATH]"),
              function (c) {
                -1 < c.getAttribute("clip-path").indexOf(d.element.id) &&
                  c.removeAttribute("clip-path");
              }
            );
            c.clipPath = d.destroy();
          }
          if (c.stops) {
            for (k = 0; k < c.stops.length; k++) c.stops[k].destroy();
            c.stops.length = 0;
            c.stops = void 0;
          }
          c.safeRemoveChild(a);
          for (
            f.styledMode || c.destroyShadows();
            q && q.div && 0 === q.div.childNodes.length;

          )
            (a = q.parentGroup),
              c.safeRemoveChild(q.div),
              delete q.div,
              (q = a);
          c.alignTo && J(f.alignedObjects, c);
          w(c, function (a, f) {
            c[f] && c[f].parentGroup === c && c[f].destroy && c[f].destroy();
            delete c[f];
          });
        };
        E.prototype.destroyShadows = function () {
          (this.shadows || []).forEach(function (c) {
            this.safeRemoveChild(c);
          }, this);
          this.shadows = void 0;
        };
        E.prototype.dSetter = function (c, a, f) {
          u(c) &&
            ("string" === typeof c[0] && (c = this.renderer.pathToSegments(c)),
            (this.pathArray = c),
            (c = c.reduce(function (c, a, f) {
              return a && a.join
                ? (f ? c + " " : "") + a.join(" ")
                : (a || "").toString();
            }, "")));
          /(NaN| {2}|^$)/.test(c) && (c = "M 0 0");
          this[a] !== c && (f.setAttribute(a, c), (this[a] = c));
        };
        E.prototype.fadeOut = function (c) {
          var a = this;
          a.animate(
            { opacity: 0 },
            {
              duration: k(c, 150),
              complete: function () {
                a.hide();
              },
            }
          );
        };
        E.prototype.fillSetter = function (c, a, f) {
          "string" === typeof c
            ? f.setAttribute(a, c)
            : c && this.complexColor(c, a, f);
        };
        E.prototype.getBBox = function (c, a) {
          var f = this.alignValue,
            q = this.element,
            d = this.renderer,
            g = this.styles,
            D = this.textStr,
            w = d.cache,
            m = d.cacheKeys,
            H = q.namespaceURI === this.SVG_NS;
          a = k(a, this.rotation, 0);
          var h = d.styledMode
              ? q && E.prototype.getStyle.call(q, "font-size")
              : g && g.fontSize,
            u;
          if (G(D)) {
            var b = D.toString();
            -1 === b.indexOf("<") && (b = b.replace(/[0-9]/g, "0"));
            b += [
              "",
              a,
              h,
              this.textWidth,
              f,
              g && g.textOverflow,
              g && g.fontWeight,
            ].join();
          }
          b && !c && (u = w[b]);
          if (!u) {
            if (H || d.forExport) {
              try {
                var A =
                  this.fakeTS &&
                  function (c) {
                    var a = q.querySelector(".highcharts-text-outline");
                    a && n(a, { display: c });
                  };
                l(A) && A("none");
                u = q.getBBox
                  ? x({}, q.getBBox())
                  : {
                      width: q.offsetWidth,
                      height: q.offsetHeight,
                      x: 0,
                      y: 0,
                    };
                l(A) && A("");
              } catch (T) {
                ("");
              }
              if (!u || 0 > u.width) u = { x: 0, y: 0, width: 0, height: 0 };
            } else u = this.htmlGetBBox();
            if (
              d.isSVG &&
              ((d = u.width),
              (c = u.height),
              H &&
                (u.height = c =
                  { "11px,17": 14, "13px,20": 16 }[
                    "" + (h || "") + ",".concat(Math.round(c))
                  ] || c),
              a)
            ) {
              H = Number(q.getAttribute("y") || 0) - u.y;
              f = { right: 1, center: 0.5 }[f || 0] || 0;
              g = a * z;
              h = (a - 90) * z;
              var C = d * Math.cos(g);
              a = d * Math.sin(g);
              A = Math.cos(h);
              g = Math.sin(h);
              d = u.x + f * (d - C) + H * A;
              h = d + C;
              A = h - c * A;
              C = A - C;
              H = u.y + H - f * a + H * g;
              f = H + a;
              c = f - c * g;
              a = c - a;
              u.x = Math.min(d, h, A, C);
              u.y = Math.min(H, f, c, a);
              u.width = Math.max(d, h, A, C) - u.x;
              u.height = Math.max(H, f, c, a) - u.y;
            }
            if (b && ("" === D || 0 < u.height)) {
              for (; 250 < m.length; ) delete w[m.shift()];
              w[b] || m.push(b);
              w[b] = u;
            }
          }
          return u;
        };
        E.prototype.getStyle = function (c) {
          return a
            .getComputedStyle(this.element || this, "")
            .getPropertyValue(c);
        };
        E.prototype.hasClass = function (c) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(c);
        };
        E.prototype.hide = function () {
          return this.attr({ visibility: "hidden" });
        };
        E.prototype.htmlGetBBox = function () {
          return { height: 0, width: 0, x: 0, y: 0 };
        };
        E.prototype.init = function (c, a) {
          this.element =
            "span" === a ? m(a) : r.createElementNS(this.SVG_NS, a);
          this.renderer = c;
          C(this, "afterInit");
        };
        E.prototype.invert = function (c) {
          this.inverted = c;
          this.updateTransform();
          return this;
        };
        E.prototype.on = function (c, a) {
          var f = this.onEvents;
          if (f[c]) f[c]();
          f[c] = d(this.element, c, a);
          return this;
        };
        E.prototype.opacitySetter = function (c, a, f) {
          this.opacity = c = Number(Number(c).toFixed(3));
          f.setAttribute(a, c);
        };
        E.prototype.removeClass = function (c) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(A(c) ? new RegExp("(^| )".concat(c, "( |$)")) : c, " ")
              .replace(/ +/g, " ")
              .trim()
          );
        };
        E.prototype.removeTextOutline = function () {
          var c = this.element.querySelector("tspan.highcharts-text-outline");
          c && this.safeRemoveChild(c);
        };
        E.prototype.safeRemoveChild = function (c) {
          var a = c.parentNode;
          a && a.removeChild(c);
        };
        E.prototype.setRadialReference = function (c) {
          var a =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = c;
          a &&
            a.radAttr &&
            a.animate(this.renderer.getRadialAttr(c, a.radAttr));
          return this;
        };
        E.prototype.setTextPath = function (c, a) {
          var k = this;
          a = f(
            !0,
            {
              enabled: !0,
              attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" },
            },
            a
          );
          var l = this.renderer.url,
            g = this.text || this,
            D = g.textPath,
            w = a.attributes,
            m = a.enabled;
          c = c || (D && D.path);
          D && D.undo();
          c && m
            ? ((a = d(g, "afterModifyTree", function (a) {
                if (c && m) {
                  var f = c.attr("id");
                  f || c.attr("id", (f = q()));
                  var d = { x: 0, y: 0 };
                  G(w.dx) && ((d.dx = w.dx), delete w.dx);
                  G(w.dy) && ((d.dy = w.dy), delete w.dy);
                  g.attr(d);
                  k.attr({ transform: "" });
                  k.box && (k.box = k.box.destroy());
                  d = a.nodes.slice(0);
                  a.nodes.length = 0;
                  a.nodes[0] = {
                    tagName: "textPath",
                    attributes: x(w, {
                      "text-anchor": w.textAnchor,
                      href: "" + l + "#".concat(f),
                    }),
                    children: d,
                  };
                }
              })),
              (g.textPath = { path: c, undo: a }))
            : (g.attr({ dx: 0, dy: 0 }), delete g.textPath);
          this.added && ((g.textCache = ""), this.renderer.buildText(g));
          return this;
        };
        E.prototype.shadow = function (c, a, f) {
          var k = [],
            q = this.element,
            d = this.oldShadowOptions,
            l = {
              color: "#000000",
              offsetX: this.parentInverted ? -1 : 1,
              offsetY: this.parentInverted ? -1 : 1,
              opacity: 0.15,
              width: 3,
            },
            D = !1,
            m;
          !0 === c ? (m = l) : "object" === typeof c && (m = x(l, c));
          m &&
            (m &&
              d &&
              w(m, function (c, a) {
                c !== d[a] && (D = !0);
              }),
            D && this.destroyShadows(),
            (this.oldShadowOptions = m));
          if (!m) this.destroyShadows();
          else if (!this.shadows) {
            var n = m.opacity / m.width;
            var h = this.parentInverted
              ? "translate(".concat(m.offsetY, ", ").concat(m.offsetX, ")")
              : "translate(".concat(m.offsetX, ", ").concat(m.offsetY, ")");
            for (l = 1; l <= m.width; l++) {
              var E = q.cloneNode(!1);
              var u = 2 * m.width + 1 - 2 * l;
              g(E, {
                stroke: c.color || "#000000",
                "stroke-opacity": n * l,
                "stroke-width": u,
                transform: h,
                fill: "none",
              });
              E.setAttribute(
                "class",
                (E.getAttribute("class") || "") + " highcharts-shadow"
              );
              f &&
                (g(E, "height", Math.max(g(E, "height") - u, 0)),
                (E.cutHeight = u));
              a
                ? a.element.appendChild(E)
                : q.parentNode && q.parentNode.insertBefore(E, q);
              k.push(E);
            }
            this.shadows = k;
          }
          return this;
        };
        E.prototype.show = function (c) {
          void 0 === c && (c = !0);
          return this.attr({ visibility: c ? "inherit" : "visible" });
        };
        E.prototype.strokeSetter = function (c, a, f) {
          this[a] = c;
          this.stroke && this["stroke-width"]
            ? (E.prototype.fillSetter.call(this, this.stroke, "stroke", f),
              f.setAttribute("stroke-width", this["stroke-width"]),
              (this.hasStroke = !0))
            : "stroke-width" === a && 0 === c && this.hasStroke
            ? (f.removeAttribute("stroke"), (this.hasStroke = !1))
            : this.renderer.styledMode &&
              this["stroke-width"] &&
              (f.setAttribute("stroke-width", this["stroke-width"]),
              (this.hasStroke = !0));
        };
        E.prototype.strokeWidth = function () {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          var c = this.getStyle("stroke-width"),
            a = 0;
          if (c.indexOf("px") === c.length - 2) a = D(c);
          else if ("" !== c) {
            var f = r.createElementNS(h, "rect");
            g(f, { width: c, "stroke-width": 0 });
            this.element.parentNode.appendChild(f);
            a = f.getBBox().width;
            f.parentNode.removeChild(f);
          }
          return a;
        };
        E.prototype.symbolAttr = function (c) {
          var a = this;
          "x y r start end width height innerR anchorX anchorY clockwise"
            .split(" ")
            .forEach(function (f) {
              a[f] = k(c[f], a[f]);
            });
          a.attr({
            d: a.renderer.symbols[a.symbolName](a.x, a.y, a.width, a.height, a),
          });
        };
        E.prototype.textSetter = function (c) {
          c !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = c),
            this.added && this.renderer.buildText(this));
        };
        E.prototype.titleSetter = function (c) {
          var a = this.element,
            f =
              a.getElementsByTagName("title")[0] ||
              r.createElementNS(this.SVG_NS, "title");
          a.insertBefore ? a.insertBefore(f, a.firstChild) : a.appendChild(f);
          f.textContent = String(k(c, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        };
        E.prototype.toFront = function () {
          var c = this.element;
          c.parentNode.appendChild(c);
          return this;
        };
        E.prototype.translate = function (c, a) {
          return this.attr({ translateX: c, translateY: a });
        };
        E.prototype.updateShadows = function (c, a, f) {
          var k = this.shadows;
          if (k)
            for (var q = k.length; q--; )
              f.call(
                k[q],
                "height" === c
                  ? Math.max(a - (k[q].cutHeight || 0), 0)
                  : "d" === c
                  ? this.d
                  : a,
                c,
                k[q]
              );
        };
        E.prototype.updateTransform = function () {
          var c = this.scaleX,
            a = this.scaleY,
            f = this.inverted,
            q = this.rotation,
            d = this.matrix,
            l = this.element,
            g = this.translateX || 0,
            m = this.translateY || 0;
          f && ((g += this.width), (m += this.height));
          g = ["translate(" + g + "," + m + ")"];
          G(d) && g.push("matrix(" + d.join(",") + ")");
          f
            ? g.push("rotate(90) scale(-1,1)")
            : q &&
              g.push(
                "rotate(" +
                  q +
                  " " +
                  k(this.rotationOriginX, l.getAttribute("x"), 0) +
                  " " +
                  k(this.rotationOriginY, l.getAttribute("y") || 0) +
                  ")"
              );
          (G(c) || G(a)) && g.push("scale(" + k(c, 1) + " " + k(a, 1) + ")");
          g.length &&
            !(this.text || this).textPath &&
            l.setAttribute("transform", g.join(" "));
        };
        E.prototype.visibilitySetter = function (c, a, f) {
          "inherit" === c
            ? f.removeAttribute(a)
            : this[a] !== c && f.setAttribute(a, c);
          this[a] = c;
        };
        E.prototype.xGetter = function (c) {
          "circle" === this.element.nodeName &&
            ("x" === c ? (c = "cx") : "y" === c && (c = "cy"));
          return this._defaultGetter(c);
        };
        E.prototype.zIndexSetter = function (c, a) {
          var f = this.renderer,
            k = this.parentGroup,
            q = (k || f).element || f.box,
            d = this.element;
          f = q === f.box;
          var l = !1;
          var g = this.added;
          var m;
          G(c)
            ? (d.setAttribute("data-z-index", c),
              (c = +c),
              this[a] === c && (g = !1))
            : G(this[a]) && d.removeAttribute("data-z-index");
          this[a] = c;
          if (g) {
            (c = this.zIndex) && k && (k.handleZ = !0);
            a = q.childNodes;
            for (m = a.length - 1; 0 <= m && !l; m--) {
              k = a[m];
              g = k.getAttribute("data-z-index");
              var w = !G(g);
              if (k !== d)
                if (0 > c && w && !f && !m) q.insertBefore(d, a[m]), (l = !0);
                else if (D(g) <= c || (w && (!G(c) || 0 <= c)))
                  q.insertBefore(d, a[m + 1] || null), (l = !0);
            }
            l || (q.insertBefore(d, a[f ? 3 : 0] || null), (l = !0));
          }
          return l;
        };
        return E;
      })();
      b.prototype["stroke-widthSetter"] = b.prototype.strokeSetter;
      b.prototype.yGetter = b.prototype.xGetter;
      b.prototype.matrixSetter =
        b.prototype.rotationOriginXSetter =
        b.prototype.rotationOriginYSetter =
        b.prototype.rotationSetter =
        b.prototype.scaleXSetter =
        b.prototype.scaleYSetter =
        b.prototype.translateXSetter =
        b.prototype.translateYSetter =
        b.prototype.verticalAlignSetter =
          function (c, a) {
            this[a] = c;
            this.doTransform = !0;
          };
      ("");
      return b;
    }
  );
  I(
    e,
    "Core/Renderer/RendererRegistry.js",
    [e["Core/Globals.js"]],
    function (b) {
      var e;
      (function (e) {
        e.rendererTypes = {};
        var K;
        e.getRendererType = function (b) {
          void 0 === b && (b = K);
          return e.rendererTypes[b] || e.rendererTypes[K];
        };
        e.registerRendererType = function (v, t, F) {
          e.rendererTypes[v] = t;
          if (!K || F) (K = v), (b.Renderer = t);
        };
      })(e || (e = {}));
      return e;
    }
  );
  I(
    e,
    "Core/Renderer/SVG/SVGLabel.js",
    [e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var K =
          (this && this.__extends) ||
          (function () {
            var b = function (h, a) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, g) {
                    a.__proto__ = g;
                  }) ||
                function (a, g) {
                  for (var d in g) g.hasOwnProperty(d) && (a[d] = g[d]);
                };
              return b(h, a);
            };
            return function (h, a) {
              function d() {
                this.constructor = h;
              }
              b(h, a);
              h.prototype =
                null === a
                  ? Object.create(a)
                  : ((d.prototype = a.prototype), new d());
            };
          })(),
        B = e.defined,
        v = e.extend,
        t = e.isNumber,
        F = e.merge,
        z = e.pick,
        r = e.removeEvent;
      return (function (p) {
        function h(a, d, g, m, n, b, J, x, C, u) {
          var l = p.call(this) || this;
          l.paddingLeftSetter = l.paddingSetter;
          l.paddingRightSetter = l.paddingSetter;
          l.init(a, "g");
          l.textStr = d;
          l.x = g;
          l.y = m;
          l.anchorX = b;
          l.anchorY = J;
          l.baseline = C;
          l.className = u;
          l.addClass(
            "button" === u ? "highcharts-no-tooltip" : "highcharts-label"
          );
          u && l.addClass("highcharts-" + u);
          l.text = a.text(void 0, 0, 0, x).attr({ zIndex: 1 });
          var A;
          "string" === typeof n &&
            ((A = /^url\((.*?)\)$/.test(n)) || l.renderer.symbols[n]) &&
            (l.symbolKey = n);
          l.bBox = h.emptyBBox;
          l.padding = 3;
          l.baselineOffset = 0;
          l.needsBox = a.styledMode || A;
          l.deferredAttr = {};
          l.alignFactor = 0;
          return l;
        }
        K(h, p);
        h.prototype.alignSetter = function (a) {
          a = { left: 0, center: 0.5, right: 1 }[a];
          a !== this.alignFactor &&
            ((this.alignFactor = a),
            this.bBox && t(this.xSetting) && this.attr({ x: this.xSetting }));
        };
        h.prototype.anchorXSetter = function (a, d) {
          this.anchorX = a;
          this.boxAttr(
            d,
            Math.round(a) - this.getCrispAdjust() - this.xSetting
          );
        };
        h.prototype.anchorYSetter = function (a, d) {
          this.anchorY = a;
          this.boxAttr(d, a - this.ySetting);
        };
        h.prototype.boxAttr = function (a, d) {
          this.box ? this.box.attr(a, d) : (this.deferredAttr[a] = d);
        };
        h.prototype.css = function (a) {
          if (a) {
            var d = {};
            a = F(a);
            h.textProps.forEach(function (g) {
              "undefined" !== typeof a[g] && ((d[g] = a[g]), delete a[g]);
            });
            this.text.css(d);
            var g = "width" in d;
            "fontSize" in d || "fontWeight" in d
              ? this.updateTextPadding()
              : g && this.updateBoxSize();
          }
          return b.prototype.css.call(this, a);
        };
        h.prototype.destroy = function () {
          r(this.element, "mouseenter");
          r(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          b.prototype.destroy.call(this);
        };
        h.prototype.fillSetter = function (a, d) {
          a && (this.needsBox = !0);
          this.fill = a;
          this.boxAttr(d, a);
        };
        h.prototype.getBBox = function () {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          var a = this.padding,
            d = z(this.paddingLeft, a);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - d,
            y: this.bBox.y - a,
          };
        };
        h.prototype.getCrispAdjust = function () {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                2) /
                2;
        };
        h.prototype.heightSetter = function (a) {
          this.heightSetting = a;
        };
        h.prototype.onAdd = function () {
          var a = this.textStr;
          this.text.add(this);
          this.attr({ text: B(a) ? a : "", x: this.x, y: this.y });
          this.box &&
            B(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        };
        h.prototype.paddingSetter = function (a, d) {
          t(a)
            ? a !== this[d] && ((this[d] = a), this.updateTextPadding())
            : (this[d] = void 0);
        };
        h.prototype.rSetter = function (a, d) {
          this.boxAttr(d, a);
        };
        h.prototype.shadow = function (a) {
          a &&
            !this.renderer.styledMode &&
            (this.updateBoxSize(), this.box && this.box.shadow(a));
          return this;
        };
        h.prototype.strokeSetter = function (a, d) {
          this.stroke = a;
          this.boxAttr(d, a);
        };
        h.prototype["stroke-widthSetter"] = function (a, d) {
          a && (this.needsBox = !0);
          this["stroke-width"] = a;
          this.boxAttr(d, a);
        };
        h.prototype["text-alignSetter"] = function (a) {
          this.textAlign = a;
        };
        h.prototype.textSetter = function (a) {
          "undefined" !== typeof a && this.text.attr({ text: a });
          this.updateTextPadding();
        };
        h.prototype.updateBoxSize = function () {
          var a = this.text,
            d = a.element.style,
            g = {},
            m = this.padding,
            n = (this.bBox =
              (t(this.widthSetting) &&
                t(this.heightSetting) &&
                !this.textAlign) ||
              !B(a.textStr)
                ? h.emptyBBox
                : a.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || n.height || 0) + 2 * m;
          d = this.renderer.fontMetrics(d && d.fontSize, a);
          this.baselineOffset =
            m +
            Math.min((this.text.firstLineMetrics || d).b, n.height || Infinity);
          this.heightSetting &&
            (this.baselineOffset += (this.heightSetting - d.h) / 2);
          this.needsBox &&
            !a.textPath &&
            (this.box ||
              ((a = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              a.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className
                    ? " highcharts-" + this.className + "-box"
                    : "")
              ),
              a.add(this)),
            (a = this.getCrispAdjust()),
            (g.x = a),
            (g.y = (this.baseline ? -this.baselineOffset : 0) + a),
            (g.width = Math.round(this.width)),
            (g.height = Math.round(this.height)),
            this.box.attr(v(g, this.deferredAttr)),
            (this.deferredAttr = {}));
        };
        h.prototype.updateTextPadding = function () {
          var a = this.text;
          if (!a.textPath) {
            this.updateBoxSize();
            var d = this.baseline ? 0 : this.baselineOffset,
              g = z(this.paddingLeft, this.padding);
            B(this.widthSetting) &&
              this.bBox &&
              ("center" === this.textAlign || "right" === this.textAlign) &&
              (g +=
                { center: 0.5, right: 1 }[this.textAlign] *
                (this.widthSetting - this.bBox.width));
            if (g !== a.x || d !== a.y)
              a.attr("x", g),
                a.hasBoxWidthChanged && (this.bBox = a.getBBox(!0)),
                "undefined" !== typeof d && a.attr("y", d);
            a.x = g;
            a.y = d;
          }
        };
        h.prototype.widthSetter = function (a) {
          this.widthSetting = t(a) ? a : void 0;
        };
        h.prototype.getPaddedWidth = function () {
          var a = this.padding,
            d = z(this.paddingLeft, a);
          a = z(this.paddingRight, a);
          return (this.widthSetting || this.bBox.width || 0) + d + a;
        };
        h.prototype.xSetter = function (a) {
          this.x = a;
          this.alignFactor &&
            ((a -= this.alignFactor * this.getPaddedWidth()),
            (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(a);
          this.attr("translateX", this.xSetting);
        };
        h.prototype.ySetter = function (a) {
          this.ySetting = this.y = Math.round(a);
          this.attr("translateY", this.ySetting);
        };
        h.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
        h.textProps =
          "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(
            " "
          );
        return h;
      })(b);
    }
  );
  I(e, "Core/Renderer/SVG/Symbols.js", [e["Core/Utilities.js"]], function (b) {
    function e(b, e, p, h, a) {
      var d = [];
      if (a) {
        var g = a.start || 0,
          m = F(a.r, p);
        p = F(a.r, h || p);
        var n = (a.end || 0) - 0.001;
        h = a.innerR;
        var G = F(a.open, 0.001 > Math.abs((a.end || 0) - g - 2 * Math.PI)),
          J = Math.cos(g),
          x = Math.sin(g),
          C = Math.cos(n),
          u = Math.sin(n);
        g = F(a.longArc, 0.001 > n - g - Math.PI ? 0 : 1);
        d.push(
          ["M", b + m * J, e + p * x],
          ["A", m, p, 0, g, F(a.clockwise, 1), b + m * C, e + p * u]
        );
        v(h) &&
          d.push(
            G ? ["M", b + h * C, e + h * u] : ["L", b + h * C, e + h * u],
            [
              "A",
              h,
              h,
              0,
              g,
              v(a.clockwise) ? 1 - a.clockwise : 0,
              b + h * J,
              e + h * x,
            ]
          );
        G || d.push(["Z"]);
      }
      return d;
    }
    function y(b, e, p, h, a) {
      return a && a.r
        ? B(b, e, p, h, a)
        : [
            ["M", b, e],
            ["L", b + p, e],
            ["L", b + p, e + h],
            ["L", b, e + h],
            ["Z"],
          ];
    }
    function B(b, e, p, h, a) {
      a = (a && a.r) || 0;
      return [
        ["M", b + a, e],
        ["L", b + p - a, e],
        ["C", b + p, e, b + p, e, b + p, e + a],
        ["L", b + p, e + h - a],
        ["C", b + p, e + h, b + p, e + h, b + p - a, e + h],
        ["L", b + a, e + h],
        ["C", b, e + h, b, e + h, b, e + h - a],
        ["L", b, e + a],
        ["C", b, e, b, e, b + a, e],
      ];
    }
    var v = b.defined,
      t = b.isNumber,
      F = b.pick;
    return {
      arc: e,
      callout: function (b, e, p, h, a) {
        var d = Math.min((a && a.r) || 0, p, h),
          g = d + 6,
          m = a && a.anchorX;
        a = (a && a.anchorY) || 0;
        var n = B(b, e, p, h, { r: d });
        if (!t(m)) return n;
        b + m >= p
          ? a > e + g && a < e + h - g
            ? n.splice(
                3,
                1,
                ["L", b + p, a - 6],
                ["L", b + p + 6, a],
                ["L", b + p, a + 6],
                ["L", b + p, e + h - d]
              )
            : n.splice(
                3,
                1,
                ["L", b + p, h / 2],
                ["L", m, a],
                ["L", b + p, h / 2],
                ["L", b + p, e + h - d]
              )
          : 0 >= b + m
          ? a > e + g && a < e + h - g
            ? n.splice(
                7,
                1,
                ["L", b, a + 6],
                ["L", b - 6, a],
                ["L", b, a - 6],
                ["L", b, e + d]
              )
            : n.splice(
                7,
                1,
                ["L", b, h / 2],
                ["L", m, a],
                ["L", b, h / 2],
                ["L", b, e + d]
              )
          : a && a > h && m > b + g && m < b + p - g
          ? n.splice(
              5,
              1,
              ["L", m + 6, e + h],
              ["L", m, e + h + 6],
              ["L", m - 6, e + h],
              ["L", b + d, e + h]
            )
          : a &&
            0 > a &&
            m > b + g &&
            m < b + p - g &&
            n.splice(
              1,
              1,
              ["L", m - 6, e],
              ["L", m, e - 6],
              ["L", m + 6, e],
              ["L", p - d, e]
            );
        return n;
      },
      circle: function (b, r, p, h) {
        return e(b + p / 2, r + h / 2, p / 2, h / 2, {
          start: 0.5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1,
        });
      },
      diamond: function (b, e, p, h) {
        return [
          ["M", b + p / 2, e],
          ["L", b + p, e + h / 2],
          ["L", b + p / 2, e + h],
          ["L", b, e + h / 2],
          ["Z"],
        ];
      },
      rect: y,
      roundedRect: B,
      square: y,
      triangle: function (b, e, p, h) {
        return [
          ["M", b + p / 2, e],
          ["L", b + p, e + h],
          ["L", b, e + h],
          ["Z"],
        ];
      },
      "triangle-down": function (b, e, p, h) {
        return [["M", b, e], ["L", b + p, e], ["L", b + p / 2, e + h], ["Z"]];
      },
    };
  });
  I(
    e,
    "Core/Renderer/SVG/TextBuilder.js",
    [
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var K = e.doc,
        v = e.SVG_NS,
        t = e.win,
        F = y.attr,
        z = y.extend,
        r = y.fireEvent,
        p = y.isString,
        h = y.objectEach,
        a = y.pick;
      return (function () {
        function d(a) {
          var d = a.styles;
          this.renderer = a.renderer;
          this.svgElement = a;
          this.width = a.textWidth;
          this.textLineHeight = d && d.lineHeight;
          this.textOutline = d && d.textOutline;
          this.ellipsis = !(!d || "ellipsis" !== d.textOverflow);
          this.noWrap = !(!d || "nowrap" !== d.whiteSpace);
          this.fontSize = d && d.fontSize;
        }
        d.prototype.buildSVG = function () {
          var d = this.svgElement,
            m = d.element,
            n = d.renderer,
            h = a(d.textStr, "").toString(),
            e = -1 !== h.indexOf("<"),
            x = m.childNodes;
          n = this.width && !d.added && n.box;
          var C = /<br.*?>/g,
            u = [
              h,
              this.ellipsis,
              this.noWrap,
              this.textLineHeight,
              this.textOutline,
              this.fontSize,
              this.width,
            ].join();
          if (u !== d.textCache) {
            d.textCache = u;
            delete d.actualWidth;
            for (u = x.length; u--; ) m.removeChild(x[u]);
            e ||
            this.ellipsis ||
            this.width ||
            d.textPath ||
            (-1 !== h.indexOf(" ") && (!this.noWrap || C.test(h)))
              ? "" !== h &&
                (n && n.appendChild(m),
                (h = new b(h)),
                this.modifyTree(h.nodes),
                h.addToDOM(m),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (m.textContent || "").indexOf("\u2026") &&
                  d.attr(
                    "title",
                    this.unescapeEntities(d.textStr || "", ["&lt;", "&gt;"])
                  ),
                n && n.removeChild(m))
              : m.appendChild(K.createTextNode(this.unescapeEntities(h)));
            p(this.textOutline) &&
              d.applyTextOutline &&
              d.applyTextOutline(this.textOutline);
          }
        };
        d.prototype.modifyDOM = function () {
          var a = this,
            d = this.svgElement,
            b = F(d.element, "x");
          d.firstLineMetrics = void 0;
          for (var h; (h = d.element.firstChild); )
            if (/^[\s\u200B]*$/.test(h.textContent || " "))
              d.element.removeChild(h);
            else break;
          [].forEach.call(
            d.element.querySelectorAll("tspan.highcharts-br"),
            function (g, l) {
              g.nextSibling &&
                g.previousSibling &&
                (0 === l &&
                  1 === g.previousSibling.nodeType &&
                  (d.firstLineMetrics = d.renderer.fontMetrics(
                    void 0,
                    g.previousSibling
                  )),
                F(g, { dy: a.getLineHeight(g.nextSibling), x: b }));
            }
          );
          var e = this.width || 0;
          if (e) {
            var x = function (g, l) {
                var m = g.textContent || "",
                  f = m.replace(/([^\^])-/g, "$1- ").split(" "),
                  w =
                    !a.noWrap &&
                    (1 < f.length || 1 < d.element.childNodes.length),
                  k = a.getLineHeight(l),
                  D = 0,
                  c = d.actualWidth;
                if (a.ellipsis)
                  m &&
                    a.truncate(
                      g,
                      m,
                      void 0,
                      0,
                      Math.max(0, e - parseInt(a.fontSize || 12, 10)),
                      function (c, a) {
                        return c.substring(0, a) + "\u2026";
                      }
                    );
                else if (w) {
                  m = [];
                  for (w = []; l.firstChild && l.firstChild !== g; )
                    w.push(l.firstChild), l.removeChild(l.firstChild);
                  for (; f.length; )
                    f.length &&
                      !a.noWrap &&
                      0 < D &&
                      (m.push(g.textContent || ""),
                      (g.textContent = f.join(" ").replace(/- /g, "-"))),
                      a.truncate(
                        g,
                        void 0,
                        f,
                        0 === D ? c || 0 : 0,
                        e,
                        function (c, a) {
                          return f.slice(0, a).join(" ").replace(/- /g, "-");
                        }
                      ),
                      (c = d.actualWidth),
                      D++;
                  w.forEach(function (c) {
                    l.insertBefore(c, g);
                  });
                  m.forEach(function (c) {
                    l.insertBefore(K.createTextNode(c), g);
                    c = K.createElementNS(v, "tspan");
                    c.textContent = "\u200b";
                    F(c, { dy: k, x: b });
                    l.insertBefore(c, g);
                  });
                }
              },
              C = function (a) {
                [].slice.call(a.childNodes).forEach(function (l) {
                  l.nodeType === t.Node.TEXT_NODE
                    ? x(l, a)
                    : (-1 !== l.className.baseVal.indexOf("highcharts-br") &&
                        (d.actualWidth = 0),
                      C(l));
                });
              };
            C(d.element);
          }
        };
        d.prototype.getLineHeight = function (a) {
          var d;
          a = a.nodeType === t.Node.TEXT_NODE ? a.parentElement : a;
          this.renderer.styledMode ||
            (d =
              a && /(px|em)$/.test(a.style.fontSize)
                ? a.style.fontSize
                : this.fontSize || this.renderer.style.fontSize || 12);
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(d, a || this.svgElement.element).h;
        };
        d.prototype.modifyTree = function (a) {
          var d = this,
            g = function (b, m) {
              var h = b.attributes;
              h = void 0 === h ? {} : h;
              var n = b.children,
                u = b.style;
              u = void 0 === u ? {} : u;
              var l = b.tagName,
                A = d.renderer.styledMode;
              if ("b" === l || "strong" === l)
                A
                  ? (h["class"] = "highcharts-strong")
                  : (u.fontWeight = "bold");
              else if ("i" === l || "em" === l)
                A
                  ? (h["class"] = "highcharts-emphasized")
                  : (u.fontStyle = "italic");
              u && u.color && (u.fill = u.color);
              "br" === l
                ? ((h["class"] = "highcharts-br"),
                  (b.textContent = "\u200b"),
                  (m = a[m + 1]) &&
                    m.textContent &&
                    (m.textContent = m.textContent.replace(/^ +/gm, "")))
                : "a" === l &&
                  n &&
                  n.some(function (a) {
                    return "#text" === a.tagName;
                  }) &&
                  (b.children = [{ children: n, tagName: "tspan" }]);
              "#text" !== l && "a" !== l && (b.tagName = "tspan");
              z(b, { attributes: h, style: u });
              n &&
                n
                  .filter(function (a) {
                    return "#text" !== a.tagName;
                  })
                  .forEach(g);
            };
          a.forEach(g);
          r(this.svgElement, "afterModifyTree", { nodes: a });
        };
        d.prototype.truncate = function (a, d, b, h, e, x) {
          var g = this.svgElement,
            m = g.renderer,
            l = g.rotation,
            n = [],
            f = b ? 1 : 0,
            w = (d || b || "").length,
            k = w,
            D,
            c = function (c, f) {
              f = f || c;
              var k = a.parentNode;
              if (k && "undefined" === typeof n[f])
                if (k.getSubStringLength)
                  try {
                    n[f] = h + k.getSubStringLength(0, b ? f + 1 : f);
                  } catch (L) {
                    ("");
                  }
                else
                  m.getSpanWidth &&
                    ((a.textContent = x(d || b, c)),
                    (n[f] = h + m.getSpanWidth(g, a)));
              return n[f];
            };
          g.rotation = 0;
          var q = c(a.textContent.length);
          if (h + q > e) {
            for (; f <= w; )
              (k = Math.ceil((f + w) / 2)),
                b && (D = x(b, k)),
                (q = c(k, D && D.length - 1)),
                f === w ? (f = w + 1) : q > e ? (w = k - 1) : (f = k);
            0 === w
              ? (a.textContent = "")
              : (d && w === d.length - 1) ||
                (a.textContent = D || x(d || b, k));
          }
          b && b.splice(0, k);
          g.actualWidth = q;
          g.rotation = l;
        };
        d.prototype.unescapeEntities = function (a, d) {
          h(this.renderer.escapes, function (g, b) {
            (d && -1 !== d.indexOf(g)) ||
              (a = a.toString().replace(new RegExp(g, "g"), b));
          });
          return a;
        };
        return d;
      })();
    }
  );
  I(
    e,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Renderer/RendererRegistry.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Renderer/SVG/SVGLabel.js"],
      e["Core/Renderer/SVG/Symbols.js"],
      e["Core/Renderer/SVG/TextBuilder.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F, z, r) {
      var p = y.charts,
        h = y.deg2rad,
        a = y.doc,
        d = y.isFirefox,
        g = y.isMS,
        m = y.isWebKit,
        n = y.noop,
        G = y.SVG_NS,
        J = y.symbolSizes,
        x = y.win,
        C = r.addEvent,
        u = r.attr,
        l = r.createElement,
        A = r.css,
        f = r.defined,
        w = r.destroyObjectProperties,
        k = r.extend,
        D = r.isArray,
        c = r.isNumber,
        q = r.isObject,
        E = r.isString,
        H = r.merge,
        Q = r.pick,
        L = r.pInt,
        K = r.uniqueKey,
        V;
      y = (function () {
        function n(c, a, f, k, d, q, l) {
          this.width =
            this.url =
            this.style =
            this.isSVG =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(c, a, f, k, d, q, l);
        }
        n.prototype.init = function (c, f, k, q, l, g, b) {
          var w = this.createElement("svg").attr({
              version: "1.1",
              class: "highcharts-root",
            }),
            D = w.element;
          b || w.css(this.getStyle(q));
          c.appendChild(D);
          u(c, "dir", "ltr");
          -1 === c.innerHTML.indexOf("xmlns") && u(D, "xmlns", this.SVG_NS);
          this.isSVG = !0;
          this.box = D;
          this.boxWrapper = w;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(
              a.createTextNode("Created with Highcharts 10.2.1")
            );
          this.defs = this.createElement("defs").add();
          this.allowHTML = g;
          this.forExport = l;
          this.styledMode = b;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(f, k, !1);
          var n;
          d &&
            c.getBoundingClientRect &&
            ((f = function () {
              A(c, { left: 0, top: 0 });
              n = c.getBoundingClientRect();
              A(c, {
                left: Math.ceil(n.left) - n.left + "px",
                top: Math.ceil(n.top) - n.top + "px",
              });
            }),
            f(),
            (this.unSubPixelFix = C(x, "resize", f)));
        };
        n.prototype.definition = function (c) {
          return new b([c]).addToDOM(this.defs.element);
        };
        n.prototype.getReferenceURL = function () {
          if ((d || m) && a.getElementsByTagName("base").length) {
            if (!f(V)) {
              var c = K();
              c = new b([
                {
                  tagName: "svg",
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: { id: c },
                          children: [
                            {
                              tagName: "rect",
                              attributes: { width: 4, height: 4 },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": "url(#".concat(c, ")"),
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(a.body);
              A(c, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              var k = a.elementFromPoint(6, 6);
              V = "hitme" === (k && k.id);
              a.body.removeChild(c);
            }
            if (V)
              return x.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        };
        n.prototype.getStyle = function (c) {
          return (this.style = k(
            {
              fontFamily:
                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              fontSize: "12px",
            },
            c
          ));
        };
        n.prototype.setStyle = function (c) {
          this.boxWrapper.css(this.getStyle(c));
        };
        n.prototype.isHidden = function () {
          return !this.boxWrapper.getBBox().width;
        };
        n.prototype.destroy = function () {
          var c = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          w(this.gradients || {});
          this.gradients = null;
          c && (this.defs = c.destroy());
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        };
        n.prototype.createElement = function (c) {
          var a = new this.Element();
          a.init(this, c);
          return a;
        };
        n.prototype.getRadialAttr = function (c, a) {
          return {
            cx: c[0] - c[2] / 2 + (a.cx || 0) * c[2],
            cy: c[1] - c[2] / 2 + (a.cy || 0) * c[2],
            r: (a.r || 0) * c[2],
          };
        };
        n.prototype.buildText = function (c) {
          new z(c).buildSVG();
        };
        n.prototype.getContrast = function (c) {
          c = e.parse(c).rgba.map(function (c) {
            c /= 255;
            return 0.03928 >= c
              ? c / 12.92
              : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          c = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
          return 1.05 / (c + 0.05) > (c + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
        };
        n.prototype.button = function (c, a, f, d, l, w, D, n, m, h) {
          void 0 === l && (l = {});
          var E = this.label(c, a, f, m, void 0, void 0, h, void 0, "button"),
            u = this.styledMode;
          c = l.states || {};
          var A = 0;
          l = H(l);
          delete l.states;
          var P = H(
            { color: "#333333", cursor: "pointer", fontWeight: "normal" },
            l.style
          );
          delete l.style;
          var e = b.filterUserAttributes(l);
          E.attr(H({ padding: 8, r: 2 }, e));
          if (!u) {
            e = H({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 }, e);
            w = H(
              e,
              { fill: "#e6e6e6" },
              b.filterUserAttributes(w || c.hover || {})
            );
            var x = w.style;
            delete w.style;
            D = H(
              e,
              {
                fill: "#e6ebf5",
                style: { color: "#000000", fontWeight: "bold" },
              },
              b.filterUserAttributes(D || c.select || {})
            );
            var G = D.style;
            delete D.style;
            n = H(
              e,
              { style: { color: "#cccccc" } },
              b.filterUserAttributes(n || c.disabled || {})
            );
            var R = n.style;
            delete n.style;
          }
          C(E.element, g ? "mouseover" : "mouseenter", function () {
            3 !== A && E.setState(1);
          });
          C(E.element, g ? "mouseout" : "mouseleave", function () {
            3 !== A && E.setState(A);
          });
          E.setState = function (c) {
            1 !== c && (E.state = A = c);
            E.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/
            ).addClass(
              "highcharts-button-" +
                ["normal", "hover", "pressed", "disabled"][c || 0]
            );
            u ||
              (E.attr([e, w, D, n][c || 0]),
              (c = [P, x, G, R][c || 0]),
              q(c) && E.css(c));
          };
          u || E.attr(e).css(k({ cursor: "default" }, P));
          return E.on("touchstart", function (c) {
            return c.stopPropagation();
          }).on("click", function (c) {
            3 !== A && d.call(E, c);
          });
        };
        n.prototype.crispLine = function (c, a, k) {
          void 0 === k && (k = "round");
          var d = c[0],
            q = c[1];
          f(d[1]) &&
            d[1] === q[1] &&
            (d[1] = q[1] = Math[k](d[1]) - (a % 2) / 2);
          f(d[2]) &&
            d[2] === q[2] &&
            (d[2] = q[2] = Math[k](d[2]) + (a % 2) / 2);
          return c;
        };
        n.prototype.path = function (c) {
          var a = this.styledMode ? {} : { fill: "none" };
          D(c) ? (a.d = c) : q(c) && k(a, c);
          return this.createElement("path").attr(a);
        };
        n.prototype.circle = function (c, a, f) {
          c = q(c) ? c : "undefined" === typeof c ? {} : { x: c, y: a, r: f };
          a = this.createElement("circle");
          a.xSetter = a.ySetter = function (c, a, f) {
            f.setAttribute("c" + a, c);
          };
          return a.attr(c);
        };
        n.prototype.arc = function (c, a, f, k, d, l) {
          q(c)
            ? ((k = c), (a = k.y), (f = k.r), (c = k.x))
            : (k = { innerR: k, start: d, end: l });
          c = this.symbol("arc", c, a, f, f, k);
          c.r = f;
          return c;
        };
        n.prototype.rect = function (c, a, f, k, d, l) {
          d = q(c) ? c.r : d;
          var g = this.createElement("rect");
          c = q(c)
            ? c
            : "undefined" === typeof c
            ? {}
            : { x: c, y: a, width: Math.max(f, 0), height: Math.max(k, 0) };
          this.styledMode ||
            ("undefined" !== typeof l &&
              ((c["stroke-width"] = l), (c = g.crisp(c))),
            (c.fill = "none"));
          d && (c.r = d);
          g.rSetter = function (c, a, f) {
            g.r = c;
            u(f, { rx: c, ry: c });
          };
          g.rGetter = function () {
            return g.r || 0;
          };
          return g.attr(c);
        };
        n.prototype.setSize = function (c, a, f) {
          this.width = c;
          this.height = a;
          this.boxWrapper.animate(
            { width: c, height: a },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: Q(f, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        };
        n.prototype.g = function (c) {
          var a = this.createElement("g");
          return c ? a.attr({ class: "highcharts-" + c }) : a;
        };
        n.prototype.image = function (a, f, k, d, q, l) {
          var g = { preserveAspectRatio: "none" },
            b = function (c, a) {
              c.setAttributeNS
                ? c.setAttributeNS("http://www.w3.org/1999/xlink", "href", a)
                : c.setAttribute("hc-svg-href", a);
            };
          c(f) && (g.x = f);
          c(k) && (g.y = k);
          c(d) && (g.width = d);
          c(q) && (g.height = q);
          var w = this.createElement("image").attr(g);
          f = function (c) {
            b(w.element, a);
            l.call(w, c);
          };
          l
            ? (b(
                w.element,
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              ),
              (k = new x.Image()),
              C(k, "load", f),
              (k.src = a),
              k.complete && f({}))
            : b(w.element, a);
          return w;
        };
        n.prototype.symbol = function (c, d, q, g, w, b) {
          var D = this,
            n = /^url\((.*?)\)$/,
            m = n.test(c),
            h = !m && (this.symbols[c] ? c : "circle"),
            E = h && this.symbols[h],
            u;
          if (E) {
            "number" === typeof d &&
              (u = E.call(
                this.symbols,
                Math.round(d || 0),
                Math.round(q || 0),
                g || 0,
                w || 0,
                b
              ));
            var P = this.path(u);
            D.styledMode || P.attr("fill", "none");
            k(P, { symbolName: h || void 0, x: d, y: q, width: g, height: w });
            b && k(P, b);
          } else if (m) {
            var e = c.match(n)[1];
            var H = (P = this.image(e));
            H.imgwidth = Q(J[e] && J[e].width, b && b.width);
            H.imgheight = Q(J[e] && J[e].height, b && b.height);
            var x = function (c) {
              return c.attr({ width: c.width, height: c.height });
            };
            ["width", "height"].forEach(function (c) {
              H[c + "Setter"] = function (c, a) {
                var k = this["img" + a];
                this[a] = c;
                f(k) &&
                  (b &&
                    "within" === b.backgroundSize &&
                    this.width &&
                    this.height &&
                    (k = Math.round(
                      k *
                        Math.min(
                          this.width / this.imgwidth,
                          this.height / this.imgheight
                        )
                    )),
                  this.element && this.element.setAttribute(a, k),
                  this.alignByTranslate ||
                    ((c = ((this[a] || 0) - k) / 2),
                    this.attr(
                      "width" === a ? { translateX: c } : { translateY: c }
                    )));
              };
            });
            f(d) && H.attr({ x: d, y: q });
            H.isImg = !0;
            f(H.imgwidth) && f(H.imgheight)
              ? x(H)
              : (H.attr({ width: 0, height: 0 }),
                l("img", {
                  onload: function () {
                    var c = p[D.chartIndex];
                    0 === this.width &&
                      (A(this, { position: "absolute", top: "-999em" }),
                      a.body.appendChild(this));
                    J[e] = { width: this.width, height: this.height };
                    H.imgwidth = this.width;
                    H.imgheight = this.height;
                    H.element && x(H);
                    this.parentNode && this.parentNode.removeChild(this);
                    D.imgCount--;
                    if (!D.imgCount && c && !c.hasLoaded) c.onload();
                  },
                  src: e,
                }),
                this.imgCount++);
          }
          return P;
        };
        n.prototype.clipRect = function (c, a, f, k) {
          var d = K() + "-",
            q = this.createElement("clipPath").attr({ id: d }).add(this.defs);
          c = this.rect(c, a, f, k, 0).add(q);
          c.id = d;
          c.clipPath = q;
          c.count = 0;
          return c;
        };
        n.prototype.text = function (c, a, k, d) {
          var q = {};
          if (d && (this.allowHTML || !this.forExport))
            return this.html(c, a, k);
          q.x = Math.round(a || 0);
          k && (q.y = Math.round(k));
          f(c) && (q.text = c);
          c = this.createElement("text").attr(q);
          if (!d || (this.forExport && !this.allowHTML))
            c.xSetter = function (c, a, f) {
              for (
                var k = f.getElementsByTagName("tspan"),
                  d = f.getAttribute(a),
                  q = 0,
                  l;
                q < k.length;
                q++
              )
                (l = k[q]), l.getAttribute(a) === d && l.setAttribute(a, c);
              f.setAttribute(a, c);
            };
          return c;
        };
        n.prototype.fontMetrics = function (c, a) {
          c =
            (!this.styledMode && /px/.test(c)) || !x.getComputedStyle
              ? c ||
                (a && a.style && a.style.fontSize) ||
                (this.style && this.style.fontSize)
              : a && v.prototype.getStyle.call(a, "font-size");
          c = /px/.test(c) ? L(c) : 12;
          a = 24 > c ? c + 3 : Math.round(1.2 * c);
          return { h: a, b: Math.round(0.8 * a), f: c };
        };
        n.prototype.rotCorr = function (c, a, f) {
          var k = c;
          a && f && (k = Math.max(k * Math.cos(a * h), 4));
          return { x: (-c / 3) * Math.sin(a * h), y: k };
        };
        n.prototype.pathToSegments = function (a) {
          for (
            var f = [],
              k = [],
              d = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 },
              q = 0;
            q < a.length;
            q++
          )
            E(k[0]) &&
              c(a[q]) &&
              k.length === d[k[0].toUpperCase()] &&
              a.splice(q, 0, k[0].replace("M", "L").replace("m", "l")),
              "string" === typeof a[q] &&
                (k.length && f.push(k.slice(0)), (k.length = 0)),
              k.push(a[q]);
          f.push(k.slice(0));
          return f;
        };
        n.prototype.label = function (c, a, f, k, d, q, l, g, b) {
          return new t(this, c, a, f, k, d, q, l, g, b);
        };
        n.prototype.alignElements = function () {
          this.alignedObjects.forEach(function (c) {
            return c.align();
          });
        };
        return n;
      })();
      k(y.prototype, {
        Element: v,
        SVG_NS: G,
        escapes: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        },
        symbols: F,
        draw: n,
      });
      B.registerRendererType("svg", y, !0);
      ("");
      return y;
    }
  );
  I(
    e,
    "Core/Renderer/HTML/HTMLElement.js",
    [
      e["Core/Globals.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var K =
          (this && this.__extends) ||
          (function () {
            var a = function (d, g) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, d) {
                    a.__proto__ = d;
                  }) ||
                function (a, d) {
                  for (var g in d) d.hasOwnProperty(g) && (a[g] = d[g]);
                };
              return a(d, g);
            };
            return function (d, g) {
              function b() {
                this.constructor = d;
              }
              a(d, g);
              d.prototype =
                null === g
                  ? Object.create(g)
                  : ((b.prototype = g.prototype), new b());
            };
          })(),
        v = b.isFirefox,
        t = b.isMS,
        F = b.isWebKit,
        z = b.win,
        r = y.css,
        p = y.defined,
        h = y.extend,
        a = y.pick,
        d = y.pInt;
      return (function (g) {
        function b() {
          return (null !== g && g.apply(this, arguments)) || this;
        }
        K(b, g);
        b.compose = function (a) {
          if (-1 === b.composedClasses.indexOf(a)) {
            b.composedClasses.push(a);
            var d = b.prototype,
              g = a.prototype;
            g.getSpanCorrection = d.getSpanCorrection;
            g.htmlCss = d.htmlCss;
            g.htmlGetBBox = d.htmlGetBBox;
            g.htmlUpdateTransform = d.htmlUpdateTransform;
            g.setSpanRotation = d.setSpanRotation;
          }
          return a;
        };
        b.prototype.getSpanCorrection = function (a, d, g) {
          this.xCorr = -a * g;
          this.yCorr = -d;
        };
        b.prototype.htmlCss = function (d) {
          var g = "SPAN" === this.element.tagName && d && "width" in d,
            b = a(g && d.width, void 0);
          if (g) {
            delete d.width;
            this.textWidth = b;
            var n = !0;
          }
          d &&
            "ellipsis" === d.textOverflow &&
            ((d.whiteSpace = "nowrap"), (d.overflow = "hidden"));
          this.styles = h(this.styles, d);
          r(this.element, d);
          n && this.htmlUpdateTransform();
          return this;
        };
        b.prototype.htmlGetBBox = function () {
          var a = this.element;
          return {
            x: a.offsetLeft,
            y: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        };
        b.prototype.htmlUpdateTransform = function () {
          if (this.added) {
            var a = this.renderer,
              g = this.element,
              b = this.translateX || 0,
              h = this.translateY || 0,
              m = this.x || 0,
              u = this.y || 0,
              l = this.textAlign || "left",
              A = { left: 0, center: 0.5, right: 1 }[l],
              f = this.styles;
            f = f && f.whiteSpace;
            r(g, { marginLeft: b, marginTop: h });
            !a.styledMode &&
              this.shadows &&
              this.shadows.forEach(function (c) {
                r(c, { marginLeft: b + 1, marginTop: h + 1 });
              });
            this.inverted &&
              [].forEach.call(g.childNodes, function (c) {
                a.invertChild(c, g);
              });
            if ("SPAN" === g.tagName) {
              var w = this.rotation,
                k = this.textWidth && d(this.textWidth),
                D = [w, l, g.innerHTML, this.textWidth, this.textAlign].join(),
                c = void 0;
              c = !1;
              if (k !== this.oldTextWidth) {
                if (this.textPxLength) var q = this.textPxLength;
                else
                  r(g, { width: "", whiteSpace: f || "nowrap" }),
                    (q = g.offsetWidth);
                (k > this.oldTextWidth || q > k) &&
                  (/[ \-]/.test(g.textContent || g.innerText) ||
                    "ellipsis" === g.style.textOverflow) &&
                  (r(g, {
                    width: q > k || w ? k + "px" : "auto",
                    display: "block",
                    whiteSpace: f || "normal",
                  }),
                  (this.oldTextWidth = k),
                  (c = !0));
              }
              this.hasBoxWidthChanged = c;
              D !== this.cTT &&
                ((c = a.fontMetrics(g.style.fontSize, g).b),
                !p(w) ||
                  (w === (this.oldRotation || 0) && l === this.oldAlign) ||
                  this.setSpanRotation(w, A, c),
                this.getSpanCorrection(
                  (!p(w) && this.textPxLength) || g.offsetWidth,
                  c,
                  A,
                  w,
                  l
                ));
              r(g, {
                left: m + (this.xCorr || 0) + "px",
                top: u + (this.yCorr || 0) + "px",
              });
              this.cTT = D;
              this.oldRotation = w;
              this.oldAlign = l;
            }
          } else this.alignOnAdd = !0;
        };
        b.prototype.setSpanRotation = function (a, d, g) {
          var b = {},
            h =
              t && !/Edge/.test(z.navigator.userAgent)
                ? "-ms-transform"
                : F
                ? "-webkit-transform"
                : v
                ? "MozTransform"
                : z.opera
                ? "-o-transform"
                : void 0;
          h &&
            ((b[h] = b.transform = "rotate(" + a + "deg)"),
            (b[h + (v ? "Origin" : "-origin")] = b.transformOrigin =
              100 * d + "% " + g + "px"),
            r(this.element, b));
        };
        b.composedClasses = [];
        return b;
      })(e);
    }
  );
  I(
    e,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (h, a) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, g) {
                    a.__proto__ = g;
                  }) ||
                function (a, g) {
                  for (var d in g) g.hasOwnProperty(d) && (a[d] = g[d]);
                };
              return b(h, a);
            };
            return function (h, a) {
              function d() {
                this.constructor = h;
              }
              b(h, a);
              h.prototype =
                null === a
                  ? Object.create(a)
                  : ((d.prototype = a.prototype), new d());
            };
          })(),
        t = B.attr,
        K = B.createElement,
        z = B.extend,
        r = B.pick;
      return (function (p) {
        function h() {
          return (null !== p && p.apply(this, arguments)) || this;
        }
        v(h, p);
        h.compose = function (a) {
          -1 === h.composedClasses.indexOf(a) &&
            (h.composedClasses.push(a), (a.prototype.html = h.prototype.html));
          return a;
        };
        h.prototype.html = function (a, d, g) {
          var h = this.createElement("span"),
            n = h.element,
            p = h.renderer,
            J = p.isSVG,
            x = function (a, d) {
              ["opacity", "visibility"].forEach(function (l) {
                a[l + "Setter"] = function (g, f, b) {
                  var k = a.div ? a.div.style : d;
                  e.prototype[l + "Setter"].call(this, g, f, b);
                  k && (k[f] = g);
                };
              });
              a.addedSetters = !0;
            };
          h.textSetter = function (a) {
            a !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              b.setElementHTML(this.element, r(a, "")),
              (this.textStr = a),
              (h.doTransform = !0));
          };
          J && x(h, h.element.style);
          h.xSetter =
            h.ySetter =
            h.alignSetter =
            h.rotationSetter =
              function (a, d) {
                "align" === d ? (h.alignValue = h.textAlign = a) : (h[d] = a);
                h.doTransform = !0;
              };
          h.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          h.attr({ text: a, x: Math.round(d), y: Math.round(g) }).css({
            position: "absolute",
          });
          p.styledMode ||
            h.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          n.style.whiteSpace = "nowrap";
          h.css = h.htmlCss;
          J &&
            (h.add = function (a) {
              var d = p.box.parentNode,
                g = [];
              if ((this.parentGroup = a)) {
                var b = a.div;
                if (!b) {
                  for (; a; ) g.push(a), (a = a.parentGroup);
                  g.reverse().forEach(function (a) {
                    function f(f, k) {
                      a[k] = f;
                      "translateX" === k
                        ? (c.left = f + "px")
                        : (c.top = f + "px");
                      a.doTransform = !0;
                    }
                    var k = t(a.element, "class"),
                      l = a.styles || {};
                    b = a.div =
                      a.div ||
                      K(
                        "div",
                        k ? { className: k } : void 0,
                        {
                          position: "absolute",
                          left: (a.translateX || 0) + "px",
                          top: (a.translateY || 0) + "px",
                          display: a.display,
                          opacity: a.opacity,
                          cursor: l.cursor,
                          pointerEvents: l.pointerEvents,
                          visibility: a.visibility,
                        },
                        b || d
                      );
                    var c = b.style;
                    z(a, {
                      classSetter: (function (c) {
                        return function (a) {
                          this.element.setAttribute("class", a);
                          c.className = a;
                        };
                      })(b),
                      on: function () {
                        g[0].div &&
                          h.on.apply(
                            { element: g[0].div, onEvents: a.onEvents },
                            arguments
                          );
                        return a;
                      },
                      translateXSetter: f,
                      translateYSetter: f,
                    });
                    a.addedSetters || x(a);
                  });
                }
              } else b = d;
              b.appendChild(n);
              h.added = !0;
              h.alignOnAdd && h.htmlUpdateTransform();
              return h;
            });
          return h;
        };
        h.composedClasses = [];
        return h;
      })(y);
    }
  );
  I(e, "Core/Axis/AxisDefaults.js", [], function () {
    var b;
    (function (b) {
      b.defaultXAxisOptions = {
        alignTicks: !0,
        allowDecimals: void 0,
        panningEnabled: !0,
        zIndex: 2,
        zoomEnabled: !0,
        dateTimeLabelFormats: {
          millisecond: { main: "%H:%M:%S.%L", range: !1 },
          second: { main: "%H:%M:%S", range: !1 },
          minute: { main: "%H:%M", range: !1 },
          hour: { main: "%H:%M", range: !1 },
          day: { main: "%e. %b" },
          week: { main: "%e. %b" },
          month: { main: "%b '%y" },
          year: { main: "%Y" },
        },
        endOnTick: !1,
        gridLineDashStyle: "Solid",
        gridZIndex: 1,
        labels: {
          autoRotation: void 0,
          autoRotationLimit: 80,
          distance: void 0,
          enabled: !0,
          indentation: 10,
          overflow: "justify",
          padding: 5,
          reserveSpace: void 0,
          rotation: void 0,
          staggerLines: 0,
          step: 0,
          useHTML: !1,
          x: 0,
          zIndex: 7,
          style: { color: "#666666", cursor: "default", fontSize: "11px" },
        },
        maxPadding: 0.01,
        minorGridLineDashStyle: "Solid",
        minorTickLength: 2,
        minorTickPosition: "outside",
        minPadding: 0.01,
        offset: void 0,
        opposite: !1,
        reversed: void 0,
        reversedStacks: !1,
        showEmpty: !0,
        showFirstLabel: !0,
        showLastLabel: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: "between",
        tickPosition: "outside",
        title: {
          align: "middle",
          rotation: 0,
          useHTML: !1,
          x: 0,
          y: 0,
          style: { color: "#666666" },
        },
        type: "linear",
        uniqueNames: !0,
        visible: !0,
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#ccd6eb",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        gridLineWidth: void 0,
        tickColor: "#ccd6eb",
      };
      b.defaultYAxisOptions = {
        reversedStacks: !0,
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: -8 },
        startOnTick: !0,
        title: { rotation: 270, text: "Values" },
        stackLabels: {
          animation: {},
          allowOverlap: !1,
          enabled: !1,
          crop: !0,
          overflow: "justify",
          formatter: function () {
            var b = this.axis.chart.numberFormatter;
            return b(this.total || 0, -1);
          },
          style: {
            color: "#000000",
            fontSize: "11px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      };
      b.defaultLeftAxisOptions = {
        labels: { x: -15 },
        title: { rotation: 270 },
      };
      b.defaultRightAxisOptions = {
        labels: { x: 15 },
        title: { rotation: 90 },
      };
      b.defaultBottomAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
      b.defaultTopAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
    })(b || (b = {}));
    return b;
  });
  I(e, "Core/Foundation.js", [e["Core/Utilities.js"]], function (b) {
    var e = b.addEvent,
      y = b.isFunction,
      B = b.objectEach,
      v = b.removeEvent,
      t;
    (function (b) {
      b.registerEventOptions = function (b, r) {
        b.eventOptions = b.eventOptions || {};
        B(r.events, function (p, h) {
          b.eventOptions[h] !== p &&
            (b.eventOptions[h] &&
              (v(b, h, b.eventOptions[h]), delete b.eventOptions[h]),
            y(p) && ((b.eventOptions[h] = p), e(b, h, p)));
        });
      };
    })(t || (t = {}));
    return t;
  });
  I(
    e,
    "Core/Axis/Tick.js",
    [
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var K = e.deg2rad,
        v = y.clamp,
        t = y.correctFloat,
        F = y.defined,
        z = y.destroyObjectProperties,
        r = y.extend,
        p = y.fireEvent,
        h = y.isNumber,
        a = y.merge,
        d = y.objectEach,
        g = y.pick;
      e = (function () {
        function m(a, d, g, b, h) {
          this.isNewLabel = this.isNew = !0;
          this.axis = a;
          this.pos = d;
          this.type = g || "";
          this.parameters = h || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          p(this, "init");
          g || b || this.addLabel();
        }
        m.prototype.addLabel = function () {
          var a = this,
            d = a.axis,
            m = d.options,
            e = d.chart,
            C = d.categories,
            u = d.logarithmic,
            l = d.names,
            A = a.pos,
            f = g(a.options && a.options.labels, m.labels),
            w = d.tickPositions,
            k = A === w[0],
            D = A === w[w.length - 1],
            c = (!f.step || 1 === f.step) && 1 === d.tickInterval;
          w = w.info;
          var q = a.label,
            E;
          C = this.parameters.category || (C ? g(C[A], l[A], A) : A);
          u && h(C) && (C = t(u.lin2log(C)));
          if (d.dateTime)
            if (w) {
              var H = e.time.resolveDTLFormat(
                m.dateTimeLabelFormats[
                  (!m.grid && w.higherRanks[A]) || w.unitName
                ]
              );
              var Q = H.main;
            } else
              h(C) &&
                (Q = d.dateTime.getXDateFormat(
                  C,
                  m.dateTimeLabelFormats || {}
                ));
          a.isFirst = k;
          a.isLast = D;
          var L = {
            axis: d,
            chart: e,
            dateTimeLabelFormat: Q,
            isFirst: k,
            isLast: D,
            pos: A,
            tick: a,
            tickPositionInfo: w,
            value: C,
          };
          p(this, "labelFormat", L);
          var v = function (c) {
            return f.formatter
              ? f.formatter.call(c, c)
              : f.format
              ? ((c.text = d.defaultLabelFormatter.call(c)),
                b.format(f.format, c, e))
              : d.defaultLabelFormatter.call(c, c);
          };
          m = v.call(L, L);
          var z = H && H.list;
          a.shortenLabel = z
            ? function () {
                for (E = 0; E < z.length; E++)
                  if (
                    (r(L, { dateTimeLabelFormat: z[E] }),
                    q.attr({ text: v.call(L, L) }),
                    q.getBBox().width < d.getSlotWidth(a) - 2 * f.padding)
                  )
                    return;
                q.attr({ text: "" });
              }
            : void 0;
          c && d._addedPlotLB && a.moveLabel(m, f);
          F(q) || a.movedLabel
            ? q &&
              q.textStr !== m &&
              !c &&
              (!q.textWidth ||
                f.style.width ||
                q.styles.width ||
                q.css({ width: null }),
              q.attr({ text: m }),
              (q.textPxLength = q.getBBox().width))
            : ((a.label = q = a.createLabel({ x: 0, y: 0 }, m, f)),
              (a.rotation = 0));
        };
        m.prototype.createLabel = function (d, g, b) {
          var h = this.axis,
            m = h.chart;
          if (
            (d =
              F(g) && b.enabled
                ? m.renderer.text(g, d.x, d.y, b.useHTML).add(h.labelGroup)
                : null)
          )
            m.styledMode || d.css(a(b.style)),
              (d.textPxLength = d.getBBox().width);
          return d;
        };
        m.prototype.destroy = function () {
          z(this, this.axis);
        };
        m.prototype.getPosition = function (a, d, g, b) {
          var h = this.axis,
            m = h.chart,
            l = (b && m.oldChartHeight) || m.chartHeight;
          a = {
            x: a
              ? t(h.translate(d + g, void 0, void 0, b) + h.transB)
              : h.left +
                h.offset +
                (h.opposite
                  ? ((b && m.oldChartWidth) || m.chartWidth) - h.right - h.left
                  : 0),
            y: a
              ? l - h.bottom + h.offset - (h.opposite ? h.height : 0)
              : t(l - h.translate(d + g, void 0, void 0, b) - h.transB),
          };
          a.y = v(a.y, -1e5, 1e5);
          p(this, "afterGetPosition", { pos: a });
          return a;
        };
        m.prototype.getLabelPosition = function (a, d, g, b, h, m, l, A) {
          var f = this.axis,
            w = f.transA,
            k =
              f.isLinked && f.linkedParent
                ? f.linkedParent.reversed
                : f.reversed,
            D = f.staggerLines,
            c = f.tickRotCorr || { x: 0, y: 0 },
            q =
              b || f.reserveSpaceDefault
                ? 0
                : -f.labelOffset * ("center" === f.labelAlign ? 0.5 : 1),
            E = {};
          g =
            0 === f.side
              ? g.rotation
                ? -8
                : -g.getBBox().height
              : 2 === f.side
              ? c.y + 8
              : Math.cos(g.rotation * K) * (c.y - g.getBBox(!1, 0).height / 2);
          F(h.y) && (g = 0 === f.side && f.horiz ? h.y + g : h.y);
          a = a + h.x + q + c.x - (m && b ? m * w * (k ? -1 : 1) : 0);
          d = d + g - (m && !b ? m * w * (k ? 1 : -1) : 0);
          D &&
            ((b = (l / (A || 1)) % D),
            f.opposite && (b = D - b - 1),
            (d += (f.labelOffset / D) * b));
          E.x = a;
          E.y = Math.round(d);
          p(this, "afterGetLabelPosition", {
            pos: E,
            tickmarkOffset: m,
            index: l,
          });
          return E;
        };
        m.prototype.getLabelSize = function () {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
            : 0;
        };
        m.prototype.getMarkPath = function (a, d, g, b, h, m) {
          return m.crispLine(
            [
              ["M", a, d],
              ["L", a + (h ? 0 : -g), d + (h ? g : 0)],
            ],
            b
          );
        };
        m.prototype.handleOverflow = function (a) {
          var d = this.axis,
            b = d.options.labels,
            h = a.x,
            m = d.chart.chartWidth,
            n = d.chart.spacing,
            l = g(d.labelLeft, Math.min(d.pos, n[3]));
          n = g(
            d.labelRight,
            Math.max(d.isRadial ? 0 : d.pos + d.len, m - n[1])
          );
          var A = this.label,
            f = this.rotation,
            w = { left: 0, center: 0.5, right: 1 }[
              d.labelAlign || A.attr("align")
            ],
            k = A.getBBox().width,
            D = d.getSlotWidth(this),
            c = {},
            q = D,
            E = 1,
            e;
          if (f || "justify" !== b.overflow)
            0 > f && h - w * k < l
              ? (e = Math.round(h / Math.cos(f * K) - l))
              : 0 < f &&
                h + w * k > n &&
                (e = Math.round((m - h) / Math.cos(f * K)));
          else if (
            ((m = h + (1 - w) * k),
            h - w * k < l
              ? (q = a.x + q * (1 - w) - l)
              : m > n && ((q = n - a.x + q * w), (E = -1)),
            (q = Math.min(D, q)),
            q < D &&
              "center" === d.labelAlign &&
              (a.x += E * (D - q - w * (D - Math.min(k, q)))),
            k > q || (d.autoRotation && (A.styles || {}).width))
          )
            e = q;
          e &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((c.width = Math.floor(e) + "px"),
                (b.style || {}).textOverflow || (c.textOverflow = "ellipsis"),
                A.css(c)));
        };
        m.prototype.moveLabel = function (a, g) {
          var b = this,
            h = b.label,
            m = b.axis,
            n = m.reversed,
            l = !1;
          h && h.textStr === a
            ? ((b.movedLabel = h), (l = !0), delete b.label)
            : d(m.ticks, function (f) {
                l ||
                  f.isNew ||
                  f === b ||
                  !f.label ||
                  f.label.textStr !== a ||
                  ((b.movedLabel = f.label),
                  (l = !0),
                  (f.labelPos = b.movedLabel.xy),
                  delete f.label);
              });
          if (!l && (b.labelPos || h)) {
            var A = b.labelPos || h.xy;
            h = m.horiz ? (n ? 0 : m.width + m.left) : A.x;
            m = m.horiz ? A.y : n ? m.width + m.left : 0;
            b.movedLabel = b.createLabel({ x: h, y: m }, a, g);
            b.movedLabel && b.movedLabel.attr({ opacity: 0 });
          }
        };
        m.prototype.render = function (a, d, b) {
          var h = this.axis,
            m = h.horiz,
            n = this.pos,
            l = g(this.tickmarkOffset, h.tickmarkOffset);
          n = this.getPosition(m, n, l, d);
          l = n.x;
          var A = n.y;
          h = (m && l === h.pos + h.len) || (!m && A === h.pos) ? -1 : 1;
          m = g(b, this.label && this.label.newOpacity, 1);
          b = g(b, 1);
          this.isActive = !0;
          this.renderGridLine(d, b, h);
          this.renderMark(n, b, h);
          this.renderLabel(n, d, m, a);
          this.isNew = !1;
          p(this, "afterRender");
        };
        m.prototype.renderGridLine = function (a, d, b) {
          var h = this.axis,
            m = h.options,
            n = {},
            l = this.pos,
            A = this.type,
            f = g(this.tickmarkOffset, h.tickmarkOffset),
            w = h.chart.renderer,
            k = this.gridLine,
            D = m.gridLineWidth,
            c = m.gridLineColor,
            q = m.gridLineDashStyle;
          "minor" === this.type &&
            ((D = m.minorGridLineWidth),
            (c = m.minorGridLineColor),
            (q = m.minorGridLineDashStyle));
          k ||
            (h.chart.styledMode ||
              ((n.stroke = c), (n["stroke-width"] = D || 0), (n.dashstyle = q)),
            A || (n.zIndex = 1),
            a && (d = 0),
            (this.gridLine = k =
              w
                .path()
                .attr(n)
                .addClass("highcharts-" + (A ? A + "-" : "") + "grid-line")
                .add(h.gridGroup)));
          if (
            k &&
            (b = h.getPlotLinePath({
              value: l + f,
              lineWidth: k.strokeWidth() * b,
              force: "pass",
              old: a,
            }))
          )
            k[a || this.isNew ? "attr" : "animate"]({ d: b, opacity: d });
        };
        m.prototype.renderMark = function (a, d, b) {
          var h = this.axis,
            m = h.options,
            n = h.chart.renderer,
            l = this.type,
            A = h.tickSize(l ? l + "Tick" : "tick"),
            f = a.x;
          a = a.y;
          var w = g(
            m["minor" !== l ? "tickWidth" : "minorTickWidth"],
            !l && h.isXAxis ? 1 : 0
          );
          m = m["minor" !== l ? "tickColor" : "minorTickColor"];
          var k = this.mark,
            D = !k;
          A &&
            (h.opposite && (A[0] = -A[0]),
            k ||
              ((this.mark = k =
                n
                  .path()
                  .addClass("highcharts-" + (l ? l + "-" : "") + "tick")
                  .add(h.axisGroup)),
              h.chart.styledMode || k.attr({ stroke: m, "stroke-width": w })),
            k[D ? "attr" : "animate"]({
              d: this.getMarkPath(f, a, A[0], k.strokeWidth() * b, h.horiz, n),
              opacity: d,
            }));
        };
        m.prototype.renderLabel = function (a, d, b, m) {
          var n = this.axis,
            u = n.horiz,
            l = n.options,
            A = this.label,
            f = l.labels,
            w = f.step;
          n = g(this.tickmarkOffset, n.tickmarkOffset);
          var k = a.x;
          a = a.y;
          var D = !0;
          A &&
            h(k) &&
            ((A.xy = a = this.getLabelPosition(k, a, A, u, f, n, m, w)),
            (this.isFirst && !this.isLast && !l.showFirstLabel) ||
            (this.isLast && !this.isFirst && !l.showLastLabel)
              ? (D = !1)
              : !u ||
                f.step ||
                f.rotation ||
                d ||
                0 === b ||
                this.handleOverflow(a),
            w && m % w && (D = !1),
            D && h(a.y)
              ? ((a.opacity = b),
                A[this.isNewLabel ? "attr" : "animate"](a).show(!0),
                (this.isNewLabel = !1))
              : (A.hide(), (this.isNewLabel = !0)));
        };
        m.prototype.replaceMovedLabel = function () {
          var a = this.label,
            d = this.axis,
            g = d.reversed;
          if (a && !this.isNew) {
            var b = d.horiz ? (g ? d.left : d.width + d.left) : a.xy.x;
            g = d.horiz ? a.xy.y : g ? d.width + d.top : d.top;
            a.animate({ x: b, y: g, opacity: 0 }, void 0, a.destroy);
            delete this.label;
          }
          d.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        };
        return m;
      })();
      ("");
      return e;
    }
  );
  I(
    e,
    "Core/Axis/Axis.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Axis/AxisDefaults.js"],
      e["Core/Color/Color.js"],
      e["Core/DefaultOptions.js"],
      e["Core/Foundation.js"],
      e["Core/Globals.js"],
      e["Core/Axis/Tick.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F, z) {
      var r = b.animObject,
        p = B.defaultOptions,
        h = v.registerEventOptions,
        a = t.deg2rad,
        d = z.arrayMax,
        g = z.arrayMin,
        m = z.clamp,
        n = z.correctFloat,
        G = z.defined,
        J = z.destroyObjectProperties,
        x = z.erase,
        C = z.error,
        u = z.extend,
        l = z.fireEvent,
        A = z.isArray,
        f = z.isNumber,
        w = z.isString,
        k = z.merge,
        D = z.normalizeTickInterval,
        c = z.objectEach,
        q = z.pick,
        E = z.relativeLength,
        H = z.removeEvent,
        Q = z.splat,
        L = z.syncTimeout,
        K = function (c, a) {
          return D(
            a,
            void 0,
            void 0,
            q(c.options.allowDecimals, 0.5 > a || void 0 !== c.tickAmount),
            !!c.tickAmount
          );
        };
      b = (function () {
        function b(c, a) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.eventOptions =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(c, a);
        }
        b.prototype.init = function (c, a) {
          var d = a.isX;
          this.chart = c;
          this.horiz = c.inverted && !this.isZAxis ? !d : d;
          this.isXAxis = d;
          this.coll = this.coll || (d ? "xAxis" : "yAxis");
          l(this, "init", { userOptions: a });
          this.opposite = q(a.opposite, this.opposite);
          this.side = q(
            a.side,
            this.side,
            this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
          );
          this.setOptions(a);
          var k = this.options,
            b = k.labels,
            g = k.type;
          this.userOptions = a;
          this.minPixelPadding = 0;
          this.reversed = q(k.reversed, this.reversed);
          this.visible = k.visible;
          this.zoomEnabled = k.zoomEnabled;
          this.hasNames = "category" === g || !0 === k.categories;
          this.categories = k.categories || (this.hasNames ? [] : void 0);
          this.names || ((this.names = []), (this.names.keys = {}));
          this.plotLinesAndBandsGroups = {};
          this.positiveValuesOnly = !!this.logarithmic;
          this.isLinked = G(k.linkedTo);
          this.ticks = {};
          this.labelEdge = [];
          this.minorTicks = {};
          this.plotLinesAndBands = [];
          this.alternateBands = {};
          this.len = 0;
          this.minRange = this.userMinRange = k.minRange || k.maxZoom;
          this.range = k.range;
          this.offset = k.offset || 0;
          this.min = this.max = null;
          a = q(k.crosshair, Q(c.options.tooltip.crosshairs)[d ? 0 : 1]);
          this.crosshair = !0 === a ? {} : a;
          -1 === c.axes.indexOf(this) &&
            (d ? c.axes.splice(c.xAxis.length, 0, this) : c.axes.push(this),
            c[this.coll].push(this));
          this.series = this.series || [];
          c.inverted &&
            !this.isZAxis &&
            d &&
            "undefined" === typeof this.reversed &&
            (this.reversed = !0);
          this.labelRotation = f(b.rotation) ? b.rotation : void 0;
          h(this, k);
          l(this, "afterInit");
        };
        b.prototype.setOptions = function (c) {
          this.options = k(
            e.defaultXAxisOptions,
            "yAxis" === this.coll && e.defaultYAxisOptions,
            [
              e.defaultTopAxisOptions,
              e.defaultRightAxisOptions,
              e.defaultBottomAxisOptions,
              e.defaultLeftAxisOptions,
            ][this.side],
            k(p[this.coll], c)
          );
          l(this, "afterSetOptions", { userOptions: c });
        };
        b.prototype.defaultLabelFormatter = function (c) {
          var a = this.axis;
          c = this.chart.numberFormatter;
          var d = f(this.value) ? this.value : NaN,
            k = a.chart.time,
            b = this.dateTimeLabelFormat,
            q = p.lang,
            g = q.numericSymbols;
          q = q.numericSymbolMagnitude || 1e3;
          var l = a.logarithmic ? Math.abs(d) : a.tickInterval,
            h = g && g.length;
          if (a.categories) var w = "".concat(this.value);
          else if (b) w = k.dateFormat(b, d);
          else if (h && 1e3 <= l)
            for (; h-- && "undefined" === typeof w; )
              (a = Math.pow(q, h + 1)),
                l >= a &&
                  0 === (10 * d) % a &&
                  null !== g[h] &&
                  0 !== d &&
                  (w = c(d / a, -1) + g[h]);
          "undefined" === typeof w &&
            (w = 1e4 <= Math.abs(d) ? c(d, -1) : c(d, -1, void 0, ""));
          return w;
        };
        b.prototype.getSeriesExtremes = function () {
          var c = this,
            a = c.chart,
            d;
          l(this, "getSeriesExtremes", null, function () {
            c.hasVisibleSeries = !1;
            c.dataMin = c.dataMax = c.threshold = null;
            c.softThreshold = !c.isXAxis;
            c.stacking && c.stacking.buildStacks();
            c.series.forEach(function (k) {
              if (k.visible || !a.options.chart.ignoreHiddenSeries) {
                var b = k.options,
                  g = b.threshold;
                c.hasVisibleSeries = !0;
                c.positiveValuesOnly && 0 >= g && (g = null);
                if (c.isXAxis) {
                  if (((b = k.xData), b.length)) {
                    b = c.logarithmic ? b.filter(c.validatePositiveValue) : b;
                    d = k.getXExtremes(b);
                    var l = d.min;
                    var h = d.max;
                    f(l) ||
                      l instanceof Date ||
                      ((b = b.filter(f)),
                      (d = k.getXExtremes(b)),
                      (l = d.min),
                      (h = d.max));
                    b.length &&
                      ((c.dataMin = Math.min(q(c.dataMin, l), l)),
                      (c.dataMax = Math.max(q(c.dataMax, h), h)));
                  }
                } else if (
                  ((k = k.applyExtremes()),
                  f(k.dataMin) &&
                    ((l = k.dataMin),
                    (c.dataMin = Math.min(q(c.dataMin, l), l))),
                  f(k.dataMax) &&
                    ((h = k.dataMax),
                    (c.dataMax = Math.max(q(c.dataMax, h), h))),
                  G(g) && (c.threshold = g),
                  !b.softThreshold || c.positiveValuesOnly)
                )
                  c.softThreshold = !1;
              }
            });
          });
          l(this, "afterGetSeriesExtremes");
        };
        b.prototype.translate = function (c, a, d, k, b, q) {
          var g = this.linkedParent || this,
            l = k && g.old ? g.old.min : g.min;
          if (!f(l)) return NaN;
          var h = g.minPixelPadding;
          b =
            (g.isOrdinal ||
              (g.brokenAxis && g.brokenAxis.hasBreaks) ||
              (g.logarithmic && b)) &&
            g.lin2val;
          var w = 1,
            D = 0;
          k = k && g.old ? g.old.transA : g.transA;
          k || (k = g.transA);
          d && ((w *= -1), (D = g.len));
          g.reversed && ((w *= -1), (D -= w * (g.sector || g.len)));
          a
            ? ((q = (c * w + D - h) / k + l), b && (q = g.lin2val(q)))
            : (b && (c = g.val2lin(c)),
              (c = w * (c - l) * k),
              (q = (g.isRadial ? c : n(c)) + D + w * h + (f(q) ? k * q : 0)));
          return q;
        };
        b.prototype.toPixels = function (c, a) {
          return (
            this.translate(c, !1, !this.horiz, void 0, !0) + (a ? 0 : this.pos)
          );
        };
        b.prototype.toValue = function (c, a) {
          return this.translate(
            c - (a ? 0 : this.pos),
            !0,
            !this.horiz,
            void 0,
            !0
          );
        };
        b.prototype.getPlotLinePath = function (c) {
          function a(c, a, f) {
            if (("pass" !== u && c < a) || c > f)
              u ? (c = m(c, a, f)) : (C = !0);
            return c;
          }
          var d = this,
            k = d.chart,
            b = d.left,
            g = d.top,
            h = c.old,
            w = c.value,
            D = c.lineWidth,
            E = (h && k.oldChartHeight) || k.chartHeight,
            n = (h && k.oldChartWidth) || k.chartWidth,
            A = d.transB,
            e = c.translatedValue,
            u = c.force,
            H,
            P,
            p,
            x,
            C;
          c = {
            value: w,
            lineWidth: D,
            old: h,
            force: u,
            acrossPanes: c.acrossPanes,
            translatedValue: e,
          };
          l(this, "getPlotLinePath", c, function (c) {
            e = q(e, d.translate(w, void 0, void 0, h));
            e = m(e, -1e5, 1e5);
            H = p = Math.round(e + A);
            P = x = Math.round(E - e - A);
            f(e)
              ? d.horiz
                ? ((P = g), (x = E - d.bottom), (H = p = a(H, b, b + d.width)))
                : ((H = b), (p = n - d.right), (P = x = a(P, g, g + d.height)))
              : ((C = !0), (u = !1));
            c.path =
              C && !u
                ? null
                : k.renderer.crispLine(
                    [
                      ["M", H, P],
                      ["L", p, x],
                    ],
                    D || 1
                  );
          });
          return c.path;
        };
        b.prototype.getLinearTickPositions = function (c, a, f) {
          var d = n(Math.floor(a / c) * c);
          f = n(Math.ceil(f / c) * c);
          var k = [],
            b;
          n(d + c) === d && (b = 20);
          if (this.single) return [a];
          for (a = d; a <= f; ) {
            k.push(a);
            a = n(a + c, b);
            if (a === q) break;
            var q = a;
          }
          return k;
        };
        b.prototype.getMinorTickInterval = function () {
          var c = this.options;
          return !0 === c.minorTicks
            ? q(c.minorTickInterval, "auto")
            : !1 === c.minorTicks
            ? null
            : c.minorTickInterval;
        };
        b.prototype.getMinorTickPositions = function () {
          var c = this.options,
            a = this.tickPositions,
            f = this.minorTickInterval,
            d = this.pointRangePadding || 0,
            k = this.min - d;
          d = this.max + d;
          var b = d - k,
            q = [];
          if (b && b / f < this.len / 3) {
            var g = this.logarithmic;
            if (g)
              this.paddedTicks.forEach(function (c, a, d) {
                a &&
                  q.push.apply(q, g.getLogTickPositions(f, d[a - 1], d[a], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              q = q.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(f),
                  k,
                  d,
                  c.startOfWeek
                )
              );
            else
              for (c = k + ((a[0] - k) % f); c <= d && c !== q[0]; c += f)
                q.push(c);
          }
          0 !== q.length && this.trimTicks(q);
          return q;
        };
        b.prototype.adjustForMinRange = function () {
          var c = this.options,
            a = this.logarithmic,
            f = this.min,
            k = this.max,
            b = 0,
            l,
            h,
            w,
            D;
          this.isXAxis &&
            "undefined" === typeof this.minRange &&
            !a &&
            (G(c.min) || G(c.max) || G(c.floor) || G(c.ceiling)
              ? (this.minRange = null)
              : (this.series.forEach(function (c) {
                  w = c.xData;
                  D = c.xIncrement ? 1 : w.length - 1;
                  if (1 < w.length)
                    for (l = D; 0 < l; l--)
                      if (((h = w[l] - w[l - 1]), !b || h < b)) b = h;
                }),
                (this.minRange = Math.min(
                  5 * b,
                  this.dataMax - this.dataMin
                ))));
          if (k - f < this.minRange) {
            var m = this.dataMax - this.dataMin >= this.minRange;
            var E = this.minRange;
            var n = (E - k + f) / 2;
            n = [f - n, q(c.min, f - n)];
            m &&
              (n[2] = this.logarithmic
                ? this.logarithmic.log2lin(this.dataMin)
                : this.dataMin);
            f = d(n);
            k = [f + E, q(c.max, f + E)];
            m && (k[2] = a ? a.log2lin(this.dataMax) : this.dataMax);
            k = g(k);
            k - f < E && ((n[0] = k - E), (n[1] = q(c.min, k - E)), (f = d(n)));
          }
          this.min = f;
          this.max = k;
        };
        b.prototype.getClosest = function () {
          var c;
          this.categories
            ? (c = 1)
            : this.series.forEach(function (a) {
                var f = a.closestPointRange,
                  d = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                !a.noSharedTooltip &&
                  G(f) &&
                  d &&
                  (c = G(c) ? Math.min(c, f) : f);
              });
          return c;
        };
        b.prototype.nameToX = function (c) {
          var a = A(this.options.categories),
            f = a ? this.categories : this.names,
            d = c.options.x;
          c.series.requireSorting = !1;
          G(d) ||
            (d =
              this.options.uniqueNames && f
                ? a
                  ? f.indexOf(c.name)
                  : q(f.keys[c.name], -1)
                : c.series.autoIncrement());
          if (-1 === d) {
            if (!a && f) var k = f.length;
          } else k = d;
          "undefined" !== typeof k
            ? ((this.names[k] = c.name), (this.names.keys[c.name] = k))
            : c.x && (k = c.x);
          return k;
        };
        b.prototype.updateNames = function () {
          var c = this,
            a = this.names;
          0 < a.length &&
            (Object.keys(a.keys).forEach(function (c) {
              delete a.keys[c];
            }),
            (a.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (a) {
              a.xIncrement = null;
              if (!a.points || a.isDirtyData)
                (c.max = Math.max(c.max, a.xData.length - 1)),
                  a.processData(),
                  a.generatePoints();
              a.data.forEach(function (f, d) {
                if (f && f.options && "undefined" !== typeof f.name) {
                  var k = c.nameToX(f);
                  "undefined" !== typeof k &&
                    k !== f.x &&
                    ((f.x = k), (a.xData[d] = k));
                }
              });
            }));
        };
        b.prototype.setAxisTranslation = function () {
          var c = this,
            a = c.max - c.min,
            f = c.linkedParent,
            d = !!c.categories,
            k = c.isXAxis,
            b = c.axisPointRange || 0,
            g = 0,
            h = 0,
            D = c.transA;
          if (k || d || b) {
            var m = c.getClosest();
            f
              ? ((g = f.minPointOffset), (h = f.pointRangePadding))
              : c.series.forEach(function (a) {
                  var f = d
                      ? 1
                      : k
                      ? q(a.options.pointRange, m, 0)
                      : c.axisPointRange || 0,
                    l = a.options.pointPlacement;
                  b = Math.max(b, f);
                  if (!c.single || d)
                    (a = a.is("xrange") ? !k : k),
                      (g = Math.max(g, a && w(l) ? 0 : f / 2)),
                      (h = Math.max(h, a && "on" === l ? 0 : f));
                });
            f = c.ordinal && c.ordinal.slope && m ? c.ordinal.slope / m : 1;
            c.minPointOffset = g *= f;
            c.pointRangePadding = h *= f;
            c.pointRange = Math.min(b, c.single && d ? 1 : a);
            k && (c.closestPointRange = m);
          }
          c.translationSlope =
            c.transA =
            D =
              c.staticScale || c.len / (a + h || 1);
          c.transB = c.horiz ? c.left : c.bottom;
          c.minPixelPadding = D * g;
          l(this, "afterSetAxisTranslation");
        };
        b.prototype.minFromRange = function () {
          return this.max - this.range;
        };
        b.prototype.setTickInterval = function (c) {
          var a = this.chart,
            d = this.logarithmic,
            k = this.options,
            b = this.isXAxis,
            g = this.isLinked,
            h = k.tickPixelInterval,
            w = this.categories,
            D = this.softThreshold,
            m = k.maxPadding,
            E = k.minPadding,
            e =
              f(k.tickInterval) && 0 <= k.tickInterval
                ? k.tickInterval
                : void 0,
            A = f(this.threshold) ? this.threshold : null;
          this.dateTime || w || g || this.getTickAmount();
          var u = q(this.userMin, k.min);
          var H = q(this.userMax, k.max);
          if (g) {
            this.linkedParent = a[this.coll][k.linkedTo];
            var p = this.linkedParent.getExtremes();
            this.min = q(p.min, p.dataMin);
            this.max = q(p.max, p.dataMax);
            k.type !== this.linkedParent.options.type && C(11, 1, a);
          } else {
            if (D && G(A))
              if (this.dataMin >= A) (p = A), (E = 0);
              else if (this.dataMax <= A) {
                var x = A;
                m = 0;
              }
            this.min = q(u, p, this.dataMin);
            this.max = q(H, x, this.dataMax);
          }
          d &&
            (this.positiveValuesOnly &&
              !c &&
              0 >= Math.min(this.min, q(this.dataMin, this.min)) &&
              C(10, 1, a),
            (this.min = n(d.log2lin(this.min), 16)),
            (this.max = n(d.log2lin(this.max), 16)));
          this.range &&
            G(this.max) &&
            ((this.userMin =
              this.min =
              u =
                Math.max(this.dataMin, this.minFromRange())),
            (this.userMax = H = this.max),
            (this.range = null));
          l(this, "foundExtremes");
          this.beforePadding && this.beforePadding();
          this.adjustForMinRange();
          !(
            w ||
            this.axisPointRange ||
            (this.stacking && this.stacking.usePercentage) ||
            g
          ) &&
            G(this.min) &&
            G(this.max) &&
            (a = this.max - this.min) &&
            (!G(u) && E && (this.min -= a * E),
            !G(H) && m && (this.max += a * m));
          f(this.userMin) ||
            (f(k.softMin) && k.softMin < this.min && (this.min = u = k.softMin),
            f(k.floor) && (this.min = Math.max(this.min, k.floor)));
          f(this.userMax) ||
            (f(k.softMax) && k.softMax > this.max && (this.max = H = k.softMax),
            f(k.ceiling) && (this.max = Math.min(this.max, k.ceiling)));
          D &&
            G(this.dataMin) &&
            ((A = A || 0),
            !G(u) && this.min < A && this.dataMin >= A
              ? (this.min = this.options.minRange
                  ? Math.min(A, this.max - this.minRange)
                  : A)
              : !G(H) &&
                this.max > A &&
                this.dataMax <= A &&
                (this.max = this.options.minRange
                  ? Math.max(A, this.min + this.minRange)
                  : A));
          f(this.min) &&
            f(this.max) &&
            !this.chart.polar &&
            this.min > this.max &&
            (G(this.options.min)
              ? (this.max = this.min)
              : G(this.options.max) && (this.min = this.max));
          this.tickInterval =
            this.min === this.max ||
            "undefined" === typeof this.min ||
            "undefined" === typeof this.max
              ? 1
              : g &&
                this.linkedParent &&
                !e &&
                h === this.linkedParent.options.tickPixelInterval
              ? (e = this.linkedParent.tickInterval)
              : q(
                  e,
                  this.tickAmount
                    ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                    : void 0,
                  w ? 1 : ((this.max - this.min) * h) / Math.max(this.len, h)
                );
          if (b && !c) {
            var P =
              this.min !== (this.old && this.old.min) ||
              this.max !== (this.old && this.old.max);
            this.series.forEach(function (c) {
              c.forceCrop = c.forceCropping && c.forceCropping();
              c.processData(P);
            });
            l(this, "postProcessData", { hasExtemesChanged: P });
          }
          this.setAxisTranslation();
          l(this, "initialAxisTranslation");
          this.pointRange &&
            !e &&
            (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          c = q(
            k.minTickInterval,
            this.dateTime &&
              !this.series.some(function (c) {
                return c.noSharedTooltip;
              })
              ? this.closestPointRange
              : 0
          );
          !e && this.tickInterval < c && (this.tickInterval = c);
          this.dateTime ||
            this.logarithmic ||
            e ||
            (this.tickInterval = K(this, this.tickInterval));
          this.tickAmount || (this.tickInterval = this.unsquish());
          this.setTickPositions();
        };
        b.prototype.setTickPositions = function () {
          var c = this.options,
            a = c.tickPositions,
            f = this.getMinorTickInterval(),
            k = this.hasVerticalPanning(),
            d = "colorAxis" === this.coll,
            b = (d || !k) && c.startOnTick;
          k = (d || !k) && c.endOnTick;
          d = c.tickPositioner;
          this.tickmarkOffset =
            this.categories &&
            "between" === c.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            "auto" === f && this.tickInterval ? this.tickInterval / 5 : f;
          this.single =
            this.min === this.max &&
            G(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== c.allowDecimals);
          this.tickPositions = f = a && a.slice();
          if (!f) {
            if (
              (this.ordinal && this.ordinal.positions) ||
              !(
                (this.max - this.min) / this.tickInterval >
                Math.max(2 * this.len, 200)
              )
            )
              if (this.dateTime)
                f = this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(
                    this.tickInterval,
                    c.units
                  ),
                  this.min,
                  this.max,
                  c.startOfWeek,
                  this.ordinal && this.ordinal.positions,
                  this.closestPointRange,
                  !0
                );
              else if (this.logarithmic)
                f = this.logarithmic.getLogTickPositions(
                  this.tickInterval,
                  this.min,
                  this.max
                );
              else
                for (var q = (c = this.tickInterval); q <= 2 * c; )
                  if (
                    ((f = this.getLinearTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max
                    )),
                    this.tickAmount && f.length > this.tickAmount)
                  )
                    this.tickInterval = K(this, (q *= 1.1));
                  else break;
            else (f = [this.min, this.max]), C(19, !1, this.chart);
            f.length > this.len &&
              ((f = [f[0], f.pop()]), f[0] === f[1] && (f.length = 1));
            this.tickPositions = f;
            d &&
              (d = d.apply(this, [this.min, this.max])) &&
              (this.tickPositions = f = d);
          }
          this.paddedTicks = f.slice(0);
          this.trimTicks(f, b, k);
          this.isLinked ||
            (this.single &&
              2 > f.length &&
              !this.categories &&
              !this.series.some(function (c) {
                return (
                  c.is("heatmap") && "between" === c.options.pointPlacement
                );
              }) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            a || d || this.adjustTickAmount());
          l(this, "afterSetTickPositions");
        };
        b.prototype.trimTicks = function (c, a, f) {
          var k = c[0],
            d = c[c.length - 1],
            b = (!this.isOrdinal && this.minPointOffset) || 0;
          l(this, "trimTicks");
          if (!this.isLinked) {
            if (a && -Infinity !== k) this.min = k;
            else for (; this.min - b > c[0]; ) c.shift();
            if (f) this.max = d;
            else for (; this.max + b < c[c.length - 1]; ) c.pop();
            0 === c.length &&
              G(k) &&
              !this.options.tickPositions &&
              c.push((d + k) / 2);
          }
        };
        b.prototype.alignToOthers = function () {
          var c = this,
            a = [this],
            k = c.options,
            d =
              "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
            b = [],
            q;
          c.thresholdAlignment = void 0;
          if (
            ((!1 !== this.chart.options.chart.alignTicks && k.alignTicks) ||
              d) &&
            !1 !== k.startOnTick &&
            !1 !== k.endOnTick &&
            !c.logarithmic
          ) {
            var g = function (c) {
                var a = c.options;
                return [
                  c.horiz ? a.left : a.top,
                  a.width,
                  a.height,
                  a.pane,
                ].join();
              },
              l = g(this);
            this.chart[this.coll].forEach(function (f) {
              var k = f.series;
              k.length &&
                k.some(function (c) {
                  return c.visible;
                }) &&
                f !== c &&
                g(f) === l &&
                ((q = !0), a.push(f));
            });
          }
          if (q && d) {
            a.forEach(function (a) {
              a = a.getThresholdAlignment(c);
              f(a) && b.push(a);
            });
            var h =
              1 < b.length
                ? b.reduce(function (c, a) {
                    return c + a;
                  }, 0) / b.length
                : void 0;
            a.forEach(function (c) {
              c.thresholdAlignment = h;
            });
          }
          return q;
        };
        b.prototype.getThresholdAlignment = function (c) {
          (!f(this.dataMin) ||
            (this !== c &&
              this.series.some(function (c) {
                return c.isDirty || c.isDirtyData;
              }))) &&
            this.getSeriesExtremes();
          if (f(this.threshold))
            return (
              (c = m(
                (this.threshold - (this.dataMin || 0)) /
                  ((this.dataMax || 0) - (this.dataMin || 0)),
                0,
                1
              )),
              this.options.reversed && (c = 1 - c),
              c
            );
        };
        b.prototype.getTickAmount = function () {
          var c = this.options,
            a = c.tickPixelInterval,
            f = c.tickAmount;
          !G(c.tickInterval) &&
            !f &&
            this.len < a &&
            !this.isRadial &&
            !this.logarithmic &&
            c.startOnTick &&
            c.endOnTick &&
            (f = 2);
          !f && this.alignToOthers() && (f = Math.ceil(this.len / a) + 1);
          4 > f && ((this.finalTickAmt = f), (f = 5));
          this.tickAmount = f;
        };
        b.prototype.adjustTickAmount = function () {
          var c = this,
            a = c.finalTickAmt,
            k = c.max,
            d = c.min,
            b = c.options,
            g = c.tickPositions,
            l = c.tickAmount,
            h = c.thresholdAlignment,
            w = g && g.length,
            D = q(c.threshold, c.softThreshold ? 0 : null);
          var m = c.tickInterval;
          if (f(h)) {
            var E = 0.5 > h ? Math.ceil(h * (l - 1)) : Math.floor(h * (l - 1));
            b.reversed && (E = l - 1 - E);
          }
          if (c.hasData() && f(d) && f(k)) {
            h = function () {
              c.transA *= (w - 1) / (l - 1);
              c.min = b.startOnTick ? g[0] : Math.min(d, g[0]);
              c.max = b.endOnTick
                ? g[g.length - 1]
                : Math.max(k, g[g.length - 1]);
            };
            if (f(E) && f(c.threshold)) {
              for (
                ;
                g[E] !== D || g.length !== l || g[0] > d || g[g.length - 1] < k;

              ) {
                g.length = 0;
                for (g.push(c.threshold); g.length < l; )
                  void 0 === g[E] || g[E] > c.threshold
                    ? g.unshift(n(g[0] - m))
                    : g.push(n(g[g.length - 1] + m));
                if (m > 8 * c.tickInterval) break;
                m *= 2;
              }
              h();
            } else if (w < l) {
              for (; g.length < l; )
                g.length % 2 || d === D
                  ? g.push(n(g[g.length - 1] + m))
                  : g.unshift(n(g[0] - m));
              h();
            }
            if (G(a)) {
              for (m = D = g.length; m--; )
                ((3 === a && 1 === m % 2) || (2 >= a && 0 < m && m < D - 1)) &&
                  g.splice(m, 1);
              c.finalTickAmt = void 0;
            }
          }
        };
        b.prototype.setScale = function () {
          var c = !1,
            a = !1;
          this.series.forEach(function (f) {
            c = c || f.isDirtyData || f.isDirty;
            a = a || (f.xAxis && f.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          var f = this.len !== (this.old && this.old.len);
          f ||
          c ||
          a ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking && this.stacking.resetStacks(),
              (this.forceRedraw = !1),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  f ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          c && this.panningState && (this.panningState.isDirty = !0);
          l(this, "afterSetScale");
        };
        b.prototype.setExtremes = function (c, a, f, k, d) {
          var b = this,
            g = b.chart;
          f = q(f, !0);
          b.series.forEach(function (c) {
            delete c.kdTree;
          });
          d = u(d, { min: c, max: a });
          l(b, "setExtremes", d, function () {
            b.userMin = c;
            b.userMax = a;
            b.eventArgs = d;
            f && g.redraw(k);
          });
        };
        b.prototype.zoom = function (c, a) {
          var f = this,
            k = this.dataMin,
            d = this.dataMax,
            b = this.options,
            g = Math.min(k, q(b.min, k)),
            h = Math.max(d, q(b.max, d));
          c = { newMin: c, newMax: a };
          l(this, "zoom", c, function (c) {
            var a = c.newMin,
              b = c.newMax;
            if (a !== f.min || b !== f.max)
              f.allowZoomOutside ||
                (G(k) && (a < g && (a = g), a > h && (a = h)),
                G(d) && (b < g && (b = g), b > h && (b = h))),
                (f.displayBtn =
                  "undefined" !== typeof a || "undefined" !== typeof b),
                f.setExtremes(a, b, !1, void 0, { trigger: "zoom" });
            c.zoomed = !0;
          });
          return c.zoomed;
        };
        b.prototype.setAxisSize = function () {
          var c = this.chart,
            a = this.options,
            f = a.offsets || [0, 0, 0, 0],
            k = this.horiz,
            d = (this.width = Math.round(
              E(q(a.width, c.plotWidth - f[3] + f[1]), c.plotWidth)
            )),
            b = (this.height = Math.round(
              E(q(a.height, c.plotHeight - f[0] + f[2]), c.plotHeight)
            )),
            g = (this.top = Math.round(
              E(q(a.top, c.plotTop + f[0]), c.plotHeight, c.plotTop)
            ));
          a = this.left = Math.round(
            E(q(a.left, c.plotLeft + f[3]), c.plotWidth, c.plotLeft)
          );
          this.bottom = c.chartHeight - b - g;
          this.right = c.chartWidth - d - a;
          this.len = Math.max(k ? d : b, 0);
          this.pos = k ? a : g;
        };
        b.prototype.getExtremes = function () {
          var c = this.logarithmic;
          return {
            min: c ? n(c.lin2log(this.min)) : this.min,
            max: c ? n(c.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        };
        b.prototype.getThreshold = function (c) {
          var a = this.logarithmic,
            f = a ? a.lin2log(this.min) : this.min;
          a = a ? a.lin2log(this.max) : this.max;
          null === c || -Infinity === c
            ? (c = f)
            : Infinity === c
            ? (c = a)
            : f > c
            ? (c = f)
            : a < c && (c = a);
          return this.translate(c, 0, 1, 0, 1);
        };
        b.prototype.autoLabelAlign = function (c) {
          var a = (q(c, 0) - 90 * this.side + 720) % 360;
          c = { align: "center" };
          l(this, "autoLabelAlign", c, function (c) {
            15 < a && 165 > a
              ? (c.align = "right")
              : 195 < a && 345 > a && (c.align = "left");
          });
          return c.align;
        };
        b.prototype.tickSize = function (c) {
          var a = this.options,
            f = q(
              a["tick" === c ? "tickWidth" : "minorTickWidth"],
              "tick" === c && this.isXAxis && !this.categories ? 1 : 0
            ),
            k = a["tick" === c ? "tickLength" : "minorTickLength"];
          if (f && k) {
            "inside" === a[c + "Position"] && (k = -k);
            var d = [k, f];
          }
          c = { tickSize: d };
          l(this, "afterTickSize", c);
          return c.tickSize;
        };
        b.prototype.labelMetrics = function () {
          var c = (this.tickPositions && this.tickPositions[0]) || 0;
          return this.chart.renderer.fontMetrics(
            this.options.labels.style.fontSize,
            this.ticks[c] && this.ticks[c].label
          );
        };
        b.prototype.unsquish = function () {
          var c = this.options.labels,
            k = this.horiz,
            d = this.tickInterval,
            b =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / d),
            g = c.rotation,
            l = this.labelMetrics(),
            h = Math.max(this.max - this.min, 0),
            w = function (c) {
              var a = c / (b || 1);
              a = 1 < a ? Math.ceil(a) : 1;
              a * d > h &&
                Infinity !== c &&
                Infinity !== b &&
                h &&
                (a = Math.ceil(h / d));
              return n(a * d);
            },
            D = d,
            m,
            E,
            A = Number.MAX_VALUE;
          if (k) {
            if (!c.staggerLines && !c.step)
              if (f(g)) var e = [g];
              else b < c.autoRotationLimit && (e = c.autoRotation);
            e &&
              e.forEach(function (c) {
                if (c === g || (c && -90 <= c && 90 >= c)) {
                  E = w(Math.abs(l.h / Math.sin(a * c)));
                  var f = E + Math.abs(c / 360);
                  f < A && ((A = f), (m = c), (D = E));
                }
              });
          } else c.step || (D = w(l.h));
          this.autoRotation = e;
          this.labelRotation = q(m, f(g) ? g : 0);
          return D;
        };
        b.prototype.getSlotWidth = function (c) {
          var a = this.chart,
            k = this.horiz,
            d = this.options.labels,
            b = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1
            ),
            g = a.margin[3];
          if (c && f(c.slotWidth)) return c.slotWidth;
          if (k && 2 > d.step)
            return d.rotation ? 0 : ((this.staggerLines || 1) * this.len) / b;
          if (!k) {
            c = d.style.width;
            if (void 0 !== c) return parseInt(String(c), 10);
            if (g) return g - a.spacing[3];
          }
          return 0.33 * a.chartWidth;
        };
        b.prototype.renderUnsquish = function () {
          var c = this.chart,
            a = c.renderer,
            f = this.tickPositions,
            k = this.ticks,
            d = this.options.labels,
            b = d.style,
            g = this.horiz,
            q = this.getSlotWidth(),
            l = Math.max(1, Math.round(q - 2 * d.padding)),
            h = {},
            D = this.labelMetrics(),
            m = b.textOverflow,
            E = 0;
          w(d.rotation) || (h.rotation = d.rotation || 0);
          f.forEach(function (c) {
            c = k[c];
            c.movedLabel && c.replaceMovedLabel();
            c &&
              c.label &&
              c.label.textPxLength > E &&
              (E = c.label.textPxLength);
          });
          this.maxLabelLength = E;
          if (this.autoRotation)
            E > l && E > D.h
              ? (h.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (q) {
            var n = l;
            if (!m) {
              var A = "clip";
              for (l = f.length; !g && l--; ) {
                var e = f[l];
                if ((e = k[e].label))
                  e.styles && "ellipsis" === e.styles.textOverflow
                    ? e.css({ textOverflow: "clip" })
                    : e.textPxLength > q && e.css({ width: q + "px" }),
                    e.getBBox().height > this.len / f.length - (D.h - D.f) &&
                      (e.specificTextOverflow = "ellipsis");
              }
            }
          }
          h.rotation &&
            ((n = E > 0.5 * c.chartHeight ? 0.33 * c.chartHeight : E),
            m || (A = "ellipsis"));
          if (
            (this.labelAlign =
              d.align || this.autoLabelAlign(this.labelRotation))
          )
            h.align = this.labelAlign;
          f.forEach(function (c) {
            var a = (c = k[c]) && c.label,
              f = b.width,
              d = {};
            a &&
              (a.attr(h),
              c.shortenLabel
                ? c.shortenLabel()
                : n &&
                  !f &&
                  "nowrap" !== b.whiteSpace &&
                  (n < a.textPxLength || "SPAN" === a.element.tagName)
                ? ((d.width = n + "px"),
                  m || (d.textOverflow = a.specificTextOverflow || A),
                  a.css(d))
                : a.styles &&
                  a.styles.width &&
                  !d.width &&
                  !f &&
                  a.css({ width: null }),
              delete a.specificTextOverflow,
              (c.rotation = h.rotation));
          }, this);
          this.tickRotCorr = a.rotCorr(
            D.b,
            this.labelRotation || 0,
            0 !== this.side
          );
        };
        b.prototype.hasData = function () {
          return (
            this.series.some(function (c) {
              return c.hasData();
            }) ||
            (this.options.showEmpty && G(this.min) && G(this.max))
          );
        };
        b.prototype.addTitle = function (c) {
          var a = this.chart.renderer,
            f = this.horiz,
            d = this.opposite,
            b = this.options.title,
            g = this.chart.styledMode,
            q;
          this.axisTitle ||
            ((q = b.textAlign) ||
              (q = (
                f
                  ? { low: "left", middle: "center", high: "right" }
                  : {
                      low: d ? "right" : "left",
                      middle: "center",
                      high: d ? "left" : "right",
                    }
              )[b.align]),
            (this.axisTitle = a
              .text(b.text || "", 0, 0, b.useHTML)
              .attr({ zIndex: 7, rotation: b.rotation, align: q })
              .addClass("highcharts-axis-title")),
            g || this.axisTitle.css(k(b.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          g ||
            b.style.width ||
            this.isRadial ||
            this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[c ? "show" : "hide"](c);
        };
        b.prototype.generateTick = function (c) {
          var a = this.ticks;
          a[c] ? a[c].addLabel() : (a[c] = new F(this, c));
        };
        b.prototype.getOffset = function () {
          var a = this,
            f = this,
            d = f.chart,
            k = f.horiz,
            b = f.options,
            g = f.side,
            h = f.ticks,
            w = f.tickPositions,
            D = f.coll,
            m = f.axisParent,
            E = d.renderer,
            n = d.inverted && !f.isZAxis ? [1, 0, 3, 2][g] : g,
            e = f.hasData(),
            A = b.title,
            u = b.labels,
            H = d.axisOffset;
          d = d.clipOffset;
          var p = [-1, 1, 1, -1][g],
            x = b.className,
            C,
            r = 0,
            J = 0,
            Q = 0;
          f.showAxis = C = e || b.showEmpty;
          f.staggerLines = (f.horiz && u.staggerLines) || void 0;
          if (!f.axisGroup) {
            var L = function (c, f, d) {
              return E.g(c)
                .attr({ zIndex: d })
                .addClass(
                  "highcharts-".concat(D.toLowerCase()).concat(f, " ") +
                    (a.isRadial
                      ? "highcharts-radial-axis".concat(f, " ")
                      : "") +
                    (x || "")
                )
                .add(m);
            };
            f.gridGroup = L("grid", "-grid", b.gridZIndex);
            f.axisGroup = L("axis", "", b.zIndex);
            f.labelGroup = L("axis-labels", "-labels", u.zIndex);
          }
          e || f.isLinked
            ? (w.forEach(function (c) {
                f.generateTick(c);
              }),
              f.renderUnsquish(),
              (f.reserveSpaceDefault =
                0 === g ||
                2 === g ||
                { 1: "left", 3: "right" }[g] === f.labelAlign),
              q(
                u.reserveSpace,
                "center" === f.labelAlign ? !0 : null,
                f.reserveSpaceDefault
              ) &&
                w.forEach(function (c) {
                  Q = Math.max(h[c].getLabelSize(), Q);
                }),
              f.staggerLines && (Q *= f.staggerLines),
              (f.labelOffset = Q * (f.opposite ? -1 : 1)))
            : c(h, function (c, a) {
                c.destroy();
                delete h[a];
              });
          if (
            A &&
            A.text &&
            !1 !== A.enabled &&
            (f.addTitle(C), C && !1 !== A.reserveSpace)
          ) {
            f.titleOffset = r = f.axisTitle.getBBox()[k ? "height" : "width"];
            var t = A.offset;
            J = G(t) ? 0 : q(A.margin, k ? 5 : 10);
          }
          f.renderLine();
          f.offset = p * q(b.offset, H[g] ? H[g] + (b.margin || 0) : 0);
          f.tickRotCorr = f.tickRotCorr || { x: 0, y: 0 };
          A = 0 === g ? -f.labelMetrics().h : 2 === g ? f.tickRotCorr.y : 0;
          e = Math.abs(Q) + J;
          Q && (e = e - A + p * (k ? q(u.y, f.tickRotCorr.y + 8 * p) : u.x));
          f.axisTitleMargin = q(t, e);
          f.getMaxLabelDimensions &&
            (f.maxLabelDimensions = f.getMaxLabelDimensions(h, w));
          "colorAxis" !== D &&
            ((k = this.tickSize("tick")),
            (H[g] = Math.max(
              H[g],
              (f.axisTitleMargin || 0) + r + p * f.offset,
              e,
              w && w.length && k ? k[0] + p * f.offset : 0
            )),
            (b =
              !f.axisLine || b.offset
                ? 0
                : 2 * Math.floor(f.axisLine.strokeWidth() / 2)),
            (d[n] = Math.max(d[n], b)));
          l(this, "afterGetOffset");
        };
        b.prototype.getLinePath = function (c) {
          var a = this.chart,
            f = this.opposite,
            d = this.offset,
            k = this.horiz,
            b = this.left + (f ? this.width : 0) + d;
          d = a.chartHeight - this.bottom - (f ? this.height : 0) + d;
          f && (c *= -1);
          return a.renderer.crispLine(
            [
              ["M", k ? this.left : b, k ? d : this.top],
              [
                "L",
                k ? a.chartWidth - this.right : b,
                k ? d : a.chartHeight - this.bottom,
              ],
            ],
            c
          );
        };
        b.prototype.renderLine = function () {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        };
        b.prototype.getTitlePosition = function () {
          var c = this.horiz,
            a = this.left,
            f = this.top,
            d = this.len,
            k = this.options.title,
            b = c ? a : f,
            g = this.opposite,
            q = this.offset,
            h = k.x,
            w = k.y,
            D = this.axisTitle,
            m = this.chart.renderer.fontMetrics(k.style.fontSize, D);
          D = D ? Math.max(D.getBBox(!1, 0).height - m.h - 1, 0) : 0;
          d = {
            low: b + (c ? 0 : d),
            middle: b + d / 2,
            high: b + (c ? d : 0),
          }[k.align];
          a =
            (c ? f + this.height : a) +
            (c ? 1 : -1) * (g ? -1 : 1) * (this.axisTitleMargin || 0) +
            [-D, D, m.f, -D][this.side];
          c = {
            x: c ? d + h : a + (g ? this.width : 0) + q + h,
            y: c ? a + w - (g ? this.height : 0) + q : d + w,
          };
          l(this, "afterGetTitlePosition", { titlePosition: c });
          return c;
        };
        b.prototype.renderMinorTick = function (c, a) {
          var f = this.minorTicks;
          f[c] || (f[c] = new F(this, c, "minor"));
          a && f[c].isNew && f[c].render(null, !0);
          f[c].render(null, !1, 1);
        };
        b.prototype.renderTick = function (c, a, f) {
          var d = this.ticks;
          if (
            !this.isLinked ||
            (c >= this.min && c <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            d[c] || (d[c] = new F(this, c)),
              f && d[c].isNew && d[c].render(a, !0, -1),
              d[c].render(a);
        };
        b.prototype.render = function () {
          var a = this,
            d = a.chart,
            k = a.logarithmic,
            b = a.options,
            g = a.isLinked,
            q = a.tickPositions,
            h = a.axisTitle,
            w = a.ticks,
            D = a.minorTicks,
            m = a.alternateBands,
            E = b.stackLabels,
            n = b.alternateGridColor,
            e = a.tickmarkOffset,
            A = a.axisLine,
            u = a.showAxis,
            H = r(d.renderer.globalAnimation),
            p,
            x;
          a.labelEdge.length = 0;
          a.overlap = !1;
          [w, D, m].forEach(function (a) {
            c(a, function (c) {
              c.isActive = !1;
            });
          });
          if (a.hasData() || g) {
            var C = a.chart.hasRendered && a.old && f(a.old.min);
            a.minorTickInterval &&
              !a.categories &&
              a.getMinorTickPositions().forEach(function (c) {
                a.renderMinorTick(c, C);
              });
            q.length &&
              (q.forEach(function (c, f) {
                a.renderTick(c, f, C);
              }),
              e &&
                (0 === a.min || a.single) &&
                (w[-1] || (w[-1] = new F(a, -1, null, !0)), w[-1].render(-1)));
            n &&
              q.forEach(function (c, f) {
                x = "undefined" !== typeof q[f + 1] ? q[f + 1] + e : a.max - e;
                0 === f % 2 &&
                  c < a.max &&
                  x <= a.max + (d.polar ? -e : e) &&
                  (m[c] || (m[c] = new t.PlotLineOrBand(a)),
                  (p = c + e),
                  (m[c].options = {
                    from: k ? k.lin2log(p) : p,
                    to: k ? k.lin2log(x) : x,
                    color: n,
                    className: "highcharts-alternate-grid",
                  }),
                  m[c].render(),
                  (m[c].isActive = !0));
              });
            a._addedPlotLB ||
              ((a._addedPlotLB = !0),
              (b.plotLines || [])
                .concat(b.plotBands || [])
                .forEach(function (c) {
                  a.addPlotBandOrLine(c);
                }));
          }
          [w, D, m].forEach(function (a) {
            var f = [],
              k = H.duration;
            c(a, function (c, a) {
              c.isActive || (c.render(a, !1, 0), (c.isActive = !1), f.push(a));
            });
            L(
              function () {
                for (var c = f.length; c--; )
                  a[f[c]] &&
                    !a[f[c]].isActive &&
                    (a[f[c]].destroy(), delete a[f[c]]);
              },
              a !== m && d.hasRendered && k ? k : 0
            );
          });
          A &&
            (A[A.isPlaced ? "animate" : "attr"]({
              d: this.getLinePath(A.strokeWidth()),
            }),
            (A.isPlaced = !0),
            A[u ? "show" : "hide"](u));
          h &&
            u &&
            ((b = a.getTitlePosition()),
            h[h.isNew ? "attr" : "animate"](b),
            (h.isNew = !1));
          E && E.enabled && a.stacking && a.stacking.renderStackTotals();
          a.old = {
            len: a.len,
            max: a.max,
            min: a.min,
            transA: a.transA,
            userMax: a.userMax,
            userMin: a.userMin,
          };
          a.isDirty = !1;
          l(this, "afterRender");
        };
        b.prototype.redraw = function () {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (c) {
              c.render();
            }));
          this.series.forEach(function (c) {
            c.isDirty = !0;
          });
        };
        b.prototype.getKeepProps = function () {
          return this.keepProps || b.keepProps;
        };
        b.prototype.destroy = function (a) {
          var f = this,
            d = f.plotLinesAndBands,
            k = this.eventOptions;
          l(this, "destroy", { keepEvents: a });
          a || H(f);
          [f.ticks, f.minorTicks, f.alternateBands].forEach(function (c) {
            J(c);
          });
          if (d) for (a = d.length; a--; ) d[a].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (c) {
              f[c] && (f[c] = f[c].destroy());
            });
          for (var b in f.plotLinesAndBandsGroups)
            f.plotLinesAndBandsGroups[b] =
              f.plotLinesAndBandsGroups[b].destroy();
          c(f, function (c, a) {
            -1 === f.getKeepProps().indexOf(a) && delete f[a];
          });
          this.eventOptions = k;
        };
        b.prototype.drawCrosshair = function (c, a) {
          var f = this.crosshair,
            d = q(f && f.snap, !0),
            k = this.chart,
            b,
            g = this.cross;
          l(this, "drawCrosshair", { e: c, point: a });
          c || (c = this.cross && this.cross.e);
          if (f && !1 !== (G(a) || !d)) {
            d
              ? G(a) &&
                (b = q(
                  "colorAxis" !== this.coll ? a.crosshairPos : null,
                  this.isXAxis ? a.plotX : this.len - a.plotY
                ))
              : (b =
                  c &&
                  (this.horiz
                    ? c.chartX - this.pos
                    : this.len - c.chartY + this.pos));
            if (G(b)) {
              var h = {
                value: a && (this.isXAxis ? a.x : q(a.stackY, a.y)),
                translatedValue: b,
              };
              k.polar &&
                u(h, {
                  isCrosshair: !0,
                  chartX: c && c.chartX,
                  chartY: c && c.chartY,
                  point: a,
                });
              h = this.getPlotLinePath(h) || null;
            }
            if (!G(h)) {
              this.hideCrosshair();
              return;
            }
            d = this.categories && !this.isRadial;
            g ||
              ((this.cross = g =
                k.renderer
                  .path()
                  .addClass(
                    "highcharts-crosshair highcharts-crosshair-" +
                      (d ? "category " : "thin ") +
                      (f.className || "")
                  )
                  .attr({ zIndex: q(f.zIndex, 2) })
                  .add()),
              k.styledMode ||
                (g
                  .attr({
                    stroke:
                      f.color ||
                      (d
                        ? y.parse("#ccd6eb").setOpacity(0.25).get()
                        : "#cccccc"),
                    "stroke-width": q(f.width, 1),
                  })
                  .css({ "pointer-events": "none" }),
                f.dashStyle && g.attr({ dashstyle: f.dashStyle })));
            g.show().attr({ d: h });
            d && !f.width && g.attr({ "stroke-width": this.transA });
            this.cross.e = c;
          } else this.hideCrosshair();
          l(this, "afterDrawCrosshair", { e: c, point: a });
        };
        b.prototype.hideCrosshair = function () {
          this.cross && this.cross.hide();
          l(this, "afterHideCrosshair");
        };
        b.prototype.hasVerticalPanning = function () {
          var c = this.chart.options.chart.panning;
          return !!(c && c.enabled && /y/.test(c.type));
        };
        b.prototype.validatePositiveValue = function (c) {
          return f(c) && 0 < c;
        };
        b.prototype.update = function (c, a) {
          var f = this.chart;
          c = k(this.userOptions, c);
          this.destroy(!0);
          this.init(f, c);
          f.isDirtyBox = !0;
          q(a, !0) && f.redraw();
        };
        b.prototype.remove = function (c) {
          for (
            var a = this.chart, f = this.coll, d = this.series, k = d.length;
            k--;

          )
            d[k] && d[k].remove(!1);
          x(a.axes, this);
          x(a[f], this);
          a[f].forEach(function (c, a) {
            c.options.index = c.userOptions.index = a;
          });
          this.destroy();
          a.isDirtyBox = !0;
          q(c, !0) && a.redraw();
        };
        b.prototype.setTitle = function (c, a) {
          this.update({ title: c }, a);
        };
        b.prototype.setCategories = function (c, a) {
          this.update({ categories: c }, a);
        };
        b.defaultOptions = e.defaultXAxisOptions;
        b.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
        return b;
      })();
      ("");
      return b;
    }
  );
  I(e, "Core/Axis/DateTimeAxis.js", [e["Core/Utilities.js"]], function (b) {
    var e = b.addEvent,
      y = b.getMagnitude,
      B = b.normalizeTickInterval,
      v = b.timeUnits,
      t;
    (function (b) {
      function t() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
      }
      function r(a) {
        "datetime" !== a.userOptions.type
          ? (this.dateTime = void 0)
          : this.dateTime || (this.dateTime = new h(this));
      }
      var p = [];
      b.compose = function (a) {
        -1 === p.indexOf(a) &&
          (p.push(a),
          a.keepProps.push("dateTime"),
          (a.prototype.getTimeTicks = t),
          e(a, "init", r));
        return a;
      };
      var h = (function () {
        function a(a) {
          this.axis = a;
        }
        a.prototype.normalizeTimeTickInterval = function (a, b) {
          var d = b || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null],
          ];
          b = d[d.length - 1];
          var g = v[b[0]],
            h = b[1],
            e;
          for (
            e = 0;
            e < d.length &&
            !((b = d[e]),
            (g = v[b[0]]),
            (h = b[1]),
            d[e + 1] && a <= (g * h[h.length - 1] + v[d[e + 1][0]]) / 2);
            e++
          );
          g === v.year && a < 5 * g && (h = [1, 2, 5]);
          a = B(a / g, h, "year" === b[0] ? Math.max(y(a / g), 1) : 1);
          return { unitRange: g, count: a, unitName: b[0] };
        };
        a.prototype.getXDateFormat = function (a, b) {
          var d = this.axis,
            g = d.chart.time;
          return d.closestPointRange
            ? g.getDateFormat(
                d.closestPointRange,
                a,
                d.options.startOfWeek,
                b
              ) || g.resolveDTLFormat(b.year).main
            : g.resolveDTLFormat(b.day).main;
        };
        return a;
      })();
      b.Additions = h;
    })(t || (t = {}));
    return t;
  });
  I(e, "Core/Axis/LogarithmicAxis.js", [e["Core/Utilities.js"]], function (b) {
    var e = b.addEvent,
      y = b.normalizeTickInterval,
      B = b.pick,
      v;
    (function (b) {
      function t(b) {
        var a = this.logarithmic;
        "logarithmic" !== b.userOptions.type
          ? (this.logarithmic = void 0)
          : a || (this.logarithmic = new p(this));
      }
      function v() {
        var b = this.logarithmic;
        b &&
          ((this.lin2val = function (a) {
            return b.lin2log(a);
          }),
          (this.val2lin = function (a) {
            return b.log2lin(a);
          }));
      }
      var r = [];
      b.compose = function (b) {
        -1 === r.indexOf(b) &&
          (r.push(b),
          b.keepProps.push("logarithmic"),
          e(b, "init", t),
          e(b, "afterInit", v));
        return b;
      };
      var p = (function () {
        function b(a) {
          this.axis = a;
        }
        b.prototype.getLogTickPositions = function (a, d, b, h) {
          var g = this.axis,
            m = g.len,
            e = g.options,
            p = [];
          h || (this.minorAutoInterval = void 0);
          if (0.5 <= a)
            (a = Math.round(a)), (p = g.getLinearTickPositions(a, d, b));
          else if (0.08 <= a) {
            var C = Math.floor(d),
              u,
              l = (e = void 0);
            for (
              m =
                0.3 < a
                  ? [1, 2, 4]
                  : 0.15 < a
                  ? [1, 2, 4, 6, 8]
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9];
              C < b + 1 && !l;
              C++
            ) {
              var A = m.length;
              for (u = 0; u < A && !l; u++) {
                var f = this.log2lin(this.lin2log(C) * m[u]);
                f > d &&
                  (!h || e <= b) &&
                  "undefined" !== typeof e &&
                  p.push(e);
                e > b && (l = !0);
                e = f;
              }
            }
          } else
            (d = this.lin2log(d)),
              (b = this.lin2log(b)),
              (a = h ? g.getMinorTickInterval() : e.tickInterval),
              (a = B(
                "auto" === a ? null : a,
                this.minorAutoInterval,
                ((e.tickPixelInterval / (h ? 5 : 1)) * (b - d)) /
                  ((h ? m / g.tickPositions.length : m) || 1)
              )),
              (a = y(a)),
              (p = g.getLinearTickPositions(a, d, b).map(this.log2lin)),
              h || (this.minorAutoInterval = a / 5);
          h || (g.tickInterval = a);
          return p;
        };
        b.prototype.lin2log = function (a) {
          return Math.pow(10, a);
        };
        b.prototype.log2lin = function (a) {
          return Math.log(a) / Math.LN10;
        };
        return b;
      })();
      b.Additions = p;
    })(v || (v = {}));
    return v;
  });
  I(
    e,
    "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",
    [e["Core/Utilities.js"]],
    function (b) {
      var e = b.erase,
        y = b.extend,
        B = b.isNumber,
        v;
      (function (b) {
        var t = [],
          v;
        b.compose = function (b, h) {
          v || (v = b);
          -1 === t.indexOf(h) && (t.push(h), y(h.prototype, r.prototype));
          return h;
        };
        var r = (function () {
          function b() {}
          b.prototype.getPlotBandPath = function (b, a, d) {
            void 0 === d && (d = this.options);
            var g = this.getPlotLinePath({
                value: a,
                force: !0,
                acrossPanes: d.acrossPanes,
              }),
              h = [],
              e = this.horiz;
            a =
              !B(this.min) ||
              !B(this.max) ||
              (b < this.min && a < this.min) ||
              (b > this.max && a > this.max);
            b = this.getPlotLinePath({
              value: b,
              force: !0,
              acrossPanes: d.acrossPanes,
            });
            d = 1;
            if (b && g) {
              if (a) {
                var p = b.toString() === g.toString();
                d = 0;
              }
              for (a = 0; a < b.length; a += 2) {
                var r = b[a],
                  x = b[a + 1],
                  C = g[a],
                  u = g[a + 1];
                ("M" !== r[0] && "L" !== r[0]) ||
                  ("M" !== x[0] && "L" !== x[0]) ||
                  ("M" !== C[0] && "L" !== C[0]) ||
                  ("M" !== u[0] && "L" !== u[0]) ||
                  (e && C[1] === r[1]
                    ? ((C[1] += d), (u[1] += d))
                    : e || C[2] !== r[2] || ((C[2] += d), (u[2] += d)),
                  h.push(
                    ["M", r[1], r[2]],
                    ["L", x[1], x[2]],
                    ["L", u[1], u[2]],
                    ["L", C[1], C[2]],
                    ["Z"]
                  ));
                h.isFlat = p;
              }
            }
            return h;
          };
          b.prototype.addPlotBand = function (b) {
            return this.addPlotBandOrLine(b, "plotBands");
          };
          b.prototype.addPlotLine = function (b) {
            return this.addPlotBandOrLine(b, "plotLines");
          };
          b.prototype.addPlotBandOrLine = function (b, a) {
            var d = this,
              g = this.userOptions,
              h = new v(this, b);
            this.visible && (h = h.render());
            if (h) {
              this._addedPlotLB ||
                ((this._addedPlotLB = !0),
                (g.plotLines || [])
                  .concat(g.plotBands || [])
                  .forEach(function (a) {
                    d.addPlotBandOrLine(a);
                  }));
              if (a) {
                var e = g[a] || [];
                e.push(b);
                g[a] = e;
              }
              this.plotLinesAndBands.push(h);
            }
            return h;
          };
          b.prototype.removePlotBandOrLine = function (b) {
            var a = this.plotLinesAndBands,
              d = this.options,
              g = this.userOptions;
            if (a) {
              for (var h = a.length; h--; ) a[h].id === b && a[h].destroy();
              [
                d.plotLines || [],
                g.plotLines || [],
                d.plotBands || [],
                g.plotBands || [],
              ].forEach(function (a) {
                for (h = a.length; h--; ) (a[h] || {}).id === b && e(a, a[h]);
              });
            }
          };
          b.prototype.removePlotBand = function (b) {
            this.removePlotBandOrLine(b);
          };
          b.prototype.removePlotLine = function (b) {
            this.removePlotBandOrLine(b);
          };
          return b;
        })();
      })(v || (v = {}));
      return v;
    }
  );
  I(
    e,
    "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
    [
      e["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e) {
      var y = e.arrayMax,
        B = e.arrayMin,
        v = e.defined,
        t = e.destroyObjectProperties,
        F = e.erase,
        z = e.fireEvent,
        r = e.merge,
        p = e.objectEach,
        h = e.pick;
      e = (function () {
        function a(a, b) {
          this.axis = a;
          b && ((this.options = b), (this.id = b.id));
        }
        a.compose = function (d) {
          return b.compose(a, d);
        };
        a.prototype.render = function () {
          z(this, "render");
          var a = this,
            b = a.axis,
            m = b.horiz,
            e = b.logarithmic,
            G = a.options,
            J = G.color,
            x = h(G.zIndex, 0),
            C = G.events,
            u = {},
            l = b.chart.renderer,
            A = G.label,
            f = a.label,
            w = G.to,
            k = G.from,
            D = G.value,
            c = a.svgElem,
            q = [],
            E = v(k) && v(w);
          q = v(D);
          var H = !c,
            Q = {
              class:
                "highcharts-plot-" +
                (E ? "band " : "line ") +
                (G.className || ""),
            },
            L = E ? "bands" : "lines";
          e && ((k = e.log2lin(k)), (w = e.log2lin(w)), (D = e.log2lin(D)));
          b.chart.styledMode ||
            (q
              ? ((Q.stroke = J || "#999999"),
                (Q["stroke-width"] = h(G.width, 1)),
                G.dashStyle && (Q.dashstyle = G.dashStyle))
              : E &&
                ((Q.fill = J || "#e6ebf5"),
                G.borderWidth &&
                  ((Q.stroke = G.borderColor),
                  (Q["stroke-width"] = G.borderWidth))));
          u.zIndex = x;
          L += "-" + x;
          (e = b.plotLinesAndBandsGroups[L]) ||
            (b.plotLinesAndBandsGroups[L] = e =
              l
                .g("plot-" + L)
                .attr(u)
                .add());
          H && (a.svgElem = c = l.path().attr(Q).add(e));
          if (q)
            q = b.getPlotLinePath({
              value: D,
              lineWidth: c.strokeWidth(),
              acrossPanes: G.acrossPanes,
            });
          else if (E) q = b.getPlotBandPath(k, w, G);
          else return;
          !a.eventsAdded &&
            C &&
            (p(C, function (f, d) {
              c.on(d, function (c) {
                C[d].apply(a, [c]);
              });
            }),
            (a.eventsAdded = !0));
          (H || !c.d) && q && q.length
            ? c.attr({ d: q })
            : c &&
              (q
                ? (c.show(), c.animate({ d: q }))
                : c.d && (c.hide(), f && (a.label = f = f.destroy())));
          A &&
          (v(A.text) || v(A.formatter)) &&
          q &&
          q.length &&
          0 < b.width &&
          0 < b.height &&
          !q.isFlat
            ? ((A = r(
                {
                  align: m && E && "center",
                  x: m ? !E && 4 : 10,
                  verticalAlign: !m && E && "middle",
                  y: m ? (E ? 16 : 10) : E ? 6 : -4,
                  rotation: m && !E && 90,
                },
                A
              )),
              this.renderLabel(A, q, E, x))
            : f && f.hide();
          return a;
        };
        a.prototype.renderLabel = function (a, b, h, e) {
          var d = this.axis,
            g = d.chart.renderer,
            m = this.label;
          m ||
            ((this.label = m =
              g
                .text(this.getLabelText(a), 0, 0, a.useHTML)
                .attr({
                  align: a.textAlign || a.align,
                  rotation: a.rotation,
                  class:
                    "highcharts-plot-" +
                    (h ? "band" : "line") +
                    "-label " +
                    (a.className || ""),
                  zIndex: e,
                })
                .add()),
            d.chart.styledMode ||
              m.css(r({ textOverflow: "ellipsis" }, a.style)));
          e = b.xBounds || [b[0][1], b[1][1], h ? b[2][1] : b[0][1]];
          b = b.yBounds || [b[0][2], b[1][2], h ? b[2][2] : b[0][2]];
          h = B(e);
          g = B(b);
          m.align(a, !1, { x: h, y: g, width: y(e) - h, height: y(b) - g });
          (m.alignValue && "left" !== m.alignValue) ||
            m.css({
              width:
                (90 === m.rotation
                  ? d.height - (m.alignAttr.y - d.top)
                  : d.width - (m.alignAttr.x - d.left)) + "px",
            });
          m.show(!0);
        };
        a.prototype.getLabelText = function (a) {
          return v(a.formatter) ? a.formatter.call(this) : a.text;
        };
        a.prototype.destroy = function () {
          F(this.axis.plotLinesAndBands, this);
          delete this.axis;
          t(this);
        };
        return a;
      })();
      ("");
      ("");
      return e;
    }
  );
  I(
    e,
    "Core/Tooltip.js",
    [
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Renderer/RendererUtilities.js"],
      e["Core/Renderer/RendererRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v) {
      var t = b.format,
        F = e.doc,
        z = y.distribute,
        r = v.addEvent,
        p = v.clamp,
        h = v.css,
        a = v.defined,
        d = v.discardElement,
        g = v.extend,
        m = v.fireEvent,
        n = v.isArray,
        G = v.isNumber,
        J = v.isString,
        x = v.merge,
        C = v.pick,
        u = v.splat,
        l = v.syncTimeout;
      b = (function () {
        function b(a, d) {
          this.allowShared = !0;
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = a;
          this.init(a, d);
        }
        b.prototype.applyFilter = function () {
          var a = this.chart;
          a.renderer.definition({
            tagName: "filter",
            attributes: { id: "drop-shadow-" + a.index, opacity: 0.5 },
            children: [
              {
                tagName: "feGaussianBlur",
                attributes: { in: "SourceAlpha", stdDeviation: 1 },
              },
              { tagName: "feOffset", attributes: { dx: 1, dy: 1 } },
              {
                tagName: "feComponentTransfer",
                children: [
                  {
                    tagName: "feFuncA",
                    attributes: { type: "linear", slope: 0.3 },
                  },
                ],
              },
              {
                tagName: "feMerge",
                children: [
                  { tagName: "feMergeNode" },
                  {
                    tagName: "feMergeNode",
                    attributes: { in: "SourceGraphic" },
                  },
                ],
              },
            ],
          });
        };
        b.prototype.bodyFormatter = function (a) {
          return a.map(function (a) {
            var f = a.series.tooltipOptions;
            return (
              f[(a.point.formatPrefix || "point") + "Formatter"] ||
              a.point.tooltipFormatter
            ).call(
              a.point,
              f[(a.point.formatPrefix || "point") + "Format"] || ""
            );
          });
        };
        b.prototype.cleanSplit = function (a) {
          this.chart.series.forEach(function (f) {
            var d = f && f.tt;
            d && (!d.isActive || a ? (f.tt = d.destroy()) : (d.isActive = !1));
          });
        };
        b.prototype.defaultFormatter = function (a) {
          var f = this.points || u(this);
          var d = [a.tooltipFooterHeaderFormatter(f[0])];
          d = d.concat(a.bodyFormatter(f));
          d.push(a.tooltipFooterHeaderFormatter(f[0], !0));
          return d;
        };
        b.prototype.destroy = function () {
          this.label && (this.label = this.label.destroy());
          this.split &&
            this.tt &&
            (this.cleanSplit(!0), (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), d(this.container));
          v.clearTimeout(this.hideTimer);
          v.clearTimeout(this.tooltipTimeout);
        };
        b.prototype.getAnchor = function (a, d) {
          var f = this.chart,
            b = f.pointer,
            c = f.inverted,
            g = f.plotTop,
            l = f.plotLeft,
            h,
            w,
            m = 0,
            e = 0;
          a = u(a);
          this.followPointer && d
            ? ("undefined" === typeof d.chartX && (d = b.normalize(d)),
              (b = [d.chartX - l, d.chartY - g]))
            : a[0].tooltipPos
            ? (b = a[0].tooltipPos)
            : (a.forEach(function (a) {
                h = a.series.yAxis;
                w = a.series.xAxis;
                m += a.plotX || 0;
                e += a.plotLow
                  ? (a.plotLow + (a.plotHigh || 0)) / 2
                  : a.plotY || 0;
                w &&
                  h &&
                  (c
                    ? ((m += g + f.plotHeight - w.len - w.pos),
                      (e += l + f.plotWidth - h.len - h.pos))
                    : ((m += w.pos - l), (e += h.pos - g)));
              }),
              (m /= a.length),
              (e /= a.length),
              (b = [c ? f.plotWidth - e : m, c ? f.plotHeight - m : e]),
              this.shared &&
                1 < a.length &&
                d &&
                (c ? (b[0] = d.chartX - l) : (b[1] = d.chartY - g)));
          return b.map(Math.round);
        };
        b.prototype.getLabel = function () {
          var f = this,
            d = this.chart.styledMode,
            k = this.options,
            b = this.split && this.allowShared,
            c = "tooltip" + (a(k.className) ? " " + k.className : ""),
            g =
              k.style.pointerEvents ||
              (!this.followPointer && k.stickOnContact ? "auto" : "none"),
            l = function () {
              f.inContact = !0;
            },
            m = function (c) {
              var a = f.chart.hoverSeries;
              f.inContact =
                f.shouldStickOnContact() &&
                f.chart.pointer.inClass(c.relatedTarget, "highcharts-tooltip");
              if (!f.inContact && a && a.onMouseOut) a.onMouseOut();
            },
            n,
            A = this.chart.renderer;
          if (f.label) {
            var u = !f.label.hasClass("highcharts-label");
            ((b && !u) || (!b && u)) && f.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              u = this.chart.options.chart.style;
              var p = B.getRendererType();
              this.container = n = e.doc.createElement("div");
              n.className = "highcharts-tooltip-container";
              h(n, {
                position: "absolute",
                top: "1px",
                pointerEvents: g,
                zIndex: Math.max(
                  this.options.style.zIndex || 0,
                  ((u && u.zIndex) || 0) + 3
                ),
              });
              r(n, "mouseenter", l);
              r(n, "mouseleave", m);
              e.doc.body.appendChild(n);
              this.renderer = A = new p(
                n,
                0,
                0,
                u,
                void 0,
                void 0,
                A.styledMode
              );
            }
            b
              ? (this.label = A.g(c))
              : ((this.label = A.label(
                  "",
                  0,
                  0,
                  k.shape,
                  void 0,
                  void 0,
                  k.useHTML,
                  void 0,
                  c
                ).attr({ padding: k.padding, r: k.borderRadius })),
                d ||
                  this.label
                    .attr({
                      fill: k.backgroundColor,
                      "stroke-width": k.borderWidth,
                    })
                    .css(k.style)
                    .css({ pointerEvents: g })
                    .shadow(k.shadow));
            d &&
              k.shadow &&
              (this.applyFilter(),
              this.label.attr({
                filter: "url(#drop-shadow-" + this.chart.index + ")",
              }));
            if (f.outside && !f.split) {
              var x = this.label,
                C = x.xSetter,
                G = x.ySetter;
              x.xSetter = function (c) {
                C.call(x, f.distance);
                n.style.left = c + "px";
              };
              x.ySetter = function (c) {
                G.call(x, f.distance);
                n.style.top = c + "px";
              };
            }
            this.label
              .on("mouseenter", l)
              .on("mouseleave", m)
              .attr({ zIndex: 8 })
              .add();
          }
          return this.label;
        };
        b.prototype.getPosition = function (a, d, k) {
          var f = this.chart,
            c = this.distance,
            b = {},
            g = (f.inverted && k.h) || 0,
            l = this.outside,
            h = l ? F.documentElement.clientWidth - 2 * c : f.chartWidth,
            w = l
              ? Math.max(
                  F.body.scrollHeight,
                  F.documentElement.scrollHeight,
                  F.body.offsetHeight,
                  F.documentElement.offsetHeight,
                  F.documentElement.clientHeight
                )
              : f.chartHeight,
            m = f.pointer.getChartPosition(),
            e = function (b) {
              var g = "x" === b;
              return [b, g ? h : w, g ? a : d].concat(
                l
                  ? [
                      g ? a * m.scaleX : d * m.scaleY,
                      g
                        ? m.left - c + (k.plotX + f.plotLeft) * m.scaleX
                        : m.top - c + (k.plotY + f.plotTop) * m.scaleY,
                      0,
                      g ? h : w,
                    ]
                  : [
                      g ? a : d,
                      g ? k.plotX + f.plotLeft : k.plotY + f.plotTop,
                      g ? f.plotLeft : f.plotTop,
                      g ? f.plotLeft + f.plotWidth : f.plotTop + f.plotHeight,
                    ]
              );
            },
            n = e("y"),
            u = e("x"),
            A;
          e = !!k.negative;
          !f.polar &&
            f.hoverSeries &&
            f.hoverSeries.yAxis &&
            f.hoverSeries.yAxis.reversed &&
            (e = !e);
          var p = !this.followPointer && C(k.ttBelow, !f.inverted === e),
            x = function (a, f, d, k, q, h, w) {
              var D = l ? ("y" === a ? c * m.scaleY : c * m.scaleX) : c,
                e = (d - k) / 2,
                E = k < q - c,
                n = q + c + k < f,
                u = q - D - d + e;
              q = q + D - e;
              if (p && n) b[a] = q;
              else if (!p && E) b[a] = u;
              else if (E) b[a] = Math.min(w - k, 0 > u - g ? u : u - g);
              else if (n) b[a] = Math.max(h, q + g + d > f ? q : q + g);
              else return !1;
            },
            r = function (a, f, d, k, g) {
              var q;
              g < c || g > f - c
                ? (q = !1)
                : (b[a] =
                    g < d / 2 ? 1 : g > f - k / 2 ? f - k - 2 : g - d / 2);
              return q;
            },
            G = function (c) {
              var a = n;
              n = u;
              u = a;
              A = c;
            },
            J = function () {
              !1 !== x.apply(0, n)
                ? !1 !== r.apply(0, u) || A || (G(!0), J())
                : A
                ? (b.x = b.y = 0)
                : (G(!0), J());
            };
          (f.inverted || 1 < this.len) && G();
          J();
          return b;
        };
        b.prototype.hide = function (a) {
          var f = this;
          v.clearTimeout(this.hideTimer);
          a = C(a, this.options.hideDelay);
          this.isHidden ||
            (this.hideTimer = l(function () {
              f.getLabel().fadeOut(a ? void 0 : a);
              f.isHidden = !0;
            }, a));
        };
        b.prototype.init = function (a, d) {
          this.chart = a;
          this.options = d;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = d.split && !a.inverted && !a.polar;
          this.shared = d.shared || this.split;
          this.outside = C(
            d.outside,
            !(!a.scrollablePixelsX && !a.scrollablePixelsY)
          );
        };
        b.prototype.shouldStickOnContact = function () {
          return !(this.followPointer || !this.options.stickOnContact);
        };
        b.prototype.isStickyOnContact = function () {
          return !(!this.shouldStickOnContact() || !this.inContact);
        };
        b.prototype.move = function (a, d, k, b) {
          var c = this,
            f = c.now,
            l =
              !1 !== c.options.animation &&
              !c.isHidden &&
              (1 < Math.abs(a - f.x) || 1 < Math.abs(d - f.y)),
            h = c.followPointer || 1 < c.len;
          g(f, {
            x: l ? (2 * f.x + a) / 3 : a,
            y: l ? (f.y + d) / 2 : d,
            anchorX: h ? void 0 : l ? (2 * f.anchorX + k) / 3 : k,
            anchorY: h ? void 0 : l ? (f.anchorY + b) / 2 : b,
          });
          c.getLabel().attr(f);
          c.drawTracker();
          l &&
            (v.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              c && c.move(a, d, k, b);
            }, 32)));
        };
        b.prototype.refresh = function (a, d) {
          var f = this.chart,
            b = this.options,
            c = u(a),
            g = c[0],
            l = [],
            h = b.formatter || this.defaultFormatter,
            w = this.shared,
            e = f.styledMode,
            A = {};
          if (b.enabled && g.series) {
            v.clearTimeout(this.hideTimer);
            this.allowShared = !(!n(a) && a.series && a.series.noSharedTooltip);
            this.followPointer =
              !this.split && g.series.tooltipOptions.followPointer;
            a = this.getAnchor(a, d);
            var p = a[0],
              x = a[1];
            w && this.allowShared
              ? (f.pointer.applyInactiveState(c),
                c.forEach(function (c) {
                  c.setState("hover");
                  l.push(c.getLabelConfig());
                }),
                (A = { x: g.category, y: g.y }),
                (A.points = l))
              : (A = g.getLabelConfig());
            this.len = l.length;
            h = h.call(A, this);
            w = g.series;
            this.distance = C(w.tooltipOptions.distance, 16);
            if (!1 === h) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(h, c);
              else {
                var r = p,
                  G = x;
                d &&
                  f.pointer.isDirectTouch &&
                  ((r = d.chartX - f.plotLeft), (G = d.chartY - f.plotTop));
                if (
                  f.polar ||
                  !1 === w.options.clip ||
                  c.some(function (c) {
                    return c.series.shouldShowTooltip(r, G);
                  })
                )
                  (d = this.getLabel()),
                    (b.style.width && !e) ||
                      d.css({ width: this.chart.spacingBox.width + "px" }),
                    d.attr({ text: h && h.join ? h.join("") : h }),
                    d
                      .removeClass(/highcharts-color-[\d]+/g)
                      .addClass(
                        "highcharts-color-" + C(g.colorIndex, w.colorIndex)
                      ),
                    e ||
                      d.attr({
                        stroke:
                          b.borderColor || g.color || w.color || "#666666",
                      }),
                    this.updatePosition({
                      plotX: p,
                      plotY: x,
                      negative: g.negative,
                      ttBelow: g.ttBelow,
                      h: a[2] || 0,
                    });
                else {
                  this.hide();
                  return;
                }
              }
              this.isHidden &&
                this.label &&
                this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            m(this, "refresh");
          }
        };
        b.prototype.renderSplit = function (a, d) {
          function f(c, a, f, d, k) {
            void 0 === k && (k = !0);
            f
              ? ((a = K ? 0 : I),
                (c = p(c - d / 2, O.left, O.right - d - (b.outside ? N : 0))))
              : ((a -= aa),
                (c = k ? c - d - t : c + t),
                (c = p(c, k ? c : O.left, O.right)));
            return { x: c, y: a };
          }
          var b = this,
            c = b.chart,
            q = b.chart,
            l = q.chartWidth,
            h = q.chartHeight,
            m = q.plotHeight,
            w = q.plotLeft,
            e = q.plotTop,
            n = q.pointer,
            u = q.scrollablePixelsY;
          u = void 0 === u ? 0 : u;
          var A = q.scrollablePixelsX,
            x = q.scrollingContainer;
          x = void 0 === x ? { scrollLeft: 0, scrollTop: 0 } : x;
          var r = x.scrollLeft;
          x = x.scrollTop;
          var G = q.styledMode,
            t = b.distance,
            R = b.options,
            v = b.options.positioner,
            O =
              b.outside && "number" !== typeof A
                ? F.documentElement.getBoundingClientRect()
                : { left: r, right: r + l, top: x, bottom: x + h },
            y = b.getLabel(),
            B = this.renderer || c.renderer,
            K = !(!c.xAxis[0] || !c.xAxis[0].opposite);
          c = n.getChartPosition();
          var N = c.left;
          c = c.top;
          var aa = e + x,
            ca = 0,
            I = m - u;
          J(a) && (a = [!1, a]);
          a = a.slice(0, d.length + 1).reduce(function (c, a, k) {
            if (!1 !== a && "" !== a) {
              k = d[k - 1] || {
                isHeader: !0,
                plotX: d[0].plotX,
                plotY: m,
                series: {},
              };
              var g = k.isHeader,
                q = g ? b : k.series;
              a = a.toString();
              var l = q.tt,
                h = k.isHeader;
              var D = k.series;
              var E =
                "highcharts-color-" + C(k.colorIndex, D.colorIndex, "none");
              l ||
                ((l = { padding: R.padding, r: R.borderRadius }),
                G ||
                  ((l.fill = R.backgroundColor),
                  (l["stroke-width"] = R.borderWidth)),
                (l = B.label(
                  "",
                  0,
                  0,
                  R[h ? "headerShape" : "shape"],
                  void 0,
                  void 0,
                  R.useHTML
                )
                  .addClass(
                    (h ? "highcharts-tooltip-header " : "") +
                      "highcharts-tooltip-box " +
                      E
                  )
                  .attr(l)
                  .add(y)));
              l.isActive = !0;
              l.attr({ text: a });
              G ||
                l
                  .css(R.style)
                  .shadow(R.shadow)
                  .attr({
                    stroke: R.borderColor || k.color || D.color || "#333333",
                  });
              q = q.tt = l;
              h = q.getBBox();
              a = h.width + q.strokeWidth();
              g && ((ca = h.height), (I += ca), K && (aa -= ca));
              D = k.plotX;
              D = void 0 === D ? 0 : D;
              E = k.plotY;
              E = void 0 === E ? 0 : E;
              l = k.series;
              if (k.isHeader) {
                D = w + D;
                var u = e + m / 2;
              } else {
                var n = l.xAxis,
                  A = l.yAxis;
                D = n.pos + p(D, -t, n.len + t);
                l.shouldShowTooltip(0, A.pos - e + E, { ignoreX: !0 }) &&
                  (u = A.pos + E);
              }
              D = p(D, O.left - t, O.right + t);
              "number" === typeof u
                ? ((h = h.height + 1),
                  (E = v ? v.call(b, a, h, k) : f(D, u, g, a)),
                  c.push({
                    align: v ? 0 : void 0,
                    anchorX: D,
                    anchorY: u,
                    boxWidth: a,
                    point: k,
                    rank: C(E.rank, g ? 1 : 0),
                    size: h,
                    target: E.y,
                    tt: q,
                    x: E.x,
                  }))
                : (q.isActive = !1);
            }
            return c;
          }, []);
          !v &&
            a.some(function (c) {
              var a = (b.outside ? N : 0) + c.anchorX;
              return a < O.left && a + c.boxWidth < O.right
                ? !0
                : a < N - O.left + c.boxWidth && O.right - a > a;
            }) &&
            (a = a.map(function (c) {
              var a = f(c.anchorX, c.anchorY, c.point.isHeader, c.boxWidth, !1);
              return g(c, { target: a.y, x: a.x });
            }));
          b.cleanSplit();
          z(a, I);
          var Z = N,
            da = N;
          a.forEach(function (c) {
            var a = c.x,
              f = c.boxWidth;
            c = c.isHeader;
            c ||
              (b.outside && N + a < Z && (Z = N + a),
              !c && b.outside && Z + f > da && (da = N + a));
          });
          a.forEach(function (c) {
            var a = c.x,
              f = c.anchorX,
              d = c.pos,
              k = c.point.isHeader;
            d = {
              visibility: "undefined" === typeof d ? "hidden" : "inherit",
              x: a,
              y: d + aa,
              anchorX: f,
              anchorY: c.anchorY,
            };
            if (b.outside && a < f) {
              var g = N - Z;
              0 < g &&
                (k || ((d.x = a + g), (d.anchorX = f + g)),
                k && ((d.x = (da - Z) / 2), (d.anchorX = f + g)));
            }
            c.tt.attr(d);
          });
          a = b.container;
          u = b.renderer;
          b.outside &&
            a &&
            u &&
            ((q = y.getBBox()),
            u.setSize(q.width + q.x, q.height + q.y, !1),
            (a.style.left = Z + "px"),
            (a.style.top = c + "px"));
        };
        b.prototype.drawTracker = function () {
          if (this.followPointer || !this.options.stickOnContact)
            this.tracker && this.tracker.destroy();
          else {
            var a = this.chart,
              d = this.label,
              b = this.shared ? a.hoverPoints : a.hoverPoint;
            if (d && b) {
              var g = { x: 0, y: 0, width: 0, height: 0 };
              b = this.getAnchor(b);
              var c = d.getBBox();
              b[0] += a.plotLeft - d.translateX;
              b[1] += a.plotTop - d.translateY;
              g.x = Math.min(0, b[0]);
              g.y = Math.min(0, b[1]);
              g.width =
                0 > b[0]
                  ? Math.max(Math.abs(b[0]), c.width - b[0])
                  : Math.max(Math.abs(b[0]), c.width);
              g.height =
                0 > b[1]
                  ? Math.max(Math.abs(b[1]), c.height - Math.abs(b[1]))
                  : Math.max(Math.abs(b[1]), c.height);
              this.tracker
                ? this.tracker.attr(g)
                : ((this.tracker = d.renderer
                    .rect(g)
                    .addClass("highcharts-tracker")
                    .add(d)),
                  a.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          }
        };
        b.prototype.styledModeFormat = function (a) {
          return a
            .replace('style="font-size: 10px"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex}"'
            );
        };
        b.prototype.tooltipFooterHeaderFormatter = function (a, d) {
          var f = a.series,
            b = f.tooltipOptions,
            c = f.xAxis,
            g = c && c.dateTime;
          c = { isFooter: d, labelConfig: a };
          var l = b.xDateFormat,
            h = b[d ? "footerFormat" : "headerFormat"];
          m(this, "headerFormatter", c, function (c) {
            g &&
              !l &&
              G(a.key) &&
              (l = g.getXDateFormat(a.key, b.dateTimeLabelFormats));
            g &&
              l &&
              ((a.point && a.point.tooltipDateKeys) || ["key"]).forEach(
                function (c) {
                  h = h.replace(
                    "{point." + c + "}",
                    "{point." + c + ":" + l + "}"
                  );
                }
              );
            f.chart.styledMode && (h = this.styledModeFormat(h));
            c.text = t(h, { point: a, series: f }, this.chart);
          });
          return c.text;
        };
        b.prototype.update = function (a) {
          this.destroy();
          x(!0, this.chart.options.tooltip.userOptions, a);
          this.init(this.chart, x(!0, this.options, a));
        };
        b.prototype.updatePosition = function (a) {
          var f = this.chart,
            d = this.options,
            b = f.pointer,
            c = this.getLabel();
          b = b.getChartPosition();
          var g = (d.positioner || this.getPosition).call(
              this,
              c.width,
              c.height,
              a
            ),
            l = a.plotX + f.plotLeft;
          a = a.plotY + f.plotTop;
          if (this.outside) {
            d = d.borderWidth + 2 * this.distance;
            this.renderer.setSize(c.width + d, c.height + d, !1);
            if (1 !== b.scaleX || 1 !== b.scaleY)
              h(this.container, {
                transform: "scale("
                  .concat(b.scaleX, ", ")
                  .concat(b.scaleY, ")"),
              }),
                (l *= b.scaleX),
                (a *= b.scaleY);
            l += b.left - g.x;
            a += b.top - g.y;
          }
          this.move(Math.round(g.x), Math.round(g.y || 0), l, a);
        };
        return b;
      })();
      ("");
      return b;
    }
  );
  I(
    e,
    "Core/Series/Point.js",
    [
      e["Core/Renderer/HTML/AST.js"],
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/DefaultOptions.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v) {
      var t = e.animObject,
        F = y.defaultOptions,
        z = B.format,
        r = v.addEvent,
        p = v.defined,
        h = v.erase,
        a = v.extend,
        d = v.fireEvent,
        g = v.getNestedProperty,
        m = v.isArray,
        n = v.isFunction,
        G = v.isNumber,
        J = v.isObject,
        x = v.merge,
        C = v.objectEach,
        u = v.pick,
        l = v.syncTimeout,
        A = v.removeEvent,
        f = v.uniqueKey;
      e = (function () {
        function e() {
          this.colorIndex = this.category = void 0;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.shapeArgs = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        e.prototype.animateBeforeDestroy = function () {
          var f = this,
            d = { x: f.startXPos, opacity: 0 },
            c = f.getGraphicalProps();
          c.singular.forEach(function (c) {
            f[c] = f[c].animate(
              "dataLabel" === c
                ? { x: f[c].startXPos, y: f[c].startYPos, opacity: 0 }
                : d
            );
          });
          c.plural.forEach(function (c) {
            f[c].forEach(function (c) {
              c.element &&
                c.animate(
                  a(
                    { x: f.startXPos },
                    c.startYPos ? { x: c.startXPos, y: c.startYPos } : {}
                  )
                );
            });
          });
        };
        e.prototype.applyOptions = function (f, d) {
          var c = this.series,
            b = c.options.pointValKey || c.pointValKey;
          f = e.prototype.optionsToObject.call(this, f);
          a(this, f);
          this.options = this.options ? a(this.options, f) : f;
          f.group && delete this.group;
          f.dataLabels && delete this.dataLabels;
          b && (this.y = e.prototype.getNestedProperty.call(this, b));
          this.formatPrefix = (this.isNull = u(
            this.isValid && !this.isValid(),
            null === this.x || !G(this.y)
          ))
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof d &&
            c.xAxis &&
            c.xAxis.hasNames &&
            (this.x = c.xAxis.nameToX(this));
          "undefined" === typeof this.x && c
            ? (this.x = "undefined" === typeof d ? c.autoIncrement() : d)
            : G(f.x) &&
              c.options.relativeXValue &&
              (this.x = c.autoIncrement(f.x));
          return this;
        };
        e.prototype.destroy = function () {
          function a() {
            if (f.graphic || f.dataLabel || f.dataLabels)
              A(f), f.destroyElements();
            for (e in f) f[e] = null;
          }
          var f = this,
            c = f.series,
            d = c.chart;
          c = c.options.dataSorting;
          var b = d.hoverPoints,
            g = t(f.series.chart.renderer.globalAnimation),
            e;
          f.legendItem && d.legend.destroyItem(f);
          b && (f.setState(), h(b, f), b.length || (d.hoverPoints = null));
          if (f === d.hoverPoint) f.onMouseOut();
          c && c.enabled
            ? (this.animateBeforeDestroy(), l(a, g.duration))
            : a();
          d.pointCount--;
        };
        e.prototype.destroyElements = function (a) {
          var f = this;
          a = f.getGraphicalProps(a);
          a.singular.forEach(function (c) {
            f[c] = f[c].destroy();
          });
          a.plural.forEach(function (c) {
            f[c].forEach(function (c) {
              c.element && c.destroy();
            });
            delete f[c];
          });
        };
        e.prototype.firePointEvent = function (a, f, c) {
          var b = this,
            k = this.series.options;
          (k.point.events[a] ||
            (b.options && b.options.events && b.options.events[a])) &&
            b.importEvents();
          "click" === a &&
            k.allowPointSelect &&
            (c = function (c) {
              b.select && b.select(null, c.ctrlKey || c.metaKey || c.shiftKey);
            });
          d(b, a, f, c);
        };
        e.prototype.getClassName = function () {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex
              ? " highcharts-color-" + this.colorIndex
              : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        };
        e.prototype.getGraphicalProps = function (a) {
          var f = this,
            c = [],
            d = { singular: [], plural: [] },
            b;
          a = a || { graphic: 1, dataLabel: 1 };
          a.graphic && c.push("graphic", "upperGraphic", "shadowGroup");
          a.dataLabel &&
            c.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector");
          for (b = c.length; b--; ) {
            var k = c[b];
            f[k] && d.singular.push(k);
          }
          ["dataLabel", "connector"].forEach(function (c) {
            var b = c + "s";
            a[c] && f[b] && d.plural.push(b);
          });
          return d;
        };
        e.prototype.getLabelConfig = function () {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        };
        e.prototype.getNestedProperty = function (a) {
          if (a)
            return 0 === a.indexOf("custom.") ? g(a, this.options) : this[a];
        };
        e.prototype.getZone = function () {
          var a = this.series,
            f = a.zones;
          a = a.zoneAxis || "y";
          var c,
            d = 0;
          for (c = f[d]; this[a] >= c.value; ) c = f[++d];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            c && c.color && !this.options.color ? c.color : this.nonZonedColor;
          return c;
        };
        e.prototype.hasNewShapeType = function () {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        };
        e.prototype.init = function (a, b, c) {
          this.series = a;
          this.applyOptions(b, c);
          this.id = p(this.id) ? this.id : f();
          this.resolveColor();
          a.chart.pointCount++;
          d(this, "afterInit");
          return this;
        };
        e.prototype.optionsToObject = function (a) {
          var f = this.series,
            c = f.options.keys,
            d = c || f.pointArrayMap || ["y"],
            b = d.length,
            k = {},
            g = 0,
            l = 0;
          if (G(a) || null === a) k[d[0]] = a;
          else if (m(a))
            for (
              !c &&
              a.length > b &&
              ((f = typeof a[0]),
              "string" === f ? (k.name = a[0]) : "number" === f && (k.x = a[0]),
              g++);
              l < b;

            )
              (c && "undefined" === typeof a[g]) ||
                (0 < d[l].indexOf(".")
                  ? e.prototype.setNestedProperty(k, a[g], d[l])
                  : (k[d[l]] = a[g])),
                g++,
                l++;
          else
            "object" === typeof a &&
              ((k = a),
              a.dataLabels && (f._hasPointLabels = !0),
              a.marker && (f._hasPointMarkers = !0));
          return k;
        };
        e.prototype.resolveColor = function () {
          var a = this.series,
            f = a.chart.styledMode;
          var c = a.chart.options.chart.colorCount;
          delete this.nonZonedColor;
          if (a.options.colorByPoint) {
            if (!f) {
              c = a.options.colors || a.chart.options.colors;
              var d = c[a.colorCounter];
              c = c.length;
            }
            f = a.colorCounter;
            a.colorCounter++;
            a.colorCounter === c && (a.colorCounter = 0);
          } else f || (d = a.color), (f = a.colorIndex);
          this.colorIndex = u(this.options.colorIndex, f);
          this.color = u(this.options.color, d);
        };
        e.prototype.setNestedProperty = function (a, f, c) {
          c.split(".").reduce(function (c, a, d, b) {
            c[a] = b.length - 1 === d ? f : J(c[a], !0) ? c[a] : {};
            return c[a];
          }, a);
          return a;
        };
        e.prototype.tooltipFormatter = function (a) {
          var f = this.series,
            c = f.tooltipOptions,
            d = u(c.valueDecimals, ""),
            b = c.valuePrefix || "",
            k = c.valueSuffix || "";
          f.chart.styledMode && (a = f.chart.tooltip.styledModeFormat(a));
          (f.pointArrayMap || ["y"]).forEach(function (c) {
            c = "{point." + c;
            if (b || k) a = a.replace(RegExp(c + "}", "g"), b + c + "}" + k);
            a = a.replace(RegExp(c + "}", "g"), c + ":,." + d + "f}");
          });
          return z(a, { point: this, series: this.series }, f.chart);
        };
        e.prototype.update = function (a, f, c, d) {
          function b() {
            k.applyOptions(a);
            var d = l && k.hasDummyGraphic;
            d = null === k.y ? !d : d;
            l && d && ((k.graphic = l.destroy()), delete k.hasDummyGraphic);
            J(a, !0) &&
              (l &&
                l.element &&
                a &&
                a.marker &&
                "undefined" !== typeof a.marker.symbol &&
                (k.graphic = l.destroy()),
              a &&
                a.dataLabels &&
                k.dataLabel &&
                (k.dataLabel = k.dataLabel.destroy()),
              k.connector && (k.connector = k.connector.destroy()));
            e = k.index;
            g.updateParallelArrays(k, e);
            q.data[e] =
              J(q.data[e], !0) || J(a, !0) ? k.options : u(a, q.data[e]);
            g.isDirty = g.isDirtyData = !0;
            !g.fixedBox && g.hasCartesianSeries && (h.isDirtyBox = !0);
            "point" === q.legendType && (h.isDirtyLegend = !0);
            f && h.redraw(c);
          }
          var k = this,
            g = k.series,
            l = k.graphic,
            h = g.chart,
            q = g.options,
            e;
          f = u(f, !0);
          !1 === d ? b() : k.firePointEvent("update", { options: a }, b);
        };
        e.prototype.remove = function (a, f) {
          this.series.removePoint(this.series.data.indexOf(this), a, f);
        };
        e.prototype.select = function (a, f) {
          var c = this,
            d = c.series,
            b = d.chart;
          this.selectedStaging = a = u(a, !c.selected);
          c.firePointEvent(
            a ? "select" : "unselect",
            { accumulate: f },
            function () {
              c.selected = c.options.selected = a;
              d.options.data[d.data.indexOf(c)] = c.options;
              c.setState(a && "select");
              f ||
                b.getSelectedPoints().forEach(function (a) {
                  var f = a.series;
                  a.selected &&
                    a !== c &&
                    ((a.selected = a.options.selected = !1),
                    (f.options.data[f.data.indexOf(a)] = a.options),
                    a.setState(
                      b.hoverPoints && f.options.inactiveOtherPoints
                        ? "inactive"
                        : ""
                    ),
                    a.firePointEvent("unselect"));
                });
            }
          );
          delete this.selectedStaging;
        };
        e.prototype.onMouseOver = function (a) {
          var f = this.series.chart,
            c = f.pointer;
          a = a
            ? c.normalize(a)
            : c.getChartCoordinatesFromPoint(this, f.inverted);
          c.runPointActions(a, this);
        };
        e.prototype.onMouseOut = function () {
          var a = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (a.hoverPoints || []).forEach(function (a) {
              a.setState();
            });
          a.hoverPoints = a.hoverPoint = null;
        };
        e.prototype.importEvents = function () {
          if (!this.hasImportedEvents) {
            var a = this,
              f = x(a.series.options.point, a.options).events;
            a.events = f;
            C(f, function (c, f) {
              n(c) && r(a, f, c);
            });
            this.hasImportedEvents = !0;
          }
        };
        e.prototype.setState = function (f, g) {
          var c = this.series,
            k = this.state,
            l = c.options.states[f || "normal"] || {},
            h = F.plotOptions[c.type].marker && c.options.marker,
            e = h && !1 === h.enabled,
            m = (h && h.states && h.states[f || "normal"]) || {},
            w = !1 === m.enabled,
            n = this.marker || {},
            A = c.chart,
            D = h && c.markerAttribs,
            p = c.halo,
            x,
            C = c.stateMarkerGraphic;
          f = f || "";
          if (
            !(
              (f === this.state && !g) ||
              (this.selected && "select" !== f) ||
              !1 === l.enabled ||
              (f && (w || (e && !1 === m.enabled))) ||
              (f && n.states && n.states[f] && !1 === n.states[f].enabled)
            )
          ) {
            this.state = f;
            D && (x = c.markerAttribs(this, f));
            if (this.graphic && !this.hasDummyGraphic) {
              k && this.graphic.removeClass("highcharts-point-" + k);
              f && this.graphic.addClass("highcharts-point-" + f);
              if (!A.styledMode) {
                var r = c.pointAttribs(this, f);
                var R = u(A.options.chart.animation, l.animation);
                c.options.inactiveOtherPoints &&
                  G(r.opacity) &&
                  ((this.dataLabels || []).forEach(function (c) {
                    c && c.animate({ opacity: r.opacity }, R);
                  }),
                  this.connector &&
                    this.connector.animate({ opacity: r.opacity }, R));
                this.graphic.animate(r, R);
              }
              x &&
                this.graphic.animate(
                  x,
                  u(A.options.chart.animation, m.animation, h.animation)
                );
              C && C.hide();
            } else {
              if (f && m) {
                k = n.symbol || c.symbol;
                C && C.currentSymbol !== k && (C = C.destroy());
                if (x)
                  if (C) C[g ? "animate" : "attr"]({ x: x.x, y: x.y });
                  else
                    k &&
                      ((c.stateMarkerGraphic = C =
                        A.renderer
                          .symbol(k, x.x, x.y, x.width, x.height)
                          .add(c.markerGroup)),
                      (C.currentSymbol = k));
                !A.styledMode &&
                  C &&
                  "inactive" !== this.state &&
                  C.attr(c.pointAttribs(this, f));
              }
              C &&
                (C[f && this.isInside ? "show" : "hide"](),
                (C.element.point = this),
                C.addClass(this.getClassName(), !0));
            }
            l = l.halo;
            x = ((C = this.graphic || C) && C.visibility) || "inherit";
            l && l.size && C && "hidden" !== x && !this.isCluster
              ? (p || (c.halo = p = A.renderer.path().add(C.parentGroup)),
                p.show()[g ? "animate" : "attr"]({ d: this.haloPath(l.size) }),
                p.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    u(this.colorIndex, c.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: x,
                  zIndex: -1,
                }),
                (p.point = this),
                A.styledMode ||
                  p.attr(
                    a(
                      {
                        fill: this.color || c.color,
                        "fill-opacity": l.opacity,
                      },
                      b.filterUserAttributes(l.attributes || {})
                    )
                  ))
              : p &&
                p.point &&
                p.point.haloPath &&
                p.animate({ d: p.point.haloPath(0) }, null, p.hide);
            d(this, "afterSetState", { state: f });
          }
        };
        e.prototype.haloPath = function (a) {
          return this.series.chart.renderer.symbols.circle(
            Math.floor(this.plotX) - a,
            this.plotY - a,
            2 * a,
            2 * a
          );
        };
        return e;
      })();
      ("");
      return e;
    }
  );
  I(
    e,
    "Core/Pointer.js",
    [
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Tooltip.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v = b.parse,
        t = e.charts,
        F = e.noop,
        z = B.addEvent,
        r = B.attr,
        p = B.css,
        h = B.defined,
        a = B.extend,
        d = B.find,
        g = B.fireEvent,
        m = B.isNumber,
        n = B.isObject,
        G = B.objectEach,
        J = B.offset,
        x = B.pick,
        C = B.splat;
      b = (function () {
        function b(a, b) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = b;
          this.init(a, b);
        }
        b.prototype.applyInactiveState = function (a) {
          var b = [],
            f;
          (a || []).forEach(function (a) {
            f = a.series;
            b.push(f);
            f.linkedParent && b.push(f.linkedParent);
            f.linkedSeries && (b = b.concat(f.linkedSeries));
            f.navigatorSeries && b.push(f.navigatorSeries);
          });
          this.chart.series.forEach(function (a) {
            -1 === b.indexOf(a)
              ? a.setState("inactive", !0)
              : a.options.inactiveOtherPoints &&
                a.setAllPointsToState("inactive");
          });
        };
        b.prototype.destroy = function () {
          var a = this;
          this.eventsToUnbind.forEach(function (a) {
            return a();
          });
          this.eventsToUnbind = [];
          e.chartCount ||
            (b.unbindDocumentMouseUp &&
              (b.unbindDocumentMouseUp = b.unbindDocumentMouseUp()),
            b.unbindDocumentTouchEnd &&
              (b.unbindDocumentTouchEnd = b.unbindDocumentTouchEnd()));
          clearInterval(a.tooltipTimeout);
          G(a, function (b, f) {
            a[f] = void 0;
          });
        };
        b.prototype.drag = function (a) {
          var b = this.chart,
            f = b.options.chart,
            d = this.zoomHor,
            k = this.zoomVert,
            g = b.plotLeft,
            c = b.plotTop,
            l = b.plotWidth,
            h = b.plotHeight,
            e = this.mouseDownX || 0,
            m = this.mouseDownY || 0,
            u = n(f.panning) ? f.panning && f.panning.enabled : f.panning,
            p = f.panKey && a[f.panKey + "Key"],
            x = a.chartX,
            C = a.chartY,
            r = this.selectionMarker;
          if (!r || !r.touch)
            if (
              (x < g ? (x = g) : x > g + l && (x = g + l),
              C < c ? (C = c) : C > c + h && (C = c + h),
              (this.hasDragged = Math.sqrt(
                Math.pow(e - x, 2) + Math.pow(m - C, 2)
              )),
              10 < this.hasDragged)
            ) {
              var G = b.isInsidePlot(e - g, m - c, { visiblePlotOnly: !0 });
              (!b.hasCartesianSeries && !b.mapView) ||
                (!this.zoomX && !this.zoomY) ||
                !G ||
                p ||
                r ||
                ((this.selectionMarker = r =
                  b.renderer
                    .rect(g, c, d ? 1 : l, k ? 1 : h, 0)
                    .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                    .add()),
                b.styledMode ||
                  r.attr({
                    fill:
                      f.selectionMarkerFill ||
                      v("#335cad").setOpacity(0.25).get(),
                  }));
              r &&
                d &&
                ((d = x - e),
                r.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + e }));
              r &&
                k &&
                ((d = C - m),
                r.attr({ height: Math.abs(d), y: (0 < d ? 0 : d) + m }));
              G && !r && u && b.pan(a, f.panning);
            }
        };
        b.prototype.dragStart = function (a) {
          var b = this.chart;
          b.mouseIsDown = a.type;
          b.cancelClick = !1;
          b.mouseDownX = this.mouseDownX = a.chartX;
          b.mouseDownY = this.mouseDownY = a.chartY;
        };
        b.prototype.drop = function (b) {
          var d = this,
            f = this.chart,
            l = this.hasPinched;
          if (this.selectionMarker) {
            var k = this.selectionMarker,
              e = k.attr ? k.attr("x") : k.x,
              c = k.attr ? k.attr("y") : k.y,
              q = k.attr ? k.attr("width") : k.width,
              n = k.attr ? k.attr("height") : k.height,
              u = {
                originalEvent: b,
                xAxis: [],
                yAxis: [],
                x: e,
                y: c,
                width: q,
                height: n,
              },
              x = !!f.mapView;
            if (this.hasDragged || l)
              f.axes.forEach(function (a) {
                if (
                  a.zoomEnabled &&
                  h(a.min) &&
                  (l || d[{ xAxis: "zoomX", yAxis: "zoomY" }[a.coll]]) &&
                  m(e) &&
                  m(c)
                ) {
                  var f = a.horiz,
                    k = "touchend" === b.type ? a.minPixelPadding : 0,
                    g = a.toValue((f ? e : c) + k);
                  f = a.toValue((f ? e + q : c + n) - k);
                  u[a.coll].push({
                    axis: a,
                    min: Math.min(g, f),
                    max: Math.max(g, f),
                  });
                  x = !0;
                }
              }),
                x &&
                  g(f, "selection", u, function (c) {
                    f.zoom(a(c, l ? { animation: !1 } : null));
                  });
            m(f.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            l && this.scaleGroups();
          }
          f &&
            m(f.index) &&
            (p(f.container, { cursor: f._cursor }),
            (f.cancelClick = 10 < this.hasDragged),
            (f.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        };
        b.prototype.findNearestKDPoint = function (a, b, f) {
          var d = this.chart,
            k = d.hoverPoint;
          d = d.tooltip;
          if (k && d && d.isStickyOnContact()) return k;
          var g;
          a.forEach(function (a) {
            var c =
              !(a.noSharedTooltip && b) &&
              0 > a.options.findNearestPointBy.indexOf("y");
            a = a.searchPoint(f, c);
            if ((c = n(a, !0) && a.series) && !(c = !n(g, !0))) {
              c = g.distX - a.distX;
              var d = g.dist - a.dist,
                k =
                  (a.series.group && a.series.group.zIndex) -
                  (g.series.group && g.series.group.zIndex);
              c =
                0 <
                (0 !== c && b
                  ? c
                  : 0 !== d
                  ? d
                  : 0 !== k
                  ? k
                  : g.series.index > a.series.index
                  ? -1
                  : 1);
            }
            c && (g = a);
          });
          return g;
        };
        b.prototype.getChartCoordinatesFromPoint = function (a, b) {
          var f = a.series,
            d = f.xAxis;
          f = f.yAxis;
          var g = a.shapeArgs;
          if (d && f) {
            var l = x(a.clientX, a.plotX),
              c = a.plotY || 0;
            a.isNode && g && m(g.x) && m(g.y) && ((l = g.x), (c = g.y));
            return b
              ? { chartX: f.len + f.pos - c, chartY: d.len + d.pos - l }
              : { chartX: l + d.pos, chartY: c + f.pos };
          }
          if (g && g.x && g.y) return { chartX: g.x, chartY: g.y };
        };
        b.prototype.getChartPosition = function () {
          if (this.chartPosition) return this.chartPosition;
          var a = this.chart.container,
            b = J(a);
          this.chartPosition = {
            left: b.left,
            top: b.top,
            scaleX: 1,
            scaleY: 1,
          };
          var f = a.offsetWidth;
          a = a.offsetHeight;
          2 < f &&
            2 < a &&
            ((this.chartPosition.scaleX = b.width / f),
            (this.chartPosition.scaleY = b.height / a));
          return this.chartPosition;
        };
        b.prototype.getCoordinates = function (a) {
          var b = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (f) {
            b[f.isXAxis ? "xAxis" : "yAxis"].push({
              axis: f,
              value: f.toValue(a[f.horiz ? "chartX" : "chartY"]),
            });
          });
          return b;
        };
        b.prototype.getHoverData = function (a, b, f, h, k, e) {
          var c = [];
          h = !(!h || !a);
          var l = function (a) {
              return (
                a.visible &&
                !(!k && a.directTouch) &&
                x(a.options.enableMouseTracking, !0)
              );
            },
            m = {
              chartX: e ? e.chartX : void 0,
              chartY: e ? e.chartY : void 0,
              shared: k,
            };
          g(this, "beforeGetHoverData", m);
          var w =
            b && !b.stickyTracking
              ? [b]
              : f.filter(function (a) {
                  return a.stickyTracking && (m.filter || l)(a);
                });
          var u = h || !e ? a : this.findNearestKDPoint(w, k, e);
          b = u && u.series;
          u &&
            (k && !b.noSharedTooltip
              ? ((w = f.filter(function (a) {
                  return m.filter ? m.filter(a) : l(a) && !a.noSharedTooltip;
                })),
                w.forEach(function (a) {
                  var f = d(a.points, function (a) {
                    return a.x === u.x && !a.isNull;
                  });
                  n(f) &&
                    (a.boosted && a.boost && (f = a.boost.getPoint(f)),
                    c.push(f));
                }))
              : c.push(u));
          m = { hoverPoint: u };
          g(this, "afterGetHoverData", m);
          return { hoverPoint: m.hoverPoint, hoverSeries: b, hoverPoints: c };
        };
        b.prototype.getPointFromEvent = function (a) {
          a = a.target;
          for (var b; a && !b; ) (b = a.point), (a = a.parentNode);
          return b;
        };
        b.prototype.onTrackerMouseOut = function (a) {
          a = a.relatedTarget || a.toElement;
          var b = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !b ||
              !a ||
              b.stickyTracking ||
              this.inClass(a, "highcharts-tooltip") ||
              (this.inClass(a, "highcharts-series-" + b.index) &&
                this.inClass(a, "highcharts-tracker"))
            )
          )
            b.onMouseOut();
        };
        b.prototype.inClass = function (a, b) {
          for (var f; a; ) {
            if ((f = r(a, "class"))) {
              if (-1 !== f.indexOf(b)) return !0;
              if (-1 !== f.indexOf("highcharts-container")) return !1;
            }
            a = a.parentElement;
          }
        };
        b.prototype.init = function (a, b) {
          this.options = b;
          this.chart = a;
          this.runChartClick = !(!b.chart.events || !b.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          y &&
            ((a.tooltip = new y(a, b.tooltip)),
            (this.followTouchMove = x(b.tooltip.followTouchMove, !0)));
          this.setDOMEvents();
        };
        b.prototype.normalize = function (b, d) {
          var f = b.touches,
            g = f
              ? f.length
                ? f.item(0)
                : x(f.changedTouches, b.changedTouches)[0]
              : b;
          d || (d = this.getChartPosition());
          f = g.pageX - d.left;
          g = g.pageY - d.top;
          f /= d.scaleX;
          g /= d.scaleY;
          return a(b, { chartX: Math.round(f), chartY: Math.round(g) });
        };
        b.prototype.onContainerClick = function (b) {
          var d = this.chart,
            f = d.hoverPoint;
          b = this.normalize(b);
          var h = d.plotLeft,
            k = d.plotTop;
          d.cancelClick ||
            (f && this.inClass(b.target, "highcharts-tracker")
              ? (g(f.series, "click", a(b, { point: f })),
                d.hoverPoint && f.firePointEvent("click", b))
              : (a(b, this.getCoordinates(b)),
                d.isInsidePlot(b.chartX - h, b.chartY - k, {
                  visiblePlotOnly: !0,
                }) && g(d, "click", b)));
        };
        b.prototype.onContainerMouseDown = function (a) {
          var b = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (e.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || b)
            this.zoomOption(a),
              b && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        };
        b.prototype.onContainerMouseLeave = function (a) {
          var d = t[x(b.hoverChartIndex, -1)],
            f = this.chart.tooltip;
          (f &&
            f.shouldStickOnContact() &&
            this.inClass(a.relatedTarget, "highcharts-tooltip-container")) ||
            ((a = this.normalize(a)),
            d &&
              (a.relatedTarget || a.toElement) &&
              (d.pointer.reset(), (d.pointer.chartPosition = void 0)),
            f && !f.isHidden && this.reset());
        };
        b.prototype.onContainerMouseEnter = function (a) {
          delete this.chartPosition;
        };
        b.prototype.onContainerMouseMove = function (a) {
          var b = this.chart;
          a = this.normalize(a);
          this.setHoverChartIndex();
          a.preventDefault || (a.returnValue = !1);
          ("mousedown" === b.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          b.openMenu ||
            (!this.inClass(a.target, "highcharts-tracker") &&
              !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            (this.inClass(a.target, "highcharts-no-tooltip")
              ? this.reset(!1, 0)
              : this.runPointActions(a));
        };
        b.prototype.onDocumentTouchEnd = function (a) {
          var d = t[x(b.hoverChartIndex, -1)];
          d && d.pointer.drop(a);
        };
        b.prototype.onContainerTouchMove = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        };
        b.prototype.onContainerTouchStart = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        };
        b.prototype.onDocumentMouseMove = function (a) {
          var b = this.chart,
            f = this.chartPosition;
          a = this.normalize(a, f);
          var d = b.tooltip;
          !f ||
            (d && d.isStickyOnContact()) ||
            b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            this.inClass(a.target, "highcharts-tracker") ||
            this.reset();
        };
        b.prototype.onDocumentMouseUp = function (a) {
          var d = t[x(b.hoverChartIndex, -1)];
          d && d.pointer.drop(a);
        };
        b.prototype.pinch = function (b) {
          var d = this,
            f = d.chart,
            h = d.pinchDown,
            k = b.touches || [],
            l = k.length,
            c = d.lastValidTouch,
            q = d.hasZoom,
            e = {},
            m =
              1 === l &&
              ((d.inClass(b.target, "highcharts-tracker") &&
                f.runTrackerClick) ||
                d.runChartClick),
            n = {},
            u = d.selectionMarker;
          1 < l
            ? (d.initiated = !0)
            : 1 === l && this.followTouchMove && (d.initiated = !1);
          q && d.initiated && !m && !1 !== b.cancelable && b.preventDefault();
          [].map.call(k, function (a) {
            return d.normalize(a);
          });
          "touchstart" === b.type
            ? ([].forEach.call(k, function (a, c) {
                h[c] = { chartX: a.chartX, chartY: a.chartY };
              }),
              (c.x = [h[0].chartX, h[1] && h[1].chartX]),
              (c.y = [h[0].chartY, h[1] && h[1].chartY]),
              f.axes.forEach(function (a) {
                if (a.zoomEnabled) {
                  var c = f.bounds[a.horiz ? "h" : "v"],
                    b = a.minPixelPadding,
                    d = a.toPixels(
                      Math.min(x(a.options.min, a.dataMin), a.dataMin)
                    ),
                    g = a.toPixels(
                      Math.max(x(a.options.max, a.dataMax), a.dataMax)
                    ),
                    k = Math.max(d, g);
                  c.min = Math.min(a.pos, Math.min(d, g) - b);
                  c.max = Math.max(a.pos + a.len, k + b);
                }
              }),
              (d.res = !0))
            : d.followTouchMove && 1 === l
            ? this.runPointActions(d.normalize(b))
            : h.length &&
              (g(f, "touchpan", { originalEvent: b }, function () {
                u ||
                  (d.selectionMarker = u =
                    a({ destroy: F, touch: !0 }, f.plotBox));
                d.pinchTranslate(h, k, e, u, n, c);
                d.hasPinched = q;
                d.scaleGroups(e, n);
              }),
              d.res && ((d.res = !1), this.reset(!1, 0)));
        };
        b.prototype.pinchTranslate = function (a, b, f, d, g, h) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, b, f, d, g, h);
          this.zoomVert && this.pinchTranslateDirection(!1, a, b, f, d, g, h);
        };
        b.prototype.pinchTranslateDirection = function (
          a,
          b,
          f,
          d,
          g,
          h,
          c,
          q
        ) {
          var k = this.chart,
            l = a ? "x" : "y",
            e = a ? "X" : "Y",
            m = "chart" + e,
            n = a ? "width" : "height",
            w = k["plot" + (a ? "Left" : "Top")],
            u = k.inverted,
            D = k.bounds[a ? "h" : "v"],
            p = 1 === b.length,
            x = b[0][m],
            A = !p && b[1][m];
          b = function () {
            "number" === typeof J &&
              20 < Math.abs(x - A) &&
              (G = q || Math.abs(O - J) / Math.abs(x - A));
            r = (w - O) / G + x;
            C = k["plot" + (a ? "Width" : "Height")] / G;
          };
          var C,
            r,
            G = q || 1,
            O = f[0][m],
            J = !p && f[1][m];
          b();
          f = r;
          if (f < D.min) {
            f = D.min;
            var t = !0;
          } else f + C > D.max && ((f = D.max - C), (t = !0));
          t
            ? ((O -= 0.8 * (O - c[l][0])),
              "number" === typeof J && (J -= 0.8 * (J - c[l][1])),
              b())
            : (c[l] = [O, J]);
          u || ((h[l] = r - w), (h[n] = C));
          h = u ? 1 / G : G;
          g[n] = C;
          g[l] = f;
          d[u ? (a ? "scaleY" : "scaleX") : "scale" + e] = G;
          d["translate" + e] = h * w + (O - h * x);
        };
        b.prototype.reset = function (a, b) {
          var f = this.chart,
            d = f.hoverSeries,
            g = f.hoverPoint,
            h = f.hoverPoints,
            c = f.tooltip,
            q = c && c.shared ? h : g;
          a &&
            q &&
            C(q).forEach(function (c) {
              c.series.isCartesian &&
                "undefined" === typeof c.plotX &&
                (a = !1);
            });
          if (a)
            c &&
              q &&
              C(q).length &&
              (c.refresh(q),
              c.shared && h
                ? h.forEach(function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian &&
                      (a.series.xAxis.crosshair &&
                        a.series.xAxis.drawCrosshair(null, a),
                      a.series.yAxis.crosshair &&
                        a.series.yAxis.drawCrosshair(null, a));
                  })
                : g &&
                  (g.setState(g.state, !0),
                  f.axes.forEach(function (a) {
                    a.crosshair &&
                      g.series[a.coll] === a &&
                      a.drawCrosshair(null, g);
                  })));
          else {
            if (g) g.onMouseOut();
            h &&
              h.forEach(function (a) {
                a.setState();
              });
            if (d) d.onMouseOut();
            c && c.hide(b);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            f.axes.forEach(function (a) {
              a.hideCrosshair();
            });
            this.hoverX = f.hoverPoints = f.hoverPoint = null;
          }
        };
        b.prototype.runPointActions = function (a, g) {
          var f = this.chart,
            h = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0,
            k = h ? h.shared : !1,
            l = g || f.hoverPoint,
            c = (l && l.series) || f.hoverSeries;
          g = this.getHoverData(
            l,
            c,
            f.series,
            (!a || "touchmove" !== a.type) &&
              (!!g || (c && c.directTouch && this.isDirectTouch)),
            k,
            a
          );
          l = g.hoverPoint;
          c = g.hoverSeries;
          var q = g.hoverPoints;
          g = c && c.tooltipOptions.followPointer && !c.tooltipOptions.split;
          var e = k && c && !c.noSharedTooltip;
          if (l && (l !== f.hoverPoint || (h && h.isHidden))) {
            (f.hoverPoints || []).forEach(function (a) {
              -1 === q.indexOf(a) && a.setState();
            });
            if (f.hoverSeries !== c) c.onMouseOver();
            this.applyInactiveState(q);
            (q || []).forEach(function (a) {
              a.setState("hover");
            });
            f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
            if (!l.series) return;
            f.hoverPoints = q;
            f.hoverPoint = l;
            l.firePointEvent("mouseOver", void 0, function () {
              h && l && h.refresh(e ? q : l, a);
            });
          } else
            g &&
              h &&
              !h.isHidden &&
              ((k = h.getAnchor([{}], a)),
              f.isInsidePlot(k[0], k[1], { visiblePlotOnly: !0 }) &&
                h.updatePosition({ plotX: k[0], plotY: k[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = z(
              f.container.ownerDocument,
              "mousemove",
              function (a) {
                var c = t[b.hoverChartIndex];
                if (c) c.pointer.onDocumentMouseMove(a);
              }
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          f.axes.forEach(function (c) {
            var b = x((c.crosshair || {}).snap, !0),
              g;
            b &&
              (((g = f.hoverPoint) && g.series[c.coll] === c) ||
                (g = d(q, function (a) {
                  return a.series && a.series[c.coll] === c;
                })));
            g || !b ? c.drawCrosshair(a, g) : c.hideCrosshair();
          });
        };
        b.prototype.scaleGroups = function (a, b) {
          var f = this.chart;
          f.series.forEach(function (d) {
            var g = a || d.getPlotBox();
            d.group &&
              ((d.xAxis && d.xAxis.zoomEnabled) || f.mapView) &&
              (d.group.attr(g),
              d.markerGroup &&
                (d.markerGroup.attr(g),
                d.markerGroup.clip(b ? f.clipRect : null)),
              d.dataLabelsGroup && d.dataLabelsGroup.attr(g));
          });
          f.clipRect.attr(b || f.clipBox);
        };
        b.prototype.setDOMEvents = function () {
          var a = this,
            d = this.chart.container,
            f = d.ownerDocument;
          d.onmousedown = this.onContainerMouseDown.bind(this);
          d.onmousemove = this.onContainerMouseMove.bind(this);
          d.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            z(d, "mouseenter", this.onContainerMouseEnter.bind(this))
          );
          this.eventsToUnbind.push(
            z(d, "mouseleave", this.onContainerMouseLeave.bind(this))
          );
          b.unbindDocumentMouseUp ||
            (b.unbindDocumentMouseUp = z(
              f,
              "mouseup",
              this.onDocumentMouseUp.bind(this)
            ));
          for (
            var g = this.chart.renderTo.parentElement;
            g && "BODY" !== g.tagName;

          )
            this.eventsToUnbind.push(
              z(g, "scroll", function () {
                delete a.chartPosition;
              })
            ),
              (g = g.parentElement);
          e.hasTouch &&
            (this.eventsToUnbind.push(
              z(d, "touchstart", this.onContainerTouchStart.bind(this), {
                passive: !1,
              })
            ),
            this.eventsToUnbind.push(
              z(d, "touchmove", this.onContainerTouchMove.bind(this), {
                passive: !1,
              })
            ),
            b.unbindDocumentTouchEnd ||
              (b.unbindDocumentTouchEnd = z(
                f,
                "touchend",
                this.onDocumentTouchEnd.bind(this),
                { passive: !1 }
              )));
        };
        b.prototype.setHoverChartIndex = function () {
          var a = this.chart,
            d = e.charts[x(b.hoverChartIndex, -1)];
          if (d && d !== a)
            d.pointer.onContainerMouseLeave({ relatedTarget: a.container });
          (d && d.mouseIsDown) || (b.hoverChartIndex = a.index);
        };
        b.prototype.touch = function (a, b) {
          var f = this.chart,
            d;
          this.setHoverChartIndex();
          if (1 === a.touches.length)
            if (
              ((a = this.normalize(a)),
              (d = f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop, {
                visiblePlotOnly: !0,
              })) && !f.openMenu)
            ) {
              b && this.runPointActions(a);
              if ("touchmove" === a.type) {
                b = this.pinchDown;
                var g = b[0]
                  ? 4 <=
                    Math.sqrt(
                      Math.pow(b[0].chartX - a.chartX, 2) +
                        Math.pow(b[0].chartY - a.chartY, 2)
                    )
                  : !1;
              }
              x(g, !0) && this.pinch(a);
            } else b && this.reset();
          else 2 === a.touches.length && this.pinch(a);
        };
        b.prototype.touchSelect = function (a) {
          return !(
            !this.chart.options.chart.zooming.singleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        };
        b.prototype.zoomOption = function (a) {
          var b = this.chart,
            f = b.options.chart;
          b = b.inverted;
          var d = f.zooming.type || "";
          /touch/.test(a.type) && (d = x(f.zooming.pinchType, d));
          this.zoomX = a = /x/.test(d);
          this.zoomY = f = /y/.test(d);
          this.zoomHor = (a && !b) || (f && b);
          this.zoomVert = (f && !b) || (a && b);
          this.hasZoom = a || f;
        };
        return b;
      })();
      ("");
      return b;
    }
  );
  I(
    e,
    "Core/MSPointer.js",
    [e["Core/Globals.js"], e["Core/Pointer.js"], e["Core/Utilities.js"]],
    function (b, e, y) {
      function B() {
        var a = [];
        a.item = function (a) {
          return this[a];
        };
        d(m, function (b) {
          a.push({ pageX: b.pageX, pageY: b.pageY, target: b.target });
        });
        return a;
      }
      function v(a, b, d, g) {
        var h = F[e.hoverChartIndex || NaN];
        ("touch" !== a.pointerType &&
          a.pointerType !== a.MSPOINTER_TYPE_TOUCH) ||
          !h ||
          ((h = h.pointer),
          g(a),
          h[b]({
            type: d,
            target: a.currentTarget,
            preventDefault: r,
            touches: B(),
          }));
      }
      var t =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function g() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((g.prototype = d.prototype), new g());
            };
          })(),
        F = b.charts,
        z = b.doc,
        r = b.noop,
        p = b.win,
        h = y.addEvent,
        a = y.css,
        d = y.objectEach,
        g = y.removeEvent,
        m = {},
        n = !!p.PointerEvent;
      return (function (d) {
        function e() {
          return (null !== d && d.apply(this, arguments)) || this;
        }
        t(e, d);
        e.isRequired = function () {
          return !(b.hasTouch || (!p.PointerEvent && !p.MSPointerEvent));
        };
        e.prototype.batchMSEvents = function (a) {
          a(
            this.chart.container,
            n ? "pointerdown" : "MSPointerDown",
            this.onContainerPointerDown
          );
          a(
            this.chart.container,
            n ? "pointermove" : "MSPointerMove",
            this.onContainerPointerMove
          );
          a(z, n ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        };
        e.prototype.destroy = function () {
          this.batchMSEvents(g);
          d.prototype.destroy.call(this);
        };
        e.prototype.init = function (b, g) {
          d.prototype.init.call(this, b, g);
          this.hasZoom &&
            a(b.container, {
              "-ms-touch-action": "none",
              "touch-action": "none",
            });
        };
        e.prototype.onContainerPointerDown = function (a) {
          v(a, "onContainerTouchStart", "touchstart", function (a) {
            m[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget,
            };
          });
        };
        e.prototype.onContainerPointerMove = function (a) {
          v(a, "onContainerTouchMove", "touchmove", function (a) {
            m[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
            m[a.pointerId].target || (m[a.pointerId].target = a.currentTarget);
          });
        };
        e.prototype.onDocumentPointerUp = function (a) {
          v(a, "onDocumentTouchEnd", "touchend", function (a) {
            delete m[a.pointerId];
          });
        };
        e.prototype.setDOMEvents = function () {
          d.prototype.setDOMEvents.call(this);
          (this.hasZoom || this.followTouchMove) && this.batchMSEvents(h);
        };
        return e;
      })(e);
    }
  );
  I(
    e,
    "Core/Legend/Legend.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Series/Point.js"],
      e["Core/Renderer/RendererUtilities.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t) {
      var F = b.animObject,
        z = b.setAnimation,
        r = e.format;
      b = y.isFirefox;
      var p = y.marginNames;
      y = y.win;
      var h = v.distribute,
        a = t.addEvent,
        d = t.createElement,
        g = t.css,
        m = t.defined,
        n = t.discardElement,
        G = t.find,
        J = t.fireEvent,
        x = t.isNumber,
        C = t.merge,
        u = t.pick,
        l = t.relativeLength,
        A = t.stableSort,
        f = t.syncTimeout;
      v = t.wrap;
      t = (function () {
        function b(a, b) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = void 0;
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = a;
          this.init(a, b);
        }
        b.prototype.init = function (b, f) {
          this.chart = b;
          this.setOptions(f);
          f.enabled &&
            (this.render(),
            a(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            this.proximate
              ? (this.unchartrender = a(this.chart, "render", function () {
                  this.legend.proximatePositions();
                  this.legend.positionItems();
                }))
              : this.unchartrender && this.unchartrender());
        };
        b.prototype.setOptions = function (a) {
          var b = u(a.padding, 8);
          this.options = a;
          this.chart.styledMode ||
            ((this.itemStyle = a.itemStyle),
            (this.itemHiddenStyle = C(this.itemStyle, a.itemHiddenStyle)));
          this.itemMarginTop = a.itemMarginTop || 0;
          this.itemMarginBottom = a.itemMarginBottom || 0;
          this.padding = b;
          this.initialItemY = b - 5;
          this.symbolWidth = u(a.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === a.layout && !this.chart.inverted;
          this.baseline = void 0;
        };
        b.prototype.update = function (a, b) {
          var c = this.chart;
          this.setOptions(C(!0, this.options, a));
          this.destroy();
          c.isDirtyLegend = c.isDirtyBox = !0;
          u(b, !0) && c.redraw();
          J(this, "afterUpdate");
        };
        b.prototype.colorizeItem = function (a, b) {
          a.legendGroup[b ? "removeClass" : "addClass"](
            "highcharts-legend-item-hidden"
          );
          if (!this.chart.styledMode) {
            var c = this.options,
              f = a.legendItem,
              d = a.legendLine,
              g = a.legendSymbol,
              k = this.itemHiddenStyle.color;
            c = b ? c.itemStyle.color : k;
            var h = b ? a.color || k : k,
              e = a.options && a.options.marker,
              l = { fill: h };
            f && f.css({ fill: c, color: c });
            d && d.attr({ stroke: h });
            g &&
              (e &&
                g.isMarker &&
                ((l = a.pointAttribs()), b || (l.stroke = l.fill = k)),
              g.attr(l));
          }
          J(this, "afterColorizeItem", { item: a, visible: b });
        };
        b.prototype.positionItems = function () {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        };
        b.prototype.positionItem = function (a) {
          var b = this,
            c = this.options,
            f = c.symbolPadding,
            d = !c.rtl,
            g = a._legendItemPos;
          c = g[0];
          g = g[1];
          var k = a.checkbox,
            h = a.legendGroup;
          h &&
            h.element &&
            ((f = {
              translateX: d ? c : this.legendWidth - c - 2 * f - 4,
              translateY: g,
            }),
            (d = function () {
              J(b, "afterPositionItem", { item: a });
            }),
            m(h.translateY) ? h.animate(f, void 0, d) : (h.attr(f), d()));
          k && ((k.x = c), (k.y = g));
        };
        b.prototype.destroyItem = function (a) {
          var b = a.checkbox;
          ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(
            function (c) {
              a[c] && (a[c] = a[c].destroy());
            }
          );
          b && n(a.checkbox);
        };
        b.prototype.destroy = function () {
          function a(a) {
            this[a] && (this[a] = this[a].destroy());
          }
          this.getAllItems().forEach(function (b) {
            ["legendItem", "legendGroup"].forEach(a, b);
          });
          "clipRect up down pager nav box title group"
            .split(" ")
            .forEach(a, this);
          this.display = null;
        };
        b.prototype.positionCheckboxes = function () {
          var a = this.group && this.group.alignAttr,
            b = this.clipHeight || this.legendHeight,
            c = this.titleHeight;
          if (a) {
            var f = a.translateY;
            this.allItems.forEach(function (d) {
              var k = d.checkbox;
              if (k) {
                var h = f + c + k.y + (this.scrollOffset || 0) + 3;
                g(k, {
                  left: a.translateX + d.checkboxOffset + k.x - 20 + "px",
                  top: h + "px",
                  display:
                    this.proximate || (h > f - 6 && h < f + b - 6)
                      ? ""
                      : "none",
                });
              }
            }, this);
          }
        };
        b.prototype.renderTitle = function () {
          var a = this.options,
            b = this.padding,
            c = a.title,
            f = 0;
          c.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  c.text,
                  b - 3,
                  b - 4,
                  void 0,
                  void 0,
                  void 0,
                  a.useHTML,
                  void 0,
                  "legend-title"
                )
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(c.style),
              this.title.add(this.group)),
            c.width || this.title.css({ width: this.maxLegendWidth + "px" }),
            (a = this.title.getBBox()),
            (f = a.height),
            (this.offsetWidth = a.width),
            this.contentGroup.attr({ translateY: f }));
          this.titleHeight = f;
        };
        b.prototype.setText = function (a) {
          var b = this.options;
          a.legendItem.attr({
            text: b.labelFormat
              ? r(b.labelFormat, a, this.chart)
              : b.labelFormatter.call(a),
          });
        };
        b.prototype.renderItem = function (a) {
          var b = this.chart,
            c = b.renderer,
            f = this.options,
            d = this.symbolWidth,
            g = f.symbolPadding || 0,
            k = this.itemStyle,
            h = this.itemHiddenStyle,
            e = "horizontal" === f.layout ? u(f.itemDistance, 20) : 0,
            l = !f.rtl,
            m = !a.series,
            n = !m && a.series.drawLegendSymbol ? a.series : a,
            w = n.options,
            p = this.createCheckboxForItem && w && w.showCheckbox,
            x = f.useHTML,
            A = a.options.className,
            r = a.legendItem;
          w = d + g + e + (p ? 20 : 0);
          r ||
            ((a.legendGroup = c
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  n.type +
                  "-series highcharts-color-" +
                  a.colorIndex +
                  (A ? " " + A : "") +
                  (m ? " highcharts-series-" + a.index : "")
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (a.legendItem = r =
              c.text("", l ? d + g : -g, this.baseline || 0, x)),
            b.styledMode || r.css(C(a.visible ? k : h)),
            r
              .attr({ align: l ? "left" : "right", zIndex: 2 })
              .add(a.legendGroup),
            this.baseline ||
              ((this.fontMetrics = c.fontMetrics(
                b.styledMode ? 12 : k.fontSize,
                r
              )),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              r.attr("y", this.baseline),
              (this.symbolHeight = f.symbolHeight || this.fontMetrics.f),
              f.squareSymbol &&
                ((this.symbolWidth = u(
                  f.symbolWidth,
                  Math.max(this.symbolHeight, 16)
                )),
                (w = this.symbolWidth + g + e + (p ? 20 : 0)),
                l && r.attr("x", this.symbolWidth + g))),
            n.drawLegendSymbol(this, a),
            this.setItemEvents && this.setItemEvents(a, r, x));
          p &&
            !a.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(a);
          this.colorizeItem(a, a.visible);
          (!b.styledMode && k.width) ||
            r.css({
              width:
                (f.itemWidth || this.widthOption || b.spacingBox.width) -
                w +
                "px",
            });
          this.setText(a);
          b = r.getBBox();
          c = (this.fontMetrics && this.fontMetrics.h) || 0;
          a.itemWidth = a.checkboxOffset =
            f.itemWidth || a.legendItemWidth || b.width + w;
          this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
          this.totalItemWidth += a.itemWidth;
          this.itemHeight = a.itemHeight = Math.round(
            a.legendItemHeight || (b.height > 1.5 * c ? b.height : c)
          );
        };
        b.prototype.layoutItem = function (a) {
          var b = this.options,
            c = this.padding,
            f = "horizontal" === b.layout,
            d = a.itemHeight,
            g = this.itemMarginBottom,
            k = this.itemMarginTop,
            h = f ? u(b.itemDistance, 20) : 0,
            e = this.maxLegendWidth;
          b =
            b.alignColumns && this.totalItemWidth > e
              ? this.maxItemWidth
              : a.itemWidth;
          f &&
            this.itemX - c + b > e &&
            ((this.itemX = c),
            this.lastLineHeight && (this.itemY += k + this.lastLineHeight + g),
            (this.lastLineHeight = 0));
          this.lastItemY = k + this.itemY + g;
          this.lastLineHeight = Math.max(d, this.lastLineHeight);
          a._legendItemPos = [this.itemX, this.itemY];
          f
            ? (this.itemX += b)
            : ((this.itemY += k + d + g), (this.lastLineHeight = d));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (f ? this.itemX - c - (a.checkbox ? 0 : h) : b) + c,
              this.offsetWidth
            );
        };
        b.prototype.getAllItems = function () {
          var a = [];
          this.chart.series.forEach(function (b) {
            var c = b && b.options;
            b &&
              u(c.showInLegend, m(c.linkedTo) ? !1 : void 0, !0) &&
              (a = a.concat(
                b.legendItems || ("point" === c.legendType ? b.data : b)
              ));
          });
          J(this, "afterGetAllItems", { allItems: a });
          return a;
        };
        b.prototype.getAlignment = function () {
          var a = this.options;
          return this.proximate
            ? a.align.charAt(0) + "tv"
            : a.floating
            ? ""
            : a.align.charAt(0) +
              a.verticalAlign.charAt(0) +
              a.layout.charAt(0);
        };
        b.prototype.adjustMargins = function (a, b) {
          var c = this.chart,
            f = this.options,
            d = this.getAlignment();
          d &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (g, k) {
              g.test(d) &&
                !m(a[k]) &&
                (c[p[k]] = Math.max(
                  c[p[k]],
                  c.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][k] * f[k % 2 ? "x" : "y"] +
                    u(f.margin, 12) +
                    b[k] +
                    (c.titleOffset[k] || 0)
                ));
            });
        };
        b.prototype.proximatePositions = function () {
          var a = this.chart,
            b = [],
            c = "left" === this.options.align;
          this.allItems.forEach(function (f) {
            var d;
            var g = c;
            if (f.yAxis) {
              f.xAxis.options.reversed && (g = !g);
              f.points &&
                (d = G(
                  g ? f.points : f.points.slice(0).reverse(),
                  function (a) {
                    return x(a.plotY);
                  }
                ));
              g =
                this.itemMarginTop +
                f.legendItem.getBBox().height +
                this.itemMarginBottom;
              var k = f.yAxis.top - a.plotTop;
              f.visible
                ? ((d = d ? d.plotY : f.yAxis.height), (d += k - 0.3 * g))
                : (d = k + f.yAxis.height);
              b.push({ target: d, size: g, item: f });
            }
          }, this);
          h(b, a.plotHeight).forEach(function (c) {
            c.item._legendItemPos &&
              c.pos &&
              (c.item._legendItemPos[1] = a.plotTop - a.spacing[0] + c.pos);
          });
        };
        b.prototype.render = function () {
          var a = this.chart,
            b = a.renderer,
            c = this.options,
            f = this.padding,
            d = this.getAllItems(),
            g = this.group,
            h = this.box;
          this.itemX = f;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = l(c.width, a.spacingBox.width - f);
          var e = a.spacingBox.width - 2 * f - c.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
            (e /= 2);
          this.maxLegendWidth = this.widthOption || e;
          g ||
            ((this.group = g =
              b
                .g("legend")
                .addClass(c.className || "")
                .attr({ zIndex: 7 })
                .add()),
            (this.contentGroup = b.g().attr({ zIndex: 1 }).add(g)),
            (this.scrollGroup = b.g().add(this.contentGroup)));
          this.renderTitle();
          A(d, function (a, c) {
            return (
              ((a.options && a.options.legendIndex) || 0) -
              ((c.options && c.options.legendIndex) || 0)
            );
          });
          c.reversed && d.reverse();
          this.allItems = d;
          this.display = e = !!d.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          d.forEach(this.renderItem, this);
          d.forEach(this.layoutItem, this);
          d = (this.widthOption || this.offsetWidth) + f;
          var m = this.lastItemY + this.lastLineHeight + this.titleHeight;
          m = this.handleOverflow(m);
          m += f;
          h ||
            (this.box = h =
              b
                .rect()
                .addClass("highcharts-legend-box")
                .attr({ r: c.borderRadius })
                .add(g));
          a.styledMode ||
            h
              .attr({
                stroke: c.borderColor,
                "stroke-width": c.borderWidth || 0,
                fill: c.backgroundColor || "none",
              })
              .shadow(c.shadow);
          if (0 < d && 0 < m)
            h[h.placed ? "animate" : "attr"](
              h.crisp.call(
                {},
                { x: 0, y: 0, width: d, height: m },
                h.strokeWidth()
              )
            );
          g[e ? "show" : "hide"]();
          a.styledMode && "none" === g.getStyle("display") && (d = m = 0);
          this.legendWidth = d;
          this.legendHeight = m;
          e && this.align();
          this.proximate || this.positionItems();
          J(this, "afterRender");
        };
        b.prototype.align = function (a) {
          void 0 === a && (a = this.chart.spacingBox);
          var b = this.chart,
            c = this.options,
            f = a.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0]
            ? (f += b.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < b.titleOffset[2] &&
              (f -= b.titleOffset[2]);
          f !== a.y && (a = C(a, { y: f }));
          b.hasRendered || (this.group.placed = !1);
          this.group.align(
            C(c, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : c.verticalAlign,
            }),
            !0,
            a
          );
        };
        b.prototype.handleOverflow = function (a) {
          var b = this,
            c = this.chart,
            f = c.renderer,
            d = this.options,
            g = d.y,
            h = "top" === d.verticalAlign,
            k = this.padding,
            e = d.maxHeight,
            l = d.navigation,
            m = u(l.animation, !0),
            n = l.arrowSize || 12,
            w = this.pages,
            p = this.allItems,
            x = function (a) {
              "number" === typeof a
                ? J.attr({ height: a })
                : J && ((b.clipRect = J.destroy()), b.contentGroup.clip());
              b.contentGroup.div &&
                (b.contentGroup.div.style.clip = a
                  ? "rect(" + k + "px,9999px," + (k + a) + "px,0)"
                  : "auto");
            },
            A = function (a) {
              b[a] = f
                .circle(0, 0, 1.3 * n)
                .translate(n / 2, n / 2)
                .add(G);
              c.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
              return b[a];
            },
            C,
            r;
          g = c.spacingBox.height + (h ? -g : g) - k;
          var G = this.nav,
            J = this.clipRect;
          "horizontal" !== d.layout ||
            "middle" === d.verticalAlign ||
            d.floating ||
            (g /= 2);
          e && (g = Math.min(g, e));
          w.length = 0;
          a && 0 < g && a > g && !1 !== l.enabled
            ? ((this.clipHeight = C =
                Math.max(g - 20 - this.titleHeight - k, 0)),
              (this.currentPage = u(this.currentPage, 1)),
              (this.fullHeight = a),
              p.forEach(function (a, c) {
                var b = a._legendItemPos[1],
                  f = Math.round(a.legendItem.getBBox().height),
                  d = w.length;
                if (!d || (b - w[d - 1] > C && (r || b) !== w[d - 1]))
                  w.push(r || b), d++;
                a.pageIx = d - 1;
                r && (p[c - 1].pageIx = d - 1);
                c === p.length - 1 &&
                  b + f - w[d - 1] > C &&
                  f <= C &&
                  (w.push(b), (a.pageIx = d));
                b !== r && (r = b);
              }),
              J ||
                ((J = b.clipRect = f.clipRect(0, k, 9999, 0)),
                b.contentGroup.clip(J)),
              x(C),
              G ||
                ((this.nav = G = f.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = f.symbol("triangle", 0, 0, n, n).add(G)),
                A("upTracker").on("click", function () {
                  b.scroll(-1, m);
                }),
                (this.pager = f
                  .text("", 15, 10)
                  .addClass("highcharts-legend-navigation")),
                !c.styledMode && l.style && this.pager.css(l.style),
                this.pager.add(G),
                (this.down = f.symbol("triangle-down", 0, 0, n, n).add(G)),
                A("downTracker").on("click", function () {
                  b.scroll(1, m);
                })),
              b.scroll(0),
              (a = g))
            : G &&
              (x(),
              (this.nav = G.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return a;
        };
        b.prototype.scroll = function (a, b) {
          var c = this,
            d = this.chart,
            g = this.pages,
            h = g.length,
            k = this.clipHeight,
            e = this.options.navigation,
            l = this.pager,
            m = this.padding,
            n = this.currentPage + a;
          n > h && (n = h);
          0 < n &&
            ("undefined" !== typeof b && z(b, d),
            this.nav.attr({
              translateX: m,
              translateY: k + this.padding + 7 + this.titleHeight,
              visibility: "inherit",
            }),
            [this.up, this.upTracker].forEach(function (a) {
              a.attr({
                class:
                  1 === n
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }),
            l.attr({ text: n + "/" + h }),
            [this.down, this.downTracker].forEach(function (a) {
              a.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  n === h
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }, this),
            d.styledMode ||
              (this.up.attr({
                fill: 1 === n ? e.inactiveColor : e.activeColor,
              }),
              this.upTracker.css({ cursor: 1 === n ? "default" : "pointer" }),
              this.down.attr({
                fill: n === h ? e.inactiveColor : e.activeColor,
              }),
              this.downTracker.css({
                cursor: n === h ? "default" : "pointer",
              })),
            (this.scrollOffset = -g[n - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = n),
            this.positionCheckboxes(),
            (a = F(u(b, d.renderer.globalAnimation, !0))),
            f(function () {
              J(c, "afterScroll", { currentPage: n });
            }, a.duration));
        };
        b.prototype.setItemEvents = function (a, b, c) {
          var f = this,
            d = f.chart.renderer.boxWrapper,
            g = a instanceof B,
            h = "highcharts-legend-" + (g ? "point" : "series") + "-active",
            k = f.chart.styledMode,
            e = function (c) {
              f.allItems.forEach(function (b) {
                a !== b &&
                  [b].concat(b.linkedSeries || []).forEach(function (a) {
                    a.setState(c, !g);
                  });
              });
            };
          (c ? [b, a.legendSymbol] : [a.legendGroup]).forEach(function (c) {
            if (c)
              c.on("mouseover", function () {
                a.visible && e("inactive");
                a.setState("hover");
                a.visible && d.addClass(h);
                k || b.css(f.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  f.chart.styledMode ||
                    b.css(C(a.visible ? f.itemStyle : f.itemHiddenStyle));
                  e("");
                  d.removeClass(h);
                  a.setState();
                })
                .on("click", function (c) {
                  var b = function () {
                    a.setVisible && a.setVisible();
                    e(a.visible ? "inactive" : "");
                  };
                  d.removeClass(h);
                  c = { browserEvent: c };
                  a.firePointEvent
                    ? a.firePointEvent("legendItemClick", c, b)
                    : J(a, "legendItemClick", c, b);
                });
          });
        };
        b.prototype.createCheckboxForItem = function (b) {
          b.checkbox = d(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: b.selected,
              defaultChecked: b.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          a(b.checkbox, "click", function (a) {
            J(
              b.series || b,
              "checkboxClick",
              { checked: a.target.checked, item: b },
              function () {
                b.select();
              }
            );
          });
        };
        return b;
      })();
      (/Trident\/7\.0/.test(y.navigator && y.navigator.userAgent) || b) &&
        v(t.prototype, "positionItem", function (a, b) {
          var f = this,
            c = function () {
              b._legendItemPos && a.call(f, b);
            };
          c();
          f.bubbleLegend || setTimeout(c);
        });
      ("");
      return t;
    }
  );
  I(
    e,
    "Core/Series/SeriesRegistry.js",
    [
      e["Core/Globals.js"],
      e["Core/DefaultOptions.js"],
      e["Core/Series/Point.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v = e.defaultOptions,
        t = B.extendClass,
        F = B.merge,
        z;
      (function (e) {
        function p(b, a) {
          var d = v.plotOptions || {},
            g = a.defaultOptions,
            h = a.prototype;
          h.type = b;
          h.pointClass || (h.pointClass = y);
          g && (d[b] = g);
          e.seriesTypes[b] = a;
        }
        e.seriesTypes = b.seriesTypes;
        e.registerSeriesType = p;
        e.seriesType = function (b, a, d, g, m) {
          var h = v.plotOptions || {};
          a = a || "";
          h[b] = F(h[a], d);
          p(b, t(e.seriesTypes[a] || function () {}, g));
          e.seriesTypes[b].prototype.type = b;
          m && (e.seriesTypes[b].prototype.pointClass = t(y, m));
          return e.seriesTypes[b];
        };
      })(z || (z = {}));
      return z;
    }
  );
  I(
    e,
    "Core/Chart/Chart.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Axis/Axis.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Foundation.js"],
      e["Core/Globals.js"],
      e["Core/Legend/Legend.js"],
      e["Core/MSPointer.js"],
      e["Core/DefaultOptions.js"],
      e["Core/Pointer.js"],
      e["Core/Renderer/RendererRegistry.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Time.js"],
      e["Core/Utilities.js"],
      e["Core/Renderer/HTML/AST.js"],
    ],
    function (b, e, y, B, v, t, F, z, r, p, h, a, d, g, m) {
      var n = b.animate,
        G = b.animObject,
        J = b.setAnimation,
        x = y.numberFormat,
        C = B.registerEventOptions,
        u = v.charts,
        l = v.doc,
        A = v.marginNames,
        f = v.svg,
        w = v.win,
        k = z.defaultOptions,
        D = z.defaultTime,
        c = h.seriesTypes,
        q = g.addEvent,
        E = g.attr,
        H = g.cleanRecursively,
        K = g.createElement,
        L = g.css,
        S = g.defined,
        V = g.discardElement,
        P = g.erase,
        M = g.error,
        ba = g.extend,
        ea = g.find,
        I = g.fireEvent,
        fa = g.getStyle,
        R = g.isArray,
        X = g.isNumber,
        O = g.isObject,
        U = g.isString,
        T = g.merge,
        Y = g.objectEach,
        N = g.pick,
        aa = g.pInt,
        ca = g.relativeLength,
        ia = g.removeEvent,
        Z = g.splat,
        da = g.syncTimeout,
        ja = g.uniqueKey;
      b = (function () {
        function b(a, c, b) {
          this.series =
            this.renderTo =
            this.renderer =
            this.pointer =
            this.pointCount =
            this.plotWidth =
            this.plotTop =
            this.plotLeft =
            this.plotHeight =
            this.plotBox =
            this.options =
            this.numberFormatter =
            this.margin =
            this.legend =
            this.labelCollectors =
            this.isResizing =
            this.index =
            this.eventOptions =
            this.container =
            this.colorCounter =
            this.clipBox =
            this.chartWidth =
            this.chartHeight =
            this.bounds =
            this.axisOffset =
            this.axes =
              void 0;
          this.sharedClips = {};
          this.yAxis =
            this.xAxis =
            this.userOptions =
            this.titleOffset =
            this.time =
            this.symbolCounter =
            this.spacingBox =
            this.spacing =
              void 0;
          this.getArgs(a, c, b);
        }
        b.chart = function (a, c, f) {
          return new b(a, c, f);
        };
        b.prototype.getArgs = function (a, c, b) {
          U(a) || a.nodeName
            ? ((this.renderTo = a), this.init(c, b))
            : this.init(a, c);
        };
        b.prototype.init = function (a, c) {
          var b = a.plotOptions || {};
          I(this, "init", { args: arguments }, function () {
            var f = T(k, a),
              g = f.chart;
            Y(f.plotOptions, function (a, c) {
              O(a) && (a.tooltip = (b[c] && T(b[c].tooltip)) || void 0);
            });
            f.tooltip.userOptions =
              (a.chart && a.chart.forExport && a.tooltip.userOptions) ||
              a.tooltip;
            this.userOptions = a;
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = c;
            this.isResizing = 0;
            var h = (g.zooming = g.zooming || {});
            a.chart && !a.chart.zooming && (h.resetButton = g.resetZoomButton);
            h.key = N(h.key, g.zoomKey);
            h.pinchType = N(h.pinchType, g.pinchType);
            h.singleTouch = N(h.singleTouch, g.zoomBySingleTouch);
            h.type = N(h.type, g.zoomType);
            this.options = f;
            this.axes = [];
            this.series = [];
            this.time =
              a.time && Object.keys(a.time).length ? new d(a.time) : v.time;
            this.numberFormatter = g.numberFormatter || x;
            this.styledMode = g.styledMode;
            this.hasCartesianSeries = g.showAxes;
            this.index = u.length;
            u.push(this);
            v.chartCount++;
            C(this, g);
            this.xAxis = [];
            this.yAxis = [];
            this.pointCount = this.colorCounter = this.symbolCounter = 0;
            I(this, "afterInit");
            this.firstRender();
          });
        };
        b.prototype.initSeries = function (a) {
          var b = this.options.chart;
          b = a.type || b.type || b.defaultSeriesType;
          var f = c[b];
          f || M(17, !0, this, { missingModuleFor: b });
          b = new f();
          "function" === typeof b.init && b.init(this, a);
          return b;
        };
        b.prototype.setSeriesData = function () {
          this.getSeriesOrderByLinks().forEach(function (a) {
            a.points ||
              a.data ||
              !a.enabledDataSorting ||
              a.setData(a.options.data, !1);
          });
        };
        b.prototype.getSeriesOrderByLinks = function () {
          return this.series.concat().sort(function (a, c) {
            return a.linkedSeries.length || c.linkedSeries.length
              ? c.linkedSeries.length - a.linkedSeries.length
              : 0;
          });
        };
        b.prototype.orderSeries = function (a) {
          var c = this.series;
          a = a || 0;
          for (var b = c.length; a < b; ++a)
            c[a] && ((c[a].index = a), (c[a].name = c[a].getName()));
        };
        b.prototype.isInsidePlot = function (a, c, b) {
          void 0 === b && (b = {});
          var f = this.inverted,
            d = this.plotBox,
            g = this.plotLeft,
            h = this.plotTop,
            k = this.scrollablePlotBox,
            e = 0;
          var l = 0;
          b.visiblePlotOnly &&
            this.scrollingContainer &&
            ((l = this.scrollingContainer),
            (e = l.scrollLeft),
            (l = l.scrollTop));
          var m = b.series;
          d = (b.visiblePlotOnly && k) || d;
          k = b.inverted ? c : a;
          c = b.inverted ? a : c;
          a = { x: k, y: c, isInsidePlot: !0 };
          if (!b.ignoreX) {
            var q = (m && (f ? m.yAxis : m.xAxis)) || { pos: g, len: Infinity };
            k = b.paneCoordinates ? q.pos + k : g + k;
            (k >= Math.max(e + g, q.pos) &&
              k <= Math.min(e + g + d.width, q.pos + q.len)) ||
              (a.isInsidePlot = !1);
          }
          !b.ignoreY &&
            a.isInsidePlot &&
            ((f = (m && (f ? m.xAxis : m.yAxis)) || { pos: h, len: Infinity }),
            (b = b.paneCoordinates ? f.pos + c : h + c),
            (b >= Math.max(l + h, f.pos) &&
              b <= Math.min(l + h + d.height, f.pos + f.len)) ||
              (a.isInsidePlot = !1));
          I(this, "afterIsInsidePlot", a);
          return a.isInsidePlot;
        };
        b.prototype.redraw = function (a) {
          I(this, "beforeRedraw");
          var c = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
            b = this.series,
            f = this.pointer,
            d = this.legend,
            g = this.userOptions.legend,
            h = this.renderer,
            k = h.isHidden(),
            e = [],
            l = this.isDirtyBox,
            m = this.isDirtyLegend;
          this.setResponsive && this.setResponsive(!1);
          J(this.hasRendered ? a : !1, this);
          k && this.temporaryDisplay();
          this.layOutTitles();
          for (a = b.length; a--; ) {
            var q = b[a];
            if (q.options.stacking || q.options.centerInCategory) {
              var n = !0;
              if (q.isDirty) {
                var u = !0;
                break;
              }
            }
          }
          if (u)
            for (a = b.length; a--; )
              (q = b[a]), q.options.stacking && (q.isDirty = !0);
          b.forEach(function (a) {
            a.isDirty &&
              ("point" === a.options.legendType
                ? ("function" === typeof a.updateTotals && a.updateTotals(),
                  (m = !0))
                : g && (g.labelFormatter || g.labelFormat) && (m = !0));
            a.isDirtyData && I(a, "updatedData");
          });
          m &&
            d &&
            d.options.enabled &&
            (d.render(), (this.isDirtyLegend = !1));
          n && this.getStacks();
          c.forEach(function (a) {
            a.updateNames();
            a.setScale();
          });
          this.getMargins();
          c.forEach(function (a) {
            a.isDirty && (l = !0);
          });
          c.forEach(function (a) {
            var c = a.min + "," + a.max;
            a.extKey !== c &&
              ((a.extKey = c),
              e.push(function () {
                I(a, "afterSetExtremes", ba(a.eventArgs, a.getExtremes()));
                delete a.eventArgs;
              }));
            (l || n) && a.redraw();
          });
          l && this.drawChartBox();
          I(this, "predraw");
          b.forEach(function (a) {
            (l || a.isDirty) && a.visible && a.redraw();
            a.isDirtyData = !1;
          });
          f && f.reset(!0);
          h.draw();
          I(this, "redraw");
          I(this, "render");
          k && this.temporaryDisplay(!0);
          e.forEach(function (a) {
            a.call();
          });
        };
        b.prototype.get = function (a) {
          function c(c) {
            return c.id === a || (c.options && c.options.id === a);
          }
          for (
            var b = this.series,
              f = ea(this.axes, c) || ea(this.series, c),
              d = 0;
            !f && d < b.length;
            d++
          )
            f = ea(b[d].points || [], c);
          return f;
        };
        b.prototype.getAxes = function () {
          var a = this,
            c = this.options,
            b = (c.xAxis = Z(c.xAxis || {}));
          c = c.yAxis = Z(c.yAxis || {});
          I(this, "getAxes");
          b.forEach(function (a, c) {
            a.index = c;
            a.isX = !0;
          });
          c.forEach(function (a, c) {
            a.index = c;
          });
          b.concat(c).forEach(function (c) {
            new e(a, c);
          });
          I(this, "afterGetAxes");
        };
        b.prototype.getSelectedPoints = function () {
          return this.series.reduce(function (a, c) {
            c.getPointsCollection().forEach(function (c) {
              N(c.selectedStaging, c.selected) && a.push(c);
            });
            return a;
          }, []);
        };
        b.prototype.getSelectedSeries = function () {
          return this.series.filter(function (a) {
            return a.selected;
          });
        };
        b.prototype.setTitle = function (a, c, b) {
          this.applyDescription("title", a);
          this.applyDescription("subtitle", c);
          this.applyDescription("caption", void 0);
          this.layOutTitles(b);
        };
        b.prototype.applyDescription = function (a, c) {
          var b = this,
            f =
              "title" === a
                ? {
                    color: "#333333",
                    fontSize: this.options.isStock ? "16px" : "18px",
                  }
                : { color: "#666666" };
          f = this.options[a] = T(
            !this.styledMode && { style: f },
            this.options[a],
            c
          );
          var d = this[a];
          d && c && (this[a] = d = d.destroy());
          f &&
            !d &&
            ((d = this.renderer
              .text(f.text, 0, 0, f.useHTML)
              .attr({
                align: f.align,
                class: "highcharts-" + a,
                zIndex: f.zIndex || 4,
              })
              .add()),
            (d.update = function (c) {
              b[
                {
                  title: "setTitle",
                  subtitle: "setSubtitle",
                  caption: "setCaption",
                }[a]
              ](c);
            }),
            this.styledMode || d.css(f.style),
            (this[a] = d));
        };
        b.prototype.layOutTitles = function (a) {
          var c = [0, 0, 0],
            b = this.renderer,
            f = this.spacingBox;
          ["title", "subtitle", "caption"].forEach(function (a) {
            var d = this[a],
              g = this.options[a],
              h = g.verticalAlign || "top";
            a =
              "title" === a
                ? "top" === h
                  ? -3
                  : 0
                : "top" === h
                ? c[0] + 2
                : 0;
            var k;
            if (d) {
              this.styledMode || (k = g.style && g.style.fontSize);
              k = b.fontMetrics(k, d).b;
              d.css({
                width: (g.width || f.width + (g.widthAdjust || 0)) + "px",
              });
              var e = Math.round(d.getBBox(g.useHTML).height);
              d.align(
                ba({ y: "bottom" === h ? k : a + k, height: e }, g),
                !1,
                "spacingBox"
              );
              g.floating ||
                ("top" === h
                  ? (c[0] = Math.ceil(c[0] + e))
                  : "bottom" === h && (c[2] = Math.ceil(c[2] + e)));
            }
          }, this);
          c[0] &&
            "top" === (this.options.title.verticalAlign || "top") &&
            (c[0] += this.options.title.margin);
          c[2] &&
            "bottom" === this.options.caption.verticalAlign &&
            (c[2] += this.options.caption.margin);
          var d =
            !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
          this.titleOffset = c;
          I(this, "afterLayOutTitles");
          !this.isDirtyBox &&
            d &&
            ((this.isDirtyBox = this.isDirtyLegend = d),
            this.hasRendered && N(a, !0) && this.isDirtyBox && this.redraw());
        };
        b.prototype.getChartSize = function () {
          var a = this.options.chart,
            c = a.width;
          a = a.height;
          var b = this.renderTo;
          S(c) || (this.containerWidth = fa(b, "width"));
          S(a) || (this.containerHeight = fa(b, "height"));
          this.chartWidth = Math.max(0, c || this.containerWidth || 600);
          this.chartHeight = Math.max(
            0,
            ca(a, this.chartWidth) ||
              (1 < this.containerHeight ? this.containerHeight : 400)
          );
        };
        b.prototype.temporaryDisplay = function (a) {
          var c = this.renderTo;
          if (a)
            for (; c && c.style; )
              c.hcOrigStyle && (L(c, c.hcOrigStyle), delete c.hcOrigStyle),
                c.hcOrigDetached &&
                  (l.body.removeChild(c), (c.hcOrigDetached = !1)),
                (c = c.parentNode);
          else
            for (; c && c.style; ) {
              l.body.contains(c) ||
                c.parentNode ||
                ((c.hcOrigDetached = !0), l.body.appendChild(c));
              if ("none" === fa(c, "display", !1) || c.hcOricDetached)
                (c.hcOrigStyle = {
                  display: c.style.display,
                  height: c.style.height,
                  overflow: c.style.overflow,
                }),
                  (a = { display: "block", overflow: "hidden" }),
                  c !== this.renderTo && (a.height = 0),
                  L(c, a),
                  c.offsetWidth ||
                    c.style.setProperty("display", "block", "important");
              c = c.parentNode;
              if (c === l.body) break;
            }
        };
        b.prototype.setClassName = function (a) {
          this.container.className = "highcharts-container " + (a || "");
        };
        b.prototype.getContainer = function () {
          var c = this.options,
            b = c.chart,
            d = ja(),
            g,
            h = this.renderTo;
          h || (this.renderTo = h = b.renderTo);
          U(h) && (this.renderTo = h = l.getElementById(h));
          h || M(13, !0, this);
          var k = aa(E(h, "data-highcharts-chart"));
          X(k) && u[k] && u[k].hasRendered && u[k].destroy();
          E(h, "data-highcharts-chart", this.index);
          h.innerHTML = m.emptyHTML;
          b.skipClone || h.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          k = this.chartWidth;
          var e = this.chartHeight;
          L(h, { overflow: "hidden" });
          this.styledMode ||
            (g = ba(
              {
                position: "relative",
                overflow: "hidden",
                width: k + "px",
                height: e + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                userSelect: "none",
                "touch-action": "manipulation",
                outline: "none",
              },
              b.style || {}
            ));
          this.container = d = K("div", { id: d }, g, h);
          this._cursor = d.style.cursor;
          this.renderer = new (
            b.renderer || !f ? p.getRendererType(b.renderer) : a
          )(
            d,
            k,
            e,
            void 0,
            b.forExport,
            c.exporting && c.exporting.allowHTML,
            this.styledMode
          );
          J(void 0, this);
          this.setClassName(b.className);
          if (this.styledMode)
            for (var q in c.defs) this.renderer.definition(c.defs[q]);
          else this.renderer.setStyle(b.style);
          this.renderer.chartIndex = this.index;
          I(this, "afterGetContainer");
        };
        b.prototype.getMargins = function (a) {
          var c = this.spacing,
            b = this.margin,
            f = this.titleOffset;
          this.resetMargins();
          f[0] &&
            !S(b[0]) &&
            (this.plotTop = Math.max(this.plotTop, f[0] + c[0]));
          f[2] &&
            !S(b[2]) &&
            (this.marginBottom = Math.max(this.marginBottom, f[2] + c[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(b, c);
          I(this, "getMargins");
          a || this.getAxisMargins();
        };
        b.prototype.getAxisMargins = function () {
          var a = this,
            c = (a.axisOffset = [0, 0, 0, 0]),
            b = a.colorAxis,
            f = a.margin,
            d = function (a) {
              a.forEach(function (a) {
                a.visible && a.getOffset();
              });
            };
          a.hasCartesianSeries ? d(a.axes) : b && b.length && d(b);
          A.forEach(function (b, d) {
            S(f[d]) || (a[b] += c[d]);
          });
          a.setChartSize();
        };
        b.prototype.reflow = function (a) {
          var c = this,
            b = c.options.chart,
            f = c.renderTo,
            d = S(b.width) && S(b.height),
            h = b.width || fa(f, "width");
          b = b.height || fa(f, "height");
          f = a ? a.target : w;
          delete c.pointer.chartPosition;
          if (!d && !c.isPrinting && h && b && (f === w || f === l)) {
            if (h !== c.containerWidth || b !== c.containerHeight)
              g.clearTimeout(c.reflowTimeout),
                (c.reflowTimeout = da(
                  function () {
                    c.container && c.setSize(void 0, void 0, !1);
                  },
                  a ? 100 : 0
                ));
            c.containerWidth = h;
            c.containerHeight = b;
          }
        };
        b.prototype.setReflow = function (a) {
          var c = this;
          !1 === a || this.unbindReflow
            ? !1 === a &&
              this.unbindReflow &&
              (this.unbindReflow = this.unbindReflow())
            : ((this.unbindReflow = q(w, "resize", function (a) {
                c.options && c.reflow(a);
              })),
              q(this, "destroy", this.unbindReflow));
        };
        b.prototype.setSize = function (a, c, b) {
          var f = this,
            d = f.renderer;
          f.isResizing += 1;
          J(b, f);
          b = d.globalAnimation;
          f.oldChartHeight = f.chartHeight;
          f.oldChartWidth = f.chartWidth;
          "undefined" !== typeof a && (f.options.chart.width = a);
          "undefined" !== typeof c && (f.options.chart.height = c);
          f.getChartSize();
          f.styledMode ||
            (b ? n : L)(
              f.container,
              { width: f.chartWidth + "px", height: f.chartHeight + "px" },
              b
            );
          f.setChartSize(!0);
          d.setSize(f.chartWidth, f.chartHeight, b);
          f.axes.forEach(function (a) {
            a.isDirty = !0;
            a.setScale();
          });
          f.isDirtyLegend = !0;
          f.isDirtyBox = !0;
          f.layOutTitles();
          f.getMargins();
          f.redraw(b);
          f.oldChartHeight = null;
          I(f, "resize");
          da(function () {
            f &&
              I(f, "endResize", null, function () {
                --f.isResizing;
              });
          }, G(b).duration);
        };
        b.prototype.setChartSize = function (a) {
          var c = this.inverted,
            b = this.renderer,
            f = this.chartWidth,
            d = this.chartHeight,
            g = this.options.chart,
            h = this.spacing,
            k = this.clipOffset,
            e,
            l,
            m,
            q;
          this.plotLeft = e = Math.round(this.plotLeft);
          this.plotTop = l = Math.round(this.plotTop);
          this.plotWidth = m = Math.max(
            0,
            Math.round(f - e - this.marginRight)
          );
          this.plotHeight = q = Math.max(
            0,
            Math.round(d - l - this.marginBottom)
          );
          this.plotSizeX = c ? q : m;
          this.plotSizeY = c ? m : q;
          this.plotBorderWidth = g.plotBorderWidth || 0;
          this.spacingBox = b.spacingBox = {
            x: h[3],
            y: h[0],
            width: f - h[3] - h[1],
            height: d - h[0] - h[2],
          };
          this.plotBox = b.plotBox = { x: e, y: l, width: m, height: q };
          c = 2 * Math.floor(this.plotBorderWidth / 2);
          f = Math.ceil(Math.max(c, k[3]) / 2);
          d = Math.ceil(Math.max(c, k[0]) / 2);
          this.clipBox = {
            x: f,
            y: d,
            width: Math.floor(this.plotSizeX - Math.max(c, k[1]) / 2 - f),
            height: Math.max(
              0,
              Math.floor(this.plotSizeY - Math.max(c, k[2]) / 2 - d)
            ),
          };
          a ||
            (this.axes.forEach(function (a) {
              a.setAxisSize();
              a.setAxisTranslation();
            }),
            b.alignElements());
          I(this, "afterSetChartSize", { skipAxes: a });
        };
        b.prototype.resetMargins = function () {
          I(this, "resetMargins");
          var a = this,
            c = a.options.chart;
          ["margin", "spacing"].forEach(function (b) {
            var f = c[b],
              d = O(f) ? f : [f, f, f, f];
            ["Top", "Right", "Bottom", "Left"].forEach(function (f, g) {
              a[b][g] = N(c[b + f], d[g]);
            });
          });
          A.forEach(function (c, b) {
            a[c] = N(a.margin[b], a.spacing[b]);
          });
          a.axisOffset = [0, 0, 0, 0];
          a.clipOffset = [0, 0, 0, 0];
        };
        b.prototype.drawChartBox = function () {
          var a = this.options.chart,
            c = this.renderer,
            b = this.chartWidth,
            f = this.chartHeight,
            d = this.styledMode,
            g = this.plotBGImage,
            h = a.backgroundColor,
            k = a.plotBackgroundColor,
            e = a.plotBackgroundImage,
            l = this.plotLeft,
            m = this.plotTop,
            q = this.plotWidth,
            n = this.plotHeight,
            u = this.plotBox,
            w = this.clipRect,
            p = this.clipBox,
            E = this.chartBackground,
            x = this.plotBackground,
            C = this.plotBorder,
            A,
            D = "animate";
          E ||
            ((this.chartBackground = E =
              c.rect().addClass("highcharts-background").add()),
            (D = "attr"));
          if (d) var r = (A = E.strokeWidth());
          else {
            r = a.borderWidth || 0;
            A = r + (a.shadow ? 8 : 0);
            h = { fill: h || "none" };
            if (r || E["stroke-width"])
              (h.stroke = a.borderColor), (h["stroke-width"] = r);
            E.attr(h).shadow(a.shadow);
          }
          E[D]({
            x: A / 2,
            y: A / 2,
            width: b - A - (r % 2),
            height: f - A - (r % 2),
            r: a.borderRadius,
          });
          D = "animate";
          x ||
            ((D = "attr"),
            (this.plotBackground = x =
              c.rect().addClass("highcharts-plot-background").add()));
          x[D](u);
          d ||
            (x.attr({ fill: k || "none" }).shadow(a.plotShadow),
            e &&
              (g
                ? (e !== g.attr("href") && g.attr("href", e), g.animate(u))
                : (this.plotBGImage = c.image(e, l, m, q, n).add())));
          w
            ? w.animate({ width: p.width, height: p.height })
            : (this.clipRect = c.clipRect(p));
          D = "animate";
          C ||
            ((D = "attr"),
            (this.plotBorder = C =
              c
                .rect()
                .addClass("highcharts-plot-border")
                .attr({ zIndex: 1 })
                .add()));
          d ||
            C.attr({
              stroke: a.plotBorderColor,
              "stroke-width": a.plotBorderWidth || 0,
              fill: "none",
            });
          C[D](C.crisp({ x: l, y: m, width: q, height: n }, -C.strokeWidth()));
          this.isDirtyBox = !1;
          I(this, "afterDrawChartBox");
        };
        b.prototype.propFromSeries = function () {
          var a = this,
            b = a.options.chart,
            f = a.options.series,
            d,
            g,
            h;
          ["inverted", "angular", "polar"].forEach(function (k) {
            g = c[b.type || b.defaultSeriesType];
            h = b[k] || (g && g.prototype[k]);
            for (d = f && f.length; !h && d--; )
              (g = c[f[d].type]) && g.prototype[k] && (h = !0);
            a[k] = h;
          });
        };
        b.prototype.linkSeries = function () {
          var a = this,
            c = a.series;
          c.forEach(function (a) {
            a.linkedSeries.length = 0;
          });
          c.forEach(function (c) {
            var b = c.options.linkedTo;
            U(b) &&
              (b = ":previous" === b ? a.series[c.index - 1] : a.get(b)) &&
              b.linkedParent !== c &&
              (b.linkedSeries.push(c),
              (c.linkedParent = b),
              b.enabledDataSorting && c.setDataSortingOptions(),
              (c.visible = N(c.options.visible, b.options.visible, c.visible)));
          });
          I(this, "afterLinkSeries");
        };
        b.prototype.renderSeries = function () {
          this.series.forEach(function (a) {
            a.translate();
            a.render();
          });
        };
        b.prototype.renderLabels = function () {
          var a = this,
            c = a.options.labels;
          c.items &&
            c.items.forEach(function (b) {
              var f = ba(c.style, b.style),
                d = aa(f.left) + a.plotLeft,
                g = aa(f.top) + a.plotTop + 12;
              delete f.left;
              delete f.top;
              a.renderer.text(b.html, d, g).attr({ zIndex: 2 }).css(f).add();
            });
        };
        b.prototype.render = function () {
          var a = this.axes,
            c = this.colorAxis,
            b = this.renderer,
            f = this.options,
            d = function (a) {
              a.forEach(function (a) {
                a.visible && a.render();
              });
            },
            g = 0;
          this.setTitle();
          this.legend = new t(this, f.legend);
          this.getStacks && this.getStacks();
          this.getMargins(!0);
          this.setChartSize();
          f = this.plotWidth;
          a.some(function (a) {
            if (
              a.horiz &&
              a.visible &&
              a.options.labels.enabled &&
              a.series.length
            )
              return (g = 21), !0;
          });
          var h = (this.plotHeight = Math.max(this.plotHeight - g, 0));
          a.forEach(function (a) {
            a.setScale();
          });
          this.getAxisMargins();
          var k = 1.1 < f / this.plotWidth,
            e = 1.05 < h / this.plotHeight;
          if (k || e)
            a.forEach(function (a) {
              ((a.horiz && k) || (!a.horiz && e)) && a.setTickInterval(!0);
            }),
              this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? d(a) : c && c.length && d(c);
          this.seriesGroup ||
            (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());
          this.renderSeries();
          this.renderLabels();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.hasRendered = !0;
        };
        b.prototype.addCredits = function (a) {
          var c = this,
            b = T(!0, this.options.credits, a);
          b.enabled &&
            !this.credits &&
            ((this.credits = this.renderer
              .text(b.text + (this.mapCredits || ""), 0, 0)
              .addClass("highcharts-credits")
              .on("click", function () {
                b.href && (w.location.href = b.href);
              })
              .attr({ align: b.position.align, zIndex: 8 })),
            c.styledMode || this.credits.css(b.style),
            this.credits.add().align(b.position),
            (this.credits.update = function (a) {
              c.credits = c.credits.destroy();
              c.addCredits(a);
            }));
        };
        b.prototype.destroy = function () {
          var a = this,
            c = a.axes,
            b = a.series,
            f = a.container,
            d = f && f.parentNode,
            g;
          I(a, "destroy");
          a.renderer.forExport ? P(u, a) : (u[a.index] = void 0);
          v.chartCount--;
          a.renderTo.removeAttribute("data-highcharts-chart");
          ia(a);
          for (g = c.length; g--; ) c[g] = c[g].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (g = b.length; g--; ) b[g] = b[g].destroy();
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
            .split(" ")
            .forEach(function (c) {
              var b = a[c];
              b && b.destroy && (a[c] = b.destroy());
            });
          f && ((f.innerHTML = m.emptyHTML), ia(f), d && V(f));
          Y(a, function (c, b) {
            delete a[b];
          });
        };
        b.prototype.firstRender = function () {
          var a = this,
            c = a.options;
          if (!a.isReadyToRender || a.isReadyToRender()) {
            a.getContainer();
            a.resetMargins();
            a.setChartSize();
            a.propFromSeries();
            a.getAxes();
            (R(c.series) ? c.series : []).forEach(function (c) {
              a.initSeries(c);
            });
            a.linkSeries();
            a.setSeriesData();
            I(a, "beforeRender");
            r &&
              (F.isRequired()
                ? (a.pointer = new F(a, c))
                : (a.pointer = new r(a, c)));
            a.render();
            a.pointer.getChartPosition();
            if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
            a.temporaryDisplay(!0);
          }
        };
        b.prototype.onload = function () {
          this.callbacks.concat([this.callback]).forEach(function (a) {
            a && "undefined" !== typeof this.index && a.apply(this, [this]);
          }, this);
          I(this, "load");
          I(this, "render");
          S(this.index) && this.setReflow(this.options.chart.reflow);
          this.warnIfA11yModuleNotLoaded();
          this.hasLoaded = !0;
        };
        b.prototype.warnIfA11yModuleNotLoaded = function () {
          var a = this.options,
            c = this.title;
          a &&
            !this.accessibility &&
            (this.renderer.boxWrapper.attr({
              role: "img",
              "aria-label": (c && c.element.textContent) || "",
            }),
            (a.accessibility && !1 === a.accessibility.enabled) ||
              M(
                'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                !1,
                this
              ));
        };
        b.prototype.addSeries = function (a, c, b) {
          var f = this,
            d;
          a &&
            ((c = N(c, !0)),
            I(f, "addSeries", { options: a }, function () {
              d = f.initSeries(a);
              f.isDirtyLegend = !0;
              f.linkSeries();
              d.enabledDataSorting && d.setData(a.data, !1);
              I(f, "afterAddSeries", { series: d });
              c && f.redraw(b);
            }));
          return d;
        };
        b.prototype.addAxis = function (a, c, b, f) {
          return this.createAxis(c ? "xAxis" : "yAxis", {
            axis: a,
            redraw: b,
            animation: f,
          });
        };
        b.prototype.addColorAxis = function (a, c, b) {
          return this.createAxis("colorAxis", {
            axis: a,
            redraw: c,
            animation: b,
          });
        };
        b.prototype.createAxis = function (a, c) {
          a = new e(
            this,
            T(c.axis, { index: this[a].length, isX: "xAxis" === a })
          );
          N(c.redraw, !0) && this.redraw(c.animation);
          return a;
        };
        b.prototype.showLoading = function (a) {
          var c = this,
            b = c.options,
            f = b.loading,
            d = function () {
              g &&
                L(g, {
                  left: c.plotLeft + "px",
                  top: c.plotTop + "px",
                  width: c.plotWidth + "px",
                  height: c.plotHeight + "px",
                });
            },
            g = c.loadingDiv,
            h = c.loadingSpan;
          g ||
            (c.loadingDiv = g =
              K(
                "div",
                { className: "highcharts-loading highcharts-loading-hidden" },
                null,
                c.container
              ));
          h ||
            ((c.loadingSpan = h =
              K("span", { className: "highcharts-loading-inner" }, null, g)),
            q(c, "redraw", d));
          g.className = "highcharts-loading";
          m.setElementHTML(h, N(a, b.lang.loading, ""));
          c.styledMode ||
            (L(g, ba(f.style, { zIndex: 10 })),
            L(h, f.labelStyle),
            c.loadingShown ||
              (L(g, { opacity: 0, display: "" }),
              n(
                g,
                { opacity: f.style.opacity || 0.5 },
                { duration: f.showDuration || 0 }
              )));
          c.loadingShown = !0;
          d();
        };
        b.prototype.hideLoading = function () {
          var a = this.options,
            c = this.loadingDiv;
          c &&
            ((c.className = "highcharts-loading highcharts-loading-hidden"),
            this.styledMode ||
              n(
                c,
                { opacity: 0 },
                {
                  duration: a.loading.hideDuration || 100,
                  complete: function () {
                    L(c, { display: "none" });
                  },
                }
              ));
          this.loadingShown = !1;
        };
        b.prototype.update = function (a, c, b, f) {
          var g = this,
            h = {
              credits: "addCredits",
              title: "setTitle",
              subtitle: "setSubtitle",
              caption: "setCaption",
            },
            k = a.isResponsiveOptions,
            e = [],
            l,
            m;
          I(g, "update", { options: a });
          k || g.setResponsive(!1, !0);
          a = H(a, g.options);
          g.userOptions = T(g.userOptions, a);
          var q = a.chart;
          if (q) {
            T(!0, g.options.chart, q);
            "className" in q && g.setClassName(q.className);
            "reflow" in q && g.setReflow(q.reflow);
            if ("inverted" in q || "polar" in q || "type" in q) {
              g.propFromSeries();
              var n = !0;
            }
            "alignTicks" in q && (n = !0);
            "events" in q && C(this, q);
            Y(q, function (a, c) {
              -1 !== g.propsRequireUpdateSeries.indexOf("chart." + c) &&
                (l = !0);
              -1 !== g.propsRequireDirtyBox.indexOf(c) && (g.isDirtyBox = !0);
              -1 !== g.propsRequireReflow.indexOf(c) &&
                (k ? (g.isDirtyBox = !0) : (m = !0));
            });
            !g.styledMode &&
              q.style &&
              g.renderer.setStyle(g.options.chart.style || {});
          }
          !g.styledMode && a.colors && (this.options.colors = a.colors);
          a.time &&
            (this.time === D && (this.time = new d(a.time)),
            T(!0, g.options.time, a.time));
          Y(a, function (c, b) {
            if (g[b] && "function" === typeof g[b].update) g[b].update(c, !1);
            else if ("function" === typeof g[h[b]]) g[h[b]](c);
            else
              "colors" !== b &&
                -1 === g.collectionsWithUpdate.indexOf(b) &&
                T(!0, g.options[b], a[b]);
            "chart" !== b &&
              -1 !== g.propsRequireUpdateSeries.indexOf(b) &&
              (l = !0);
          });
          this.collectionsWithUpdate.forEach(function (c) {
            if (a[c]) {
              var f = [];
              g[c].forEach(function (a, c) {
                a.options.isInternal || f.push(N(a.options.index, c));
              });
              Z(a[c]).forEach(function (a, d) {
                var h = S(a.id),
                  k;
                h && (k = g.get(a.id));
                !k &&
                  g[c] &&
                  (k = g[c][f ? f[d] : d]) &&
                  h &&
                  S(k.options.id) &&
                  (k = void 0);
                k && k.coll === c && (k.update(a, !1), b && (k.touched = !0));
                !k &&
                  b &&
                  g.collectionsWithInit[c] &&
                  (g.collectionsWithInit[c][0].apply(
                    g,
                    [a].concat(g.collectionsWithInit[c][1] || []).concat([!1])
                  ).touched = !0);
              });
              b &&
                g[c].forEach(function (a) {
                  a.touched || a.options.isInternal
                    ? delete a.touched
                    : e.push(a);
                });
            }
          });
          e.forEach(function (a) {
            a.chart && a.remove && a.remove(!1);
          });
          n &&
            g.axes.forEach(function (a) {
              a.update({}, !1);
            });
          l &&
            g.getSeriesOrderByLinks().forEach(function (a) {
              a.chart && a.update({}, !1);
            }, this);
          n = q && q.width;
          q = q && (U(q.height) ? ca(q.height, n || g.chartWidth) : q.height);
          m || (X(n) && n !== g.chartWidth) || (X(q) && q !== g.chartHeight)
            ? g.setSize(n, q, f)
            : N(c, !0) && g.redraw(f);
          I(g, "afterUpdate", { options: a, redraw: c, animation: f });
        };
        b.prototype.setSubtitle = function (a, c) {
          this.applyDescription("subtitle", a);
          this.layOutTitles(c);
        };
        b.prototype.setCaption = function (a, c) {
          this.applyDescription("caption", a);
          this.layOutTitles(c);
        };
        b.prototype.showResetZoom = function () {
          function a() {
            c.zoomOut();
          }
          var c = this,
            b = k.lang,
            f = c.options.chart.zooming.resetButton,
            d = f.theme,
            g =
              "chart" === f.relativeTo || "spacingBox" === f.relativeTo
                ? null
                : "scrollablePlotBox";
          I(this, "beforeShowResetZoom", null, function () {
            c.resetZoomButton = c.renderer
              .button(b.resetZoom, null, null, a, d)
              .attr({ align: f.position.align, title: b.resetZoomTitle })
              .addClass("highcharts-reset-zoom")
              .add()
              .align(f.position, !1, g);
          });
          I(this, "afterShowResetZoom");
        };
        b.prototype.zoomOut = function () {
          I(this, "selection", { resetSelection: !0 }, this.zoom);
        };
        b.prototype.zoom = function (a) {
          var c = this,
            b = c.pointer,
            f = c.inverted ? b.mouseDownX : b.mouseDownY,
            d = !1,
            g;
          !a || a.resetSelection
            ? (c.axes.forEach(function (a) {
                g = a.zoom();
              }),
              (b.initiated = !1))
            : a.xAxis.concat(a.yAxis).forEach(function (a) {
                var h = a.axis,
                  k = c.inverted ? h.left : h.top,
                  e = c.inverted ? k + h.width : k + h.height,
                  l = h.isXAxis,
                  q = !1;
                if ((!l && f >= k && f <= e) || l || !S(f)) q = !0;
                b[l ? "zoomX" : "zoomY"] &&
                  q &&
                  ((g = h.zoom(a.min, a.max)), h.displayBtn && (d = !0));
              });
          var h = c.resetZoomButton;
          d && !h
            ? c.showResetZoom()
            : !d && O(h) && (c.resetZoomButton = h.destroy());
          g &&
            c.redraw(
              N(c.options.chart.animation, a && a.animation, 100 > c.pointCount)
            );
        };
        b.prototype.pan = function (a, c) {
          var b = this,
            f = b.hoverPoints;
          c = "object" === typeof c ? c : { enabled: c, type: "x" };
          var d = b.options.chart;
          d && d.panning && (d.panning = c);
          var g = c.type,
            h;
          I(this, "pan", { originalEvent: a }, function () {
            f &&
              f.forEach(function (a) {
                a.setState();
              });
            var c = b.xAxis;
            "xy" === g ? (c = c.concat(b.yAxis)) : "y" === g && (c = b.yAxis);
            var d = {};
            c.forEach(function (c) {
              if (c.options.panningEnabled && !c.options.isInternal) {
                var f = c.horiz,
                  k = a[f ? "chartX" : "chartY"];
                f = f ? "mouseDownX" : "mouseDownY";
                var e = b[f],
                  l = c.minPointOffset || 0,
                  q =
                    (c.reversed && !b.inverted) || (!c.reversed && b.inverted)
                      ? -1
                      : 1,
                  m = c.getExtremes(),
                  n = c.toValue(e - k, !0) + l * q,
                  u =
                    c.toValue(e + c.len - k, !0) -
                    (l * q || (c.isXAxis && c.pointRangePadding) || 0),
                  w = u < n;
                q = c.hasVerticalPanning();
                e = w ? u : n;
                n = w ? n : u;
                var p = c.panningState;
                !q ||
                  c.isXAxis ||
                  (p && !p.isDirty) ||
                  c.series.forEach(function (a) {
                    var c = a.getProcessedData(!0);
                    c = a.getExtremes(c.yData, !0);
                    p ||
                      (p = {
                        startMin: Number.MAX_VALUE,
                        startMax: -Number.MAX_VALUE,
                      });
                    X(c.dataMin) &&
                      X(c.dataMax) &&
                      ((p.startMin = Math.min(
                        N(a.options.threshold, Infinity),
                        c.dataMin,
                        p.startMin
                      )),
                      (p.startMax = Math.max(
                        N(a.options.threshold, -Infinity),
                        c.dataMax,
                        p.startMax
                      )));
                  });
                q = Math.min(
                  N(p && p.startMin, m.dataMin),
                  l ? m.min : c.toValue(c.toPixels(m.min) - c.minPixelPadding)
                );
                u = Math.max(
                  N(p && p.startMax, m.dataMax),
                  l ? m.max : c.toValue(c.toPixels(m.max) + c.minPixelPadding)
                );
                c.panningState = p;
                c.isOrdinal ||
                  ((l = q - e),
                  0 < l && ((n += l), (e = q)),
                  (l = n - u),
                  0 < l && ((n = u), (e -= l)),
                  c.series.length &&
                    e !== m.min &&
                    n !== m.max &&
                    e >= q &&
                    n <= u &&
                    (c.setExtremes(e, n, !1, !1, { trigger: "pan" }),
                    !b.resetZoomButton &&
                      e !== q &&
                      n !== u &&
                      g.match("y") &&
                      (b.showResetZoom(), (c.displayBtn = !1)),
                    (h = !0)),
                  (d[f] = k));
              }
            });
            Y(d, function (a, c) {
              b[c] = a;
            });
            h && b.redraw(!1);
            L(b.container, { cursor: "move" });
          });
        };
        return b;
      })();
      ba(b.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [b.prototype.addAxis, [!0]],
          yAxis: [b.prototype.addAxis, [!1]],
          series: [b.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "series"],
        propsRequireDirtyBox:
          "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
            " "
          ),
        propsRequireReflow:
          "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
            " "
          ),
        propsRequireUpdateSeries:
          "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
            " "
          ),
      });
      ("");
      return b;
    }
  );
  I(e, "Core/Legend/LegendSymbol.js", [e["Core/Utilities.js"]], function (b) {
    var e = b.merge,
      y = b.pick,
      B;
    (function (b) {
      b.drawLineMarker = function (b) {
        var t = this.options,
          v = b.symbolWidth,
          r = b.symbolHeight,
          p = r / 2,
          h = this.chart.renderer,
          a = this.legendGroup;
        b = b.baseline - Math.round(0.3 * b.fontMetrics.b);
        var d = {},
          g = t.marker;
        this.chart.styledMode ||
          ((d = { "stroke-width": t.lineWidth || 0 }),
          t.dashStyle && (d.dashstyle = t.dashStyle));
        this.legendLine = h
          .path([
            ["M", 0, b],
            ["L", v, b],
          ])
          .addClass("highcharts-graph")
          .attr(d)
          .add(a);
        g &&
          !1 !== g.enabled &&
          v &&
          ((t = Math.min(y(g.radius, p), p)),
          0 === this.symbol.indexOf("url") &&
            ((g = e(g, { width: r, height: r })), (t = 0)),
          (this.legendSymbol = v =
            h
              .symbol(this.symbol, v / 2 - t, b - t, 2 * t, 2 * t, g)
              .addClass("highcharts-point")
              .add(a)),
          (v.isMarker = !0));
      };
      b.drawRectangle = function (b, e) {
        var t = b.symbolHeight,
          r = b.options.squareSymbol;
        e.legendSymbol = this.chart.renderer
          .rect(
            r ? (b.symbolWidth - t) / 2 : 0,
            b.baseline - t + 1,
            r ? t : b.symbolWidth,
            t,
            y(b.options.symbolRadius, t / 2)
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(e.legendGroup);
      };
    })(B || (B = {}));
    return B;
  });
  I(e, "Core/Series/SeriesDefaults.js", [], function () {
    return {
      lineWidth: 2,
      allowPointSelect: !1,
      crisp: !0,
      showCheckbox: !1,
      animation: { duration: 1e3 },
      events: {},
      marker: {
        enabledThreshold: 2,
        lineColor: "#ffffff",
        lineWidth: 0,
        radius: 4,
        states: {
          normal: { animation: !0 },
          hover: {
            animation: { duration: 50 },
            enabled: !0,
            radiusPlus: 2,
            lineWidthPlus: 1,
          },
          select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 },
        },
      },
      point: { events: {} },
      dataLabels: {
        animation: {},
        align: "center",
        defer: !0,
        formatter: function () {
          var b = this.series.chart.numberFormatter;
          return "number" !== typeof this.y ? "" : b(this.y, -1);
        },
        padding: 5,
        style: {
          fontSize: "11px",
          fontWeight: "bold",
          color: "contrast",
          textOutline: "1px contrast",
        },
        verticalAlign: "bottom",
        x: 0,
        y: 0,
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: { animation: !0 },
        hover: {
          animation: { duration: 50 },
          lineWidthPlus: 1,
          marker: {},
          halo: { size: 10, opacity: 0.25 },
        },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 50 }, opacity: 0.2 },
      },
      stickyTracking: !0,
      turboThreshold: 1e3,
      findNearestPointBy: "x",
    };
  });
  I(
    e,
    "Core/Series/Series.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/DefaultOptions.js"],
      e["Core/Foundation.js"],
      e["Core/Globals.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Core/Series/Point.js"],
      e["Core/Series/SeriesDefaults.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F, z, r, p) {
      var h = b.animObject,
        a = b.setAnimation,
        d = e.defaultOptions,
        g = y.registerEventOptions,
        m = B.hasTouch,
        n = B.svg,
        G = B.win,
        J = z.seriesTypes,
        x = p.addEvent,
        C = p.arrayMax,
        u = p.arrayMin,
        l = p.clamp,
        A = p.cleanRecursively,
        f = p.correctFloat,
        w = p.defined,
        k = p.erase,
        D = p.error,
        c = p.extend,
        q = p.find,
        E = p.fireEvent,
        H = p.getNestedProperty,
        K = p.isArray,
        L = p.isNumber,
        S = p.isString,
        V = p.merge,
        P = p.objectEach,
        M = p.pick,
        I = p.removeEvent,
        ea = p.splat,
        ha = p.syncTimeout;
      b = (function () {
        function b() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        b.prototype.init = function (a, b) {
          E(this, "init", { options: b });
          var f = this,
            d = a.series;
          this.eventsToUnbind = [];
          f.chart = a;
          f.options = f.setOptions(b);
          b = f.options;
          f.linkedSeries = [];
          f.bindAxes();
          c(f, {
            name: b.name,
            state: "",
            visible: !1 !== b.visible,
            selected: !0 === b.selected,
          });
          g(this, b);
          var h = b.events;
          if (
            (h && h.click) ||
            (b.point && b.point.events && b.point.events.click) ||
            b.allowPointSelect
          )
            a.runTrackerClick = !0;
          f.getColor();
          f.getSymbol();
          f.parallelArrays.forEach(function (a) {
            f[a + "Data"] || (f[a + "Data"] = []);
          });
          f.isCartesian && (a.hasCartesianSeries = !0);
          var k;
          d.length && (k = d[d.length - 1]);
          f._i = M(k && k._i, -1) + 1;
          f.opacity = f.options.opacity;
          a.orderSeries(this.insert(d));
          b.dataSorting && b.dataSorting.enabled
            ? f.setDataSortingOptions()
            : f.points || f.data || f.setData(b.data, !1);
          E(this, "afterInit");
        };
        b.prototype.is = function (a) {
          return J[a] && this instanceof J[a];
        };
        b.prototype.insert = function (a) {
          var c = this.options.index,
            b;
          if (L(c)) {
            for (b = a.length; b--; )
              if (c >= M(a[b].options.index, a[b]._i)) {
                a.splice(b + 1, 0, this);
                break;
              }
            -1 === b && a.unshift(this);
            b += 1;
          } else a.push(this);
          return M(b, a.length - 1);
        };
        b.prototype.bindAxes = function () {
          var a = this,
            c = a.options,
            b = a.chart,
            f;
          E(this, "bindAxes", null, function () {
            (a.axisTypes || []).forEach(function (d) {
              var g = 0;
              b[d].forEach(function (b) {
                f = b.options;
                if (
                  (c[d] === g && !f.isInternal) ||
                  ("undefined" !== typeof c[d] && c[d] === f.id) ||
                  ("undefined" === typeof c[d] && 0 === f.index)
                )
                  a.insert(b.series), (a[d] = b), (b.isDirty = !0);
                f.isInternal || g++;
              });
              a[d] || a.optionalAxis === d || D(18, !0, b);
            });
          });
          E(this, "afterBindAxes");
        };
        b.prototype.updateParallelArrays = function (a, c) {
          var b = a.series,
            f = arguments,
            d = L(c)
              ? function (f) {
                  var d = "y" === f && b.toYData ? b.toYData(a) : a[f];
                  b[f + "Data"][c] = d;
                }
              : function (a) {
                  Array.prototype[c].apply(
                    b[a + "Data"],
                    Array.prototype.slice.call(f, 2)
                  );
                };
          b.parallelArrays.forEach(d);
        };
        b.prototype.hasData = function () {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        };
        b.prototype.autoIncrement = function (a) {
          var c = this.options,
            b = c.pointIntervalUnit,
            f = c.relativeXValue,
            d = this.chart.time,
            g = this.xIncrement,
            h;
          g = M(g, c.pointStart, 0);
          this.pointInterval = h = M(this.pointInterval, c.pointInterval, 1);
          f && L(a) && (h *= a);
          b &&
            ((c = new d.Date(g)),
            "day" === b
              ? d.set("Date", c, d.get("Date", c) + h)
              : "month" === b
              ? d.set("Month", c, d.get("Month", c) + h)
              : "year" === b && d.set("FullYear", c, d.get("FullYear", c) + h),
            (h = c.getTime() - g));
          if (f && L(a)) return g + h;
          this.xIncrement = g + h;
          return g;
        };
        b.prototype.setDataSortingOptions = function () {
          var a = this.options;
          c(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          w(a.pointRange) || (a.pointRange = 1);
        };
        b.prototype.setOptions = function (a) {
          var c = this.chart,
            b = c.options,
            f = b.plotOptions,
            g = c.userOptions || {};
          a = V(a);
          c = c.styledMode;
          var h = { plotOptions: f, userOptions: a };
          E(this, "setOptions", h);
          var k = h.plotOptions[this.type],
            e = g.plotOptions || {};
          this.userOptions = h.userOptions;
          g = V(k, f.series, g.plotOptions && g.plotOptions[this.type], a);
          this.tooltipOptions = V(
            d.tooltip,
            d.plotOptions.series && d.plotOptions.series.tooltip,
            d.plotOptions[this.type].tooltip,
            b.tooltip.userOptions,
            f.series && f.series.tooltip,
            f[this.type].tooltip,
            a.tooltip
          );
          this.stickyTracking = M(
            a.stickyTracking,
            e[this.type] && e[this.type].stickyTracking,
            e.series && e.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : g.stickyTracking
          );
          null === k.marker && delete g.marker;
          this.zoneAxis = g.zoneAxis;
          f = this.zones = (g.zones || []).slice();
          (!g.negativeColor && !g.negativeFillColor) ||
            g.zones ||
            ((b = {
              value: g[this.zoneAxis + "Threshold"] || g.threshold || 0,
              className: "highcharts-negative",
            }),
            c ||
              ((b.color = g.negativeColor),
              (b.fillColor = g.negativeFillColor)),
            f.push(b));
          f.length &&
            w(f[f.length - 1].value) &&
            f.push(c ? {} : { color: this.color, fillColor: this.fillColor });
          E(this, "afterSetOptions", { options: g });
          return g;
        };
        b.prototype.getName = function () {
          return M(this.options.name, "Series " + (this.index + 1));
        };
        b.prototype.getCyclic = function (a, c, b) {
          var f = this.chart,
            d = this.userOptions,
            g = a + "Index",
            h = a + "Counter",
            k = b ? b.length : M(f.options.chart[a + "Count"], f[a + "Count"]);
          if (!c) {
            var e = M(d[g], d["_" + g]);
            w(e) ||
              (f.series.length || (f[h] = 0),
              (d["_" + g] = e = f[h] % k),
              (f[h] += 1));
            b && (c = b[e]);
          }
          "undefined" !== typeof e && (this[g] = e);
          this[a] = c;
        };
        b.prototype.getColor = function () {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
            ? (this.color = "#cccccc")
            : this.getCyclic(
                "color",
                this.options.color || d.plotOptions[this.type].color,
                this.chart.options.colors
              );
        };
        b.prototype.getPointsCollection = function () {
          return (this.hasGroupedData ? this.points : this.data) || [];
        };
        b.prototype.getSymbol = function () {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        };
        b.prototype.findPointIndex = function (a, c) {
          var b = a.id,
            f = a.x,
            d = this.points,
            g = this.options.dataSorting,
            h,
            k;
          if (b) (g = this.chart.get(b)), g instanceof t && (h = g);
          else if (
            this.linkedParent ||
            this.enabledDataSorting ||
            this.options.relativeXValue
          )
            if (
              ((h = function (c) {
                return !c.touched && c.index === a.index;
              }),
              g && g.matchByName
                ? (h = function (c) {
                    return !c.touched && c.name === a.name;
                  })
                : this.options.relativeXValue &&
                  (h = function (c) {
                    return !c.touched && c.options.x === a.x;
                  }),
              (h = q(d, h)),
              !h)
            )
              return;
          if (h) {
            var e = h && h.index;
            "undefined" !== typeof e && (k = !0);
          }
          "undefined" === typeof e && L(f) && (e = this.xData.indexOf(f, c));
          -1 !== e &&
            "undefined" !== typeof e &&
            this.cropped &&
            (e = e >= this.cropStart ? e - this.cropStart : e);
          !k && L(e) && d[e] && d[e].touched && (e = void 0);
          return e;
        };
        b.prototype.updateData = function (a, c) {
          var b = this.options,
            f = b.dataSorting,
            d = this.points,
            g = [],
            h = this.requireSorting,
            k = a.length === d.length,
            e,
            l,
            q,
            m = !0;
          this.xIncrement = null;
          a.forEach(function (a, c) {
            var l =
                (w(a) &&
                  this.pointClass.prototype.optionsToObject.call(
                    { series: this },
                    a
                  )) ||
                {},
              m = l.x;
            if (l.id || L(m)) {
              if (
                ((l = this.findPointIndex(l, q)),
                -1 === l || "undefined" === typeof l
                  ? g.push(a)
                  : d[l] && a !== b.data[l]
                  ? (d[l].update(a, !1, null, !1),
                    (d[l].touched = !0),
                    h && (q = l + 1))
                  : d[l] && (d[l].touched = !0),
                !k || c !== l || (f && f.enabled) || this.hasDerivedData)
              )
                e = !0;
            } else g.push(a);
          }, this);
          if (e)
            for (a = d.length; a--; )
              (l = d[a]) && !l.touched && l.remove && l.remove(!1, c);
          else
            !k || (f && f.enabled)
              ? (m = !1)
              : (a.forEach(function (a, c) {
                  a !== d[c].y && d[c].update && d[c].update(a, !1, null, !1);
                }),
                (g.length = 0));
          d.forEach(function (a) {
            a && (a.touched = !1);
          });
          if (!m) return !1;
          g.forEach(function (a) {
            this.addPoint(a, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = C(this.xData)), this.autoIncrement());
          return !0;
        };
        b.prototype.setData = function (a, c, b, f) {
          void 0 === c && (c = !0);
          var d = this,
            g = d.points,
            h = (g && g.length) || 0,
            k = d.options,
            e = d.chart,
            l = k.dataSorting,
            q = d.xAxis,
            m = k.turboThreshold,
            n = this.xData,
            u = this.yData,
            w = d.pointArrayMap;
          w = w && w.length;
          var p = k.keys,
            E,
            x = 0,
            C = 1,
            A = null;
          if (!e.options.chart.allowMutatingData) {
            k.data && delete d.options.data;
            d.userOptions.data && delete d.userOptions.data;
            var r = V(!0, a);
          }
          a = r || a || [];
          r = a.length;
          l && l.enabled && (a = this.sortData(a));
          e.options.chart.allowMutatingData &&
            !1 !== f &&
            r &&
            h &&
            !d.cropped &&
            !d.hasGroupedData &&
            d.visible &&
            !d.boosted &&
            (E = this.updateData(a, b));
          if (!E) {
            d.xIncrement = null;
            d.colorCounter = 0;
            this.parallelArrays.forEach(function (a) {
              d[a + "Data"].length = 0;
            });
            if (m && r > m)
              if (((A = d.getFirstValidPoint(a)), L(A)))
                for (b = 0; b < r; b++)
                  (n[b] = this.autoIncrement()), (u[b] = a[b]);
              else if (K(A))
                if (w)
                  if (A.length === w)
                    for (b = 0; b < r; b++)
                      (n[b] = this.autoIncrement()), (u[b] = a[b]);
                  else
                    for (b = 0; b < r; b++)
                      (f = a[b]), (n[b] = f[0]), (u[b] = f.slice(1, w + 1));
                else if (
                  (p &&
                    ((x = p.indexOf("x")),
                    (C = p.indexOf("y")),
                    (x = 0 <= x ? x : 0),
                    (C = 0 <= C ? C : 1)),
                  1 === A.length && (C = 0),
                  x === C)
                )
                  for (b = 0; b < r; b++)
                    (n[b] = this.autoIncrement()), (u[b] = a[b][C]);
                else
                  for (b = 0; b < r; b++)
                    (f = a[b]), (n[b] = f[x]), (u[b] = f[C]);
              else D(12, !1, e);
            else
              for (b = 0; b < r; b++)
                "undefined" !== typeof a[b] &&
                  ((f = { series: d }),
                  d.pointClass.prototype.applyOptions.apply(f, [a[b]]),
                  d.updateParallelArrays(f, b));
            u && S(u[0]) && D(14, !0, e);
            d.data = [];
            d.options.data = d.userOptions.data = a;
            for (b = h; b--; ) g[b] && g[b].destroy && g[b].destroy();
            q && (q.minRange = q.userMinRange);
            d.isDirty = e.isDirtyBox = !0;
            d.isDirtyData = !!g;
            b = !1;
          }
          "point" === k.legendType &&
            (this.processData(), this.generatePoints());
          c && e.redraw(b);
        };
        b.prototype.sortData = function (a) {
          var c = this,
            b = c.options.dataSorting.sortKey || "y",
            f = function (a, c) {
              return (
                (w(c) &&
                  a.pointClass.prototype.optionsToObject.call(
                    { series: a },
                    c
                  )) ||
                {}
              );
            };
          a.forEach(function (b, d) {
            a[d] = f(c, b);
            a[d].index = d;
          }, this);
          a.concat()
            .sort(function (a, c) {
              a = H(b, a);
              c = H(b, c);
              return c < a ? -1 : c > a ? 1 : 0;
            })
            .forEach(function (a, c) {
              a.x = c;
            }, this);
          c.linkedSeries &&
            c.linkedSeries.forEach(function (c) {
              var b = c.options,
                d = b.data;
              (b.dataSorting && b.dataSorting.enabled) ||
                !d ||
                (d.forEach(function (b, g) {
                  d[g] = f(c, b);
                  a[g] && ((d[g].x = a[g].x), (d[g].index = g));
                }),
                c.setData(d, !1));
            });
          return a;
        };
        b.prototype.getProcessedData = function (a) {
          var c = this.xAxis,
            b = this.options,
            f = b.cropThreshold,
            d = a || this.getExtremesFromAll || b.getExtremesFromAll,
            g = this.isCartesian;
          a = c && c.val2lin;
          b = !(!c || !c.logarithmic);
          var h = 0,
            k = this.xData,
            e = this.yData,
            l = this.requireSorting;
          var q = !1;
          var m = k.length;
          if (c) {
            q = c.getExtremes();
            var n = q.min;
            var u = q.max;
            q = !(!c.categories || c.names.length);
          }
          if (g && this.sorted && !d && (!f || m > f || this.forceCrop))
            if (k[m - 1] < n || k[0] > u) (k = []), (e = []);
            else if (this.yData && (k[0] < n || k[m - 1] > u)) {
              var w = this.cropData(this.xData, this.yData, n, u);
              k = w.xData;
              e = w.yData;
              h = w.start;
              w = !0;
            }
          for (f = k.length || 1; --f; )
            if (
              ((c = b ? a(k[f]) - a(k[f - 1]) : k[f] - k[f - 1]),
              0 < c && ("undefined" === typeof p || c < p))
            )
              var p = c;
            else 0 > c && l && !q && (D(15, !1, this.chart), (l = !1));
          return {
            xData: k,
            yData: e,
            cropped: w,
            cropStart: h,
            closestPointRange: p,
          };
        };
        b.prototype.processData = function (a) {
          var c = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !c.isDirty &&
            !this.yAxis.isDirty &&
            !a
          )
            return !1;
          a = this.getProcessedData();
          this.cropped = a.cropped;
          this.cropStart = a.cropStart;
          this.processedXData = a.xData;
          this.processedYData = a.yData;
          this.closestPointRange = this.basePointRange = a.closestPointRange;
          E(this, "afterProcessData");
        };
        b.prototype.cropData = function (a, c, b, f, d) {
          var g = a.length,
            h,
            k = 0,
            e = g;
          d = M(d, this.cropShoulder);
          for (h = 0; h < g; h++)
            if (a[h] >= b) {
              k = Math.max(0, h - d);
              break;
            }
          for (b = h; b < g; b++)
            if (a[b] > f) {
              e = b + d;
              break;
            }
          return {
            xData: a.slice(k, e),
            yData: c.slice(k, e),
            start: k,
            end: e,
          };
        };
        b.prototype.generatePoints = function () {
          var a = this.options,
            b = this.processedData || a.data,
            f = this.processedXData,
            d = this.processedYData,
            g = this.pointClass,
            h = f.length,
            k = this.cropStart || 0,
            e = this.hasGroupedData,
            l = a.keys,
            q = [];
          a = a.dataGrouping && a.dataGrouping.groupAll ? k : 0;
          var m,
            n,
            u = this.data;
          if (!u && !e) {
            var w = [];
            w.length = b.length;
            u = this.data = w;
          }
          l && e && (this.options.keys = !1);
          for (n = 0; n < h; n++) {
            w = k + n;
            if (e) {
              var p = new g().init(this, [f[n]].concat(ea(d[n])));
              p.dataGroup = this.groupMap[a + n];
              p.dataGroup.options &&
                ((p.options = p.dataGroup.options),
                c(p, p.dataGroup.options),
                delete p.dataLabels);
            } else
              (p = u[w]) ||
                "undefined" === typeof b[w] ||
                (u[w] = p = new g().init(this, b[w], f[n]));
            p && ((p.index = e ? a + n : w), (q[n] = p));
          }
          this.options.keys = l;
          if (u && (h !== (m = u.length) || e))
            for (n = 0; n < m; n++)
              n !== k || e || (n += h),
                u[n] && (u[n].destroyElements(), (u[n].plotX = void 0));
          this.data = u;
          this.points = q;
          E(this, "afterGeneratePoints");
        };
        b.prototype.getXExtremes = function (a) {
          return { min: u(a), max: C(a) };
        };
        b.prototype.getExtremes = function (a, c) {
          var b = this.xAxis,
            f = this.yAxis,
            d = this.processedXData || this.xData,
            g = [],
            h = this.requireSorting ? this.cropShoulder : 0;
          f = f ? f.positiveValuesOnly : !1;
          var k,
            e = 0,
            l = 0,
            q = 0;
          a = a || this.stackedYData || this.processedYData || [];
          var m = a.length;
          if (b) {
            var n = b.getExtremes();
            e = n.min;
            l = n.max;
          }
          for (k = 0; k < m; k++) {
            var w = d[k];
            n = a[k];
            var p = (L(n) || K(n)) && (n.length || 0 < n || !f);
            w =
              c ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !b ||
              ((d[k + h] || w) >= e && (d[k - h] || w) <= l);
            if (p && w)
              if ((p = n.length)) for (; p--; ) L(n[p]) && (g[q++] = n[p]);
              else g[q++] = n;
          }
          a = { activeYData: g, dataMin: u(g), dataMax: C(g) };
          E(this, "afterGetExtremes", { dataExtremes: a });
          return a;
        };
        b.prototype.applyExtremes = function () {
          var a = this.getExtremes();
          this.dataMin = a.dataMin;
          this.dataMax = a.dataMax;
          return a;
        };
        b.prototype.getFirstValidPoint = function (a) {
          for (var c = a.length, b = 0, f = null; null === f && b < c; )
            (f = a[b]), b++;
          return f;
        };
        b.prototype.translate = function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var a = this.options,
            c = a.stacking,
            b = this.xAxis,
            d = b.categories,
            g = this.enabledDataSorting,
            h = this.yAxis,
            k = this.points,
            e = k.length,
            q = this.pointPlacementToXValue(),
            m = !!q,
            n = a.threshold,
            u = a.startFromThreshold ? n : 0,
            p = this.zoneAxis || "y",
            x,
            C,
            A = Number.MAX_VALUE;
          for (x = 0; x < e; x++) {
            var D = k[x],
              r = D.x,
              G = void 0,
              H = void 0,
              J = D.y,
              t = D.low,
              v =
                c &&
                h.stacking &&
                h.stacking.stacks[
                  (this.negStacks && J < (u ? 0 : n) ? "-" : "") + this.stackKey
                ];
            if (
              (h.positiveValuesOnly && !h.validatePositiveValue(J)) ||
              (b.positiveValuesOnly && !b.validatePositiveValue(r))
            )
              D.isNull = !0;
            D.plotX = C = f(
              l(b.translate(r, 0, 0, 0, 1, q, "flags" === this.type), -1e5, 1e5)
            );
            if (c && this.visible && v && v[r]) {
              var z = this.getStackIndicator(z, r, this.index);
              D.isNull || ((G = v[r]), (H = G.points[z.key]));
            }
            K(H) &&
              ((t = H[0]),
              (J = H[1]),
              t === u && z.key === v[r].base && (t = M(L(n) && n, h.min)),
              h.positiveValuesOnly && 0 >= t && (t = null),
              (D.total = D.stackTotal = G.total),
              (D.percentage = G.total && (D.y / G.total) * 100),
              (D.stackY = J),
              this.irregularWidths ||
                G.setOffset(this.pointXOffset || 0, this.barW || 0));
            D.yBottom = w(t) ? l(h.translate(t, 0, 1, 0, 1), -1e5, 1e5) : null;
            this.dataModify && (J = this.dataModify.modifyValue(J, x));
            D.plotY = void 0;
            L(J) &&
              ((G = h.translate(J, !1, !0, !1, !0)),
              "undefined" !== typeof G && (D.plotY = l(G, -1e5, 1e5)));
            D.isInside = this.isPointInside(D);
            D.clientX = m ? f(b.translate(r, 0, 0, 0, 1, q)) : C;
            D.negative = D[p] < (a[p + "Threshold"] || n || 0);
            D.category = M(d && d[D.x], D.x);
            if (!D.isNull && !1 !== D.visible) {
              "undefined" !== typeof y && (A = Math.min(A, Math.abs(C - y)));
              var y = C;
            }
            D.zone = this.zones.length ? D.getZone() : void 0;
            !D.graphic && this.group && g && (D.isNew = !0);
          }
          this.closestPointRangePx = A;
          E(this, "afterTranslate");
        };
        b.prototype.getValidPoints = function (a, c, b) {
          var f = this.chart;
          return (a || this.points || []).filter(function (a) {
            return c &&
              !f.isInsidePlot(a.plotX, a.plotY, { inverted: f.inverted })
              ? !1
              : !1 !== a.visible && (b || !a.isNull);
          });
        };
        b.prototype.getClipBox = function () {
          var a = this.chart,
            c = this.xAxis,
            b = this.yAxis,
            f = V(a.clipBox);
          c && c.len !== a.plotSizeX && (f.width = c.len);
          b && b.len !== a.plotSizeY && (f.height = b.len);
          return f;
        };
        b.prototype.getSharedClipKey = function () {
          return (this.sharedClipKey =
            (this.options.xAxis || 0) + "," + (this.options.yAxis || 0));
        };
        b.prototype.setClip = function () {
          var a = this.chart,
            c = this.group,
            b = this.markerGroup,
            f = a.sharedClips;
          a = a.renderer;
          var d = this.getClipBox(),
            g = this.getSharedClipKey(),
            h = f[g];
          h ? h.animate(d) : (f[g] = h = a.clipRect(d));
          c && c.clip(!1 === this.options.clip ? void 0 : h);
          b && b.clip();
        };
        b.prototype.animate = function (a) {
          var c = this.chart,
            b = this.group,
            f = this.markerGroup,
            d = c.inverted,
            g = h(this.options.animation),
            k = [this.getSharedClipKey(), g.duration, g.easing, g.defer].join(),
            e = c.sharedClips[k],
            l = c.sharedClips[k + "m"];
          if (a && b)
            (g = this.getClipBox()),
              e
                ? e.attr("height", g.height)
                : ((g.width = 0),
                  d && (g.x = c.plotHeight),
                  (e = c.renderer.clipRect(g)),
                  (c.sharedClips[k] = e),
                  (l = c.renderer.clipRect({
                    x: d ? (c.plotSizeX || 0) + 99 : -99,
                    y: d ? -c.plotLeft : -c.plotTop,
                    width: 99,
                    height: d ? c.chartWidth : c.chartHeight,
                  })),
                  (c.sharedClips[k + "m"] = l)),
              b.clip(e),
              f && f.clip(l);
          else if (e && !e.hasClass("highcharts-animating")) {
            c = this.getClipBox();
            var q = g.step;
            f &&
              f.element.childNodes.length &&
              (g.step = function (a, c) {
                q && q.apply(c, arguments);
                l &&
                  l.element &&
                  l.attr(c.prop, "width" === c.prop ? a + 99 : a);
              });
            e.addClass("highcharts-animating").animate(c, g);
          }
        };
        b.prototype.afterAnimate = function () {
          var a = this;
          this.setClip();
          P(this.chart.sharedClips, function (c, b, f) {
            c &&
              !a.chart.container.querySelector(
                '[clip-path="url(#'.concat(c.id, ')"]')
              ) &&
              (c.destroy(), delete f[b]);
          });
          this.finishedAnimating = !0;
          E(this, "afterAnimate");
        };
        b.prototype.drawPoints = function () {
          var a = this.points,
            c = this.chart,
            b = this.options.marker,
            f = this[this.specialGroup] || this.markerGroup,
            d = this.xAxis,
            g = M(
              b.enabled,
              !d || d.isRadial ? !0 : null,
              this.closestPointRangePx >= b.enabledThreshold * b.radius
            ),
            h,
            k;
          if (!1 !== b.enabled || this._hasPointMarkers)
            for (h = 0; h < a.length; h++) {
              var e = a[h];
              var l = (k = e.graphic) ? "animate" : "attr";
              var q = e.marker || {};
              var m = !!e.marker;
              if (
                ((g && "undefined" === typeof q.enabled) || q.enabled) &&
                !e.isNull &&
                !1 !== e.visible
              ) {
                var n = M(q.symbol, this.symbol, "rect");
                var u = this.markerAttribs(e, e.selected && "select");
                this.enabledDataSorting &&
                  (e.startXPos = d.reversed ? -(u.width || 0) : d.width);
                var w = !1 !== e.isInside;
                k
                  ? k[w ? "show" : "hide"](w).animate(u)
                  : w &&
                    (0 < (u.width || 0) || e.hasImage) &&
                    ((e.graphic = k =
                      c.renderer
                        .symbol(n, u.x, u.y, u.width, u.height, m ? q : b)
                        .add(f)),
                    this.enabledDataSorting &&
                      c.hasRendered &&
                      (k.attr({ x: e.startXPos }), (l = "animate")));
                k && "animate" === l && k[w ? "show" : "hide"](w).animate(u);
                if (k && !c.styledMode)
                  k[l](this.pointAttribs(e, e.selected && "select"));
                k && k.addClass(e.getClassName(), !0);
              } else k && (e.graphic = k.destroy());
            }
        };
        b.prototype.markerAttribs = function (a, c) {
          var b = this.options,
            f = b.marker,
            d = a.marker || {},
            g = d.symbol || f.symbol,
            h = M(d.radius, f && f.radius);
          c &&
            ((f = f.states[c]),
            (c = d.states && d.states[c]),
            (h = M(
              c && c.radius,
              f && f.radius,
              h && h + ((f && f.radiusPlus) || 0)
            )));
          a.hasImage = g && 0 === g.indexOf("url");
          a.hasImage && (h = 0);
          a = L(h)
            ? {
                x: b.crisp ? Math.floor(a.plotX - h) : a.plotX - h,
                y: a.plotY - h,
              }
            : {};
          h && (a.width = a.height = 2 * h);
          return a;
        };
        b.prototype.pointAttribs = function (a, c) {
          var b = this.options.marker,
            f = a && a.options,
            d = (f && f.marker) || {},
            g = f && f.color,
            h = a && a.color,
            k = a && a.zone && a.zone.color,
            e = this.color;
          a = M(d.lineWidth, b.lineWidth);
          f = 1;
          e = g || k || h || e;
          g = d.fillColor || b.fillColor || e;
          h = d.lineColor || b.lineColor || e;
          c = c || "normal";
          b = b.states[c] || {};
          c = (d.states && d.states[c]) || {};
          a = M(
            c.lineWidth,
            b.lineWidth,
            a + M(c.lineWidthPlus, b.lineWidthPlus, 0)
          );
          g = c.fillColor || b.fillColor || g;
          h = c.lineColor || b.lineColor || h;
          f = M(c.opacity, b.opacity, f);
          return { stroke: h, "stroke-width": a, fill: g, opacity: f };
        };
        b.prototype.destroy = function (a) {
          var c = this,
            b = c.chart,
            f = /AppleWebKit\/533/.test(G.navigator.userAgent),
            d = c.data || [],
            g,
            h,
            e,
            l;
          E(c, "destroy", { keepEventsForUpdate: a });
          this.removeEvents(a);
          (c.axisTypes || []).forEach(function (a) {
            (l = c[a]) &&
              l.series &&
              (k(l.series, c), (l.isDirty = l.forceRedraw = !0));
          });
          c.legendItem && c.chart.legend.destroyItem(c);
          for (h = d.length; h--; ) (e = d[h]) && e.destroy && e.destroy();
          c.clips &&
            c.clips.forEach(function (a) {
              return a.destroy();
            });
          p.clearTimeout(c.animationTimeout);
          P(c, function (a, c) {
            a instanceof r &&
              !a.survive &&
              ((g = f && "group" === c ? "hide" : "destroy"), a[g]());
          });
          b.hoverSeries === c && (b.hoverSeries = void 0);
          k(b.series, c);
          b.orderSeries();
          P(c, function (b, f) {
            (a && "hcEvents" === f) || delete c[f];
          });
        };
        b.prototype.applyZones = function () {
          var a = this,
            c = this.chart,
            b = c.renderer,
            f = this.zones,
            d = this.clips || [],
            g = this.graph,
            h = this.area,
            k = Math.max(c.plotWidth, c.plotHeight),
            e = this[(this.zoneAxis || "y") + "Axis"],
            q = c.inverted,
            m,
            n,
            u,
            w,
            p,
            E,
            x,
            D,
            C = !1;
          if (f.length && (g || h) && e && "undefined" !== typeof e.min) {
            var A = e.reversed;
            var r = e.horiz;
            g && !this.showLine && g.hide();
            h && h.hide();
            var G = e.getExtremes();
            f.forEach(function (f, H) {
              m = A ? (r ? c.plotWidth : 0) : r ? 0 : e.toPixels(G.min) || 0;
              m = l(M(n, m), 0, k);
              n = l(Math.round(e.toPixels(M(f.value, G.max), !0) || 0), 0, k);
              C && (m = n = e.toPixels(G.max));
              w = Math.abs(m - n);
              p = Math.min(m, n);
              E = Math.max(m, n);
              e.isXAxis
                ? ((u = { x: q ? E : p, y: 0, width: w, height: k }),
                  r || (u.x = c.plotHeight - u.x))
                : ((u = { x: 0, y: q ? E : p, width: k, height: w }),
                  r && (u.y = c.plotWidth - u.y));
              q &&
                b.isVML &&
                (u = e.isXAxis
                  ? { x: 0, y: A ? p : E, height: u.width, width: c.chartWidth }
                  : {
                      x: u.y - c.plotLeft - c.spacingBox.x,
                      y: 0,
                      width: u.height,
                      height: c.chartHeight,
                    });
              d[H] ? d[H].animate(u) : (d[H] = b.clipRect(u));
              x = a["zone-area-" + H];
              D = a["zone-graph-" + H];
              g && D && D.clip(d[H]);
              h && x && x.clip(d[H]);
              C = f.value > G.max;
              a.resetZones && 0 === n && (n = void 0);
            });
            this.clips = d;
          } else a.visible && (g && g.show(), h && h.show());
        };
        b.prototype.invertGroups = function (a) {
          function c() {
            ["group", "markerGroup"].forEach(function (c) {
              b[c] &&
                (f.renderer.isVML &&
                  b[c].attr({ width: b.yAxis.len, height: b.xAxis.len }),
                (b[c].width = b.yAxis.len),
                (b[c].height = b.xAxis.len),
                b[c].invert(b.isRadialSeries ? !1 : a));
            });
          }
          var b = this,
            f = b.chart;
          b.xAxis &&
            (b.eventsToUnbind.push(x(f, "resize", c)),
            c(),
            (b.invertGroups = c));
        };
        b.prototype.plotGroup = function (a, c, b, f, d) {
          var g = this[a],
            h = !g;
          b = { visibility: b, zIndex: f || 0.1 };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (b.opacity = this.opacity);
          h && (this[a] = g = this.chart.renderer.g().add(d));
          g.addClass(
            "highcharts-" +
              c +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (w(this.colorIndex)
                ? "highcharts-color-" + this.colorIndex + " "
                : "") +
              (this.options.className || "") +
              (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0
          );
          g.attr(b)[h ? "attr" : "animate"](this.getPlotBox());
          return g;
        };
        b.prototype.getPlotBox = function () {
          var a = this.chart,
            c = this.xAxis,
            b = this.yAxis;
          a.inverted && ((c = b), (b = this.xAxis));
          return {
            translateX: c ? c.left : a.plotLeft,
            translateY: b ? b.top : a.plotTop,
            scaleX: 1,
            scaleY: 1,
          };
        };
        b.prototype.removeEvents = function (a) {
          a || I(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (a) {
              a();
            }),
            (this.eventsToUnbind.length = 0));
        };
        b.prototype.render = function () {
          var a = this,
            c = a.chart,
            b = a.options,
            f = h(b.animation),
            d = a.visible ? "inherit" : "hidden",
            g = b.zIndex,
            k = a.hasRendered,
            e = c.seriesGroup,
            l = c.inverted;
          c = !a.finishedAnimating && c.renderer.isSVG ? f.duration : 0;
          E(this, "render");
          var q = a.plotGroup("group", "series", d, g, e);
          a.markerGroup = a.plotGroup("markerGroup", "markers", d, g, e);
          !1 !== b.clip && a.setClip();
          a.animate && c && a.animate(!0);
          q.inverted = M(a.invertible, a.isCartesian) ? l : !1;
          a.drawGraph && (a.drawGraph(), a.applyZones());
          a.visible && a.drawPoints();
          a.drawDataLabels && a.drawDataLabels();
          a.redrawPoints && a.redrawPoints();
          a.drawTracker &&
            !1 !== a.options.enableMouseTracking &&
            a.drawTracker();
          a.invertGroups(l);
          a.animate && c && a.animate();
          k ||
            (c && f.defer && (c += f.defer),
            (a.animationTimeout = ha(function () {
              a.afterAnimate();
            }, c || 0)));
          a.isDirty = !1;
          a.hasRendered = !0;
          E(a, "afterRender");
        };
        b.prototype.redraw = function () {
          var a = this.chart,
            c = this.isDirty || this.isDirtyData,
            b = this.group,
            f = this.xAxis,
            d = this.yAxis;
          b &&
            (a.inverted && b.attr({ width: a.plotWidth, height: a.plotHeight }),
            b.animate({
              translateX: M(f && f.left, a.plotLeft),
              translateY: M(d && d.top, a.plotTop),
            }));
          this.translate();
          this.render();
          c && delete this.kdTree;
        };
        b.prototype.searchPoint = function (a, c) {
          var b = this.xAxis,
            f = this.yAxis,
            d = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: d ? b.len - a.chartY + b.pos : a.chartX - b.pos,
              plotY: d ? f.len - a.chartX + f.pos : a.chartY - f.pos,
            },
            c,
            a
          );
        };
        b.prototype.buildKDTree = function (a) {
          function c(a, f, d) {
            var g = a && a.length;
            if (g) {
              var h = b.kdAxisArray[f % d];
              a.sort(function (a, c) {
                return a[h] - c[h];
              });
              g = Math.floor(g / 2);
              return {
                point: a[g],
                left: c(a.slice(0, g), f + 1, d),
                right: c(a.slice(g + 1), f + 1, d),
              };
            }
          }
          this.buildingKdTree = !0;
          var b = this,
            f = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete b.kdTree;
          ha(
            function () {
              b.kdTree = c(b.getValidPoints(null, !b.directTouch), f, f);
              b.buildingKdTree = !1;
            },
            b.options.kdNow || (a && "touchstart" === a.type) ? 0 : 1
          );
        };
        b.prototype.searchKDTree = function (a, c, b) {
          function f(a, c, b, e) {
            var l = c.point,
              q = d.kdAxisArray[b % e],
              m = l,
              n = w(a[g]) && w(l[g]) ? Math.pow(a[g] - l[g], 2) : null;
            var u = w(a[h]) && w(l[h]) ? Math.pow(a[h] - l[h], 2) : null;
            u = (n || 0) + (u || 0);
            l.dist = w(u) ? Math.sqrt(u) : Number.MAX_VALUE;
            l.distX = w(n) ? Math.sqrt(n) : Number.MAX_VALUE;
            q = a[q] - l[q];
            u = 0 > q ? "left" : "right";
            n = 0 > q ? "right" : "left";
            c[u] && ((u = f(a, c[u], b + 1, e)), (m = u[k] < m[k] ? u : l));
            c[n] &&
              Math.sqrt(q * q) < m[k] &&
              ((a = f(a, c[n], b + 1, e)), (m = a[k] < m[k] ? a : m));
            return m;
          }
          var d = this,
            g = this.kdAxisArray[0],
            h = this.kdAxisArray[1],
            k = c ? "distX" : "dist";
          c = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(b);
          if (this.kdTree) return f(a, this.kdTree, c, c);
        };
        b.prototype.pointPlacementToXValue = function () {
          var a = this.options,
            c = a.pointRange,
            b = this.xAxis;
          a = a.pointPlacement;
          "between" === a && (a = b.reversed ? -0.5 : 0.5);
          return L(a) ? a * (c || b.pointRange) : 0;
        };
        b.prototype.isPointInside = function (a) {
          var c = this.chart,
            b = this.xAxis,
            f = this.yAxis;
          return (
            "undefined" !== typeof a.plotY &&
            "undefined" !== typeof a.plotX &&
            0 <= a.plotY &&
            a.plotY <= (f ? f.len : c.plotHeight) &&
            0 <= a.plotX &&
            a.plotX <= (b ? b.len : c.plotWidth)
          );
        };
        b.prototype.drawTracker = function () {
          var a = this,
            c = a.options,
            b = c.trackByArea,
            f = [].concat(b ? a.areaPath : a.graphPath),
            d = a.chart,
            g = d.pointer,
            h = d.renderer,
            k = d.options.tooltip.snap,
            e = a.tracker,
            l = function (c) {
              if (d.hoverSeries !== a) a.onMouseOver();
            },
            q = "rgba(192,192,192," + (n ? 0.0001 : 0.002) + ")";
          e
            ? e.attr({ d: f })
            : a.graph &&
              ((a.tracker = h
                .path(f)
                .attr({
                  visibility: a.visible ? "inherit" : "hidden",
                  zIndex: 2,
                })
                .addClass(
                  b ? "highcharts-tracker-area" : "highcharts-tracker-line"
                )
                .add(a.group)),
              d.styledMode ||
                a.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: q,
                  fill: b ? q : "none",
                  "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * k),
                }),
              [a.tracker, a.markerGroup, a.dataLabelsGroup].forEach(function (
                a
              ) {
                if (
                  a &&
                  (a
                    .addClass("highcharts-tracker")
                    .on("mouseover", l)
                    .on("mouseout", function (a) {
                      g.onTrackerMouseOut(a);
                    }),
                  c.cursor && !d.styledMode && a.css({ cursor: c.cursor }),
                  m)
                )
                  a.on("touchstart", l);
              }));
          E(this, "afterDrawTracker");
        };
        b.prototype.addPoint = function (a, c, b, f, d) {
          var g = this.options,
            h = this.data,
            k = this.chart,
            e = this.xAxis;
          e = e && e.hasNames && e.names;
          var l = g.data,
            q = this.xData,
            m;
          c = M(c, !0);
          var n = { series: this };
          this.pointClass.prototype.applyOptions.apply(n, [a]);
          var u = n.x;
          var w = q.length;
          if (this.requireSorting && u < q[w - 1])
            for (m = !0; w && q[w - 1] > u; ) w--;
          this.updateParallelArrays(n, "splice", w, 0, 0);
          this.updateParallelArrays(n, w);
          e && n.name && (e[u] = n.name);
          l.splice(w, 0, a);
          if (m || this.processedData)
            this.data.splice(w, 0, null), this.processData();
          "point" === g.legendType && this.generatePoints();
          b &&
            (h[0] && h[0].remove
              ? h[0].remove(!1)
              : (h.shift(), this.updateParallelArrays(n, "shift"), l.shift()));
          !1 !== d && E(this, "addPoint", { point: n });
          this.isDirtyData = this.isDirty = !0;
          c && k.redraw(f);
        };
        b.prototype.removePoint = function (c, b, f) {
          var d = this,
            g = d.data,
            h = g[c],
            k = d.points,
            e = d.chart,
            l = function () {
              k && k.length === g.length && k.splice(c, 1);
              g.splice(c, 1);
              d.options.data.splice(c, 1);
              d.updateParallelArrays(h || { series: d }, "splice", c, 1);
              h && h.destroy();
              d.isDirty = !0;
              d.isDirtyData = !0;
              b && e.redraw();
            };
          a(f, e);
          b = M(b, !0);
          h ? h.firePointEvent("remove", null, l) : l();
        };
        b.prototype.remove = function (a, c, b, f) {
          function d() {
            g.destroy(f);
            h.isDirtyLegend = h.isDirtyBox = !0;
            h.linkSeries();
            M(a, !0) && h.redraw(c);
          }
          var g = this,
            h = g.chart;
          !1 !== b ? E(g, "remove", null, d) : d();
        };
        b.prototype.update = function (a, b) {
          a = A(a, this.userOptions);
          E(this, "update", { options: a });
          var f = this,
            d = f.chart,
            g = f.userOptions,
            h = f.initialType || f.type,
            k = d.options.plotOptions,
            e = J[h].prototype,
            l = f.finishedAnimating && { animation: !1 },
            q = {},
            m,
            n = ["eventOptions", "navigatorSeries", "baseSeries"],
            u = a.type || g.type || d.options.chart.type,
            w = !(
              this.hasDerivedData ||
              (u && u !== this.type) ||
              "undefined" !== typeof a.pointStart ||
              "undefined" !== typeof a.pointInterval ||
              "undefined" !== typeof a.relativeXValue ||
              a.joinBy ||
              a.mapData ||
              f.hasOptionChanged("dataGrouping") ||
              f.hasOptionChanged("pointStart") ||
              f.hasOptionChanged("pointInterval") ||
              f.hasOptionChanged("pointIntervalUnit") ||
              f.hasOptionChanged("keys")
            );
          u = u || h;
          w &&
            (n.push(
              "data",
              "isDirtyData",
              "points",
              "processedData",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "level",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX"
            ),
            !1 !== a.visible && n.push("area", "graph"),
            f.parallelArrays.forEach(function (a) {
              n.push(a + "Data");
            }),
            a.data &&
              (a.dataSorting && c(f.options.dataSorting, a.dataSorting),
              this.setData(a.data, !1)));
          a = V(
            g,
            l,
            {
              index: "undefined" === typeof g.index ? f.index : g.index,
              pointStart: M(
                k && k.series && k.series.pointStart,
                g.pointStart,
                f.xData[0]
              ),
            },
            !w && { data: f.options.data },
            a
          );
          w && a.data && (a.data = f.options.data);
          n = [
            "group",
            "markerGroup",
            "dataLabelsGroup",
            "transformGroup",
          ].concat(n);
          n.forEach(function (a) {
            n[a] = f[a];
            delete f[a];
          });
          k = !1;
          if (J[u]) {
            if (((k = u !== f.type), f.remove(!1, !1, !1, !0), k))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(f, J[u].prototype);
              else {
                l = Object.hasOwnProperty.call(f, "hcEvents") && f.hcEvents;
                for (m in e) f[m] = void 0;
                c(f, J[u].prototype);
                l ? (f.hcEvents = l) : delete f.hcEvents;
              }
          } else D(17, !0, d, { missingModuleFor: u });
          n.forEach(function (a) {
            f[a] = n[a];
          });
          f.init(d, a);
          if (w && this.points) {
            var p = f.options;
            !1 === p.visible
              ? ((q.graphic = 1), (q.dataLabel = 1))
              : f._hasPointLabels ||
                ((a = p.marker),
                (e = p.dataLabels),
                !a ||
                  (!1 !== a.enabled &&
                    (g.marker && g.marker.symbol) === a.symbol) ||
                  (q.graphic = 1),
                e && !1 === e.enabled && (q.dataLabel = 1));
            this.points.forEach(function (a) {
              a &&
                a.series &&
                (a.resolveColor(),
                Object.keys(q).length && a.destroyElements(q),
                !1 === p.showInLegend &&
                  a.legendItem &&
                  d.legend.destroyItem(a));
            }, this);
          }
          f.initialType = h;
          d.linkSeries();
          k && f.linkedSeries.length && (f.isDirtyData = !0);
          E(this, "afterUpdate");
          M(b, !0) && d.redraw(w ? void 0 : !1);
        };
        b.prototype.setName = function (a) {
          this.name = this.options.name = this.userOptions.name = a;
          this.chart.isDirtyLegend = !0;
        };
        b.prototype.hasOptionChanged = function (a) {
          var c = this.options[a],
            b = this.chart.options.plotOptions,
            f = this.userOptions[a];
          return f
            ? c !== f
            : c !==
                M(
                  b && b[this.type] && b[this.type][a],
                  b && b.series && b.series[a],
                  c
                );
        };
        b.prototype.onMouseOver = function () {
          var a = this.chart,
            c = a.hoverSeries;
          a.pointer.setHoverChartIndex();
          if (c && c !== this) c.onMouseOut();
          this.options.events.mouseOver && E(this, "mouseOver");
          this.setState("hover");
          a.hoverSeries = this;
        };
        b.prototype.onMouseOut = function () {
          var a = this.options,
            c = this.chart,
            b = c.tooltip,
            f = c.hoverPoint;
          c.hoverSeries = null;
          if (f) f.onMouseOut();
          this && a.events.mouseOut && E(this, "mouseOut");
          !b ||
            this.stickyTracking ||
            (b.shared && !this.noSharedTooltip) ||
            b.hide();
          c.series.forEach(function (a) {
            a.setState("", !0);
          });
        };
        b.prototype.setState = function (a, c) {
          var b = this,
            f = b.options,
            d = b.graph,
            g = f.inactiveOtherPoints,
            h = f.states,
            k = M(
              h[a || "normal"] && h[a || "normal"].animation,
              b.chart.options.chart.animation
            ),
            e = f.lineWidth,
            l = 0,
            q = f.opacity;
          a = a || "";
          if (
            b.state !== a &&
            ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function (c) {
              c &&
                (b.state && c.removeClass("highcharts-series-" + b.state),
                a && c.addClass("highcharts-series-" + a));
            }),
            (b.state = a),
            !b.chart.styledMode)
          ) {
            if (h[a] && !1 === h[a].enabled) return;
            a &&
              ((e = h[a].lineWidth || e + (h[a].lineWidthPlus || 0)),
              (q = M(h[a].opacity, q)));
            if (d && !d.dashstyle)
              for (
                f = { "stroke-width": e }, d.animate(f, k);
                b["zone-graph-" + l];

              )
                b["zone-graph-" + l].animate(f, k), (l += 1);
            g ||
              [
                b.group,
                b.markerGroup,
                b.dataLabelsGroup,
                b.labelBySeries,
              ].forEach(function (a) {
                a && a.animate({ opacity: q }, k);
              });
          }
          c && g && b.points && b.setAllPointsToState(a || void 0);
        };
        b.prototype.setAllPointsToState = function (a) {
          this.points.forEach(function (c) {
            c.setState && c.setState(a);
          });
        };
        b.prototype.setVisible = function (a, c) {
          var b = this,
            f = b.chart,
            d = b.legendItem,
            g = f.options.chart.ignoreHiddenSeries,
            h = b.visible,
            k = (b.visible =
              a =
              b.options.visible =
              b.userOptions.visible =
                "undefined" === typeof a ? !h : a)
              ? "show"
              : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
            function (a) {
              if (b[a]) b[a][k]();
            }
          );
          if (
            f.hoverSeries === b ||
            (f.hoverPoint && f.hoverPoint.series) === b
          )
            b.onMouseOut();
          d && f.legend.colorizeItem(b, a);
          b.isDirty = !0;
          b.options.stacking &&
            f.series.forEach(function (a) {
              a.options.stacking && a.visible && (a.isDirty = !0);
            });
          b.linkedSeries.forEach(function (c) {
            c.setVisible(a, !1);
          });
          g && (f.isDirtyBox = !0);
          E(b, k);
          !1 !== c && f.redraw();
        };
        b.prototype.show = function () {
          this.setVisible(!0);
        };
        b.prototype.hide = function () {
          this.setVisible(!1);
        };
        b.prototype.select = function (a) {
          this.selected =
            a =
            this.options.selected =
              "undefined" === typeof a ? !this.selected : a;
          this.checkbox && (this.checkbox.checked = a);
          E(this, a ? "select" : "unselect");
        };
        b.prototype.shouldShowTooltip = function (a, c, b) {
          void 0 === b && (b = {});
          b.series = this;
          b.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(a, c, b);
        };
        b.defaultOptions = F;
        b.types = z.seriesTypes;
        b.registerType = z.registerSeriesType;
        return b;
      })();
      c(b.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        drawLegendSymbol: v.drawLineMarker,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: t,
        requireSorting: !0,
        sorted: !0,
      });
      z.series = b;
      ("");
      ("");
      return b;
    }
  );
  I(
    e,
    "Extensions/ScrollablePlotArea.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Axis/Axis.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Series/Series.js"],
      e["Core/Renderer/RendererRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t) {
      var F = b.stop,
        z = t.addEvent,
        r = t.createElement,
        p = t.defined,
        h = t.merge,
        a = t.pick;
      z(y, "afterSetChartSize", function (a) {
        var b = this.options.chart.scrollablePlotArea,
          d = b && b.minWidth;
        b = b && b.minHeight;
        if (!this.renderer.forExport) {
          if (d) {
            if (
              (this.scrollablePixelsX = d = Math.max(0, d - this.chartWidth))
            ) {
              this.scrollablePlotBox = this.renderer.scrollablePlotBox = h(
                this.plotBox
              );
              this.plotBox.width = this.plotWidth += d;
              this.inverted
                ? (this.clipBox.height += d)
                : (this.clipBox.width += d);
              var n = { 1: { name: "right", value: d } };
            }
          } else
            b &&
              ((this.scrollablePixelsY = d = Math.max(0, b - this.chartHeight)),
              p(d) &&
                ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                  h(this.plotBox)),
                (this.plotBox.height = this.plotHeight += d),
                this.inverted
                  ? (this.clipBox.width += d)
                  : (this.clipBox.height += d),
                (n = { 2: { name: "bottom", value: d } })));
          n &&
            !a.skipAxes &&
            this.axes.forEach(function (a) {
              n[a.side]
                ? (a.getPlotLinePath = function () {
                    var b = n[a.side].name,
                      d = this[b];
                    this[b] = d - n[a.side].value;
                    var g = e.prototype.getPlotLinePath.apply(this, arguments);
                    this[b] = d;
                    return g;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      z(y, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      y.prototype.setUpScrolling = function () {
        var a = this,
          b = {
            WebkitOverflowScrolling: "touch",
            overflowX: "hidden",
            overflowY: "hidden",
          };
        this.scrollablePixelsX && (b.overflowX = "auto");
        this.scrollablePixelsY && (b.overflowY = "auto");
        this.scrollingParent = r(
          "div",
          { className: "highcharts-scrolling-parent" },
          { position: "relative" },
          this.renderTo
        );
        this.scrollingContainer = r(
          "div",
          { className: "highcharts-scrolling" },
          b,
          this.scrollingParent
        );
        z(this.scrollingContainer, "scroll", function () {
          a.pointer && delete a.pointer.chartPosition;
        });
        this.innerContainer = r(
          "div",
          { className: "highcharts-inner-container" },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      y.prototype.moveFixedElements = function () {
        var a = this.container,
          b = this.fixedRenderer,
          h =
            ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
              " "
            ),
          e;
        this.scrollablePixelsX && !this.inverted
          ? (e = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
          ? (e = ".highcharts-xaxis")
          : this.scrollablePixelsY && !this.inverted
          ? (e = ".highcharts-xaxis")
          : this.scrollablePixelsY &&
            this.inverted &&
            (e = ".highcharts-yaxis");
        e &&
          h.push(
            "" + e + ":not(.highcharts-radial-axis)",
            "" + e + "-labels:not(.highcharts-radial-axis-labels)"
          );
        h.forEach(function (d) {
          [].forEach.call(a.querySelectorAll(d), function (a) {
            (a.namespaceURI === b.SVG_NS
              ? b.box
              : b.box.parentNode
            ).appendChild(a);
            a.style.pointerEvents = "auto";
          });
        });
      };
      y.prototype.applyFixed = function () {
        var b = !this.fixedDiv,
          g = this.options.chart,
          h = g.scrollablePlotArea,
          e = v.getRendererType();
        b
          ? ((this.fixedDiv = r(
              "div",
              { className: "highcharts-fixed" },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((g.style && g.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = g =
              new e(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style
              )),
            (this.scrollableMask = g
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": a(h.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            z(this, "afterShowResetZoom", this.moveFixedElements),
            z(this, "afterApplyDrilldown", this.moveFixedElements),
            z(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || b)
          (this.scrollableDirty = !1), this.moveFixedElements();
        g = this.chartWidth + (this.scrollablePixelsX || 0);
        e = this.chartHeight + (this.scrollablePixelsY || 0);
        F(this.container);
        this.container.style.width = g + "px";
        this.container.style.height = e + "px";
        this.renderer.boxWrapper.attr({
          width: g,
          height: e,
          viewBox: [0, 0, g, e].join(" "),
        });
        this.chartBackground.attr({ width: g, height: e });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        b &&
          (h.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * h.scrollPositionX),
          h.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * h.scrollPositionY));
        e = this.axisOffset;
        b = this.plotTop - e[0] - 1;
        h = this.plotLeft - e[3] - 1;
        g = this.plotTop + this.plotHeight + e[2] + 1;
        e = this.plotLeft + this.plotWidth + e[1] + 1;
        var p = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          J = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        b = this.scrollablePixelsX
          ? [
              ["M", 0, b],
              ["L", this.plotLeft - 1, b],
              ["L", this.plotLeft - 1, g],
              ["L", 0, g],
              ["Z"],
              ["M", p, b],
              ["L", this.chartWidth, b],
              ["L", this.chartWidth, g],
              ["L", p, g],
              ["Z"],
            ]
          : this.scrollablePixelsY
          ? [
              ["M", h, 0],
              ["L", h, this.plotTop - 1],
              ["L", e, this.plotTop - 1],
              ["L", e, 0],
              ["Z"],
              ["M", h, J],
              ["L", h, this.chartHeight],
              ["L", e, this.chartHeight],
              ["L", e, J],
              ["Z"],
            ]
          : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger &&
          this.scrollableMask.attr({ d: b });
      };
      z(e, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      z(B, "show", function () {
        this.chart.scrollableDirty = !0;
      });
      ("");
    }
  );
  I(
    e,
    "Core/Axis/Stacking/StackItem.js",
    [
      e["Core/FormatUtilities.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B = b.format,
        v = e.series,
        t = y.defined,
        F = y.destroyObjectProperties,
        z = y.isNumber,
        r = y.pick;
      b = (function () {
        function b(b, a, d, g, e) {
          var h = b.chart.inverted;
          this.axis = b;
          this.isNegative = d;
          this.options = a = a || {};
          this.x = g;
          this.cumulative = this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = e;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: a.align || (h ? (d ? "left" : "right") : "center"),
            verticalAlign:
              a.verticalAlign || (h ? "middle" : d ? "bottom" : "top"),
            y: a.y,
            x: a.x,
          };
          this.textAlign =
            a.textAlign || (h ? (d ? "right" : "left") : "center");
        }
        b.prototype.destroy = function () {
          F(this, this.axis);
        };
        b.prototype.render = function (b) {
          var a = this.axis.chart,
            d = this.options,
            g = d.format;
          g = g ? B(g, this, a) : d.formatter.call(this);
          this.label
            ? this.label.attr({ text: g, visibility: "hidden" })
            : ((this.label = a.renderer.label(
                g,
                null,
                null,
                d.shape,
                null,
                null,
                d.useHTML,
                !1,
                "stack-labels"
              )),
              (g = {
                r: d.borderRadius || 0,
                text: g,
                rotation: d.rotation,
                padding: r(d.padding, 5),
                visibility: "hidden",
              }),
              a.styledMode ||
                ((g.fill = d.backgroundColor),
                (g.stroke = d.borderColor),
                (g["stroke-width"] = d.borderWidth),
                this.label.css(d.style)),
              this.label.attr(g),
              this.label.added || this.label.add(b));
          this.label.labelrank = a.plotSizeY;
        };
        b.prototype.setOffset = function (b, a, d, g, e) {
          var h = this.axis,
            m = h.chart;
          g = h.translate(
            h.stacking.usePercentage ? 100 : g ? g : this.total,
            0,
            0,
            0,
            1
          );
          d = h.translate(d ? d : 0);
          b = r(e, m.xAxis[0].translate(this.x)) + b;
          h = t(g) && this.getStackBox(m, this, b, g, a, Math.abs(g - d), h);
          a = this.label;
          d = this.isNegative;
          var p = this.textAlign;
          a &&
            h &&
            ((b = a.getBBox()),
            (e = a.padding),
            (g = "justify" === r(this.options.overflow, "justify")),
            (p =
              "left" === p
                ? m.inverted
                  ? -e
                  : e
                : "right" === p
                ? b.width
                : m.inverted && "center" === p
                ? b.width / 2
                : m.inverted
                ? d
                  ? b.width + e
                  : -e
                : b.width / 2),
            (d = m.inverted ? b.height / 2 : d ? -e : b.height),
            (this.alignOptions.x = r(this.options.x, 0)),
            (this.alignOptions.y = r(this.options.y, 0)),
            (h.x -= p),
            (h.y -= d),
            a.align(this.alignOptions, null, h),
            m.isInsidePlot(
              a.alignAttr.x + p - this.alignOptions.x,
              a.alignAttr.y + d - this.alignOptions.y
            )
              ? a.show()
              : (a.hide(), (g = !1)),
            g &&
              v.prototype.justifyDataLabel.call(
                this.axis,
                a,
                this.alignOptions,
                a.alignAttr,
                b,
                h
              ),
            a.attr({ x: a.alignAttr.x, y: a.alignAttr.y }),
            r(!g && this.options.crop, !0) &&
              ((m =
                z(a.x) &&
                z(a.y) &&
                m.isInsidePlot(a.x - e + a.width, a.y) &&
                m.isInsidePlot(a.x + e, a.y)) ||
                a.hide()));
        };
        b.prototype.getStackBox = function (b, a, d, g, e, n, p) {
          var h = a.axis.reversed,
            m = b.inverted,
            C = p.height + p.pos - (m ? b.plotLeft : b.plotTop);
          a = (a.isNegative && !h) || (!a.isNegative && h);
          return {
            x: m
              ? a
                ? g - p.right
                : g - n + p.pos - b.plotLeft
              : d + b.xAxis[0].transB - b.plotLeft,
            y: m ? p.height - d - e : a ? C - g - n : C - g,
            width: m ? n : e,
            height: m ? e : n,
          };
        };
        return b;
      })();
      ("");
      return b;
    }
  );
  I(
    e,
    "Core/Axis/Stacking/StackingAxis.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Axis/Axis.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Axis/Stacking/StackItem.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v) {
      function t() {
        var a = this,
          c = a.inverted;
        a.yAxis.forEach(function (a) {
          a.stacking &&
            a.stacking.stacks &&
            a.hasVisibleSeries &&
            (a.stacking.oldStacks = a.stacking.stacks);
        });
        a.series.forEach(function (b) {
          var d = (b.xAxis && b.xAxis.options) || {};
          !b.options.stacking ||
            (!0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries) ||
            (b.stackKey = [
              b.type,
              f(b.options.stack, ""),
              c ? d.top : d.left,
              c ? d.height : d.width,
            ].join());
        });
      }
      function F() {
        var a = this.stacking;
        if (a) {
          var c = a.stacks;
          A(c, function (a, b) {
            x(a);
            c[b] = null;
          });
          a && a.stackTotalGroup && a.stackTotalGroup.destroy();
        }
      }
      function z() {
        this.stacking || (this.stacking = new w(this));
      }
      function r(a, c, b, f) {
        !J(a) || a.x !== c || (f && a.stackKey !== f)
          ? (a = { x: c, index: 0, key: f, stackKey: f })
          : a.index++;
        a.key = [b, c, a.index].join();
        return a;
      }
      function p() {
        var a = this,
          c = a.stackKey,
          b = a.yAxis.stacking.stacks,
          f = a.processedXData,
          d = a[a.options.stacking + "Stacker"],
          g;
        d &&
          [c, "-" + c].forEach(function (c) {
            for (var h = f.length, k, e; h--; )
              (k = f[h]),
                (g = a.getStackIndicator(g, k, a.index, c)),
                (e = (k = b[c] && b[c][k]) && k.points[g.key]) &&
                  d.call(a, e, k, h);
          });
      }
      function h(a, c, b) {
        c = c.total ? 100 / c.total : 0;
        a[0] = G(a[0] * c);
        a[1] = G(a[1] * c);
        this.stackedYData[b] = a[1];
      }
      function a() {
        var a = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? m.setStackedPoints.call(this, "group")
          : a &&
            A(a.stacks, function (c, b) {
              "group" === b.slice(-5) &&
                (A(c, function (a) {
                  return a.destroy();
                }),
                delete a.stacks[b]);
            });
      }
      function d(a) {
        var c = a || this.options.stacking;
        if (
          c &&
          (!0 === this.visible ||
            !1 === this.chart.options.chart.ignoreHiddenSeries)
        ) {
          var b = this.processedXData,
            d = this.processedYData,
            g = [],
            h = d.length,
            k = this.options,
            e = k.threshold,
            l = f(k.startFromThreshold && e, 0);
          k = k.stack;
          a = a ? "" + this.type + ",".concat(c) : this.stackKey;
          var m = "-" + a,
            n = this.negStacks,
            w = this.yAxis,
            p = w.stacking.stacks,
            x = w.stacking.oldStacks,
            C,
            A;
          w.stacking.stacksTouched += 1;
          for (A = 0; A < h; A++) {
            var r = b[A];
            var D = d[A];
            var t = this.getStackIndicator(t, r, this.index);
            var v = t.key;
            var z = (C = n && D < (l ? 0 : e)) ? m : a;
            p[z] || (p[z] = {});
            p[z][r] ||
              (x[z] && x[z][r]
                ? ((p[z][r] = x[z][r]), (p[z][r].total = null))
                : (p[z][r] = new B(w, w.options.stackLabels, !!C, r, k)));
            z = p[z][r];
            null !== D
              ? ((z.points[v] = z.points[this.index] = [f(z.cumulative, l)]),
                J(z.cumulative) || (z.base = v),
                (z.touched = w.stacking.stacksTouched),
                0 < t.index &&
                  !1 === this.singleStacks &&
                  (z.points[v][0] = z.points[this.index + "," + r + ",0"][0]))
              : (z.points[v] = z.points[this.index] = null);
            "percent" === c
              ? ((C = C ? a : m),
                n && p[C] && p[C][r]
                  ? ((C = p[C][r]),
                    (z.total = C.total =
                      Math.max(C.total, z.total) + Math.abs(D) || 0))
                  : (z.total = G(z.total + (Math.abs(D) || 0))))
              : "group" === c
              ? (u(D) && (D = D[0]),
                null !== D && (z.total = (z.total || 0) + 1))
              : (z.total = G(z.total + (D || 0)));
            z.cumulative =
              "group" === c
                ? (z.total || 1) - 1
                : f(z.cumulative, l) + (D || 0);
            null !== D &&
              (z.points[v].push(z.cumulative),
              (g[A] = z.cumulative),
              (z.hasValidPoints = !0));
          }
          "percent" === c && (w.stacking.usePercentage = !0);
          "group" !== c && (this.stackedYData = g);
          w.stacking.oldStacks = {};
        }
      }
      var g = b.getDeferredAnimation,
        m = y.series.prototype,
        n = v.addEvent,
        G = v.correctFloat,
        J = v.defined,
        x = v.destroyObjectProperties,
        C = v.fireEvent,
        u = v.isArray,
        l = v.isNumber,
        A = v.objectEach,
        f = v.pick,
        w = (function () {
          function a(a) {
            this.oldStacks = {};
            this.stacks = {};
            this.stacksTouched = 0;
            this.axis = a;
          }
          a.prototype.buildStacks = function () {
            var a = this.axis,
              b = a.series,
              f = a.options.reversedStacks,
              d = b.length,
              g;
            if (!a.isXAxis) {
              this.usePercentage = !1;
              for (g = d; g--; ) {
                var h = b[f ? g : d - g - 1];
                h.setStackedPoints();
                h.setGroupedPoints();
              }
              for (g = 0; g < d; g++) b[g].modifyStacks();
              C(a, "afterBuildStacks");
            }
          };
          a.prototype.cleanStacks = function () {
            if (!this.axis.isXAxis) {
              if (this.oldStacks) var a = (this.stacks = this.oldStacks);
              A(a, function (a) {
                A(a, function (a) {
                  a.cumulative = a.total;
                });
              });
            }
          };
          a.prototype.resetStacks = function () {
            var a = this,
              b = a.stacks;
            a.axis.isXAxis ||
              A(b, function (c) {
                A(c, function (b, f) {
                  l(b.touched) && b.touched < a.stacksTouched
                    ? (b.destroy(), delete c[f])
                    : ((b.total = null), (b.cumulative = null));
                });
              });
          };
          a.prototype.renderStackTotals = function () {
            var a = this.axis,
              b = a.chart,
              f = b.renderer,
              d = this.stacks;
            a = g(
              b,
              (a.options.stackLabels && a.options.stackLabels.animation) || !1
            );
            var h = (this.stackTotalGroup =
              this.stackTotalGroup ||
              f.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add());
            h.translate(b.plotLeft, b.plotTop);
            A(d, function (a) {
              A(a, function (a) {
                a.render(h);
              });
            });
            h.animate({ opacity: 1 }, a);
          };
          return a;
        })(),
        k;
      (function (b) {
        var c = [];
        b.compose = function (b, f, g) {
          -1 === c.indexOf(b) &&
            (c.push(b), n(b, "init", z), n(b, "destroy", F));
          -1 === c.indexOf(f) && (c.push(f), (f.prototype.getStacks = t));
          -1 === c.indexOf(g) &&
            (c.push(g),
            (b = g.prototype),
            (b.getStackIndicator = r),
            (b.modifyStacks = p),
            (b.percentStacker = h),
            (b.setGroupedPoints = a),
            (b.setStackedPoints = d));
        };
      })(k || (k = {}));
      return k;
    }
  );
  I(
    e,
    "Series/Line/LineSeries.js",
    [
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B =
          (this && this.__extends) ||
          (function () {
            var b = function (e, r) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, h) {
                    b.__proto__ = h;
                  }) ||
                function (b, h) {
                  for (var a in h) h.hasOwnProperty(a) && (b[a] = h[a]);
                };
              return b(e, r);
            };
            return function (e, r) {
              function p() {
                this.constructor = e;
              }
              b(e, r);
              e.prototype =
                null === r
                  ? Object.create(r)
                  : ((p.prototype = r.prototype), new p());
            };
          })(),
        v = y.defined,
        t = y.merge;
      y = (function (e) {
        function z() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        B(z, e);
        z.prototype.drawGraph = function () {
          var b = this,
            e = this.options,
            h = (this.gappedPath || this.getGraphPath).call(this),
            a = this.chart.styledMode,
            d = [["graph", "highcharts-graph"]];
          a || d[0].push(e.lineColor || this.color || "#cccccc", e.dashStyle);
          d = b.getZonesGraphs(d);
          d.forEach(function (d, m) {
            var g = d[0],
              p = b[g],
              r = p ? "animate" : "attr";
            p
              ? ((p.endX = b.preventGraphAnimation ? null : h.xMap),
                p.animate({ d: h }))
              : h.length &&
                (b[g] = p =
                  b.chart.renderer
                    .path(h)
                    .addClass(d[1])
                    .attr({ zIndex: 1 })
                    .add(b.group));
            p &&
              !a &&
              ((g = {
                stroke: d[2],
                "stroke-width": e.lineWidth,
                fill: (b.fillGraph && b.color) || "none",
              }),
              d[3]
                ? (g.dashstyle = d[3])
                : "square" !== e.linecap &&
                  (g["stroke-linecap"] = g["stroke-linejoin"] = "round"),
              p[r](g).shadow(2 > m && e.shadow));
            p && ((p.startX = h.xMap), (p.isArea = h.isArea));
          });
        };
        z.prototype.getGraphPath = function (b, e, h) {
          var a = this,
            d = a.options,
            g = [],
            m = [],
            n,
            p = d.step;
          b = b || a.points;
          var r = b.reversed;
          r && b.reverse();
          (p = { right: 1, center: 2 }[p] || (p && 3)) && r && (p = 4 - p);
          b = this.getValidPoints(b, !1, !(d.connectNulls && !e && !h));
          b.forEach(function (x, C) {
            var u = x.plotX,
              l = x.plotY,
              A = b[C - 1];
            (x.leftCliff || (A && A.rightCliff)) && !h && (n = !0);
            x.isNull && !v(e) && 0 < C
              ? (n = !d.connectNulls)
              : x.isNull && !e
              ? (n = !0)
              : (0 === C || n
                  ? (C = [["M", x.plotX, x.plotY]])
                  : a.getPointSpline
                  ? (C = [a.getPointSpline(b, x, C)])
                  : p
                  ? ((C =
                      1 === p
                        ? [["L", A.plotX, l]]
                        : 2 === p
                        ? [
                            ["L", (A.plotX + u) / 2, A.plotY],
                            ["L", (A.plotX + u) / 2, l],
                          ]
                        : [["L", u, A.plotY]]),
                    C.push(["L", u, l]))
                  : (C = [["L", u, l]]),
                m.push(x.x),
                p && (m.push(x.x), 2 === p && m.push(x.x)),
                g.push.apply(g, C),
                (n = !1));
          });
          g.xMap = m;
          return (a.graphPath = g);
        };
        z.prototype.getZonesGraphs = function (b) {
          this.zones.forEach(function (e, h) {
            h = [
              "zone-graph-" + h,
              "highcharts-graph highcharts-zone-graph-" +
                h +
                " " +
                (e.className || ""),
            ];
            this.chart.styledMode ||
              h.push(
                e.color || this.color,
                e.dashStyle || this.options.dashStyle
              );
            b.push(h);
          }, this);
          return b;
        };
        z.defaultOptions = t(b.defaultOptions, {});
        return z;
      })(b);
      e.registerSeriesType("line", y);
      ("");
      return y;
    }
  );
  I(
    e,
    "Series/Area/AreaSeries.js",
    [
      e["Core/Color/Color.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (a, d) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(a, d);
            };
            return function (a, d) {
              function g() {
                this.constructor = a;
              }
              b(a, d);
              a.prototype =
                null === d
                  ? Object.create(d)
                  : ((g.prototype = d.prototype), new g());
            };
          })(),
        t = b.parse,
        F = y.seriesTypes.line;
      b = B.extend;
      var z = B.merge,
        r = B.objectEach,
        p = B.pick;
      B = (function (b) {
        function a() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        v(a, b);
        a.prototype.drawGraph = function () {
          this.areaPath = [];
          b.prototype.drawGraph.apply(this);
          var a = this,
            g = this.areaPath,
            h = this.options,
            e = [["area", "highcharts-area", this.color, h.fillColor]];
          this.zones.forEach(function (b, d) {
            e.push([
              "zone-area-" + d,
              "highcharts-area highcharts-zone-area-" + d + " " + b.className,
              b.color || a.color,
              b.fillColor || h.fillColor,
            ]);
          });
          e.forEach(function (b) {
            var d = b[0],
              e = {},
              m = a[d],
              n = m ? "animate" : "attr";
            m
              ? ((m.endX = a.preventGraphAnimation ? null : g.xMap),
                m.animate({ d: g }))
              : ((e.zIndex = 0),
                (m = a[d] =
                  a.chart.renderer.path(g).addClass(b[1]).add(a.group)),
                (m.isArea = !0));
            a.chart.styledMode ||
              (e.fill = p(
                b[3],
                t(b[2]).setOpacity(p(h.fillOpacity, 0.75)).get()
              ));
            m[n](e);
            m.startX = g.xMap;
            m.shiftUnit = h.step ? 2 : 1;
          });
        };
        a.prototype.getGraphPath = function (a) {
          var b = F.prototype.getGraphPath,
            d = this.options,
            h = d.stacking,
            e = this.yAxis,
            r = [],
            x = [],
            C = this.index,
            u = e.stacking.stacks[this.stackKey],
            l = d.threshold,
            A = Math.round(e.getThreshold(d.threshold));
          d = p(d.connectNulls, "percent" === h);
          var f = function (b, f, d) {
            var g = a[b];
            b = h && u[g.x].points[C];
            var k = g[d + "Null"] || 0;
            d = g[d + "Cliff"] || 0;
            g = !0;
            if (d || k) {
              var q = (k ? b[0] : b[1]) + d;
              var m = b[0] + d;
              g = !!k;
            } else !h && a[f] && a[f].isNull && (q = m = l);
            "undefined" !== typeof q &&
              (x.push({
                plotX: c,
                plotY: null === q ? A : e.getThreshold(q),
                isNull: g,
                isCliff: !0,
              }),
              r.push({
                plotX: c,
                plotY: null === m ? A : e.getThreshold(m),
                doCurve: !1,
              }));
          };
          a = a || this.points;
          h && (a = this.getStackPoints(a));
          for (var w = 0, k = a.length; w < k; ++w) {
            h ||
              (a[w].leftCliff =
                a[w].rightCliff =
                a[w].leftNull =
                a[w].rightNull =
                  void 0);
            var D = a[w].isNull;
            var c = p(a[w].rectPlotX, a[w].plotX);
            var q = h ? p(a[w].yBottom, A) : A;
            if (!D || d)
              d || f(w, w - 1, "left"),
                (D && !h && d) ||
                  (x.push(a[w]), r.push({ x: w, plotX: c, plotY: q })),
                d || f(w, w + 1, "right");
          }
          f = b.call(this, x, !0, !0);
          r.reversed = !0;
          D = b.call(this, r, !0, !0);
          (q = D[0]) && "M" === q[0] && (D[0] = ["L", q[1], q[2]]);
          D = f.concat(D);
          D.length && D.push(["Z"]);
          b = b.call(this, x, !1, d);
          D.xMap = f.xMap;
          this.areaPath = D;
          return b;
        };
        a.prototype.getStackPoints = function (a) {
          var b = this,
            d = [],
            h = [],
            e = this.xAxis,
            t = this.yAxis,
            x = t.stacking.stacks[this.stackKey],
            C = {},
            u = t.series,
            l = u.length,
            A = t.options.reversedStacks ? 1 : -1,
            f = u.indexOf(b);
          a = a || this.points;
          if (this.options.stacking) {
            for (var w = 0; w < a.length; w++)
              (a[w].leftNull = a[w].rightNull = void 0), (C[a[w].x] = a[w]);
            r(x, function (a, c) {
              null !== a.total && h.push(c);
            });
            h.sort(function (a, c) {
              return a - c;
            });
            var k = u.map(function (a) {
              return a.visible;
            });
            h.forEach(function (a, c) {
              var g = 0,
                m,
                n;
              if (C[a] && !C[a].isNull)
                d.push(C[a]),
                  [-1, 1].forEach(function (d) {
                    var g = 1 === d ? "rightNull" : "leftNull",
                      e = x[h[c + d]],
                      q = 0;
                    if (e)
                      for (var w = f; 0 <= w && w < l; ) {
                        var p = u[w].index;
                        m = e.points[p];
                        m ||
                          (p === b.index
                            ? (C[a][g] = !0)
                            : k[w] &&
                              (n = x[a].points[p]) &&
                              (q -= n[1] - n[0]));
                        w += A;
                      }
                    C[a][1 === d ? "rightCliff" : "leftCliff"] = q;
                  });
              else {
                for (var w = f; 0 <= w && w < l; ) {
                  if ((m = x[a].points[u[w].index])) {
                    g = m[1];
                    break;
                  }
                  w += A;
                }
                g = p(g, 0);
                g = t.translate(g, 0, 1, 0, 1);
                d.push({
                  isNull: !0,
                  plotX: e.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: g,
                  yBottom: g,
                });
              }
            });
          }
          return d;
        };
        a.defaultOptions = z(F.defaultOptions, { threshold: 0 });
        return a;
      })(F);
      b(B.prototype, { singleStacks: !1, drawLegendSymbol: e.drawRectangle });
      y.registerSeriesType("area", B);
      ("");
      return B;
    }
  );
  I(
    e,
    "Series/Spline/SplineSeries.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var y =
          (this && this.__extends) ||
          (function () {
            var b = function (e, r) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, h) {
                    b.__proto__ = h;
                  }) ||
                function (b, h) {
                  for (var a in h) h.hasOwnProperty(a) && (b[a] = h[a]);
                };
              return b(e, r);
            };
            return function (e, r) {
              function p() {
                this.constructor = e;
              }
              b(e, r);
              e.prototype =
                null === r
                  ? Object.create(r)
                  : ((p.prototype = r.prototype), new p());
            };
          })(),
        B = b.seriesTypes.line,
        v = e.merge,
        t = e.pick;
      e = (function (b) {
        function e() {
          var e = (null !== b && b.apply(this, arguments)) || this;
          e.data = void 0;
          e.options = void 0;
          e.points = void 0;
          return e;
        }
        y(e, b);
        e.prototype.getPointSpline = function (b, e, h) {
          var a = e.plotX || 0,
            d = e.plotY || 0,
            g = b[h - 1];
          h = b[h + 1];
          if (
            g &&
            !g.isNull &&
            !1 !== g.doCurve &&
            !e.isCliff &&
            h &&
            !h.isNull &&
            !1 !== h.doCurve &&
            !e.isCliff
          ) {
            b = g.plotY || 0;
            var m = h.plotX || 0;
            h = h.plotY || 0;
            var n = 0;
            var p = (1.5 * a + (g.plotX || 0)) / 2.5;
            var r = (1.5 * d + b) / 2.5;
            m = (1.5 * a + m) / 2.5;
            var x = (1.5 * d + h) / 2.5;
            m !== p && (n = ((x - r) * (m - a)) / (m - p) + d - x);
            r += n;
            x += n;
            r > b && r > d
              ? ((r = Math.max(b, d)), (x = 2 * d - r))
              : r < b && r < d && ((r = Math.min(b, d)), (x = 2 * d - r));
            x > h && x > d
              ? ((x = Math.max(h, d)), (r = 2 * d - x))
              : x < h && x < d && ((x = Math.min(h, d)), (r = 2 * d - x));
            e.rightContX = m;
            e.rightContY = x;
          }
          e = [
            "C",
            t(g.rightContX, g.plotX, 0),
            t(g.rightContY, g.plotY, 0),
            t(p, a, 0),
            t(r, d, 0),
            a,
            d,
          ];
          g.rightContX = g.rightContY = void 0;
          return e;
        };
        e.defaultOptions = v(B.defaultOptions);
        return e;
      })(B);
      b.registerSeriesType("spline", e);
      ("");
      return e;
    }
  );
  I(
    e,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      e["Series/Spline/SplineSeries.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (h, a) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(h, a);
            };
            return function (h, a) {
              function d() {
                this.constructor = h;
              }
              b(h, a);
              h.prototype =
                null === a
                  ? Object.create(a)
                  : ((d.prototype = a.prototype), new d());
            };
          })(),
        t = y.seriesTypes,
        F = t.area;
      t = t.area.prototype;
      var z = B.extend,
        r = B.merge;
      B = (function (e) {
        function h() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          a.data = void 0;
          a.points = void 0;
          a.options = void 0;
          return a;
        }
        v(h, e);
        h.defaultOptions = r(b.defaultOptions, F.defaultOptions);
        return h;
      })(b);
      z(B.prototype, {
        getGraphPath: t.getGraphPath,
        getStackPoints: t.getStackPoints,
        drawGraph: t.drawGraph,
        drawLegendSymbol: e.drawRectangle,
      });
      y.registerSeriesType("areaspline", B);
      ("");
      return B;
    }
  );
  I(
    e,
    "Series/Column/ColumnSeries.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F) {
      var z =
          (this && this.__extends) ||
          (function () {
            var a = function (b, f) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var f in b) b.hasOwnProperty(f) && (a[f] = b[f]);
                };
              return a(b, f);
            };
            return function (b, f) {
              function d() {
                this.constructor = b;
              }
              a(b, f);
              b.prototype =
                null === f
                  ? Object.create(f)
                  : ((d.prototype = f.prototype), new d());
            };
          })(),
        r = b.animObject,
        p = e.parse,
        h = y.hasTouch;
      b = y.noop;
      var a = F.clamp,
        d = F.css,
        g = F.defined,
        m = F.extend,
        n = F.fireEvent,
        G = F.isArray,
        J = F.isNumber,
        x = F.merge,
        C = F.pick,
        u = F.objectEach;
      F = (function (b) {
        function e() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.borderWidth = void 0;
          a.data = void 0;
          a.group = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        z(e, b);
        e.prototype.animate = function (b) {
          var f = this,
            d = this.yAxis,
            g = f.options,
            c = this.chart.inverted,
            h = {},
            e = c ? "translateX" : "translateY";
          if (b)
            (h.scaleY = 0.001),
              (b = a(d.toPixels(g.threshold), d.pos, d.pos + d.len)),
              c ? (h.translateX = b - d.len) : (h.translateY = b),
              f.clipBox && f.setClip(),
              f.group.attr(h);
          else {
            var l = Number(f.group.attr(e));
            f.group.animate(
              { scaleY: 1 },
              m(r(f.options.animation), {
                step: function (a, c) {
                  f.group &&
                    ((h[e] = l + c.pos * (d.pos - l)), f.group.attr(h));
                },
              })
            );
          }
        };
        e.prototype.init = function (a, d) {
          b.prototype.init.apply(this, arguments);
          var f = this;
          a = f.chart;
          a.hasRendered &&
            a.series.forEach(function (a) {
              a.type === f.type && (a.isDirty = !0);
            });
        };
        e.prototype.getColumnMetrics = function () {
          var a = this,
            b = a.options,
            d = a.xAxis,
            g = a.yAxis,
            c = d.options.reversedStacks;
          c = (d.reversed && !c) || (!d.reversed && c);
          var h = {},
            e,
            l = 0;
          !1 === b.grouping
            ? (l = 1)
            : a.chart.series.forEach(function (c) {
                var b = c.yAxis,
                  f = c.options;
                if (
                  c.type === a.type &&
                  (c.visible || !a.chart.options.chart.ignoreHiddenSeries) &&
                  g.len === b.len &&
                  g.pos === b.pos
                ) {
                  if (f.stacking && "group" !== f.stacking) {
                    e = c.stackKey;
                    "undefined" === typeof h[e] && (h[e] = l++);
                    var d = h[e];
                  } else !1 !== f.grouping && (d = l++);
                  c.columnIndex = d;
                }
              });
          var m = Math.min(
              Math.abs(d.transA) *
                ((d.ordinal && d.ordinal.slope) ||
                  b.pointRange ||
                  d.closestPointRange ||
                  d.tickInterval ||
                  1),
              d.len
            ),
            n = m * b.groupPadding,
            u = (m - 2 * n) / (l || 1);
          b = Math.min(
            b.maxPointWidth || d.len,
            C(b.pointWidth, u * (1 - 2 * b.pointPadding))
          );
          a.columnMetrics = {
            width: b,
            offset:
              (u - b) / 2 +
              (n + ((a.columnIndex || 0) + (c ? 1 : 0)) * u - m / 2) *
                (c ? -1 : 1),
            paddedWidth: u,
            columnCount: l,
          };
          return a.columnMetrics;
        };
        e.prototype.crispCol = function (a, b, d, g) {
          var c = this.chart,
            f = this.borderWidth,
            h = -(f % 2 ? 0.5 : 0);
          f = f % 2 ? 0.5 : 1;
          c.inverted && c.renderer.isVML && (f += 1);
          this.options.crisp &&
            ((d = Math.round(a + d) + h), (a = Math.round(a) + h), (d -= a));
          g = Math.round(b + g) + f;
          h = 0.5 >= Math.abs(b) && 0.5 < g;
          b = Math.round(b) + f;
          g -= b;
          h && g && (--b, (g += 1));
          return { x: a, y: b, width: d, height: g };
        };
        e.prototype.adjustForMissingColumns = function (a, b, d, g) {
          var c = this,
            f = this.options.stacking;
          if (!d.isNull && 1 < g.columnCount) {
            var h = this.yAxis.options.reversedStacks,
              e = 0,
              k = h ? 0 : -g.columnCount;
            u(this.yAxis.stacking && this.yAxis.stacking.stacks, function (a) {
              if ("number" === typeof d.x && (a = a[d.x.toString()])) {
                var b = a.points[c.index],
                  g = a.total;
                f
                  ? (b && (e = k), a.hasValidPoints && (h ? k++ : k--))
                  : G(b) && ((e = b[1]), (k = g || 0));
              }
            });
            a =
              (d.plotX || 0) +
              ((k - 1) * g.paddedWidth + b) / 2 -
              b -
              e * g.paddedWidth;
          }
          return a;
        };
        e.prototype.translate = function () {
          var b = this,
            d = b.chart,
            h = b.options,
            e = (b.dense = 2 > b.closestPointRange * b.xAxis.transA);
          e = b.borderWidth = C(h.borderWidth, e ? 0 : 1);
          var c = b.xAxis,
            l = b.yAxis,
            m = h.threshold,
            n = (b.translatedThreshold = l.getThreshold(m)),
            u = C(h.minPointLength, 5),
            p = b.getColumnMetrics(),
            x = p.width,
            A = (b.pointXOffset = p.offset),
            r = b.dataMin,
            G = b.dataMax,
            t = (b.barW = Math.max(x, 1 + 2 * e));
          d.inverted && (n -= 0.5);
          h.pointPadding && (t = Math.ceil(t));
          v.prototype.translate.apply(b);
          b.points.forEach(function (f) {
            var e = C(f.yBottom, n),
              k = 999 + Math.abs(e),
              q = f.plotX || 0;
            k = a(f.plotY, -k, l.len + k);
            var w = Math.min(k, e),
              E = Math.max(k, e) - w,
              D = x,
              H = q + A,
              v = t;
            u &&
              Math.abs(E) < u &&
              ((E = u),
              (q = (!l.reversed && !f.negative) || (l.reversed && f.negative)),
              J(m) &&
                J(G) &&
                f.y === m &&
                G <= m &&
                (l.min || 0) < m &&
                (r !== G || (l.max || 0) <= m) &&
                (q = !q),
              (w = Math.abs(w - n) > u ? e - u : n - (q ? u : 0)));
            g(f.options.pointWidth) &&
              ((D = v = Math.ceil(f.options.pointWidth)),
              (H -= Math.round((D - x) / 2)));
            h.centerInCategory && (H = b.adjustForMissingColumns(H, D, f, p));
            f.barX = H;
            f.pointWidth = D;
            f.tooltipPos = d.inverted
              ? [
                  a(
                    l.len + l.pos - d.plotLeft - k,
                    l.pos - d.plotLeft,
                    l.len + l.pos - d.plotLeft
                  ),
                  c.len + c.pos - d.plotTop - H - v / 2,
                  E,
                ]
              : [
                  c.left - d.plotLeft + H + v / 2,
                  a(
                    k + l.pos - d.plotTop,
                    l.pos - d.plotTop,
                    l.len + l.pos - d.plotTop
                  ),
                  E,
                ];
            f.shapeType = b.pointClass.prototype.shapeType || "rect";
            f.shapeArgs = b.crispCol.apply(
              b,
              f.isNull ? [H, n, v, 0] : [H, w, v, E]
            );
          });
        };
        e.prototype.drawGraph = function () {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data"
          );
        };
        e.prototype.pointAttribs = function (a, b) {
          var f = this.options,
            d = this.pointAttrToOptions || {},
            c = d.stroke || "borderColor",
            g = d["stroke-width"] || "borderWidth",
            h = (a && a.color) || this.color,
            e = (a && a[c]) || f[c] || h;
          d = (a && a.options.dashStyle) || f.dashStyle;
          var l = (a && a[g]) || f[g] || this[g] || 0,
            m = C(a && a.opacity, f.opacity, 1);
          if (a && this.zones.length) {
            var n = a.getZone();
            h =
              a.options.color ||
              (n && (n.color || a.nonZonedColor)) ||
              this.color;
            n &&
              ((e = n.borderColor || e),
              (d = n.dashStyle || d),
              (l = n.borderWidth || l));
          }
          b &&
            a &&
            ((a = x(
              f.states[b],
              (a.options.states && a.options.states[b]) || {}
            )),
            (b = a.brightness),
            (h =
              a.color ||
              ("undefined" !== typeof b && p(h).brighten(a.brightness).get()) ||
              h),
            (e = a[c] || e),
            (l = a[g] || l),
            (d = a.dashStyle || d),
            (m = C(a.opacity, m)));
          c = { fill: h, stroke: e, "stroke-width": l, opacity: m };
          d && (c.dashstyle = d);
          return c;
        };
        e.prototype.drawPoints = function () {
          var a = this,
            b = this.chart,
            d = a.options,
            g = b.renderer,
            c = d.animationLimit || 250,
            h;
          a.points.forEach(function (f) {
            var e = f.graphic,
              k = !!e,
              l = e && b.pointCount < c ? "animate" : "attr";
            if (J(f.plotY) && null !== f.y) {
              h = f.shapeArgs;
              e && f.hasNewShapeType() && (e = e.destroy());
              a.enabledDataSorting &&
                (f.startXPos = a.xAxis.reversed
                  ? -(h ? h.width || 0 : 0)
                  : a.xAxis.width);
              e ||
                ((f.graphic = e = g[f.shapeType](h).add(f.group || a.group)) &&
                  a.enabledDataSorting &&
                  b.hasRendered &&
                  b.pointCount < c &&
                  (e.attr({ x: f.startXPos }), (k = !0), (l = "animate")));
              if (e && k) e[l](x(h));
              if (d.borderRadius) e[l]({ r: d.borderRadius });
              b.styledMode ||
                e[l](a.pointAttribs(f, f.selected && "select")).shadow(
                  !1 !== f.allowShadow && d.shadow,
                  null,
                  d.stacking && !d.borderRadius
                );
              e &&
                (e.addClass(f.getClassName(), !0),
                e.attr({ visibility: f.visible ? "inherit" : "hidden" }));
            } else e && (f.graphic = e.destroy());
          });
        };
        e.prototype.drawTracker = function () {
          var a = this,
            b = a.chart,
            g = b.pointer,
            e = function (a) {
              var c = g.getPointFromEvent(a);
              "undefined" !== typeof c &&
                ((g.isDirectTouch = !0), c.onMouseOver(a));
            },
            c;
          a.points.forEach(function (a) {
            c = G(a.dataLabels)
              ? a.dataLabels
              : a.dataLabel
              ? [a.dataLabel]
              : [];
            a.graphic && (a.graphic.element.point = a);
            c.forEach(function (c) {
              c.div ? (c.div.point = a) : (c.element.point = a);
            });
          });
          a._hasTracking ||
            (a.trackerGroups.forEach(function (c) {
              if (a[c]) {
                a[c]
                  .addClass("highcharts-tracker")
                  .on("mouseover", e)
                  .on("mouseout", function (a) {
                    g.onTrackerMouseOut(a);
                  });
                if (h) a[c].on("touchstart", e);
                !b.styledMode &&
                  a.options.cursor &&
                  a[c].css(d).css({ cursor: a.options.cursor });
              }
            }),
            (a._hasTracking = !0));
          n(this, "afterDrawTracker");
        };
        e.prototype.remove = function () {
          var a = this,
            b = a.chart;
          b.hasRendered &&
            b.series.forEach(function (b) {
              b.type === a.type && (b.isDirty = !0);
            });
          v.prototype.remove.apply(a, arguments);
        };
        e.defaultOptions = x(v.defaultOptions, {
          borderRadius: 0,
          centerInCategory: !1,
          groupPadding: 0.2,
          marker: null,
          pointPadding: 0.1,
          minPointLength: 0,
          cropThreshold: 50,
          pointRange: null,
          states: {
            hover: { halo: !1, brightness: 0.1 },
            select: { color: "#cccccc", borderColor: "#000000" },
          },
          dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
          startFromThreshold: !0,
          stickyTracking: !1,
          tooltip: { distance: 6 },
          threshold: 0,
          borderColor: "#ffffff",
        });
        return e;
      })(v);
      m(F.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        drawLegendSymbol: B.drawRectangle,
        getSymbol: b,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      t.registerSeriesType("column", F);
      ("");
      ("");
      return F;
    }
  );
  I(
    e,
    "Core/Series/DataLabel.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B = b.getDeferredAnimation,
        v = e.format,
        t = y.defined,
        F = y.extend,
        z = y.fireEvent,
        r = y.isArray,
        p = y.isString,
        h = y.merge,
        a = y.objectEach,
        d = y.pick,
        g = y.splat,
        m;
      (function (b) {
        function e(a, b, g, h, c) {
          var f = this,
            e = this.chart,
            k = this.isCartesian && e.inverted,
            l = this.enabledDataSorting,
            m = d(a.dlBox && a.dlBox.centerX, a.plotX),
            n = a.plotY,
            u = g.rotation,
            p = g.align,
            w =
              t(m) &&
              t(n) &&
              e.isInsidePlot(m, Math.round(n), {
                inverted: k,
                paneCoordinates: !0,
                series: f,
              }),
            x = function (d) {
              l && f.xAxis && !C && f.setDataLabelStartPos(a, b, c, w, d);
            },
            C = "justify" === d(g.overflow, l ? "none" : "justify"),
            A =
              this.visible &&
              !1 !== a.visible &&
              (a.series.forceDL ||
                (l && !C) ||
                w ||
                (d(g.inside, !!this.options.stacking) &&
                  h &&
                  e.isInsidePlot(m, k ? h.x + 1 : h.y + h.height - 1, {
                    inverted: k,
                    paneCoordinates: !0,
                    series: f,
                  })));
          if (A && t(m) && t(n)) {
            u && b.attr({ align: p });
            p = b.getBBox(!0);
            var r = [0, 0];
            var D = e.renderer.fontMetrics(
              e.styledMode ? void 0 : g.style.fontSize,
              b
            ).b;
            h = F(
              {
                x: k ? this.yAxis.len - n : m,
                y: Math.round(k ? this.xAxis.len - m : n),
                width: 0,
                height: 0,
              },
              h
            );
            F(g, { width: p.width, height: p.height });
            u
              ? ((C = !1),
                (r = e.renderer.rotCorr(D, u)),
                (m = {
                  x: h.x + (g.x || 0) + h.width / 2 + r.x,
                  y:
                    h.y +
                    (g.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[g.verticalAlign] *
                      h.height,
                }),
                (r = [p.x - Number(b.attr("x")), p.y - Number(b.attr("y"))]),
                x(m),
                b[c ? "attr" : "animate"](m))
              : (x(h), b.align(g, void 0, h), (m = b.alignAttr));
            C && 0 <= h.height
              ? this.justifyDataLabel(b, g, m, p, h, c)
              : d(g.crop, !0) &&
                ((h = m.x),
                (x = m.y),
                (h += r[0]),
                (x += r[1]),
                (A =
                  e.isInsidePlot(h, x, { paneCoordinates: !0, series: f }) &&
                  e.isInsidePlot(h + p.width, x + p.height, {
                    paneCoordinates: !0,
                    series: f,
                  })));
            if (g.shape && !u)
              b[c ? "attr" : "animate"]({
                anchorX: k ? e.plotWidth - a.plotY : a.plotX,
                anchorY: k ? e.plotHeight - a.plotX : a.plotY,
              });
          }
          c && l && (b.placed = !1);
          A || (l && !C) ? b.show() : (b.hide(), (b.placed = !1));
        }
        function m(a, b) {
          var f = b.filter;
          return f
            ? ((b = f.operator),
              (a = a[f.property]),
              (f = f.value),
              (">" === b && a > f) ||
              ("<" === b && a < f) ||
              (">=" === b && a >= f) ||
              ("<=" === b && a <= f) ||
              ("==" === b && a == f) ||
              ("===" === b && a === f)
                ? !0
                : !1)
            : !0;
        }
        function n() {
          var b = this,
            h = b.chart,
            e = b.options,
            l = b.points,
            c = b.hasRendered || 0,
            q = h.renderer,
            n = h.options.chart,
            x = n.backgroundColor;
          n = n.plotBackgroundColor;
          var C = q.getContrast((p(n) && n) || (p(x) && x) || "#000000"),
            A = e.dataLabels,
            G;
          x = A.animation;
          x = A.defer ? B(h, x, b) : { defer: 0, duration: 0 };
          A = u(
            u(
              h.options.plotOptions &&
                h.options.plotOptions.series &&
                h.options.plotOptions.series.dataLabels,
              h.options.plotOptions &&
                h.options.plotOptions[b.type] &&
                h.options.plotOptions[b.type].dataLabels
            ),
            A
          );
          z(this, "drawDataLabels");
          if (r(A) || A.enabled || b._hasPointLabels) {
            var J = b.plotGroup(
              "dataLabelsGroup",
              "data-labels",
              c ? "inherit" : "hidden",
              A.zIndex || 6
            );
            J.attr({ opacity: +c });
            !c &&
              (c = b.dataLabelsGroup) &&
              (b.visible && J.show(),
              c[e.animation ? "animate" : "attr"]({ opacity: 1 }, x));
            l.forEach(function (c) {
              G = g(u(A, c.dlOptions || (c.options && c.options.dataLabels)));
              G.forEach(function (f, g) {
                var k =
                    f.enabled && (!c.isNull || c.dataLabelOnNull) && m(c, f),
                  l = c.connectors ? c.connectors[g] : c.connector,
                  n = c.dataLabels ? c.dataLabels[g] : c.dataLabel,
                  u = !n,
                  p = d(f.distance, c.labelDistance);
                if (k) {
                  var w = c.getLabelConfig();
                  var x = d(f[c.formatPrefix + "Format"], f.format);
                  w = t(x)
                    ? v(x, w, h)
                    : (f[c.formatPrefix + "Formatter"] || f.formatter).call(
                        w,
                        f
                      );
                  x = f.style;
                  var A = f.rotation;
                  h.styledMode ||
                    ((x.color = d(f.color, x.color, b.color, "#000000")),
                    "contrast" === x.color
                      ? ((c.contrastColor = q.getContrast(c.color || b.color)),
                        (x.color =
                          (!t(p) && f.inside) || 0 > p || e.stacking
                            ? c.contrastColor
                            : C))
                      : delete c.contrastColor,
                    e.cursor && (x.cursor = e.cursor));
                  var r = {
                    r: f.borderRadius || 0,
                    rotation: A,
                    padding: f.padding,
                    zIndex: 1,
                  };
                  h.styledMode ||
                    ((r.fill = f.backgroundColor),
                    (r.stroke = f.borderColor),
                    (r["stroke-width"] = f.borderWidth));
                  a(r, function (a, c) {
                    "undefined" === typeof a && delete r[c];
                  });
                }
                !n ||
                  (k &&
                    t(w) &&
                    !!n.div === !!f.useHTML &&
                    ((n.rotation && f.rotation) ||
                      n.rotation === f.rotation)) ||
                  ((u = !0),
                  (c.dataLabel = n = c.dataLabel && c.dataLabel.destroy()),
                  c.dataLabels &&
                    (1 === c.dataLabels.length
                      ? delete c.dataLabels
                      : delete c.dataLabels[g]),
                  g || delete c.dataLabel,
                  l &&
                    ((c.connector = c.connector.destroy()),
                    c.connectors &&
                      (1 === c.connectors.length
                        ? delete c.connectors
                        : delete c.connectors[g])));
                k && t(w)
                  ? (n
                      ? (r.text = w)
                      : ((c.dataLabels = c.dataLabels || []),
                        (n = c.dataLabels[g] =
                          A
                            ? q
                                .text(w, 0, 0, f.useHTML)
                                .addClass("highcharts-data-label")
                            : q.label(
                                w,
                                0,
                                0,
                                f.shape,
                                null,
                                null,
                                f.useHTML,
                                null,
                                "data-label"
                              )),
                        g || (c.dataLabel = n),
                        n.addClass(
                          " highcharts-data-label-color-" +
                            c.colorIndex +
                            " " +
                            (f.className || "") +
                            (f.useHTML ? " highcharts-tracker" : "")
                        )),
                    (n.options = f),
                    n.attr(r),
                    h.styledMode || n.css(x).shadow(f.shadow),
                    f.textPath &&
                      !f.useHTML &&
                      (n.setTextPath(
                        (c.getDataLabelPath && c.getDataLabelPath(n)) ||
                          c.graphic,
                        f.textPath
                      ),
                      c.dataLabelPath &&
                        !f.textPath.enabled &&
                        (c.dataLabelPath = c.dataLabelPath.destroy())),
                    n.added || n.add(J),
                    b.alignDataLabel(c, n, f, null, u))
                  : n && n.hide();
              });
            });
          }
          z(this, "afterDrawDataLabels");
        }
        function C(a, b, d, g, c, h) {
          var f = this.chart,
            e = b.align,
            k = b.verticalAlign,
            l = a.box ? 0 : a.padding || 0,
            m = b.x;
          m = void 0 === m ? 0 : m;
          var q = b.y;
          q = void 0 === q ? 0 : q;
          var n = (d.x || 0) + l;
          if (0 > n) {
            "right" === e && 0 <= m
              ? ((b.align = "left"), (b.inside = !0))
              : (m -= n);
            var u = !0;
          }
          n = (d.x || 0) + g.width - l;
          n > f.plotWidth &&
            ("left" === e && 0 >= m
              ? ((b.align = "right"), (b.inside = !0))
              : (m += f.plotWidth - n),
            (u = !0));
          n = d.y + l;
          0 > n &&
            ("bottom" === k && 0 <= q
              ? ((b.verticalAlign = "top"), (b.inside = !0))
              : (q -= n),
            (u = !0));
          n = (d.y || 0) + g.height - l;
          n > f.plotHeight &&
            ("top" === k && 0 >= q
              ? ((b.verticalAlign = "bottom"), (b.inside = !0))
              : (q += f.plotHeight - n),
            (u = !0));
          u && ((b.x = m), (b.y = q), (a.placed = !h), a.align(b, void 0, c));
          return u;
        }
        function u(a, b) {
          var f = [],
            d;
          if (r(a) && !r(b))
            f = a.map(function (a) {
              return h(a, b);
            });
          else if (r(b) && !r(a))
            f = b.map(function (c) {
              return h(a, c);
            });
          else if (r(a) || r(b))
            for (d = Math.max(a.length, b.length); d--; ) f[d] = h(a[d], b[d]);
          else f = h(a, b);
          return f;
        }
        function l(a, b, d, g, c) {
          var f = this.chart,
            h = f.inverted,
            e = this.xAxis,
            k = e.reversed,
            l = h ? b.height / 2 : b.width / 2;
          a = (a = a.pointWidth) ? a / 2 : 0;
          b.startXPos = h ? c.x : k ? -l - a : e.width - l + a;
          b.startYPos = h ? (k ? this.yAxis.height - l + a : -l - a) : c.y;
          g
            ? "hidden" === b.visibility &&
              (b.show(), b.attr({ opacity: 0 }).animate({ opacity: 1 }))
            : b.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, b.hide);
          f.hasRendered &&
            (d && b.attr({ x: b.startXPos, y: b.startYPos }), (b.placed = !0));
        }
        var A = [];
        b.compose = function (a) {
          if (-1 === A.indexOf(a)) {
            var b = a.prototype;
            A.push(a);
            b.alignDataLabel = e;
            b.drawDataLabels = n;
            b.justifyDataLabel = C;
            b.setDataLabelStartPos = l;
          }
        };
      })(m || (m = {}));
      ("");
      return m;
    }
  );
  I(
    e,
    "Series/Column/ColumnDataLabel.js",
    [
      e["Core/Series/DataLabel.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B = e.series,
        v = y.merge,
        t = y.pick,
        F;
      (function (e) {
        function r(b, a, d, g, e) {
          var h = this.chart.inverted,
            m = b.series,
            p = (m.xAxis ? m.xAxis.len : this.chart.plotSizeX) || 0;
          m = (m.yAxis ? m.yAxis.len : this.chart.plotSizeY) || 0;
          var x = b.dlBox || b.shapeArgs,
            C = t(b.below, b.plotY > t(this.translatedThreshold, m)),
            u = t(d.inside, !!this.options.stacking);
          x &&
            ((g = v(x)),
            0 > g.y && ((g.height += g.y), (g.y = 0)),
            (x = g.y + g.height - m),
            0 < x && x < g.height && (g.height -= x),
            h &&
              (g = {
                x: m - g.y - g.height,
                y: p - g.x - g.width,
                width: g.height,
                height: g.width,
              }),
            u ||
              (h
                ? ((g.x += C ? 0 : g.width), (g.width = 0))
                : ((g.y += C ? g.height : 0), (g.height = 0))));
          d.align = t(d.align, !h || u ? "center" : C ? "right" : "left");
          d.verticalAlign = t(
            d.verticalAlign,
            h || u ? "middle" : C ? "top" : "bottom"
          );
          B.prototype.alignDataLabel.call(this, b, a, d, g, e);
          d.inside && b.contrastColor && a.css({ color: b.contrastColor });
        }
        var p = [];
        e.compose = function (h) {
          b.compose(B);
          -1 === p.indexOf(h) && (p.push(h), (h.prototype.alignDataLabel = r));
        };
      })(F || (F = {}));
      return F;
    }
  );
  I(
    e,
    "Series/Bar/BarSeries.js",
    [
      e["Series/Column/ColumnSeries.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B =
          (this && this.__extends) ||
          (function () {
            var b = function (e, r) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, h) {
                    b.__proto__ = h;
                  }) ||
                function (b, h) {
                  for (var a in h) h.hasOwnProperty(a) && (b[a] = h[a]);
                };
              return b(e, r);
            };
            return function (e, r) {
              function p() {
                this.constructor = e;
              }
              b(e, r);
              e.prototype =
                null === r
                  ? Object.create(r)
                  : ((p.prototype = r.prototype), new p());
            };
          })(),
        v = y.extend,
        t = y.merge;
      y = (function (e) {
        function v() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        B(v, e);
        v.defaultOptions = t(b.defaultOptions, {});
        return v;
      })(b);
      v(y.prototype, { inverted: !0 });
      e.registerSeriesType("bar", y);
      ("");
      return y;
    }
  );
  I(
    e,
    "Series/Scatter/ScatterSeries.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var y =
          (this && this.__extends) ||
          (function () {
            var b = function (e, h) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(e, h);
            };
            return function (e, h) {
              function a() {
                this.constructor = e;
              }
              b(e, h);
              e.prototype =
                null === h
                  ? Object.create(h)
                  : ((a.prototype = h.prototype), new a());
            };
          })(),
        B = b.seriesTypes,
        v = B.column,
        t = B.line;
      B = e.addEvent;
      var F = e.extend,
        z = e.merge;
      e = (function (b) {
        function e() {
          var h = (null !== b && b.apply(this, arguments)) || this;
          h.data = void 0;
          h.options = void 0;
          h.points = void 0;
          return h;
        }
        y(e, b);
        e.prototype.applyJitter = function () {
          var b = this,
            a = this.options.jitter,
            d = this.points.length;
          a &&
            this.points.forEach(function (g, h) {
              ["x", "y"].forEach(function (e, m) {
                var n = "plot" + e.toUpperCase();
                if (a[e] && !g.isNull) {
                  var p = b[e + "Axis"];
                  var C = a[e] * p.transA;
                  if (p && !p.isLog) {
                    var u = Math.max(0, g[n] - C);
                    p = Math.min(p.len, g[n] + C);
                    m = 1e4 * Math.sin(h + m * d);
                    g[n] = u + (p - u) * (m - Math.floor(m));
                    "x" === e && (g.clientX = g.plotX);
                  }
                }
              });
            });
        };
        e.prototype.drawGraph = function () {
          this.options.lineWidth
            ? b.prototype.drawGraph.call(this)
            : this.graph && (this.graph = this.graph.destroy());
        };
        e.defaultOptions = z(t.defaultOptions, {
          lineWidth: 0,
          findNearestPointBy: "xy",
          jitter: { x: 0, y: 0 },
          marker: { enabled: !0 },
          tooltip: {
            headerFormat:
              '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
          },
        });
        return e;
      })(t);
      F(e.prototype, {
        drawTracker: v.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      B(e, "afterTranslate", function () {
        this.applyJitter();
      });
      b.registerSeriesType("scatter", e);
      ("");
      return e;
    }
  );
  I(
    e,
    "Series/CenteredUtilities.js",
    [e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Utilities.js"]],
    function (b, e, y) {
      var B = b.deg2rad,
        v = y.fireEvent,
        t = y.isNumber,
        F = y.pick,
        z = y.relativeLength,
        r;
      (function (b) {
        b.getCenter = function () {
          var b = this.options,
            a = this.chart,
            d = 2 * (b.slicedOffset || 0),
            g = a.plotWidth - 2 * d,
            m = a.plotHeight - 2 * d,
            n = b.center,
            p = Math.min(g, m),
            r = b.thickness,
            x = b.size,
            C = b.innerSize || 0;
          "string" === typeof x && (x = parseFloat(x));
          "string" === typeof C && (C = parseFloat(C));
          b = [
            F(n[0], "50%"),
            F(n[1], "50%"),
            F(x && 0 > x ? void 0 : b.size, "100%"),
            F(C && 0 > C ? void 0 : b.innerSize || 0, "0%"),
          ];
          !a.angular || this instanceof e || (b[3] = 0);
          for (n = 0; 4 > n; ++n)
            (x = b[n]),
              (a = 2 > n || (2 === n && /%$/.test(x))),
              (b[n] = z(x, [g, m, p, b[2]][n]) + (a ? d : 0));
          b[3] > b[2] && (b[3] = b[2]);
          t(r) && 2 * r < b[2] && 0 < r && (b[3] = b[2] - 2 * r);
          v(this, "afterGetCenter", { positions: b });
          return b;
        };
        b.getStartAndEndRadians = function (b, a) {
          b = t(b) ? b : 0;
          a = t(a) && a > b && 360 > a - b ? a : b + 360;
          return { start: B * (b + -90), end: B * (a + -90) };
        };
      })(r || (r = {}));
      ("");
      return r;
    }
  );
  I(
    e,
    "Series/Pie/PiePoint.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Series/Point.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B =
          (this && this.__extends) ||
          (function () {
            var b = function (a, d) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(a, d);
            };
            return function (a, d) {
              function g() {
                this.constructor = a;
              }
              b(a, d);
              a.prototype =
                null === d
                  ? Object.create(d)
                  : ((g.prototype = d.prototype), new g());
            };
          })(),
        v = b.setAnimation,
        t = y.addEvent,
        F = y.defined;
      b = y.extend;
      var z = y.isNumber,
        r = y.pick,
        p = y.relativeLength;
      e = (function (b) {
        function a() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.labelDistance = void 0;
          a.options = void 0;
          a.series = void 0;
          return a;
        }
        B(a, b);
        a.prototype.getConnectorPath = function () {
          var a = this.labelPosition,
            b = this.series.options.dataLabels,
            e = this.connectorShapes,
            h = b.connectorShape;
          e[h] && (h = e[h]);
          return h.call(
            this,
            { x: a.final.x, y: a.final.y, alignment: a.alignment },
            a.connectorPosition,
            b
          );
        };
        a.prototype.getTranslate = function () {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        };
        a.prototype.haloPath = function (a) {
          var b = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                b.x,
                b.y,
                b.r + a,
                b.r + a,
                { innerR: b.r - 1, start: b.start, end: b.end }
              );
        };
        a.prototype.init = function () {
          var a = this;
          b.prototype.init.apply(this, arguments);
          this.name = r(this.name, "Slice");
          var g = function (b) {
            a.slice("select" === b.type);
          };
          t(this, "select", g);
          t(this, "unselect", g);
          return this;
        };
        a.prototype.isValid = function () {
          return z(this.y) && 0 <= this.y;
        };
        a.prototype.setVisible = function (a, b) {
          var d = this,
            g = this.series,
            e = g.chart,
            h = g.options.ignoreHiddenPoint;
          b = r(b, h);
          a !== this.visible &&
            ((this.visible =
              this.options.visible =
              a =
                "undefined" === typeof a ? !this.visible : a),
            (g.options.data[g.data.indexOf(this)] = this.options),
            ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(
              function (b) {
                if (d[b]) d[b][a ? "show" : "hide"](a);
              }
            ),
            this.legendItem && e.legend.colorizeItem(this, a),
            a || "hover" !== this.state || this.setState(""),
            h && (g.isDirty = !0),
            b && e.redraw());
        };
        a.prototype.slice = function (a, b, e) {
          var d = this.series;
          v(e, d.chart);
          r(b, !0);
          this.sliced = this.options.sliced = F(a) ? a : !this.sliced;
          d.options.data[d.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        };
        return a;
      })(e);
      b(e.prototype, {
        connectorShapes: {
          fixedOffset: function (b, a, d) {
            var g = a.breakAt;
            a = a.touchingSliceAt;
            return [
              ["M", b.x, b.y],
              d.softConnector
                ? [
                    "C",
                    b.x + ("left" === b.alignment ? -5 : 5),
                    b.y,
                    2 * g.x - a.x,
                    2 * g.y - a.y,
                    g.x,
                    g.y,
                  ]
                : ["L", g.x, g.y],
              ["L", a.x, a.y],
            ];
          },
          straight: function (b, a) {
            a = a.touchingSliceAt;
            return [
              ["M", b.x, b.y],
              ["L", a.x, a.y],
            ];
          },
          crookedLine: function (b, a, d) {
            a = a.touchingSliceAt;
            var g = this.series,
              e = g.center[0],
              h = g.chart.plotWidth,
              r = g.chart.plotLeft;
            g = b.alignment;
            var t = this.shapeArgs.r;
            d = p(d.crookDistance, 1);
            h =
              "left" === g
                ? e + t + (h + r - e - t) * (1 - d)
                : r + (e - t) * d;
            d = ["L", h, b.y];
            e = !0;
            if ("left" === g ? h > b.x || h < a.x : h < b.x || h > a.x) e = !1;
            b = [["M", b.x, b.y]];
            e && b.push(d);
            b.push(["L", a.x, a.y]);
            return b;
          },
        },
      });
      return e;
    }
  );
  I(
    e,
    "Series/Pie/PieSeries.js",
    [
      e["Series/CenteredUtilities.js"],
      e["Series/Column/ColumnSeries.js"],
      e["Core/Globals.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Series/Pie/PiePoint.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Renderer/SVG/Symbols.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F, z, r) {
      var p =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function g() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((g.prototype = d.prototype), new g());
            };
          })(),
        h = b.getStartAndEndRadians;
      y = y.noop;
      var a = r.clamp,
        d = r.extend,
        g = r.fireEvent,
        m = r.merge,
        n = r.pick,
        G = r.relativeLength;
      r = (function (b) {
        function d() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.center = void 0;
          a.data = void 0;
          a.maxLabelDistance = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        p(d, b);
        d.prototype.animate = function (a) {
          var b = this,
            d = b.points,
            g = b.startAngleRad;
          a ||
            d.forEach(function (a) {
              var f = a.graphic,
                d = a.shapeArgs;
              f &&
                d &&
                (f.attr({
                  r: n(a.startR, b.center && b.center[3] / 2),
                  start: g,
                  end: g,
                }),
                f.animate(
                  { r: d.r, start: d.start, end: d.end },
                  b.options.animation
                ));
            });
        };
        d.prototype.drawEmpty = function () {
          var a = this.startAngleRad,
            b = this.endAngleRad,
            d = this.options;
          if (0 === this.total && this.center) {
            var g = this.center[0];
            var f = this.center[1];
            this.graph ||
              (this.graph = this.chart.renderer
                .arc(g, f, this.center[1] / 2, 0, a, b)
                .addClass("highcharts-empty-series")
                .add(this.group));
            this.graph.attr({
              d: z.arc(g, f, this.center[2] / 2, 0, {
                start: a,
                end: b,
                innerR: this.center[3] / 2,
              }),
            });
            this.chart.styledMode ||
              this.graph.attr({
                "stroke-width": d.borderWidth,
                fill: d.fillColor || "none",
                stroke: d.color || "#cccccc",
              });
          } else this.graph && (this.graph = this.graph.destroy());
        };
        d.prototype.drawPoints = function () {
          var a = this.chart.renderer;
          this.points.forEach(function (b) {
            b.graphic &&
              b.hasNewShapeType() &&
              (b.graphic = b.graphic.destroy());
            b.graphic ||
              ((b.graphic = a[b.shapeType](b.shapeArgs).add(b.series.group)),
              (b.delayedRendering = !0));
          });
        };
        d.prototype.generatePoints = function () {
          b.prototype.generatePoints.call(this);
          this.updateTotals();
        };
        d.prototype.getX = function (b, d, g) {
          var e = this.center,
            f = this.radii ? this.radii[g.index] || 0 : e[2] / 2;
          b = Math.asin(a((b - e[1]) / (f + g.labelDistance), -1, 1));
          return (
            e[0] +
            (d ? -1 : 1) * Math.cos(b) * (f + g.labelDistance) +
            (0 < g.labelDistance
              ? (d ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        };
        d.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        d.prototype.redrawPoints = function () {
          var a = this,
            b = a.chart,
            d = b.renderer,
            g = a.options.shadow,
            f,
            e,
            h,
            n;
          this.drawEmpty();
          !g ||
            a.shadowGroup ||
            b.styledMode ||
            (a.shadowGroup = d.g("shadow").attr({ zIndex: -1 }).add(a.group));
          a.points.forEach(function (c) {
            var k = {};
            e = c.graphic;
            if (!c.isNull && e) {
              var l = void 0;
              n = c.shapeArgs;
              f = c.getTranslate();
              b.styledMode ||
                ((l = c.shadowGroup),
                g &&
                  !l &&
                  (l = c.shadowGroup = d.g("shadow").add(a.shadowGroup)),
                l && l.attr(f),
                (h = a.pointAttribs(c, c.selected && "select")));
              c.delayedRendering
                ? (e.setRadialReference(a.center).attr(n).attr(f),
                  b.styledMode ||
                    e.attr(h).attr({ "stroke-linejoin": "round" }).shadow(g, l),
                  (c.delayedRendering = !1))
                : (e.setRadialReference(a.center),
                  b.styledMode || m(!0, k, h),
                  m(!0, k, n, f),
                  e.animate(k));
              e.attr({ visibility: c.visible ? "inherit" : "hidden" });
              e.addClass(c.getClassName(), !0);
            } else e && (c.graphic = e.destroy());
          });
        };
        d.prototype.sortByAngle = function (a, b) {
          a.sort(function (a, d) {
            return "undefined" !== typeof a.angle && (d.angle - a.angle) * b;
          });
        };
        d.prototype.translate = function (a) {
          g(this, "translate");
          this.generatePoints();
          var b = this.options,
            d = b.slicedOffset,
            e = d + (b.borderWidth || 0),
            f = h(b.startAngle, b.endAngle),
            m = (this.startAngleRad = f.start);
          f = (this.endAngleRad = f.end) - m;
          var k = this.points,
            p = b.dataLabels.distance;
          b = b.ignoreHiddenPoint;
          var c = k.length,
            q,
            x = 0;
          a || (this.center = a = this.getCenter());
          for (q = 0; q < c; q++) {
            var r = k[q];
            var C = m + x * f;
            !r.isValid() || (b && !r.visible) || (x += r.percentage / 100);
            var t = m + x * f;
            var v = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * C) / 1e3,
              end: Math.round(1e3 * t) / 1e3,
            };
            r.shapeType = "arc";
            r.shapeArgs = v;
            r.labelDistance = n(
              r.options.dataLabels && r.options.dataLabels.distance,
              p
            );
            r.labelDistance = G(r.labelDistance, v.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              r.labelDistance
            );
            t = (t + C) / 2;
            t > 1.5 * Math.PI
              ? (t -= 2 * Math.PI)
              : t < -Math.PI / 2 && (t += 2 * Math.PI);
            r.slicedTranslation = {
              translateX: Math.round(Math.cos(t) * d),
              translateY: Math.round(Math.sin(t) * d),
            };
            v = (Math.cos(t) * a[2]) / 2;
            var z = (Math.sin(t) * a[2]) / 2;
            r.tooltipPos = [a[0] + 0.7 * v, a[1] + 0.7 * z];
            r.half = t < -Math.PI / 2 || t > Math.PI / 2 ? 1 : 0;
            r.angle = t;
            C = Math.min(e, r.labelDistance / 5);
            r.labelPosition = {
              natural: {
                x: a[0] + v + Math.cos(t) * r.labelDistance,
                y: a[1] + z + Math.sin(t) * r.labelDistance,
              },
              final: {},
              alignment:
                0 > r.labelDistance ? "center" : r.half ? "right" : "left",
              connectorPosition: {
                breakAt: {
                  x: a[0] + v + Math.cos(t) * C,
                  y: a[1] + z + Math.sin(t) * C,
                },
                touchingSliceAt: { x: a[0] + v, y: a[1] + z },
              },
            };
          }
          g(this, "afterTranslate");
        };
        d.prototype.updateTotals = function () {
          var a = this.points,
            b = a.length,
            d = this.options.ignoreHiddenPoint,
            g,
            f = 0;
          for (g = 0; g < b; g++) {
            var e = a[g];
            !e.isValid() || (d && !e.visible) || (f += e.y);
          }
          this.total = f;
          for (g = 0; g < b; g++)
            (e = a[g]),
              (e.percentage = 0 < f && (e.visible || !d) ? (e.y / f) * 100 : 0),
              (e.total = f);
        };
        d.defaultOptions = m(t.defaultOptions, {
          center: [null, null],
          clip: !1,
          colorByPoint: !0,
          dataLabels: {
            allowOverlap: !0,
            connectorPadding: 5,
            connectorShape: "fixedOffset",
            crookDistance: "70%",
            distance: 30,
            enabled: !0,
            formatter: function () {
              return this.point.isNull ? void 0 : this.point.name;
            },
            softConnector: !0,
            x: 0,
          },
          fillColor: void 0,
          ignoreHiddenPoint: !0,
          inactiveOtherPoints: !0,
          legendType: "point",
          marker: null,
          size: null,
          showInLegend: !1,
          slicedOffset: 10,
          stickyTracking: !1,
          tooltip: { followPointer: !0 },
          borderColor: "#ffffff",
          borderWidth: 1,
          lineWidth: void 0,
          states: { hover: { brightness: 0.1 } },
        });
        return d;
      })(t);
      d(r.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawLegendSymbol: B.drawRectangle,
        drawTracker: e.prototype.drawTracker,
        getCenter: b.getCenter,
        getSymbol: y,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: e.prototype.pointAttribs,
        pointClass: v,
        requireSorting: !1,
        searchPoint: y,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      F.registerSeriesType("pie", r);
      ("");
      return r;
    }
  );
  I(
    e,
    "Series/Pie/PieDataLabel.js",
    [
      e["Core/Series/DataLabel.js"],
      e["Core/Globals.js"],
      e["Core/Renderer/RendererUtilities.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v) {
      var t = e.noop,
        F = y.distribute,
        z = B.series,
        r = v.arrayMax,
        p = v.clamp,
        h = v.defined,
        a = v.merge,
        d = v.pick,
        g = v.relativeLength,
        m;
      (function (e) {
        function m() {
          var b = this,
            g = b.data,
            f = b.chart,
            e = b.options.dataLabels || {},
            k = e.connectorPadding,
            m = f.plotWidth,
            c = f.plotHeight,
            q = f.plotLeft,
            n = Math.round(f.chartWidth / 3),
            u = b.center,
            p = u[2] / 2,
            x = u[1],
            C = [[], []],
            t = [0, 0, 0, 0],
            v = b.dataLabelPositioners,
            G,
            y,
            B,
            J,
            K,
            I,
            X,
            O,
            U,
            T,
            Y,
            N;
          b.visible &&
            (e.enabled || b._hasPointLabels) &&
            (g.forEach(function (a) {
              a.dataLabel &&
                a.visible &&
                a.dataLabel.shortened &&
                (a.dataLabel
                  .attr({ width: "auto" })
                  .css({ width: "auto", textOverflow: "clip" }),
                (a.dataLabel.shortened = !1));
            }),
            z.prototype.drawDataLabels.apply(b),
            g.forEach(function (a) {
              a.dataLabel &&
                (a.visible
                  ? (C[a.half].push(a),
                    (a.dataLabel._pos = null),
                    !h(e.style.width) &&
                      !h(
                        a.options.dataLabels &&
                          a.options.dataLabels.style &&
                          a.options.dataLabels.style.width
                      ) &&
                      a.dataLabel.getBBox().width > n &&
                      (a.dataLabel.css({ width: Math.round(0.7 * n) + "px" }),
                      (a.dataLabel.shortened = !0)))
                  : ((a.dataLabel = a.dataLabel.destroy()),
                    a.dataLabels &&
                      1 === a.dataLabels.length &&
                      delete a.dataLabels));
            }),
            C.forEach(function (a, g) {
              var l = a.length,
                n = [],
                r;
              if (l) {
                b.sortByAngle(a, g - 0.5);
                if (0 < b.maxLabelDistance) {
                  var w = Math.max(0, x - p - b.maxLabelDistance);
                  var A = Math.min(x + p + b.maxLabelDistance, f.plotHeight);
                  a.forEach(function (a) {
                    0 < a.labelDistance &&
                      a.dataLabel &&
                      ((a.top = Math.max(0, x - p - a.labelDistance)),
                      (a.bottom = Math.min(
                        x + p + a.labelDistance,
                        f.plotHeight
                      )),
                      (r = a.dataLabel.getBBox().height || 21),
                      (a.distributeBox = {
                        target: a.labelPosition.natural.y - a.top + r / 2,
                        size: r,
                        rank: a.y,
                      }),
                      n.push(a.distributeBox));
                  });
                  w = A + r - w;
                  F(n, w, w / 5);
                }
                for (Y = 0; Y < l; Y++) {
                  G = a[Y];
                  I = G.labelPosition;
                  J = G.dataLabel;
                  T = !1 === G.visible ? "hidden" : "inherit";
                  U = w = I.natural.y;
                  n &&
                    h(G.distributeBox) &&
                    ("undefined" === typeof G.distributeBox.pos
                      ? (T = "hidden")
                      : ((X = G.distributeBox.size),
                        (U = v.radialDistributionY(G))));
                  delete G.positionIndex;
                  if (e.justify) O = v.justify(G, p, u);
                  else
                    switch (e.alignTo) {
                      case "connectors":
                        O = v.alignToConnectors(a, g, m, q);
                        break;
                      case "plotEdges":
                        O = v.alignToPlotEdges(J, g, m, q);
                        break;
                      default:
                        O = v.radialDistributionX(b, G, U, w);
                    }
                  J._attr = { visibility: T, align: I.alignment };
                  N = G.options.dataLabels || {};
                  J._pos = {
                    x:
                      O +
                      d(N.x, e.x) +
                      ({ left: k, right: -k }[I.alignment] || 0),
                    y: U + d(N.y, e.y) - 10,
                  };
                  I.final.x = O;
                  I.final.y = U;
                  d(e.crop, !0) &&
                    ((K = J.getBBox().width),
                    (w = null),
                    O - K < k && 1 === g
                      ? ((w = Math.round(K - O + k)),
                        (t[3] = Math.max(w, t[3])))
                      : O + K > m - k &&
                        0 === g &&
                        ((w = Math.round(O + K - m + k)),
                        (t[1] = Math.max(w, t[1]))),
                    0 > U - X / 2
                      ? (t[0] = Math.max(Math.round(-U + X / 2), t[0]))
                      : U + X / 2 > c &&
                        (t[2] = Math.max(Math.round(U + X / 2 - c), t[2])),
                    (J.sideOverflow = w));
                }
              }
            }),
            0 === r(t) || this.verifyDataLabelOverflow(t)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (c) {
              N = a(e, c.options.dataLabels);
              if ((y = d(N.connectorWidth, 1))) {
                var g;
                B = c.connector;
                if (
                  (J = c.dataLabel) &&
                  J._pos &&
                  c.visible &&
                  0 < c.labelDistance
                ) {
                  T = J._attr.visibility;
                  if ((g = !B))
                    (c.connector = B =
                      f.renderer
                        .path()
                        .addClass(
                          "highcharts-data-label-connector  highcharts-color-" +
                            c.colorIndex +
                            (c.className ? " " + c.className : "")
                        )
                        .add(b.dataLabelsGroup)),
                      f.styledMode ||
                        B.attr({
                          "stroke-width": y,
                          stroke: N.connectorColor || c.color || "#666666",
                        });
                  B[g ? "attr" : "animate"]({ d: c.getConnectorPath() });
                  B.attr("visibility", T);
                } else B && (c.connector = B.destroy());
              }
            }));
        }
        function n() {
          this.points.forEach(function (a) {
            var b = a.dataLabel,
              d;
            b &&
              a.visible &&
              ((d = b._pos)
                ? (b.sideOverflow &&
                    ((b._attr.width = Math.max(
                      b.getBBox().width - b.sideOverflow,
                      0
                    )),
                    b.css({
                      width: b._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        "ellipsis",
                    }),
                    (b.shortened = !0)),
                  b.attr(b._attr),
                  b[b.moved ? "animate" : "attr"](d),
                  (b.moved = !0))
                : b && b.attr({ y: -9999 }));
            delete a.distributeBox;
          }, this);
        }
        function x(a) {
          var b = this.center,
            d = this.options,
            e = d.center,
            h = d.minSize || 80,
            l = null !== d.size;
          if (!l) {
            if (null !== e[0]) var c = Math.max(b[2] - Math.max(a[1], a[3]), h);
            else
              (c = Math.max(b[2] - a[1] - a[3], h)),
                (b[0] += (a[3] - a[1]) / 2);
            null !== e[1]
              ? (c = p(c, h, b[2] - Math.max(a[0], a[2])))
              : ((c = p(c, h, b[2] - a[0] - a[2])),
                (b[1] += (a[0] - a[2]) / 2));
            c < b[2]
              ? ((b[2] = c),
                (b[3] = Math.min(
                  d.thickness
                    ? Math.max(0, c - 2 * d.thickness)
                    : Math.max(0, g(d.innerSize || 0, c)),
                  c
                )),
                this.translate(b),
                this.drawDataLabels && this.drawDataLabels())
              : (l = !0);
          }
          return l;
        }
        var C = [],
          u = {
            radialDistributionY: function (a) {
              return a.top + a.distributeBox.pos;
            },
            radialDistributionX: function (a, b, d, g) {
              return a.getX(
                d < b.top + 2 || d > b.bottom - 2 ? g : d,
                b.half,
                b
              );
            },
            justify: function (a, b, d) {
              return d[0] + (a.half ? -1 : 1) * (b + a.labelDistance);
            },
            alignToPlotEdges: function (a, b, d, g) {
              a = a.getBBox().width;
              return b ? a + g : d - a - g;
            },
            alignToConnectors: function (a, b, d, g) {
              var f = 0,
                e;
              a.forEach(function (a) {
                e = a.dataLabel.getBBox().width;
                e > f && (f = e);
              });
              return b ? f + g : d - f - g;
            },
          };
        e.compose = function (a) {
          b.compose(z);
          -1 === C.indexOf(a) &&
            (C.push(a),
            (a = a.prototype),
            (a.dataLabelPositioners = u),
            (a.alignDataLabel = t),
            (a.drawDataLabels = m),
            (a.placeDataLabels = n),
            (a.verifyDataLabelOverflow = x));
        };
      })(m || (m = {}));
      return m;
    }
  );
  I(
    e,
    "Extensions/OverlappingDataLabels.js",
    [e["Core/Chart/Chart.js"], e["Core/Utilities.js"]],
    function (b, e) {
      function y(b, e) {
        var a = !1;
        if (b) {
          var d = b.newOpacity;
          b.oldOpacity !== d &&
            (b.alignAttr && b.placed
              ? (b[d ? "removeClass" : "addClass"](
                  "highcharts-data-label-hidden"
                ),
                (a = !0),
                (b.alignAttr.opacity = d),
                b[b.isOld ? "animate" : "attr"](b.alignAttr, null, function () {
                  e.styledMode || b.css({ pointerEvents: d ? "auto" : "none" });
                }),
                v(e, "afterHideOverlappingLabel"))
              : b.attr({ opacity: d }));
          b.isOld = !0;
        }
        return a;
      }
      var B = e.addEvent,
        v = e.fireEvent,
        t = e.isArray,
        F = e.isNumber,
        z = e.objectEach,
        r = e.pick;
      B(b, "render", function () {
        var b = this,
          e = [];
        (this.labelCollectors || []).forEach(function (a) {
          e = e.concat(a());
        });
        (this.yAxis || []).forEach(function (a) {
          a.stacking &&
            a.options.stackLabels &&
            !a.options.stackLabels.allowOverlap &&
            z(a.stacking.stacks, function (a) {
              z(a, function (a) {
                a.label && e.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (a) {
          var d = a.options.dataLabels;
          a.visible &&
            (!1 !== d.enabled || a._hasPointLabels) &&
            ((d = function (a) {
              return a.forEach(function (a) {
                a.visible &&
                  (t(a.dataLabels)
                    ? a.dataLabels
                    : a.dataLabel
                    ? [a.dataLabel]
                    : []
                  ).forEach(function (d) {
                    var g = d.options;
                    d.labelrank = r(
                      g.labelrank,
                      a.labelrank,
                      a.shapeArgs && a.shapeArgs.height
                    );
                    g.allowOverlap
                      ? ((d.oldOpacity = d.opacity),
                        (d.newOpacity = 1),
                        y(d, b))
                      : e.push(d);
                  });
              });
            }),
            d(a.nodes || []),
            d(a.points));
        });
        this.hideOverlappingLabels(e);
      });
      b.prototype.hideOverlappingLabels = function (b) {
        var e = this,
          a = b.length,
          d = e.renderer,
          g,
          m,
          n,
          p = !1;
        var r = function (a) {
          var b,
            g = a.box ? 0 : a.padding || 0,
            f = (b = 0),
            e;
          if (a && (!a.alignAttr || a.placed)) {
            var h = a.alignAttr || { x: a.attr("x"), y: a.attr("y") };
            var m = a.parentGroup;
            a.width ||
              ((b = a.getBBox()),
              (a.width = b.width),
              (a.height = b.height),
              (b = d.fontMetrics(null, a.element).h));
            var c = a.width - 2 * g;
            (e = { left: "0", center: "0.5", right: "1" }[a.alignValue])
              ? (f = +e * c)
              : F(a.x) &&
                Math.round(a.x) !== a.translateX &&
                (f = a.x - a.translateX);
            return {
              x: h.x + (m.translateX || 0) + g - (f || 0),
              y: h.y + (m.translateY || 0) + g - b,
              width: a.width - 2 * g,
              height: a.height - 2 * g,
            };
          }
        };
        for (m = 0; m < a; m++)
          if ((g = b[m]))
            (g.oldOpacity = g.opacity),
              (g.newOpacity = 1),
              (g.absoluteBox = r(g));
        b.sort(function (a, b) {
          return (b.labelrank || 0) - (a.labelrank || 0);
        });
        for (m = 0; m < a; m++) {
          var x = (r = b[m]) && r.absoluteBox;
          for (g = m + 1; g < a; ++g) {
            var C = (n = b[g]) && n.absoluteBox;
            !x ||
              !C ||
              r === n ||
              0 === r.newOpacity ||
              0 === n.newOpacity ||
              "hidden" === r.visibility ||
              "hidden" === n.visibility ||
              C.x >= x.x + x.width ||
              C.x + C.width <= x.x ||
              C.y >= x.y + x.height ||
              C.y + C.height <= x.y ||
              ((r.labelrank < n.labelrank ? r : n).newOpacity = 0);
          }
        }
        b.forEach(function (a) {
          y(a, e) && (p = !0);
        });
        p && v(e, "afterHideAllOverlappingLabels");
      };
    }
  );
  I(e, "Core/Responsive.js", [e["Core/Utilities.js"]], function (b) {
    var e = b.extend,
      y = b.find,
      B = b.isArray,
      v = b.isObject,
      t = b.merge,
      F = b.objectEach,
      z = b.pick,
      r = b.splat,
      p = b.uniqueKey,
      h;
    (function (a) {
      var b = [];
      a.compose = function (a) {
        -1 === b.indexOf(a) && (b.push(a), e(a.prototype, g.prototype));
        return a;
      };
      var g = (function () {
        function a() {}
        a.prototype.currentOptions = function (a) {
          function b(a, g, e, h) {
            var f;
            F(a, function (a, k) {
              if (!h && -1 < d.collectionsWithUpdate.indexOf(k) && g[k])
                for (
                  a = r(a), e[k] = [], f = 0;
                  f < Math.max(a.length, g[k].length);
                  f++
                )
                  g[k][f] &&
                    (void 0 === a[f]
                      ? (e[k][f] = g[k][f])
                      : ((e[k][f] = {}), b(a[f], g[k][f], e[k][f], h + 1)));
              else
                v(a)
                  ? ((e[k] = B(a) ? [] : {}), b(a, g[k] || {}, e[k], h + 1))
                  : (e[k] = "undefined" === typeof g[k] ? null : g[k]);
            });
          }
          var d = this,
            g = {};
          b(a, this.options, g, 0);
          return g;
        };
        a.prototype.matchResponsiveRule = function (a, b) {
          var d = a.condition;
          (
            d.callback ||
            function () {
              return (
                this.chartWidth <= z(d.maxWidth, Number.MAX_VALUE) &&
                this.chartHeight <= z(d.maxHeight, Number.MAX_VALUE) &&
                this.chartWidth >= z(d.minWidth, 0) &&
                this.chartHeight >= z(d.minHeight, 0)
              );
            }
          ).call(this) && b.push(a._id);
        };
        a.prototype.setResponsive = function (a, b) {
          var d = this,
            g = this.options.responsive,
            e = this.currentResponsive,
            h = [];
          !b &&
            g &&
            g.rules &&
            g.rules.forEach(function (a) {
              "undefined" === typeof a._id && (a._id = p());
              d.matchResponsiveRule(a, h);
            }, this);
          b = t.apply(
            void 0,
            h
              .map(function (a) {
                return y((g || {}).rules || [], function (b) {
                  return b._id === a;
                });
              })
              .map(function (a) {
                return a && a.chartOptions;
              })
          );
          b.isResponsiveOptions = !0;
          h = h.toString() || void 0;
          h !== (e && e.ruleIds) &&
            (e && this.update(e.undoOptions, a, !0),
            h
              ? ((e = this.currentOptions(b)),
                (e.isResponsiveOptions = !0),
                (this.currentResponsive = {
                  ruleIds: h,
                  mergedOptions: b,
                  undoOptions: e,
                }),
                this.update(b, a, !0))
              : (this.currentResponsive = void 0));
        };
        return a;
      })();
    })(h || (h = {}));
    ("");
    ("");
    return h;
  });
  I(
    e,
    "masters/highcharts.src.js",
    [
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
      e["Core/DefaultOptions.js"],
      e["Core/Animation/Fx.js"],
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Renderer/HTML/AST.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Renderer/RendererUtilities.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Renderer/HTML/HTMLElement.js"],
      e["Core/Renderer/HTML/HTMLRenderer.js"],
      e["Core/Axis/Axis.js"],
      e["Core/Axis/DateTimeAxis.js"],
      e["Core/Axis/LogarithmicAxis.js"],
      e["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
      e["Core/Axis/Tick.js"],
      e["Core/Tooltip.js"],
      e["Core/Series/Point.js"],
      e["Core/Pointer.js"],
      e["Core/MSPointer.js"],
      e["Core/Legend/Legend.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Axis/Stacking/StackingAxis.js"],
      e["Core/Axis/Stacking/StackItem.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Series/Column/ColumnSeries.js"],
      e["Series/Column/ColumnDataLabel.js"],
      e["Series/Pie/PieSeries.js"],
      e["Series/Pie/PieDataLabel.js"],
      e["Core/Series/DataLabel.js"],
      e["Core/Responsive.js"],
      e["Core/Color/Color.js"],
      e["Core/Time.js"],
    ],
    function (
      b,
      e,
      y,
      B,
      v,
      t,
      F,
      z,
      r,
      p,
      h,
      a,
      d,
      g,
      m,
      n,
      G,
      J,
      x,
      C,
      u,
      l,
      A,
      f,
      w,
      k,
      D,
      c,
      q,
      E,
      H,
      Q,
      L,
      S,
      I
    ) {
      b.animate = v.animate;
      b.animObject = v.animObject;
      b.getDeferredAnimation = v.getDeferredAnimation;
      b.setAnimation = v.setAnimation;
      b.stop = v.stop;
      b.timers = B.timers;
      b.AST = t;
      b.Axis = d;
      b.Chart = A;
      b.chart = A.chart;
      b.Fx = B;
      b.Legend = l;
      b.PlotLineOrBand = n;
      b.Point = x;
      b.Pointer = u.isRequired() ? u : C;
      b.Series = k;
      b.StackItem = w;
      b.SVGElement = r;
      b.SVGRenderer = p;
      b.Tick = G;
      b.Time = I;
      b.Tooltip = J;
      b.Color = S;
      b.color = S.parse;
      a.compose(p);
      h.compose(r);
      b.defaultOptions = y.defaultOptions;
      b.getOptions = y.getOptions;
      b.time = y.defaultTime;
      b.setOptions = y.setOptions;
      b.dateFormat = F.dateFormat;
      b.format = F.format;
      b.numberFormat = F.numberFormat;
      b.addEvent = e.addEvent;
      b.arrayMax = e.arrayMax;
      b.arrayMin = e.arrayMin;
      b.attr = e.attr;
      b.clearTimeout = e.clearTimeout;
      b.correctFloat = e.correctFloat;
      b.createElement = e.createElement;
      b.css = e.css;
      b.defined = e.defined;
      b.destroyObjectProperties = e.destroyObjectProperties;
      b.discardElement = e.discardElement;
      b.distribute = z.distribute;
      b.erase = e.erase;
      b.error = e.error;
      b.extend = e.extend;
      b.extendClass = e.extendClass;
      b.find = e.find;
      b.fireEvent = e.fireEvent;
      b.getMagnitude = e.getMagnitude;
      b.getStyle = e.getStyle;
      b.inArray = e.inArray;
      b.isArray = e.isArray;
      b.isClass = e.isClass;
      b.isDOMElement = e.isDOMElement;
      b.isFunction = e.isFunction;
      b.isNumber = e.isNumber;
      b.isObject = e.isObject;
      b.isString = e.isString;
      b.keys = e.keys;
      b.merge = e.merge;
      b.normalizeTickInterval = e.normalizeTickInterval;
      b.objectEach = e.objectEach;
      b.offset = e.offset;
      b.pad = e.pad;
      b.pick = e.pick;
      b.pInt = e.pInt;
      b.relativeLength = e.relativeLength;
      b.removeEvent = e.removeEvent;
      b.seriesType = D.seriesType;
      b.splat = e.splat;
      b.stableSort = e.stableSort;
      b.syncTimeout = e.syncTimeout;
      b.timeUnits = e.timeUnits;
      b.uniqueKey = e.uniqueKey;
      b.useSerialIds = e.useSerialIds;
      b.wrap = e.wrap;
      q.compose(c);
      Q.compose(k);
      g.compose(d);
      m.compose(d);
      H.compose(E);
      n.compose(d);
      L.compose(A);
      f.compose(d, A, k);
      return b;
    }
  );
  I(
    e,
    "Core/Axis/Color/ColorAxisComposition.js",
    [e["Core/Color/Color.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var y = b.parse,
        B = e.addEvent,
        v = e.extend,
        t = e.merge,
        F = e.pick,
        z = e.splat,
        r;
      (function (b) {
        function e() {
          var a = this,
            b = this.options;
          this.colorAxis = [];
          b.colorAxis &&
            ((b.colorAxis = z(b.colorAxis)),
            b.colorAxis.forEach(function (b, d) {
              b.index = d;
              new A(a, b);
            }));
        }
        function a(a) {
          var b = this,
            d = function (c) {
              c = a.allItems.indexOf(c);
              -1 !== c &&
                (b.destroyItem(a.allItems[c]), a.allItems.splice(c, 1));
            },
            f = [],
            c,
            g;
          (this.chart.colorAxis || []).forEach(function (a) {
            (c = a.options) &&
              c.showInLegend &&
              (c.dataClasses && c.visible
                ? (f = f.concat(a.getDataClassLegendSymbols()))
                : c.visible && f.push(a),
              a.series.forEach(function (a) {
                if (!a.options.showInLegend || c.dataClasses)
                  "point" === a.options.legendType
                    ? a.points.forEach(function (a) {
                        d(a);
                      })
                    : d(a);
              }));
          });
          for (g = f.length; g--; ) a.allItems.unshift(f[g]);
        }
        function d(a) {
          a.visible &&
            a.item.legendColor &&
            a.item.legendSymbol.attr({ fill: a.item.legendColor });
        }
        function g() {
          var a = this.chart.colorAxis;
          a &&
            a.forEach(function (a, b, d) {
              a.update({}, d);
            });
        }
        function m() {
          ((this.chart.colorAxis && this.chart.colorAxis.length) ||
            this.colorAttribs) &&
            this.translateColors();
        }
        function n() {
          var a = this.axisTypes;
          a
            ? -1 === a.indexOf("colorAxis") && a.push("colorAxis")
            : (this.axisTypes = ["colorAxis"]);
        }
        function p(a) {
          var b = this,
            d = a ? "show" : "hide";
          b.visible = b.options.visible = !!a;
          ["graphic", "dataLabel"].forEach(function (a) {
            if (b[a]) b[a][d]();
          });
          this.series.buildKDTree();
        }
        function r() {
          var a = this,
            b = this.options.nullColor,
            d = this.colorAxis,
            g = this.colorKey;
          (this.data.length ? this.data : this.points).forEach(function (c) {
            var f = c.getNestedProperty(g);
            (f =
              c.options.color ||
              (c.isNull || null === c.value
                ? b
                : d && "undefined" !== typeof f
                ? d.toColor(f, c)
                : c.color || a.color)) &&
              c.color !== f &&
              ((c.color = f),
              "point" === a.options.legendType &&
                c.legendItem &&
                a.chart.legend.colorizeItem(c, c.visible));
          });
        }
        function x(a) {
          var b = a.prototype.createAxis;
          a.prototype.createAxis = function (a, d) {
            if ("colorAxis" !== a) return b.apply(this, arguments);
            var c = new A(this, t(d.axis, { index: this[a].length, isX: !1 }));
            this.isDirtyLegend = !0;
            this.axes.forEach(function (a) {
              a.series = [];
            });
            this.series.forEach(function (a) {
              a.bindAxes();
              a.isDirtyData = !0;
            });
            F(d.redraw, !0) && this.redraw(d.animation);
            return c;
          };
        }
        function C() {
          this.elem.attr(
            "fill",
            y(this.start).tweenTo(y(this.end), this.pos),
            void 0,
            !0
          );
        }
        function u() {
          this.elem.attr(
            "stroke",
            y(this.start).tweenTo(y(this.end), this.pos),
            void 0,
            !0
          );
        }
        var l = [],
          A;
        b.compose = function (b, h, k, t, c) {
          A || (A = b);
          -1 === l.indexOf(h) &&
            (l.push(h),
            (b = h.prototype),
            b.collectionsWithUpdate.push("colorAxis"),
            (b.collectionsWithInit.colorAxis = [b.addColorAxis]),
            B(h, "afterGetAxes", e),
            x(h));
          -1 === l.indexOf(k) &&
            (l.push(k),
            (h = k.prototype),
            (h.fillSetter = C),
            (h.strokeSetter = u));
          -1 === l.indexOf(t) &&
            (l.push(t),
            B(t, "afterGetAllItems", a),
            B(t, "afterColorizeItem", d),
            B(t, "afterUpdate", g));
          -1 === l.indexOf(c) &&
            (l.push(c),
            v(c.prototype, { optionalAxis: "colorAxis", translateColors: r }),
            v(c.prototype.pointClass.prototype, { setVisible: p }),
            B(c, "afterTranslate", m),
            B(c, "bindAxes", n));
        };
        b.pointSetVisible = p;
      })(r || (r = {}));
      return r;
    }
  );
  I(e, "Core/Axis/Color/ColorAxisDefaults.js", [], function () {
    return {
      lineWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      gridLineWidth: 1,
      tickPixelInterval: 72,
      startOnTick: !0,
      endOnTick: !0,
      offset: 0,
      marker: { animation: { duration: 50 }, width: 0.01, color: "#999999" },
      labels: { overflow: "justify", rotation: 0 },
      minColor: "#e6ebf5",
      maxColor: "#003399",
      tickLength: 5,
      showInLegend: !0,
    };
  });
  I(
    e,
    "Core/Axis/Color/ColorAxis.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Color/Color.js"],
      e["Core/Axis/Color/ColorAxisComposition.js"],
      e["Core/Axis/Color/ColorAxisDefaults.js"],
      e["Core/Globals.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F, z) {
      var r =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function g() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((g.prototype = d.prototype), new g());
            };
          })(),
        p = e.parse,
        h = v.noop,
        a = F.series,
        d = z.extend,
        g = z.isNumber,
        m = z.merge,
        n = z.pick;
      e = (function (b) {
        function e(a, d) {
          var g = b.call(this, a, d) || this;
          g.beforePadding = !1;
          g.chart = void 0;
          g.coll = "colorAxis";
          g.dataClasses = void 0;
          g.legendItem = void 0;
          g.legendItems = void 0;
          g.name = "";
          g.options = void 0;
          g.stops = void 0;
          g.visible = !0;
          g.init(a, d);
          return g;
        }
        r(e, b);
        e.compose = function (a, b, d, g) {
          y.compose(e, a, b, d, g);
        };
        e.prototype.init = function (a, d) {
          var g = a.options.legend || {},
            h = d.layout ? "vertical" !== d.layout : "vertical" !== g.layout,
            n = d.visible;
          g = m(e.defaultColorAxisOptions, d, {
            showEmpty: !1,
            title: null,
            visible: g.enabled && !1 !== n,
          });
          this.coll = "colorAxis";
          this.side = d.side || h ? 2 : 1;
          this.reversed = d.reversed || !h;
          this.opposite = !h;
          b.prototype.init.call(this, a, g);
          this.userOptions.visible = n;
          d.dataClasses && this.initDataClasses(d);
          this.initStops();
          this.horiz = h;
          this.zoomEnabled = !1;
        };
        e.prototype.initDataClasses = function (a) {
          var b = this.chart,
            d = this.options,
            g = a.dataClasses.length,
            e,
            f = 0,
            h = b.options.chart.colorCount;
          this.dataClasses = e = [];
          this.legendItems = [];
          (a.dataClasses || []).forEach(function (a, l) {
            a = m(a);
            e.push(a);
            if (b.styledMode || !a.color)
              "category" === d.dataClassColor
                ? (b.styledMode ||
                    ((l = b.options.colors), (h = l.length), (a.color = l[f])),
                  (a.colorIndex = f),
                  f++,
                  f === h && (f = 0))
                : (a.color = p(d.minColor).tweenTo(
                    p(d.maxColor),
                    2 > g ? 0.5 : l / (g - 1)
                  ));
          });
        };
        e.prototype.hasData = function () {
          return !!(this.tickPositions || []).length;
        };
        e.prototype.setTickPositions = function () {
          if (!this.dataClasses) return b.prototype.setTickPositions.call(this);
        };
        e.prototype.initStops = function () {
          this.stops = this.options.stops || [
            [0, this.options.minColor],
            [1, this.options.maxColor],
          ];
          this.stops.forEach(function (a) {
            a.color = p(a[1]);
          });
        };
        e.prototype.setOptions = function (a) {
          b.prototype.setOptions.call(this, a);
          this.options.crosshair = this.options.marker;
        };
        e.prototype.setAxisSize = function () {
          var a = this.legendSymbol,
            b = this.chart,
            d = b.options.legend || {},
            g,
            h;
          a
            ? ((this.left = d = a.attr("x")),
              (this.top = g = a.attr("y")),
              (this.width = h = a.attr("width")),
              (this.height = a = a.attr("height")),
              (this.right = b.chartWidth - d - h),
              (this.bottom = b.chartHeight - g - a),
              (this.len = this.horiz ? h : a),
              (this.pos = this.horiz ? d : g))
            : (this.len =
                (this.horiz ? d.symbolWidth : d.symbolHeight) ||
                e.defaultLegendLength);
        };
        e.prototype.normalizedValue = function (a) {
          this.logarithmic && (a = this.logarithmic.log2lin(a));
          return 1 - (this.max - a) / (this.max - this.min || 1);
        };
        e.prototype.toColor = function (a, b) {
          var d = this.dataClasses,
            g = this.stops,
            e;
          if (d)
            for (e = d.length; e--; ) {
              var f = d[e];
              var h = f.from;
              g = f.to;
              if (
                ("undefined" === typeof h || a >= h) &&
                ("undefined" === typeof g || a <= g)
              ) {
                var k = f.color;
                b && ((b.dataClass = e), (b.colorIndex = f.colorIndex));
                break;
              }
            }
          else {
            a = this.normalizedValue(a);
            for (e = g.length; e-- && !(a > g[e][0]); );
            h = g[e] || g[e + 1];
            g = g[e + 1] || h;
            a = 1 - (g[0] - a) / (g[0] - h[0] || 1);
            k = h.color.tweenTo(g.color, a);
          }
          return k;
        };
        e.prototype.getOffset = function () {
          var a = this.legendGroup,
            d = this.chart.axisOffset[this.side];
          if (a) {
            this.axisParent = a;
            b.prototype.getOffset.call(this);
            var g = this.chart.legend;
            g.allItems.forEach(function (a) {
              a instanceof e && a.drawLegendSymbol(g, a);
            });
            g.render();
            this.chart.getMargins(!0);
            this.added ||
              ((this.added = !0),
              (this.labelLeft = 0),
              (this.labelRight = this.width));
            this.chart.axisOffset[this.side] = d;
          }
        };
        e.prototype.setLegendColor = function () {
          var a = this.reversed,
            b = a ? 1 : 0;
          a = a ? 0 : 1;
          b = this.horiz ? [b, 0, a, 0] : [0, a, 0, b];
          this.legendColor = {
            linearGradient: { x1: b[0], y1: b[1], x2: b[2], y2: b[3] },
            stops: this.stops,
          };
        };
        e.prototype.drawLegendSymbol = function (a, b) {
          var d = a.padding,
            g = a.options,
            h = this.horiz,
            f = n(g.symbolWidth, h ? e.defaultLegendLength : 12),
            m = n(g.symbolHeight, h ? 12 : e.defaultLegendLength),
            k = n(g.labelPadding, h ? 16 : 30);
          g = n(g.itemDistance, 10);
          this.setLegendColor();
          b.legendSymbol ||
            (b.legendSymbol = this.chart.renderer
              .rect(0, a.baseline - 11, f, m)
              .attr({ zIndex: 1 })
              .add(b.legendGroup));
          this.legendItemWidth =
            f + d + (h ? g : this.options.labels.x + this.maxLabelLength);
          this.legendItemHeight = m + d + (h ? k : 0);
        };
        e.prototype.setState = function (a) {
          this.series.forEach(function (b) {
            b.setState(a);
          });
        };
        e.prototype.setVisible = function () {};
        e.prototype.getSeriesExtremes = function () {
          var b = this.series,
            d = b.length,
            g;
          this.dataMin = Infinity;
          for (this.dataMax = -Infinity; d--; ) {
            var e = b[d];
            var h = (e.colorKey = n(
              e.options.colorKey,
              e.colorKey,
              e.pointValKey,
              e.zoneAxis,
              "y"
            ));
            var f = e.pointArrayMap;
            var m = e[h + "Min"] && e[h + "Max"];
            if (e[h + "Data"]) var k = e[h + "Data"];
            else if (f) {
              k = [];
              f = f.indexOf(h);
              var p = e.yData;
              if (0 <= f && p)
                for (g = 0; g < p.length; g++) k.push(n(p[g][f], p[g]));
            } else k = e.yData;
            m
              ? ((e.minColorValue = e[h + "Min"]),
                (e.maxColorValue = e[h + "Max"]))
              : ((k = a.prototype.getExtremes.call(e, k)),
                (e.minColorValue = k.dataMin),
                (e.maxColorValue = k.dataMax));
            "undefined" !== typeof e.minColorValue &&
              ((this.dataMin = Math.min(this.dataMin, e.minColorValue)),
              (this.dataMax = Math.max(this.dataMax, e.maxColorValue)));
            m || a.prototype.applyExtremes.call(e);
          }
        };
        e.prototype.drawCrosshair = function (a, d) {
          var g = d && d.plotX,
            e = d && d.plotY,
            h = this.pos,
            f = this.len;
          if (d) {
            var m = this.toPixels(d.getNestedProperty(d.series.colorKey));
            m < h ? (m = h - 2) : m > h + f && (m = h + f + 2);
            d.plotX = m;
            d.plotY = this.len - m;
            b.prototype.drawCrosshair.call(this, a, d);
            d.plotX = g;
            d.plotY = e;
            this.cross &&
              !this.cross.addedToColorAxis &&
              this.legendGroup &&
              (this.cross
                .addClass("highcharts-coloraxis-marker")
                .add(this.legendGroup),
              (this.cross.addedToColorAxis = !0),
              this.chart.styledMode ||
                "object" !== typeof this.crosshair ||
                this.cross.attr({ fill: this.crosshair.color }));
          }
        };
        e.prototype.getPlotLinePath = function (a) {
          var d = this.left,
            e = a.translatedValue,
            h = this.top;
          return g(e)
            ? this.horiz
              ? [["M", e - 4, h - 6], ["L", e + 4, h - 6], ["L", e, h], ["Z"]]
              : [["M", d, e], ["L", d - 6, e + 6], ["L", d - 6, e - 6], ["Z"]]
            : b.prototype.getPlotLinePath.call(this, a);
        };
        e.prototype.update = function (a, d) {
          var g = this.chart.legend;
          this.series.forEach(function (a) {
            a.isDirtyData = !0;
          });
          ((a.dataClasses && g.allItems) || this.dataClasses) &&
            this.destroyItems();
          b.prototype.update.call(this, a, d);
          this.legendItem && (this.setLegendColor(), g.colorizeItem(this, !0));
        };
        e.prototype.destroyItems = function () {
          var a = this.chart;
          this.legendItem
            ? a.legend.destroyItem(this)
            : this.legendItems &&
              this.legendItems.forEach(function (b) {
                a.legend.destroyItem(b);
              });
          a.isDirtyLegend = !0;
        };
        e.prototype.destroy = function () {
          this.chart.isDirtyLegend = !0;
          this.destroyItems();
          b.prototype.destroy.apply(this, [].slice.call(arguments));
        };
        e.prototype.remove = function (a) {
          this.destroyItems();
          b.prototype.remove.call(this, a);
        };
        e.prototype.getDataClassLegendSymbols = function () {
          var a = this,
            b = a.chart,
            g = a.legendItems,
            e = b.options.legend,
            m = e.valueDecimals,
            f = e.valueSuffix || "",
            n;
          g.length ||
            a.dataClasses.forEach(function (e, l) {
              var c = e.from,
                k = e.to,
                p = b.numberFormatter,
                u = !0;
              n = "";
              "undefined" === typeof c
                ? (n = "< ")
                : "undefined" === typeof k && (n = "> ");
              "undefined" !== typeof c && (n += p(c, m) + f);
              "undefined" !== typeof c &&
                "undefined" !== typeof k &&
                (n += " - ");
              "undefined" !== typeof k && (n += p(k, m) + f);
              g.push(
                d(
                  {
                    chart: b,
                    name: n,
                    options: {},
                    drawLegendSymbol: t.drawRectangle,
                    visible: !0,
                    setState: h,
                    isDataClass: !0,
                    setVisible: function () {
                      this.visible = u = a.visible = !u;
                      a.series.forEach(function (a) {
                        a.points.forEach(function (a) {
                          a.dataClass === l && a.setVisible(u);
                        });
                      });
                      b.legend.colorizeItem(this, u);
                    },
                  },
                  e
                )
              );
            });
          return g;
        };
        e.defaultColorAxisOptions = B;
        e.defaultLegendLength = 200;
        e.keepProps = [
          "legendGroup",
          "legendItemHeight",
          "legendItemWidth",
          "legendItem",
          "legendSymbol",
        ];
        return e;
      })(b);
      Array.prototype.push.apply(b.keepProps, e.keepProps);
      ("");
      return e;
    }
  );
  I(
    e,
    "Maps/MapNavigationOptionsDefault.js",
    [e["Core/DefaultOptions.js"], e["Core/Utilities.js"]],
    function (b, e) {
      e = e.extend;
      var y = {
        buttonOptions: {
          alignTo: "plotBox",
          align: "left",
          verticalAlign: "top",
          x: 0,
          width: 18,
          height: 18,
          padding: 5,
          style: { fontSize: "15px", fontWeight: "bold" },
          theme: { "stroke-width": 1, "text-align": "center" },
        },
        buttons: {
          zoomIn: {
            onclick: function () {
              this.mapZoom(0.5);
            },
            text: "+",
            y: 0,
          },
          zoomOut: {
            onclick: function () {
              this.mapZoom(2);
            },
            text: "-",
            y: 28,
          },
        },
        mouseWheelSensitivity: 1.1,
      };
      e(b.defaultOptions.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" });
      return (b.defaultOptions.mapNavigation = y);
    }
  );
  I(
    e,
    "Maps/MapNavigation.js",
    [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (b, e, y) {
      function B(a) {
        a &&
          (a.preventDefault && a.preventDefault(),
          a.stopPropagation && a.stopPropagation(),
          (a.cancelBubble = !0));
      }
      function v(a) {
        this.navButtons = [];
        this.init(a);
      }
      var t = e.doc,
        F = y.addEvent,
        z = y.extend,
        r = y.isNumber,
        p = y.merge,
        h = y.objectEach,
        a = y.pick;
      v.prototype.init = function (a) {
        this.chart = a;
      };
      v.prototype.update = function (b) {
        var d = this,
          e = this.chart,
          n = e.options.mapNavigation,
          r,
          t = function (a) {
            this.handler.call(e, a);
            B(a);
          },
          x = d.navButtons;
        b && (n = e.options.mapNavigation = p(e.options.mapNavigation, b));
        for (; x.length; ) x.pop().destroy();
        a(n.enableButtons, n.enabled) &&
          !e.renderer.forExport &&
          (d.navButtonsGroup ||
            (d.navButtonsGroup = e.renderer.g().attr({ zIndex: 4 }).add()),
          h(n.buttons, function (a, b) {
            a = p(n.buttonOptions, a);
            !e.styledMode &&
              a.theme &&
              ((r = a.theme), (r.style = p(a.theme.style, a.style)));
            var g = e.renderer
              .button(
                a.text || "",
                0,
                0,
                t,
                r,
                void 0,
                void 0,
                void 0,
                "zoomIn" === b ? "topbutton" : "bottombutton"
              )
              .addClass(
                "highcharts-map-navigation highcharts-" +
                  { zoomIn: "zoom-in", zoomOut: "zoom-out" }[b]
              )
              .attr({
                width: a.width,
                height: a.height,
                title: e.options.lang[b],
                padding: a.padding,
                zIndex: 5,
              })
              .add(d.navButtonsGroup);
            g.handler = a.onclick;
            F(g.element, "dblclick", B);
            x.push(g);
            z(a, { width: g.width, height: 2 * g.height });
            if (e.hasLoaded) g.align(a, !1, a.alignTo);
            else
              var h = F(e, "load", function () {
                g.element && g.align(a, !1, a.alignTo);
                h();
              });
          }),
          (b = function () {
            var a = e.exportingGroup && e.exportingGroup.getBBox();
            if (a) {
              var b = d.navButtonsGroup.getBBox();
              if (
                !(
                  b.x >= a.x + a.width ||
                  b.x + b.width <= a.x ||
                  b.y >= a.y + a.height ||
                  b.y + b.height <= a.y
                )
              ) {
                var g = -b.y - b.height + a.y - 5;
                a = a.y + a.height - b.y + 5;
                d.navButtonsGroup.attr({
                  translateY:
                    "bottom" ===
                    (n.buttonOptions && n.buttonOptions.verticalAlign)
                      ? g
                      : a,
                });
              }
            }
          }),
          e.hasLoaded || F(e, "render", b));
        this.updateEvents(n);
      };
      v.prototype.updateEvents = function (b) {
        var d = this.chart;
        a(b.enableDoubleClickZoom, b.enabled) || b.enableDoubleClickZoomTo
          ? (this.unbindDblClick =
              this.unbindDblClick ||
              F(d.container, "dblclick", function (a) {
                d.pointer.onContainerDblClick(a);
              }))
          : this.unbindDblClick &&
            (this.unbindDblClick = this.unbindDblClick());
        a(b.enableMouseWheelZoom, b.enabled)
          ? (this.unbindMouseWheel =
              this.unbindMouseWheel ||
              F(
                d.container,
                void 0 !== t.onwheel
                  ? "wheel"
                  : void 0 !== t.onmousewheel
                  ? "mousewheel"
                  : "DOMMouseScroll",
                function (a) {
                  d.pointer.inClass(a.target, "highcharts-no-mousewheel") ||
                    (d.pointer.onContainerMouseWheel(a), B(a));
                  return !1;
                }
              ))
          : this.unbindMouseWheel &&
            (this.unbindMouseWheel = this.unbindMouseWheel());
      };
      z(b.prototype, {
        fitToBox: function (a, b) {
          [
            ["x", "width"],
            ["y", "height"],
          ].forEach(function (d) {
            var g = d[0];
            d = d[1];
            a[g] + a[d] > b[g] + b[d] &&
              (a[d] > b[d]
                ? ((a[d] = b[d]), (a[g] = b[g]))
                : (a[g] = b[g] + b[d] - a[d]));
            a[d] > b[d] && (a[d] = b[d]);
            a[g] < b[g] && (a[g] = b[g]);
          });
          return a;
        },
        mapZoom: function (a, b, e, h, p) {
          this.mapView &&
            (r(a) && (a = Math.log(a) / Math.log(0.5)),
            this.mapView.zoomBy(
              a,
              r(b) && r(e) ? this.mapView.projection.inverse([b, e]) : void 0,
              r(h) && r(p) ? [h, p] : void 0
            ));
        },
      });
      F(b, "beforeRender", function () {
        this.mapNavigation = new v(this);
        this.mapNavigation.update();
      });
      e.MapNavigation = v;
    }
  );
  I(
    e,
    "Maps/MapPointer.js",
    [e["Core/Pointer.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var y = e.defined,
        B = e.extend,
        v = e.pick;
      e = e.wrap;
      var t = b.prototype.normalize,
        F = 0,
        z;
      B(b.prototype, {
        normalize: function (b, e) {
          var h = this.chart;
          b = t.call(this, b, e);
          h &&
            h.mapView &&
            (e = h.mapView.pixelsToLonLat({
              x: b.chartX - h.plotLeft,
              y: b.chartY - h.plotTop,
            })) &&
            B(b, e);
          return b;
        },
        onContainerDblClick: function (b) {
          var e = this.chart;
          b = this.normalize(b);
          e.options.mapNavigation.enableDoubleClickZoomTo
            ? e.pointer.inClass(b.target, "highcharts-tracker") &&
              e.hoverPoint &&
              e.hoverPoint.zoomTo()
            : e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop) &&
              e.mapZoom(0.5, void 0, void 0, b.chartX, b.chartY);
        },
        onContainerMouseWheel: function (b) {
          var e = this.chart;
          b = this.normalize(b);
          var h =
            (y(b.wheelDelta) && -b.wheelDelta / 120) || b.deltaY || b.detail;
          1 <= Math.abs(h) &&
            ((F += Math.abs(h)),
            z && clearTimeout(z),
            (z = setTimeout(function () {
              F = 0;
            }, 50)));
          10 > F &&
            e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop) &&
            e.mapView &&
            e.mapView.zoomBy(
              (e.options.mapNavigation.mouseWheelSensitivity - 1) * -h,
              void 0,
              [b.chartX, b.chartY],
              1 > Math.abs(h) ? !1 : void 0
            );
        },
      });
      e(b.prototype, "zoomOption", function (b) {
        var e = this.chart.options.mapNavigation;
        v(e.enableTouchZoom, e.enabled) &&
          (this.chart.options.chart.zooming.pinchType = "xy");
        b.apply(this, [].slice.call(arguments, 1));
      });
      e(b.prototype, "pinchTranslate", function (b, e, h, a, d, g, m) {
        b.call(this, e, h, a, d, g, m);
        "map" === this.chart.options.chart.type &&
          this.hasZoom &&
          ((b = a.scaleX > a.scaleY),
          this.pinchTranslateDirection(
            !b,
            e,
            h,
            a,
            d,
            g,
            m,
            b ? a.scaleX : a.scaleY
          ));
      });
    }
  );
  I(
    e,
    "Series/ColorMapComposition.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var y = b.seriesTypes.column.prototype,
        B = e.addEvent,
        v = e.defined,
        t;
      (function (b) {
        function e(b) {
          this.moveToTopOnHover &&
            this.graphic &&
            this.graphic.attr({ zIndex: b && "hover" === b.state ? 1 : 0 });
        }
        var r = [];
        b.pointMembers = {
          dataLabelOnNull: !0,
          moveToTopOnHover: !0,
          isValid: function () {
            return (
              null !== this.value &&
              Infinity !== this.value &&
              -Infinity !== this.value &&
              (void 0 === this.value || !isNaN(this.value))
            );
          },
        };
        b.seriesMembers = {
          colorKey: "value",
          axisTypes: ["xAxis", "yAxis", "colorAxis"],
          parallelArrays: ["x", "y", "value"],
          pointArrayMap: ["value"],
          trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
          colorAttribs: function (b) {
            var e = {};
            !v(b.color) ||
              (b.state && "normal" !== b.state) ||
              (e[this.colorProp || "fill"] = b.color);
            return e;
          },
          pointAttribs: y.pointAttribs,
        };
        b.compose = function (b) {
          var h = b.prototype.pointClass;
          -1 === r.indexOf(h) && (r.push(h), B(h, "afterSetState", e));
          return b;
        };
      })(t || (t = {}));
      return t;
    }
  );
  I(
    e,
    "Maps/MapSymbols.js",
    [e["Core/Renderer/SVG/SVGRenderer.js"]],
    function (b) {
      function e(b, e, v, t, F, z, r, p) {
        return [
          ["M", b + F, e],
          ["L", b + v - z, e],
          ["C", b + v - z / 2, e, b + v, e + z / 2, b + v, e + z],
          ["L", b + v, e + t - r],
          ["C", b + v, e + t - r / 2, b + v - r / 2, e + t, b + v - r, e + t],
          ["L", b + p, e + t],
          ["C", b + p / 2, e + t, b, e + t - p / 2, b, e + t - p],
          ["L", b, e + F],
          ["C", b, e + F / 2, b + F / 2, e, b + F, e],
          ["Z"],
        ];
      }
      b = b.prototype.symbols;
      b.bottombutton = function (b, B, v, t, F) {
        F = (F && F.r) || 0;
        return e(b - 1, B - 1, v, t, 0, 0, F, F);
      };
      b.topbutton = function (b, B, v, t, F) {
        F = (F && F.r) || 0;
        return e(b - 1, B - 1, v, t, F, F, 0, 0);
      };
      return b;
    }
  );
  I(
    e,
    "Core/Chart/MapChart.js",
    [
      e["Core/Chart/Chart.js"],
      e["Core/DefaultOptions.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (e, h) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(e, h);
            };
            return function (e, h) {
              function a() {
                this.constructor = e;
              }
              b(e, h);
              e.prototype =
                null === h
                  ? Object.create(h)
                  : ((a.prototype = h.prototype), new a());
            };
          })(),
        t = e.getOptions,
        F = B.merge,
        z = B.pick;
      b = (function (b) {
        function e() {
          return (null !== b && b.apply(this, arguments)) || this;
        }
        v(e, b);
        e.prototype.init = function (e, a) {
          var d = t().credits;
          e = F(
            {
              chart: { panning: { enabled: !0, type: "xy" }, type: "map" },
              credits: {
                mapText: z(
                  d.mapText,
                  ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'
                ),
                mapTextFull: z(d.mapTextFull, "{geojson.copyright}"),
              },
              mapView: {},
              tooltip: { followTouchMove: !1 },
            },
            e
          );
          b.prototype.init.call(this, e, a);
        };
        return e;
      })(b);
      (function (b) {
        b.maps = {};
        b.mapChart = function (e, h, a) {
          return new b(e, h, a);
        };
        b.splitPath = function (b) {
          "string" === typeof b &&
            ((b = b
              .replace(/([A-Za-z])/g, " $1 ")
              .replace(/^\s*/, "")
              .replace(/\s*$/, "")),
            (b = b.split(/[ ,;]+/).map(function (b) {
              return /[A-za-z]/.test(b) ? b : parseFloat(b);
            })));
          return y.prototype.pathToSegments(b);
        };
      })(b || (b = {}));
      return b;
    }
  );
  I(e, "Maps/MapUtilities.js", [], function () {
    return {
      boundsFromPath: function (b) {
        var e = -Number.MAX_VALUE,
          y = Number.MAX_VALUE,
          B = -Number.MAX_VALUE,
          v = Number.MAX_VALUE,
          t;
        b.forEach(function (b) {
          var z = b[b.length - 2];
          b = b[b.length - 1];
          "number" === typeof z &&
            "number" === typeof b &&
            ((y = Math.min(y, z)),
            (e = Math.max(e, z)),
            (v = Math.min(v, b)),
            (B = Math.max(B, b)),
            (t = !0));
        });
        if (t) return { x1: y, y1: v, x2: e, y2: B };
      },
      pointInPolygon: function (b, e) {
        var y,
          B = !1,
          v = b.x,
          t = b.y;
        b = 0;
        for (y = e.length - 1; b < e.length; y = b++) {
          var F = e[b][1] > t;
          var z = e[y][1] > t;
          F !== z &&
            v <
              ((e[y][0] - e[b][0]) * (t - e[b][1])) / (e[y][1] - e[b][1]) +
                e[b][0] &&
            (B = !B);
        }
        return B;
      },
    };
  });
  I(
    e,
    "Series/Map/MapPoint.js",
    [
      e["Series/ColorMapComposition.js"],
      e["Maps/MapUtilities.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (e, a) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(e, a);
            };
            return function (e, a) {
              function d() {
                this.constructor = e;
              }
              b(e, a);
              e.prototype =
                null === a
                  ? Object.create(a)
                  : ((d.prototype = a.prototype), new d());
            };
          })(),
        t = e.boundsFromPath,
        F = B.extend,
        z = B.isNumber,
        r = B.pick;
      e = (function (b) {
        function e() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.options = void 0;
          a.path = void 0;
          a.series = void 0;
          return a;
        }
        v(e, b);
        e.getProjectedPath = function (a, b) {
          a.projectedPath ||
            (b && a.geometry
              ? ((b.hasCoordinates = !0),
                (a.projectedPath = b.path(a.geometry)))
              : (a.projectedPath = a.path));
          return a.projectedPath || [];
        };
        e.prototype.applyOptions = function (a, d) {
          var e = this.series;
          a = b.prototype.applyOptions.call(this, a, d);
          d = e.joinBy;
          e.mapData &&
            e.mapMap &&
            ((d = b.prototype.getNestedProperty.call(a, d[1])),
            (e = "undefined" !== typeof d && e.mapMap[d])
              ? F(a, e)
              : (a.value = a.value || null));
          return a;
        };
        e.prototype.getProjectedBounds = function (a) {
          a = e.getProjectedPath(this, a);
          a = t(a);
          var b = this.properties;
          if (a) {
            var g = b && b["hc-middle-x"];
            b = b && b["hc-middle-y"];
            a.midX = a.x1 + (a.x2 - a.x1) * r(this.middleX, z(g) ? g : 0.5);
            g = r(this.middleY, z(b) ? b : 0.5);
            this.geometry || (g = 1 - g);
            a.midY = a.y2 - (a.y2 - a.y1) * g;
            return a;
          }
        };
        e.prototype.onMouseOver = function (a) {
          B.clearTimeout(this.colorInterval);
          if (!this.isNull || this.series.options.nullInteraction)
            b.prototype.onMouseOver.call(this, a);
          else this.series.onMouseOut(a);
        };
        e.prototype.zoomTo = function () {
          var a = this.series.chart;
          a.mapView &&
            this.bounds &&
            (a.mapView.fitToBounds(this.bounds, void 0, !1),
            (this.series.isDirty = !0),
            a.redraw());
        };
        return e;
      })(y.seriesTypes.scatter.prototype.pointClass);
      F(e.prototype, {
        dataLabelOnNull: b.pointMembers.dataLabelOnNull,
        moveToTopOnHover: b.pointMembers.moveToTopOnHover,
        isValid: b.pointMembers.isValid,
      });
      return e;
    }
  );
  I(e, "Maps/MapViewOptionsDefault.js", [], function () {
    return {
      center: [0, 0],
      maxZoom: void 0,
      padding: 0,
      projection: { name: void 0, parallels: void 0, rotation: void 0 },
      zoom: void 0,
    };
  });
  I(e, "Maps/MapViewInsetsOptionsDefault.js", [], function () {
    return {
      borderColor: "#cccccc",
      borderWidth: 1,
      center: [0, 0],
      padding: "10%",
      relativeTo: "mapBoundingBox",
      units: "percent",
    };
  });
  I(
    e,
    "Extensions/GeoJSON.js",
    [
      e["Core/Chart/Chart.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      function v(a, b) {
        b || (b = Object.keys(a.objects)[0]);
        b = a.objects[b];
        if (b["hc-decoded-geojson"]) return b["hc-decoded-geojson"];
        var d = a.arcs;
        if (a.transform) {
          var e = a.transform,
            h = e.scale,
            p = e.translate;
          d = a.arcs.map(function (a) {
            var b = 0,
              d = 0;
            return a.map(function (a) {
              a = a.slice();
              a[0] = (b += a[0]) * h[0] + p[0];
              a[1] = (d += a[1]) * h[1] + p[1];
              return a;
            });
          });
        }
        var r = function (a) {
          return "number" === typeof a[0]
            ? a.reduce(function (a, b, e) {
                var g = 0 > b ? d[~b] : d[b];
                0 > b
                  ? ((g = g.slice(0, 0 === e ? g.length : g.length - 1)),
                    g.reverse())
                  : e && (g = g.slice(1));
                return a.concat(g);
              }, [])
            : a.map(r);
        };
        e = b.geometries.map(function (a) {
          return {
            type: "Feature",
            properties: a.properties,
            geometry: { type: a.type, coordinates: a.coordinates || r(a.arcs) },
          };
        });
        a = {
          type: "FeatureCollection",
          copyright: a.copyright,
          copyrightShort: a.copyrightShort,
          copyrightUrl: a.copyrightUrl,
          features: e,
          "hc-recommended-mapview": b["hc-recommended-mapview"],
          bbox: a.bbox,
          title: a.title,
        };
        return (b["hc-decoded-geojson"] = a);
      }
      function t(a, b, e) {
        void 0 === b && (b = "map");
        var d = [];
        a = "Topology" === a.type ? v(a) : a;
        a.features.forEach(function (a) {
          var e = a.geometry || {},
            g = e.type;
          e = e.coordinates;
          a = a.properties;
          var h;
          ("map" !== b && "mapbubble" !== b) ||
          ("Polygon" !== g && "MultiPolygon" !== g)
            ? "mapline" !== b || ("LineString" !== g && "MultiLineString" !== g)
              ? "mappoint" === b &&
                "Point" === g &&
                e.length &&
                (h = { geometry: { coordinates: e, type: g } })
              : e.length && (h = { geometry: { coordinates: e, type: g } })
            : e.length && (h = { geometry: { coordinates: e, type: g } });
          h &&
            ((g = a && (a.name || a.NAME)),
            d.push(
              p(h, { name: "string" === typeof g ? g : void 0, properties: a })
            ));
        });
        e &&
          a.copyrightShort &&
          ((e.chart.mapCredits = F(e.chart.options.credits.mapText, {
            geojson: a,
          })),
          (e.chart.mapCreditsFull = F(e.chart.options.credits.mapTextFull, {
            geojson: a,
          })));
        return d;
      }
      var F = e.format,
        z = y.win,
        r = B.error,
        p = B.extend,
        h = B.merge;
      e = B.wrap;
      ("");
      b.prototype.transformFromLatLon = function (a, b) {
        var d = this.options.chart.proj4 || z.proj4;
        if (d) {
          var e = b.jsonmarginX;
          e = void 0 === e ? 0 : e;
          var h = b.jsonmarginY;
          h = void 0 === h ? 0 : h;
          var p = b.jsonres;
          p = void 0 === p ? 1 : p;
          var t = b.scale;
          t = void 0 === t ? 1 : t;
          var x = b.xoffset;
          x = void 0 === x ? 0 : x;
          var v = b.xpan;
          v = void 0 === v ? 0 : v;
          var u = b.yoffset;
          u = void 0 === u ? 0 : u;
          var l = b.ypan;
          l = void 0 === l ? 0 : l;
          a = d(b.crs, [a.lon, a.lat]);
          d = b.cosAngle || (b.rotation && Math.cos(b.rotation));
          var A = b.sinAngle || (b.rotation && Math.sin(b.rotation));
          b = b.rotation ? [a[0] * d + a[1] * A, -a[0] * A + a[1] * d] : a;
          return {
            x: ((b[0] - x) * t + v) * p + e,
            y: -(((u - b[1]) * t + l) * p - h),
          };
        }
        r(21, !1, this);
      };
      b.prototype.transformToLatLon = function (a, b) {
        var d = this.options.chart.proj4 || z.proj4;
        if (!d) r(21, !1, this);
        else if (null !== a.y) {
          var e = b.jsonmarginX,
            h = b.jsonmarginY,
            p = b.jsonres;
          p = void 0 === p ? 1 : p;
          var t = b.scale;
          t = void 0 === t ? 1 : t;
          var x = b.xoffset,
            v = b.xpan,
            u = b.yoffset,
            l = b.ypan;
          a = {
            x:
              ((a.x - (void 0 === e ? 0 : e)) / p - (void 0 === v ? 0 : v)) /
                t +
              (void 0 === x ? 0 : x),
            y:
              ((a.y - (void 0 === h ? 0 : h)) / p + (void 0 === l ? 0 : l)) /
                t +
              (void 0 === u ? 0 : u),
          };
          e = b.cosAngle || (b.rotation && Math.cos(b.rotation));
          h = b.sinAngle || (b.rotation && Math.sin(b.rotation));
          b = d(
            b.crs,
            "WGS84",
            b.rotation ? { x: a.x * e + a.y * -h, y: a.x * h + a.y * e } : a
          );
          return { lat: b.y, lon: b.x };
        }
      };
      b.prototype.fromPointToLatLon = function (a) {
        return this.mapView && this.mapView.projectedUnitsToLonLat(a);
      };
      b.prototype.fromLatLonToPoint = function (a) {
        return this.mapView && this.mapView.lonLatToProjectedUnits(a);
      };
      e(b.prototype, "addCredits", function (a, b) {
        b = h(!0, this.options.credits, b);
        this.mapCredits && (b.href = null);
        a.call(this, b);
        this.credits &&
          this.mapCreditsFull &&
          this.credits.attr({ title: this.mapCreditsFull });
      });
      y.geojson = t;
      return { geojson: t, topo2geo: v };
    }
  );
  I(e, "Core/Geometry/PolygonClip.js", [], function () {
    var b = function (b, e, t) {
        return (e[0] - b[0]) * (t[1] - b[1]) > (e[1] - b[1]) * (t[0] - b[0]);
      },
      e = function (b, e, t, y) {
        var v = [b[0] - e[0], b[1] - e[1]],
          r = [t[0] - y[0], t[1] - y[1]];
        b = b[0] * e[1] - b[1] * e[0];
        t = t[0] * y[1] - t[1] * y[0];
        y = 1 / (v[0] * r[1] - v[1] * r[0]);
        v = [(b * r[0] - t * v[0]) * y, (b * r[1] - t * v[1]) * y];
        v.isIntersection = !0;
        return v;
      },
      y;
    (function (y) {
      y.clipLineString = function (b, e) {
        var t = [];
        b = y.clipPolygon(b, e, !1);
        for (e = 1; e < b.length; e++)
          b[e].isIntersection &&
            b[e - 1].isIntersection &&
            (t.push(b.splice(0, e)), (e = 0)),
            e === b.length - 1 && t.push(b);
        return t;
      };
      y.clipPolygon = function (v, t, y) {
        void 0 === y && (y = !0);
        for (var z = t[t.length - 1], r, p, h = v, a = 0; a < t.length; a++) {
          var d = h;
          v = t[a];
          h = [];
          r = y ? d[d.length - 1] : d[0];
          for (var g = 0; g < d.length; g++)
            (p = d[g]),
              b(z, v, p)
                ? (b(z, v, r) || h.push(e(z, v, r, p)), h.push(p))
                : b(z, v, r) && h.push(e(z, v, r, p)),
              (r = p);
          z = v;
        }
        return h;
      };
    })(y || (y = {}));
    return y;
  });
  I(e, "Maps/Projections/LambertConformalConic.js", [], function () {
    var b =
        Math.sign ||
        function (b) {
          return 0 === b ? 0 : 0 < b ? 1 : -1;
        },
      e = Math.PI / 180,
      y = Math.PI / 2;
    return (function () {
      function B(v) {
        var t,
          B = (v.parallels || []).map(function (b) {
            return b * e;
          }),
          z = B[0] || 0;
        B = null !== (t = B[1]) && void 0 !== t ? t : z;
        t = Math.cos(z);
        "object" === typeof v.projectedBounds &&
          (this.projectedBounds = v.projectedBounds);
        v =
          z === B
            ? Math.sin(z)
            : Math.log(t / Math.cos(B)) /
              Math.log(Math.tan((y + B) / 2) / Math.tan((y + z) / 2));
        1e-10 > Math.abs(v) && (v = 1e-10 * (b(v) || 1));
        this.n = v;
        this.c = (t * Math.pow(Math.tan((y + z) / 2), v)) / v;
      }
      B.prototype.forward = function (b) {
        var t = b[0] * e,
          v = this.c,
          z = this.n,
          r = this.projectedBounds;
        b = b[1] * e;
        0 < v
          ? b < -y + 0.000001 && (b = -y + 0.000001)
          : b > y - 0.000001 && (b = y - 0.000001);
        var p = v / Math.pow(Math.tan((y + b) / 2), z);
        b = p * Math.sin(z * t) * 63.78137;
        t = 63.78137 * (v - p * Math.cos(z * t));
        v = [b, t];
        r && (b < r.x1 || b > r.x2 || t < r.y1 || t > r.y2) && (v.outside = !0);
        return v;
      };
      B.prototype.inverse = function (v) {
        var t = v[0] / 63.78137,
          B = this.c,
          z = this.n;
        v = B - v[1] / 63.78137;
        var r = b(z) * Math.sqrt(t * t + v * v),
          p = Math.atan2(t, Math.abs(v)) * b(v);
        0 > v * z && (p -= Math.PI * b(t) * b(v));
        return [p / z / e, (2 * Math.atan(Math.pow(B / r, 1 / z)) - y) / e];
      };
      return B;
    })();
  });
  I(e, "Maps/Projections/EqualEarth.js", [], function () {
    var b = Math.sqrt(3) / 2;
    return (function () {
      function e() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -97.52595454902263,
          y2: 97.52595454902263,
        };
      }
      e.prototype.forward = function (e) {
        var y = Math.PI / 180,
          v = Math.asin(b * Math.sin(e[1] * y)),
          t = v * v,
          F = t * t * t;
        return [
          (e[0] * y * Math.cos(v) * 74.03120656864502) /
            (b *
              (1.340264 +
                3 * -0.081106 * t +
                F * (7 * 0.000893 + 0.034164 * t))),
          74.03120656864502 *
            v *
            (1.340264 + -0.081106 * t + F * (0.000893 + 0.003796 * t)),
        ];
      };
      e.prototype.inverse = function (e) {
        var y = e[0] / 74.03120656864502;
        e = e[1] / 74.03120656864502;
        var v = 180 / Math.PI,
          t = e,
          F;
        for (F = 0; 12 > F; ++F) {
          var z = t * t;
          var r = z * z * z;
          var p =
            t * (1.340264 + -0.081106 * z + r * (0.000893 + 0.003796 * z)) - e;
          z = 1.340264 + 3 * -0.081106 * z + r * (7 * 0.000893 + 0.034164 * z);
          t -= p /= z;
          if (1e-9 > Math.abs(p)) break;
        }
        z = t * t;
        return [
          (v *
            b *
            y *
            (1.340264 +
              3 * -0.081106 * z +
              z * z * z * (7 * 0.000893 + 0.034164 * z))) /
            Math.cos(t),
          v * Math.asin(Math.sin(t) / b),
        ];
      };
      return e;
    })();
  });
  I(e, "Maps/Projections/Miller.js", [], function () {
    var b = Math.PI / 4,
      e = Math.PI / 180;
    return (function () {
      function y() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -146.91480769173063,
          y2: 146.91480769173063,
        };
      }
      y.prototype.forward = function (y) {
        return [
          y[0] * e * 63.78137,
          79.7267125 * Math.log(Math.tan(b + 0.4 * y[1] * e)),
        ];
      };
      y.prototype.inverse = function (y) {
        return [
          y[0] / 63.78137 / e,
          (2.5 * (Math.atan(Math.exp((y[1] / 63.78137) * 0.8)) - b)) / e,
        ];
      };
      return y;
    })();
  });
  I(e, "Maps/Projections/Orthographic.js", [], function () {
    var b = Math.PI / 180;
    return (function () {
      function e() {
        this.antimeridianCutting = !1;
        this.bounds = {
          x1: -63.78460826781007,
          x2: 63.78460826781007,
          y1: -63.78460826781007,
          y2: 63.78460826781007,
        };
      }
      e.prototype.forward = function (e) {
        var y = e[0];
        e = e[1] * b;
        e = [
          Math.cos(e) * Math.sin(y * b) * 63.78460826781007,
          63.78460826781007 * Math.sin(e),
        ];
        if (-90 > y || 90 < y) e.outside = !0;
        return e;
      };
      e.prototype.inverse = function (e) {
        var y = e[0] / 63.78460826781007;
        e = e[1] / 63.78460826781007;
        var v = Math.sqrt(y * y + e * e),
          t = Math.asin(v),
          F = Math.sin(t);
        return [
          Math.atan2(y * F, v * Math.cos(t)) / b,
          Math.asin(v && (e * F) / v) / b,
        ];
      };
      return e;
    })();
  });
  I(e, "Maps/Projections/WebMercator.js", [], function () {
    var b = Math.PI / 180;
    return (function () {
      function e() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -200.3750834278071,
          y2: 200.3750834278071,
        };
        this.maxLatitude = 85.0511287798;
      }
      e.prototype.forward = function (e) {
        var y = Math.sin(e[1] * b);
        y = [63.78137 * e[0] * b, (63.78137 * Math.log((1 + y) / (1 - y))) / 2];
        85.0511287798 < Math.abs(e[1]) && (y.outside = !0);
        return y;
      };
      e.prototype.inverse = function (e) {
        return [
          e[0] / (63.78137 * b),
          (2 * Math.atan(Math.exp(e[1] / 63.78137)) - Math.PI / 2) / b,
        ];
      };
      return e;
    })();
  });
  I(
    e,
    "Maps/Projections/ProjectionRegistry.js",
    [
      e["Maps/Projections/LambertConformalConic.js"],
      e["Maps/Projections/EqualEarth.js"],
      e["Maps/Projections/Miller.js"],
      e["Maps/Projections/Orthographic.js"],
      e["Maps/Projections/WebMercator.js"],
    ],
    function (b, e, y, B, v) {
      return {
        EqualEarth: e,
        LambertConformalConic: b,
        Miller: y,
        Orthographic: B,
        WebMercator: v,
      };
    }
  );
  I(
    e,
    "Maps/Projection.js",
    [
      e["Core/Geometry/PolygonClip.js"],
      e["Maps/Projections/ProjectionRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B =
          (this && this.__spreadArray) ||
          function (b, a, d) {
            if (d || 2 === arguments.length)
              for (var e = 0, h = a.length, n; e < h; e++)
                (!n && e in a) ||
                  (n || (n = Array.prototype.slice.call(a, 0, e)),
                  (n[e] = a[e]));
            return b.concat(n || Array.prototype.slice.call(a));
          },
        v = b.clipLineString,
        t = b.clipPolygon,
        F = y.clamp,
        z = y.erase,
        r = (2 * Math.PI) / 360,
        p = function (b) {
          -180 > b && (b += 360);
          180 < b && (b -= 360);
          return b;
        };
      return (function () {
        function b(a) {
          void 0 === a && (a = {});
          this.hasGeoProjection = this.hasCoordinates = !1;
          this.maxLatitude = 90;
          this.options = a;
          var d = a.name,
            e = a.projectedBounds,
            h = a.rotation;
          this.rotator = h ? this.getRotator(h) : void 0;
          if ((d = d ? b.registry[d] : void 0)) this.def = new d(a);
          var n = this.def,
            p = this.rotator;
          n &&
            ((this.maxLatitude = n.maxLatitude || 90),
            (this.hasGeoProjection = !0));
          p && n
            ? ((this.forward = function (a) {
                return n.forward(p.forward(a));
              }),
              (this.inverse = function (a) {
                return p.inverse(n.inverse(a));
              }))
            : n
            ? ((this.forward = function (a) {
                return n.forward(a);
              }),
              (this.inverse = function (a) {
                return n.inverse(a);
              }))
            : p && ((this.forward = p.forward), (this.inverse = p.inverse));
          this.bounds = "world" === e ? n && n.bounds : e;
        }
        b.add = function (a, d) {
          b.registry[a] = d;
        };
        b.greatCircle = function (a, b, e) {
          var d = Math.atan2,
            g = Math.cos,
            h = Math.sin,
            p = Math.sqrt,
            x = a[1] * r,
            t = a[0] * r,
            u = b[1] * r,
            l = b[0] * r,
            A = u - x,
            f = l - t;
          A = h(A / 2) * h(A / 2) + g(x) * g(u) * h(f / 2) * h(f / 2);
          A = 2 * d(p(A), p(1 - A));
          var w = Math.round((6371e3 * A) / 5e5);
          f = [];
          e && f.push(a);
          if (1 < w)
            for (w = a = 1 / w; 0.999 > w; w += a) {
              var k = h((1 - w) * A) / h(A),
                v = h(w * A) / h(A),
                c = k * g(x) * g(t) + v * g(u) * g(l),
                q = k * g(x) * h(t) + v * g(u) * h(l);
              k = k * h(x) + v * h(u);
              k = d(k, p(c * c + q * q));
              c = d(q, c);
              f.push([c / r, k / r]);
            }
          e && f.push(b);
          return f;
        };
        b.insertGreatCircles = function (a) {
          for (var d = a.length - 1; d--; )
            if (
              10 <
              Math.max(
                Math.abs(a[d][0] - a[d + 1][0]),
                Math.abs(a[d][1] - a[d + 1][1])
              )
            ) {
              var e = b.greatCircle(a[d], a[d + 1]);
              e.length && a.splice.apply(a, B([d + 1, 0], e, !1));
            }
        };
        b.toString = function (a) {
          a = a || {};
          var b = a.rotation;
          return [a.name, b && b.join(",")].join(";");
        };
        b.prototype.lineIntersectsBounds = function (a) {
          var b = this.bounds || {},
            e = b.x2,
            h = b.y1,
            n = b.y2,
            p = function (a, b, d) {
              var e = a[0];
              a = a[1];
              var g = b ? 0 : 1;
              if ("number" === typeof d && e[b] >= d !== a[b] >= d)
                return (
                  (e = e[g] + ((d - e[b]) / (a[b] - e[b])) * (a[g] - e[g])),
                  b ? [e, d] : [d, e]
                );
            },
            r = a[0];
          if ((b = p(a, 0, b.x1))) (r = b), (a[1] = b);
          else if ((b = p(a, 0, e))) (r = b), (a[1] = b);
          if ((b = p(a, 1, h))) r = b;
          else if ((b = p(a, 1, n))) r = b;
          return r;
        };
        b.prototype.getRotator = function (a) {
          var b = a[0] * r,
            e = (a[1] || 0) * r;
          a = (a[2] || 0) * r;
          var h = Math.cos(e),
            n = Math.sin(e),
            p = Math.cos(a),
            t = Math.sin(a);
          if (0 !== b || 0 !== e || 0 !== a)
            return {
              forward: function (a) {
                var d = a[0] * r + b,
                  e = a[1] * r,
                  g = Math.cos(e);
                a = Math.cos(d) * g;
                d = Math.sin(d) * g;
                e = Math.sin(e);
                g = e * h + a * n;
                return [
                  Math.atan2(d * p - g * t, a * h - e * n) / r,
                  Math.asin(g * p + d * t) / r,
                ];
              },
              inverse: function (a) {
                var d = a[0] * r,
                  e = a[1] * r,
                  g = Math.cos(e);
                a = Math.cos(d) * g;
                d = Math.sin(d) * g;
                e = Math.sin(e);
                g = e * p - d * t;
                return [
                  (Math.atan2(d * p + e * t, a * h + g * n) - b) / r,
                  Math.asin(g * h - a * n) / r,
                ];
              },
            };
        };
        b.prototype.forward = function (a) {
          return a;
        };
        b.prototype.inverse = function (a) {
          return a;
        };
        b.prototype.cutOnAntimeridian = function (a, d) {
          var e = [],
            h = [a];
          a.forEach(function (b, g) {
            var f = a[g - 1];
            if (!g) {
              if (!d) return;
              f = a[a.length - 1];
            }
            var h = f[0],
              c = b[0];
            (-90 > h || 90 < h) &&
              (-90 > c || 90 < c) &&
              0 < h !== 0 < c &&
              ((c = F(
                (180 - ((h + 360) % 360)) /
                  (((c + 360) % 360) - ((h + 360) % 360)),
                0,
                1
              )),
              e.push({
                i: g,
                lat: f[1] + c * (b[1] - f[1]),
                direction: 0 > h ? 1 : -1,
                previousLonLat: f,
                lonLat: b,
              }));
          });
          if (e.length)
            if (d) {
              if (1 === e.length % 2) {
                var n = e.slice().sort(function (a, b) {
                  return Math.abs(b.lat) - Math.abs(a.lat);
                })[0];
                z(e, n);
              }
              for (var r = e.length - 2; 0 <= r; ) {
                var t = e[r].i,
                  x = p(180 + 0.000001 * e[r].direction),
                  v = p(180 - 0.000001 * e[r].direction);
                t = a.splice.apply(
                  a,
                  B(
                    [t, e[r + 1].i - t],
                    b.greatCircle([x, e[r].lat], [x, e[r + 1].lat], !0),
                    !1
                  )
                );
                t.push.apply(
                  t,
                  b.greatCircle([v, e[r + 1].lat], [v, e[r].lat], !0)
                );
                h.push(t);
                r -= 2;
              }
              if (n)
                for (x = 0; x < h.length; x++) {
                  r = n.direction;
                  var u = n.lat;
                  v = h[x];
                  t = v.indexOf(n.lonLat);
                  if (-1 < t) {
                    x = (0 > u ? -1 : 1) * this.maxLatitude;
                    var l = p(180 + 0.000001 * r),
                      A = p(180 - 0.000001 * r);
                    u = b.greatCircle([l, u], [l, x], !0);
                    for (l += 120 * r; -180 < l && 180 > l; l += 120 * r)
                      u.push([l, x]);
                    u.push.apply(u, b.greatCircle([A, x], [A, n.lat], !0));
                    v.splice.apply(v, B([t, 0], u, !1));
                    break;
                  }
                }
            } else
              for (r = e.length; r--; )
                (t = e[r].i),
                  (t = a.splice(t, a.length, [
                    p(180 + 0.000001 * e[r].direction),
                    e[r].lat,
                  ])),
                  t.unshift([p(180 - 0.000001 * e[r].direction), e[r].lat]),
                  h.push(t);
          return h;
        };
        b.prototype.path = function (a) {
          var d = this,
            e = this.bounds,
            h = this.def,
            n = this.rotator,
            p = [],
            r = "Polygon" === a.type || "MultiPolygon" === a.type,
            x = this.hasGeoProjection,
            z = !h || !1 !== h.antimeridianCutting,
            u = z ? n : void 0,
            l = z ? h || this : this,
            A;
          e &&
            (A = [
              [e.x1, e.y1],
              [e.x2, e.y1],
              [e.x2, e.y2],
              [e.x1, e.y2],
            ]);
          var f = function (a) {
            a = a.map(function (a) {
              if (z) {
                u && (a = u.forward(a));
                var b = a[0];
                0.000001 > Math.abs(b - 180) &&
                  (b = 180 > b ? 179.999999 : 180.000001);
                a = [b, a[1]];
              }
              return a;
            });
            var f = [a];
            x &&
              (b.insertGreatCircles(a), z && (f = d.cutOnAntimeridian(a, r)));
            f.forEach(function (a) {
              if (!(2 > a.length)) {
                var c = !1,
                  d = !1,
                  f = function (a) {
                    c
                      ? p.push(["L", a[0], a[1]])
                      : (p.push(["M", a[0], a[1]]), (c = !0));
                  },
                  g = !1,
                  h = !1,
                  k = a.map(function (a) {
                    a = l.forward(a);
                    a.outside ? (g = !0) : (h = !0);
                    Infinity === a[1]
                      ? (a[1] = 1e10)
                      : -Infinity === a[1] && (a[1] = -1e10);
                    return a;
                  });
                if (z) {
                  r && k.push(k[0]);
                  if (g) {
                    if (!h) return;
                    if (A)
                      if (r) k = t(k, A);
                      else if (e) {
                        v(k, A).forEach(function (a) {
                          c = !1;
                          a.forEach(f);
                        });
                        return;
                      }
                  }
                  k.forEach(f);
                } else
                  for (var m = 0; m < k.length; m++) {
                    var n = a[m],
                      u = k[m];
                    if (u.outside) d = !0;
                    else {
                      if (r && !w) {
                        var w = n;
                        a.push(n);
                        k.push(u);
                      }
                      d &&
                        D &&
                        (r && x
                          ? b.greatCircle(D, n).forEach(function (a) {
                              return f(l.forward(a));
                            })
                          : (c = !1));
                      f(u);
                      var D = n;
                      d = !1;
                    }
                  }
              }
            });
          };
          "LineString" === a.type
            ? f(a.coordinates)
            : "MultiLineString" === a.type
            ? a.coordinates.forEach(function (a) {
                return f(a);
              })
            : "Polygon" === a.type
            ? (a.coordinates.forEach(function (a) {
                return f(a);
              }),
              p.length && p.push(["Z"]))
            : "MultiPolygon" === a.type &&
              (a.coordinates.forEach(function (a) {
                a.forEach(function (a) {
                  return f(a);
                });
              }),
              p.length && p.push(["Z"]));
          return p;
        };
        b.registry = e;
        return b;
      })();
    }
  );
  I(
    e,
    "Maps/MapView.js",
    [
      e["Maps/MapViewOptionsDefault.js"],
      e["Maps/MapViewInsetsOptionsDefault.js"],
      e["Extensions/GeoJSON.js"],
      e["Core/Chart/MapChart.js"],
      e["Maps/MapUtilities.js"],
      e["Maps/Projection.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F) {
      var z =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function c() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((c.prototype = d.prototype), new c());
            };
          })(),
        r =
          (this && this.__spreadArray) ||
          function (a, b, d) {
            if (d || 2 === arguments.length)
              for (var c = 0, f = b.length, e; c < f; c++)
                (!e && c in b) ||
                  (e || (e = Array.prototype.slice.call(b, 0, c)),
                  (e[c] = b[c]));
            return a.concat(e || Array.prototype.slice.call(b));
          },
        p = y.topo2geo,
        h = B.maps,
        a = v.boundsFromPath,
        d = v.pointInPolygon,
        g = F.addEvent,
        m = F.clamp,
        n = F.fireEvent,
        G = F.isArray,
        J = F.isNumber,
        x = F.isObject,
        C = F.isString,
        u = F.merge,
        l = F.pick,
        A = F.relativeLength,
        f = function (a, b) {
          return (
            Math.log(
              400.979322 /
                Math.max(
                  (a.x2 - a.x1) / (b.width / 256),
                  (a.y2 - a.y1) / (b.height / 256)
                )
            ) / Math.log(2)
          );
        },
        w = (function () {
          function a(c, d) {
            var f = this;
            this.insets = [];
            this.padding = [0, 0, 0, 0];
            this.eventsToUnbind = [];
            var e;
            if (!(this instanceof k)) {
              var h = r(
                  [c.options.chart.map],
                  (c.options.series || []).map(function (a) {
                    return a.mapData;
                  }),
                  !0
                ).map(function (a) {
                  return f.getGeoMap(a);
                }),
                l = [];
              h.forEach(function (a) {
                a &&
                  (e || (e = a["hc-recommended-mapview"]),
                  a.bbox &&
                    ((a = a.bbox),
                    l.push({ x1: a[0], y1: a[1], x2: a[2], y2: a[3] })));
              });
              var m = l.length && a.compositeBounds(l);
              if (m) {
                var q = m.x1;
                var n = m.y1,
                  p = m.x2;
                m = m.y2;
                q =
                  180 < p - q && 90 < m - n
                    ? { name: "EqualEarth" }
                    : {
                        name: "LambertConformalConic",
                        parallels: [n, m],
                        rotation: [-(q + p) / 2],
                      };
              }
              this.geoMap = h[0];
            }
            this.userOptions = d || {};
            h = u(b, { projection: q }, e, d);
            m = e && e.insets;
            d = d && d.insets;
            m && d && (h.insets = a.mergeInsets(m, d));
            this.chart = c;
            this.center = h.center;
            this.options = h;
            this.projection = new t(h.projection);
            this.playingField = c.plotBox;
            this.zoom = h.zoom || 0;
            this.createInsets();
            this.eventsToUnbind.push(
              g(c, "afterSetChartSize", function () {
                f.playingField = f.getField();
                if (void 0 === f.minZoom || f.minZoom === f.zoom)
                  f.fitToBounds(void 0, void 0, !1),
                    !f.chart.hasRendered &&
                      J(f.userOptions.zoom) &&
                      (f.zoom = f.userOptions.zoom),
                    f.userOptions.center &&
                      u(!0, f.center, f.userOptions.center);
              })
            );
            this.setUpEvents();
          }
          a.mergeInsets = function (a, b) {
            var c = function (a) {
                var b = {};
                a.forEach(function (a, c) {
                  b[(a && a.id) || "i".concat(c)] = a;
                });
                return b;
              },
              d = u(c(a), c(b));
            return Object.keys(d).map(function (a) {
              return d[a];
            });
          };
          a.prototype.createInsets = function () {
            var a = this,
              b = this.options,
              d = b.insets;
            d &&
              d.forEach(function (c) {
                c = new k(a, u(b.insetOptions, c));
                a.insets.push(c);
              });
          };
          a.prototype.fitToBounds = function (a, b, d, e) {
            void 0 === d && (d = !0);
            var c = a || this.getProjectedBounds();
            if (c) {
              var g = l(b, a ? 0 : this.options.padding);
              b = this.getField(!1);
              g = G(g) ? g : [g, g, g, g];
              this.padding = [
                A(g[0], b.height),
                A(g[1], b.width),
                A(g[2], b.height),
                A(g[3], b.width),
              ];
              this.playingField = this.getField();
              b = f(c, this.playingField);
              a || (this.minZoom = b);
              a = this.projection.inverse([
                (c.x2 + c.x1) / 2,
                (c.y2 + c.y1) / 2,
              ]);
              this.setView(a, b, d, e);
            }
          };
          a.prototype.getField = function (a) {
            void 0 === a && (a = !0);
            a = a ? this.padding : [0, 0, 0, 0];
            return {
              x: a[3],
              y: a[0],
              width: this.chart.plotWidth - a[1] - a[3],
              height: this.chart.plotHeight - a[0] - a[2],
            };
          };
          a.prototype.getGeoMap = function (a) {
            if (C(a)) return h[a];
            if (x(a, !0)) {
              if ("FeatureCollection" === a.type) return a;
              if ("Topology" === a.type) return p(a);
            }
          };
          a.prototype.getMapBBox = function () {
            var a = this.getProjectedBounds(),
              b = this.getScale();
            if (a) {
              var d = this.padding,
                f = this.projectedUnitsToPixels({ x: a.x1, y: a.y2 });
              return {
                width: (a.x2 - a.x1) * b + d[1] + d[3],
                height: (a.y2 - a.y1) * b + d[0] + d[2],
                x: f.x - d[3],
                y: f.y - d[0],
              };
            }
          };
          a.prototype.getProjectedBounds = function () {
            var b = this.chart.series.reduce(function (a, b) {
              var c = b.getProjectedBounds && b.getProjectedBounds();
              c && !1 !== b.options.affectsMapView && a.push(c);
              return a;
            }, []);
            return this.projection.bounds || a.compositeBounds(b);
          };
          a.prototype.getScale = function () {
            return (256 / 400.979322) * Math.pow(2, this.zoom);
          };
          a.prototype.getSVGTransform = function () {
            var a = this.playingField,
              b = a.x,
              d = a.y,
              f = a.width;
            a = a.height;
            var e = this.projection.forward(this.center),
              g = this.projection.hasCoordinates ? -1 : 1,
              h = this.getScale();
            g *= h;
            return {
              scaleX: h,
              scaleY: g,
              translateX: b + f / 2 - e[0] * h,
              translateY: d + a / 2 - e[1] * g,
            };
          };
          a.prototype.lonLatToPixels = function (a) {
            if ((a = this.lonLatToProjectedUnits(a)))
              return this.projectedUnitsToPixels(a);
          };
          a.prototype.lonLatToProjectedUnits = function (a) {
            var b = this.chart,
              c = b.mapTransforms;
            if (c) {
              for (var f in c)
                if (Object.hasOwnProperty.call(c, f) && c[f].hitZone) {
                  var e = b.transformFromLatLon(a, c[f]);
                  if (e && d(e, c[f].hitZone.coordinates[0])) return e;
                }
              return b.transformFromLatLon(a, c["default"]);
            }
            c = 0;
            for (f = this.insets; c < f.length; c++)
              if (
                ((b = f[c]),
                b.options.geoBounds &&
                  d({ x: a.lon, y: a.lat }, b.options.geoBounds.coordinates[0]))
              )
                return (
                  (a = b.projection.forward([a.lon, a.lat])),
                  (a = b.projectedUnitsToPixels({ x: a[0], y: a[1] })),
                  this.pixelsToProjectedUnits(a)
                );
            a = this.projection.forward([a.lon, a.lat]);
            if (!a.outside) return { x: a[0], y: a[1] };
          };
          a.prototype.projectedUnitsToLonLat = function (a) {
            var b = this.chart,
              c = b.mapTransforms;
            if (c) {
              for (var f in c)
                if (
                  Object.hasOwnProperty.call(c, f) &&
                  c[f].hitZone &&
                  d(a, c[f].hitZone.coordinates[0])
                )
                  return b.transformToLatLon(a, c[f]);
              return b.transformToLatLon(a, c["default"]);
            }
            c = this.projectedUnitsToPixels(a);
            f = 0;
            for (var e = this.insets; f < e.length; f++)
              if (((b = e[f]), b.hitZone && d(c, b.hitZone.coordinates[0])))
                return (
                  (a = b.pixelsToProjectedUnits(c)),
                  (a = b.projection.inverse([a.x, a.y])),
                  { lon: a[0], lat: a[1] }
                );
            a = this.projection.inverse([a.x, a.y]);
            return { lon: a[0], lat: a[1] };
          };
          a.prototype.redraw = function (a) {
            this.chart.series.forEach(function (a) {
              a.useMapGeometry && (a.isDirty = !0);
            });
            this.chart.redraw(a);
          };
          a.prototype.setView = function (a, b, d, f) {
            void 0 === d && (d = !0);
            a && (this.center = a);
            "number" === typeof b &&
              ("number" === typeof this.minZoom &&
                (b = Math.max(b, this.minZoom)),
              "number" === typeof this.options.maxZoom &&
                (b = Math.min(b, this.options.maxZoom)),
              J(b) && (this.zoom = b));
            var c = this.getProjectedBounds();
            if (c) {
              a = this.projection.forward(this.center);
              var e = this.playingField;
              b = e.x;
              var g = e.y,
                h = e.width;
              e = e.height;
              var k = this.getScale(),
                m = this.projectedUnitsToPixels({ x: c.x1, y: c.y1 }),
                l = this.projectedUnitsToPixels({ x: c.x2, y: c.y2 });
              c = [(c.x1 + c.x2) / 2, (c.y1 + c.y2) / 2];
              var q = m.x,
                p = l.y;
              l = l.x;
              m = m.y;
              l - q < h
                ? (a[0] = c[0])
                : q < b && l < b + h
                ? (a[0] += Math.max(q - b, l - h - b) / k)
                : l > b + h &&
                  q > b &&
                  (a[0] += Math.min(l - h - b, q - b) / k);
              m - p < e
                ? (a[1] = c[1])
                : p < g && m < g + e
                ? (a[1] -= Math.max(p - g, m - e - g) / k)
                : m > g + e &&
                  p > g &&
                  (a[1] -= Math.min(m - e - g, p - g) / k);
              this.center = this.projection.inverse(a);
              this.insets.forEach(function (a) {
                a.options.field &&
                  ((a.hitZone = a.getHitZone()),
                  (a.playingField = a.getField()));
              });
              this.render();
            }
            n(this, "afterSetView");
            d && this.redraw(f);
          };
          a.prototype.projectedUnitsToPixels = function (a) {
            var b = this.getScale(),
              c = this.projection.forward(this.center),
              d = this.playingField;
            return {
              x: d.x + d.width / 2 - b * (c[0] - a.x),
              y: d.y + d.height / 2 + b * (c[1] - a.y),
            };
          };
          a.prototype.pixelsToLonLat = function (a) {
            return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(a));
          };
          a.prototype.pixelsToProjectedUnits = function (a) {
            var b = a.x;
            a = a.y;
            var c = this.getScale(),
              d = this.projection.forward(this.center),
              f = this.playingField;
            return {
              x: d[0] + (b - (f.x + f.width / 2)) / c,
              y: d[1] - (a - (f.y + f.height / 2)) / c,
            };
          };
          a.prototype.setUpEvents = function () {
            var a = this,
              b = this.chart,
              d,
              e,
              h,
              k = function (c) {
                var g = b.pointer.pinchDown,
                  k = a.projection,
                  l = b.mouseDownX,
                  n = b.mouseDownY;
                1 === g.length && ((l = g[0].chartX), (n = g[0].chartY));
                if ("number" === typeof l && "number" === typeof n) {
                  var q = "" + l + ",".concat(n),
                    p = c.originalEvent;
                  g = p.chartX;
                  p = p.chartY;
                  q !== e &&
                    ((e = q),
                    (d = a.projection.forward(a.center)),
                    (h = (a.projection.options.rotation || [0, 0]).slice()));
                  q =
                    ((q = k.def && k.def.bounds) && f(q, a.playingField)) ||
                    -Infinity;
                  "Orthographic" === k.options.name &&
                  (a.minZoom || Infinity) < 1.1 * q
                    ? ((k =
                        440 /
                        (a.getScale() * Math.min(b.plotWidth, b.plotHeight))),
                      h &&
                        ((l = (l - g) * k - h[0]),
                        (n = m(-h[1] - (n - p) * k, -80, 80)),
                        (g = a.zoom),
                        a.update({ projection: { rotation: [-l, -n] } }, !1),
                        (a.zoom = g),
                        b.redraw(!1)))
                    : ((k = a.getScale()),
                      (n = a.projection.inverse([
                        d[0] + (l - g) / k,
                        d[1] - (n - p) / k,
                      ])),
                      a.setView(n, void 0, !0, !1));
                  c.preventDefault();
                }
              };
            g(b, "pan", k);
            g(b, "touchpan", k);
            g(b, "selection", function (c) {
              if (c.resetSelection) a.zoomBy();
              else {
                var d = c.x - b.plotLeft,
                  f = c.y - b.plotTop,
                  e = a.pixelsToProjectedUnits({ x: d, y: f }),
                  g = e.y;
                e = e.x;
                d = a.pixelsToProjectedUnits({
                  x: d + c.width,
                  y: f + c.height,
                });
                a.fitToBounds(
                  { x1: e, y1: g, x2: d.x, y2: d.y },
                  void 0,
                  !0,
                  c.originalEvent.touches ? !1 : void 0
                );
                /^touch/.test(c.originalEvent.type) || b.showResetZoom();
                c.preventDefault();
              }
            });
          };
          a.prototype.render = function () {
            this.group ||
              (this.group = this.chart.renderer
                .g("map-view")
                .attr({ zIndex: 4 })
                .add());
          };
          a.prototype.update = function (a, b, d) {
            void 0 === b && (b = !0);
            var c = a.projection;
            c = c && t.toString(c) !== t.toString(this.options.projection);
            var f = !1;
            u(!0, this.userOptions, a);
            u(!0, this.options, a);
            "insets" in a &&
              (this.insets.forEach(function (a) {
                return a.destroy();
              }),
              (this.insets.length = 0),
              (f = !0));
            if (c || f)
              this.chart.series.forEach(function (a) {
                var b = a.transformGroups;
                a.clearBounds && a.clearBounds();
                a.isDirty = !0;
                a.isDirtyData = !0;
                if (f && b) for (; 1 < b.length; ) (a = b.pop()) && a.destroy();
              }),
                c && (this.projection = new t(this.options.projection)),
                f && this.createInsets(),
                a.center || J(a.zoom) || this.fitToBounds(void 0, void 0, !1);
            (a.center || J(a.zoom)) &&
              this.setView(this.options.center, a.zoom, !1);
            b && this.chart.redraw(d);
          };
          a.prototype.zoomBy = function (a, b, d, f) {
            var c = this.chart,
              e = this.projection.forward(this.center);
            b = b ? this.projection.forward(b) : [];
            var g = b[0],
              h = b[1];
            "number" === typeof a
              ? ((a = this.zoom + a),
                (b = void 0),
                d &&
                  ((g = d[0]),
                  (h = d[1]),
                  (d = this.getScale()),
                  (g = g - c.plotLeft - c.plotWidth / 2),
                  (c = h - c.plotTop - c.plotHeight / 2),
                  (g = e[0] + g / d),
                  (h = e[1] + c / d)),
                "number" === typeof g &&
                  "number" === typeof h &&
                  ((d = 1 - Math.pow(2, this.zoom) / Math.pow(2, a)),
                  (g = e[0] - g),
                  (c = e[1] - h),
                  (e[0] -= g * d),
                  (e[1] += c * d),
                  (b = this.projection.inverse(e))),
                this.setView(b, a, void 0, f))
              : this.fitToBounds(void 0, void 0, void 0, f);
          };
          a.compositeBounds = function (a) {
            if (a.length)
              return a.slice(1).reduce(function (a, b) {
                a.x1 = Math.min(a.x1, b.x1);
                a.y1 = Math.min(a.y1, b.y1);
                a.x2 = Math.max(a.x2, b.x2);
                a.y2 = Math.max(a.y2, b.y2);
                return a;
              }, u(a[0]));
          };
          return a;
        })(),
        k = (function (b) {
          function c(c, d) {
            var f = b.call(this, c.chart, d) || this;
            f.id = d.id;
            f.mapView = c;
            f.options = u(e, d);
            f.allBounds = [];
            f.options.geoBounds &&
              ((c = c.projection.path(f.options.geoBounds)),
              (f.geoBoundsProjectedBox = a(c)),
              (f.geoBoundsProjectedPolygon = c.map(function (a) {
                return [a[1] || 0, a[2] || 0];
              })));
            return f;
          }
          z(c, b);
          c.prototype.getField = function (a) {
            void 0 === a && (a = !0);
            var c = this.hitZone;
            if (c) {
              var d = a ? this.padding : [0, 0, 0, 0];
              c = c.coordinates[0];
              var f = c.map(function (a) {
                  return a[0];
                }),
                e = c.map(function (a) {
                  return a[1];
                });
              c = Math.min.apply(0, f) + d[3];
              f = Math.max.apply(0, f) - d[1];
              var g = Math.min.apply(0, e) + d[0];
              d = Math.max.apply(0, e) - d[2];
              if (J(c) && J(g))
                return { x: c, y: g, width: f - c, height: d - g };
            }
            return b.prototype.getField.call(this, a);
          };
          c.prototype.getHitZone = function () {
            var a = this.chart,
              b = this.mapView,
              c = this.options,
              d = (c.field || {}).coordinates;
            if (d) {
              d = d[0];
              if ("percent" === c.units) {
                var f =
                  ("mapBoundingBox" === c.relativeTo && b.getMapBBox()) ||
                  u(a.plotBox, { x: 0, y: 0 });
                d = d.map(function (a) {
                  return [
                    A("" + a[0] + "%", f.width, f.x),
                    A("" + a[1] + "%", f.height, f.y),
                  ];
                });
              }
              return { type: "Polygon", coordinates: [d] };
            }
          };
          c.prototype.getProjectedBounds = function () {
            return w.compositeBounds(this.allBounds);
          };
          c.prototype.isInside = function (a) {
            var b = this.geoBoundsProjectedBox,
              c = this.geoBoundsProjectedPolygon;
            return !!(
              b &&
              a.x >= b.x1 &&
              a.x <= b.x2 &&
              a.y >= b.y1 &&
              a.y <= b.y2 &&
              c &&
              d(a, c)
            );
          };
          c.prototype.render = function () {
            var a = this.chart,
              b = this.mapView,
              c = this.options,
              d = c.borderPath || c.field;
            if (d && b.group) {
              var f = !0;
              this.border ||
                ((this.border = a.renderer
                  .path()
                  .addClass("highcharts-mapview-inset-border")
                  .add(b.group)),
                (f = !1));
              a.styledMode ||
                this.border.attr({
                  stroke: c.borderColor,
                  "stroke-width": c.borderWidth,
                });
              var e = (Math.round(this.border.strokeWidth()) % 2) / 2,
                g =
                  ("mapBoundingBox" === c.relativeTo && b.getMapBBox()) ||
                  b.playingField;
              b = (d.coordinates || []).reduce(function (b, d) {
                return d.reduce(function (b, d, f) {
                  var h = d[0];
                  d = d[1];
                  "percent" === c.units &&
                    ((h = a.plotLeft + A("" + h + "%", g.width, g.x)),
                    (d = a.plotTop + A("" + d + "%", g.height, g.y)));
                  h = Math.floor(h) + e;
                  d = Math.floor(d) + e;
                  b.push(0 === f ? ["M", h, d] : ["L", h, d]);
                  return b;
                }, b);
              }, []);
              this.border[f ? "animate" : "attr"]({ d: b });
            }
          };
          c.prototype.destroy = function () {
            this.border && (this.border = this.border.destroy());
            this.eventsToUnbind.forEach(function (a) {
              return a();
            });
          };
          c.prototype.setUpEvents = function () {};
          return c;
        })(w);
      g(B, "afterInit", function () {
        this.mapView = new w(this, this.options.mapView);
      });
      return w;
    }
  );
  I(
    e,
    "Series/Map/MapSeries.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Series/ColorMapComposition.js"],
      e["Series/CenteredUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Core/Chart/MapChart.js"],
      e["Series/Map/MapPoint.js"],
      e["Maps/MapView.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F, z, r, p, h, a) {
      var d =
          (this && this.__extends) ||
          (function () {
            var a = function (b, c) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                };
              return a(b, c);
            };
            return function (b, c) {
              function d() {
                this.constructor = b;
              }
              a(b, c);
              b.prototype =
                null === c
                  ? Object.create(c)
                  : ((d.prototype = c.prototype), new d());
            };
          })(),
        g = b.animObject;
      b = B.noop;
      var m = t.splitPath;
      t = p.seriesTypes;
      var n = t.column,
        G = t.scatter;
      t = a.extend;
      var J = a.find,
        x = a.fireEvent,
        C = a.getNestedProperty,
        u = a.isArray,
        l = a.isNumber,
        A = a.isObject,
        f = a.merge,
        w = a.objectEach,
        k = a.pick,
        D = a.splat;
      a = (function (a) {
        function b() {
          var b = (null !== a && a.apply(this, arguments)) || this;
          b.chart = void 0;
          b.data = void 0;
          b.group = void 0;
          b.joinBy = void 0;
          b.options = void 0;
          b.points = void 0;
          b.processedData = [];
          return b;
        }
        d(b, a);
        b.prototype.animate = function (a) {
          var b = this.chart,
            c = this.group,
            d = g(this.options.animation);
          b.renderer.isSVG &&
            (a
              ? c.attr({
                  translateX: b.plotLeft + b.plotWidth / 2,
                  translateY: b.plotTop + b.plotHeight / 2,
                  scaleX: 0.001,
                  scaleY: 0.001,
                })
              : c.animate(
                  {
                    translateX: b.plotLeft,
                    translateY: b.plotTop,
                    scaleX: 1,
                    scaleY: 1,
                  },
                  d
                ));
        };
        b.prototype.animateDrilldown = function (a) {
          var b = this.chart,
            c = this.group;
          b.renderer.isSVG &&
            (a
              ? c.attr({
                  translateX: b.plotLeft + b.plotWidth / 2,
                  translateY: b.plotTop + b.plotHeight / 2,
                  scaleX: 0.1,
                  scaleY: 0.1,
                  opacity: 0.01,
                })
              : (c.animate(
                  {
                    translateX: b.plotLeft,
                    translateY: b.plotTop,
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 1,
                  },
                  this.chart.options.drilldown.animation
                ),
                b.drilldown && b.drilldown.fadeInGroup(this.dataLabelsGroup)));
        };
        b.prototype.animateDrillupFrom = function () {
          var a = this.chart;
          a.renderer.isSVG &&
            this.group.animate({
              translateX: a.plotLeft + a.plotWidth / 2,
              translateY: a.plotTop + a.plotHeight / 2,
              scaleX: 0.1,
              scaleY: 0.1,
              opacity: 0.01,
            });
        };
        b.prototype.animateDrillupTo = function (a) {
          n.prototype.animateDrillupTo.call(this, a);
        };
        b.prototype.clearBounds = function () {
          this.points.forEach(function (a) {
            delete a.bounds;
            delete a.insetIndex;
            delete a.projectedPath;
          });
          delete this.bounds;
        };
        b.prototype.doFullTranslate = function () {
          return !(
            !(
              this.isDirtyData ||
              this.chart.isResizing ||
              this.chart.renderer.isVML
            ) && this.hasRendered
          );
        };
        b.prototype.drawMapDataLabels = function () {
          r.prototype.drawDataLabels.call(this);
          this.dataLabelsGroup &&
            this.dataLabelsGroup.clip(this.chart.clipRect);
        };
        b.prototype.drawPoints = function () {
          var a = this,
            b = this,
            c = this.chart,
            d = this.group,
            f = this.transformGroups,
            e = void 0 === f ? [] : f,
            g = c.mapView,
            h = c.renderer;
          g &&
            ((this.transformGroups = e),
            e[0] || (e[0] = h.g().add(d)),
            g.insets.forEach(function (a, b) {
              e[b + 1] || e.push(h.g().add(d));
            }),
            this.doFullTranslate() &&
              (this.points.forEach(function (b) {
                var d = b.graphic,
                  f = b.shapeArgs;
                b.group =
                  e["number" === typeof b.insetIndex ? b.insetIndex + 1 : 0];
                d && d.parentGroup !== b.group && d.add(b.group);
                f &&
                  c.hasRendered &&
                  !c.styledMode &&
                  (f.fill = a.pointAttribs(b, b.state).fill);
              }),
              n.prototype.drawPoints.apply(this),
              this.points.forEach(function (d) {
                var f = d.graphic;
                if (f) {
                  var e = f.animate,
                    g = "";
                  d.name &&
                    (g +=
                      "highcharts-name-" +
                      d.name.replace(/ /g, "-").toLowerCase());
                  d.properties &&
                    d.properties["hc-key"] &&
                    (g +=
                      " highcharts-key-" +
                      d.properties["hc-key"].toString().toLowerCase());
                  g && f.addClass(g);
                  c.styledMode &&
                    f.css(
                      a.pointAttribs(d, (d.selected && "select") || void 0)
                    );
                  f.animate = function (a, d, g) {
                    var h = !1;
                    if (a["stroke-width"]) {
                      var l =
                        k(b.getStrokeWidth(b.options), 1) /
                        ((c.mapView && c.mapView.getScale()) || 1);
                      "inherit" === f["stroke-width"] &&
                        (f["stroke-width"] = l);
                      "inherit" === a["stroke-width"] &&
                        ((a["stroke-width"] = l), (h = !0));
                    }
                    return e.call(
                      f,
                      a,
                      d,
                      h
                        ? function () {
                            f.attr({ "stroke-width": "inherit" });
                            g && g.apply(this, arguments);
                          }
                        : g
                    );
                  };
                }
              })),
            e.forEach(function (b, d) {
              var f = (0 === d ? g : g.insets[d - 1]).getSVGTransform(),
                e = k(a.getStrokeWidth(a.options), 1),
                l = f.scaleX,
                m = 0 < f.scaleY ? 1 : -1;
              if (h.globalAnimation && c.hasRendered) {
                var n = Number(b.attr("translateX")),
                  p = Number(b.attr("translateY")),
                  q = Number(b.attr("scaleX"));
                b.attr({ animator: 0 }).animate(
                  { animator: 1 },
                  {
                    step: function (a, c) {
                      a = q + (l - q) * c.pos;
                      b.attr({
                        translateX: n + (f.translateX - n) * c.pos,
                        translateY: p + (f.translateY - p) * c.pos,
                        scaleX: a,
                        scaleY: a * m,
                      });
                      b.element.setAttribute("stroke-width", e / a);
                    },
                  }
                );
              } else b.attr(f), b.element.setAttribute("stroke-width", e / l);
            }),
            this.drawMapDataLabels());
        };
        b.prototype.getProjectedBounds = function () {
          if (!this.bounds && this.chart.mapView) {
            var a = this.chart.mapView,
              b = a.insets,
              c = a.projection,
              d = [];
            (this.points || []).forEach(function (a) {
              if (a.path || a.geometry) {
                "string" === typeof a.path
                  ? (a.path = m(a.path))
                  : u(a.path) &&
                    "M" === a.path[0] &&
                    (a.path = h.prototype.pathToSegments(a.path));
                if (!a.bounds) {
                  var f = a.getProjectedBounds(c);
                  if (f) {
                    a.labelrank = k(a.labelrank, (f.x2 - f.x1) * (f.y2 - f.y1));
                    var e = f.midX,
                      g = f.midY;
                    if (b && l(e) && l(g)) {
                      var n = J(b, function (a) {
                        return a.isInside({ x: e, y: g });
                      });
                      n &&
                        (delete a.projectedPath,
                        (f = a.getProjectedBounds(n.projection)) &&
                          n.allBounds.push(f),
                        (a.insetIndex = b.indexOf(n)));
                    }
                    a.bounds = f;
                  }
                }
                a.bounds && void 0 === a.insetIndex && d.push(a.bounds);
              }
            });
            this.bounds = z.compositeBounds(d);
          }
          return this.bounds;
        };
        b.prototype.getStrokeWidth = function (a) {
          var b = this.pointAttrToOptions;
          return a[(b && b["stroke-width"]) || "borderWidth"];
        };
        b.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        b.prototype.pointAttribs = function (a, b) {
          var c = a.series.chart,
            d = c.mapView;
          c = c.styledMode
            ? this.colorAttribs(a)
            : n.prototype.pointAttribs.call(this, a, b);
          var e = this.getStrokeWidth(a.options);
          b &&
            ((a = f(
              this.options.states[b],
              (a.options.states && a.options.states[b]) || {}
            )),
            (e = this.getStrokeWidth(a)));
          e && d && (e /= d.getScale());
          a = this.getStrokeWidth(this.options);
          c.dashstyle && d && l(a) && (e = a / d.getScale());
          c["stroke-width"] = k(e, "inherit");
          return c;
        };
        b.prototype.updateData = function () {
          return this.processedData
            ? !1
            : a.prototype.updateData.apply(this, arguments);
        };
        b.prototype.setData = function (b, c, d, f) {
          void 0 === c && (c = !0);
          delete this.bounds;
          a.prototype.setData.call(this, b, !1, void 0, f);
          this.processData();
          this.generatePoints();
          c && this.chart.redraw(d);
        };
        b.prototype.processData = function () {
          var a = this.options,
            b = a.data,
            c = this.chart.options.chart,
            d = this.joinBy,
            e = a.keys || this.pointArrayMap,
            g = [],
            h = {},
            k = this.chart.mapView;
          k = k && (A(a.mapData, !0) ? k.getGeoMap(a.mapData) : k.geoMap);
          var m = this.chart.mapTransforms;
          (this.chart.mapTransforms = m =
            c.mapTransforms || (k && k["hc-transform"]) || m) &&
            w(m, function (a) {
              a.rotation &&
                ((a.cosAngle = Math.cos(a.rotation)),
                (a.sinAngle = Math.sin(a.rotation)));
            });
          if (u(a.mapData)) var n = a.mapData;
          else
            k &&
              "FeatureCollection" === k.type &&
              ((this.mapTitle = k.title), (n = B.geojson(k, this.type, this)));
          var p = (this.processedData = []);
          b &&
            b.forEach(function (c, f) {
              var g = 0;
              if (l(c)) p[f] = { value: c };
              else if (u(c)) {
                p[f] = {};
                !a.keys &&
                  c.length > e.length &&
                  "string" === typeof c[0] &&
                  ((p[f]["hc-key"] = c[0]), ++g);
                for (var h = 0; h < e.length; ++h, ++g)
                  e[h] &&
                    "undefined" !== typeof c[g] &&
                    (0 < e[h].indexOf(".")
                      ? F.prototype.setNestedProperty(p[f], c[g], e[h])
                      : (p[f][e[h]] = c[g]));
              } else p[f] = b[f];
              d && "_i" === d[0] && (p[f]._i = f);
            });
          if (n) {
            this.mapData = n;
            this.mapMap = {};
            for (m = 0; m < n.length; m++)
              (c = n[m]),
                (k = c.properties),
                (c._i = m),
                d[0] && k && k[d[0]] && (c[d[0]] = k[d[0]]),
                (h[c[d[0]]] = c);
            this.mapMap = h;
            if (d[1]) {
              var q = d[1];
              p.forEach(function (a) {
                a = C(q, a);
                h[a] && g.push(h[a]);
              });
            }
            if (a.allAreas) {
              if (d[1]) {
                var r = d[1];
                p.forEach(function (a) {
                  g.push(C(r, a));
                });
              }
              var t =
                "|" +
                g
                  .map(function (a) {
                    return a && a[d[0]];
                  })
                  .join("|") +
                "|";
              n.forEach(function (a) {
                (d[0] && -1 !== t.indexOf("|" + a[d[0]] + "|")) ||
                  p.push(f(a, { value: null }));
              });
            }
          }
          this.processedXData = Array(p.length);
        };
        b.prototype.setOptions = function (a) {
          a = r.prototype.setOptions.call(this, a);
          var b = a.joinBy;
          null === b && (b = "_i");
          b = this.joinBy = D(b);
          b[1] || (b[1] = b[0]);
          return a;
        };
        b.prototype.translate = function () {
          var a = this.doFullTranslate(),
            b = this.chart.mapView,
            c = b && b.projection;
          !this.chart.hasRendered ||
            (!this.isDirtyData && this.hasRendered) ||
            (this.processData(),
            this.generatePoints(),
            delete this.bounds,
            !b || b.userOptions.center || l(b.userOptions.zoom)
              ? this.getProjectedBounds()
              : b.fitToBounds(void 0, void 0, !1));
          if (b) {
            var d = b.getSVGTransform();
            this.points.forEach(function (f) {
              var e =
                (l(f.insetIndex) && b.insets[f.insetIndex].getSVGTransform()) ||
                d;
              e &&
                f.bounds &&
                l(f.bounds.midX) &&
                l(f.bounds.midY) &&
                ((f.plotX = f.bounds.midX * e.scaleX + e.translateX),
                (f.plotY = f.bounds.midY * e.scaleY + e.translateY));
              a &&
                ((f.shapeType = "path"),
                (f.shapeArgs = { d: F.getProjectedPath(f, c) }));
            });
          }
          x(this, "afterTranslate");
        };
        b.defaultOptions = f(G.defaultOptions, {
          affectsMapView: !0,
          animation: !1,
          dataLabels: {
            crop: !1,
            formatter: function () {
              var a = this.series.chart.numberFormatter,
                b = this.point.value;
              return l(b) ? a(b, -1) : "";
            },
            inside: !0,
            overflow: !1,
            padding: 0,
            verticalAlign: "middle",
          },
          marker: null,
          nullColor: "#f7f7f7",
          stickyTracking: !1,
          tooltip: {
            followPointer: !0,
            pointFormat: "{point.name}: {point.value}<br/>",
          },
          turboThreshold: 0,
          allAreas: !0,
          borderColor: "#cccccc",
          borderWidth: 1,
          joinBy: "hc-key",
          states: {
            hover: { halo: null, brightness: 0.2 },
            normal: { animation: !0 },
            select: { color: "#cccccc" },
            inactive: { opacity: 1 },
          },
        });
        return b;
      })(G);
      t(a.prototype, {
        type: "map",
        axisTypes: e.seriesMembers.axisTypes,
        colorAttribs: e.seriesMembers.colorAttribs,
        colorKey: e.seriesMembers.colorKey,
        directTouch: !0,
        drawDataLabels: b,
        drawGraph: b,
        drawLegendSymbol: v.drawRectangle,
        forceDL: !0,
        getCenter: y.getCenter,
        getExtremesFromAll: !0,
        getSymbol: b,
        isCartesian: !1,
        parallelArrays: e.seriesMembers.parallelArrays,
        pointArrayMap: e.seriesMembers.pointArrayMap,
        pointClass: F,
        preserveAspectRatio: !0,
        searchPoint: b,
        trackerGroups: e.seriesMembers.trackerGroups,
        useMapGeometry: !0,
      });
      e.compose(a);
      p.registerSeriesType("map", a);
      ("");
      return a;
    }
  );
  I(
    e,
    "Series/MapLine/MapLineSeries.js",
    [
      e["Series/Map/MapSeries.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B =
          (this && this.__extends) ||
          (function () {
            var b = function (e, p) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, a) {
                    b.__proto__ = a;
                  }) ||
                function (b, a) {
                  for (var d in a) a.hasOwnProperty(d) && (b[d] = a[d]);
                };
              return b(e, p);
            };
            return function (e, p) {
              function h() {
                this.constructor = e;
              }
              b(e, p);
              e.prototype =
                null === p
                  ? Object.create(p)
                  : ((h.prototype = p.prototype), new h());
            };
          })(),
        v = e.series,
        t = y.extend,
        F = y.merge;
      y = (function (e) {
        function r() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        B(r, e);
        r.prototype.pointAttribs = function (e, h) {
          e = b.prototype.pointAttribs.call(this, e, h);
          e.fill = this.options.fillColor;
          return e;
        };
        r.defaultOptions = F(b.defaultOptions, {
          lineWidth: 1,
          fillColor: "none",
        });
        return r;
      })(b);
      t(y.prototype, {
        type: "mapline",
        colorProp: "stroke",
        drawLegendSymbol: v.prototype.drawLegendSymbol,
        pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" },
      });
      e.registerSeriesType("mapline", y);
      ("");
      return y;
    }
  );
  I(
    e,
    "Series/MapPoint/MapPointPoint.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var y =
          (this && this.__extends) ||
          (function () {
            var b = function (e, v) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, e) {
                    b.__proto__ = e;
                  }) ||
                function (b, e) {
                  for (var p in e) e.hasOwnProperty(p) && (b[p] = e[p]);
                };
              return b(e, v);
            };
            return function (e, v) {
              function t() {
                this.constructor = e;
              }
              b(e, v);
              e.prototype =
                null === v
                  ? Object.create(v)
                  : ((t.prototype = v.prototype), new t());
            };
          })(),
        B = e.isNumber;
      return (function (b) {
        function e() {
          var e = (null !== b && b.apply(this, arguments)) || this;
          e.options = void 0;
          e.series = void 0;
          return e;
        }
        y(e, b);
        e.prototype.isValid = function () {
          return !!(
            this.options.geometry ||
            (B(this.x) && B(this.y)) ||
            (B(this.options.lon) && B(this.options.lat))
          );
        };
        return e;
      })(b.seriesTypes.scatter.prototype.pointClass);
    }
  );
  I(
    e,
    "Series/MapPoint/MapPointSeries.js",
    [
      e["Core/Globals.js"],
      e["Series/MapPoint/MapPointPoint.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v =
        (this && this.__extends) ||
        (function () {
          var b = function (a, d) {
            b =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (a, b) {
                  a.__proto__ = b;
                }) ||
              function (a, b) {
                for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
              };
            return b(a, d);
          };
          return function (a, d) {
            function e() {
              this.constructor = a;
            }
            b(a, d);
            a.prototype =
              null === d
                ? Object.create(d)
                : ((e.prototype = d.prototype), new e());
          };
        })();
      b = b.noop;
      var t = y.seriesTypes.scatter,
        F = B.extend,
        z = B.fireEvent,
        r = B.isNumber,
        p = B.merge;
      B = (function (b) {
        function a() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.chart = void 0;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        v(a, b);
        a.prototype.drawDataLabels = function () {
          b.prototype.drawDataLabels.call(this);
          this.dataLabelsGroup &&
            this.dataLabelsGroup.clip(this.chart.clipRect);
        };
        a.prototype.projectPoint = function (a) {
          var b = this.chart.mapView;
          if (b) {
            var d = a.geometry,
              e = a.lon;
            a = a.lat;
            d = d && "Point" === d.type && d.coordinates;
            r(e) && r(a) && (d = [e, a]);
            if (d) return b.lonLatToProjectedUnits({ lon: d[0], lat: d[1] });
          }
        };
        a.prototype.translate = function () {
          var a = this,
            b = this.chart.mapView;
          this.processedXData || this.processData();
          this.generatePoints();
          this.getProjectedBounds &&
            this.isDirtyData &&
            (delete this.bounds, this.getProjectedBounds());
          if (b) {
            var e = b.projection.hasCoordinates;
            this.points.forEach(function (d) {
              var g = d.x;
              g = void 0 === g ? void 0 : g;
              var h = d.y;
              h = void 0 === h ? void 0 : h;
              var m = a.projectPoint(d.options);
              m
                ? ((g = m.x), (h = m.y))
                : d.bounds && ((g = d.bounds.midX), (h = d.bounds.midY));
              r(g) && r(h)
                ? ((g = b.projectedUnitsToPixels({ x: g, y: h })),
                  (d.plotX = g.x),
                  (d.plotY = e ? g.y : a.chart.plotHeight - g.y))
                : (d.y = d.plotX = d.plotY = void 0);
              d.isInside = a.isPointInside(d);
              d.zone = a.zones.length ? d.getZone() : void 0;
            });
          }
          z(this, "afterTranslate");
        };
        a.defaultOptions = p(t.defaultOptions, {
          dataLabels: {
            crop: !1,
            defer: !1,
            enabled: !0,
            formatter: function () {
              return this.point.name;
            },
            overflow: !1,
            style: { color: "#000000" },
          },
        });
        return a;
      })(t);
      F(B.prototype, {
        type: "mappoint",
        axisTypes: ["colorAxis"],
        forceDL: !0,
        isCartesian: !1,
        pointClass: e,
        searchPoint: b,
        useMapGeometry: !0,
      });
      y.registerSeriesType("mappoint", B);
      ("");
      return B;
    }
  );
  I(e, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
    return {
      borderColor: void 0,
      borderWidth: 2,
      className: void 0,
      color: void 0,
      connectorClassName: void 0,
      connectorColor: void 0,
      connectorDistance: 60,
      connectorWidth: 1,
      enabled: !1,
      labels: {
        className: void 0,
        allowOverlap: !1,
        format: "",
        formatter: void 0,
        align: "right",
        style: { fontSize: "10px", color: "#000000" },
        x: 0,
        y: 0,
      },
      maxSize: 60,
      minSize: 10,
      legendIndex: 0,
      ranges: {
        value: void 0,
        borderColor: void 0,
        color: void 0,
        connectorColor: void 0,
      },
      sizeBy: "area",
      sizeByAbsoluteValue: !1,
      zIndex: 1,
      zThreshold: 0,
    };
  });
  I(
    e,
    "Series/Bubble/BubbleLegendItem.js",
    [
      e["Core/Color/Color.js"],
      e["Core/FormatUtilities.js"],
      e["Core/Globals.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v = b.parse,
        t = y.noop,
        F = B.arrayMax,
        z = B.arrayMin,
        r = B.isNumber,
        p = B.merge,
        h = B.pick,
        a = B.stableSort;
      b = (function () {
        function b(a, b) {
          this.options =
            this.symbols =
            this.visible =
            this.selected =
            this.ranges =
            this.movementX =
            this.maxLabel =
            this.legendSymbol =
            this.legendItemWidth =
            this.legendItemHeight =
            this.legendItem =
            this.legendGroup =
            this.legend =
            this.fontMetrics =
            this.chart =
              void 0;
          this.setState = t;
          this.init(a, b);
        }
        b.prototype.init = function (a, b) {
          this.options = a;
          this.visible = !0;
          this.chart = b.chart;
          this.legend = b;
        };
        b.prototype.addToLegend = function (a) {
          a.splice(this.options.legendIndex, 0, this);
        };
        b.prototype.drawLegendSymbol = function (b) {
          var d = this.chart,
            e = this.options,
            g = h(b.options.itemDistance, 20),
            p = e.ranges,
            t = e.connectorDistance;
          this.fontMetrics = d.renderer.fontMetrics(e.labels.style.fontSize);
          p && p.length && r(p[0].value)
            ? (a(p, function (a, b) {
                return b.value - a.value;
              }),
              (this.ranges = p),
              this.setOptions(),
              this.render(),
              (b = this.getMaxLabelSize()),
              (p = this.ranges[0].radius),
              (d = 2 * p),
              (t = t - p + b.width),
              (t = 0 < t ? t : 0),
              (this.maxLabel = b),
              (this.movementX = "left" === e.labels.align ? t : 0),
              (this.legendItemWidth = d + t + g),
              (this.legendItemHeight = d + this.fontMetrics.h / 2))
            : (b.options.bubbleLegend.autoRanges = !0);
        };
        b.prototype.setOptions = function () {
          var a = this.ranges,
            b = this.options,
            d = this.chart.series[b.seriesIndex],
            e = this.legend.baseline,
            r = { zIndex: b.zIndex, "stroke-width": b.borderWidth },
            t = { zIndex: b.zIndex, "stroke-width": b.connectorWidth },
            z = {
              align:
                this.legend.options.rtl || "left" === b.labels.align
                  ? "right"
                  : "left",
              zIndex: b.zIndex,
            },
            u = d.options.marker.fillOpacity,
            l = this.chart.styledMode;
          a.forEach(function (g, f) {
            l ||
              ((r.stroke = h(g.borderColor, b.borderColor, d.color)),
              (r.fill = h(
                g.color,
                b.color,
                1 !== u ? v(d.color).setOpacity(u).get("rgba") : d.color
              )),
              (t.stroke = h(g.connectorColor, b.connectorColor, d.color)));
            a[f].radius = this.getRangeRadius(g.value);
            a[f] = p(a[f], { center: a[0].radius - a[f].radius + e });
            l ||
              p(!0, a[f], {
                bubbleAttribs: p(r),
                connectorAttribs: p(t),
                labelAttribs: z,
              });
          }, this);
        };
        b.prototype.getRangeRadius = function (a) {
          var b = this.options;
          return this.chart.series[this.options.seriesIndex].getRadius.call(
            this,
            b.ranges[b.ranges.length - 1].value,
            b.ranges[0].value,
            b.minSize,
            b.maxSize,
            a
          );
        };
        b.prototype.render = function () {
          var a = this.chart.renderer,
            b = this.options.zThreshold;
          this.symbols ||
            (this.symbols = { connectors: [], bubbleItems: [], labels: [] });
          this.legendSymbol = a.g("bubble-legend");
          this.legendItem = a.g("bubble-legend-item");
          this.legendSymbol.translateX = 0;
          this.legendSymbol.translateY = 0;
          this.ranges.forEach(function (a) {
            a.value >= b && this.renderRange(a);
          }, this);
          this.legendSymbol.add(this.legendItem);
          this.legendItem.add(this.legendGroup);
          this.hideOverlappingLabels();
        };
        b.prototype.renderRange = function (a) {
          var b = this.options,
            d = b.labels,
            e = this.chart,
            g = e.series[b.seriesIndex],
            h = e.renderer,
            p = this.symbols;
          e = p.labels;
          var u = a.center,
            l = Math.abs(a.radius),
            r = b.connectorDistance || 0,
            f = d.align,
            t = b.connectorWidth,
            k = this.ranges[0].radius || 0,
            v = u - l - b.borderWidth / 2 + t / 2,
            c = this.fontMetrics;
          c = c.f / 2 - (c.h - c.f) / 2;
          var q = h.styledMode;
          r = this.legend.options.rtl || "left" === f ? -r : r;
          "center" === f &&
            ((r = 0),
            (b.connectorDistance = 0),
            (a.labelAttribs.align = "center"));
          f = v + b.labels.y;
          var z = k + r + b.labels.x;
          p.bubbleItems.push(
            h
              .circle(k, u + ((v % 1 ? 1 : 0.5) - (t % 2 ? 0 : 0.5)), l)
              .attr(q ? {} : a.bubbleAttribs)
              .addClass(
                (q ? "highcharts-color-" + g.colorIndex + " " : "") +
                  "highcharts-bubble-legend-symbol " +
                  (b.className || "")
              )
              .add(this.legendSymbol)
          );
          p.connectors.push(
            h
              .path(
                h.crispLine(
                  [
                    ["M", k, v],
                    ["L", k + r, v],
                  ],
                  b.connectorWidth
                )
              )
              .attr(q ? {} : a.connectorAttribs)
              .addClass(
                (q
                  ? "highcharts-color-" + this.options.seriesIndex + " "
                  : "") +
                  "highcharts-bubble-legend-connectors " +
                  (b.connectorClassName || "")
              )
              .add(this.legendSymbol)
          );
          a = h
            .text(this.formatLabel(a), z, f + c)
            .attr(q ? {} : a.labelAttribs)
            .css(q ? {} : d.style)
            .addClass(
              "highcharts-bubble-legend-labels " + (b.labels.className || "")
            )
            .add(this.legendSymbol);
          e.push(a);
          a.placed = !0;
          a.alignAttr = { x: z, y: f + c };
        };
        b.prototype.getMaxLabelSize = function () {
          var a, b;
          this.symbols.labels.forEach(function (d) {
            b = d.getBBox(!0);
            a = a ? (b.width > a.width ? b : a) : b;
          });
          return a || {};
        };
        b.prototype.formatLabel = function (a) {
          var b = this.options,
            d = b.labels.formatter;
          b = b.labels.format;
          var g = this.chart.numberFormatter;
          return b ? e.format(b, a) : d ? d.call(a) : g(a.value, 1);
        };
        b.prototype.hideOverlappingLabels = function () {
          var a = this.chart,
            b = this.symbols;
          !this.options.labels.allowOverlap &&
            b &&
            (a.hideOverlappingLabels(b.labels),
            b.labels.forEach(function (a, d) {
              a.newOpacity
                ? a.newOpacity !== a.oldOpacity && b.connectors[d].show()
                : b.connectors[d].hide();
            }));
        };
        b.prototype.getRanges = function () {
          var a = this.legend.bubbleLegend,
            b = a.options.ranges,
            d,
            e = Number.MAX_VALUE,
            t = -Number.MAX_VALUE;
          a.chart.series.forEach(function (a) {
            a.isBubble &&
              !a.ignoreSeries &&
              ((d = a.zData.filter(r)),
              d.length &&
                ((e = h(
                  a.options.zMin,
                  Math.min(
                    e,
                    Math.max(
                      z(d),
                      !1 === a.options.displayNegative
                        ? a.options.zThreshold
                        : -Number.MAX_VALUE
                    )
                  )
                )),
                (t = h(a.options.zMax, Math.max(t, F(d))))));
          });
          var x =
            e === t
              ? [{ value: t }]
              : [
                  { value: e },
                  { value: (e + t) / 2 },
                  { value: t, autoRanges: !0 },
                ];
          b.length && b[0].radius && x.reverse();
          x.forEach(function (a, d) {
            b && b[d] && (x[d] = p(b[d], a));
          });
          return x;
        };
        b.prototype.predictBubbleSizes = function () {
          var a = this.chart,
            b = this.fontMetrics,
            d = a.legend.options,
            e = d.floating,
            h = (d = "horizontal" === d.layout) ? a.legend.lastLineHeight : 0,
            p = a.plotSizeX,
            r = a.plotSizeY,
            u = a.series[this.options.seriesIndex],
            l = u.getPxExtremes();
          a = Math.ceil(l.minPxSize);
          l = Math.ceil(l.maxPxSize);
          var t = Math.min(r, p);
          u = u.options.maxSize;
          if (e || !/%$/.test(u)) b = l;
          else if (
            ((u = parseFloat(u)),
            (b = ((t + h - b.h / 2) * u) / 100 / (u / 100 + 1)),
            (d && r - b >= p) || (!d && p - b >= r))
          )
            b = l;
          return [a, Math.ceil(b)];
        };
        b.prototype.updateRanges = function (a, b) {
          var d = this.legend.options.bubbleLegend;
          d.minSize = a;
          d.maxSize = b;
          d.ranges = this.getRanges();
        };
        b.prototype.correctSizes = function () {
          var a = this.legend,
            b = this.chart.series[this.options.seriesIndex].getPxExtremes();
          1 < Math.abs(Math.ceil(b.maxPxSize) - this.options.maxSize) &&
            (this.updateRanges(this.options.minSize, b.maxPxSize), a.render());
        };
        return b;
      })();
      ("");
      return b;
    }
  );
  I(
    e,
    "Series/Bubble/BubbleLegendComposition.js",
    [
      e["Series/Bubble/BubbleLegendDefaults.js"],
      e["Series/Bubble/BubbleLegendItem.js"],
      e["Core/DefaultOptions.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      function v(a, b, e) {
        var g = this.legend,
          h = 0 <= t(this);
        if (
          g &&
          g.options.enabled &&
          g.bubbleLegend &&
          g.options.bubbleLegend.autoRanges &&
          h
        ) {
          var m = g.bubbleLegend.options;
          h = g.bubbleLegend.predictBubbleSizes();
          g.bubbleLegend.updateRanges(h[0], h[1]);
          m.placed ||
            ((g.group.placed = !1),
            g.allItems.forEach(function (a) {
              a.legendGroup.translateY = null;
            }));
          g.render();
          this.getMargins();
          this.axes.forEach(function (a) {
            a.visible && a.render();
            m.placed ||
              (a.setScale(),
              a.updateNames(),
              d(a.ticks, function (a) {
                a.isNew = !0;
                a.isNewLabel = !0;
              }));
          });
          m.placed = !0;
          this.getMargins();
          a.call(this, b, e);
          g.bubbleLegend.correctSizes();
          p(g, F(g));
        } else
          a.call(this, b, e),
            g &&
              g.options.enabled &&
              g.bubbleLegend &&
              (g.render(), p(g, F(g)));
      }
      function t(a) {
        a = a.series;
        for (var b = 0; b < a.length; ) {
          if (a[b] && a[b].isBubble && a[b].visible && a[b].zData.length)
            return b;
          b++;
        }
        return -1;
      }
      function F(a) {
        a = a.allItems;
        var b = [],
          d = a.length,
          e,
          g = 0;
        for (e = 0; e < d; e++)
          if (
            (a[e].legendItemHeight && (a[e].itemHeight = a[e].legendItemHeight),
            a[e] === a[d - 1] ||
              (a[e + 1] &&
                a[e]._legendItemPos[1] !== a[e + 1]._legendItemPos[1]))
          ) {
            b.push({ height: 0 });
            var h = b[b.length - 1];
            for (g; g <= e; g++)
              a[g].itemHeight > h.height && (h.height = a[g].itemHeight);
            h.step = e;
          }
        return b;
      }
      function z(a) {
        var b = this.bubbleLegend,
          d = this.options,
          g = d.bubbleLegend,
          h = t(this.chart);
        b &&
          b.ranges &&
          b.ranges.length &&
          (g.ranges.length && (g.autoRanges = !!g.ranges[0].autoRanges),
          this.destroyItem(b));
        0 <= h &&
          d.enabled &&
          g.enabled &&
          ((g.seriesIndex = h),
          (this.bubbleLegend = new e(g, this)),
          this.bubbleLegend.addToLegend(a.allItems));
      }
      function r() {
        var a = this.chart,
          b = this.visible,
          d = this.chart.legend;
        d &&
          d.bubbleLegend &&
          ((this.visible = !b),
          (this.ignoreSeries = b),
          (a = 0 <= t(a)),
          d.bubbleLegend.visible !== a &&
            (d.update({ bubbleLegend: { enabled: a } }),
            (d.bubbleLegend.visible = a)),
          (this.visible = b));
      }
      function p(a, b) {
        var d = a.options.rtl,
          e,
          g,
          h,
          l = 0;
        a.allItems.forEach(function (a, f) {
          e = a.legendGroup.translateX;
          g = a._legendItemPos[1];
          if ((h = a.movementX) || (d && a.ranges))
            (h = d ? e - a.options.maxSize / 2 : e + h),
              a.legendGroup.attr({ translateX: h });
          f > b[l].step && l++;
          a.legendGroup.attr({ translateY: Math.round(g + b[l].height / 2) });
          a._legendItemPos[1] = g + b[l].height / 2;
        });
      }
      var h = y.setOptions,
        a = B.addEvent,
        d = B.objectEach,
        g = B.wrap,
        m = [];
      return {
        compose: function (d, e, p) {
          -1 === m.indexOf(d) &&
            (m.push(d),
            h({ legend: { bubbleLegend: b } }),
            g(d.prototype, "drawChartBox", v));
          -1 === m.indexOf(e) && (m.push(e), a(e, "afterGetAllItems", z));
          -1 === m.indexOf(p) && (m.push(p), a(p, "legendItemClick", r));
        },
      };
    }
  );
  I(
    e,
    "Series/Bubble/BubblePoint.js",
    [
      e["Core/Series/Point.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B =
        (this && this.__extends) ||
        (function () {
          var b = function (e, v) {
            b =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (b, e) {
                  b.__proto__ = e;
                }) ||
              function (b, e) {
                for (var p in e) e.hasOwnProperty(p) && (b[p] = e[p]);
              };
            return b(e, v);
          };
          return function (e, v) {
            function t() {
              this.constructor = e;
            }
            b(e, v);
            e.prototype =
              null === v
                ? Object.create(v)
                : ((t.prototype = v.prototype), new t());
          };
        })();
      y = y.extend;
      e = (function (e) {
        function t() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.options = void 0;
          b.series = void 0;
          return b;
        }
        B(t, e);
        t.prototype.haloPath = function (e) {
          return b.prototype.haloPath.call(
            this,
            0 === e ? 0 : (this.marker ? this.marker.radius || 0 : 0) + e
          );
        };
        return t;
      })(e.seriesTypes.scatter.prototype.pointClass);
      y(e.prototype, { ttBelow: !1 });
      return e;
    }
  );
  I(
    e,
    "Series/Bubble/BubbleSeries.js",
    [
      e["Series/Bubble/BubbleLegendComposition.js"],
      e["Series/Bubble/BubblePoint.js"],
      e["Core/Color/Color.js"],
      e["Core/Globals.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t) {
      function F() {
        var a = this,
          b = this.len,
          d = this.chart,
          e = this.isXAxis,
          g = e ? "xData" : "yData",
          h = this.min,
          m = this.max - h,
          c = 0,
          p = b,
          n = b / m,
          r;
        this.series.forEach(function (b) {
          if (
            b.bubblePadding &&
            (b.visible || !d.options.chart.ignoreHiddenSeries)
          ) {
            r = a.allowZoomOutside = !0;
            var f = b[g];
            e &&
              ((b.onPoint || b).getRadii(0, 0, b),
              b.onPoint && (b.radii = b.onPoint.radii));
            if (0 < m)
              for (var k = f.length; k--; )
                if (G(f[k]) && a.dataMin <= f[k] && f[k] <= a.max) {
                  var l = (b.radii && b.radii[k]) || 0;
                  c = Math.min((f[k] - h) * n - l, c);
                  p = Math.max((f[k] - h) * n + l, p);
                }
          }
        });
        r &&
          0 < m &&
          !this.logarithmic &&
          ((p -= b),
          (n *= (b + Math.max(0, c) - Math.min(p, b)) / b),
          [
            ["min", "userMin", c],
            ["max", "userMax", p],
          ].forEach(function (b) {
            "undefined" === typeof x(a.options[b[0]], a[b[1]]) &&
              (a[b[0]] += b[2] / n);
          }));
      }
      var z =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function e() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((e.prototype = d.prototype), new e());
            };
          })(),
        r = y.parse;
      y = B.noop;
      var p = v.series,
        h = v.seriesTypes;
      B = h.column.prototype;
      var a = h.scatter;
      h = t.addEvent;
      var d = t.arrayMax,
        g = t.arrayMin,
        m = t.clamp,
        n = t.extend,
        G = t.isNumber,
        J = t.merge,
        x = t.pick,
        C = [];
      t = (function (e) {
        function h() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          a.data = void 0;
          a.maxPxSize = void 0;
          a.minPxSize = void 0;
          a.options = void 0;
          a.points = void 0;
          a.radii = void 0;
          a.yData = void 0;
          a.zData = void 0;
          return a;
        }
        z(h, e);
        h.compose = function (a, d, e, g) {
          b.compose(d, e, g);
          -1 === C.indexOf(a) && (C.push(a), (a.prototype.beforePadding = F));
        };
        h.prototype.animate = function (a) {
          !a &&
            this.points.length < this.options.animationLimit &&
            this.points.forEach(function (a) {
              var b = a.graphic;
              b &&
                b.width &&
                (this.hasRendered ||
                  b.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }),
                b.animate(this.markerAttribs(a), this.options.animation));
            }, this);
        };
        h.prototype.getRadii = function () {
          var a = this,
            b = this.zData,
            d = this.yData,
            e = [],
            g = this.chart.bubbleZExtremes;
          var c = this.getPxExtremes();
          var h = c.minPxSize,
            l = c.maxPxSize;
          if (!g) {
            var m = Number.MAX_VALUE,
              p = -Number.MAX_VALUE,
              n;
            this.chart.series.forEach(function (b) {
              b.bubblePadding &&
                (b.visible || !a.chart.options.chart.ignoreHiddenSeries) &&
                (b = (b.onPoint || b).getZExtremes()) &&
                ((m = Math.min(m || b.zMin, b.zMin)),
                (p = Math.max(p || b.zMax, b.zMax)),
                (n = !0));
            });
            n
              ? ((g = { zMin: m, zMax: p }), (this.chart.bubbleZExtremes = g))
              : (g = { zMin: 0, zMax: 0 });
          }
          var r = 0;
          for (c = b.length; r < c; r++) {
            var u = b[r];
            e.push(this.getRadius(g.zMin, g.zMax, h, l, u, d && d[r]));
          }
          this.radii = e;
        };
        h.prototype.getRadius = function (a, b, d, e, g, c) {
          var f = this.options,
            h = "width" !== f.sizeBy,
            k = f.zThreshold,
            l = b - a,
            m = 0.5;
          if (null === c || null === g) return null;
          if (G(g)) {
            f.sizeByAbsoluteValue &&
              ((g = Math.abs(g - k)),
              (l = Math.max(b - k, Math.abs(a - k))),
              (a = 0));
            if (g < a) return d / 2 - 1;
            0 < l && (m = (g - a) / l);
          }
          h && 0 <= m && (m = Math.sqrt(m));
          return Math.ceil(d + m * (e - d)) / 2;
        };
        h.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        h.prototype.pointAttribs = function (a, b) {
          var d = this.options.marker.fillOpacity;
          a = p.prototype.pointAttribs.call(this, a, b);
          1 !== d && (a.fill = r(a.fill).setOpacity(d).get("rgba"));
          return a;
        };
        h.prototype.translate = function () {
          e.prototype.translate.call(this);
          this.getRadii();
          this.translateBubble();
        };
        h.prototype.translateBubble = function () {
          for (
            var a = this.data,
              b = this.radii,
              d = this.getPxExtremes().minPxSize,
              e = a.length;
            e--;

          ) {
            var g = a[e],
              c = b ? b[e] : 0;
            G(c) && c >= d / 2
              ? ((g.marker = n(g.marker, {
                  radius: c,
                  width: 2 * c,
                  height: 2 * c,
                })),
                (g.dlBox = {
                  x: g.plotX - c,
                  y: g.plotY - c,
                  width: 2 * c,
                  height: 2 * c,
                }))
              : ((g.shapeArgs = g.dlBox = void 0),
                (g.plotY = 0),
                (g.marker = { width: 0, height: 0 }));
          }
        };
        h.prototype.getPxExtremes = function () {
          var a = Math.min(this.chart.plotWidth, this.chart.plotHeight),
            b = function (b) {
              if ("string" === typeof b) {
                var d = /%$/.test(b);
                b = parseInt(b, 10);
              }
              return d ? (a * b) / 100 : b;
            },
            d = b(x(this.options.minSize, 8));
          b = Math.max(b(x(this.options.maxSize, "20%")), d);
          return { minPxSize: d, maxPxSize: b };
        };
        h.prototype.getZExtremes = function () {
          var a = this.options,
            b = (this.zData || []).filter(G);
          if (b.length) {
            var e = x(
              a.zMin,
              m(
                g(b),
                !1 === a.displayNegative
                  ? a.zThreshold || 0
                  : -Number.MAX_VALUE,
                Number.MAX_VALUE
              )
            );
            a = x(a.zMax, d(b));
            if (G(e) && G(a)) return { zMin: e, zMax: a };
          }
        };
        h.defaultOptions = J(a.defaultOptions, {
          dataLabels: {
            formatter: function () {
              var a = this.series.chart.numberFormatter,
                b = this.point.z;
              return G(b) ? a(b, -1) : "";
            },
            inside: !0,
            verticalAlign: "middle",
          },
          animationLimit: 250,
          marker: {
            lineColor: null,
            lineWidth: 1,
            fillOpacity: 0.5,
            radius: null,
            states: { hover: { radiusPlus: 0 } },
            symbol: "circle",
          },
          minSize: 8,
          maxSize: "20%",
          softThreshold: !1,
          states: { hover: { halo: { size: 5 } } },
          tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" },
          turboThreshold: 0,
          zThreshold: 0,
          zoneAxis: "z",
        });
        return h;
      })(a);
      n(t.prototype, {
        alignDataLabel: B.alignDataLabel,
        applyZones: y,
        bubblePadding: !0,
        buildKDTree: y,
        directTouch: !0,
        isBubble: !0,
        pointArrayMap: ["y", "z"],
        pointClass: e,
        parallelArrays: ["x", "y", "z"],
        trackerGroups: ["group", "dataLabelsGroup"],
        specialGroup: "group",
        zoneAxis: "z",
      });
      h(t, "updatedData", function (a) {
        delete a.target.chart.bubbleZExtremes;
      });
      h(t, "remove", function (a) {
        delete a.target.chart.bubbleZExtremes;
      });
      v.registerSeriesType("bubble", t);
      ("");
      ("");
      return t;
    }
  );
  I(
    e,
    "Series/MapBubble/MapBubblePoint.js",
    [
      e["Series/Bubble/BubblePoint.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y) {
      var B =
        (this && this.__extends) ||
        (function () {
          var b = function (e, v) {
            b =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (b, e) {
                  b.__proto__ = e;
                }) ||
              function (b, e) {
                for (var p in e) e.hasOwnProperty(p) && (b[p] = e[p]);
              };
            return b(e, v);
          };
          return function (e, v) {
            function t() {
              this.constructor = e;
            }
            b(e, v);
            e.prototype =
              null === v
                ? Object.create(v)
                : ((t.prototype = v.prototype), new t());
          };
        })();
      e = e.seriesTypes.map.prototype.pointClass.prototype;
      y = y.extend;
      b = (function (b) {
        function e() {
          return (null !== b && b.apply(this, arguments)) || this;
        }
        B(e, b);
        e.prototype.isValid = function () {
          return "number" === typeof this.z;
        };
        return e;
      })(b);
      y(b.prototype, {
        applyOptions: e.applyOptions,
        getProjectedBounds: e.getProjectedBounds,
      });
      return b;
    }
  );
  I(
    e,
    "Series/MapBubble/MapBubbleSeries.js",
    [
      e["Series/Bubble/BubbleSeries.js"],
      e["Series/MapBubble/MapBubblePoint.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (e, a) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(e, a);
            };
            return function (e, a) {
              function d() {
                this.constructor = e;
              }
              b(e, a);
              e.prototype =
                null === a
                  ? Object.create(a)
                  : ((d.prototype = a.prototype), new d());
            };
          })(),
        t = y.seriesTypes,
        F = t.map.prototype,
        z = t.mappoint.prototype;
      t = B.extend;
      var r = B.merge;
      B = (function (e) {
        function h() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        v(h, e);
        h.prototype.searchPoint = function (a, b) {
          return this.searchKDTree(
            {
              clientX: a.chartX - this.chart.plotLeft,
              plotY: a.chartY - this.chart.plotTop,
            },
            b,
            a
          );
        };
        h.prototype.translate = function () {
          z.translate.call(this);
          this.getRadii();
          this.translateBubble();
        };
        h.defaultOptions = r(b.defaultOptions, {
          lineWidth: 0,
          animationLimit: 500,
          joinBy: "hc-key",
          tooltip: { pointFormat: "{point.name}: {point.z}" },
        });
        return h;
      })(b);
      t(B.prototype, {
        type: "mapbubble",
        axisTypes: ["colorAxis"],
        getProjectedBounds: F.getProjectedBounds,
        isCartesian: !1,
        pointArrayMap: ["z"],
        pointClass: e,
        processData: F.processData,
        projectPoint: z.projectPoint,
        setData: F.setData,
        setOptions: F.setOptions,
        updateData: F.updateData,
        useMapGeometry: !0,
        xyFromShape: !0,
      });
      y.registerSeriesType("mapbubble", B);
      ("");
      return B;
    }
  );
  I(
    e,
    "Series/Heatmap/HeatmapPoint.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (b, e) {
      var y =
          (this && this.__extends) ||
          (function () {
            var b = function (e, p) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, a) {
                    b.__proto__ = a;
                  }) ||
                function (b, a) {
                  for (var d in a) a.hasOwnProperty(d) && (b[d] = a[d]);
                };
              return b(e, p);
            };
            return function (e, p) {
              function h() {
                this.constructor = e;
              }
              b(e, p);
              e.prototype =
                null === p
                  ? Object.create(p)
                  : ((h.prototype = p.prototype), new h());
            };
          })(),
        B = e.clamp,
        v = e.defined,
        t = e.extend,
        F = e.pick;
      b = (function (b) {
        function e() {
          var e = (null !== b && b.apply(this, arguments)) || this;
          e.options = void 0;
          e.series = void 0;
          e.value = void 0;
          e.x = void 0;
          e.y = void 0;
          return e;
        }
        y(e, b);
        e.prototype.applyOptions = function (e, h) {
          e = b.prototype.applyOptions.call(this, e, h);
          e.formatPrefix = e.isNull || null === e.value ? "null" : "point";
          return e;
        };
        e.prototype.getCellAttributes = function () {
          var b = this.series,
            e = b.options,
            a = (e.colsize || 1) / 2,
            d = (e.rowsize || 1) / 2,
            g = b.xAxis,
            m = b.yAxis,
            n = this.options.marker || b.options.marker;
          b = b.pointPlacementToXValue();
          var r = F(this.pointPadding, e.pointPadding, 0),
            t = {
              x1: B(
                Math.round(g.len - g.translate(this.x - a, !1, !0, !1, !0, -b)),
                -g.len,
                2 * g.len
              ),
              x2: B(
                Math.round(g.len - g.translate(this.x + a, !1, !0, !1, !0, -b)),
                -g.len,
                2 * g.len
              ),
              y1: B(
                Math.round(m.translate(this.y - d, !1, !0, !1, !0)),
                -m.len,
                2 * m.len
              ),
              y2: B(
                Math.round(m.translate(this.y + d, !1, !0, !1, !0)),
                -m.len,
                2 * m.len
              ),
            };
          [
            ["width", "x"],
            ["height", "y"],
          ].forEach(function (a) {
            var b = a[0];
            a = a[1];
            var d = a + "1",
              e = a + "2",
              g = Math.abs(t[d] - t[e]),
              f = (n && n.lineWidth) || 0,
              h = Math.abs(t[d] + t[e]) / 2;
            b = n && n[b];
            v(b) &&
              b < g &&
              ((b = b / 2 + f / 2), (t[d] = h - b), (t[e] = h + b));
            r &&
              ("y" === a && ((d = e), (e = a + "1")), (t[d] += r), (t[e] -= r));
          });
          return t;
        };
        e.prototype.haloPath = function (b) {
          if (!b) return [];
          var e = this.shapeArgs;
          return [
            "M",
            e.x - b,
            e.y - b,
            "L",
            e.x - b,
            e.y + e.height + b,
            e.x + e.width + b,
            e.y + e.height + b,
            e.x + e.width + b,
            e.y - b,
            "Z",
          ];
        };
        e.prototype.isValid = function () {
          return Infinity !== this.value && -Infinity !== this.value;
        };
        return e;
      })(b.seriesTypes.scatter.prototype.pointClass);
      t(b.prototype, {
        dataLabelOnNull: !0,
        moveToTopOnHover: !0,
        ttBelow: !1,
      });
      return b;
    }
  );
  I(
    e,
    "Series/Heatmap/HeatmapSeries.js",
    [
      e["Core/Color/Color.js"],
      e["Series/ColorMapComposition.js"],
      e["Series/Heatmap/HeatmapPoint.js"],
      e["Core/Legend/LegendSymbol.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Renderer/SVG/SVGRenderer.js"],
      e["Core/Utilities.js"],
    ],
    function (b, e, y, B, v, t, F) {
      var z =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function e() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((e.prototype = d.prototype), new e());
            };
          })(),
        r = v.series,
        p = v.seriesTypes,
        h = p.column,
        a = p.scatter,
        d = t.prototype.symbols,
        g = F.extend,
        m = F.fireEvent,
        n = F.isNumber,
        G = F.merge,
        I = F.pick;
      t = (function (e) {
        function h() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          a.colorAxis = void 0;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          a.valueMax = NaN;
          a.valueMin = NaN;
          return a;
        }
        z(h, e);
        h.prototype.drawPoints = function () {
          var a = this;
          if ((this.options.marker || {}).enabled || this._hasPointMarkers)
            r.prototype.drawPoints.call(this),
              this.points.forEach(function (b) {
                b.graphic &&
                  (b.graphic[a.chart.styledMode ? "css" : "animate"](
                    a.colorAttribs(b)
                  ),
                  null === b.value &&
                    b.graphic.addClass("highcharts-null-point"));
              });
        };
        h.prototype.getExtremes = function () {
          var a = r.prototype.getExtremes.call(this, this.valueData),
            b = a.dataMin;
          a = a.dataMax;
          n(b) && (this.valueMin = b);
          n(a) && (this.valueMax = a);
          return r.prototype.getExtremes.call(this);
        };
        h.prototype.getValidPoints = function (a, b) {
          return r.prototype.getValidPoints.call(this, a, b, !0);
        };
        h.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        h.prototype.init = function () {
          r.prototype.init.apply(this, arguments);
          var a = this.options;
          a.pointRange = I(a.pointRange, a.colsize || 1);
          this.yAxis.axisPointRange = a.rowsize || 1;
          d.ellipse = d.circle;
          a.marker && (a.marker.r = a.borderRadius);
        };
        h.prototype.markerAttribs = function (a, b) {
          var d = a.marker || {},
            e = this.options.marker || {},
            g = a.shapeArgs || {},
            h = {};
          if (a.hasImage) return { x: a.plotX, y: a.plotY };
          if (b) {
            var l = e.states[b] || {};
            var c = (d.states && d.states[b]) || {};
            [
              ["width", "x"],
              ["height", "y"],
            ].forEach(function (a) {
              h[a[0]] =
                (c[a[0]] || l[a[0]] || g[a[0]]) +
                (c[a[0] + "Plus"] || l[a[0] + "Plus"] || 0);
              h[a[1]] = g[a[1]] + (g[a[0]] - h[a[0]]) / 2;
            });
          }
          return b ? h : g;
        };
        h.prototype.pointAttribs = function (a, d) {
          var e = r.prototype.pointAttribs.call(this, a, d),
            f = this.options || {},
            g = this.chart.options.plotOptions || {},
            h = g.series || {},
            l = g.heatmap || {};
          g =
            (a && a.options.borderColor) ||
            f.borderColor ||
            l.borderColor ||
            h.borderColor;
          h =
            (a && a.options.borderWidth) ||
            f.borderWidth ||
            l.borderWidth ||
            h.borderWidth ||
            e["stroke-width"];
          e.stroke =
            (a && a.marker && a.marker.lineColor) ||
            (f.marker && f.marker.lineColor) ||
            g ||
            this.color;
          e["stroke-width"] = h;
          d &&
            ((a = G(
              f.states[d],
              f.marker && f.marker.states[d],
              (a && a.options.states && a.options.states[d]) || {}
            )),
            (d = a.brightness),
            (e.fill =
              a.color ||
              b
                .parse(e.fill)
                .brighten(d || 0)
                .get()),
            (e.stroke = a.lineColor));
          return e;
        };
        h.prototype.setClip = function (a) {
          var b = this.chart;
          r.prototype.setClip.apply(this, arguments);
          (!1 !== this.options.clip || a) &&
            this.markerGroup.clip(
              (a || this.clipBox) && this.sharedClipKey
                ? b.sharedClips[this.sharedClipKey]
                : b.clipRect
            );
        };
        h.prototype.translate = function () {
          var a = this.options,
            b = (a.marker && a.marker.symbol) || "rect",
            e = d[b] ? b : "rect",
            f = -1 !== ["circle", "square"].indexOf(e);
          this.generatePoints();
          this.points.forEach(function (h) {
            var k = h.getCellAttributes(),
              l = {};
            l.x = Math.min(k.x1, k.x2);
            l.y = Math.min(k.y1, k.y2);
            l.width = Math.max(Math.abs(k.x2 - k.x1), 0);
            l.height = Math.max(Math.abs(k.y2 - k.y1), 0);
            var c = (h.hasImage =
              0 === ((h.marker && h.marker.symbol) || b || "").indexOf("url"));
            if (f) {
              var m = Math.abs(l.width - l.height);
              l.x = Math.min(k.x1, k.x2) + (l.width < l.height ? 0 : m / 2);
              l.y = Math.min(k.y1, k.y2) + (l.width < l.height ? m / 2 : 0);
              l.width = l.height = Math.min(l.width, l.height);
            }
            m = {
              plotX: (k.x1 + k.x2) / 2,
              plotY: (k.y1 + k.y2) / 2,
              clientX: (k.x1 + k.x2) / 2,
              shapeType: "path",
              shapeArgs: G(!0, l, {
                d: d[e](l.x, l.y, l.width, l.height, { r: a.borderRadius }),
              }),
            };
            c && (h.marker = { width: l.width, height: l.height });
            g(h, m);
          });
          m(this, "afterTranslate");
        };
        h.defaultOptions = G(a.defaultOptions, {
          animation: !1,
          borderRadius: 0,
          borderWidth: 0,
          nullColor: "#f7f7f7",
          dataLabels: {
            formatter: function () {
              var a = this.series.chart.numberFormatter,
                b = this.point.value;
              return n(b) ? a(b, -1) : "";
            },
            inside: !0,
            verticalAlign: "middle",
            crop: !1,
            overflow: !1,
            padding: 0,
          },
          marker: {
            symbol: "rect",
            radius: 0,
            lineColor: void 0,
            states: { hover: { lineWidthPlus: 0 }, select: {} },
          },
          clip: !0,
          pointRange: null,
          tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" },
          states: { hover: { halo: !1, brightness: 0.2 } },
        });
        return h;
      })(a);
      g(t.prototype, {
        axisTypes: e.seriesMembers.axisTypes,
        colorKey: e.seriesMembers.colorKey,
        directTouch: !0,
        getExtremesFromAll: !0,
        parallelArrays: e.seriesMembers.parallelArrays,
        pointArrayMap: ["y", "value"],
        pointClass: y,
        trackerGroups: e.seriesMembers.trackerGroups,
        alignDataLabel: h.prototype.alignDataLabel,
        colorAttribs: e.seriesMembers.colorAttribs,
        drawLegendSymbol: B.drawRectangle,
        getSymbol: r.prototype.getSymbol,
      });
      e.compose(t);
      v.registerSeriesType("heatmap", t);
      ("");
      ("");
      return t;
    }
  );
  I(
    e,
    "masters/modules/map.src.js",
    [
      e["Core/Globals.js"],
      e["Core/Axis/Color/ColorAxis.js"],
      e["Series/MapBubble/MapBubbleSeries.js"],
      e["Core/Chart/MapChart.js"],
      e["Maps/MapView.js"],
      e["Maps/Projection.js"],
    ],
    function (b, e, y, B, v, t) {
      b.ColorAxis = e;
      b.MapChart = B;
      b.mapChart = b.Map = B.mapChart;
      b.MapView = v;
      b.maps = B.maps;
      b.Projection = t;
      e.compose(b.Chart, b.Fx, b.Legend, b.Series);
      y.compose(b.Axis, b.Chart, b.Legend, b.Series);
    }
  );
  I(
    e,
    "masters/highmaps.src.js",
    [e["masters/highcharts.src.js"]],
    function (b) {
      b.product = "Highmaps";
      return b;
    }
  );
  e["masters/highmaps.src.js"]._modules = e;
  return e["masters/highmaps.src.js"];
});
//# sourceMappingURL=highmaps.js.map
