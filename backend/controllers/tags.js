const Tag = require("../models/tags");
let tagMaster = [];
exports.addTags = (tags) => {
  this.findAllTagsText().then((result) => {
    //console.log(result);
    //console.log(tags);
    tags
      .filter(function (o1) {
        // filter out (!) items in result2
        return !result.some(function (o2) {
          return  String( o1).toLowerCase() === String( o2.text).toLowerCase(); // assumes unique id
        });
      })
      .forEach((el) => {
        tagMaster.push(new Tag({ text: el }));
      });
    //console.log(tagMaster);
    Tag.insertMany(tagMaster, { ordered: false }).then((result) => {
      //console.log(result);
      tagMaster = [];
    });
  });
};
exports.findAllTagsText = () => {
  return Tag.find({}).select({ text: 1, _id: 0 });
};
