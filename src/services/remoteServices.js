const BASE_URL = 'http://35.246.133.152:8080/api';
const SEARCH_URL = word => `${BASE_URL}/sentences/?word=${word}`;
const ANNOTATIONS_URL = sentenceId => `${BASE_URL}/sentences/${sentenceId}/annotate`;

export async function annotateSentence(sentenceId) {
    const url = ANNOTATIONS_URL(sentenceId);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        }
    });
    return await response.json();
}

export async function getSentences(word) {
    const url = SEARCH_URL(word);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    });
    return await response.json();
}