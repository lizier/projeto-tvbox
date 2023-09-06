define("third_party/domready/domReady", [], function() {
    function d() {
        if (!h) {
            h = !0;
            e && clearInterval(e);
            var a = m;
            if (h && a.length) {
                m = [];
                var c;
                for (c = 0; c < a.length; c += 1) a[c](k);
            }
        }
    }
    function b(a) {
        h ? a(k) : m.push(a);
        return b;
    }
    var c, a, e, g = "undefined" !== typeof window && window.document, h = !g, k = g ? document : null, m = [];
    if (g) {
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", d, !1), 
        window.addEventListener("load", d, !1); else if (window.attachEvent) {
            window.attachEvent("onload", d);
            a = document.createElement("div");
            try {
                c = null === window.frameElement;
            } catch (l) {}
            a.doScroll && c && window.external && (e = setInterval(function() {
                try {
                    a.doScroll(), d();
                } catch (c) {}
            }, 30));
        }
        "complete" === document.readyState && d();
    }
    b.version = "2.0.1";
    b.load = function(a, c, d, e) {
        e.isBuild ? d(null) : b(d);
    };
    return b;
});

define("qowtRoot/utils/typeUtils", [], function() {
    function d(a, b, d) {
        if (d.types.every(function(a) {
            var b = c[a];
            if (!b) throw Error("Bad config to checkArgTypes: unknown type: " + a);
            return !b(d.value);
        })) {
            var h = 1 === d.types.length ? d.types[0] : "[" + d.types.join(",") + "]";
            throw Error("Argument " + b + " passed to function " + a + " was supposed to be of type " + h + " but had value " + d.value);
        }
    }
    var b = {
        checkArgTypes: function(a, c) {
            for (var b in c) {
                var h = {
                    value: c[b][0],
                    types: c[b].slice(1)
                };
                d(a, b, h);
            }
        },
        isObject: function(a) {
            return "object" === typeof a && null !== a;
        },
        isPromise: function(a) {
            return a instanceof Promise;
        },
        isPromiseLike: function(a) {
            return !(!a || !b.isFunction(a.then));
        },
        isList: function(a) {
            return "[object Array]" === Object.prototype.toString.call(a);
        },
        isNumber: function(a) {
            return "number" === typeof a && !isNaN(a);
        },
        isInteger: function(a) {
            return "number" === typeof a && parseInt(a, 10) === a;
        },
        isFunction: function(a) {
            return "function" === typeof a;
        },
        isString: function(a) {
            return "[object String]" === Object.prototype.toString.call(a);
        },
        isRegex: function(a) {
            return "[object RegExp]" === Object.prototype.toString.call(a);
        },
        isNode: function(a) {
            return a instanceof Node;
        },
        isNull: function(a) {
            return null === a;
        },
        isUndefined: function(a) {
            return void 0 === a;
        },
        isBoolean: function(a) {
            return "boolean" === typeof a;
        },
        getType: function(a) {
            var b;
            Object.keys(c).forEach(function(d) {
                c[d](a) && (b = d);
            });
            return b;
        },
        isArgumentsObjectOrList: function(a) {
            return a instanceof Object && a.hasOwnProperty("length");
        },
        extend: function(a, c) {
            for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
        },
        createNewType: function(a) {
            var b = function() {}, d = {
                isOfType: function(a) {
                    return void 0 !== a && null !== a && a.constructor === b;
                },
                markAsType: function(a) {
                    Object.defineProperty(a, "constructor", {
                        value: b,
                        configurable: !1,
                        writable: !1,
                        enumerable: !1
                    });
                    return a;
                }
            };
            if (a) {
                if (c[a]) throw Error("Already registered type " + a);
                c[a] = d.isOfType;
            }
            return d;
        }
    }, c = {
        string: b.isString,
        object: b.isObject,
        promise: b.isPromise,
        promiseLike: b.isPromiseLike,
        node: b.isNode,
        regex: b.isRegex,
        "function": b.isFunction,
        number: b.isNumber,
        list: b.isList,
        "boolean": b.isBoolean,
        "null": b.isNull,
        undefined: b.isUndefined
    };
    return b;
});

