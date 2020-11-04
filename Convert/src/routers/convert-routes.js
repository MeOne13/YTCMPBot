const express = require('express');
const convertController = require('../controllers/convert-controller');

const router = express.Router();

router.route('/').get(convertController);
//   .post(tourController.checkBody, tourController.createTour);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
