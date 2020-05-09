const { router, text, route } = require('bottender/router');
const random = require('random-item');
const plantList = require('../resources/plants.json');

async function 養土(context) {
  await context.sendText(
    '需要定期翻土鬆土，將底下的土翻出來殺菌，需要輪流種不同種類，避免吸收到同樣養分'
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
  const response = `
【${plant['植物']}】${plant['別名'] ? '(' + plant['別名'] + ')' : ''} 

👉 ${plant['種植方式']}
🗓 ${plant['施肥週期']}
${plant['特性'] ? '🤔 ' + plant['特性'] : ''}

‼️ ${plant['注意事項']}
👀 ${plant['小技巧']}
`;
  await context.sendText(response);
}

async function 項目(context) {
  let response = `1. ${plantList[0]['植物']}(${plantList[0]['別名']})`;
  for (let i = 1; i < plantList.length; i++) {
    response += `\n${i + 1}. ${plantList[i]['植物']} ${
      plantList[i]['別名'] ? '(' + plantList[i]['別名'] + ')' : ''
    }`;
  }
  await context.sendText(response);
}

async function HelpMe(context) {
  await context.sendText(`😇範例:`);
}

async function Unknown(context) {
  await context.sendText(
    random([
      ' 抱歉～我不懂你在說什麼 QQ',
      '@&*#^!@# (壞掉狀)',
      ' 好了好了，去打 Game 啦',
      ' 功能開發中，保佑作者可以早下班',
      ' 作者登出了 💤',
      ' 繼續猜啊！',
      ' 防疫期間妳各位還是繼續揪團好了😏',
      ' 多喝水蛤，別說一些我看不懂的東西！！！',
      ' 乖乖待在家裡別出門亂晃🤝',
    ])
  );
}

module.exports = async function App() {
  return router([
    text(['a', '養土'], 養土),
    text(['b', '漿果類'], 漿果),
    text(['c', '結球類'], 結球葉菜),
    text(['d', '香辛葉菜'], 香辛葉菜),
    text(['e', '項目'], 項目),
    text(
      /^(尋找 | 查詢 | 收尋 | 搜尋 | 幫我找 | 想找 | 幫找 | 幫忙找)\s*(?<tag>[\s\S]+)/,
      植物技巧
    ),
    text(['help', 'Help', ' 怎麼用', '/help'], HelpMe),
    route('*', Unknown),
  ]);
};
