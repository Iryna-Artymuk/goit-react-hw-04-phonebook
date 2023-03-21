import { useState, useEffect } from 'react';
import { Global } from '@emotion/react';
import { emotionReset } from './Global/Global.styled';
import { StyledSection } from './Section/StyledSection';
import ContactList from './ContactList/ContatLst';
import ContactsForm from './ContactForm/Form';
import Filter from './Filter/Filter';
const initialContacts = [
  {
    id: 'id-1',
    name: 'Rosie Simpson',
    phone_number: '459-12-56',
  },
  {
    id: 'id-2',
    name: 'Hermione Kline',
    phone_number: '443-89-12',
  },
  {
    id: 'id-3',
    name: 'Eden Clements',
    phone_number: '645-17-79',
  },
  {
    id: 'id-4',
    name: 'Annie Copeland',
    phone_number: '227-91-26',
  },
];

const setInitialContacts = () => {
  const contacts = localStorage.getItem('Contacts List');
  const parsedContacts = JSON.parse(contacts);

  if (parsedContacts !== null) {
    return parsedContacts;
  }
  return initialContacts;
};
export const App = () => {
  const [contacts, setContacts] = useState(() => setInitialContacts());
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    localStorage.setItem('Contacts List', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const existContact = contacts.find(
      contact => contact.name === newContact.name
    );

    if (!existContact) {
      setContacts(prevState => {
        return [newContact, ...prevState];
      });
    } else {
      return alert(`contactact ${existContact.name} already in your  list`);
    }
  };

  const deleteContact = id => {
    setContacts(PrevState => PrevState.filter(contact => contact.id !== id));
  };

  const handelFilterChange = event => {
    setFilterValue(event.currentTarget.value);
  };

  const normalizeFilterValue = filterValue.toLowerCase();
  const FilteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilterValue)
  );

  return (
    <StyledSection title="Phonebook">
      <ContactsForm addContact={addContact} />
      <Global styles={emotionReset} />
      {FilteredContacts.length > 0 && (
        <>
          <ContactList
            contactsData={FilteredContacts}
            deleteContact={deleteContact}
          ></ContactList>
          <Filter value={filterValue} handelFilterChange={handelFilterChange} />
        </>
      )}
    </StyledSection>
  );
};
