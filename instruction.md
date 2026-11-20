
## Prerequisites

Before setting up the project, make sure you have installed:

**Node.js** (LTS version recommended)
   - https://nodejs.org/


3. **pnpm**

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

Check the installations:

```bash
node -v
npm -v
pnpm -v
git --version
```

## 1. Clone the Repository

Open your terminal and navigate to the directory where you want to keep the project.

Clone the repository:

```bash
git clone https://github.com/ImTanveerr/queueless-client.git
```


## 2. Install Dependencies

Install all required packages:

```bash
pnpm install
```

This command automatically installs the dependencies listed in `package.json` and generates the necessary `node_modules` folder.

**Important:** Do not delete or modify `pnpm-lock.yaml` unnecessarily. It ensures everyone uses consistent dependency versions.

## 3. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add:

```env
BACKEND_URL=http://localhost:5000
```

This connects the frontend to the local backend server.

**Note:** Make sure the backend is running on port 5000.

Never commit `.env.local` or other files containing secrets to GitHub.

## 4. Run the Development Server

Start the Next.js development server:

```bash
pnpm dev
```

Open your browser:

http://localhost:3000

The application should now be running locally.



## 5. Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build production application |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint checks |

## 6. Project Structure

```text
queueless-client/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   └── types/
│       └── index.ts
│
├── .env.local
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
└── tsconfig.json
```

## 7 Folder Responsibilities

- `app/` - Application pages, layouts and global styles.
- `components/` - Reusable UI components.
- `hooks/` - Custom React hooks.
- `lib/` - API utilities and helper functions.
- `types/` - Shared TypeScript interfaces and types.
- `public/` - Static assets such as images and icons.

## 8. GitHub Contribution Guidelines

Before starting your work, always pull the latest updates:

```bash
git pull origin main
```

Create a separate branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

After completing your changes:

```bash
git add .
git commit -m "Describe your changes"
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

Wait for the changes to be reviewed before merging into `main`.

### Commit Message Examples

```bash
git commit -m "Add login page"
git commit -m "Create user dashboard"
git commit -m "Integrate queue API"
git commit -m "Fix responsive navbar"
git commit -m "Update global styles"
```

## 9. Before Pushing Your Code

Make sure your code builds successfully:

```bash
pnpm build
```

Also check for linting errors:

```bash
pnpm lint
```

Do not push code containing unnecessary errors, temporary files, or environment secrets.

## 10. Important Rules for Team Members

1. Always pull the latest code before starting new work.
2. Never directly push feature changes to the `main` branch.
3. Use separate branches for separate features.
4. Use TypeScript instead of plain JavaScript.
5. Create reusable components whenever possible.
6. Follow the existing folder structure.
7. Keep component names meaningful.
8. Do not commit `.env.local` or sensitive credentials.
9. Test your changes before creating a Pull Request.
10. Communicate with the team before making major structural changes.

## Repository Links

**Frontend Repository:**

https://github.com/ImTanveerr/queueless-client


---

### Dependencies are not working

Try reinstalling them:

```bash
rm -rf node_modules
pnpm install
```

On Windows PowerShell, use:

```powershell
Remove-Item -Recurse -Force node_modules
pnpm install
```

### Backend connection failed

Check:

- Is the backend server running?
- Is the backend running on port 5000?
- Is `BACKEND_URL` correctly configured in `.env.local`?

### Git push rejected

First synchronize your branch with the remote repository:

```bash
git pull --rebase origin main
```

Resolve any merge conflicts, then push again.

---

**Happy Coding!**

Queueless Development Team
.