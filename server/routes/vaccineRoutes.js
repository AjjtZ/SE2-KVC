const express = require("express");
const router = express.Router();
const vaccineController = require("../controllers/vaccineController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.post(
    "/pets/:pet_id/vaccines", // pet_id is now in the URL
    authenticate,
    authorize({ roles: ["doctor", "clinician"] }), // Only doctors & clinicians can add
    vaccineController.addPetVaccinationRecord
);

module.exports = router;
