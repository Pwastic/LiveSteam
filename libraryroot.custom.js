(function() {
  "use strict";
  const CONFIG = {
    mode: "video",
    pauseWhenHidden: true,
    videoInPopups: false,
    respectReducedMotion: true,
    autoLayers: true,
    minAreaRatio: 0.12,
    barMinWidthRatio: 0.9,
    barMinHeight: 20,
    maxDepth: 30,
    maxNodes: 1500,
    diagnosticOnStart: false,
    debug: false
  };
  const EMBEDDED = {
    video: "data:video/webm;base64,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"
  };
  const TAG = "[LiveSteam]";
  const log = (...a) => {
    if (CONFIG.debug) console.log(TAG, ...a);
  };
  if (/^OverlayTab/.test(document.title || "")) return;
  if (CONFIG.mode === "off") {
    log("mode is off");
    return;
  }
  const videoNotes = [];
  const note = (s) => {
    videoNotes.push((performance.now() / 1e3).toFixed(1) + "s " + s);
    if (videoNotes.length > 60) videoNotes.shift();
    log(s);
  };
  let root = null, video = null, scanTimer = null, frozen = false, videoSourceLabel = function() {
    return "none";
  };
  function describe(el) {
    const cls = (el.className && el.className.toString ? el.className.toString() : "").split(/\s+/).filter(Boolean).slice(0, 2).join(".");
    return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (cls ? "." + cls : "");
  }
  const short = (s) => (s || "").length > 50 ? s.slice(0, 50) + "..." : s;
  const short2 = (s) => (s || "").length > 160 ? s.slice(0, 160) + "..." : s;
  function readVar(name, dflt) {
    const v = getComputedStyle(root || document.documentElement).getPropertyValue(name).trim();
    return v || dflt;
  }
  function isPopup() {
    return window.innerWidth < 700 || window.innerHeight < 450;
  }
  function applyMenuStyle() {
    if (!root || !isPopup()) return;
    document.documentElement.classList.add("ls-popup");
    root.classList.add("ls-popup");
    const style = readVar("--ls-menu-style", "different");
    if (style === "same") root.classList.add("ls-menu-same");
    else if (style === "plain") root.classList.add("ls-menu-plain");
    note("menu/popup window: background style = " + style);
  }
  function wantVideo() {
    if (CONFIG.mode !== "video") return false;
    if (!CONFIG.videoInPopups && isPopup()) {
      log("small window (menu/popup) - still picture only");
      return false;
    }
    return true;
  }
  function getBytes(url) {
    return fetch(url).then(function(r) {
      const type = r.headers.get("content-type");
      if (!r.ok) return { status: r.status, type, bytes: null };
      return r.arrayBuffer().then(function(b) {
        return { status: r.status, type, bytes: b };
      });
    });
  }
  function isWebm(b) {
    if (!b || b.byteLength < 4) return false;
    const h = new Uint8Array(b, 0, 4);
    return h[0] === 26 && h[1] === 69 && h[2] === 223 && h[3] === 163;
  }
  function describeResult(res) {
    return "status " + res.status + ", type " + res.type + ", " + (res.bytes ? Math.round(res.bytes.byteLength / 1024) : 0) + " KB, " + (isWebm(res.bytes) ? "valid WebM" : "not usable");
  }
  function startVideo() {
    if (!root || !wantVideo()) return;
    const still = root.querySelector(".ls-still");
    const pic = getComputedStyle(still).backgroundImage;
    const m = pic.match(/url\(["']?([^"')]+)["']?\)/);
    const pictureUrl = m ? m[1] : "";
    const baseDir = pictureUrl ? pictureUrl.slice(0, pictureUrl.lastIndexOf("/") + 1) : "";
    const slot = parseInt(readVar("--ls-video-slot", "1"), 10) || 1;
    const reduced = CONFIG.respectReducedMotion && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    frozen = readVar("--ls-mode", "video") === "still" || !!reduced;
    note("settings: animation=" + (frozen ? "still" : "animated") + ", video slot=" + slot + ", brightness=" + readVar("--ls-bg-brightness", "(default)") + ", panel darkness=" + readVar("--ls-ui-tint-alpha", "(default)"));
    note("media folder: " + (baseDir || "(not found)"));
    const candidates = [];
    let idx = 0, ready = false, readyNoted = false, started = false;
    const evCount = {};
    videoSourceLabel = function() {
      return candidates[idx] && candidates[idx].label || "none";
    };
    function addCandidates(buf, fileLabel) {
      candidates.length = 0;
      candidates.push({ label: fileLabel + " (blob)", get: function() {
        return URL.createObjectURL(new Blob([buf], { type: "video/webm" }));
      } });
      candidates.push({ label: fileLabel + " (data)", get: function() {
        return new Promise(function(res, rej) {
          const fr = new FileReader();
          fr.onload = function() {
            res(fr.result);
          };
          fr.onerror = function() {
            rej(fr.error);
          };
          fr.readAsDataURL(new Blob([buf], { type: "video/webm" }));
        });
      } });
      candidates.push({ label: "built-in placeholder", get: function() {
        return EMBEDDED.video;
      } });
    }
    function begin(buf, fileLabel) {
      if (started) return;
      started = true;
      if (buf) addCandidates(buf, fileLabel);
      else {
        candidates.length = 0;
        candidates.push({ label: "built-in placeholder", get: function() {
          return EMBEDDED.video;
        } });
      }
      createVideo();
      load(0);
    }
    function switchToReal(buf, fileLabel) {
      note("video became available (" + fileLabel + ") - switching from the placeholder");
      addCandidates(buf, fileLabel);
      if (!video) createVideo();
      readyNoted = false;
      load(0);
    }
    function findBaseDir() {
      const p = getComputedStyle(still).backgroundImage;
      const mm = p.match(/url\(["']?([^"')]+)["']?\)/);
      return mm ? mm[1].slice(0, mm[1].lastIndexOf("/") + 1) : "";
    }
    function readVideo(done) {
      const dir = findBaseDir();
      if (!dir || !window.fetch) {
        done(null, null, "media folder address not available yet");
        return;
      }
      const files = ["video" + slot + ".gif"];
      if (slot !== 1) files.push("video1.gif");
      (function next(i) {
        if (i >= files.length) {
          done(null, null, "no usable video file");
          return;
        }
        getBytes(dir + files[i]).then(function(res) {
          note("file " + files[i] + ": " + describeResult(res));
          if (isWebm(res.bytes)) done(res.bytes, files[i]);
          else next(i + 1);
        }).catch(function(e) {
          note("file " + files[i] + " request FAILED: " + (e && e.message));
          next(i + 1);
        });
      })(0);
    }
    const RETRY_SECONDS = [3, 8, 20];
    const LATE_RETRIES = 5;
    const LATE_SECONDS = 60;
    let lateCount = 0;
    function attempt(n) {
      readVideo(function(buf, label, why) {
        if (buf) {
          if (started) switchToReal(buf, label);
          else begin(buf, label);
          return;
        }
        if (n < RETRY_SECONDS.length) {
          note("video not available yet (" + why + ") - retrying in " + RETRY_SECONDS[n] + " s");
          setTimeout(function() {
            attempt(n + 1);
          }, RETRY_SECONDS[n] * 1000);
          return;
        }
        if (!started) {
          note("video still not available - showing the built-in placeholder and checking again later");
          begin(null);
        }
        if (lateCount < LATE_RETRIES) {
          lateCount++;
          setTimeout(function() {
            attempt(n + 1);
          }, LATE_SECONDS * 1000);
        }
      });
    }
    attempt(0);
    function createVideo() {
      video = document.createElement("video");
      video.className = "ls-media ls-video";
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.disablePictureInPicture = true;
      video.setAttribute("muted", "");
      ["loadstart", "loadedmetadata", "stalled", "abort", "emptied", "suspend"].forEach(function(ev) {
        video.addEventListener(ev, function() {
          evCount[ev] = (evCount[ev] || 0) + 1;
          if (evCount[ev] <= 2) note("video " + ev + " (" + videoSourceLabel() + ") readyState=" + (video && video.readyState) + " networkState=" + (video && video.networkState));
        });
      });
      video.addEventListener("canplay", function() {
        ready = true;
        root.classList.add("ls-ready");
        if (!readyNoted) {
          readyNoted = true;
          note("video READY, source: " + videoSourceLabel());
          if (frozen) {
            video.loop = false;
            video.addEventListener("seeked", function() {
              video.pause();
              note("still mode: frozen on a frame");
            }, { once: true });
            try {
              video.currentTime = Math.min(3, (video.duration || 6) / 2);
            } catch (e) {
              video.pause();
            }
          }
        }
      });
      video.addEventListener("error", function() {
        tryNext("code " + (video && video.error && video.error.code) + " " + (video && video.error && video.error.message));
      });
      root.appendChild(video);
    }
    function load(i) {
      idx = i;
      ready = false;
      Promise.resolve().then(function() {
        return candidates[i].get();
      }).then(function(src) {
        if (!video) return;
        video.src = src;
        const p = video.play();
        if (p && p.catch) p.catch(function(e) {
          log("play() blocked:", e && e.message);
        });
        watchdog(i);
      }).catch(function(e) {
        tryNext("could not prepare: " + (e && e.message));
      });
    }
    function tryNext(reason) {
      note("video source failed (" + videoSourceLabel() + "): " + reason);
      if (video && idx + 1 < candidates.length) {
        load(idx + 1);
      } else {
        note("no video source worked - keeping still picture");
        root.classList.add("ls-failed");
        if (video) {
          video.remove();
          video = null;
        }
      }
    }
    function watchdog(forIdx) {
      setTimeout(function() {
        if (video && !ready && idx === forIdx && idx < candidates.length - 1) tryNext("no playback after 10 s");
      }, 1e4);
    }
  }
  function buildLayer() {
    if (document.getElementById("livesteam-bg")) return;
    root = document.createElement("div");
    root.id = "livesteam-bg";
    const still = document.createElement("div");
    still.className = "ls-media ls-still";
    root.appendChild(still);
    document.body.prepend(root);
    let tries = 0;
    const t0 = performance.now();
    (function waitForCss() {
      if (getComputedStyle(root).position === "fixed") {
        note("stylesheet active after " + Math.round(performance.now() - t0) + " ms");
        waitForSettings(0);
      } else if (++tries > 120) {
        note("stylesheet NOT detected after 60 s - continuing anyway");
        applyMenuStyle();
        startVideo();
      } else setTimeout(waitForCss, tries < 32 ? 250 : 1000);
    })();
    function waitForSettings(n) {
      if (readVar("--ls-mode", "") !== "" || n >= 6) {
        applyMenuStyle();
        startVideo();
      } else setTimeout(function() {
        waitForSettings(n + 1);
      }, 250);
    }
    log("background layer added");
  }
  function hasSolidBg(cs) {
    const c = cs.backgroundColor;
    if (!c || c === "transparent") return false;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return true;
    const p = m[1].split(/[ ,\/]+/).filter(Boolean);
    return !(p.length >= 4 && parseFloat(p[3]) === 0);
  }
  function scanLayers(report) {
    if (!document.body) return;
    if (!report && !CONFIG.autoLayers) return;
    const minArea = window.innerWidth * window.innerHeight * CONFIG.minAreaRatio;
    let nodes = 0, marked = 0;
    function walk(parent, depth, tinted) {
      for (const el of parent.children) {
        if (++nodes > CONFIG.maxNodes) return;
        if (el.id === "livesteam-bg" || el.id === "livesteam-diag") continue;
        const cs = getComputedStyle(el);
        let next = tinted;
        if (cs.display !== "contents") {
          const r = el.getBoundingClientRect();
          const isBar = r.width >= window.innerWidth * CONFIG.barMinWidthRatio && r.height >= CONFIG.barMinHeight;
          if (r.width * r.height < minArea && !isBar) continue;
          const bg = cs.backgroundImage;
          const hasPicture = bg !== "none" && bg.indexOf("url(") !== -1;
          const existing = el.getAttribute("data-ls-layer");
          let note2 = existing ? "marked:" + existing : "";
          if (existing) {
            next = tinted || existing === "tint";
          } else if (!hasPicture && (hasSolidBg(cs) || bg !== "none")) {
            if (CONFIG.autoLayers) {
              el.setAttribute("data-ls-layer", tinted ? "clear" : "tint");
              next = true;
              marked++;
              note2 = "NEWLY marked:" + (tinted ? "clear" : "tint");
              log("panel", tinted ? "cleared:" : "tinted:", describe(el));
            }
          } else if (hasPicture) {
            note2 = "left alone (has picture)";
          }
          if (report) {
            report.push("  ".repeat(Math.min(depth, 12)) + describe(el) + "  " + Math.round(r.width) + "x" + Math.round(r.height) + "  bg=" + cs.backgroundColor + (bg !== "none" ? " img=" + short(bg) : "") + (cs.position !== "static" ? "  pos=" + cs.position : "") + (note2 ? "  [" + note2 + "]" : ""));
          }
        }
        if (depth < CONFIG.maxDepth) walk(el, depth + 1, next);
      }
    }
    walk(document.body, 0, false);
    if (marked) log("scan marked", marked, "panel(s)");
    if (nodes > CONFIG.maxNodes) log("scan hit the node limit (" + CONFIG.maxNodes + ")");
  }
  function scheduleScan() {
    if (scanTimer) return;
    scanTimer = setTimeout(function() {
      scanTimer = null;
      if (!document.hidden) scanLayers();
    }, 1e3);
  }
  function stackAt(label, fx, fy) {
    const x = Math.round(window.innerWidth * fx), y = Math.round(window.innerHeight * fy);
    const out = ["- " + label + " (" + x + "," + y + "), top to bottom:"];
    document.elementsFromPoint(x, y).slice(0, 10).forEach(function(el) {
      const cs = getComputedStyle(el);
      out.push("    " + describe(el) + "  bg=" + cs.backgroundColor + (cs.backgroundImage !== "none" ? " img=" + short(cs.backgroundImage) : "") + "  pos=" + cs.position + " z=" + cs.zIndex + " mark=" + (el.getAttribute("data-ls-layer") || "-"));
    });
    return out;
  }
  function buildReport() {
    const L = [];
    L.push("LiveSteam report 0.4.1");
    L.push("page: " + location.href + " | title: " + document.title);
    L.push("window: " + window.innerWidth + "x" + window.innerHeight + " | body class: " + short(document.body.className));
    const rcs = root ? getComputedStyle(root) : null;
    L.push("bg layer: " + (root ? "present, z=" + rcs.zIndex + ", display=" + rcs.display + ", rect=" + Math.round(root.getBoundingClientRect().width) + "x" + Math.round(root.getBoundingClientRect().height) : "MISSING"));
    L.push("video: " + (video ? "source=" + videoSourceLabel() + " readyState=" + video.readyState + " paused=" + video.paused + " time=" + video.currentTime.toFixed(1) : "no video element"));
    L.push("video log:");
    videoNotes.forEach(function(n) {
      L.push("  " + n);
    });
    L.push("html bg=" + getComputedStyle(document.documentElement).backgroundColor + " | body bg=" + getComputedStyle(document.body).backgroundColor);
    const frames = document.querySelectorAll("iframe, webview");
    L.push("frames/webviews in this page: " + frames.length);
    frames.forEach(function(f) {
      L.push("  " + describe(f) + " src=" + short(f.src || ""));
    });
    L.push("");
    L.push("What is on top at some points of the window:");
    [["center", 0.5, 0.5], ["left side", 0.1, 0.5], ["upper middle", 0.6, 0.3], ["bottom", 0.5, 0.92], ["top bar", 0.5, 0.04]].forEach(function(p) {
      stackAt(p[0], p[1], p[2]).forEach(function(l) {
        L.push(l);
      });
    });
    L.push("");
    L.push("Big elements (>= " + Math.round(CONFIG.minAreaRatio * 100) + "% of window):");
    const rep = [];
    scanLayers(rep);
    rep.slice(0, 120).forEach(function(l) {
      L.push(l);
    });
    if (rep.length > 120) L.push("... (" + (rep.length - 120) + " more)");
    return L.join("\n");
  }
  function showReport() {
    if (window.innerWidth < 800 || window.innerHeight < 500) return;
    let box = document.getElementById("livesteam-diag");
    if (box) {
      box.remove();
      return;
    }
    const text = buildReport();
    box = document.createElement("div");
    box.id = "livesteam-diag";
    box.style.cssText = "position:fixed;top:40px;right:12px;width:560px;max-width:90vw;max-height:80vh;display:flex;flex-direction:column;background:#000;color:#9f9;border:1px solid #7c5cff;z-index:2147483647;font:11px/1.35 Consolas,monospace;pointer-events:auto;";
    const bar = document.createElement("div");
    bar.style.cssText = "padding:6px;background:#222;color:#fff;display:flex;gap:8px;align-items:center;";
    const title = document.createElement("span");
    title.textContent = "LiveSteam report - click Copy, paste it in the chat";
    title.style.flex = "1";
    const copy = document.createElement("button");
    copy.textContent = "Copy";
    const close = document.createElement("button");
    close.textContent = "Close";
    bar.append(title, copy, close);
    const pre = document.createElement("textarea");
    pre.readOnly = true;
    pre.value = text;
    pre.style.cssText = "flex:1;min-height:300px;background:#000;color:#9f9;border:0;font:inherit;white-space:pre;overflow:auto;resize:none;user-select:text;";
    box.append(bar, pre);
    close.onclick = function() {
      box.remove();
    };
    copy.onclick = function() {
      pre.focus();
      pre.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
      }
      if (!ok && navigator.clipboard) navigator.clipboard.writeText(text).then(function() {
        copy.textContent = "Copied";
      });
      copy.textContent = ok ? "Copied" : "Press Ctrl+C";
    };
    document.body.appendChild(box);
    log("report shown (Ctrl+Alt+D toggles it)");
  }
  function start() {
    buildLayer();
    [300, 1500, 4e3].forEach(function(ms) {
      setTimeout(scanLayers, ms);
    });
    new MutationObserver(scheduleScan).observe(document.body, { childList: true, subtree: true });
    if (CONFIG.pauseWhenHidden) {
      document.addEventListener("visibilitychange", function() {
        if (!video || frozen) return;
        if (document.hidden) {
          video.pause();
          log("paused (hidden)");
        } else {
          const p = video.play();
          if (p && p.catch) p.catch(function() {
          });
          log("resumed");
        }
      });
    }
    document.addEventListener("keydown", function(e) {
      if (e.ctrlKey && e.altKey && e.code === "KeyD") showReport();
    });
    if (CONFIG.diagnosticOnStart) setTimeout(function() {
      if (!document.getElementById("livesteam-diag")) showReport();
    }, 6e3);
    window.LiveSteam = { version: "0.4.1", config: CONFIG, refresh: scanLayers, report: showReport };
    log("started on", location.href);
  }
  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
