console.log("Analysis Data Script");

const targetSheet = {
  fields: {
    [Symbol.iterator]: function* () {
      const staticFields = ["userId", "email", "type", "status", "points"];

      // $ sign here is just a distinct placeholder that
      // gets replaced later on with numbers via replace function.
      // this could have been any other character like @,% etc
      const postFields = [
        `post$infotype`,
        `post$text`,
        `post$display`,
        `post$happy`,
        `post$disgust`,
        `post$anger`,
        `post$share`,
        `post$readmore`,
      ];

      for (const field of staticFields) yield field;
      for (let i = 1; i < 51; i++) {
        yield* postFields.map((field) => field.replace("$", i));
      }
    },
  },
};

function adapterDbToSheet() {}

// get user from sheet
// for that user get all post metrics
// for each item in that list
// postNumber, informationType,name, value,
/*

metrics : {
  1 :{
    informationType : '',
    name : '',
    value : ''
  }                       
}

then flatten this to the single row of google sheet
targetSheet.fields.map((field)=>{
  row[field] = sql(field)
})

eg row['email'] = 

*/

(async function test() {
  console.log([...targetSheet.fields]);
})();
