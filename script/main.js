define("events/lib/emitter", [], function() {
    function Emitter() {}
    Emitter.prototype.emit = function(type) {
        if (type === "error") {
            if (!this._events || !this._events.error || this._events.error instanceof Array && !this._events.error.length) {
                if (arguments[1] instanceof Error) {
                    throw arguments[1];
                } else {
                    throw new Error("Uncaught, unspecified 'error' event.");
                }
                return false;
            }
        }
        if (!this._events) return false;
        var handler = this._events[type];
        if (!handler) return false;
        if (typeof handler == "function") {
            switch (arguments.length) {
              case 1:
                handler.call(this);
                break;

              case 2:
                handler.call(this, arguments[1]);
                break;

              case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;

              default:
                var l = arguments.length;
                var args = new Array(l - 1);
                for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
                handler.apply(this, args);
            }
            return true;
        } else if (handler instanceof Array) {
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            var listeners = handler.slice();
            for (var i = 0, l = listeners.length; i < l; i++) {
                listeners[i].apply(this, args);
            }
            return true;
        } else {
            return false;
        }
    };
    Emitter.prototype.on = Emitter.prototype.addListener = function(type, listener) {
        if (!this._events) this._events = {};
        this.emit("newListener", type, typeof listener.listener === "function" ? listener.listener : listener);
        if (!this._events[type]) {
            this._events[type] = listener;
        } else if (this._events[type] instanceof Array) {
            this._events[type].push(listener);
        } else {
            this._events[type] = [ this._events[type], listener ];
        }
        return this;
    };
    Emitter.prototype.once = function(type, listener) {
        var self = this;
        function g() {
            self.off(type, g);
            listener.apply(this, arguments);
        }
        g.listener = listener;
        self.on(type, g);
        return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = function(type, listener) {
        if (!this._events || !this._events[type]) return this;
        var list = this._events[type];
        if (list instanceof Array) {
            var pos = -1;
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                    pos = i;
                    break;
                }
            }
            if (pos < 0) return this;
            list.splice(pos, 1);
            if (list.length == 0) {
                delete this._events[type];
            }
        } else if (list === listener || list.listener && list.listener === listener) {
            delete this._events[type];
        }
        return this;
    };
    Emitter.prototype.removeAllListeners = function(type) {
        if (arguments.length === 0) {
            this._events = {};
            return this;
        }
        if (type && this._events && this._events[type]) this._events[type] = null;
        return this;
    };
    Emitter.prototype.listeners = function(type) {
        if (!this._events) this._events = {};
        if (!this._events[type]) this._events[type] = [];
        if (!(this._events[type] instanceof Array)) {
            this._events[type] = [ this._events[type] ];
        }
        return this._events[type];
    };
    return Emitter;
});

define("events/main", [ "exports", "module", "./lib/emitter" ], function(exports, module, Emitter) {
    exports = module.exports = Emitter;
    exports.Emitter = exports.EventEmitter = Emitter;
});

define("events", [ "events/main" ], function(main) {
    return main;
});

define("class/class", {
    inherits: function(ctor, superCtor) {
        ctor.super_ = superCtor;
        var F = function() {};
        F.prototype = superCtor.prototype;
        ctor.prototype = new F();
        ctor.prototype.constructor = ctor;
    },
    augment: function(ctor, mixin, options) {
        options = options || {};
        var overwrite = options.overwrite === undefined ? true : options.overwrite;
        for (var method in mixin) {
            if (overwrite || !ctor.prototype[method]) {
                ctor.prototype[method] = mixin[method];
            }
        }
    }
});

define("class", [ "class/class" ], function(main) {
    return main;
});

define("controllers/base/base", [ "events", "class" ], function(Emitter, clazz) {
    function Controller(basePath) {
        Emitter.call(this);
        this.shell = undefined;
        this.basePath = basePath;
    }
    clazz.inherits(Controller, Emitter);
    Controller.prototype.load = function() {};
    Controller.prototype.unload = function() {};
    Controller.prototype.dispatch = function(ctx, done) {
        return done();
    };
    return Controller;
});

