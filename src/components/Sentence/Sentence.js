import React, { useState } from 'react';
import Icon from './Icon';
import './sentence.css';

function concatWord(sentence, word) {
    sentence = sentence.concat(word);
    sentence = sentence.concat(" ");
    return sentence;
}

function concatAbbr(sentence, span, words) {
    const { start, end, label } = span;
    sentence = sentence.concat(`<abbr title='${label}'>`)
    for (let i = start; i < end; i++) {
        sentence = concatWord(sentence, words[i]);
    }
    sentence = sentence.concat("</abbr> ")
    return sentence;
}

const abbrStarts = (spans, idx, spanIdx) => spanIdx < spans.length ? idx === spans[spanIdx].start : false;
const updateIdx = (spans, idx, spanIdx) => spans[spanIdx].end;

function buildSentenceMarkup({words, spans}) {
    let sentence = "";
    let spanIdx = 0;

    if(spans && spans.length > 0) {
        for(let idx = 0; idx < words.length ; idx++) {
            const word = words[idx];
            if (abbrStarts(spans, idx, spanIdx)) {
                sentence = concatAbbr(sentence, spans[spanIdx], words);
                idx = updateIdx(spans, idx, spanIdx);
                spanIdx++;
            } else {
                sentence = concatWord(sentence, word);
            }
        }
    } else {
        sentence = words.join(" ")
    }

    return sentence;
}

function Sentence(props) {
    const { id, words, annotate } = props;
    const [form, setValues] = useState({
        id,
        words,
        spans: []
    });

    const handleAnnotate = async sentenceId => {
        const res = await annotate(sentenceId);
        setValues({ ...form, spans: res.spans});
    }

    return (
        <div key={form.id} className="sentence">
            <span id={form.id} dangerouslySetInnerHTML={{ __html: buildSentenceMarkup(form) }} />
            <button onClick={() => handleAnnotate(form.id)}><Icon/></button>
        </div>
    );
}

export default Sentence;