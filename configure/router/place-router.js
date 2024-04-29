const express = require('express');
const router = express.Router();
const {
    getAllPlacements,
    createPlacement,
    getPlacementById,
    updatePlacement,
    deletePlacement,
} = require('../controllers/placementController');

router.get('/', getAllPlacements);
router.post('/', createPlacement);
router.get('/:id', getPlacementById);
router.put('/:id', updatePlacement);
router.delete('/:id', deletePlacement);

module.exports = router;