define("controllers/base/pjax", [ "./base", "class", "jquery", "jquery.pjax" ], function(Controller, clazz, $, __$_pjax) {
    function PjaxController(basePath, path) {
        if (!path) {
            path = basePath[basePath.length - 1] == "/" ? basePath : basePath + "/";
        }
        Controller.call(this, basePath);
        this.canonicalPath = path;
    }
    clazz.inherits(PjaxController, Controller);
    PjaxController.prototype.load = function(ctx) {
        var self = this, url = typeof this.canonicalPath == "string" ? this.canonicalPath : ctx.canonicalPath;
        $.pjax.state = window.history.state;
        $.pjax({
            url: url,
            container: "#content",
            fragment: "#content",
            push: false
        }).done(function(data) {
            self.emit("ready");
        });
    };
    PjaxController.prototype.dispatch = function(ctx, done) {
        ctx.handled = true;
        PjaxController.super_.prototype.dispatch.call(this, ctx, done);
    };
    return PjaxController;
});

define("controllers/home", [ "./base/pjax", "class" ], function(PjaxController, clazz) {
    function HomeController() {
        PjaxController.call(this, "/");
    }
    clazz.inherits(HomeController, PjaxController);
    return new HomeController();
});

define("controllers/docs", [ "./base/pjax", "class", "highlight", "jquery", "jquery.accordion" ], function(PjaxController, clazz, hljs, $, __$_accordion) {
    var _submenuOffset;
    function onscroll(ev) {
        var submenu = $(".toc nav");
        var sections = $(".contents section");
        var cur_pos = $(window).scrollTop();
        submenu.toggleClass("is-fixed", _submenuOffset && _submenuOffset.top < $(window).scrollTop());
        sections.each(function() {
            var top = $(this).offset().top - 50;
            var bottom = top + $(this).outerHeight();
            var path = $(this).attr("id") + "/";
            if (cur_pos >= top && cur_pos <= bottom) {
                submenu.find("a").removeClass("active").closest("[data-content]").removeClass("active");
                sections.removeClass("active");
                $(this).addClass("active");
                submenu.find('a[href="/docs/' + path + '"]').addClass("active").closest("[data-content]").addClass("active");
            }
        });
    }
    function DocsController() {
        PjaxController.call(this, "/docs", "/docs/downloads/html/");
        this.on("ready", function() {
            _submenuOffset = $(".toc nav").offset();
            $(window).on("scroll", onscroll);
            if (window.matchMedia && window.matchMedia("screen and (min-width: 992px) and (max-height: 750px)")) {
                $(".toc [data-accordion] [data-content]").css({
                    "max-height": "0px",
                    overflow: "hidden"
                });
                $(".toc [data-accordion] [data-content] .active").closest("[data-content]").css({
                    "max-height": "100%",
                    overflow: "visible"
                });
            }
            $(".accordion").accordion({
                transitionSpeed: 400
            });
            hljs.configure({
                classPrefix: ""
            });
            $("pre code").each(function(i, block) {
                hljs.highlightBlock(block);
            });
        });
    }
    clazz.inherits(DocsController, PjaxController);
    DocsController.prototype.unload = function() {
        $(window).off("scroll", onscroll);
    };
    DocsController.prototype.dispatch = function(ctx, done) {
        if (ctx.init) {
            ctx.handled = true;
            return done();
        }
        var path = ctx.params[0];
        if (path[path.length - 1] == "/") {
            path = path.slice(0, -1);
        }
        var id = path || "README";
        var el = $("#" + id);
        if (el.length) {
            this.shell.scrollToElementById(id);
            ctx.handled = true;
            return done();
        }
        $.pjax.state = window.history.state;
        var self = this;
        $.pjax({
            url: this.canonicalPath,
            container: ".contents",
            fragment: ".contents",
            push: false
        }).done(function(data) {
            hljs.configure({
                classPrefix: ""
            });
            $("pre code").each(function(i, block) {
                hljs.highlightBlock(block);
            });
            self.shell.scrollToElementById(id, false);
            ctx.handled = true;
            done();
        });
    };
    return new DocsController();
});

define("controllers/features", [ "./base/pjax", "class" ], function(PjaxController, clazz) {
    function FeaturesController() {
        PjaxController.call(this, "/features");
    }
    clazz.inherits(FeaturesController, PjaxController);
    return new FeaturesController();
});

define("search/packages/sort", [], function() {
    function featuredSorter(a, b) {
        var af = a.flags && a.flags.featured;
        var bf = b.flags && b.flags.featured;
        if (af && !bf) return -1;
        if (bf && !af) return 1;
        return 0;
    }
    function sponsoredSorter(a, b) {
        var af = a.flags && a.flags.sponsored;
        var bf = b.flags && b.flags.sponsored;
        if (af && !bf) return -1;
        if (bf && !af) return 1;
        return 0;
    }
    function favoriteCountSorter(a, b) {
        var afc = a.count ? a.count.favorites || 0 : 0;
        var bfc = b.count ? b.count.favorites || 0 : 0;
        if (afc && !bfc) return -1;
        if (bfc && !afc) return 1;
        return +bfc - +afc;
    }
    function sorter(a, b) {
        var rv = featuredSorter(a, b);
        if (rv) return rv;
        rv = sponsoredSorter(a, b);
        if (rv) return rv;
        return favoriteCountSorter(a, b);
    }
    return sorter;
});

