/**
 * AR Business Card — app.js
 * Andronikus Pardamean Sihotang | D4 TRPL
 *
 * Tanggung jawab:
 * 1. Fix kamera gelap (video AR.js visible di belakang canvas)
 * 2. Event marker found/lost → tampilkan/sembunyikan scan guide
 * 3. Trigger animation-mixer GLB saat model selesai dimuat
 * 4. Fallback foto profil jika file tidak ditemukan (404)
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    const sceneEl  = document.getElementById("ar-scene");
    const markerEl = document.getElementById("ar-marker");
    const statusEl = document.getElementById("marker-status");
    const modelEl  = document.getElementById("floating-model");

    /* ──────────────────────────────────────────────────────
       1. FIX KAMERA GELAP
       AR.js menyuntikkan <video> secara dinamis ke DOM.
       Kita pastikan video SELALU terlihat di belakang canvas.
    ────────────────────────────────────────────────────── */
    function fixVideoLayer() {
      document.querySelectorAll("video").forEach(function (vid) {
        vid.style.cssText = [
          "position:fixed!important",
          "top:0!important",
          "left:0!important",
          "width:100%!important",
          "height:100%!important",
          "object-fit:cover!important",
          "z-index:1!important",
          "display:block!important",
          "visibility:visible!important",
          "opacity:1!important",
          "background:transparent!important"
        ].join(";");
      });
    }

    /* Fix saat scene render mulai */
    sceneEl.addEventListener("renderstart", fixVideoLayer);

    /* Polling 100 ms selama 3 detik (AR.js kadang inject video terlambat) */
    var checkCount = 0;
    var timer = setInterval(function () {
      fixVideoLayer();
      if (++checkCount >= 30) clearInterval(timer);
    }, 100);

    /* Juga fix saat canvas A-Frame dibuat */
    sceneEl.addEventListener("camera-set-active", fixVideoLayer);

    /* ──────────────────────────────────────────────────────
       2. MARKER DETECTED / LOST → toggle scan guide
    ────────────────────────────────────────────────────── */
    if (markerEl && statusEl) {

  const card = document.getElementById("profile-card");

  markerEl.addEventListener("markerFound", function () {

    statusEl.style.opacity = "0";
    statusEl.style.pointerEvents = "none";

    if(card){
      card.setAttribute("visible", true);
    }

    if(modelEl){
      modelEl.setAttribute("visible", true);
    }

    console.log("Marker ditemukan");

  });

  markerEl.addEventListener("markerLost", function () {

    statusEl.style.opacity = "1";
    statusEl.style.pointerEvents = "none";

    if(card){
      card.setAttribute("visible", false);
    }

    if(modelEl){
      modelEl.setAttribute("visible", false);
    }

    console.log("Marker hilang");

  });

}

    /* ──────────────────────────────────────────────────────
       3. MODEL GLB — pastikan animation-mixer aktif
    ────────────────────────────────────────────────────── */
    if (modelEl) {
      modelEl.addEventListener("model-loaded", function () {
        console.log("[AR Card] ✅ Model GLB dimuat — memulai animasi...");
        modelEl.setAttribute(
          "animation-mixer",
          "clip: *; loop: repeat; crossFadeDuration: 0.4; timeScale: 1.0;"
        );
      });

      modelEl.addEventListener("model-error", function () {
        console.warn(
          "[AR Card] ❌ Gagal memuat model GLB.\n" +
          "Pastikan file ada di: assets/models/card_model.glb\n" +
          "Sumber gratis: https://sketchfab.com (filter Animated + Free + GLB)"
        );
      });
    }

    /* ──────────────────────────────────────────────────────
       4. FOTO PROFIL — fallback jika 404
    ────────────────────────────────────────────────────── */
    var overlayImg = document.getElementById("profile-photo");
    if (overlayImg) {
      overlayImg.addEventListener("error", function () {
        this.src = "assets/images/profile_placeholder.png";
        this.onerror = null;
        console.warn("[AR Card] ⚠️ profile.jpg tidak ditemukan → placeholder digunakan.");
      });
    }

  }); // DOMContentLoaded

})();
