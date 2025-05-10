#!/bin/bash

# Цвета для вывода в консоль
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=== Автоматизация деплоя проекта на GitHub ===${NC}\n"

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js не установлен. Пожалуйста, установите Node.js и попробуйте снова.${NC}"
    echo "Инструкции по установке: https://nodejs.org/"
    exit 1
fi

# Запуск скрипта деплоя
echo -e "${GREEN}Запуск скрипта деплоя...${NC}"

# Проверка наличия скрипта
if [ ! -f "scripts/deploy-to-github.js" ]; then
    echo -e "${YELLOW}Скрипт deploy-to-github.js не найден. Создаем директорию scripts...${NC}"
    mkdir -p scripts
    
    # Проверка успешности создания директории
    if [ ! -d "scripts" ]; then
        echo -e "${RED}Не удалось создать директорию scripts. Проверьте права доступа.${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Скачиваем скрипт deploy-to-github.js...${NC}"
    
    # Проверка наличия curl или wget
    if command -v curl &> /dev/null; then
        curl -o scripts/deploy-to-github.js https://raw.githubusercontent.com/username/colorcraft-deploy/main/deploy-to-github.js
    elif command -v wget &> /dev/null; then
        wget -O scripts/deploy-to-github.js https://raw.githubusercontent.com/username/colorcraft-deploy/main/deploy-to-github.js
    else
        echo -e "${RED}Не удалось скачать скрипт. Установите curl или wget и попробуйте снова.${NC}"
        exit 1
    fi
    
    # Проверка успешности скачивания
    if [ ! -f "scripts/deploy-to-github.js" ]; then
        echo -e "${RED}Не удалось скачать скрипт. Создаем базовый скрипт...${NC}"
        
        # Создаем базовый скрипт
        cat > scripts/deploy-to-github.js << 'EOF'
#!/usr/bin/env node

console.log('Запуск процесса деплоя...');

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
  } catch (error) {
    console.error(`Ошибка при выполнении команды: ${command}`);
    console.error(error.message);
    return null;
  }
}

async function main() {
  // Проверка инициализации Git
  try {
    execSync('git status', { stdio: 'ignore' });
  } catch (error) {
    console.log('Git не инициализирован. Инициализируем...');
    runCommand('git init');
  }
  
  // Проверка наличия .gitignore
  const fs = require('fs');
  if (!fs.existsSync('.gitignore')) {
    console.log('Создаем .gitignore...');
    fs.writeFileSync('.gitignore', `
# dependencies
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
`);
  }
  
  // Проверка наличия удаленного репозитория
  let hasOrigin = false;
  try {
    const remotes = execSync('git remote', { stdio: 'pipe', encoding: 'utf8' });
    hasOrigin = remotes.includes('origin');
  } catch (error) {
    hasOrigin = false;
  }
  
  if (!hasOrigin) {
    const repoUrl = await new Promise(resolve => {
      rl.question('Введите URL репозитория (например, https://github.com/username/repo.git): ', resolve);
    });
    
    console.log('Настройка удаленного репозитория...');
    runCommand(`git remote add origin ${repoUrl}`);
  }
  
  // Добавление файлов в индекс Git
  console.log('Добавление файлов в индекс Git...');
  runCommand('git add .');
  
  // Создание коммита
  const commitMessage = await new Promise(resolve => {
    rl.question('Введите сообщение коммита (по умолчанию "Update"): ', (answer) => {
      resolve(answer || 'Update');
    });
  });
  
  console.log('Создание коммита...');
  runCommand(`git commit -m "${commitMessage}"`);
  
  // Отправка кода в удаленный репозиторий
  console.log('Отправка кода в удаленный репозиторий...');
  
  // Определение имени ветки
  let branchName = 'main';
  try {
    branchName = execSync('git rev-parse --abbrev-ref HEAD', { stdio: 'pipe', encoding: 'utf8' }).trim();
  } catch (error) {
    // Используем main по умолчанию
  }
  
  runCommand(`git push -u origin ${branchName}`);
  
  console.log('Деплой завершен!');
  rl.close();
}

main().catch(error => {
  console.error('Произошла ошибка:', error);
  process.exit(1);
});
EOF
        
        # Делаем скрипт исполняемым
        chmod +x scripts/deploy-to-github.js
    fi
fi

# Делаем скрипт исполняемым
chmod +x scripts/deploy-to-github.js

# Запускаем скрипт
node scripts/deploy-to-github.js

# Проверка успешности выполнения
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Скрипт успешно выполнен!${NC}"
else
    echo -e "\n${RED}Произошла ошибка при выполнении скрипта.${NC}"
    exit 1
fi
