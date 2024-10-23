const router = require("express").Router();
const Booking = require("../models/Booking");

// CREATE BOOKING
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Failed to create a new Booking!", error: err.message });
  }
});

// GET BOOKING BY ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("listingId")
      .exec();
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!!" });
    }
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error retrieving booking!!!", error: err.message });
  }
});

// UPDATE BOOKING
router.put("/update/:id", async (req, res) => {
  try {
    const { startDate, endDate, totalPrice } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { startDate, endDate, totalPrice },
      { new: true } 
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found!!" });
    }

    res.status(200).json(updatedBooking);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error updating booking!!!", error: err.message });
  }
});

// DELETE BOOKING
router.delete("/delete/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!!" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error deleting booking!!!", error: err.message });
  }
});

module.exports = router;
