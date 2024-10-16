'use strict';

//Greek to English Map
const greekToGreeklishMap = [
    { find: 'ΓΧ', replace: 'GX' },
    { find: 'γχ', replace: 'gx' },
    { find: 'ΤΘ', replace: 'T8' },
    { find: 'τθ', replace: 't8' },
    { find: '(θη|Θη)', replace: '8h' },
    { find: 'ΘΗ', replace: '8H' },
    { find: 'αυ', replace: 'au' },
    { find: 'Αυ', replace: 'Au' },
    { find: 'ΑΥ', replace: 'AY' },
    { find: 'ευ', replace: 'eu' },
    { find: 'εύ', replace: 'eu' },
    { find: 'εϋ', replace: 'ey' },
    { find: 'εΰ', replace: 'ey' },
    { find: 'Ευ', replace: 'Eu' },
    { find: 'Εύ', replace: 'Eu' },
    { find: 'Εϋ', replace: 'Ey' },
    { find: 'Εΰ', replace: 'Ey' },
    { find: 'ΕΥ', replace: 'EY' },
    { find: 'ου', replace: 'ou' },
    { find: 'ού', replace: 'ou' },
    { find: 'οϋ', replace: 'oy' },
    { find: 'οΰ', replace: 'oy' },
    { find: 'Ου', replace: 'Ou' },
    { find: 'Ού', replace: 'Ou' },
    { find: 'Οϋ', replace: 'Oy' },
    { find: 'Οΰ', replace: 'Oy' },
    { find: 'ΟΥ', replace: 'OY' },
    { find: 'Α', replace: 'A' },
    { find: 'α', replace: 'a' },
    { find: 'ά', replace: 'a' },
    { find: 'Ά', replace: 'A' },
    { find: 'Β', replace: 'B' },
    { find: 'β', replace: 'b' },
    { find: 'Γ', replace: 'G' },
    { find: 'γ', replace: 'g' },
    { find: 'Δ', replace: 'D' },
    { find: 'δ', replace: 'd' },
    { find: 'Ε', replace: 'E' },
    { find: 'ε', replace: 'e' },
    { find: 'έ', replace: 'e' },
    { find: 'Έ', replace: 'E' },
    { find: 'Ζ', replace: 'Z' },
    { find: 'ζ', replace: 'z' },
    { find: 'Η', replace: 'H' },
    { find: 'η', replace: 'i' },
    { find: 'ή', replace: 'i' },
    { find: 'Ή', replace: 'I' },
    { find: 'Θ', replace: 'TH' },
    { find: 'θ', replace: 'th' },
    { find: 'Ι', replace: 'I' },
    { find: 'Ϊ', replace: 'I' },
    { find: 'ι', replace: 'i' },
    { find: 'ί', replace: 'i' },
    { find: 'ΐ', replace: 'i' },
    { find: 'ϊ', replace: 'i' },
    { find: 'Ί', replace: 'I' },
    { find: 'Κ', replace: 'K' },
    { find: 'κ', replace: 'k' },
    { find: 'Λ', replace: 'L' },
    { find: 'λ', replace: 'l' },
    { find: 'Μ', replace: 'M' },
    { find: 'μ', replace: 'm' },
    { find: 'Ν', replace: 'N' },
    { find: 'ν', replace: 'n' },
    { find: 'Ξ', replace: 'KS' },
    { find: 'ξ', replace: 'ks' },
    { find: 'Ο', replace: 'O' },
    { find: 'ο', replace: 'o' },
    { find: 'Ό', replace: 'O' },
    { find: 'ό', replace: 'o' },
    { find: 'Π', replace: 'P' },
    { find: 'π', replace: 'p' },
    { find: 'Ρ', replace: 'R' },
    { find: 'ρ', replace: 'r' },
    { find: 'Σ', replace: 'S' },
    { find: 'σ', replace: 's' },
    { find: 'Τ', replace: 'T' },
    { find: 'τ', replace: 't' },
    { find: 'Υ', replace: 'Y' },
    { find: 'Ύ', replace: 'Y' },
    { find: 'Ϋ', replace: 'Y' },
    { find: 'ΰ', replace: 'y' },
    { find: 'ύ', replace: 'y' },
    { find: 'ϋ', replace: 'y' },
    { find: 'υ', replace: 'y' },
    { find: 'Φ', replace: 'F' },
    { find: 'φ', replace: 'f' },
    { find: 'Χ', replace: 'X' },
    { find: 'χ', replace: 'x' },
    { find: 'Ψ', replace: 'Ps' },
    { find: 'ψ', replace: 'ps' },
    { find: 'Ω', replace: 'O' },
    { find: 'ω', replace: 'o' },
    { find: 'Ώ', replace: 'O' },
    { find: 'ώ', replace: 'O' },
    { find: 'ς', replace: 's' },
    { find: ';', replace: '?' }
];


//The replaceText function was created in order to transfrom the greek text in to english
const replaceText = (text, characterMap, exactMatch, ignore, regExOptions = 'g') => {
    let regexString,
        regex;

    exactMatch = exactMatch || false;

    if (typeof text === 'string' && text.length > 0) {
        characterMap.forEach(function (characters) {
            regexString = exactMatch ? characters.find : '[' + characters.find + ']';
            if (ignore) { regexString = '(?![' + ignore + '])' + regexString; }
            regex = new RegExp(regexString, regExOptions);
            text = text.replace(regex, characters.replace);
        });
    }

    return text;
}

export default (text, ignore) => {
    return replaceText(text, greekToGreeklishMap, true, ignore);
}


