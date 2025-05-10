#!/usr/bin/env node

/**
 * Скрипт для автоматизации деплоя проекта на GitHub
 *
 * Этот скрипт выполняет следующие действия:
 * 1. Проверяет, установлен ли GitHub CLI (gh)
 * 2. Проверяет, авторизован ли пользователь в GitHub CLI
 * 3. Проверяет, инициализирован ли Git в текущем проекте
 * 4. Создает новый репозиторий на GitHub (если указано)
 * 5. Добавляет удаленный репозиторий
 * 6. Добавляет все файлы в индекс Git
 * 7. Создает коммит
 * 8. Отправляет код в удаленный репозиторий
 */

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Цвета для вывода в консоль
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
}

// Функция для выполнения команд в терминале
function runCommand(command, silent = false) {
  try {
    return execSync(command, { encoding: "utf8", stdio: silent ? "pipe" : "inherit" })
  } catch (error) {
    if (silent) {
      return null
    }
    console.error(`${colors.red}Ошибка при выполнении команды: ${command}${colors.reset}`)
    console.error(error.message)
    return null
  }
}

// Функция для проверки, установлен ли инструмент
function isToolInstalled(tool) {
  try {
    execSync(`which ${tool}`, { stdio: "ignore" })
    return true
  } catch (error) {
    return false
  }
}

// Функция для проверки, авторизован ли пользователь в GitHub CLI
function isGitHubCliAuthenticated() {
  try {
    const status = execSync("gh auth status", { stdio: "pipe", encoding: "utf8" })
    return !status.includes("not logged")
  } catch (error) {
    return false
  }
}

// Функция для проверки, инициализирован ли Git в текущем проекте
function isGitInitialized() {
  return fs.existsSync(path.join(process.cwd(), ".git"))
}

// Функция для проверки, существует ли удаленный репозиторий
function hasRemoteOrigin() {
  try {
    const remotes = execSync("git remote", { stdio: "pipe", encoding: "utf8" })
    return remotes.includes("origin")
  } catch (error) {
    return false
  }
}

