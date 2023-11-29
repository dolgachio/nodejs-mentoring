import { uuidRegExpString } from "../../../../constants/uuidRegExpString";

export function getUserIdFromURL(url: string): string | null {
    const urlLowerCased = url.toLowerCase();
    const uuidRegExp = new RegExp(uuidRegExpString);
    const result = urlLowerCased.match(uuidRegExp);

    if (!result) {
        return null
    }
    
    return result[0] || null;
}