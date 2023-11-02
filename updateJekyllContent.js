const fs = require('fs');
const path = require('path');

// 定义多个文件夹路径
const folderPaths = [
  'tampermonkey',
  'tools'
];

// 遍历多个文件夹路径
for (const folderPath of folderPaths) {
  updateJekyllContent(folderPath);
}

// 更新 Jekyll 内容的函数
function updateJekyllContent(folderPath) {
  // 读取文件夹内的文件列表
  const files = fs.readdirSync(folderPath);

  // 生成导航链接和页面内容
  const navigation = [];
  const pageContents = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // 根据文件内容生成页面内容
    const pageContent = `
---
layout: default
title: ${file}
---

${fileContent}
`;

    // 添加导航链接和页面内容
   // navigation.push(`<li><a href="/${file}.html">${file}</a></li>`);
     navigation.push(`\n  - ${file}: /${file}.html`);
    pageContents.push(pageContent);
  }

  // 更新 Jekyll 导航文件
  const navigationFile = '_data/navigation.yml';
 // fs.appendFileSync(navigationFile, `\n  - ${navigation.join('\n  - ')}`);
 fs.appendFileSync(navigationFile, `${navigation.join('')}`);
  // 更新 Jekyll 页面文件
 // const jekyllFolder = '_posts'; // 你的 Jekyll 页面文件夹
  const jekyllFolder = 'all' ;
  for (let i = 0; i < pageContents.length; i++) {
    const pageFileName = `${i + 1}-${files[i]}.md`;
    fs.writeFileSync(path.join(jekyllFolder, pageFileName), pageContents[i]);
  }

  console.log(`Updated Jekyll content for folder: ${folderPath}`);
}