// Функция для создания .gitignore, если его нет
function ensureGitignore() {
  const gitignorePath = path.join(process.cwd(), ".gitignore")

  if (!fs.existsSync(gitignorePath)) {
    console.log(
      `${colors.yellow}Файл .gitignore не найден. Создаем стандартный .gitignore для Next.js...${colors.reset}`,
    )

    const gitignoreContent = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`

    fs.writeFileSync(gitignorePath, gitignoreContent)
    console.log(`${colors.green}Файл .gitignore создан.${colors.reset}`)
  }
}

// Основная функция
async function main() {
  console.log(`${colors.bright}${colors.cyan}=== Автоматизация деплоя проекта на GitHub ===${colors.reset}\n`)

  // Шаг 1: Проверка наличия Git
  if (!isToolInstalled("git")) {
    console.error(`${colors.red}Git не установлен. Пожалуйста, установите Git и попробуйте снова.${colors.reset}`)
    console.log("Инструкции по установке: https://git-scm.com/downloads")
    process.exit(1)
  }

  // Шаг 2: Проверка наличия GitHub CLI
  const hasGitHubCli = isToolInstalled("gh")
  if (!hasGitHubCli) {
    console.log(`${colors.yellow}GitHub CLI (gh) не установлен. Некоторые функции будут недоступны.${colors.reset}`)
    console.log("Для полной автоматизации рекомендуется установить GitHub CLI:")
    console.log("https://cli.github.com/manual/installation\n")
  }

  // Шаг 3: Проверка авторизации в GitHub CLI
  let isAuthenticated = false
  if (hasGitHubCli) {
    isAuthenticated = isGitHubCliAuthenticated()
    if (!isAuthenticated) {
      console.log(`${colors.yellow}Вы не авторизованы в GitHub CLI.${colors.reset}`)
      console.log("Выполните авторизацию с помощью команды:")
      console.log("gh auth login\n")

      const answer = await new Promise((resolve) => {
        rl.question("Хотите авторизоваться сейчас? (y/n): ", resolve)
      })

      if (answer.toLowerCase() === "y") {
        console.log("\nЗапуск процесса авторизации...")
        runCommand("gh auth login")
        isAuthenticated = isGitHubCliAuthenticated()
        if (!isAuthenticated) {
          console.error(
            `${colors.red}Авторизация не удалась. Продолжаем с ограниченной функциональностью.${colors.reset}\n`,
          )
        } else {
          console.log(`${colors.green}Авторизация успешна!${colors.reset}\n`)
        }
      }
    } else {
      console.log(`${colors.green}Вы авторизованы в GitHub CLI.${colors.reset}\n`)
    }
  }

  // Шаг 4: Проверка инициализации Git
  let isGitInit = isGitInitialized()
  if (!isGitInit) {
    console.log(`${colors.yellow}Git не инициализирован в текущем проекте.${colors.reset}`)

    const answer = await new Promise((resolve) => {
      rl.question("Инициализировать Git? (y/n): ", resolve)
    })

    if (answer.toLowerCase() === "y") {
      console.log("\nИнициализация Git...")
      runCommand("git init")
      isGitInit = isGitInitialized()
      if (isGitInit) {
        console.log(`${colors.green}Git успешно инициализирован.${colors.reset}\n`)
      } else {
        console.error(`${colors.red}Не удалось инициализировать Git. Прерываем процесс.${colors.reset}`)
        process.exit(1)
      }
    } else {
      console.error(`${colors.red}Git должен быть инициализирован для продолжения. Прерываем процесс.${colors.reset}`)
      process.exit(1)
    }
  } else {
    console.log(`${colors.green}Git инициализирован в текущем проекте.${colors.reset}\n`)
  }

  // Шаг 5: Проверка наличия .gitignore
  ensureGitignore()

  // Шаг 6: Проверка наличия удаленного репозитория
  let hasOrigin = hasRemoteOrigin()
  let repoUrl = ""

  if (!hasOrigin) {
    console.log(`${colors.yellow}Удаленный репозиторий 'origin' не настроен.${colors.reset}`)

    // Создание нового репозитория или использование существующего
    const createNewRepo = await new Promise((resolve) => {
      rl.question("Создать новый репозиторий на GitHub? (y/n): ", resolve)
    })

    if (createNewRepo.toLowerCase() === "y" && hasGitHubCli && isAuthenticated) {
      // Получение имени репозитория
      const repoName = await new Promise((resolve) => {
        rl.question("Введите имя для нового репозитория: ", resolve)
      })

      // Получение описания репозитория
      const repoDescription = await new Promise((resolve) => {
        rl.question("Введите описание репозитория (опционально): ", resolve)
      })

      // Публичный или приватный репозиторий
      const isPublic = await new Promise((resolve) => {
        rl.question("Сделать репозиторий публичным? (y/n): ", resolve)
      })

      const visibility = isPublic.toLowerCase() === "y" ? "public" : "private"

      console.log("\nСоздание репозитория на GitHub...")
      const descriptionArg = repoDescription ? ` --description "${repoDescription}"` : ""
      const result = runCommand(
        `gh repo create ${repoName} --${visibility}${descriptionArg} --source=. --remote=origin`,
        true,
      )

      if (result) {
        console.log(`${colors.green}Репозиторий успешно создан на GitHub.${colors.reset}\n`)
        hasOrigin = true
        repoUrl = `https://github.com/${runCommand("git config user.name", true).trim()}/${repoName}`
      } else {
        console.error(`${colors.red}Не удалось создать репозиторий. Продолжаем с ручной настройкой.${colors.reset}\n`)
      }
    } else {
      // Ручная настройка удаленного репозитория
      repoUrl = await new Promise((resolve) => {
        rl.question("Введите URL существующего репозитория (например, https://github.com/username/repo.git): ", resolve)
      })

      console.log("\nНастройка удаленного репозитория...")
      runCommand(`git remote add origin ${repoUrl}`)
      hasOrigin = hasRemoteOrigin()

      if (hasOrigin) {
        console.log(`${colors.green}Удаленный репозиторий успешно настроен.${colors.reset}\n`)
      } else {
        console.error(`${colors.red}Не удалось настроить удаленный репозиторий. Прерываем процесс.${colors.reset}`)
        process.exit(1)
      }
    }
  } else {
    console.log(`${colors.green}Удаленный репозиторий 'origin' уже настроен.${colors.reset}\n`)
    repoUrl = runCommand("git remote get-url origin", true).trim()
  }

  // Шаг 7: Добавление файлов в индекс Git
  console.log("Добавление файлов в индекс Git...")
  runCommand("git add .")

  // Шаг 8: Создание коммита
  const commitMessage = await new Promise((resolve) => {
    rl.question('Введите сообщение коммита (по умолчанию "Initial commit"): ', (answer) => {
      resolve(answer || "Initial commit")
    })
  })

  console.log("\nСоздание коммита...")
  runCommand(`git commit -m "${commitMessage}"`)

  // Шаг 9: Отправка кода в удаленный репозиторий
  console.log("\nОтправка кода в удаленный репозиторий...")

  // Определение имени ветки
  const branchName = runCommand("git rev-parse --abbrev-ref HEAD", true).trim() || "main"

  // Попытка отправки
  const pushResult = runCommand(`git push -u origin ${branchName}`, true)

  if (pushResult) {
    console.log(`${colors.green}Код успешно отправлен в удаленный репозиторий.${colors.reset}\n`)
  } else {
    console.log(`${colors.yellow}Попытка отправки с установкой upstream...${colors.reset}`)
    runCommand(`git push --set-upstream origin ${branchName}`)
  }

  // Шаг 10: Вывод информации о репозитории
  console.log(`\n${colors.bright}${colors.green}Деплой успешно завершен!${colors.reset}`)
  console.log(`\nВаш репозиторий доступен по адресу: ${colors.cyan}${repoUrl}${colors.reset}`)

  // Шаг 11: Инструкции по будущим обновлениям
  console.log(`\n${colors.bright}Инструкции по управлению будущими обновлениями:${colors.reset}`)
  console.log(`
1. Внесите изменения в код
2. Добавьте изменения в индекс Git:
   ${colors.cyan}git add .${colors.reset}
3. Создайте коммит:
   ${colors.cyan}git commit -m "Описание изменений"${colors.reset}
4. Отправьте изменения в удаленный репозиторий:
   ${colors.cyan}git push${colors.reset}

Для автоматизации этого процесса вы можете использовать этот скрипт снова:
${colors.cyan}node scripts/deploy-to-github.js${colors.reset}
`)

  rl.close()
}

main().catch((error) => {
  console.error(`${colors.red}Произошла ошибка:${colors.reset}`, error)
  process.exit(1)
})