define("search/packages/remote/api-v1/all", [ "bloodhound", "../../sort", "jquery" ], function(Bloodhound, sort, $) {
    var engine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.nonword("name"),
        queryTokenizer: Bloodhound.tokenizers.nonword,
        sorter: sort,
        identify: function(item) {
            return item.name;
        }
    });
    var loadPromise;
    return {
        url: "/packages/-/v1/all.json",
        prepare: function(query, settings) {
            settings.query = query;
            return settings;
        },
        transport: function(options, onSuccess, onError) {
            engine.initialize().then(load).done(search).fail(function() {});
            function _load(options) {
                return $.ajax(options).then(process);
                function process(data, textStatus, request) {
                    var objects = data.objects, items = [], item, i, len;
                    for (i = 0, len = objects.length; i < len; ++i) {
                        item = objects[i].package;
                        item.links = item.links || {};
                        item.links.self = "/packages/" + encodeURIComponent(item.name);
                        item.flags = objects[i].flags;
                        item.count = objects[i].count;
                        item.downloads = objects[i].downloads;
                        items.push(item);
                    }
                    engine.add(items);
                    if (data.urls && data.urls.next) {
                        options.url = data.urls.next;
                        return _load(options);
                    }
                }
            }
            function load() {
                loadPromise = loadPromise || _load(options);
                return loadPromise;
            }
            function search() {
                engine.search(options.query, function(datums) {
                    onSuccess(datums);
                });
            }
        },
        cache: false,
        rateLimitWait: 0
    };
});

define("search/packages/engine", [ "bloodhound", "./sort", "./remote/api-v1/all" ], function(Bloodhound, sort, remote) {
    var engine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.nonword("name"),
        queryTokenizer: Bloodhound.tokenizers.nonword,
        sorter: sort,
        identify: function(item) {
            return item.name;
        },
        prefetch: {
            url: "/packages/-/all.json",
            transform: function(response) {
                var items = [], item, val;
                for (var key in response) {
                    val = response[key];
                    item = {};
                    item.name = val.name;
                    item.description = val.description;
                    item.keywords = val.keywords;
                    item.links = item.links || {};
                    item.links.self = "/packages/" + encodeURIComponent(item.name);
                    item.flags = val._flags;
                    item.count = val._count;
                    item.downloads = val._downloads;
                    items.push(item);
                }
                return items;
            },
            cache: false
        }
    });
    return engine;
});

