const Post = require("../models/post");
const Tag = require("../controllers/tags");
const Mention = require("../controllers/mention");
const utilities = require("../utils/utilities");

const extract = require("mention-hashtag");

let fetchedPosts;

exports.addPost = (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const all = extract(utilities.removeLinebreaks(req.body.content), {
    symbol: false,
    unique: true,
    type: "all",
  });
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath, // url + "/images/" + req.file.filename,
    createdBy: req.userData.userId,
    tags: all.hashtags,
    mentions: all.mentions,
    postVolumeInfo: req.body.postVolumeInfo,
    rating: req.body.rating,
  });
  post
    .save()
    .then((createdPost) => {
      //console.log(data);
      Tag.addTags(all.hashtags);
      Mention.addMentions(all.mentions);
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Post Creation Failed" });
    }); //console.log(post);
};

exports.getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((docs) => {
      fetchedPosts = docs;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Success!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Fetching Post Failed!" });
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  //console.log(postId);
  Post.deleteOne({ _id: postId, createdBy: req.userData.userId })
    .then((ret) => {
      //console.log(ret);
      if (ret.n > 0) {
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(401).json({
          message: "Unauthorised Access!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Post Delete Failed!" });
    });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  //const tags = req.body.content.match(/#[a-z0-9_]+/g);
  //console.log(tags);
  const all = extract(utilities.removeLinebreaks(req.body.content), {
    symbol: false,
    unique: true,
    type: "all",
  });
  // all == { mentions: ['mention'], hashtags: ['hashtag'] }
  //console.log(all);
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    createdBy: req.userData.userId,
    tags: all.hashtags,
    mentions: all.mentions,
    postVolumeInfo: req.body.postVolumeInfo,
    rating: req.body.rating,
  });
  Post.updateOne({ _id: req.params.id, createdBy: post.createdBy }, post)
    .then((result) => {
      if (result.n > 0) {
        //console.log(result);
        Tag.addTags(all.hashtags);
        Mention.addMentions(all.mentions);
        res.status(200).json({
          message: "Updated",
        });
      } else {
        console.log(result);
        res.status(401).json({
          message: "Unauthorised Access",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Post Update Failed!" });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not Found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Fetching Post Failed!" });
    });
};
