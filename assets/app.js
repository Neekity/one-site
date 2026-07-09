const tools = [
  {
    name: "Codex",
    category: "开发",
    role: "需求拆解、代码生成、页面迭代和部署排查。",
    free: "按你的 ChatGPT/Codex 订阅填写；不要算成网站运行成本。",
    commercial: "团队协作、API 调用和生产 AI 功能需要单独核算。",
    upgrade: "需要并行任务、长时间后台任务或多人协作时升级。",
    alternatives: "Cursor、GitHub Copilot、Claude Code、OpenCode",
    china: "网络稳定性和账号可用性要提前验证。",
    url: "https://chatgpt.com/pricing/",
    tag: "核心",
  },
  {
    name: "GitHub",
    category: "代码",
    role: "版本控制、远端备份、Actions 和 GitHub Pages。",
    free: "个人公开/私有仓库可免费起步。",
    commercial: "组织权限、审计、私有 Pages 和合规能力可能需要付费计划。",
    upgrade: "多人协作、权限分层、保护分支和 CI 配额增长时升级。",
    alternatives: "GitLab、Gitea、Bitbucket",
    china: "国内访问和 GitHub Actions 拉包偶发不稳定。",
    url: "https://github.com/pricing",
    tag: "核心",
  },
  {
    name: "Cloudflare Pages",
    category: "托管",
    role: "静态站托管、全球 CDN、HTTPS 和预览部署。",
    free: "免费层足够个人测试和轻量静态站。",
    commercial: "生产项目要关注构建次数、团队权限、日志和合规需求。",
    upgrade: "需要团队协作、自定义安全策略、Workers 组合能力时升级。",
    alternatives: "GitHub Pages、Vercel、Netlify",
    china: "pages.dev 在部分网络环境可能不稳定，自定义域名更可控。",
    url: "https://pages.cloudflare.com/",
    tag: "核心",
  },
  {
    name: "Cloudflare Web Analytics",
    category: "分析",
    role: "隐私友好的页面访问、来源和路径统计。",
    free: "免费可用，已接入当前站点。",
    commercial: "适合轻量增长判断，不替代完整产品事件分析。",
    upgrade: "需要漏斗、用户路径和事件级分析时接 PostHog。",
    alternatives: "Plausible、Umami、PostHog",
    china: "统计脚本跨境加载可能受网络影响，要观察数据缺口。",
    url: "https://www.cloudflare.com/web-analytics/",
    tag: "已接入",
  },
  {
    name: "Vercel",
    category: "托管",
    role: "前端托管、预览链接、Serverless 和自动部署。",
    free: "Hobby 适合个人非商业测试。",
    commercial: "商业用途通常应使用 Pro 或更高计划。",
    upgrade: "商业发布、团队协作、带宽/函数调用增长时升级。",
    alternatives: "Cloudflare Pages、Netlify、Fly.io",
    china: "国内访问质量不稳定，出海项目更适合。",
    url: "https://vercel.com/pricing",
    tag: "注意",
    tone: "warn",
  },
  {
    name: "Supabase",
    category: "后端",
    role: "Postgres 数据库、Auth、Storage、Realtime 和 pgvector。",
    free: "免费层适合 MVP；数据库体量要按 500MB 起步口径监控。",
    commercial: "生产环境要考虑备份、分支、资源隔离和区域选择。",
    upgrade: "数据库超过免费层、需要稳定生产 SLA 或更大存储时升级。",
    alternatives: "Neon、Firebase、Railway Postgres",
    china: "连接延迟、邮箱验证送达和 OAuth 回调要单独测试。",
    url: "https://supabase.com/pricing",
    tag: "核心",
  },
  {
    name: "Neon",
    category: "数据库",
    role: "Serverless Postgres，适合轻量 SaaS 和分支数据库。",
    free: "有免费层，适合试验独立数据库项目。",
    commercial: "生产要关注计算时间、存储、分支和冷启动体验。",
    upgrade: "需要稳定计算、更多分支或更大存储时升级。",
    alternatives: "Supabase、Railway Postgres、Render Postgres",
    china: "跨境数据库延迟明显，后端部署区域要靠近 Neon 区域。",
    url: "https://neon.com/pricing",
    tag: "可选",
  },
  {
    name: "Turso",
    category: "数据库",
    role: "边缘 SQLite/libSQL，适合读多写少和全球低延迟场景。",
    free: "有免费层，适合原型和轻量数据。",
    commercial: "复杂关系查询、事务模型和生态成熟度要先验证。",
    upgrade: "需要更多数据库、存储、边缘副本或团队能力时升级。",
    alternatives: "SQLite + Litestream、Neon、Supabase",
    china: "边缘节点覆盖和延迟需要实测。",
    tag: "可选",
    url: "https://turso.tech/pricing",
  },
  {
    name: "Upstash",
    category: "缓存",
    role: "Serverless Redis、QStash、Kafka 和 Rate Limit。",
    free: "有免费额度，适合低量缓存、限流和任务队列。",
    commercial: "高频缓存和队列会快速消耗请求额度。",
    upgrade: "需要更高吞吐、持久队列或稳定延迟时升级。",
    alternatives: "Redis Cloud、Cloudflare KV/D1/Queues、Supabase Redis 扩展",
    china: "跨境缓存收益可能被网络延迟抵消。",
    url: "https://upstash.com/pricing",
    tag: "可选",
  },
  {
    name: "Resend",
    category: "邮件",
    role: "登录邮件、通知邮件、订阅邮件和开发者友好的 API。",
    free: "免费层适合低量事务邮件测试。",
    commercial: "批量营销邮件、品牌域名和送达率要认真配置。",
    upgrade: "超过日/月发送额度或需要更稳定送达时升级。",
    alternatives: "Postmark、Mailgun、Amazon SES",
    china: "国内邮箱收信、DNS 验证和退信要实测。",
    url: "https://resend.com/pricing",
    tag: "可选",
  },
  {
    name: "Clerk",
    category: "认证",
    role: "用户登录、组织账号、社交登录、企业 SSO。",
    free: "免费层适合早期验证和中小规模登录。",
    commercial: "B2B、组织权限、SSO 和高级安全能力可能进入付费。",
    upgrade: "需要组织、多租户、企业登录或复杂安全策略时升级。",
    alternatives: "Supabase Auth、Better Auth、Auth.js",
    china: "短信、社交登录和第三方 OAuth 可用性要实测。",
    url: "https://clerk.com/pricing",
    tag: "延后",
    tone: "stop",
  },
  {
    name: "Better Auth",
    category: "认证",
    role: "开源认证框架，适合自托管和定制登录流程。",
    free: "开源免费，运行成本由你的后端承担。",
    commercial: "责任转移到自己：安全、升级、审计都要自己维护。",
    upgrade: "需要省运维、企业 SSO 或托管认证时换 Clerk/Auth0。",
    alternatives: "Auth.js、Supabase Auth、Clerk",
    china: "自托管更可控，但安全和邮件链路不能省。",
    url: "https://www.better-auth.com/",
    tag: "开源",
  },
  {
    name: "Stripe",
    category: "支付",
    role: "收款、订阅、退款、Webhook 和账单管理。",
    free: "无月租，按交易收费。",
    commercial: "主体、税务、退款、争议处理和地区可用性是关键。",
    upgrade: "开始收费前必须补条款、回调幂等、对账和失败重试。",
    alternatives: "Lemon Squeezy、Paddle、PayPal",
    china: "中国大陆主体通常不能直接开 Stripe，常见做法是香港/海外主体。",
    url: "https://stripe.com/pricing",
    tag: "风险",
    tone: "warn",
  },
  {
    name: "Lemon Squeezy",
    category: "支付",
    role: "Merchant of Record，适合卖数字产品、模板、订阅。",
    free: "通常无月租，按交易/服务费收费。",
    commercial: "适合数字商品，不一定适合所有 SaaS 业务模型。",
    upgrade: "涉及全球税务、发票和数字商品交付时优先考虑。",
    alternatives: "Paddle、Stripe、Gumroad",
    china: "账户审核、结算和税务资料要提前确认。",
    url: "https://www.lemonsqueezy.com/",
    tag: "可选",
    tone: "warn",
  },
  {
    name: "PostHog",
    category: "分析",
    role: "事件分析、漏斗、来源、A/B 测试和产品行为洞察。",
    free: "免费额度适合早期产品验证。",
    commercial: "事件量增长后要控制采集范围和成本。",
    upgrade: "需要漏斗、留存、功能开关和实验时接入。",
    alternatives: "Amplitude、Mixpanel、Umami",
    china: "跨境脚本加载和数据合规要关注。",
    url: "https://posthog.com/pricing",
    tag: "建议",
  },
  {
    name: "Sentry",
    category: "监控",
    role: "前端/后端错误监控、性能追踪和告警。",
    free: "免费层适合个人项目和早期错误定位。",
    commercial: "事件量、性能追踪和团队协作会影响成本。",
    upgrade: "上线后有人真实使用，就应该接入。",
    alternatives: "GlitchTip、Bugsnag、OpenTelemetry + Grafana",
    china: "Source map 上传、跨境日志和隐私字段要处理。",
    url: "https://sentry.io/pricing/",
    tag: "建议",
  },
  {
    name: "Umami",
    category: "分析",
    role: "轻量网站统计，可云服务也可自托管。",
    free: "自托管软件免费，云服务按计划收费。",
    commercial: "自托管要维护数据库、备份和升级。",
    upgrade: "只需要 PV、来源和页面路径时足够；复杂事件用 PostHog。",
    alternatives: "Plausible、Cloudflare Web Analytics、Matomo",
    china: "自托管可放近用户，但要自己运维。",
    url: "https://umami.is/pricing",
    tag: "可选",
  },
  {
    name: "Pinecone",
    category: "搜索",
    role: "专用向量数据库，适合语义搜索和 RAG 检索。",
    free: "有入门免费/低成本口径，但生产要重算。",
    commercial: "向量规模、索引类型、读写量会显著影响成本。",
    upgrade: "pgvector 查询变慢、向量规模变大或需要专用检索能力时再用。",
    alternatives: "Supabase pgvector、Qdrant、Weaviate",
    china: "跨境向量检索延迟可能明显。",
    url: "https://www.pinecone.io/pricing/",
    tag: "延后",
    tone: "stop",
  },
  {
    name: "Algolia",
    category: "搜索",
    role: "站内关键词搜索、筛选、排序和即时搜索体验。",
    free: "有免费额度，适合验证搜索体验。",
    commercial: "记录数、搜索请求和高级排序会影响成本。",
    upgrade: "目录条目超过几百、筛选字段变多、搜索成为主入口时使用。",
    alternatives: "Meilisearch、Typesense、Postgres 全文搜索",
    china: "搜索延迟和中文分词质量要实测。",
    url: "https://www.algolia.com/pricing/",
    tag: "可选",
  },
  {
    name: "Namecheap",
    category: "域名",
    role: "域名购买和基础 DNS 管理；也可只买域名、DNS 放 Cloudflare。",
    free: "域名本身不免费，常见按年付费。",
    commercial: "续费价格、隐私保护、转出规则比首年价格更重要。",
    upgrade: "有品牌名、需要邮箱和自定义域名时购买。",
    alternatives: "Cloudflare Registrar、Porkbun、NameSilo",
    china: "如果面向中国大陆，备案和域名实名要另算。",
    url: "https://www.namecheap.com/domains/",
    tag: "基础",
  },
];

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const controls = {
  codex: document.querySelector("#codexCost"),
  users: document.querySelector("#users"),
  email: document.querySelector("#email"),
  db: document.querySelector("#db"),
  stripe: document.querySelector("#stripe"),
  semantic: document.querySelector("#semantic"),
  revenue: document.querySelector("#revenue"),
};

