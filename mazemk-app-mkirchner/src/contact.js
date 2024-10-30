// src/Contact.js
import React from 'react';

function Contact() {
  return (
    <div>
      <h2>Kontaktieren Sie uns</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Nachricht:
          <textarea name="message"></textarea>
        </label>
        <br />
        <button type="submit">Senden</button>
      </form>
    </div>
  );
}

export default Contact;
