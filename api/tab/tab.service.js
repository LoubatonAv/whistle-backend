const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('tab');
    const tabs = await collection.find(criteria).toArray();
    console.log('aaaatabs:', tabs);

    return tabs;
  } catch (err) {
    logger.error('Can not find tabs', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  console.log('filterBy:', filterBy);

  const criteria = {};
  const { text, genre } = filterBy;
  if (text) {
    const txtCriteria = { $regex: text, $options: 'i' };
    criteria.name = txtCriteria;
  }
  if (genre) {
    criteria.genre = { $eq: genre };
  }

  return criteria;
}

async function remove(tabId) {
  try {
    const collection = await dbService.getCollection('tab');
    await collection.deleteOne({ _id: ObjectId(tabId) });
    return tabId;
  } catch (err) {
    logger.error(`Can not remove toy ${tabId}`, err);
    throw err;
  }
}

// async function getById(toyId) {
//   try {
//     const collection = await dbService.getCollection('toy');

//     const toy = await collection.findOne({ _id: ObjectId(toyId) });

//     if (!toy.reviews) {
//       toy.reviews = _createReviews();
//       await collection.updateOne({ _id: ObjectId(toyId) }, { $set: { ...toy } });
//     }

//     return toy;
//   } catch (err) {
//     logger.error(`Can not find toy ${toyId}`, err);
//     throw err;
//   }
// }

async function add(tab) {
  try {
    const updatedTab = {
      ...tab,
      // username: user,
    };
    console.log('updatedTodo:', updatedTab);

    updatedTab.createdAt = Date.now();
    const collection = await dbService.getCollection('tab');
    await collection.insertOne(updatedTab);

    return updatedTab;
  } catch (err) {
    logger.error('Can not add todo', err);
    throw err;
  }
}

// async function update(todo) {
//   try {
//     const newTodo = {
//       ...todo,
//       _id: ObjectId(todo._id),
//     };

//     const collection = await dbService.getCollection('todo');
//     await collection.updateOne({ _id: newTodo._id }, { $set: newTodo });
//     return todo;
//   } catch (err) {
//     logger.error(`Can not update toy ${todo._id}`, err);
//     throw err;
//   }
// }

module.exports = {
  remove,
  query,
  // getById,
  add,
  // update,
};