(function() {
    var d = {}, b = window.sessionStorage.getItem("featureOverrides");
    b && (d = JSON.parse(b));
    d.isRelease = !0;
    d.edit = !1;
    window.sessionStorage.setItem("featureOverrides", JSON.stringify(d));
    window.localStorage.removeItem("testsToInclude");
    window.localStorage.removeItem("builtInTests");
})();

define("configs/releaseFeatures", function() {});

(function() {
    var d = {}, b = window.sessionStorage.getItem("featureOverrides");
    b && (d = JSON.parse(b));
    d.save = !!(window.chrome && window.chrome.fileSystem && window.chrome.fileSystem.chooseEntry);
    window.sessionStorage.setItem("featureOverrides", JSON.stringify(d));
})();

define("configs/chromeFeatures", function() {});

define("qowtRoot/features/pack", [], function() {
    return {
        edit: !0,
        save: !1,
        pointEdit: !1,
        hats: !0
    };
});

define("qowtRoot/features/utils", [ "qowtRoot/features/pack" ], function(d) {
    var b = {
        isEnabled: function(a) {
            a = d[a];
            return void 0 === a ? !1 : a;
        },
        enable: function(a) {
            d[a] = !0;
        },
        disable: function(a) {
            d[a] = !1;
        },
        setOverrides: function(a) {
            for (var c in a) a.hasOwnProperty(c) && (d[c] = a[c]);
        },
        isDebug: function() {
            return void 0 !== c ? c : !b.isEnabled("isRelease");
        },
        setDebugOverride: function(a) {
            c = a;
        },
        clearDebugOverride: function() {
            c = void 0;
        }
    }, c;
    return b;
});

