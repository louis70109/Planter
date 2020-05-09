const { router, text } = require('bottender/router');
const plantList = require('../resources/plants - 項目1.json');

async function 養土(context) {
  await context.sendText(
    `【養土小知識】
1. 需要定期或是在收成後翻、鬆土，同時可以加入咖啡渣、培養土等等的東西增加土壤空隙，並將底下的土翻出來曬曬太陽殺菌，可讓之後的植物根部有空隙可以鑽。

2. 需要輪流種不同種類(輪耕)，避免吸收到同樣養分`
  );
}

async function 漿果(context) {
  await context.sendText(
    '定株後需要在旁插棍子用繩子固定，待長到五段之後需要定期將靠近根部三分之一位置的嫩葉剪掉，在枝與枝之間的新長出來的也必須剪掉，且第一個長出的果實也要早收，否則會影響生長。 可在附近種一些地瓜葉之類的利用位置(淺根與深根)'
  );
}
async function 結球葉菜(context) {
  await context.sendText(
    '多數建議使用網子，避免蝴蝶相關昆蟲下蛋啃食，須用一些農藥(天然、加工)讓果實可以有更好的環境成長。'
  );
}

async function 香辛葉菜(context) {
  await context.sendText(
    '像我會在一些容易有蚊蟲的地方種下這類的植物養環境，藉由刺激的味道阻擋蟲害'
  );
}
async function 植物技巧(context, { match }) {
  const tag = match.groups.tag;
  const plant = plantList.filter(
    (el) => el['植物'] === tag || el['別名'] === tag
  )[0];
  const response = `【${plant['植物']}】${
    plant['別名'] ? '(' + plant['別名'] + ')' : ''
  } ☘️

建議種植方式 👉 ${plant['種植方式']}
施肥週期 ♻️ ${plant['施肥週期']}
${plant['特性'] ? '特性 🤔 ' + plant['特性'] : ''}

注意事項 ‼️ ${plant['注意事項']}

小技巧 👀 ${plant['小技巧']}
`;
  await context.sendText(response);
}

async function 項目(context) {
  let response = `1. ${plantList[0]['植物']}(${
    plantList[0]['別名'] ? '(' + plantList[0]['別名'] + ')' : ''
  })`;
  for (let i = 1; i < plantList.length; i++) {
    response += `\n${i + 1}. ${plantList[i]['植物']} ${
      plantList[i]['別名'] ? '(' + plantList[i]['別名'] + ')' : ''
    }`;
  }
  await context.sendText(response);
}

async function HelpMe(context) {
  await context.sendText(`輸入
1.「項目」即可知道現在有多少個植物☘️項目
2.「查詢 想找的植物」 ➡️查詢 韭菜 ➡️會告訴你相關知識喔！
3.「土壤」可知道養土的一些秘辛
4.「漿果類」「結球類」「香辛葉菜」以一些比較常見的植物特性下去說明
5. 若有任何錯誤或是想補充的歡迎來信 louis70109@gmail.com 討論🙂
`);
}

module.exports = async function App() {
  return router([
    text(['soli', '養土', '土壤'], 養土),
    text(['漿果類'], 漿果),
    text(['結球類'], 結球葉菜),
    text(['香辛葉菜'], 香辛葉菜),
    text(['class', '類別', '項目', '有哪些'], 項目),
    text(
      /^(尋找|查詢|收尋|搜尋|幫我找|想找|幫找|幫忙找|找)\s*(?<tag>[\s\S]+)/,
      植物技巧
    ),
    text('*', HelpMe),
  ]);
};
