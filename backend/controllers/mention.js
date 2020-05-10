const Mention = require("../models/mention");
let mentionMaster = [];
exports.addMentions = (mentions) => {
  this.findAllMentionsText().then((result) => {
    //console.log(result);
    //console.log(tags);
    mentions
      .filter(function (o1) {
        // filter out (!) items in result2
        return !result.some(function (o2) {
          return  String( o1).toLowerCase() === String( o2.text).toLowerCase(); // assumes unique id
        });
      })
      .forEach((el) => {
        mentionMaster.push(new Mention({ text: el }));
      });
    //console.log(tagMaster);
    Mention.insertMany(mentionMaster, { ordered: false }).then((result) => {
      //console.log(result);
      mentionMaster = [];
    });
  });
};
exports.findAllMentionsText = () => {
  return Mention.find({}).select({ text: 1, _id: 0 });
};
