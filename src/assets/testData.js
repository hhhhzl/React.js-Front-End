const testDisplayData = {
  mc: {
    qid: 10001,
    title: "本年度，你单位利用中科院教育云平台开展教育管理情况",
    detail: "备注：2021年1月1日至2021年12月31日",
    options: [
      "按时完成招生的过程管理，包括：专业目录编制、初试、复试、调剂、录取、推免管理",
      "按时完成学生的学籍管理，包括：信息维护、学籍变更、月报、学年注册、毕业注册",
      "按时完成学生的培养管理（不存在大批量后期补录），包括：开题、中期、答辩等",
      "按时完成学位初审工作",
      "利用教师系统的个人主页功能发布个人主页的在岗导师达到50%以上",
    ],
    canMultiSelect: true,
    optionsHaveBlank: [true, false, true, false, true]
  },
  fib: {
    qid: 10002,
    title: "本年度，你单位使用科技网以外互联网接入带宽现状",
    detail:
      "备注：2021年1月1日至2021年12月31日\nA、中国联通，带宽|_____|Mbps。\nB、中国电信，带宽|_____|Mbps。\nC、中国移动，带宽|_____|Mbps。\nD、中国教育网，带宽|_____|Mbps。\nE、其他，带宽|_____|Mbps。",
    options: [
      {
        type: "number",
        min: 0,
        width: 10,
      },
      {
        type: "number",
        min: 0,
        width: 4,
      },
      {
        type: "number",
        min: 0,
        width: 3,
      },
      {
        type: "number",
        min: 0,
        width: 2,
      },
      {
        type: "number",
        min: 0,
        width: 1,
      },
    ],
  },
  sa: {
    qid: 10003,
    title: "本年度，你单位利用中科院教育云平台开展教育管理情况",
    detail: "备注：2021年1月1日至2021年12月31日",
  },
  matrix: {
    qid: 10004,
    title: "人员分数",
    detail: "备注：2021年1月1日至2021年12月31日",
    rowLabels: ["学生A", "学生B", "学生C", "学生D", "学生E", "学生F", "学生G"],
    columnLabels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
    canMultiSelect: false,
  },
  table: {
    qid: 10005,
    title: "表格",
    detail: "备注：2021年1月1日至2021年12月31日",
    rowLabels: ["行A", "行B", "行C", "行D", "行E", "行F", "行G"],
    columnLabels: ["列A", "列B", "列C", "列D", "列E", "列F", "列G"],
    canMultiSelect: false,
  },
  attach: {
    qid: 10006,
    title: "专利项目",
    detail: "备注：2021年1月1日至2021年12月31日",
  },
};

const testEditData = {
  mc: {
    qid: 10001,
    title: "本年度，你单位利用中科院教育云平台开展教育管理情况",
    detail: "备注：2021年1月1日至2021年12月31日",
    minScore: 0,
    maxScore: 5,
    options: [
      "按时完成招生的过程管理，包括：专业目录编制、初试、复试、调剂、录取、推免管理",
      "按时完成学生的学籍管理，包括：信息维护、学籍变更、月报、学年注册、毕业注册",
      "按时完成学生的培养管理（不存在大批量后期补录），包括：开题、中期、答辩等",
      "按时完成学位初审工作",
      "利用教师系统的个人主页功能发布个人主页的在岗导师达到50%以上",
    ],
    scores: [
      1, 2, 3, 1, 2,
    ],
    optionsHaveBlank: [
      false, false, true, true, false,
    ],
    canMultiSelect: true,
  },
  fib: {
    qid: 10002,
    title: "本年度，你单位使用科技网以外互联网接入带宽现状",
    detail:
      "备注：2021年1月1日至2021年12月31日\nA、中国联通，带宽|_____|Mbps。\nB、中国电信，带宽|_____|Mbps。\nC、中国移动，带宽|_____|Mbps。\nD、中国教育网，带宽|_____|Mbps。\nE、其他，带宽|_____|Mbps。",
    options: [
      {
        type: "number",
        min: 0,
        width: 10,
      },
      {
        type: "number",
        min: 0,
        width: 4,
      },
      {
        type: "number",
        min: 0,
        width: 3,
      },
      {
        type: "number",
        min: 0,
        width: 2,
      },
      {
        type: "number",
        min: 0,
        width: 1,
      },
    ],
  },
  sa: {
    qid: 10003,
    title: "本年度，你单位利用中科院教育云平台开展教育管理情况",
    detail: "备注：2021年1月1日至2021年12月31日",
  },
  matrix: {
    qid: 10004,
    title: "人员分数",
    detail: "备注：2021年1月1日至2021年12月31日",
    rowLabels: ["学生A", "学生B", "学生C", "学生D", "学生E", "学生F", "学生G"],
    columnLabels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
    canMultiSelect: false,
  },
  table: {
    qid: 10005,
    title: "表格",
    detail: "备注：2021年1月1日至2021年12月31日",
    rowLabels: ["行A", "行B", "行C", "行D", "行E", "行F", "行G"],
    columnLabels: ["列A", "列B", "列C", "列D", "列E", "列F", "列G"],
    canMultiSelect: false,
  },
  attach: {
    qid: 10006,
    title: "专利项目",
    detail: "备注：2021年1月1日至2021年12月31日",
  },
};

export { testDisplayData, testEditData };
