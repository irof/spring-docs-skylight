// Spring Framework
var coreVersion = () => $("coreVersion").value;
$("coreButton").addEventListener("click", () => {
  openGoogleSearchWithSite(resolveUrl(
    `https://docs.spring.io/spring-framework/docs/${coreVersion()}/reference/html/`,
    `https://spring.pleiades.io/spring-framework/docs/${coreVersion()}/reference/html/`
  ));
});

// Spring Boot
var bootVersion = () => $("bootVersion").value;
$("bootButton").addEventListener("click", () => {
  openGoogleSearchWithSite(resolveUrl(
    `https://docs.spring.io/spring-boot/docs/${bootVersion()}/reference/html/`,
    `https://spring.pleiades.io/spring-boot/docs/${bootVersion()}/reference/html/`
  ));
});
$("bootSinglePageButton").addEventListener("click", () => {
  openUrl(resolveUrl(
    `https://docs.spring.io/spring-boot/docs/${bootVersion()}/reference/htmlsingle/`,
    `https://spring.pleiades.io/spring-boot/docs/${bootVersion()}/reference/htmlsingle/`
  ));
});
$("bootPropertiesPageButton").addEventListener("click", () => {
  openUrl(resolveUrl(
    `https://docs.spring.io/spring-boot/docs/${bootVersion()}/reference/html/application-properties.html`,
    `https://spring.pleiades.io/spring-boot/docs/${bootVersion()}/reference/html/application-properties.html`
  ));
});

// Spring Security
$("securityVersion").addEventListener("change", e => {
  openSpringSecurity(e.target);
});
$("securityButton").addEventListener("click", () => {
  openSpringSecurity($("securityVersion"));
});
function openSpringSecurity(securityVersion) {
  const version = securityVersion.value;
  const url = resolveUrl(
    `https://docs.spring.io/spring-security/site/docs/${version}/reference/html5/`,
    `https://spring.pleiades.io/spring-security/site/docs/${version}/reference/html5/`
  );
  openUrl(url);
}

$("githubButton").onclick = () => {
  const url = "https://github.com/search?q=" + encodeURIComponent(`org:spring-projects ${$("query").value}`);
  openUrl(url);
};

// toolbox
function openGoogleSearchWithSite(site) {
  const query = $("query");
  const keyword = query.value;
  const url = "https://www.google.com/search?q=" + encodeURIComponent(`site:${site} ${keyword}`);
  openUrl(url);
}
function openUrl(url) {
  if ($("newtab").checked) {
    chrome.tabs.create({ url });
  } else {
    chrome.tabs.update({ url });
  }
}
function resolveUrl(official, pleiades) {
  return $("pleiades").checked ? pleiades : official;
}
function $(id) {
  return document.getElementById(id);
}

// userbility
$("reset").onclick = () => {
  $("query").value = "";
  $("newtab").checked = false;
  $("pleiades").checked = false;
  chrome.storage.local.clear();
}

$("query").onchange = (event) => chrome.storage.local.set({ query: event.target.value });
$("newtab").onchange = (event) => chrome.storage.local.set({ newtab: event.target.checked });
$("pleiades").onchange = (event) => chrome.storage.local.set({ pleiades: event.target.checked });

function openPopup() {
  chrome.storage.local.get(['query', 'pleiades', 'newtab'], (savedValue) => {
    if (savedValue.query) $("query").value = savedValue.query;
    $("newtab").checked = savedValue.newtab;
    $("pleiades").checked = savedValue.pleiades;
  });
}
openPopup();
