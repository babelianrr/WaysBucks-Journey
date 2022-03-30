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
    <div>
      <label htmlFor='language'>
        <select className="form-select form-select-sm" name="language" id="language" onChange={changeLanguage}>
          <option value="en" checked={selectedLang}>English</option>
          <option value="id" checked={selectedLang}>Bahasa Indonesia</option>
        </select>
      </label>
    </div>
  )
}

export default LangSelector;
