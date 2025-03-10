import fs from "fs";
import { Command } from 'commander';

const FILE_PATH = './.env';
const SHEET_ID = 'SPREADSHEET_ID';
const SHEET_IDS_FILE = './sheet_ids.txt'; // Путь к файлу sheet_ids.txt

const program = new Command();

program
  .requiredOption('-v, --value <value>', 'Новое значение переменной')
  .parse(process.argv);

const options = program.opts();

// Функция для обновления файла .env
function updateEnvFile(filePath: string, key: string, newValue: string) {
  const envFileContent = fs.readFileSync(filePath, 'utf-8');

  const lines = envFileContent.split('\n');
  const updatedLines = lines.map(line => {
    if (line.startsWith(`${key}=`)) {
      return `${key}=${newValue}`;
    }
    return line;
  });

  const updatedContent = updatedLines.join('\n');

  fs.writeFileSync(filePath, updatedContent, 'utf-8');

  console.log(`Переменная ${key} в .env обновлена на значение ${newValue}`);
}

// Функция для добавления значения в sheet_ids.txt
function updateSheetIdsFile(filePath: string, newValue: string) {
  let sheetIdsContent = '';

  // Проверяем, существует ли файл
  if (fs.existsSync(filePath)) {
    sheetIdsContent = fs.readFileSync(filePath, 'utf-8');
  }

  // Разделяем содержимое файла на строки
  const lines = sheetIdsContent.split('\n').filter(line => line.trim() !== '');

  // Проверяем, есть ли уже такое значение в файле
  if (!lines.includes(newValue)) {
    lines.push(newValue); // Добавляем новое значение
    const updatedContent = lines.join('\n');
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Значение ${newValue} добавлено в ${filePath}`);
  } else {
    console.log(`Значение ${newValue} уже существует в ${filePath}`);
  }
}

// Обновляем .env
updateEnvFile(FILE_PATH, SHEET_ID, options.value);

// Обновляем sheet_ids.txt
updateSheetIdsFile(SHEET_IDS_FILE, options.value);