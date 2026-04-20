---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100d1ca2fdce7d2e92ec846bc4688f7687898aa46b829d8605fa30207b98f7fb67b022100975f9df0e6131027cd74252a542a3b0aea0109a87bc04fef8e0e32fab9fc5ea3
    ReservedCode2: 3045022036934415418c02219cbb403c25d09afb6c9e097160f8512876275bec8387428e022100985d2e01efcad5686959c3d1a7c0baf0196c126b35b65c2f81a23a0d71e426c3
---

# 部署到 Gitee Pages（码云）指南

## 前提条件
- 已安装 Git
- 已注册 Gitee 账号
- 本地已安装 Node.js 和 pnpm

## 方法一：使用 Gitee Pages（推荐）

### 第一步：创建 Gitee 仓库

1. 登录 [Gitee](https://gitee.com/)
2. 点击右上角 **"+"** → **"新建仓库"**
3. 填写仓库信息：
   - 仓库名称：`woodcut-heritage`
   - 仓库公开/私有：选择"公开"
   - 选择"初始化仓库"：**不勾选**
4. 点击"创建"

### 第二步：克隆仓库到本地

```bash
git clone https://gitee.com/你的用户名/woodcut-heritage.git
cd woodcut-heritage
```

### 第三步：复制项目文件

将 `/workspace/woodcut-heritage` 目录下的所有文件复制到刚克隆的仓库中，**除了** `.git` 目录。

### 第四步：构建项目

```bash
# 安装依赖
pnpm install

# 构建生产版本
pnpm run build
```

构建完成后，会生成 `dist` 目录。

### 第五步：推送代码到 Gitee

```bash
git add .
git commit -m "Initial commit - 承印千年木刻版画数据库"
git push origin master
```

### 第六步：启用 Gitee Pages

1. 在 Gitee 仓库页面，点击左侧菜单 **"服务"** → **"Gitee Pages"**
2. 点击 **"启动"** 按钮
3. 选择分支：`master`
4. 选择部署目录：`/dist`
5. 点击 **"部署"**

### 第七步：访问网站

部署成功后，会获得一个免费域名，格式为：
`https://你的用户名.gitee.io/woodcut-heritage/`

---

## 方法二：直接部署 dist 目录

如果你只想部署已构建好的文件：

### 第一步：创建 Gitee 仓库（同上）

### 第二步：将 dist 目录作为仓库根目录

1. 克隆空仓库
2. 将 `/workspace/woodcut-heritage/dist` 目录下的所有内容复制到仓库根目录
3. 添加 `CNAME` 文件（可选，用于自定义域名）

### 第三步：推送并启用 Gitee Pages

```bash
git add .
git commit -m "Deploy - 承印千年木刻版画数据库"
git push origin master
```

然后在 Gitee Pages 中启用即可。

---

## 注意事项

### 1. base 配置
如果部署到子路径（如 `/woodcut-heritage/`），需要修改 `vite.config.ts`：

```typescript
// vite.config.ts
export default defineConfig({
  base: '/woodcut-heritage/',  // 添加这行
  plugins: [react()],
})
```

重新构建后再部署。

### 2. 静态资源路径
确保 `index.html` 中的资源路径正确，Vite 构建会自动处理。

### 3. 绑定自定义域名（可选）

1. 在 Gitee Pages 设置中填写你的域名
2. 在你的域名 DNS 设置中添加 CNAME 记录：
   - 主机记录：`www` 或 `@`
   - 记录类型：CNAME
   - 记录值：`你的用户名.gitee.io`

---

## 常见问题

### Q: Gitee Pages 是否免费？
A: Gitee Pages 个人版免费，提供基础托管服务。

### Q: 网站能永久访问吗？
A: 只要你的 Gitee 账号正常，且仓库存在，网站就可以永久访问。

### Q: 数据如何持久化？
A: 当前网站使用 localStorage 存储数据（用户注册信息、评论等）。如需持久化数据，需要后端支持。

### Q: 如何更新网站内容？
A: 修改源代码 → 重新构建 → 推送到 Gitee → Gitee Pages 会自动更新

---

## 备份建议

定期将 `/workspace/woodcut-heritage` 目录完整备份到本地或云盘，确保源代码安全。

---

*最后更新：2026-04-15*