const labels = {
  codex: document.querySelector("#codexLabel"),
  users: document.querySelector("#usersLabel"),
  email: document.querySelector("#emailLabel"),
  db: document.querySelector("#dbLabel"),
  fixed: document.querySelector("#fixedCost"),
  total: document.querySelector("#totalCost"),
  fee: document.querySelector("#feeText"),
  risk: document.querySelector("#riskLevel"),
  riskText: document.querySelector("#riskText"),
  riskList: document.querySelector("#riskList"),
  stackGrid: document.querySelector("#stackGrid"),
};

function money(value) {
  return moneyFormatter.format(Math.max(0, Number(value) || 0));
}

function number(value) {
  return Number(value).toLocaleString("zh-CN");
}

function getFlags(values) {
  const flags = [];

  if (values.db > 500) {
    flags.push("数据库超过 500 MB，Supabase 免费层可能不再适合真实生产。");
  }

  if (values.email > 3000) {
    flags.push("邮件量超过 Resend 免费层常见起步口径，需要关注日限和送达率。");
  }

  if (values.users > 50000) {
    flags.push("月活超过 50,000 后，认证、分析和数据库都要重新核算。");
  }

  if (values.semantic) {
    flags.push("语义搜索会增加数据清洗、向量化和检索调优成本，先用 pgvector 验证。");
  }

  if (values.revenue > 0) {
    flags.push("一旦开始收费，就要补齐服务条款、退款流程、税务和支付失败处理。");
  }

  return flags;
}