define("search/packages/templates/result", [], function() {
    return function(item) {
        return "<article" + (item.flags && (item.flags.featured || item.flags.sponsored) ? ' class="featured"' : "") + '><a href="' + item.links.self + '" target="_blank"><span class="title">' + item.name + '</span><span class="text">' + item.description + "</span>" + (item.flags && (item.flags.featured || item.flags.sponsored) ? '<span class="featured-flag">Featured</span>' : "") + '<span class="stat"><span class="download">' + (item.downloads ? (item.downloads["last-week"] || 0).toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,") : 0) + '</span><span class="star">' + (item.count ? item.count.favorites || 0 : 0) + "</span></span></a></article>";
    };
});

define("shell/menu", [ "exports", "jquery" ], function(exports, $) {
    exports.active = function(url) {
        if (url[url.length - 1] != "/") {
            url = url + "/";
        }
        var menu = $("#menu");
        menu.find("li.active").removeClass("active");
        menu.find('a[href="' + url + '"]').parent("li").addClass("active");
    };
    exports.open = function() {
        exports.toggle(true);
    };
    exports.close = function() {
        exports.toggle(false);
    };
    exports.toggle = function(open) {
        $("html").toggleClass("is-menu", open);
        $("#toolbar, #content").toggleClass("blured", open);
        $(".menu-trigger").toggleClass("is-open", open).next().toggleClass("is-open", open);
    };
    $(document).ready(function() {
        $(document).on("click", "#menu .menu-trigger", function(ev) {
            exports.toggle();
            return false;
        });
    });
});

define("search/packages/templates/suggestion", [], function() {
    return function(item) {
        return "<article" + (item.flags && (item.flags.featured || item.flags.sponsored) ? ' class="featured"' : "") + '><span class="title">' + item.name + '</span><span class="text">' + item.description + "</span>" + (item.flags && (item.flags.featured || item.flags.sponsored) ? '<span class="featured-flag">Featured</span>' : "") + "</article>";
    };
});

define("shell/search", [ "exports", "../search/packages/templates/suggestion", "../search/packages/engine", "page", "jquery", "jquery.typeahead" ], function(exports, template, engine, page, $, __$_typeahead) {
    $(document).ready(function() {
        $(document).on("focus", "#toolbar .toolbar-search form input", function(ev) {
            page.show("/packages/");
        });
        $(".search-con form input").typeahead(null, {
            name: "packages",
            display: "name",
            limit: Infinity,
            source: engine,
            templates: {
                suggestion: template
            }
        });
        $(document).on("focus", "[placeholder]", function() {
            if ($(this).val() == $(this).attr("placeholder")) {
                $(this).val("").removeClass("placeholder");
            }
        });
    });
});

define("shell/status", [ "exports", "jquery", "jquery.pjax" ], function(exports, $, __$_pjax) {
    var _tid = 0;
    exports.activity = function(flag) {
        if (flag && _tid) {
            return;
        }
        if (!flag) {
            clearTimeout(_tid);
            _tid = 0;
            $("body").toggleClass("is-loading", false);
            return;
        }
        _tid = setTimeout(function() {
            $("body").toggleClass("is-loading", true);
        }, 300);
    };
    $(document).ready(function() {
        $(document).on("pjax:send", function() {
            exports.activity(true);
        });
        $(document).on("pjax:beforeReplace", function() {
            exports.activity(false);
        });
    });
});

define("shell", [ "exports", "./shell/menu", "./shell/search", "./shell/status", "page", "jquery" ], function(exports, menu, search, status, page, $) {
    var _gotopOffset;
    var _controllers = [];
    function onkeyup(ev) {
        if (ev.keyCode == 27) {
            window.history.back();
        }
    }
    exports.menu = menu;
    exports.show = function(controller, ctx, cb) {
        var ccontroller = _controllers[_controllers.length - 1];
        if (ccontroller === controller) {
            return cb();
        }
        if (ccontroller) {
            _controllers.pop();
            ccontroller.unload();
        }
        _controllers.push(controller);
        controller.once("ready", function() {
            _gotopOffset = $("#go-top").offset();
            menu.active(this.basePath);
            cb();
        });
        controller.shell = exports;
        if (!ctx.init) {
            controller.load(ctx);
        } else {
            controller.emit("ready");
        }
    };
    exports.present = function(controller, ctx, cb) {
        _controllers.push(controller);
        controller.once("ready", function() {
            this.isModal = true;
            $(document).on("keyup", onkeyup);
            cb();
        });
        controller.shell = exports;
        if (!ctx.init) {
            controller.load(ctx);
        } else {
            controller.emit("ready");
        }
    };
    exports.dismiss = function() {
        var ccontroller = _controllers.pop();
        if (ccontroller) {
            ccontroller.unload();
            $(document).off("keyup", onkeyup);
            ccontroller.isModal = undefined;
        }
    };
    exports.scrollToElementById = function(id, animate) {
        var offset = $("#" + id).offset();
        if (!offset) {
            return;
        }
        var px = offset.top - 30;
        if (animate === false) {
            $("html, body").scrollTop(px);
        } else {
            $("html, body").animate({
                scrollTop: px
            }, 500);
        }
    };
    $(document).ready(function() {
        _gotopOffset = $("#go-top").offset();
        $(window).on("scroll", function(ev) {
            $("#go-top").toggleClass("is-visible", _gotopOffset && _gotopOffset.top < $(window).scrollTop());
        });
        $(document).on("click", 'a[href="#top"]', function(ev) {
            exports.scrollToElementById("top");
            return false;
        });
    });
    page.exit("*", function(ctx, next) {
        var ccontroller = _controllers[_controllers.length - 1];
        if (ccontroller && ccontroller.isModal) {
            exports.dismiss();
        }
        next();
    });
});

define("controllers/packages", [ "../search/packages/engine", "../search/packages/sort", "../search/packages/templates/result", "../shell", "./base/base", "class", "jquery", "exports" ], function(engine, sort, template, shell, Controller, clazz, $, exports) {
    function renderFeaturedStrategies() {
        engine.initPromise.done(loaded);
        function loaded() {
            var $featured = $.map(engine.all().sort(sort), template);
            $(".search-con .results section").html($featured);
            $(".search-con .info-line span").text($featured.length);
        }
    }
    function dosearchinput(ev) {
        var q = $(this).val(), nonempty = !!q.length;
        $(this).toggleClass("bigger", nonempty);
        $(".tt-hint").toggleClass("bigger", nonempty);
        if (!nonempty) {
            renderFeaturedStrategies();
        }
    }
    function dosearchresults(ev, suggestions, async, dataset) {
        var results = $.map(suggestions, template);
        if (!async) {
            $(".search-con .results section").html(results);
        } else {
            $(".search-con .results section").append(results);
        }
        $(".search-con .info-line span").text(results.length);
    }
    function doclose(ev) {
        window.history.back();
    }
    function PackagesController() {
        Controller.call(this, "/packages");
        this.on("ready", function() {
            $(".search-con form input.tt-input").on("input", dosearchinput);
            $(".search-con form input").on("typeahead:render", dosearchresults);
            $(".search-con .close-ico").on("click", doclose);
        });
    }
    clazz.inherits(PackagesController, Controller);
    PackagesController.prototype.load = function() {
        $("body").addClass("is-search");
        $(".search-con form input.tt-input").focus();
        renderFeaturedStrategies();
        this.emit("ready");
    };
    PackagesController.prototype.unload = function() {
        $(".search-con .close-ico").off("click", doclose);
        $(".search-con form input").off("typeahead:render", dosearchresults);
        $(".search-con form input.tt-input").off("input", dosearchinput);
        $("body").removeClass("is-search");
        $(".search-con form input").text("");
        $(".search-con form input").blur();
        $(".tt-input, .tt-hint").removeClass("bigger");
        $(".results section").html("");
        $(".search-con .info-line span").text("0");
    };
    PackagesController.prototype.dispatch = function(ctx, done) {
        ctx.handled = true;
        PackagesController.super_.prototype.dispatch.call(this, ctx, done);
    };
    return new PackagesController();
});

define("middleware/controller", [ "../shell" ], function(shell) {
    return function(ctrlr, modal) {
        var show = modal ? shell.present : shell.show;
        return function controller(ctx, next) {
            shell.menu.close();
            show(ctrlr, ctx, function() {
                ctrlr.dispatch(ctx, next);
            });
        };
    };
});

define("middleware/ad/refresh", [ "jquery" ], function($) {
    var _lastRefresh;
    return function(persist) {
        persist = persist || 6e4;
        return function adRefresh(ctx, next) {
            var now = new Date().getTime();
            if (ctx.init) {
                _lastRefresh = now;
                return next();
            }
            if (now - _lastRefresh < persist) {
                return next();
            }
            if (!$("#carbonads")[0]) return;
            if (typeof _carbonads !== "undefined") _carbonads.refresh();
            _lastRefresh = now;
            next();
        };
    };
});

define("utils", [ "exports" ], function(exports) {
    exports.commaize = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    exports.isMSIE = function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true;
        return false;
    };
});

define("app", [ "./controllers/home", "./controllers/docs", "./controllers/features", "./controllers/packages", "./middleware/controller", "./middleware/ad/refresh", "./shell", "./utils", "page", "jquery" ], function(homeController, docsController, featuresController, packagesController, controller, adRefresh, shell, utils, page, $) {
    page("/", controller(homeController), adRefresh());
    page("/docs/*", controller(docsController), adRefresh());
    page("/features", controller(featuresController), adRefresh());
    page("/packages", controller(packagesController, true));
    $(document).ready(function() {
        $("body").toggleClass("ie", utils.isMSIE());
        page.start();
        $.getJSON("/repo.json", function(data) {
            $("#toolbar .github .count").text(utils.commaize(data.stargazers_count));
        });
    });
});

require.config({
    paths: {
        jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min",
        "jquery.pjax": "//cdnjs.cloudflare.com/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.min",
        "jquery.typeahead": "//cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.2.1/typeahead.jquery.min",
        "jquery.accordion": "//cdn.rawgit.com/vctrfrnndz/jquery-accordion/045aeac/js/jquery.accordion",
        bloodhound: "//cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.2.1/bloodhound.min",
        highlight: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min",
        page: "//cdnjs.cloudflare.com/ajax/libs/page.js/1.7.1/page.min"
    },
    packages: [ {
        name: "class",
        main: "class",
        location: "../node_modules/class"
    }, {
        name: "events",
        location: "../node_modules/events"
    } ],
    shim: {
        "jquery.pjax": [ "jquery" ],
        "jquery.accordion": [ "jquery" ]
    }
});

require([ "app" ]);

define("main", function() {});