# OneStack

一人公司建站成本计算器。这个仓库是纯静态网站，不依赖构建工具，入口是 `index.html`。

## 本地预览

直接打开 `index.html`，或使用任意静态服务器：

```bash
python3 -m http.server 5173
```

## 部署

### GitHub Pages

仓库已包含 `.github/workflows/pages.yml`。推送到 `main` 后，GitHub Actions 会把根目录发布到 GitHub Pages。

如果仓库首次启用 Pages，需要在 GitHub 仓库设置中将 Pages Source 选择为 GitHub Actions。

### Vercel

导入仓库即可：

- Framework Preset: Other
- Build Command: 留空
- Output Directory: `.`

## 内容口径

页面面向个人测试 / 无商业阶段，默认固定成本按：

- Codex / ChatGPT：可在页面中手动调整，默认 `$20/月`
- 域名：按 `$12/年` 估算为 `$1/月`
- 其他服务：默认使用免费层或延后接入

这些价格和限制会变化，正式商业上线前需要重新核对各服务官网。
