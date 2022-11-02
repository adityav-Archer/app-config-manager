export let config = {
  logoSrc: "images/logo.svg",
  pageTitle: "Contextual Intelligence",
  auth: {
    clientId: `9913d981-1693-4d52-a331-17c346ca05eb`,
    authority: `https://login.microsoftonline.com/96a054a8-eb06-4d55-bead-a46bd57c71a3`,
    useRedirectFlow: true,
    scopes: ["api://7ea72050-8b30-450f-b5ef-e467a909c780/Files.Write.All"],
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  applications: [
    {
      title: "ACE V2",
      name: "ci-ace-app",
      nav: [
        {
          label: "Libraries",
          urlPattern: "^(?!.*view).*$",
          state: { view: null },
        },
      ],
      src: "http://localhost:8000/src/app.js",
      logoSrc: "images/logo.svg",
      state: {
        app: "acev2",
      },
      urlPattern: "app=acev2",
      prodId: "48798c43-e689-4dc7-b357-65cf40f97824",
      behaviors: [null, "Acknowledge", "Apologize"],
      //apiUrl: "https://api.ci.apiparty.com/context-intel/dev/v2",
      //secondaryApiUrl: "https://api.ci.apiparty.com/context-intel/dev",
      apiUrl: "https://api.ci.apiparty.com/context-intel/dev/v2",
      secondaryApiUrl: "https://api.ci.apiparty.com/context-intel/dev",
      contentAssetsUrl:
        "https://api.ci.apiparty.com/context-intel/dev/content-assets",
      showAppBar: true,
      showNavBar: true,
      showShell: true
    },
    {
      title: "Chat",
      description: "Chat with Walbot 1",
      name: "ci-chat-app",
      nav: [
        {
          label: "Settings",
          graphic: "icon",
          icon: "settings",
          state: {
            view: "settings",
          },
          urlPattern: "view=settings",
        },
        {
          label: "Test",
          state: { keyword: "test" },
        },
        {
          label: "First Line",
          secondaryLabel: "second line",
          urlPattern: "#item2",
          state: { hash: "#item2" },
          iconUrl: "images/logo.svg",
        },
        {
          divider: true,
          padded: true,
        },
      ],
      src: "../../src/demo.smartChat.js",
      logoSrc: "images/logo.svg",
      urlPattern: "app=chat",
      state: {
        app: "chat",
      },
    },
    {
      title: "NLU",
      url: {
        href: "https://nlumanagerclient.z5.web.core.windows.net/index.html",
      },
    },
  ],
};
