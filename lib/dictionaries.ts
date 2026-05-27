import pt from '@/dictionaries/pt.json'
import en from '@/dictionaries/en.json'

export type Locale = 'pt' | 'en'

const dictionaries = {
    pt,
    en,
}

export function getDictionary(locale: Locale) {
    return dictionaries[locale] ?? dictionaries.pt
}