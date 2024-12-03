var Desktop = {
    options: {
        windowArea: ".window-area",
        windowAreaClass: "",
        taskBar: ".task-bar > .tasks",
        taskBarClass: ""
    },

    wins: {},

    setup: function(options){
        this.options = $.extend( {}, this.options, options );
        return this;
    },

    addToTaskBar: function(wnd){
        var icon = wnd.getIcon();
        var wID = wnd.win.attr("id");
        var item = $("<span>").addClass("task-bar-item started c-pointer supertop").html(icon);

        item.data("wID", wID);

        item.on("click", function () {
            $("#"+item.data("wID")).toggle();
        });

        item.appendTo($(this.options.taskBar));
    },

    removeFromTaskBar: function(wnd){
        var wID = wnd.attr("id");
        var items = $(".task-bar-item");
        var that = this;
        $.each(items, function(){
            var item = $(this);
            if (item.data("wID") === wID) {
                delete that.wins[wID];
                item.remove();
            }
        })
    },

    createWindow: function(o){
        o.onDragStart = function(){
            win = $(this);
            $(".window").css("z-index", 1);

            if (!win.hasClass("modal")) {
                win.css("z-index", 3);
            }
        };
        o.onDragStop = function(){
            win = $(this);
            if (!win.hasClass("modal"))
                win.css("z-index", 2);
        };
        o.onWindowDestroy = function(win){
            Desktop.removeFromTaskBar($(win));
        };



        var w = $("<div>").appendTo($(this.options.windowArea));
        var wnd = w.window(o).data("window");

        var win = wnd.win;
        var shift = Metro.utils.objectLength(this.wins) * 16;

        if (wnd.options.place === "auto" && wnd.options.top === "auto" && wnd.options.left === "auto") {
            win.css({
                top: shift,
                left: shift
            });
        }
        this.wins[win.attr("id")] = wnd;
        this.addToTaskBar(wnd);

        return wnd;
    }
};

Desktop.setup();

function CreateStudioWindow(tool) {
    var w = Desktop.createWindow({
        resizeable: true,
        draggable: true,
        width: 1000,
        height: '80%',
        icon: tool.Icon,
        title: tool.Name,
        content: tool.InitContent,
        onShow: tool.InitOnShow,
        shadow: true,
        clsCaption: "text-center",
        clsContent:"h-100",
        onClose: function (win) {
            UnRegisterStudio(tool.Id);
            var win = $(win);
            win.addClass("ani-swoopOutTop");
        }
    });
}


function OpenFrameWindow(tool) {
    var customButtons = [
        //{
        //    html: "<span class='mif-open-book' title='Otevřít v Novém Okně'></span>",
        //    cls: "sys-button",
        //    onclick: "window.open('" + tool.Url + "','_blank')"
        //},
        {
            html: "<span class='mif-backward' title='Zpět do Výchozí Pozice'></span>",
            cls: "warning",
            onclick: "$(\"#FrameWindow_" + tool.Id + "\").attr(\"src\",\"" + tool.Url + "\")"
        }
    ];
    var w = Desktop.createWindow({
        resizeable: true,
        draggable: true,
        customButtons: customButtons,
        width: 600,
        height: '60%',
        icon: tool.Icon,
        title: tool.Name,
        content: tool.InitContent,
        onShow: tool.InitOnShow,
        shadow: true,
        clsCaption: "text-center",
        clsContent: "h-100",
        onShow: function (win) {
            var win = $(win);
            win.addClass("ani-swoopInTop");
            setTimeout(function () {
                $(win).removeClass("ani-swoopInTop");
            }, 1000);
        },
        onClose: function (win) {
            UnRegisterFrame(tool.Id);
            var win = $(win);
            win.addClass("ani-swoopOutTop");
        }
    });
}


function OpenYoutubeVideo(){
    Desktop.createWindow({
        resizeable: true,
        draggable: true,
        width: 500,
        icon: "<span class='mif-youtube'></span>",
        title: "Youtube video",
        content: "https://www.youtube.com/embed/RkPdCWGXEwY?list=PLmE7gP9LTBimNJQ444ypG8HVce23fa2Hb",
        clsContent: "bg-dark",
        onClose: function (win) {
            var win = $(win);
            win.addClass("ani-swoopOutTop");
        }
    });
}

function openCharm() {
    var charm = $("#charm").data("charms");
    charm.toggle();
}

$(".window-area").on("click", function(){
    Metro.charms.close("#charm");
});

$(".charm-tile").on("click", function(){
    $(this).toggleClass("active");
});

//Start Panel

var setTilesAreaSize = function () {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var groups = $(".tiles-group");
    var tileAreaWidth = 80;
    $.each(groups, function () {
        if (width <= Metro.media_sizes.LD) {
            tileAreaWidth = width;
        } else {
            tileAreaWidth += $(this).outerWidth() + 80;
        }
    });

    $(".tiles-area").css({  width: tileAreaWidth });

    if (width > Metro.media_sizes.LD) {
        $(".start-screen").css({
            overflow: "auto"
        })
    }
};

setTilesAreaSize();
$.each($('[class*=tile-]'), function () {
    var tile = $(this);
    setTimeout(function () {
        tile.css({
            opacity: 1,
            "transform": "scale(1)",
            "transition": ".3s"
        }).css("transform", false);

    }, Math.floor(Math.random() * 500));
});

$(".tiles-group").animate({  left: 0 });

$("#StartPanel").on(Metro.events.resize + "-start-screen-resize", function () { setTilesAreaSize(); });

$("#StartPanel").on(Metro.events.mousewheel, function (e) {
    var up = e.deltaY < 0 ? -1 : 1;
    var scrollStep = 50;
    $(".start-screen")[0].scrollLeft += scrollStep * up;
});