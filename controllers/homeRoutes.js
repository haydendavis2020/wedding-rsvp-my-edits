const express = require('express');
const router = express.Router();
const helmet = require('helmet');

router.use(helmet());

router.get('/', async (req, res) => {
  try {
    // Get all users, sorted by name
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // Serialize user data so templates can read it
    const users = userData.map((project) => project.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { users });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/submit', async (req, res) => {
  try {
    const formData = req.body;
    const newForm = await Form.create({
      ...formData,
    });

    res.send('Form submitted successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;