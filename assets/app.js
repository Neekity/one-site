const tools = [
  {
    name: "Codex",
    role: "需求拆解、代码生成、页面迭代和部署排查。",
    cost: "按你的 ChatGPT/Codex 订阅填写",
    tag: "核心",
  },
  {
    name: "GitHub",
    role: "版本控制、远端备份和 GitHub Pages 发布。",
    cost: "个人公开仓库可免费起步",
    tag: "核心",
  },
  {
    name: "Vercel",
    role: "前端托管、预览链接和自动部署。",
    cost: "个人非商业可测试，商业上线需重算",
    tag: "注意",
    tone: "warn",
  },
  {
    name: "Supabase",
    role: "Postgres 数据库、Auth、Storage 和 pgvector。",
    cost: "免费层适合 MVP 验证",
    tag: "核心",
  },
  {
    name: "Cloudflare",
    role: "DNS、域名解析、缓存和基础安全防护。",
    cost: "免费层足够个人测试",
    tag: "核心",
  },
  {
    name: "Resend",
    role: "登录邮件、通知邮件和订阅邮件。",
    cost: "低邮件量可免费起步",
    tag: "可选",
  },
  {
    name: "PostHog",
    role: "事件分析、漏斗、来源和转化判断。",
    cost: "MVP 阶段建议接入",
    tag: "建议",
  },
  {
    name: "Sentry",
    role: "前端错误监控和线上异常定位。",
    cost: "有用户测试后再接也可以",
    tag: "可选",
  },
  {
    name: "Stripe",
    role: "收款、订阅、退款和支付回调。",
    cost: "无交易不收费，但主体和地区要先确认",
    tag: "风险",
    tone: "warn",
  },
  {
    name: "Clerk",
    role: "复杂认证、组织账号和企业 SSO。",
    cost: "个人阶段先不用，Supabase Auth 更简单",
    tag: "延后",
    tone: "stop",
  },
  {
    name: "Pinecone",
    role: "专用向量数据库和大规模语义检索。",
    cost: "个人阶段先用 Supabase pgvector",
    tag: "延后",
    tone: "stop",
  },
  {
    name: "Namecheap",
    role: "域名购买。也可以用 Cloudflare Registrar。",
    cost: "按 $12/年估算为 $1/月",
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
            <b>${tool.name}</b>
            <span class="tag ${tool.tone || ""}">${tool.tag}</span>
          </header>
          <p>${tool.role}</p>
          <small>${tool.cost}</small>
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
