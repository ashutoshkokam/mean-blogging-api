const express = require('express');
const router = express.Router();
const MentionController = require('../controllers/mention');

router.get('',MentionController.findAllMentionsByText);
module.exports = router;