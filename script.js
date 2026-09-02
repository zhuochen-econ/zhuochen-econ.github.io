const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const searchDialog = document.querySelector(".search-dialog");
const searchToggles = document.querySelectorAll(".search-toggle");
const searchInput = document.querySelector("#site-search");
const searchResults = document.querySelector(".search-results");

const sitePages = [
  {
    title: "About Me",
    url: "index.html",
    text: "academic position institution research profile contact email phone mailing address cv",
  },
  {
    title: "Research",
    url: "research.html",
    text: "research interests publications working papers abstracts coauthors Menu-Dependent Risk Attitudes Theory and Evidence Preference for Hope Behavioral Definition Information Greenhouse Optimal Persuasion Medical Test-Avoiders Accelerator Brake Dynamic Persuasion Dead Ends",
  },
  {
    title: "中文研究",
    url: "research-cn.html",
    text: "中文研究 研发竞赛 前沿技术路线布局 创新激励政策 发表论文 在研工作 大国科技竞争下的前沿技术路线布局与研发资助策略 破解研发竞赛中数据要素交易的竞合困境 要素非竞争性 科技竞争中的稀缺要素配置 竞价挤占 要素错配 陈茁 赵艺璇 刘运 经济研究",
  },
];

const isChinesePage = document.documentElement.lang === "zh-CN";
const emptySearchMessage = isChinesePage
  ? "输入关键词，搜索个人主页、Research 和中文研究。"
  : "Type a term to search About Me, Research, and Chinese Research.";

menuToggle?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

searchToggles.forEach((searchToggle) => {
  searchToggle.addEventListener("click", () => {
    searchDialog.showModal();
    requestAnimationFrame(() => searchInput.focus());
  });
});

searchDialog?.addEventListener("click", (event) => {
  if (event.target === searchDialog) {
    searchDialog.close();
  }
});

searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchResults.textContent = emptySearchMessage;
    return;
  }

  const matches = sitePages.filter((page) =>
    `${page.title} ${page.text}`.toLowerCase().includes(query),
  );

  searchResults.replaceChildren();

  if (!matches.length) {
    searchResults.textContent = isChinesePage
      ? "没有找到匹配页面。"
      : "No matching page was found.";
    return;
  }

  matches.forEach((page) => {
    const link = document.createElement("a");
    link.href = page.url;
    link.textContent = page.title;
    searchResults.append(link);
  });
});

searchResults.textContent = emptySearchMessage;