(function(d) {
    d("qowtRoot/third_party/when/lib/timer", [ "require" ], function(b) {
        return {
            set: setTimeout,
            clear: clearTimeout
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d(require);
});

(function(d) {
    d("qowtRoot/third_party/when/lib/timed", [], function() {
        return function(b, c, a) {
            a.prototype.delay = function(a) {
                var c = this;
                return new this.constructor(function(d, k, m) {
                    c.then(function(c) {
                        b(function() {
                            d(c);
                        }, a);
                    }, k, m);
                });
            };
            a.prototype.timeout = function(a, d) {
                var h = this, k = 1 < arguments.length;
                return new this.constructor(function(m, l, t) {
                    var n = b(function() {
                        l(k ? d : Error("timed out after " + a + "ms"));
                    }, a);
                    h.then(function(a) {
                        c(n);
                        m(a);
                    }, function(a) {
                        c(n);
                        l(a);
                    }, t);
                });
            };
            return a;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/array", [], function() {
        return function(b) {
            var c = Array.prototype.map, a = Array.prototype.reduce, d = Array.prototype.reduceRight, g = Array.prototype.forEach, h = b.resolve, k = b.all;
            b.any = function(a) {
                return new b(function(c, b) {
                    function d(a) {
                        k.push(a);
                        0 === --e && b(k);
                    }
                    var e = 0, k = [];
                    g.call(a, function(a) {
                        ++e;
                        h(a).then(c, d);
                    });
                    0 === e && c();
                });
            };
            b.some = function(a, c) {
                return new b(function(b, d, e) {
                    function k(a) {
                        0 < f && (--f, p.push(a), 0 === f && b(p));
                    }
                    function v(a) {
                        0 < r && (--r, u.push(a), 0 === r && d(u));
                    }
                    var f = 0, r, p = [], u = [];
                    g.call(a, function(a) {
                        ++f;
                        h(a).then(k, v, e);
                    });
                    c = Math.max(c, 0);
                    r = f - c + 1;
                    f = Math.min(c, f);
                    0 === f && b(p);
                });
            };
            b.settle = function(a) {
                return k(c.call(a, function(a) {
                    function c() {
                        return a.inspect();
                    }
                    a = h(a);
                    return a.then(c, c);
                }));
            };
            b.map = function(a, b, d) {
                return k(c.call(a, function(a) {
                    return h(a).then(b, d);
                }));
            };
            b.reduce = function(c, b) {
                function d(a, c, e) {
                    return h(a).then(function(a) {
                        return h(c).then(function(c) {
                            return b(a, c, e);
                        });
                    });
                }
                return 2 < arguments.length ? a.call(c, d, arguments[2]) : a.call(c, d);
            };
            b.reduceRight = function(a, c) {
                function b(a, d, e) {
                    return h(a).then(function(a) {
                        return h(d).then(function(b) {
                            return c(a, b, e);
                        });
                    });
                }
                return 2 < arguments.length ? d.call(a, b, arguments[2]) : d.call(a, b);
            };
            b.prototype.spread = function(a) {
                return this.then(k).then(function(c) {
                    return a.apply(void 0, c);
                });
            };
            return b;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/fatal", [ "require", "./timer" ], function(b) {
        var c = b("./timer").set;
        return function(a) {
            c(function() {
                throw a;
            }, 0);
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d(require);
});

(function(d) {
    d("qowtRoot/third_party/when/lib/flow", [ "require", "./fatal" ], function(b) {
        function c() {
            throw new TypeError("catch predicate must be a function");
        }
        function a(a, c) {
            return function() {
                a.call(this);
                return c;
            };
        }
        function d() {}
        var g = b("./fatal");
        return function(b) {
            function k(a, c) {
                return function(b) {
                    return (c === Error || null != c && c.prototype instanceof Error ? b instanceof c : c(b)) ? a.call(this, b) : l(b);
                };
            }
            var m = b.resolve, l = b.reject, t = b.prototype["catch"];
            b.prototype.done = function(a, c) {
                var b = this._handler;
                b.when(this._maybeFatal, d, this, b.receiver, a, c);
            };
            b.prototype._maybeFatal = function(a) {
                if (Object(a) === a) m(a)["catch"](this._fatal);
            };
            b.prototype._fatal = g;
            b.prototype["catch"] = b.prototype.otherwise = function(a) {
                return 1 === arguments.length ? t.call(this, a) : "function" !== typeof a ? this.ensure(c) : t.call(this, k(arguments[1], a));
            };
            b.prototype["finally"] = b.prototype.ensure = function(c) {
                if ("function" !== typeof c) return this;
                c = a(c, this);
                return this.then(c, c);
            };
            b.prototype["else"] = b.prototype.orElse = function(a) {
                return this.then(void 0, function() {
                    return a;
                });
            };
            b.prototype.yield = function(a) {
                return this.then(function() {
                    return a;
                });
            };
            b.prototype.tap = function(a) {
                return this.then(a).yield(this);
            };
            return b;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d(require);
});

(function(d) {
    d("qowtRoot/third_party/when/lib/inspect", [], function() {
        return function(b) {
            b.prototype.inspect = function() {
                return this._handler.inspect();
            };
            return b;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/iterate", [], function() {
        return function(b) {
            function c(a, b, k, m) {
                function l(l) {
                    return d(k(l)).then(function() {
                        return c(a, b, k, a(l));
                    });
                }
                return d(m).then(function(a) {
                    return d(b(a)).then(function(c) {
                        return c ? a : l(a);
                    });
                });
            }
            function a(c, b, k, m) {
                function l(l, m) {
                    return d(k(l)).then(function() {
                        return a(c, b, k, m);
                    });
                }
                return d(m).then(function(a) {
                    return d(b(a)).then(function(b) {
                        return b ? a : d(c(a)).spread(l);
                    });
                });
            }
            var d = b.resolve;
            b.iterate = c;
            b.unfold = a;
            return b;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/progress", [], function() {
        return function(b) {
            b.prototype.progress = function(c) {
                return this.then(void 0, void 0, c);
            };
            return b;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/with", [], function() {
        return function(b) {
            b.prototype["with"] = b.prototype.withThis = b.prototype._bindContext;
            return b;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/makePromise", [], function() {
        return function(b) {
            function c(c) {
                var b = this;
                this._handler = new n();
                a(c, function(a) {
                    b._handler.resolve(a);
                }, function(a) {
                    b._handler.reject(a);
                }, function(a) {
                    b._handler.notify(a);
                });
            }
            function a(a, c, b, d) {
                try {
                    a(c, b, d);
                } catch (e) {
                    b(e);
                }
            }
            function d(a) {
                return new g(new x(new r(a)));
            }
            function g(a) {
                this._handler = a;
            }
            function h(a, b) {
                if (a instanceof c) {
                    var d = a._handler.join();
                    return b === d ? new r(new TypeError("Promise cycle")) : d;
                }
                return q(a) ? m(a) : new f(a);
            }
            function k(a) {
                return a instanceof c ? a._handler.join() : m(a);
            }
            function m(a) {
                try {
                    var c = a.then;
                    return "function" === typeof c ? new v(c, a) : new f(a);
                } catch (b) {
                    return new r(b);
                }
            }
            function l() {}
            function t(a) {
                this.handler = a;
                if (this._isMonitored()) {
                    var c = this._env.promiseMonitor.captureStack();
                    this.trace = a._addTrace(c);
                }
            }
            function n(a) {
                this.consumers = [];
                this.receiver = a;
                this.handler = void 0;
                this.resolved = !1;
                this._isMonitored() && (this.trace = this._env.promiseMonitor.captureStack());
            }
            function x(a) {
                t.call(this, a);
            }
            function z(a, c) {
                t.call(this, a);
                this.receiver = c;
            }
            function v(a, c) {
                n.call(this);
                this.assimilated = !1;
                this.untrustedThen = a;
                this.thenable = c;
            }
            function f(a) {
                this.value = a;
            }
            function r(a) {
                this.value = a;
                this.observed = !1;
                this._isMonitored() && (this.key = this._env.promiseMonitor.startTrace(a));
            }
            function p() {
                return {
                    state: "pending"
                };
            }
            function u(a, c, b, d, e, q, g, k) {
                this.a = a;
                this.b = c;
                this.c = b;
                this.d = d;
                this.e = e;
                this.f = q;
                this.g = g;
                this.handler = k;
            }
            function A(a, c) {
                this.q = a;
                this.value = c;
            }
            function q(a) {
                return ("object" === typeof a || "function" === typeof a) && null !== a;
            }
            function D(a, c, b) {
                try {
                    return a.call(b, c);
                } catch (q) {
                    return d(q);
                }
            }
            function w() {}
            var C, B = b.scheduler, y = Object.create || function(a) {
                function c() {}
                c.prototype = a;
                return new c();
            };
            c.resolve = function(a) {
                return a instanceof c ? a : new g(new x(h(a)));
            };
            c.reject = d;
            c.never = function() {
                return C;
            };
            c._defer = function() {
                return new g(new n());
            };
            c.prototype.then = function(a, c, b) {
                var d = this._handler, e = new n(d.receiver);
                d.when(e.resolve, e.notify, e, d.receiver, a, c, b);
                return new g(e);
            };
            c.prototype["catch"] = c.prototype.otherwise = function(a) {
                return this.then(void 0, a);
            };
            c.prototype._bindContext = function(a) {
                return new g(new z(this._handler, a));
            };
            c.all = function(a) {
                function c(a, b, d, q) {
                    d.when(w, w, void 0, a, function(a) {
                        b[q] = a;
                        0 === --e && this.resolve(b);
                    }, a.reject, a.notify);
                }
                var b = new n(), d = a.length >>> 0, e = d, h = [], f, u;
                for (f = 0; f < d; ++f) f in a ? (u = a[f], q(u) ? c(b, h, k(u), f) : (h[f] = u, 
                --e)) : --e;
                0 === e && b.resolve(h);
                return new g(b);
            };
            c.race = function(a) {
                if (Object(a) === a && 0 === a.length) return C;
                for (var c = new n(), b = 0; b < a.length; ++b) h(a[b]).when(w, w, void 0, c, c.resolve, c.reject);
                return new g(c);
            };
            g.prototype = y(c.prototype);
            l.prototype.inspect = p;
            l.prototype.when = w;
            l.prototype.resolve = w;
            l.prototype.reject = w;
            l.prototype.notify = w;
            l.prototype.join = function() {
                return this;
            };
            l.prototype._env = b.monitor || c;
            l.prototype._addTrace = w;
            l.prototype._isMonitored = function() {
                return "undefined" !== typeof this._env.promiseMonitor;
            };
            t.prototype = y(l.prototype);
            t.prototype.join = function() {
                return this.handler.join();
            };
            t.prototype.inspect = function() {
                return this.handler.inspect();
            };
            t.prototype._addTrace = function(a) {
                return this.handler._addTrace(a);
            };
            n.prototype = y(l.prototype);
            n.prototype.inspect = function() {
                return this.resolved ? this.handler.join().inspect() : p();
            };
            n.prototype.resolve = function(a) {
                this._join(h(a, this));
            };
            n.prototype.reject = function(a) {
                this._join(new r(a));
            };
            n.prototype.join = function() {
                return this.resolved ? this.handler.join() : this;
            };
            n.prototype.run = function() {
                var a = this.consumers, c = this.handler = this.handler.join();
                this.consumers = void 0;
                for (var b = 0; b < a.length; b += 7) c.when(a[b], a[b + 1], a[b + 2], a[b + 3], a[b + 4], a[b + 5], a[b + 6]);
            };
            n.prototype._join = function(a) {
                this.resolved || (this.resolved = !0, this.handler = a, B.enqueue(this), this._isMonitored() && (this.trace = a._addTrace(this.trace)));
            };
            n.prototype.when = function(a, b, c, d, e, q, g) {
                this.resolved ? B.enqueue(new u(a, b, c, d, e, q, g, this.handler.join())) : this.consumers.push(a, b, c, d, e, q, g);
            };
            n.prototype.notify = function(a) {
                this.resolved || B.enqueue(new A(this.consumers, a));
            };
            n.prototype._addTrace = function(a) {
                return this.resolved ? this.handler._addTrace(a) : a;
            };
            x.prototype = y(t.prototype);
            x.prototype.when = function(a, b, c, d, e, q, g) {
                B.enqueue(new u(a, b, c, d, e, q, g, this.join()));
            };
            z.prototype = y(t.prototype);
            z.prototype.when = function(a, b, c, d, e, q, g) {
                void 0 !== this.receiver && (d = this.receiver);
                this.join().when(a, b, c, d, e, q, g);
            };
            v.prototype = y(n.prototype);
            v.prototype.when = function(a, b, c, d, e, q, g) {
                this.assimilated || (this.assimilated = !0, this._assimilate());
                n.prototype.when.call(this, a, b, c, d, e, q, g);
            };
            v.prototype._assimilate = function() {
                var a = this;
                this._try(this.untrustedThen, this.thenable, function(b) {
                    a.resolve(b);
                }, function(b) {
                    a.reject(b);
                }, function(b) {
                    a.notify(b);
                });
            };
            v.prototype._try = function(a, b, c, d, e) {
                try {
                    a.call(b, c, d, e);
                } catch (q) {
                    d(q);
                }
            };
            f.prototype = y(l.prototype);
            f.prototype.inspect = function() {
                return {
                    state: "fulfilled",
                    value: this.value
                };
            };
            f.prototype.when = function(a, b, c, d, e) {
                b = "function" === typeof e ? D(e, this.value, d) : this.value;
                a.call(c, b);
            };
            r.prototype = y(l.prototype);
            r.prototype.inspect = function() {
                return {
                    state: "rejected",
                    reason: this.value
                };
            };
            r.prototype.when = function(a, b, c, q, g, f) {
                this._isMonitored() && !this.observed && this._env.promiseMonitor.removeTrace(this.key);
                this.observed = !0;
                b = "function" === typeof f ? D(f, this.value, q) : d(this.value);
                a.call(c, b);
            };
            r.prototype._addTrace = function(a) {
                this.observed || this._env.promiseMonitor.updateTrace(this.key, a);
            };
            C = new g(new l());
            u.prototype.run = function() {
                this.handler.when(this.a, this.b, this.c, this.d, this.e, this.f, this.g);
            };
            A.prototype.run = function() {
                for (var a = this.q, b = 1; b < a.length; b += 7) this._notify(a[b], a[b + 1], a[b + 2], a[b + 5]);
            };
            A.prototype._notify = function(a, b, c, d) {
                var e;
                if ("function" === typeof d) try {
                    e = d.call(c, this.value);
                } catch (q) {
                    e = q;
                } else e = this.value;
                a.call(b, e);
            };
            return c;
        };
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/Queue", [], function() {
        function b(b) {
            this.head = this.tail = this.length = 0;
            this.buffer = Array(1 << b);
        }
        b.prototype.push = function(b) {
            this.length === this.buffer.length && this._ensureCapacity(2 * this.length);
            this.buffer[this.tail] = b;
            this.tail = this.tail + 1 & this.buffer.length - 1;
            ++this.length;
            return this.length;
        };
        b.prototype.shift = function() {
            var b = this.buffer[this.head];
            this.buffer[this.head] = void 0;
            this.head = this.head + 1 & this.buffer.length - 1;
            --this.length;
            return b;
        };
        b.prototype._ensureCapacity = function(b) {
            var a = this.head, d = this.buffer, g = Array(b), h = 0, k;
            if (0 === a) for (k = this.length; h < k; ++h) g[h] = d[h]; else {
                b = d.length;
                for (k = this.tail; a < b; ++h, ++a) g[h] = d[a];
                for (a = 0; a < k; ++h, ++a) g[h] = d[a];
            }
            this.buffer = g;
            this.head = 0;
            this.tail = this.length;
        };
        return b;
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d();
});

(function(d) {
    d("qowtRoot/third_party/when/lib/scheduler", [ "require", "./Queue" ], function(b) {
        function c(b) {
            this._enqueue = b;
            this._handlerQueue = new a(15);
            var c = this;
            this.drainQueue = function() {
                c._drainQueue();
            };
        }
        var a = b("./Queue");
        c.prototype.enqueue = function(a) {
            1 === this._handlerQueue.push(a) && this._enqueue(this.drainQueue);
        };
        c.prototype._drainQueue = function() {
            for (var a = this._handlerQueue; 0 < a.length; ) a.shift().run();
        };
        return c;
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d(require);
});

(function(d) {
    d("qowtRoot/third_party/when/lib/async", [ "require" ], function(b) {
        var c;
        return "undefined" !== typeof process && null !== process && "function" === typeof process.nextTick ? function(a) {
            process.nextTick(a);
        } : (c = "function" === typeof MutationObserver && MutationObserver || "function" === typeof WebKitMutationObserver && WebKitMutationObserver) ? function(a, b) {
            var c, d = a.createElement("div");
            new b(function() {
                var a = c;
                c = void 0;
                a();
            }).observe(d, {
                attributes: !0
            });
            return function(a) {
                c = a;
                d.setAttribute("class", "x");
            };
        }(document, c) : function(a) {
            var b = setTimeout;
            return function(a) {
                b(a, 0);
            };
        }(b);
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d(require);
});

(function(d) {
    d("qowtRoot/third_party/when/lib/Promise", [ "require", "./makePromise", "./scheduler", "./async" ], function(b) {
        var c = b("./makePromise"), a = b("./scheduler");
        b = b("./async");
        return c({
            scheduler: new a(b),
            monitor: "undefined" !== typeof console ? console : void 0
        });
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d(require);
});

(function(d) {
    d("qowtRoot/third_party/when/when", "require ./lib/timer ./lib/timed ./lib/array ./lib/flow ./lib/inspect ./lib/iterate ./lib/progress ./lib/with ./lib/Promise".split(" "), function(b) {
        function c(a, b, c, d) {
            var e = r(a);
            return 2 > arguments.length ? e : e.then(b, c, d);
        }
        function a(a) {
            return function() {
                return g(a, this, p.call(arguments));
            };
        }
        function d(a) {
            return g(a, this, p.call(arguments, 1));
        }
        function g(a, b, c) {
            return f.all(c).then(function(c) {
                return a.apply(b, c);
            });
        }
        function h() {
            function a(b) {
                d._handler.resolve(b);
            }
            function b(a) {
                d._handler.reject(a);
            }
            function c(a) {
                d._handler.notify(a);
            }
            var d = f._defer();
            this.promise = d;
            this.resolve = a;
            this.reject = b;
            this.notify = c;
            this.resolver = {
                resolve: a,
                reject: b,
                notify: c
            };
        }
        var k = b("./lib/timer"), m = b("./lib/timed"), l = b("./lib/array"), t = b("./lib/flow"), n = b("./lib/inspect"), x = b("./lib/iterate"), z = b("./lib/progress"), v = b("./lib/with"), f = b("./lib/Promise"), f = [ l, t, x, z, n, v ].reduceRight(function(a, b) {
            return b(a);
        }, m(k.set, k.clear, f)), r = f.resolve, p = Array.prototype.slice;
        c.promise = function(a) {
            return new f(a);
        };
        c.resolve = f.resolve;
        c.reject = f.reject;
        c.lift = a;
        c["try"] = d;
        c.attempt = d;
        c.iterate = f.iterate;
        c.unfold = f.unfold;
        c.join = function() {
            return f.all(arguments);
        };
        c.all = function(a) {
            return c(a, f.all);
        };
        c.settle = function(a) {
            return c(a, f.settle);
        };
        c.any = a(f.any);
        c.some = a(f.some);
        c.map = function(a, b) {
            return c(a, function(a) {
                return f.map(a, b);
            });
        };
        c.reduce = function(a, b) {
            var d = p.call(arguments, 1);
            return c(a, function(a) {
                d.unshift(a);
                return f.reduce.apply(f, d);
            });
        };
        c.reduceRight = function(a, b) {
            var d = p.call(arguments, 1);
            return c(a, function(a) {
                d.unshift(a);
                return f.reduceRight.apply(f, d);
            });
        };
        c.isPromiseLike = function(a) {
            return a && "function" === typeof a.then;
        };
        c.Promise = f;
        c.defer = function() {
            return new h();
        };
        return c;
    });
})("function" === typeof define && define.amd ? define : function(d) {
    module.exports = d(require);
});

define("qowtRoot/utils/promiseUtils", [ "qowtRoot/utils/typeUtils", "qowtRoot/third_party/when/when" ], function(d, b) {
    var c = {
        cast: function(a) {
            return a instanceof Promise ? a : Promise.resolve(a);
        },
        delay: function(a, b) {
            a = a || 0;
            return new Promise(function(c) {
                setTimeout(c.bind(void 0, b), a);
            });
        },
        delayThenReject: function(a, b) {
            a = a || 0;
            return new Promise(function(c, d) {
                setTimeout(d.bind(c, b), a);
            });
        },
        throwAndEscapeChain: function(a) {
            a instanceof Error || (console.error("throwAndEscapeChain wrapping value in new Error: ", a), 
            a = Error(a));
            b.reject(a).done();
            throw a;
        },
        pipeline: function(a) {
            function b() {
                for (var h = Array.prototype.slice.call(arguments, 0); 0 < a.length; ) {
                    var m = a.shift();
                    if (d.isPromiseLike(m)) return c.cast(m).then(function(c) {
                        a.unshift(c);
                        return b.apply(g, h);
                    });
                    d.checkArgTypes("PromiseUtils.pipeline", {
                        task: [ m, "function" ]
                    });
                    m = m.apply(g, h);
                    if (d.isPromiseLike(m)) return c.cast(m).then(function(a) {
                        return b(a);
                    });
                    h = [ m ];
                }
                return h[0];
            }
            var g = this, h = Array.prototype.slice.call(arguments, 0);
            if (h.some(d.isPromiseLike)) return Promise.all(h).then(function(a) {
                return c.pipeline.apply(g, a);
            });
            d.checkArgTypes("PromiseUtils.pipeline", {
                tasks: [ a, "list" ]
            });
            a = a.slice(0);
            return b.apply(g, h.slice(1));
        },
        "finally": function(a, b) {
            function d() {
                return c.cast(b()).then(function() {
                    return a;
                });
            }
            return c.cast(a).then(d, d);
        },
        waitForNextMacroTurn: function(a) {
            return new Promise(function(b) {
                window.setTimeout(b.bind(null, a), 0);
            });
        }
    };
    return c;
});

define("utils/analytics/googleAnalytics", [ "qowtRoot/features/utils", "qowtRoot/utils/promiseUtils" ], function(d, b) {
    function c(b, c) {
        var e;
        void 0 !== f ? e = f ? Promise.resolve() : Promise.reject(Error("ga permission cached (not permitted)")) : (window.analytics && chrome && chrome.metricsPrivate && chrome.metricsPrivate.getIsCrashReportingEnabled && (!d.isDebug() || void 0 !== window.__gaMock) ? e = Promise.resolve() : (console.warn("GA not supported on this platform"), 
        e = Promise.reject(Error("GA not supported on this platform"))), e = e.then(a).catch(h));
        return e.then(k).then(b.bind(null, c)).catch(function() {});
    }
    function a() {
        var a = Error("Crash reporting setting timed out");
        return Promise.race([ e(), b.delayThenReject(1e3, a) ]).then(g);
    }
    function e() {
        return new Promise(function(a) {
            chrome.metricsPrivate.getIsCrashReportingEnabled(a);
        });
    }
    function g(a) {
        return new Promise(function(b, c) {
            r = window.analytics.getService(z);
            r.getConfig().addCallback(function(d) {
                d.setTrackingPermitted(a);
                (f = a) ? b() : (console.warn("Crash reporting not allowed"), c());
            });
        });
    }
    function h() {
        f = !1;
        return Promise.reject();
    }
    function k() {
        void 0 === p && m("QO");
        return Promise.resolve();
    }
    function m(a) {
        p && p.sendAppView(a);
        p = r.getTracker(x[a]);
        u && p.set(window.analytics.Parameters.SESSION_GROUP, u);
        "QO" !== a && A && p.set(window.analytics.Parameters.APP_ID, A);
        p.forceSessionStart();
        return Promise.resolve();
    }
    function l(a) {
        v !== a && (v = a, p.sendAppView(a));
        return Promise.resolve();
    }
    function t(a) {
        p.sendException(a.msg, a.fatal);
        return Promise.resolve();
    }
    function n(a) {
        p.sendEvent(a.category, a.action, a.label, a.value);
        return Promise.resolve();
    }
    var x = {
        word: "UA-44583639-1",
        sheet: "UA-44583639-2",
        point: "UA-44583639-3",
        QO: "UA-44583639-4"
    }, z = "Quickoffice", v, f, r, p, u, A;
    return {
        setFileExt: function(a) {
            A = a;
        },
        setSessionGroup: function(a) {
            u = a;
        },
        setTracker: function(a) {
            return c(m, a);
        },
        sendState: function(a) {
            return c(l, a);
        },
        sendException: function(a) {
            return c(t, a);
        },
        sendEvent: function(a) {
            return c(n, a);
        },
        reset: function() {
            p = r = f = v = void 0;
        }
    };
});

define("qowtRoot/utils/i18n", [ "qowtRoot/utils/typeUtils", "utils/analytics/googleAnalytics" ], function(d, b) {
    var c = {
        getMessage: function(a, b) {
            var g = "????";
            if (!chrome || !chrome.i18n) return a;
            d.isString(a) ? (g = chrome.i18n.getMessage(a, b), g || (g = a, c.logError_("Missing translation", a))) : c.logError_("Invalid string translation Id", a);
            return g;
        },
        logError_: function(a, c) {
            console.error(a + " " + c);
            b.sendException({
                msg: a,
                fatal: !1
            });
        }
    };
    return c;
});

require(["third_party/domready/domReady!"], function () {
    require(["qowtRoot/utils/i18n"], function (d) {
        var b = d.getMessage("extension_popup_new_presentation_document");        
        autoOpen(b);
    });
});

function autoOpen() {
	var b = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    chrome.windows.getCurrent(function(c) {
        chrome.runtime.sendMessage({
            newCreate: "point",
            mimeType: b,
            currentWindowId: c.id
        }, function() {
            window.close();
        });
    });
	
}

define("mainPopup", function() {});

