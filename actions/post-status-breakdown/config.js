const env = process.env.NODE_ENV;
console.log(`Environment : ${env}`);
const config = {
  test: {
    docs: {
      studyBookkeeping: {
        id: "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y",
        label: "Email Bookkeping",
        sheets: {
          productionServerData: {
            label: "TEST SHEET 2",
            index: 8,
          },
        },
      },
      paymentBookkeeping: {
        id: "1CJ9AnnpGw3WPnWX3_xnvrMTBTbEsxmMQ7QMeJYEaULw",
        label: "Payment Bookkeeping",
        sheets: {
          main: {
            label: "Test Sheet",
            index: 1,
          },
        },
      },
      dashboard: {
        id: "18IHzjvGxLG8D6ZOiW1gOjsJUfxPYSM0HJUVa02dZWCs",
        label: "Dashboard",
        sheets: {
          aggregateUserSheet: {
            label: "Test Sheet",
            index: 2,
          },
        },
      },
    },
    email: {
      sender: "ar@monkprayogshala.in",
      testTarget: "denny@tattle.co.in",
    },
    database: {
      name: "psych_study_platform_production",
    },
    study: {
      MAX_SESSION: 4,
    },
  },
  production: {
    docs: {
      studyBookkeeping: {
        id: "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y",
        label: "Email Bookkeping",
        sheets: {
          productionServerData: {
            label: "Production Server Data",
            index: 3,
          },
          testSheet: {
            label: "TEST SHEET 2",
            index: 8,
          },
        },
      },
      paymentBookkeeping: {
        id: "1CJ9AnnpGw3WPnWX3_xnvrMTBTbEsxmMQ7QMeJYEaULw",
        label: "Payment Bookkeeping",
        sheets: {
          main: {
            label: "Sheet1",
            index: 0,
          },
        },
      },
      dashboard: {
        id: "18IHzjvGxLG8D6ZOiW1gOjsJUfxPYSM0HJUVa02dZWCs",
        label: "Dashboard",
        sheets: {
          aggregateUserSheet: {
            label: "Aggregate User Status",
            index: 0,
          },
        },
      },
    },
    email: {
      sender: "ar@monkprayogshala.in",
      testTarget: "denny@tattle.co.in",
    },
    database: {
      name: "psych_study_platform_production",
    },
    study: {
      MAX_SESSION: 4,
    },
  },
};

module.exports = [undefined, "test", "development"].includes(env)
  ? config.test
  : config.production;
