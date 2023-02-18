
// import { nanoid } from 'nanoid'
//import { uid } from 'uid';
const {uid} = require("uid")
const path = require("path");
const fs = require("fs/promises");
// const {nanoid} = require("nanoid")

const contactsPath = path.resolve("./db/contacts.json");
async function listContacts() {
  const data = await fs.readFile(path.resolve(__dirname, contactsPath), "utf8");
  try {
    console.table(JSON.parse(data));
  } catch {
    (err) => console.log(err.message);
  }
}
async function getContactById(contactId) {
  const data = await fs.readFile(path.resolve(__dirname, contactsPath), "utf8");
  try {
    const contacts = JSON.parse(data);
    const finedContact = contacts.find(contact => contact.id === contactId);
    console.table(finedContact);
  } catch {
    (err) => console.log(err.message);
  }
}

async function removeContact(contactId) {
  const data = await fs.readFile(path.resolve(__dirname, contactsPath), "utf8");
  try {
    const contacts = JSON.parse(data);
    const removeContact = contacts.filter(contact => contact.id !== contactId);
if (removeContact.length === contacts.length) {
            console.log(
                `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`,
            );
            return;
        }
    const newContact = await fs.writeFile(path.resolve(__dirname, contactsPath), JSON.stringify(removeContact), {
      encoding: "utf8",
    })
    console.table(removeContact);
    console.log(newContact)
  } catch {
    (err) => console.log(err.message);
  }
}


async function addContact(name, email, phone) {
  const data = await fs.readFile(path.resolve(__dirname, contactsPath), "utf8");
  try {
    const contacts = JSON.parse(data);
    
    contacts.push({
            id: uid(),
            name: name,
            email: email,
            phone: phone,
   });

    console.log(`Successfully! New lists of contacts: ${contacts}`);
        console.table(contacts);
    await fs.writeFile(path.resolve(contactsPath), JSON.stringify(contacts), {
      encoding: "utf8",
    });
  } catch {
    (err) => console.log(err.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
