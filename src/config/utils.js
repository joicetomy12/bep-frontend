import moment from 'moment';

export function langToURI(lang) {
  return lang.replace('_', '-').toLowerCase();
}
export function langToURIUpper(lang) {
  if (lang == 'no') {
    const langCode = lang.replace('_', '-').toLowerCase();
    return langCode;
  } else if (lang == 'fr-ca') {
    const langCode = 'fr-FR';
    return langCode;
  } else if (lang == 'en-ca') {
    const langCode = 'en-US';
    return langCode;
  } else {
    const langInitial = lang.replace('_', '-');
    const langSplit = langInitial.split('-');
    const prefixLang = langSplit[0];
    const suffixLang = langSplit[1].toUpperCase();
    const langCode = `${prefixLang}-${suffixLang}`;
    return langCode;
  }
}

export function replaceMultiple(text) {
  const result = text.replace(/_/g, ' ');
  return result;
}

export function langToProduct(lang) {
  if (lang == 'no') {
    const langCode = lang.replace('_', '-').toLowerCase();
    return langCode;
  } else if (lang == 'fr-ca') {
    const langCode = 'fr-ca';
    return langCode;
  } else if (lang == 'en-ca') {
    const langCode = 'en-ca';
    return langCode;
  } else {
    const langInitial = lang.replace('_', '-');
    const langSplit = langInitial.split('-');
    const prefixLang = langSplit[0];
    const suffixLang = langSplit[1].toUpperCase();
    const langCode = `${prefixLang}-${suffixLang}`;
    return langCode;
  }
}

export function langToEmrays(lang) {
  let langCode = '';
  if (lang == 'no') {
    langCode = lang.replace('_', '-').toLowerCase();
  } else if (lang == 'fr-ca') {
    langCode = 'fr-FR';
  } else if (lang == 'en-ca') {
    langCode = 'en-US';
  } else {
    const langInitial = lang.replace('_', '-');
    const langSplit = langInitial.split('-');
    const prefixLang = langSplit[0];
    const suffixLang = langSplit[1].toUpperCase();
    langCode = `${prefixLang}-${suffixLang}`;
  }
  return langCode;
}

export function uriToLang(lang) {
  return lang.replace('-', '_').toLowerCase();
}
export function langToMarket(lang, langExt, countryCode) {
  let market = '';
  if (lang == 'en-US' && langExt == 'en-ca') {
    market = 'CAN';
    return market;
  } else if (lang == 'fr-FR' && langExt == 'fr-ca' && countryCode == 'ca') {
    market = 'CAN';
  } else if (lang == 'fr-FR') {
    market = 'FR';
  } else if (lang == 'no') {
    market = 'NO';
  } else if (lang == 'en-US' && langExt == 'en-us') {
    market = 'USA';
  } else if (lang == 'en-GB' && langExt == 'en-gb' && countryCode == 'eu') {
    market = 'EU';
  } else if (lang == 'en-GB' && langExt == 'en-gb') {
    market = 'GB';
  } else {
    const langSplit = lang.split('-');
    market = langSplit[1].toUpperCase();
  }
  return market;
}

export function getMonths(nextNumberOfMonths) {
  const month = currentDate => {
    let futureMonthDate = moment(currentDate).add(1, 'M');
    return {
      month: futureMonthDate.month() + 1,
      year: futureMonthDate.year(),
      monthDisplayName: futureMonthDate.format('MMMM'),
      date: futureMonthDate.toDate()
    };
  };
  let output = [];
  let curMonth = new Date();
  //Adding current month Request from Liv
  let currDate = moment(curMonth, 'DD-MM-YYYY');
  output.push({
    month: currDate.month() + 1,
    year: currDate.year(),
    monthDisplayName: currDate.format('MMMM'),
    date: currDate.toDate()
  });
  for (let i = 0; i < nextNumberOfMonths; i++) {
    let monthDetails = month(curMonth);
    curMonth = monthDetails.date;
    output.push(monthDetails);
  }
  return output;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getLangUrl(url) {
  let el = document.createElement('a');
  el.href = url;
  return el.pathname;
}

export function getVenueDetails(venueArray) {
  let venueAddressDetails = '';
  if (venueArray) {
    venueArray.length > 0 &&
      venueArray.map(value => {
        venueAddressDetails = value.name
          ? value.name
          : '' + ' ' + value.address.address1
          ? ', ' + value.address.address1
          : '' + value.address.street
          ? ', ' + value.address.street
          : '' + value.address.city
          ? ', ' + value.address.city
          : '' + value.address.postalCode
          ? ', ' + value.address.postalCode
          : '';
      });
  }
  return venueAddressDetails;
}

export function getcustomFieldsIdandValue(customFieldArray, searchCategory) {
  let customFieldValueandId = {};
  if (customFieldArray) {
    const filterCustomFieldArray = customFieldArray.filter(function (e) {
      return e.name == searchCategory;
    });
    if (filterCustomFieldArray.length > 0) {
      customFieldValueandId.uuid = filterCustomFieldArray[0].id
        ? filterCustomFieldArray[0].id
        : 0;
      if (searchCategory === 'BEP - Event Category') {
        customFieldValueandId.value =
          filterCustomFieldArray[0].value[0].toLowerCase();
      } else if (searchCategory === 'BEP - Event Image URL') {
        customFieldValueandId.value = filterCustomFieldArray[0].value[0];
      } else if (searchCategory === 'BEP - Event Description') {
        customFieldValueandId.value = filterCustomFieldArray[0].value[0];
      } else if (searchCategory === 'BEP - Apply featured star') {
        customFieldValueandId.value =
          filterCustomFieldArray[0].value[0] === 'Yes' ||
          filterCustomFieldArray[0].value[0] === 'Yes'
            ? true
            : false;
      } else if (searchCategory === 'Event Flowbox Key') {
        customFieldValueandId.value = filterCustomFieldArray[0].value[0];
      }
    }
  }
  return customFieldValueandId;
}

export function getCookieValue(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
