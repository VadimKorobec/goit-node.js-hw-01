const fs = require("fs").promises;
const { v4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const resault = contacts.find((contact) => contact.id === contactId);
  if (!resault) {
    return null;
  }
  return resault;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const contact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