function getRisk(flags) {
  if (flags.length >= 3) {
    return ["高", "建议按商业 MVP 重新设计"];
  }

  if (flags.length >= 1) {
    return ["中", "可以继续验证，但要提前规划升级"];
  }

  return ["低", "适合个人验证"];
}

function renderRisks(flags) {
  const defaultItems = [
    ["Codex 是开发成本，不等于线上 AI API 成本。", false],
    ["Vercel Hobby 更适合个人非商业测试，商业发布要单独核算。", true],
    ["个人测试可以先不上 Clerk，Supabase Auth 足够。", false],
    ["不要做纯工具目录，优先沉淀可决策的数据字段。", true],
  ];

  const rows = flags.map((text) => [text, true]).concat(defaultItems).slice(0, 7);

  labels.riskList.innerHTML = rows
    .map(([text, warn]) => `<li class="${warn ? "warn" : ""}">${text}</li>`)
    .join("");
}

function updateCalculator() {
  const values = {
    codex: Number(controls.codex.value),
    users: Number(controls.users.value),
    email: Number(controls.email.value),
    db: Number(controls.db.value),
    stripe: controls.stripe.checked,
    semantic: controls.semantic.checked,
    revenue: Number(controls.revenue.value || 0),
  };

  const domainMonthly = 1;
  const paymentFee =
    values.stripe && values.revenue > 0
      ? values.revenue * 0.029 + Math.max(1, Math.round(values.revenue / 49)) * 0.3
      : 0;
  const fixedCost = values.codex + domainMonthly;
  const totalCost = fixedCost + paymentFee;
  const flags = getFlags(values);
  const [risk, riskText] = getRisk(flags);

  labels.codex.textContent = money(values.codex);
  labels.users.textContent = number(values.users);
  labels.email.textContent = number(values.email);
  labels.db.textContent = `${number(values.db)} MB`;
  labels.fixed.textContent = money(fixedCost);
  labels.total.textContent = money(totalCost);
  labels.fee.textContent = paymentFee > 0 ? `预估支付手续费 ${money(paymentFee)}` : "无交易手续费";
  labels.risk.textContent = risk;
  labels.riskText.textContent = riskText;

  renderRisks(flags);
}

function renderTools() {
  labels.stackGrid.innerHTML = tools
    .map(
      (tool) => `
        <article class="tool-card">
          <header>
            <div>
              <b>${tool.name}</b>
              <small>${tool.category}</small>
            </div>
            <span class="tag ${tool.tone || ""}">${tool.tag}</span>
          </header>
          <p>${tool.role}</p>
          <dl class="tool-meta">
            <div><dt>免费额度</dt><dd>${tool.free}</dd></div>
            <div><dt>商用限制</dt><dd>${tool.commercial}</dd></div>
            <div><dt>升级触发</dt><dd>${tool.upgrade}</dd></div>
            <div><dt>替代方案</dt><dd>${tool.alternatives}</dd></div>
            <div><dt>中国用户</dt><dd>${tool.china}</dd></div>
          </dl>
          <a class="tool-link" href="${tool.url}" target="_blank" rel="noreferrer">查看官方页面</a>
        </article>
      `,
    )
    .join("");
}

Object.values(controls).forEach((control) => {
  control.addEventListener("input", updateCalculator);
  control.addEventListener("change", updateCalculator);
});

renderTools();
updateCalculator();
