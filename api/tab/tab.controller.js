const tabService = require('./tab.service.js');
const logger = require('../../services/logger.service');

// List

async function getTabs(req, res) {
  try {
    // const userId = req.session.user._id;
    // console.log('req.session.user:', req.session.user);
    const filterBy = req.query;
    // const fitlerUpdated = { ...filterBy, id: userId };
    const tabs = await tabService.query(filterBy);
    res.json(tabs);
  } catch (err) {
    logger.error('Failed to get tabs', err);
    res.status(500).send({ err: 'Failer ti get tabs' });
  }
}

async function addTab(req, res) {
  try {
    const tab = req.body;

    const addedTab = await tabService.add(tab);
    res.json(addedTab);
  } catch (err) {
    logger.error('Failed to add tab', err);
    res.status(500).send({ err: 'Failed to add tab' });
  }
}

// Delete

async function removeTab(req, res) {
  try {
    const tabId = req.params.id;
    const removedId = tabService.remove(tabId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to delete tab', err);
    res.status(500).send({ err: 'Failed to delete tab' });
  }
}

module.exports = {
  getTabs,
  addTab,
  removeTab,
};

// Read

// async function getTodoById(req, res) {
//   try {
//     const tabId = req.params.id;
//     const tab = await tabService.getById(tabId);
//     res.json(tab);
//   } catch (err) {
//     logger.error('Failer to get tab', err);
//     res.status(500).send({ err: 'Failed to get tab' });
//   }
// }

// Create

// Update

// async function updateTodo(req, res) {
//   try {
//     const tab = req.body;
//     console.log('tab:', tab);

//     // console.log('tab:', tab);

//     const savedTodo = await tabService.update(tab);

//     res.json(savedTodo);
//   } catch (err) {
//     logger.error('Failed to update tab', err);
//     res.status(500).send({ err: 'Failed to update tab' });
//   }
// }
