const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// Get all bootcamps
// GET /api/v1/bootcamps
// Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// Get single bootcamp
// GET /api/v1/bootcamps/:id
// Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    // if id formatted but now in the db
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
    // if id is not formatted
  } catch (err) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
};

// Create a bootcamp
// POST /api/v1/bootcamps
// Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({
      success: false
    });
  }
};

// Update a bootcamp
// PUT /api/v1/bootcamps/:id
// Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

// Delete a bootcamp
// DELETE /api/v1/bootcamps/:id
// Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
