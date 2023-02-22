const FILE_DIR = __dirname;
const fs = require("fs");
const path = require("path");

const TOP_JSON = path.join(FILE_DIR, "top.json");
const TABLE_JSON = path.join(FILE_DIR, "race-card.json");
const ODDS1_JSON = path.join(FILE_DIR, "odds1.json");
const ODDS2_JSON = path.join(FILE_DIR, "odds2.json");
const RESULT_JSON = path.join(FILE_DIR, "result.json");

console.log("## Lighthouse Score Result\n");

console.log("| Page | FCP | SI | LCP | TTI | TBT | CLS | Score |");
console.log("| --- | --- | --- | --- | --- | --- | --- | --- |");

const fcps = [];
const sis = [];
const lcps = [];
const ttis = [];
const tbts = [];
const clss = [];
const scores = [];

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const calcScore = (pagename, data) => {
  const FCP = data["audits"]["first-contentful-paint"]["score"];
  const SI = data["audits"]["speed-index"]["score"];
  const LCP = data["audits"]["largest-contentful-paint"]["score"];
  const TTI = data["audits"]["interactive"]["score"];
  const TBT = data["audits"]["total-blocking-time"]["score"];
  const CLS = data["audits"]["cumulative-layout-shift"]["score"];
  const score = FCP * 10 + SI * 10 + LCP * 25 + TTI * 10 + TBT * 30 + CLS * 15;

  fcps.push(FCP);
  sis.push(SI);
  lcps.push(LCP);
  ttis.push(TTI);
  tbts.push(TBT);
  clss.push(CLS);
  scores.push(score);

  console.log(`| ${pagename} | ${FCP.toFixed(3)} | ${SI.toFixed(3)} | ${LCP.toFixed(3)} | ${TTI.toFixed(3)} | ${TBT.toFixed(3)} | ${CLS.toFixed(3)} | ${score.toFixed(3)} |`);
};

calcScore("home", JSON.parse(fs.readFileSync(TOP_JSON)));
calcScore("race-card", JSON.parse(fs.readFileSync(TABLE_JSON)));
calcScore("odds1", JSON.parse(fs.readFileSync(ODDS1_JSON)));
calcScore("odds2", JSON.parse(fs.readFileSync(ODDS2_JSON)));
calcScore("race-result", JSON.parse(fs.readFileSync(RESULT_JSON)));

console.log("### Summary\n");

console.log("| Page | FCP | SI | LCP | TTI | TBT | CLS | Score |");
console.log("| --- | --- | --- | --- | --- | --- | --- | --- |");

console.log(`| **Total** | ${sum(fcps).toFixed(3)} | ${sum(sis).toFixed(3)} | ${sum(lcps).toFixed(3)} | ${sum(ttis).toFixed(3)} | ${sum(tbts).toFixed(3)} | ${sum(clss).toFixed(3)} | ${sum(scores).toFixed(3)} |`);
console.log(`| **Average** | ${(sum(fcps) / 5).toFixed(3)} | ${(sum(sis) / 5).toFixed(3)} | ${(sum(lcps) / 5).toFixed(3)} | ${(sum(ttis) / 5).toFixed(3)} | ${(sum(tbts) / 5).toFixed(3)} | ${(sum(clss) / 5).toFixed(3)} | ${(sum(scores) / 5).toFixed(3)} |`);

console.log("\n## Notes\n");
console.log("- FCP: First Contentful Paint");
console.log("- SI: Speed Index");
console.log("- LCP: Largest Contentful Paint");
console.log("- TTI: Time to Interactive");
console.log("- TBT: Total Blocking Time");
console.log("- CLS: Cumulative Layout Shift");

console.log("\nReference: https://web.dev/performance-scoring/#lighthouse-8")