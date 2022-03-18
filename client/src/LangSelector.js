import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState('en');

  const changeLanguage = (e) => {
    setSelectedLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div onChange={changeLanguage}>
      <label className="me-3"><input type="radio" value="en" name="language" checked={selectedLang === 'en'} /> English</label>
      <label><input type="radio" value="id" name="language" checked={selectedLang === 'id'} /> Bahasa Indonesia</label>
    </div>
  )
}

export default LangSelector;