const Contact = require("../models/contactModel");

const contactController = {
  getAllContacts: async (req, res, next) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createContact: async (req, res, next) => {
    try {
      const newContact = await Contact.create(req.body);
      res.status(201).json(newContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getContactById: async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const contact = await Contact.findById(id);
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateContact: async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const contact = await Contact.findById(id);
      if (contact) {
        contact.set(req.body); // Update document properties
        const updatedContact = await contact.save(); // Save the changes
        res.status(200).json(updatedContact);
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteContact: async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const contact = await Contact.findById(id);

      if (contact) {
        await contact.deleteOne(); // Use deleteOne to remove the document
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = contactController;
