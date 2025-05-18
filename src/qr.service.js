import { pool } from "./db.js";

export const getQr = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fn_readqr()");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No QR codes found" });
    }

    return res.status(200).json({
      data: result.rows.map((row) => ({
        id: row.id,
        data: row.data,
      })),
      type: "qr",
    });
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const getQrById = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await pool.query("SELECT * FROM fn_readqrid($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "QR code not found" });
    }

    return res.status(200).json({
      id: result.rows[0].id,
      data: result.rows[0].data,
      type: "qr",
    });
  } catch (error) {
    console.error("Error fetching QR code:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const createQr = async (req, res) => {
  const { data } = req.body;

  try {
    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }

    const result = await pool.query("SELECT * FROM fn_addqr($1)", [data]);

    return res.status(201).json({
      id: result.rows[0].fn_addqr,
    });
  } catch (error) {
    console.error("Error creating QR code:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const deleteQr = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await pool.query("SELECT * FROM fn_deleteqr($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "QR code not found" });
    }

    return res.status(200).json({
      message: "QR code deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting QR code:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
