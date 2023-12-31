function t(t, e, i) {
  if (!e.has(t)) throw new TypeError("attempted to " + i + " private field on non-instance");
  return e.get(t);
}
function e(t, e) {
  return e.get ? e.get.call(t) : e.value;
}
function i(i, s) {
  return e(i, t(i, s, "get"));
}
function s(t, e) {
  if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function a(t, e, i) {
  s(t, e), e.set(t, i);
}
function n(t, e, i) {
  if (e.set) e.set.call(t, i);
  else {
    if (!e.writable) throw new TypeError("attempted to set read only private field");
    e.value = i;
  }
}
function o(e, i, s) {
  return n(e, t(e, i, "set"), s), s;
}
function r(t, e, i) {
  if (!e.has(t)) throw new TypeError("attempted to get private field on non-instance");
  return i;
}
function h(t, e) {
  s(t, e), e.add(t);
}
const l = (t, e, i) => (
    Number.isNaN(e) && (e = 0), Number.isNaN(i) && (i = 0), Math.min(Math.max(t, Math.min(e, i)), Math.max(e, i))
  ),
  c = "capture-photo";

var d = new WeakMap(),
  m = new WeakMap(),
  p = new WeakMap(),
  g = new WeakMap(),
  b = new WeakMap(),
  v = new WeakMap(),
  f = new WeakMap(),
  w = new WeakMap(),
  k = new WeakMap(),
  y = new WeakMap(),
  E = new WeakMap(),
  S = new WeakMap(),
  M = new WeakMap(),
  z = new WeakSet(),
  A = new WeakSet(),
  N = new WeakMap(),
  C = new WeakMap(),
  T = new WeakSet(),
  W = new WeakSet(),
  L = new WeakSet();
class x {
  static get observedAttributes() {
    return ["no-image", "facing-mode", "camera-resolution", "pan", "tilt", "zoom"];
  }
  static isSupported() {
    return Boolean(navigator.mediaDevices?.getUserMedia);
  }
  static defineCustomElement(t = c) {
    "undefined" == typeof window || window.customElements.get(t) || window.customElements.define(t, x);
  }
  connectedCallback() {
    if (
      (r(this, L, U).call(this, "noImage"),
      r(this, L, U).call(this, "facingMode"),
      r(this, L, U).call(this, "cameraResolution"),
      r(this, L, U).call(this, "pan"),
      r(this, L, U).call(this, "tilt"),
      r(this, L, U).call(this, "zoom"),
      r(this, L, U).call(this, "calculateFileSize"),
      o(this, d, !0),
      o(this, g, this.shadowRoot.querySelector("canvas")),
      o(this, b, this.shadowRoot.getElementById("output")),
      o(this, v, this.shadowRoot.querySelector("video")),
      o(this, f, this.shadowRoot.querySelector('slot[name="capture-button"]')),
      o(this, w, r(this, W, O).call(this)),
      o(this, k, this.shadowRoot.querySelector('slot[name="facing-mode-button"]')),
      o(this, y, r(this, T, I).call(this)),
      // i(this, v)?.addEventListener("loadedmetadata", i(this, M)),
      // i(this, f)?.addEventListener("slotchange", i(this, N)),
      // i(this, w)?.addEventListener("click", i(this, S)),
      // i(this, k)?.addEventListener("slotchange", i(this, C)),
      // i(this, y)?.addEventListener("click", i(this, E)),
      !x.isSupported())
    )
      return this.dispatchEvent(
        new CustomEvent(`${c}:error`, {
          bubbles: !0,
          composed: !0,
          detail: { error: { name: "NotSupportedError", message: "Not supported" } },
        })
      );
    this.startVideoStream();
  }
  disconnectedCallback() {
    this.stopVideoStream(),
      i(this, y)?.removeEventListener("click", i(this, E)),
      i(this, w)?.removeEventListener("click", i(this, S)),
      i(this, v)?.removeEventListener("canplay", i(this, M)),
      i(this, f)?.removeEventListener("slotchange", i(this, N)),
      i(this, k)?.removeEventListener("slotchange", i(this, C));
  }
  attributeChangedCallback(t, e, s) {
    if (!i(this, d)) return;
    const a = this.getTrackCapabilities(),
      n = this.getTrackSettings();
    if (
      ("no-image" === t && e !== s && r(this, z, R).call(this),
      "facing-mode" === t && e !== s && i(this, m)?.facingMode)
    ) {
      const t = ["user", "environment"].includes(this.facingMode);
      n?.facingMode && t && (this.stopVideoStream(), this.startVideoStream());
    }
    if ("camera-resolution" === t && e !== s && "string" == typeof this.cameraResolution) {
      const [t, e] = this.cameraResolution.split("x").map((t) => Number(t)),
        i = t >= a?.width?.min && t <= a?.width?.max,
        s = e >= a?.height?.min && e <= a?.height?.max;
      n?.width && n?.height && i && s && (this.stopVideoStream(), this.startVideoStream());
    }
    if ("pan" === t && e !== s && i(this, m)?.pan) {
      const t = this.pan >= a?.pan?.min && this.pan <= a?.pan?.max;
      n?.pan && t && r(this, A, V).call(this, "pan", this.pan);
    }
    if ("tilt" === t && e !== s && i(this, m)?.tilt) {
      const t = this.tilt >= a?.tilt?.min && this.tilt <= a?.tilt?.max;
      n?.tilt && t && r(this, A, V).call(this, "tilt", this.tilt);
    }
    if ("zoom" === t && e !== s && i(this, m)?.zoom) {
      const t = this.zoom >= a?.zoom?.min && this.zoom <= a?.zoom?.max;
      n?.zoom && t && r(this, A, V).call(this, "zoom", this.zoom);
    }
  }
  get noImage() {
    return this.hasAttribute("no-image");
  }
  set noImage(t) {
    t ? this.setAttribute("no-image", "") : this.removeAttribute("no-image");
  }
  get facingMode() {
    return this.getAttribute("facing-mode");
  }
  set facingMode(t) {
    this.setAttribute("facing-mode", t);
  }
  get cameraResolution() {
    return this.getAttribute("camera-resolution");
  }
  set cameraResolution(t) {
    this.setAttribute("camera-resolution", t);
  }
  get pan() {
    return Number(this.getAttribute("pan")) || null;
  }
  set pan(t) {
    this.setAttribute("pan", Number(t) || null);
  }
  get tilt() {
    return Number(this.getAttribute("tilt")) || null;
  }
  set tilt(t) {
    this.setAttribute("tilt", Number(t) || null);
  }
  get zoom() {
    return Number(this.getAttribute("zoom")) || null;
  }
  set zoom(t) {
    this.setAttribute("zoom", Number(t) || null);
  }
  get loading() {
    return this.hasAttribute("loading");
  }
  get calculateFileSize() {
    return this.hasAttribute("calculate-file-size");
  }
  set calculateFileSize(t) {
    t ? this.setAttribute("calculate-file-size", "") : this.removeAttribute("calculate-file-size");
  }
  stopVideoStream() {
    if (!i(this, v) || !i(this, p)) return;
    const [t] = i(this, p).getVideoTracks();
    t?.stop(), (i(this, v).srcObject = null), o(this, p, null);
  }
  async startVideoStream() {
    if (!x.isSupported() || i(this, p)) return;
    this.setAttribute("loading", "");
    const t = { video: { facingMode: { ideal: this.facingMode || "user" }, pan: !0, tilt: !0, zoom: !0 }, audio: !1 };
    if ("string" == typeof this.cameraResolution) {
      const [e, i] = this.cameraResolution.split("x").map((t) => Number(t));
      (t.video.width = e), (t.video.height = i);
    }
    try {
      o(this, p, await navigator.mediaDevices.getUserMedia(t)),
        (i(this, v).srcObject = i(this, p)),
        r(this, A, V).call(this, "pan", this.pan),
        r(this, A, V).call(this, "tilt", this.tilt),
        r(this, A, V).call(this, "zoom", this.zoom);
      const e = this.getTrackSettings();
      e?.facingMode && (i(this, k).hidden = !1);
    } catch (t) {
      this.dispatchEvent(new CustomEvent(`${c}:error`, { bubbles: !0, composed: !0, detail: { error: t } }));
    } finally {
      this.removeAttribute("loading");
    }
  }
  async capture() {
    if (!this.loading)
      try {
        const t = i(this, g).getContext("2d"),
          e = i(this, v).videoWidth,
          s = i(this, v).videoHeight;
        (i(this, g).width = e), (i(this, g).height = s), t.drawImage(i(this, v), 0, 0, e, s);
        const a = i(this, g).toDataURL("image/png");
        if ("string" == typeof a && a.includes("data:image")) {
          if (!this.noImage) {
            const t = new Image();
            (t.src = a),
              (t.width = e),
              (t.height = s),
              (t.part = "output-image"),
              r(this, z, R).call(this),
              i(this, b)?.appendChild(t);
          }
          const t = { dataURI: a, width: e, height: s };
          if (this.calculateFileSize)
            try {
              const e = await fetch(a),
                i = (await e.blob()).size;
              i && (t.size = i);
            } catch (t) {}
          this.dispatchEvent(new CustomEvent(`${c}:success`, { bubbles: !0, composed: !0, detail: t }));
        }
      } catch (t) {
        this.dispatchEvent(new CustomEvent(`${c}:error`, { bubbles: !0, composed: !0, detail: { error: t } }));
      }
  }
  getSupportedConstraints() {
    return (x.isSupported() && navigator.mediaDevices.getSupportedConstraints()) || {};
  }
  getTrackCapabilities() {
    if (!i(this, p)) return {};
    const [t] = i(this, p).getVideoTracks();
    return (t && "function" == typeof t.getCapabilities && t.getCapabilities()) || {};
  }
  getTrackSettings() {
    if (!i(this, p)) return {};
    const [t] = i(this, p).getVideoTracks();
    return (t && "function" == typeof t.getSettings && t.getSettings()) || {};
  }
  constructor() {
    h(this, z),
      h(this, A),
      h(this, T),
      h(this, W),
      h(this, L),
      a(this, d, { writable: !0, value: void 0 }),
      a(this, m, { writable: !0, value: void 0 }),
      a(this, p, { writable: !0, value: void 0 }),
      a(this, g, { writable: !0, value: void 0 }),
      a(this, b, { writable: !0, value: void 0 }),
      a(this, v, { writable: !0, value: void 0 }),
      a(this, f, { writable: !0, value: void 0 }),
      a(this, w, { writable: !0, value: void 0 }),
      a(this, k, { writable: !0, value: void 0 }),
      a(this, y, { writable: !0, value: void 0 }),
      a(this, E, {
        writable: !0,
        value: (t) => {
          t.preventDefault(),
            this.loading || (this.facingMode = "user" !== this.facingMode && this.facingMode ? "user" : "environment");
        },
      }),
      a(this, S, {
        writable: !0,
        value: (t) => {
          t.preventDefault(), this.capture();
        },
      }),
      a(this, M, {
        writable: !0,
        value: (t) => {
          const e = t.target;
          e.play()
            .then(() => {
              this.dispatchEvent(
                new CustomEvent(`${c}:video-play`, { bubbles: !0, composed: !0, detail: { video: e } })
              );
            })
            .catch((t) => {
              this.dispatchEvent(new CustomEvent(`${c}:error`, { bubbles: !0, composed: !0, detail: { error: t } }));
            })
            .finally(() => {
              this.removeAttribute("loading");
            });
        },
      }),
      a(this, N, {
        writable: !0,
        value: (t) => {
          "capture-button" === t.target?.name &&
            (i(this, w)?.removeEventListener("click", i(this, S)),
            o(this, w, r(this, W, O).call(this)),
            i(this, w) &&
              (i(this, w).addEventListener("click", i(this, S)),
              "BUTTON" === i(this, w).nodeName ||
                i(this, w).hasAttribute("role") ||
                i(this, w).setAttribute("role", "button")));
        },
      });
    // a(this, C, {
    //   writable: !0,
    //   value: (t) => {
    //     "facing-mode-button" === t.target?.name &&
    //       (i(this, y)?.removeEventListener("click", i(this, E)),
    //       o(this, y, r(this, T, I).call(this)),
    //       i(this, y) &&
    //         (i(this, y).addEventListener("click", i(this, E)),
    //         "BUTTON" === i(this, y).nodeName ||
    //           i(this, y).hasAttribute("role") ||
    //           i(this, y).setAttribute("role", "button")));
    //   },
    // });
    // o(this, d, !1);
    // o(this, m, this.getSupportedConstraints()),
    // this.shadowRoot || (this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(u.content.cloneNode(!0)));
  }
}
function R() {
  i(this, b) && Array.from(i(this, b).childNodes).forEach((t) => t.remove());
}
function V(t, e) {
  if (!i(this, p) || !t || !e) return;
  const [s] = i(this, p).getVideoTracks(),
    a = this.getTrackCapabilities(),
    n = this.getTrackSettings();
  n?.[t] && s.applyConstraints({ advanced: [{ [t]: l(Number(e), a?.[t]?.min, a?.[t]?.max) }] });
}
function I() {
  return i(this, k)
    ? i(this, k)
        .assignedElements({ flatten: !0 })
        .find((t) => "BUTTON" === t.nodeName || "facing-mode-button" === t.getAttribute("slot"))
    : null;
}
function O() {
  return i(this, f)
    ? i(this, f)
        .assignedElements({ flatten: !0 })
        .find((t) => "BUTTON" === t.nodeName || "capture-button" === t.getAttribute("slot"))
    : null;
}
function U(t) {
  if (Object.prototype.hasOwnProperty.call(this, t)) {
    const e = this[t];
    delete this[t], (this[t] = e);
  }
}
export { x as CapturePhoto };
//# sourceMappingURL=capture-photo.js.map
