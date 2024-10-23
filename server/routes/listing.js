const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const Listing = require("../models/Listing");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOADS_DIR || "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(8).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(409)
      .json({ message: "Failed to create Property!!", error: err.message });
    console.log(err);
  }
});

// GET LISTINGS BY CATEGORY
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    const listings = qCategory
      ? await Listing.find({ category: qCategory }).populate("creator")
      : await Listing.find().populate("creator");

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetching property!!", error: err.message });
    console.error(err);
  }
});

// GET LISTINGS BY SEARCH
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    const listings =
      search === "all"
        ? await Listing.find().populate("creator")
        : await Listing.find({
            $or: [
              { category: { $regex: search, $options: "i" } },
              { title: { $regex: search, $options: "i" } },
            ],
          }).populate("creator");

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetching property!!", error: err.message });
    console.error(err);
  }
});

// GET LISTING BY ID
router.get("/:listingId", async (req, res) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId).populate("creator");
    if (!listing) {
      return res.status(404).json({ message: "Properties not found!!" });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetching property details!!",
      error: err.message,
    });
  }
});

// UPDATE LISTING
router.put("/:listingId", upload.array("listingPhotos"), async (req, res) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Properties not found!" });
    }
    Object.assign(listing, req.body);

    await listing.save();

    res.status(200).json({ message: "Listing updated successfully", listing });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update property details!!",
      error: err.message,
    });
  }
});

// DELETE LISTING BY ID
router.delete("/:listingId", async (req, res) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Properties not found!!" });
    }

    // Remove all photos associated with the listing
    listing.listingPhotoPaths.forEach((photo) => {
      const filePath = path.join(
        process.env.UPLOADS_DIR || "public/uploads/",
        path.basename(photo)
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete photo ${photo}:`, err);
        }
      });
    });

    // Delete the listing from the database
    await Listing.findByIdAndDelete(listingId);

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete Property details!!",
      error: err.message,
    });
  }
});

module.exports = router;
