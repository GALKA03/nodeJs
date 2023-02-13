const { Command } = require("commander");
const contacts  = require('./contacts2.cjs')
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.log(allContacts);
        break;
      case "get":
        const getContactById = await contacts.getContactById(id);
        if (!getContactById) {
          throw new Error(`Contact with id: ${id} not found`);
        }
        console.log(getContactById);
        break;
      case "add":
        const addContact = await contacts.addContact(name, email, phone);
        console.log(addContact);
        break;
      case "remove":
        const removeContact = await  contacts.removeContact(id);
        console.log(removeContact);
        if (!removeContact) {
          throw new Error(`Contact with id: ${id} not found`);
        }
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error);
  }
};
const start = async (argv) => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
};
start(argv);











// function invokeAction = async({ action, id, name, email, phone }) =>{
//   switch (action) {
//     case "list":
//       argv(
//        '-a, --action [type],"choose action"' ,
//       )    
//       program.parse(process.argv);
// contacts.listContacts();
//       break;

//     case "get":
//       argv('-i, --id [type], user id') 
//       contacts.getContactById(id)
//       // ... id
//       break;

//     case "add":
//       argv(
//         '-n, --name <type>, user name',
//         '-e, --email <type>, user email',
//         '-p, --phone <type>, user phone',
//       )
//       contacts.removeContact(name,email,phone)
//       // ... name email phone
//       break;

//     case "remove":
//       argv(
//         '-n, --name <type>, user name',
//         '-e, --email <type>, user email',
//         '-p, --phone <type>, user phone',
//       )
//       contacts.removeContact(name,email,phone)
//       // ... id
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

invokeAction(argv);






// function getContactById(contactId) {
//   // ...твой код
// }

// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }