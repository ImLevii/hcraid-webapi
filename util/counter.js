(function () {
  "use strict";

  function e(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  const t = (function () {
    function e(e, t) {
      for (let n = 0; n < t.length; n++) {
        const r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })();
  const n = (function () {
    function n(t) {
      const r = t.ip;
      const i = t.element;
      let o = t.format;
      let a = t.refreshRate;
      if ((e(this, n), (o = o || "{online}"), (a = a || 6e4), !r))
        throw new TypeError("IP cannot be null or undefined");
      if (!i) throw new TypeError("Element cannot be null or undefined");
      const u = r.split(":");
      (this.ip = u[0]),
        (this.port = u[1] || "25565"),
        (this.format = o),
        (this.element = typeof i === "string" ? document.querySelector(i) : i),
        this.runQuery(),
        (this.timerId = setInterval(this.runQuery.bind(this), a));
    }
    return (
      t(n, [
        {
          key: "runQuery",
          value() {
            const e = this;
            const t = new XMLHttpRequest();
            (t.onreadystatechange = function () {
              if (t.readyState === 4 && t.status === 200) {
                const n = JSON.parse(t.responseText);
                if (
                  e.element.getAttribute("data-playercounter-status") !== null
                )
                  return void (e.element.textContent = n.online
                    ? "online"
                    : "offline");
                n.online &&
                  (e.element.innerHTML = e.format.replace(
                    /{\b(online|max)\b}/gi,
                    function (e, t) {
                      return n.players[t === "online" ? "now" : t];
                    }
                  ));
              }
            }),
              t.open(
                "GET",
                "https://mcapi.us/server/status?ip=" +
                  this.ip +
                  "&port=" +
                  this.port
              ),
              t.send();
          },
        },
      ]),
      n
    );
  })();
  const r = function () {
    for (
      let e = document.querySelectorAll("[data-playercounter-ip]"), t = 0;
      t < e.length;
      t++
    ) {
      const r = e[t];
new n({
  element: r,
  ip: r.getAttribute("data-playercounter-ip"),
  format: r.getAttribute("data-playercounter-format"),
  refreshRate: r.getAttribute("data-playercounter-refreshRate")

});
    }