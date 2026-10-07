(function () {
  if (location.protocol !== "https:" ||
      location.hostname !== "changer8844.github.io" ||
      !location.pathname.startsWith("/moondrop-channel-training/")) return;

  const beacon = document.createElement("script");
  beacon.type = "module";
  beacon.async = true;
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.dataset.cfBeacon = '{"token":"1e410da33b464564857a8eb604eea7a2","spa":false}';
  document.body.appendChild(beacon);
})();
